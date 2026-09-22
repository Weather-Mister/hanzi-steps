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

test('Exam Study uses Mega Challenge queue semantics without progress state',()=>{
 const set=examStudySets.find(candidate=>candidate.id===1);
 assert.ok(set);
 const items=examStudyItems(set);
 const queue=makeMegaQueue(items,'week-1-test');
 assert.equal(queue.length,items.length);

 const failed=advanceMegaQueue(queue,false);
 assert.equal(failed.length,queue.length);
 assert.equal(failed.at(-1),queue[0]);

 const passed=advanceMegaQueue(queue,true);
 assert.equal(passed.length,queue.length-1);
 assert.ok(!passed.includes(queue[0]));
});

test('restoring an Exam Study mastered word cannot duplicate queue entries',()=>{
 const set=examStudySets.find(candidate=>candidate.id===1);
 assert.ok(set);
 const items=examStudyItems(set);
 const ids=new Set(items.map(item=>item.id));
 const first=items[0].id;
 const second=items[1].id;

 assert.deepEqual(restoreMegaWord([first],second,ids),[first,second]);
 assert.deepEqual(restoreMegaWord([first],first,ids),[first]);
});
