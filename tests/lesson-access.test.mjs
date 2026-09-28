import {test} from 'node:test';
import assert from 'node:assert/strict';
import {latestCourseLesson,lessonAvailable,lessons,units} from '../lib/curriculum.ts';

const publishedUnits=units.filter(unit=>unit.lessonIds.length&&unit.lessonIds.every(id=>lessons.some(lesson=>lesson.id===id)));

test('Every published unit starts with its first lesson unlocked',()=>{
 const none=new Set();
 for(const unit of publishedUnits){
  assert.equal(lessonAvailable(unit.lessonIds[0],none),true,`${unit.id} first lesson should be open`);
  if(unit.lessonIds.length>1){
   assert.equal(lessonAvailable(unit.lessonIds[1],none),false,`${unit.id} second lesson should still be gated`);
   assert.equal(lessonAvailable(unit.lessonIds[1],new Set([unit.lessonIds[0]])),true,`${unit.id} second lesson should unlock after the first`);
  }
 }
});

test('Completed lessons stay available regardless of where the learner entered a unit',()=>{
 for(const unit of publishedUnits){
  for(const lessonId of unit.lessonIds){
   assert.equal(lessonAvailable(lessonId,new Set([lessonId])),true,lessonId);
  }
 }
});

test('Startup location follows the most recent course lesson and ignores handwriting practice',()=>{
 const first=publishedUnits[0]?.lessonIds[0];
 const later=publishedUnits.at(-1)?.lessonIds[0];
 assert.ok(first&&later);
 const session=(lessonId,updatedAt)=>({id:`session-${updatedAt}`,lessonId,index:0,independent:0,assisted:0,complete:false,updatedAt});
 const recent=latestCourseLesson([
  session(first,100),
  session(`practice-${lessons.find(l=>l.id===first).chars[0]}`,300),
  session(later,200),
 ]);
 assert.equal(recent?.id,later);
});
