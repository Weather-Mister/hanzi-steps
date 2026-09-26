import assert from 'node:assert/strict';
import test from 'node:test';
import {books,units} from '../lib/curriculum.ts';
import {
 adaptivePracticeItems,
 makeDailyTen,
 makeMegaCheckpoint,
 megaCheckpointCount,
 megaCheckpointUnits,
 practiceAttemptForStep,
 practiceSkillKey,
 sentenceDistractors,
 updatePracticeState,
} from '../lib/practice-engine.ts';

function item(index,unitId='unit-1'){
 return {
  id:'test-'+index,
  kind:'word',
  traditional:'字'+index,
  pinyin:'zi '+index,
  meaning:'item '+index,
  characters:['字'],
  unitId,
  unitNumber:Number(unitId.replace(/\D/g,''))||1,
  bookId:'book-1',
  bookNumber:1,
  lessonId:'lesson-'+index,
 };
}

test('practice strength schedules clean recall farther out and mistakes weaken it',()=>{
 const now=1_700_000_000_000;
 const first=updatePracticeState(undefined,{itemId:'x',mode:'recall',correct:true,assisted:false,now});
 assert.equal(first.attempts,1);
 assert.equal(first.correct,1);
 assert.equal(first.misses,0);
 assert.ok(first.strength>0);
 assert.ok(first.nextReview>now);

 const second=updatePracticeState(first,{itemId:'x',mode:'recall',correct:true,assisted:false,now:now+1000});
 assert.ok(second.strength>first.strength);
 assert.ok(second.nextReview-(now+1000)>=first.nextReview-now);

 const assisted=updatePracticeState(second,{itemId:'x',mode:'recall',correct:true,assisted:true,now:now+1500});
 assert.equal(assisted.assisted,1);
 assert.equal(assisted.misses,0);
 assert.equal(assisted.streak,0);
 assert.ok(assisted.strength<second.strength);

 const miss=updatePracticeState(assisted,{itemId:'x',mode:'recall',correct:false,assisted:false,now:now+2000});
 assert.equal(miss.misses,1);
 assert.equal(miss.streak,0);
 assert.ok(miss.strength<assisted.strength);
});



test('sentence builders add plausible recent distractors without duplicating answer tiles',()=>{
 const phrase={
  id:'phrase:test-sister-photo',kind:'phrase',traditional:'這是我姐姐的照片',pinyin:'zhè shì wǒ jiějie de zhàopiàn',
  meaning:"This is my older sister's photo.",characters:['這','是','我','姐','姐','的','照','片'],
  unitId:'unit-7',unitNumber:7,bookId:'book-1',bookNumber:1,lessonId:'u7-test',
  tokens:['這','是','我','姐姐','的','照片'],
 };
 const word=(id,traditional,meaning,unitNumber=7)=>({
  id,kind:'word',traditional,pinyin:traditional,meaning,characters:Array.from(traditional),
  unitId:'unit-'+unitNumber,unitNumber,bookId:'book-1',bookNumber:1,lessonId:'test-'+id,
 });
 const items=[
  phrase,
  word('older-sister','姐姐','older sister'),
  word('younger-sister','妹妹','younger sister'),
  word('younger-brother','弟弟','younger brother'),
  word('that','那','that'),
  word('she','她','she',6),
  word('he','他','he',6),
  word('coffee','咖啡','coffee',2),
 ];
 const distractors=sentenceDistractors(phrase,items,'sentence-test');
 assert.equal(distractors.length,3);
 assert.ok(distractors.includes('妹妹'),String(distractors));
 assert.ok(distractors.some(value=>['那','弟弟','她','他'].includes(value)),String(distractors));
 assert.ok(distractors.every(value=>!phrase.tokens.includes(value)));
 assert.equal(new Set(distractors).size,distractors.length);
});

