import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lessons,units,vocabulary,characters,grammarRules,phrases,characterOrder,unitLibraryCharacters,completedLessonIds,previousLessonLengths,validSession,lessonAvailable} from '../lib/curriculum.ts';

test('Rebalanced units cap actual vocabulary and character load, without hidden extras',()=>{
 const targets=[['unit-7',10,13,123],['unit-8',8,12,112]];
 for(const [id,wordCount,charCount,stepCap] of targets){
  const unit=units.find(u=>u.id===id),ls=lessons.filter(l=>l.unitId===id);
  assert.equal(vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId)).length,wordCount);
  assert.equal(unitLibraryCharacters(unit).length,charCount);
  assert.deepEqual(unit.chars,unitLibraryCharacters(unit));
  assert.ok(ls.reduce((sum,l)=>sum+l.steps.length,0)<=stepCap);
  assert.equal(ls.length,7);assert.equal(ls.filter(l=>l.review).length,1);
  assert.ok(ls.slice(0,-1).every(l=>l.chars.length<=3&&l.steps.length<=23));
  for(const char of unit.chars){
   const steps=ls.flatMap(l=>l.steps);
   for(const type of ['intro','trace','complete','memory'])assert.ok(steps.some(s=>s.char===char&&s.type===type),`${id} ${char} ${type}`);
  }
  const currentText=JSON.stringify({unit,ls,rules:unit.grammarIds.map(id=>grammarRules[id]),phrases:ls.flatMap(l=>l.steps).filter(s=>s.phrase).map(s=>phrases[s.phrase])});
  for(const deferred of ['兄弟','姐妹','漂亮','房子','打籃球','踢足球','還是','早上','晚上','吃','晚飯','好不好','好看的照片'])assert.ok(!currentText.includes(deferred),`${id} still teaches ${deferred}`);
 }
 assert.equal(characterOrder.length,new Set(characterOrder).size);
 for(const c of '幾房相末打足泳常吧今明早玩起晚飯可')assert.ok(characters[c],`Retain independent practice for ${c}`);
});

test('Retired checkpoints retain exact bounds and are never reused by a revised lesson',()=>{
 for(const [lessonId,length] of Object.entries(previousLessonLengths)){
  assert.ok(!lessons.some(l=>l.id===lessonId));
  for(const index of [0,Math.floor(length/2),length]){
   const saved={id:'550e8400-e29b-41d4-a716-446655440050',lessonId,index,independent:0,assisted:0,complete:index===length,updatedAt:1};
   assert.ok(validSession(saved));
   assert.ok(!validSession({...saved,index:length+1}));
   assert.ok(!validSession({...saved,complete:!saved.complete}));
  }
 }
 assert.ok(!validSession({id:'550e8400-e29b-41d4-a716-446655440050',lessonId:'toString',index:0,independent:0,assisted:0,complete:false,updatedAt:1}));
});

test('Completed work carries forward, partial work does not silently skip new material',()=>{
 const partial=completedLessonIds(['u6-review','u7-numbers']);
 assert.ok(!partial.has('u7-v2-numbers'),'The revised first lesson also includes teacher/description material');
 assert.ok(lessonAvailable('u7-v2-numbers',partial));
 assert.ok(!lessonAvailable('u7-v2-describe',partial));
 const combined=completedLessonIds(['u7-numbers','u7-describe']);
 assert.ok(combined.has('u7-v2-numbers'));
 const fullyComplete=completedLessonIds(['u7-review','u8-review']);
 for(const l of lessons.filter(l=>['unit-7','unit-8'].includes(l.unitId)))assert.ok(fullyComplete.has(l.id));
 assert.ok(lessonAvailable('u8-v2-time',new Set(['u7-review'])));
 assert.ok(!lessonAvailable('u8-v2-time',new Set()));
 assert.deepEqual([...completedLessonIds(['hello','identity','student'])],['hello','identity','student']);
});
