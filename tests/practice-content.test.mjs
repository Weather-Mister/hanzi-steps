import assert from 'node:assert/strict';
import test from 'node:test';
import {books,characters,lessons,units} from '../lib/curriculum.ts';
import {
 availableTaiwanMissions,
 distractorPool,
 learnedPracticeItems,
 makeDailyTen,
 makeMegaCheckpoint,
 makeRevengeRound,
 megaCheckpointCount,
 practiceModesForItem,
 practicePromptIsAmbiguous,
 practiceSkillKey,
 sentenceDistractors,
 taiwanMissions,
} from '../lib/practice-engine.ts';
import {eligibleMegaVocabulary,makeMegaQueue} from '../lib/mega-challenge.ts';
import {vocabularyLookup} from '../lib/vocabulary-lookup.ts';

const stripSurface=value=>String(value).normalize('NFKC').trim().replace(/[\s，。！？、,.!?;；:：'"“”‘’（）()]/g,'');
const allUnitIds=books.flatMap(book=>book.unitIds);
const unitById=new Map(units.map(unit=>[unit.id,unit]));
const lessonById=new Map(lessons.map(lesson=>[lesson.id,lesson]));

function completedThrough(unitId){
 const stop=allUnitIds.indexOf(unitId);
 assert.ok(stop>=0,'unknown unit '+unitId);
 const completed=new Set();
 for(const id of allUnitIds.slice(0,stop+1)){
  const unit=unitById.get(id);
  assert.ok(unit,'missing unit '+id);
  for(const lessonId of unit.lessonIds)completed.add(lessonId);
 }
 return completed;
}

function assertQuestionContent(question,items,label){
 assert.ok(items.some(item=>item.id===question.item.id),label+' uses an item outside the learned pool: '+question.item.id);
 if(question.mode==='context'){
  assert.ok(question.context,label+' context mode has no context payload for '+question.item.id);
  assert.equal(question.context.answer,question.item.traditional,label+' context answer drifted from '+question.item.id);
  assert.ok(question.context.sentence.includes('＿＿＿'),label+' context prompt has no blank for '+question.item.id);
 }else{
  assert.ok(practiceModesForItem(question.item).includes(question.mode),label+' uses unsupported mode '+question.mode+' for '+question.item.id);
 }
 assert.equal(
  practicePromptIsAmbiguous(question.item,question.mode,items),
  false,
  label+' has more than one valid learned answer for prompt "'+question.item.meaning+'" in '+question.mode+' mode',
 );

 if(['recognition','recall','pinyin'].includes(question.mode)){
  const field=question.mode==='recognition'?'meaning':question.mode==='recall'?'traditional':'pinyin';
  const options=distractorPool(question.item,items,field,question.id,4);
  assert.ok(options.includes(question.item[field]),label+' choice set lost its answer for '+question.item.id);
  assert.equal(new Set(options).size,options.length,label+' choice set contains duplicates for '+question.item.id);
  assert.ok(options.length>=3,label+' choice set is too small for '+question.item.id);
 }

 if(question.mode==='sentence'){
  assert.equal(question.item.kind,'phrase',label+' sentence mode is not a phrase');
  assert.ok(question.item.tokens?.length,label+' sentence has no answer tokens: '+question.item.id);
  assert.equal(
   stripSurface(question.item.tokens.join('')),
   stripSurface(question.item.traditional),
   label+' sentence tokens do not reconstruct '+question.item.traditional,
  );
  const extras=sentenceDistractors(question.item,items,question.id);
  assert.equal(new Set(extras).size,extras.length,label+' sentence distractors repeat for '+question.item.id);
  assert.ok(extras.every(token=>!question.item.tokens.includes(token)),label+' sentence distractor duplicates an answer tile for '+question.item.id);
 }

 if(question.mode==='handwriting'){
  assert.ok(question.item.characters.length,label+' handwriting item has no Hanzi: '+question.item.id);
  for(const char of question.item.characters)assert.ok(characters[char],label+' handwriting target is not in character data: '+char);
 }
}

test('full learned practice pool has complete, unique, non-redundant content',()=>{
 const completed=completedThrough(allUnitIds.at(-1));
 const items=learnedPracticeItems(completed);
 assert.ok(items.length>250,'expected a large full-course practice pool');

 const ids=new Set();
 const surfaces=new Set();
 for(const item of items){
  assert.ok(item.id&&item.traditional&&item.pinyin&&item.meaning&&item.lessonId,'practice item has a blank required field');
  assert.ok(completed.has(item.lessonId),'practice item comes from an uncompleted lesson: '+item.id);
  assert.equal(ids.has(item.id),false,'duplicate practice id: '+item.id);
  ids.add(item.id);
  const surface=stripSurface(item.traditional);
  assert.ok(surface,'practice item normalizes to an empty answer: '+item.id);
  assert.equal(surfaces.has(surface),false,'same Chinese answer appears twice in practice pool: '+item.traditional);
  surfaces.add(surface);
  assert.ok(item.characters.every(char=>Boolean(characters[char])),'practice item contains an unknown Hanzi target: '+item.traditional);

  if(item.kind==='phrase'){
   assert.ok(item.tokens?.length,'practice phrase has no build tokens: '+item.id);
   assert.equal(stripSurface(item.tokens.join('')),surface,'phrase tokens do not reconstruct phrase: '+item.traditional);
  }
 }
});

test('every progression checkpoint generates content-safe Daily 10, Revenge, Mixed Mastery, and Mega Challenge pools',()=>{
 for(const unitId of allUnitIds){
  const completed=completedThrough(unitId);
  const items=learnedPracticeItems(completed);
  assert.ok(items.length,'no learned practice content after '+unitId);

  for(const seed of ['content-a','content-b','content-c']){
   const daily=makeDailyTen(items,{},unitId+':'+seed,1_900_000_000_000);
   assert.equal(daily.length,Math.min(10,items.length),unitId+' Daily 10 underfilled');
   assert.equal(new Set(daily.map(question=>question.item.id)).size,daily.length,unitId+' Daily 10 repeats an item');
   assert.equal(new Set(daily.map(question=>stripSurface(question.item.traditional))).size,daily.length,unitId+' Daily 10 repeats the same answer');
   for(const question of daily){
    assert.equal(question.sessionKind,'daily');
    assertQuestionContent(question,items,unitId+' Daily 10');
   }
  }

  const target=items[0];
  const weakStates={
   [practiceSkillKey(target.id,'recall')]:{
    itemId:target.id,mode:'recall',attempts:4,correct:1,assisted:0,misses:3,streak:0,
    strength:.18,lastSeen:100,nextReview:200,
   },
  };
  const revenge=makeRevengeRound(items,weakStates,unitId+':revenge');
  assert.ok(revenge.length>=2,unitId+' Revenge Round did not build enough distinct attacks');
  assert.equal(new Set(revenge.map(question=>question.item.id)).size,1,unitId+' Revenge Round changed targets');
  assert.equal(new Set(revenge.map(question=>question.mode)).size,revenge.length,unitId+' Revenge Round repeats a mode');
  for(const question of revenge){
   assert.equal(question.sessionKind,'revenge');
   assertQuestionContent(question,items,unitId+' Revenge Round');
  }

  if(megaCheckpointCount(completed)>0&&items.length>=12){
   for(const seed of ['mixed-a','mixed-b']){
    const mixed=makeMegaCheckpoint(items,{},unitId+':'+seed,completed,1_900_000_000_000);
    assert.equal(mixed.length,12,unitId+' Mixed Mastery did not produce 12 questions');
    assert.equal(new Set(mixed.map(question=>question.item.id)).size,12,unitId+' Mixed Mastery repeats an item');
    for(const question of mixed){
     assert.equal(question.sessionKind,'mega');
     assert.ok(!['recognition','recall'].includes(question.mode),unitId+' Mixed Mastery dropped to easy recognition');
     assertQuestionContent(question,items,unitId+' Mixed Mastery');
    }
   }
  }

  const megaWords=eligibleMegaVocabulary(completed,new Set());
  const megaQueue=makeMegaQueue(megaWords,unitId+':mega');
  assert.equal(megaQueue.length,new Set(megaQueue).size,unitId+' Mega Challenge queue contains duplicate IDs');
  const wordById=new Map(megaWords.map(word=>[word.id,word]));
  for(const id of megaQueue){
   const word=wordById.get(id);
   assert.ok(word,unitId+' Mega Challenge queue contains an ineligible word: '+id);
   assert.ok(word.characters.length,unitId+' Mega Challenge word has no writable characters: '+word.traditional);
   for(const char of word.characters)assert.ok(characters[char],unitId+' Mega Challenge has unknown writing target '+char);
  }
 }
});

test('typed and sentence production never demand one arbitrary answer when learned alternatives share the same prompt',()=>{
 const ambiguousWords=[
  {id:'bus-short',kind:'word',traditional:'公車',pinyin:'gōngchē',meaning:'bus',characters:['公','車'],unitId:'unit-1',unitNumber:1,bookId:'book-1',bookNumber:1,lessonId:'a'},
  {id:'bus-long',kind:'word',traditional:'公共汽車',pinyin:'gōnggòng qìchē',meaning:'bus',characters:['公','共','汽','車'],unitId:'unit-1',unitNumber:1,bookId:'book-1',bookNumber:1,lessonId:'b'},
  {id:'tea',kind:'word',traditional:'茶',pinyin:'chá',meaning:'tea',characters:['茶'],unitId:'unit-1',unitNumber:1,bookId:'book-1',bookNumber:1,lessonId:'c'},
  {id:'coffee',kind:'word',traditional:'咖啡',pinyin:'kāfēi',meaning:'coffee',characters:['咖','啡'],unitId:'unit-1',unitNumber:1,bookId:'book-1',bookNumber:1,lessonId:'d'},
 ];
 assert.equal(practicePromptIsAmbiguous(ambiguousWords[0],'input',ambiguousWords),true);
 const daily=makeDailyTen(ambiguousWords,{},'ambiguous-input',1_900_000_000_000);
 for(const question of daily)assertQuestionContent(question,ambiguousWords,'ambiguous typed recall fixture');

 const phraseA={id:'phrase:a',kind:'phrase',traditional:'我去學校。',pinyin:'wǒ qù xuéxiào',meaning:'I go to school.',characters:['我','去','學','校'],unitId:'unit-1',unitNumber:1,bookId:'book-1',bookNumber:1,lessonId:'p1',tokens:['我','去','學校']};
 const phraseB={id:'phrase:b',kind:'phrase',traditional:'我去上課。',pinyin:'wǒ qù shàngkè',meaning:'I go to school.',characters:['我','去','上','課'],unitId:'unit-1',unitNumber:1,bookId:'book-1',bookNumber:1,lessonId:'p2',tokens:['我','去','上課']};
 const phraseItems=[phraseA,phraseB,...ambiguousWords];
 assert.equal(practicePromptIsAmbiguous(phraseA,'sentence',phraseItems),true);
 const phraseDaily=makeDailyTen(phraseItems,{},'ambiguous-sentence',1_900_000_000_000);
 for(const question of phraseDaily)assertQuestionContent(question,phraseItems,'ambiguous sentence fixture');
});

test('all sentence-builder content reconstructs the taught phrase and uses distinct learned distractors',()=>{
 const completed=completedThrough(allUnitIds.at(-1));
 const items=learnedPracticeItems(completed);
 const phrases=items.filter(item=>item.kind==='phrase');
 assert.ok(phrases.length>50,'expected a substantial phrase practice pool');
 for(const item of phrases){
  assert.ok(item.tokens?.length,'missing tokens for '+item.traditional);
  assert.equal(stripSurface(item.tokens.join('')),stripSurface(item.traditional),'tokens mismatch for '+item.traditional);
  for(const seed of ['audit-a','audit-b']){
   const distractors=sentenceDistractors(item,items,item.id+':'+seed);
   assert.equal(new Set(distractors).size,distractors.length,'duplicate distractor for '+item.traditional);
   assert.ok(distractors.every(token=>!item.tokens.includes(token)),'answer token reused as distractor for '+item.traditional);
  }
 }
});

const missionLanguage={
 'first-conversation':['你好','學生'],
 'tea-break':['喜歡','喝','茶','咖啡','謝謝'],
 'weekend-plan':['明天','一起','游泳','怎麼樣','看電影','覺得','好玩'],
 'buy-a-drink':['外帶','內用','請問','一共','多少','錢'],
 'order-food':['牛肉','麵','碗','有一點','辣','怕','小籠包','好吃','太好了'],
 'find-the-library':['圖書館','哪裡','教室','旁邊','近'],
 'make-a-time-plan':['什麼時候','有空','後天','晚上','見面','沒問題'],
 'choose-a-ride':['怎麼','坐','火車','高鐵','比較','慢','快','舒服'],
};

test('Taiwan Mode missions are unlocked only after the language they use has been taught',()=>{
 assert.equal(Object.keys(missionLanguage).length,taiwanMissions.length,'mission language audit map must cover every mission');
 for(const mission of taiwanMissions){
  const completed=completedThrough(mission.unlockUnitId);
  const unlocked=availableTaiwanMissions(completed).find(candidate=>candidate.id===mission.id);
  assert.equal(unlocked?.unlocked,true,mission.id+' should unlock at its declared unit');

  const corpus=learnedPracticeItems(completed).map(item=>stripSurface(item.traditional)).join('\n');
  for(const chunk of missionLanguage[mission.id]||[]){
   assert.ok(corpus.includes(stripSurface(chunk)),mission.id+' uses language before it appears in learned practice: '+chunk);
  }

  for(const step of mission.steps){
   assert.ok(step.answer.trim(),mission.id+' has a blank answer');
   assert.ok(step.options.includes(step.answer),mission.id+' answer is not selectable');
   assert.equal(new Set(step.options).size,step.options.length,mission.id+' has duplicate choices');
   assert.ok(step.options.length>=3,mission.id+' has too few choices');
  }
 }
});

test('known same-English vocabulary variants are treated as ambiguous typed prompts',()=>{
 const completed=completedThrough(allUnitIds.at(-1));
 const items=learnedPracticeItems(completed);
 const pairs=[
  ['店','商店'],
  ['可是','但是'],
  ['可不可以','可以嗎'],
  ['公車','公共汽車'],
 ];
 for(const [left,right] of pairs){
  const a=items.find(item=>stripSurface(item.traditional)===left);
  const b=items.find(item=>stripSurface(item.traditional)===right);
  assert.ok(a&&b,'expected both curriculum variants '+left+' / '+right);
  assert.equal(a.meaning,b.meaning,left+' / '+right+' fixture no longer shares the same English prompt');
  assert.equal(practicePromptIsAmbiguous(a,'input',items),true,left+' typed recall should be recognized as ambiguous');
  assert.equal(practicePromptIsAmbiguous(b,'input',items),true,right+' typed recall should be recognized as ambiguous');
 }
});


test('Lesson 15 A003 support-only prescription material is isolated from Search, Mega, phrase practice, and handwriting',()=>{
 const completed=completedThrough('unit-48');
 const items=learnedPracticeItems(completed);
 for(const phraseId of ['u48-prescription-support','u48-prescription-visual']){
  assert.equal(items.some(item=>item.id==='phrase:'+phraseId),false,phraseId+' leaked into productive phrase practice');
 }
 for(const glyph of ['份','診']){
  assert.equal(vocabularyLookup.some(item=>item.traditional.includes(glyph)),false,glyph+' leaked into canonical Pinyin Search vocabulary');
  const mega=eligibleMegaVocabulary(completed,new Set());
  assert.equal(mega.some(item=>item.traditional.includes(glyph)),false,glyph+' leaked into Mega Challenge vocabulary');
  assert.equal(Boolean(characters[glyph]),false,glyph+' gained canonical character/handwriting ownership');
  assert.equal(items.some(item=>item.characters.includes(glyph)),false,glyph+' leaked into productive practice handwriting targets');
 }
});
