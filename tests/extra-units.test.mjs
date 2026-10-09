import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {acceptedExtraMeasure,extraUnits,extraLessons,extraPracticeLessons,extraWords,wordsForExtraUnit,extraChoices,extraAnswer,extraWord,extraUnitComplete,ambiguousExtraPair} from '../course/extras/units.ts';
import {lessons,units,vocabulary,characters,findLesson,lessonAvailable,validSession,completedLessonIds} from '../lib/curriculum.ts';
import {learnedPracticeItems} from '../lib/practice-engine.ts';
import {extraCharacterInfo} from '../course/extras/character-info.ts';
import {streakFromDays,taipeiDay} from '../lib/streak.ts';

test('extras coexist without entering canonical ownership or prerequisites',()=>{
 const completed=new Set(extraLessons.map(l=>l.id));
 assert.equal(extraUnits.length,6);assert.equal(extraWords.length,116);
 assert.equal(extraLessons.length,160);
 assert.equal(extraLessons.filter(l=>lessons.some(core=>core.id===l.id)).length,0);
 assert.equal(extraUnits.filter(u=>units.some(core=>core.id===u.id)).length,0);
 assert.equal(vocabulary.filter(w=>completed.has(w.lessonId)).length,0);
 assert.deepEqual(learnedPracticeItems(completed),learnedPracticeItems(new Set()));
 assert.equal(lessonAvailable('u2-people',completed),false);
 assert.equal(lessonAvailable('u31-because',completed),false);
 assert.equal(completedLessonIds(completed).size,160);
 for(const lesson of extraLessons){
  assert.equal(lessonAvailable(lesson.id,new Set()),true);
  assert.equal(findLesson(lesson.id),lesson);
 }
 assert.equal(lessonAvailable('extra-missing',new Set()),false);
 // Supplementary 褲子 must leave the course's real owning lesson untouched.
 for(const word of vocabulary.filter(w=>extraWords.some(extra=>extra.text===w.text)))assert.ok(!word.lessonId.startsWith('extra-'));
});

test('every directly accessible assessed lesson teaches its targets before testing',()=>{
 for(const lesson of extraLessons){
  const taught=new Set();
  for(const step of lesson.steps){
   const activity=step.extra;
   assert.equal(step.type,'extra');
   if(activity.mode==='learn'||activity.mode==='sentence-learn'||activity.mode==='character-learn'){
    for(const id of activity.wordId?[activity.wordId]:(activity.wordIds||[]))taught.add(id);
   }else{
    for(const id of activity.mode==='match'||activity.mode==='measure-match'||activity.mode==='mixed-match'?activity.wordIds:[activity.wordId]){
     assert.ok(taught.has(id),lesson.id+': target '+id+' was not taught first');
    }
   }
  }
 }
});

test('choice banks are distinct and contain exactly one authored answer',()=>{
 for(const lesson of extraLessons)for(const step of lesson.steps){
  const {mode}=step.extra;
  if(['learn','character-learn','sentence-learn','sentence-order','writing'].includes(mode))continue;
  const choices=extraChoices(step);
  assert.equal(new Set(choices).size,choices.length,step.id);
  assert.ok(choices.every(choice=>typeof choice==='string'&&choice.length>0),step.id);
  if(mode==='match'||mode==='measure-match'||mode==='mixed-match'){
   assert.ok(choices.length>=3);
   if(mode==='measure-match')assert.equal(new Set(choices.map(id=>extraWord(id).measure)).size,choices.length);
  }else{
   assert.equal(choices.filter(choice=>choice===extraAnswer(step)).length,1,step.id);
   assert.ok(choices.length>=2,step.id);
   if(mode==='picture'||mode==='word'||mode==='listen-picture')assert.ok(choices.every(id=>extraWord(id)));
   if(mode==='character')assert.ok(extraWord(step.extra.wordId).text.includes(extraAnswer(step)));
  }
 }
});