test('sentence distractors avoid same-meaning synonyms that could create ambiguous answers',()=>{
 const phrase={
  id:'phrase:test-ambiguous',kind:'phrase',traditional:'這是我姐姐的照片',pinyin:'zhè shì wǒ jiějie de zhàopiàn',
  meaning:"This is my older sister's photo.",characters:['這','是','我','姐','姐','的','照','片'],
  unitId:'unit-7',unitNumber:7,bookId:'book-1',bookNumber:1,lessonId:'u7-test',
  tokens:['這','是','我','姐姐','的','照片'],
 };
 const items=[
  phrase,
  {id:'姐姐',kind:'word',traditional:'姐姐',pinyin:'jiějie',meaning:'older sister',characters:['姐','姐'],unitId:'unit-7',unitNumber:7,bookId:'book-1',bookNumber:1,lessonId:'a'},
  {id:'姊姊',kind:'word',traditional:'姊姊',pinyin:'zǐzǐ',meaning:'older sister',characters:['姊','姊'],unitId:'unit-7',unitNumber:7,bookId:'book-1',bookNumber:1,lessonId:'b'},
  {id:'妹妹',kind:'word',traditional:'妹妹',pinyin:'mèimei',meaning:'younger sister',characters:['妹','妹'],unitId:'unit-7',unitNumber:7,bookId:'book-1',bookNumber:1,lessonId:'c'},
  {id:'弟弟',kind:'word',traditional:'弟弟',pinyin:'dìdi',meaning:'younger brother',characters:['弟','弟'],unitId:'unit-6',unitNumber:6,bookId:'book-1',bookNumber:1,lessonId:'d'},
  {id:'那',kind:'word',traditional:'那',pinyin:'nà',meaning:'that',characters:['那'],unitId:'unit-7',unitNumber:7,bookId:'book-1',bookNumber:1,lessonId:'e'},
 ];
 const distractors=sentenceDistractors(phrase,items,'ambiguous-test',3);
 assert.equal(distractors.includes('姊姊'),false,String(distractors));
 assert.ok(distractors.includes('妹妹'),String(distractors));
});

test('Mega-mastered vocabulary is excluded from adaptive practice pools',()=>{
 const items=[item(1,'unit-1'),item(2,'unit-2'),item(3,'unit-3')];
 const filtered=adaptivePracticeItems(items,new Set([items[0].id,items[2].id]));
 assert.deepEqual(filtered.map(entry=>entry.id),[items[1].id]);
});

test('Daily 10 is capped, unique, and prioritizes a due weak item',()=>{
 const items=Array.from({length:16},(_,index)=>item(index,'unit-'+((index%8)+1)));
 const weak=items[7];
 const states={
  [practiceSkillKey(weak.id,'recall')]:{
   itemId:weak.id,mode:'recall',attempts:3,correct:1,assisted:0,misses:2,streak:0,
   strength:.2,lastSeen:100,nextReview:200,
  },
 };
 const queue=makeDailyTen(items,states,'daily-test',1000);
 assert.equal(queue.length,10);
 assert.equal(new Set(queue.map(question=>question.item.id)).size,10);
 assert.ok(queue.some(question=>question.item.id===weak.id));
 assert.ok(queue.every(question=>question.sessionKind==='daily'));
});




test('Daily 10 changes substantially across fresh seeds while keeping the adaptive frontier',()=>{
 const items=[];
 for(let unitNumber=1;unitNumber<=10;unitNumber++){
  for(let index=0;index<8;index++)items.push(item(unitNumber*100+index,'unit-'+unitNumber));
 }
 const first=makeDailyTen(items,{},'fresh-random-a',1000);
 const second=makeDailyTen(items,{},'fresh-random-b',1000);
 assert.equal(first.length,10);
 assert.equal(second.length,10);
 const firstIds=first.map(question=>question.item.id);
 const secondIds=second.map(question=>question.item.id);
 assert.notDeepEqual(firstIds,secondIds);
 assert.ok(first.filter(question=>question.item.unitNumber>=7).length>=8);
 assert.ok(second.filter(question=>question.item.unitNumber>=7).length>=8);
 const overlap=firstIds.filter(id=>secondIds.includes(id)).length;
 assert.ok(overlap<=8,'Daily 10 should not feel nearly identical across fresh launches');
});

test('Daily 10 stays deterministic for a supplied seed so regressions remain reproducible',()=>{
 const items=[];
 for(let unitNumber=1;unitNumber<=8;unitNumber++){
  for(let index=0;index<6;index++)items.push(item(unitNumber*100+index,'unit-'+unitNumber));
 }
 const first=makeDailyTen(items,{},'same-seed',1000);
 const second=makeDailyTen(items,{},'same-seed',1000);
 assert.deepEqual(first.map(question=>question.id),second.map(question=>question.id));
});

