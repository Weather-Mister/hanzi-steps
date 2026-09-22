import assert from 'node:assert/strict';
import test from 'node:test';
import {books,lessons,phrases,units,vocabulary} from '../lib/curriculum.ts';
import {
 adaptivePracticeItems,
 availableTaiwanMissions,
 makeDailyTen,
 makeMegaCheckpoint,
 makeRevengeRound,
 megaCheckpointCount,
 megaCheckpointUnits,
 practiceAttemptForStep,
 practiceSkillKey,
 taiwanMissions,
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
 assert.ok(unitNumbers.filter(number=>number>=5).length>=8,String(unitNumbers));
 assert.ok(unitNumbers.filter(number=>number===8).length>=5);
 assert.ok(unitNumbers.filter(number=>number===7).length>=2);
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

 const states={
  [practiceSkillKey(only.id,'recall')]:{
   itemId:only.id,mode:'recall',attempts:2,correct:1,assisted:0,misses:1,streak:0,
   strength:.2,lastSeen:100,nextReview:200,
  },
 };
 const revenge=makeRevengeRound([only],states,'tiny-revenge');
 assert.ok(revenge.length>=2);
 assert.ok(revenge.every(question=>!['recognition','recall','pinyin'].includes(question.mode)));
});


test('Choice viability counts distinct wrong answers, not duplicate copies of the right answer',()=>{
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
 assert.equal(question.mode,'input');
});

test('Revenge Round attacks one unresolved mistake three different ways then clears when strong',()=>{
 const target=item(1);
 const items=[target,item(2),item(3),item(4)];
 const state={
  [practiceSkillKey(target.id,'recall')]:{
   itemId:target.id,mode:'recall',attempts:4,correct:2,assisted:0,misses:2,streak:1,
   strength:.4,lastSeen:100,nextReview:200,
  },
 };
 const round=makeRevengeRound(items,state,'revenge-test');
 assert.equal(round.length,3);
 assert.equal(new Set(round.map(question=>question.item.id)).size,1);
 assert.equal(new Set(round.map(question=>question.mode)).size,3);
 assert.equal(round[0].mode,'recall');

 const resolved={
  [practiceSkillKey(target.id,'recall')]:{...state[practiceSkillKey(target.id,'recall')],strength:.8},
 };
 assert.deepEqual(makeRevengeRound(items,resolved,'revenge-test'),[]);
});

test('Mixed Mastery unlocks on four-unit checkpoints but adapts around recent, weak, and forgotten material',()=>{
 const firstBook=books.find(book=>book.id==='book-1');
 assert.ok(firstBook);
 const completed=new Set();
 for(const unitId of firstBook.unitIds.slice(0,8)){
  const unit=units.find(candidate=>candidate.id===unitId);
  assert.ok(unit);
  completed.add(unit.lessonIds[unit.lessonIds.length-1]);
 }
 assert.deepEqual(megaCheckpointUnits(completed),firstBook.unitIds.slice(4,8));
 assert.equal(megaCheckpointCount(completed),2);

 const items=[];
 firstBook.unitIds.slice(0,8).forEach((unitId,unitIndex)=>{
  for(let i=0;i<5;i++)items.push(item(unitIndex*10+i,unitId));
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
 assert.ok(queue.some(question=>question.item.id===oldWeak.id));
 const latestThree=new Set(firstBook.unitIds.slice(5,8));
 assert.ok(queue.filter(question=>question.item.unitId&&latestThree.has(question.item.unitId)).length>=11);
 assert.ok(queue.filter(question=>question.item.unitId===firstBook.unitIds[7]).length>=4);
 assert.ok(queue.filter(question=>question.item.unitId===firstBook.unitIds[6]).length>=3);
 assert.ok(queue.filter(question=>question.item.unitId===firstBook.unitIds[5]).length>=1);
 assert.ok(queue.every(question=>!['recognition','recall'].includes(question.mode)));
});

test('Taiwan missions stay locked until their prerequisite unit is complete',()=>{
 const firstBook=books.find(book=>book.id==='book-1');
 assert.ok(firstBook);
 const firstUnit=units.find(unit=>unit.id===firstBook.unitIds[0]);
 assert.ok(firstUnit);
 const before=availableTaiwanMissions(new Set()).find(mission=>mission.id==='first-conversation');
 assert.equal(before?.unlocked,false);
 const after=availableTaiwanMissions(new Set([firstUnit.lessonIds[firstUnit.lessonIds.length-1]])).find(mission=>mission.id==='first-conversation');
 assert.equal(after?.unlocked,true);
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


test('Taiwan mission steps have one explicit answer and non-duplicated choices',()=>{
 for(const mission of taiwanMissions){
  assert.ok(units.some(unit=>unit.id===mission.unlockUnitId),mission.id+' has a real unlock unit');
  assert.ok(mission.steps.length>=3,mission.id+' has enough interaction to feel like a mission');
  for(const step of mission.steps){
   assert.ok(step.answer.trim());
   assert.ok(step.options.includes(step.answer),mission.id+' answer is selectable');
   assert.equal(new Set(step.options).size,step.options.length,mission.id+' has unique choices');
   assert.ok(step.options.length>=3,mission.id+' gives meaningful alternatives');
  }
 }
});


test('Taiwan missions only show Hanzi already exposed by their unlock point',()=>{
 const hanzi=/[\u3400-\u9fff\uf900-\ufaff]/g;
 const addText=(set,text)=>{for(const char of String(text||'').match(hanzi)||[])set.add(char)};
 for(const mission of taiwanMissions){
  const targetUnit=units.find(unit=>unit.id===mission.unlockUnitId);
  assert.ok(targetUnit,mission.id+' has an unlock unit');
  const targetBookIndex=books.findIndex(book=>book.unitIds.includes(mission.unlockUnitId));
  assert.ok(targetBookIndex>=0,mission.id+' unlock unit belongs to a book');
  const targetBook=books[targetBookIndex];
  const targetPosition=targetBook.unitIds.indexOf(mission.unlockUnitId);
  const allowedUnitIds=new Set([
   ...books.slice(0,targetBookIndex).flatMap(book=>book.unitIds),
   ...targetBook.unitIds.slice(0,targetPosition+1),
  ]);
  const allowedLessons=lessons.filter(lesson=>allowedUnitIds.has(lesson.unitId));
  const allowedLessonIds=new Set(allowedLessons.map(lesson=>lesson.id));
  const allowed=new Set();

  for(const word of vocabulary)if(allowedLessonIds.has(word.lessonId))addText(allowed,word.text);
  for(const unit of units)if(allowedUnitIds.has(unit.id)){
   for(const char of unit.chars)addText(allowed,char);
   addText(allowed,unit.banner.text);
   addText(allowed,unit.goal.text);
  }
  for(const lesson of allowedLessons){
   for(const char of lesson.chars)addText(allowed,char);
   for(const step of lesson.steps){
    if(step.phrase&&phrases[step.phrase])addText(allowed,phrases[step.phrase].text);
    addText(allowed,step.prompt);
    addText(allowed,step.answer);
    for(const option of step.options||[])addText(allowed,option);
   }
  }

  for(const step of mission.steps){
   assert.equal((step.speaker||'').match(hanzi),null,mission.id+' speaker labels stay readable in English');
   for(const text of [step.prompt,step.answer,...step.options]){
    const unseen=(String(text).match(hanzi)||[]).filter(char=>!allowed.has(char));
    assert.deepEqual([...new Set(unseen)],[],mission.id+' contains unseen Hanzi in '+text);
   }
  }
 }
});