test('checkpoint validation, local drafts, and Taipei streak support extras',()=>{
 const time=Date.parse('2026-10-08T02:00:00Z');
 for(const lesson of extraLessons){
  const base={id:'550e8400-e29b-41d4-a716-446655440000',lessonId:lesson.id,index:0,independent:0,assisted:0,complete:false,updatedAt:time};
  assert.equal(validSession(base),true);
  assert.equal(validSession({...base,index:lesson.steps.length,complete:true}),true);
  assert.equal(validSession({...base,index:lesson.steps.length-1,complete:true}),false);
  assert.equal(validSession({...base,index:lesson.steps.length+1,complete:true}),false);
  assert.equal(validSession({...base,index:0,independent:1}),false);
 }
 assert.equal(validSession({id:'550e8400-e29b-41d4-a716-446655440000',lessonId:'extra-invented',index:1,independent:0,assisted:0,complete:true,updatedAt:time}),false);
 assert.equal(streakFromDays([taipeiDay(time)],time).current,1);
});

test('extra completion requires all lessons, including when review is done first',()=>{
 for(const unit of extraUnits){
  const reviewOnly=new Set([unit.lessonIds.at(-1)]);
  assert.equal(extraUnitComplete(unit,reviewOnly),false);
  assert.equal(extraUnitComplete(unit,new Set(unit.lessonIds)),true);
  assert.equal(extraUnitComplete(unit,new Set(unit.lessonIds.slice(1))),false);
 }
});

test('natural alternative classifiers are accepted in matching, but counting context is preserved',()=>{
 assert.ok(acceptedExtraMeasure(extraWord('apple'),'顆'));
 assert.ok(acceptedExtraMeasure(extraWord('strawberry'),'個'));
 assert.ok(acceptedExtraMeasure(extraWord('banana'),'個'));
 assert.ok(acceptedExtraMeasure(extraWord('skirt'),'件'));
 assert.equal(acceptedExtraMeasure(extraWord('grapes'),'顆'),false,'a bunch is not an individual grape');
 assert.equal(acceptedExtraMeasure(extraWord('shoes'),'隻'),false,'a pair is not a single shoe');
 assert.equal(acceptedExtraMeasure(extraWord('hat'),'條'),false);
 for(const lesson of extraLessons)for(const step of lesson.steps.filter(s=>s.extra.mode==='measure')){
  const word=extraWord(step.extra.wordId);
  assert.ok(extraChoices(step).filter(value=>value!==word.measure).every(value=>!acceptedExtraMeasure(word,value)),step.id);
 }
});

test('supplementary glyphs and meanings do not overwrite canonical records',()=>{
 const before=JSON.stringify(characters);
 for(const word of extraWords){
  assert.ok(word.glyphNotes.length>0);
  assert.ok(word.pinyin);
  if(word.measure){assert.ok(word.counted.includes(word.measure+word.text));assert.ok(word.countedPinyin&&word.measurePinyin)}else{assert.ok(word.swatch||word.category==='countries'||word.category==='actions');assert.equal(word.counted,'');assert.equal(word.countedPinyin,'');assert.equal(word.measurePinyin,'');}
 }
 assert.equal(JSON.stringify(characters),before);
 const art=['extra-picture.tsx','extra-supplement-picture.tsx'].map(file=>fs.readFileSync(new URL('../components/'+file,import.meta.url),'utf8')).join('\n');
 for(const word of extraWords)assert.ok(word.swatch||art.includes('\''+word.id+'\':')||art.includes("case '"+word.id+"'"),'missing illustration: '+word.id);
 const runtime=fs.readFileSync(new URL('../course/runtime.ts',import.meta.url),'utf8');
 assert.ok(!runtime.includes('extras'));
});

