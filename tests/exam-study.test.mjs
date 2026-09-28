import assert from 'node:assert/strict';
import test from 'node:test';
import {advanceMegaQueue,makeMegaQueue,restoreMegaWord} from '../lib/mega-challenge.ts';
import {examStudyItems,examStudySets} from '../lib/exam-study.ts';

test('Week 1 exam list is complete and isolated',()=>{
 const set=examStudySets.find(candidate=>candidate.id===1);
 assert.ok(set);
 assert.equal(set.title,'Week 1');
 assert.equal(set.words.length,19);

 const items=examStudyItems(set);
 assert.equal(items.length,19);
 assert.equal(new Set(items.map(item=>item.id)).size,19);
 assert.ok(items.every(item=>item.lessonId==='exam-study-1'));
 assert.ok(items.every(item=>item.characters.length>0));
});

test('Week 2 exam list exactly matches supplied textbook vocabulary and is isolated',()=>{
 const set=examStudySets.find(candidate=>candidate.id===2);
 assert.ok(set);
 assert.equal(set.title,'Week 2');
 assert.deepEqual(set.words,[
  {traditional:'名字',pinyin:'míngzi',meaning:'full name; first name; given name'},
  {traditional:'哪',pinyin:'nǎ / něi',meaning:'which'},
  {traditional:'呢',pinyin:'ne',meaning:'question particle'},
  {traditional:'臺灣',pinyin:'Táiwān',meaning:'Taiwan'},
  {traditional:'他',pinyin:'tā',meaning:'he; him; she; her'},
  {traditional:'中國',pinyin:'Zhōngguó',meaning:'China; Chinese'},
  {traditional:'她',pinyin:'tā',meaning:'she; her'},
  {traditional:'誰',pinyin:'shéi',meaning:'who; whom'},
  {traditional:'華人',pinyin:'Huárén',meaning:'Ethnic Chinese; overseas Chinese; citizen of Chinese origin'},
 ]);

 const items=examStudyItems(set);
 assert.equal(items.length,9);
 assert.equal(new Set(items.map(item=>item.id)).size,9);
 assert.ok(items.every(item=>item.lessonId==='exam-study-2'));
 assert.ok(items.every(item=>item.characters.length>0));
});

test('Exam Study sets use Mega Challenge queue semantics without progress state',()=>{
 for(const set of examStudySets){
  const items=examStudyItems(set);
  const queue=makeMegaQueue(items,`week-${set.id}-test`);
  assert.equal(queue.length,items.length);

  const failed=advanceMegaQueue(queue,false);
  assert.equal(failed.length,queue.length);
  assert.equal(failed.at(-1),queue[0]);

  const passed=advanceMegaQueue(queue,true);
  assert.equal(passed.length,queue.length-1);
  assert.ok(!passed.includes(queue[0]));
 }
});

test('restoring an Exam Study mastered word cannot duplicate queue entries',()=>{
 for(const set of examStudySets){
  const items=examStudyItems(set);
  const ids=new Set(items.map(item=>item.id));
  const first=items[0].id;
  const second=items[1].id;

  assert.deepEqual(restoreMegaWord([first],second,ids),[first,second]);
  assert.deepEqual(restoreMegaWord([first],first,ids),[first]);
 }
});