test('Daily 10 follows the learner frontier instead of drifting back to early easy units',()=>{
 const items=[];
 for(let unitNumber=1;unitNumber<=8;unitNumber++){
  for(let index=0;index<5;index++)items.push(item(unitNumber*10+index,'unit-'+unitNumber));
 }
 const queue=makeDailyTen(items,{},'recent-frontier',1000);
 assert.equal(queue.length,10);
 const unitNumbers=queue.map(question=>question.item.unitNumber);
 assert.ok(unitNumbers.filter(number=>number>=6).length>=9,String(unitNumbers));
 assert.ok(unitNumbers.filter(number=>number===8).length>=3);
 assert.ok(unitNumbers.filter(number=>number===7).length>=2);
 assert.ok(unitNumbers.filter(number=>number===6).length>=1);
 assert.equal(unitNumbers.includes(1),false,String(unitNumbers));
});



test('Daily 10 is dominated by the rolling current-plus-last-two unit window',()=>{
 const items=[];
 for(let unitNumber=1;unitNumber<=7;unitNumber++){
  for(let index=0;index<9;index++)items.push(item(unitNumber*100+index,'unit-'+unitNumber));
 }
 const queue=makeDailyTen(items,{},'current-unit-dominates',1000);
 assert.equal(queue.length,10);
 const windowCount=queue.filter(question=>question.item.unitNumber>=5).length;
 assert.ok(windowCount>=9);
 assert.ok(queue.filter(question=>question.item.unitNumber===7).length>=3);
 assert.ok(queue.filter(question=>question.item.unitNumber===6).length>=2);
 assert.ok(queue.filter(question=>question.item.unitNumber===5).length>=1);
 assert.ok(queue.every(question=>question.mode!=='recognition'));
});

test('Daily 10 infers likely-forgotten material even before mastery history exists',()=>{
 const items=[];
 for(let unitNumber=1;unitNumber<=12;unitNumber++){
  for(let index=0;index<5;index++)items.push(item(unitNumber*10+index,'unit-'+unitNumber));
 }
 const queue=makeDailyTen(items,{},'memory-risk-without-history',1000);
 assert.equal(queue.length,10);
 assert.ok(queue.filter(question=>question.item.unitNumber>=9).length>=7);
 assert.ok(queue.some(question=>question.item.unitNumber<=8&&question.item.unitNumber>=4));
 assert.equal(queue.some(question=>question.item.unitNumber===1),false);
});

test('Daily 10 still reaches back for genuinely weak older material',()=>{
 const items=[];
 for(let unitNumber=1;unitNumber<=8;unitNumber++){
  for(let index=0;index<5;index++)items.push(item(unitNumber*10+index,'unit-'+unitNumber));
 }
 const oldWeak=items.find(candidate=>candidate.unitId==='unit-1');
 assert.ok(oldWeak);
 const states={
  [practiceSkillKey(oldWeak.id,'recall')]:{
   itemId:oldWeak.id,mode:'recall',attempts:5,correct:2,assisted:0,misses:3,streak:0,
   strength:.15,lastSeen:100,nextReview:200,
  },
 };
 const queue=makeDailyTen(items,states,'adaptive-old-weak',1000);
 assert.ok(queue.some(question=>question.item.id===oldWeak.id));
 assert.ok(queue.filter(question=>question.item.unitNumber>=5).length>=6);
});

test('Daily 10 escalates easy due recall into productive practice',()=>{
 const items=Array.from({length:8},(_,index)=>item(index,'unit-1'));
 const target=items[0];
 const states={
  [practiceSkillKey(target.id,'recall')]:{
   itemId:target.id,mode:'recall',attempts:2,correct:1,assisted:0,misses:1,streak:0,
   strength:.3,lastSeen:100,nextReview:200,
  },
 };
 const queue=makeDailyTen(items,states,'due-mode-test',1000);
 const question=queue.find(candidate=>candidate.item.id===target.id);
 assert.ok(question);
 assert.ok(['input','handwriting'].includes(question.mode),question.mode);
});

test('Smart practice avoids one-answer multiple choice when too little material is learned',()=>{
 const only=item(1,'unit-1');
 const daily=makeDailyTen([only],{},'tiny-pool',1000);
 assert.equal(daily.length,1);
 assert.equal(daily[0].mode,'input');
});

test('Choice viability counts distinct wrong answers and avoids an ambiguous typed fallback',()=>{
 const target={...item(1,'unit-1'),meaning:'same'};
 const duplicate={...item(2,'unit-1'),meaning:'same'};
 const oneWrong={...item(3,'unit-1'),meaning:'different'};
 const states={
  [practiceSkillKey(target.id,'recognition')]:{
   itemId:target.id,mode:'recognition',attempts:1,correct:0,assisted:0,misses:1,streak:0,
   strength:.1,lastSeen:100,nextReview:200,
  },
 };
 const daily=makeDailyTen([target,duplicate,oneWrong],states,'duplicate-answer-pool',1000);
 const question=daily.find(candidate=>candidate.item.id===target.id);
 assert.ok(question);
 assert.equal(question.mode,'handwriting');
});