test('backend registration has the exact extra lesson lengths',()=>{
 const sql=fs.readFileSync(new URL('../course/extras/progress.sql',import.meta.url),'utf8');
 for(const lesson of [...extraLessons,...extraPracticeLessons]){
  const match=sql.match(new RegExp("\\('"+lesson.id+"',\\s*(\\d+),"));
  assert.ok(match,'missing backend lesson: '+lesson.id);
  assert.equal(Number(match[1]),lesson.steps.length,lesson.id);
 }
 assert.equal((sql.match(/\('extra-/g)||[]).length,extraLessons.length+extraPracticeLessons.length);
});

test('all noun and measure-word glyphs receive the normal required writing lifecycle',()=>{
 for(const unit of extraUnits){
  const unitLessons=extraLessons.filter(l=>l.unitId===unit.id);
  for(const lesson of unitLessons){
   assert.ok(lesson.steps.some(s=>s.extra.mode==='writing'),lesson.id);
   const taughtSentences=new Set();
   for(const step of lesson.steps){
    if(step.extra.mode==='sentence-learn')taughtSentences.add(step.extra.sentence.text);
    if(step.extra.mode==='sentence-order'){
     const sentence=step.extra.sentence;
     assert.ok(taughtSentences.has(sentence.text),step.id);
     assert.equal(sentence.tokens.join(''),sentence.text.replace(/[。？]$/,''));
     assert.ok(sentence.support.every(token=>token.pinyin&&token.meaning),step.id);
    }
   }
  }
  for(const glyph of unit.chars){
   for(const writeMode of ['trace','complete','memory'])assert.ok(unitLessons.some(l=>l.steps.some(s=>s.extra.mode==='writing'&&s.extra.glyph===glyph&&s.extra.writeMode===writeMode)),unit.id+': '+glyph+' '+writeMode);
  }
 }
 const strokes=JSON.parse(fs.readFileSync(new URL('../course/extras/strokes.json',import.meta.url),'utf8'));

 for(const glyph of new Set(extraUnits.flatMap(unit=>unit.chars))){
  assert.ok(strokes[glyph]?.strokes.length>0,glyph);
  assert.equal(strokes[glyph].strokes.length,strokes[glyph].medians.length,glyph);
  assert.ok(extraCharacterInfo[glyph]?.pinyin&&extraCharacterInfo[glyph]?.note,glyph);
  const practice=extraPracticeLessons.find(l=>l.id==='extra-practice-'+glyph);
  assert.equal(practice.steps.length,4);assert.equal(findLesson(practice.id),practice);
  assert.equal(lessonAvailable(practice.id,new Set()),true);
 }
});
test('published extra positions and completed credit are preserved',()=>{
 const prefixes=JSON.parse(fs.readFileSync(new URL('./fixtures/extra-published-prefixes.json',import.meta.url),'utf8'));
 for(const [id,prefix] of Object.entries(prefixes)){
  const lesson=extraLessons.find(l=>l.id===id);
  assert.deepEqual(lesson.steps.slice(0,prefix.length).map(s=>s.id),prefix,lesson.id);
  const checkpoint={id:'550e8400-e29b-41d4-a716-446655440000',lessonId:lesson.id,index:prefix.length,complete:true,independent:0,assisted:0,updatedAt:Date.now()};
  assert.ok(validSession(checkpoint),lesson.id+' historical completion');
  assert.ok(validSession({...checkpoint,complete:false}),lesson.id+' prior-end partial remains resumable');
 }
});

test('word worksheets cover every entry and new sections remain self-contained',()=>{
 for(const unit of extraUnits){
  const words=wordsForExtraUnit(unit.id);
  assert.equal(words.length,unit.id==='extra-colors'?16:20);
  assert.equal(unit.lessonIds.length,unit.id==='extra-colors'?21:['extra-clothing','extra-fruits'].includes(unit.id)?32:25);
  for(const word of words){
   const lesson=extraLessons.find(l=>l.id===unit.id+'-word-'+word.id);
   assert.ok(lesson,word.id);
   assert.ok(lesson.steps.some(s=>s.extra.mode==='sentence-order'));
   assert.ok(lesson.steps.some(s=>s.extra.mode==='listen-word'));
   for(const glyph of Array.from(word.text).filter(c=>/[\u3400-\u9fff]/.test(c)))for(const mode of ['trace','complete','memory'])assert.ok(lesson.steps.some(s=>s.extra.glyph===glyph&&s.extra.writeMode===mode),lesson.id+' '+glyph+' '+mode);
  }
 }
 for(const lesson of extraLessons)for(const step of lesson.steps){
  const a=step.extra;
  if(['picture','word','listen-picture'].includes(a.mode)){
   const options=extraChoices(step);
   assert.ok(options.every(id=>id===a.wordId||!ambiguousExtraPair(id,a.wordId)),step.id);
  }
  if(a.mode==='color-object'){
   assert.ok(lesson.steps.some(s=>s.extra.mode==='learn'&&s.extra.wordIds.includes(a.nounId)));
   assert.ok(extraWord(a.wordId).swatch);
   assert.ok(extraChoices(step).every(id=>extraWord(id).swatch));
  }
  if(a.mode==='question'||a.mode==='listen-question')assert.ok(step.prompt&&step.explanation&&step.answer&&(a.mode!=='listen-question'||step.audioText));
 }
 const words=extraWords.filter(w=>w.swatch);
 assert.equal(new Set(words.map(w=>w.swatch)).size,16);
 assert.ok(words.every(w=>/^#[0-9a-f]{6}$/i.test(w.swatch)));
 assert.equal(extraWord('color-word').measure,'種');
 assert.equal(words.filter(w=>w.measure).length,1);
});
test('complete published lesson payloads retain saved positions',()=>{
 const published=JSON.parse(fs.readFileSync(new URL('./fixtures/extra-before-workbooks.json',import.meta.url),'utf8'));
 for(const [id,steps] of Object.entries(published)){
  const lesson=findLesson(id);assert.deepEqual(lesson.steps,steps,id);
 }
});

test('new collections use suitable counting contexts and do not count named places or actions',()=>{
 for(const kind of ['vegetables','countries','actions']){
  const words=wordsForExtraUnit('extra-'+kind);
  assert.equal(words.length,20);
  for(const word of words){
   assert.equal(word.category,kind);
   if(kind==='vegetables'){
    assert.ok(word.measure&&word.counted&&word.countedPinyin,word.id);
    for(const alternative of word.acceptedMeasures)assert.ok(acceptedExtraMeasure(word,alternative));
   }else{
    assert.equal(word.measure,'');
    for(const step of extraLessons.filter(l=>l.id==='extra-'+kind+'-word-'+word.id).flatMap(l=>l.steps))assert.ok(!['measure','count','measure-match'].includes(step.extra.mode));
   }
  }
 }
 assert.ok(ambiguousExtraPair('veg-cauliflower','veg-broccoli'));
 assert.ok(ambiguousExtraPair('veg-spinach','veg-water-spinach'));
 assert.equal(extraWord('action-rest').pinyin,'xiūxí');
 assert.equal(extraWord('country-italy').text,'義大利');
 assert.equal(extraWord('country-new-zealand').text,'紐西蘭');
 assert.ok(extraWord('action-listen').glyphNotes.some(note=>note.includes('yuè')));
 assert.ok(extraWord('action-sleep').glyphNotes.some(note=>note.includes('jiào')));
});

test('new lesson answer and distractor banks are introduced before retrieval',()=>{
 for(const lesson of extraLessons.filter(l=>['extra-vegetables','extra-countries','extra-actions'].includes(l.unitId))){
  const taught=new Set();
  for(const step of lesson.steps){
   const a=step.extra;
   if(a.mode==='learn')for(const id of a.wordId?[a.wordId]:a.wordIds)taught.add(id);
   if(!['learn','writing','sentence-learn','sentence-order'].includes(a.mode))for(const id of a.wordIds||[])assert.ok(taught.has(id),step.id+' untaught bank word '+id);
  }
 }
});

test('action translations keep the speaker’s own hands and teeth',()=>{
 for(const id of ['action-wash-hands','action-brush-teeth']){
  const sentence=extraLessons.find(l=>l.id==='extra-actions-word-'+id).steps.find(s=>s.extra.mode==='sentence-learn').extra.sentence;
  assert.ok(sentence.meaning.includes('my '));assert.ok(!sentence.meaning.includes('your '));
 }
});
