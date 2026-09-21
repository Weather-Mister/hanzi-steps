import assert from 'node:assert/strict';
import test from 'node:test';
import {books,units} from '../lib/curriculum.ts';
import {
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

 const miss=updatePracticeState(second,{itemId:'x',mode:'recall',correct:false,assisted:false,now:now+2000});
 assert.equal(miss.misses,1);
 assert.equal(miss.streak,0);
 assert.ok(miss.strength<second.strength);
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

test('Revenge Round attacks one unresolved mistake three different ways then clears when strong',()=>{
 const target=item(1);
 const state={
  [practiceSkillKey(target.id,'recall')]:{
   itemId:target.id,mode:'recall',attempts:4,correct:2,assisted:0,misses:2,streak:1,
   strength:.4,lastSeen:100,nextReview:200,
  },
 };
 const round=makeRevengeRound([target],state,'revenge-test');
 assert.equal(round.length,3);
 assert.equal(new Set(round.map(question=>question.item.id)).size,1);
 assert.equal(new Set(round.map(question=>question.mode)).size,3);

 const resolved={
  [practiceSkillKey(target.id,'recall')]:{...state[practiceSkillKey(target.id,'recall')],strength:.8},
 };
 assert.deepEqual(makeRevengeRound([target],resolved,'revenge-test'),[]);
});

test('Mega Challenge uses the latest complete four-unit checkpoint inside one book',()=>{
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
  for(let i=0;i<4;i++)items.push(item(unitIndex*10+i,unitId));
 });
 const queue=makeMegaCheckpoint(items,{},'mega-test',completed);
 assert.equal(queue.length,12);
 assert.ok(queue.every(question=>firstBook.unitIds.slice(4,8).includes(question.item.unitId)));
 assert.equal(new Set(queue.map(question=>question.item.unitId)).size,4);
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
 assert.equal(practiceAttemptForStep({type:'grammar'}),null);
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