test('Mixed Mastery keeps the four-unit picker but turns weak definition prompts into sentence recall',()=>{
 const firstBook=books.find(book=>book.id==='book-1');
 assert.ok(firstBook);
 const completed=new Set();
 for(const unitId of firstBook.unitIds.slice(0,8)){
  const unit=units.find(candidate=>candidate.id===unitId);
  assert.ok(unit);
  completed.add(unit.lessonIds[unit.lessonIds.length-1]);
 }
 const checkpointUnits=firstBook.unitIds.slice(4,8);
 assert.deepEqual(megaCheckpointUnits(completed),checkpointUnits);
 assert.equal(megaCheckpointCount(completed),2);

 const items=[];
 firstBook.unitIds.slice(0,8).forEach((unitId,unitIndex)=>{
  for(let i=0;i<5;i++)items.push(item(unitIndex*10+i,unitId));
 });
 const onePerson=items.find(candidate=>candidate.unitId===checkpointUnits[0]);
 assert.ok(onePerson);
 Object.assign(onePerson,{
  id:'phrase:mixed-one-person',
  kind:'phrase',
  traditional:'一個人',
  pinyin:'yí ge rén',
  meaning:'one person',
  characters:['一','個','人'],
  tokens:['一','個','人'],
 });
 items.push({
  id:'phrase:mixed-one-person-context',
  kind:'phrase',
  traditional:'有一個人。',
  pinyin:'yǒu yí ge rén',
  meaning:'There is one person.',
  characters:['有','一','個','人'],
  lessonId:'context-only',
  tokens:['有','一','個','人'],
 });

 const oldWeak=items.find(candidate=>candidate.unitId===firstBook.unitIds[0]);
 assert.ok(oldWeak);
 const states={
  [practiceSkillKey(oldWeak.id,'recall')]:{
   itemId:oldWeak.id,mode:'recall',attempts:6,correct:2,assisted:0,misses:4,streak:0,
   strength:.12,lastSeen:100,nextReview:200,
  },
 };
 const queue=makeMegaCheckpoint(items,states,'mixed-mastery-test',completed,1000);
 assert.equal(queue.length,12);
 assert.ok(!queue.some(question=>question.item.id===oldWeak.id),'an unrelated old weakness should not replace the checkpoint block');
 assert.ok(queue.every(question=>question.item.unitId&&checkpointUnits.includes(question.item.unitId)));
 for(const unitId of checkpointUnits)assert.equal(queue.filter(question=>question.item.unitId===unitId).length,3);

 const onePersonQuestion=queue.find(question=>question.item.id===onePerson.id);
 assert.ok(onePersonQuestion,'the original picker should still select the more complex one-person phrase');
 assert.equal(onePersonQuestion.mode,'context');
 assert.ok(onePersonQuestion.context);
 assert.match(onePersonQuestion.context.sentence,/有.*＿＿＿/);
 assert.notEqual(onePersonQuestion.context.sentence,'一個人');
 assert.match(onePersonQuestion.context.meaning,/one person/i);
 assert.equal(onePersonQuestion.context.answer,'一個人');

 assert.ok(queue.every(question=>!['recognition','recall','pinyin'].includes(question.mode)),'Mixed Mastery must not collapse into easy multiple choice');
 assert.ok(queue.every(question=>['context','input','handwriting'].includes(question.mode)));
});

test('lesson assessment steps map into the same mastery IDs and modes used by smart practice',()=>{
 const recall=practiceAttemptForStep({type:'select',char:'你'});
 assert.ok(recall);
 assert.equal(recall.mode,'recall');
 assert.ok(recall.itemId.includes(':你:'));

 assert.deepEqual(practiceAttemptForStep({type:'order',phrase:'hello'}),{itemId:'phrase:hello',mode:'sentence'});
 assert.equal(practiceAttemptForStep({type:'trace',char:'你'}),null);
 assert.equal(practiceAttemptForStep({type:'complete',char:'你'}),null);
 assert.equal(practiceAttemptForStep({type:'parts',char:'你'}),null);
 assert.equal(practiceAttemptForStep({type:'build',char:'你'}),null);
 assert.equal(practiceAttemptForStep({type:'grammar'}),null);
 const handwriting=practiceAttemptForStep({type:'memory',char:'你'});
 assert.ok(handwriting);
 assert.equal(handwriting.mode,'handwriting');
});


