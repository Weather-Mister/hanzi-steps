import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {validSession,findLesson} from '../lib/curriculum.ts';

const course=await loadCourse();
const u28=course.modules.find(m=>m.unit.id==='unit-28');
const u29=course.modules.find(m=>m.unit.id==='unit-29');
const baseline=JSON.parse(readFileSync(new URL('./fixtures/units28-29-before-rebalance.json',import.meta.url),'utf8'));
const sample=(lessonId,index,complete)=>({id:'550e8400-e29b-41d4-a716-446655440038',lessonId,index,complete,independent:0,assisted:0,updatedAt:1});

test('Units 28-29 are rebalanced without padding novelty',()=>{
  assert.equal(u28.newVocabulary.length,12);
  assert.equal(u28.newCharacters.length,10);
  assert.equal(u29.newVocabulary.length,12);
  assert.equal(u29.newCharacters.length,10);
  for(const m of [u28,u29]){
    assert.equal(m.lessons.length,7);
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    assert.ok(review.steps.length>=18&&review.steps.length<=22,m.unit.id);
    assert.ok(review.steps.filter(s=>s.type==='listen').length>=3,m.unit.id);
  }
  for(const word of ['非常','但是','站','或是','便利商店','公共汽車','中國'])
    assert.ok(u28.newVocabulary.some(v=>v.text===word),`Unit 28 missing ${word}`);
  for(const word of ['水果','黃色','給','香','甜','以前'])
    assert.ok(u29.newVocabulary.some(v=>v.text===word),`Unit 29 missing ${word}`);
});

test('Published Units 28-29 step prefixes and historical completion bounds survive the rebalance',()=>{
  for(const [id,ids] of Object.entries(baseline)){
    const lesson=findLesson(id);
    assert.ok(lesson,id);
    assert.deepEqual(lesson.steps.slice(0,ids.length).map(s=>s.id),ids,id);
    for(let index=0;index<ids.length;index++)assert.ok(validSession(sample(id,index,false)),`${id} partial ${index}`);
    assert.ok(validSession(sample(id,ids.length,true)),`${id} published completion`);
    assert.ok(validSession(sample(id,lesson.steps.length,true)),`${id} rebalanced completion`);
    if(lesson.steps.length>ids.length)assert.ok(validSession(sample(id,ids.length,false)),`${id} first appended step`);
  }
});

test('Units 28-29 phrases and grammar examples use covered Han characters',()=>{
  const known=new Set();
  for(const m of course.modules){
    m.newCharacters.forEach(ch=>known.add(ch));
    if(!['unit-28','unit-29'].includes(m.unit.id))continue;
    const texts=[
      ...Object.values(m.phrases).map(p=>p.text),
      ...Object.values(m.grammarRules).flatMap(g=>g.examples.map(e=>e.text)),
    ];
    for(const value of texts)for(const ch of han(value))assert.ok(known.has(ch),`${m.unit.id}: uncovered ${ch} in ${value}`);
  }
});

test('Every new grammar target is independently assessed in its review',()=>{
  for(const m of [u28,u29]){
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    for(const id of m.unit.grammarIds){
      const related=review.steps.filter(s=>!['phrase','grammar'].includes(s.type)&&
        (s.grammarIds?.includes(id)||m.phrases[s.phrase]?.grammarIds?.includes(id)));
      assert.ok(related.length,`${m.unit.id}: review omits ${id}`);
    }
  }
});

test('Known unresolved Traditional-handwriting source gaps are not silently first-taught',()=>{
  for(const word of ['逛','臺東','臺南','網路上','故宮博物院']){
    assert.ok(!u28.newVocabulary.some(w=>w.text===word),`Unit 28 silently added ${word}`);
    assert.ok(!u29.newVocabulary.some(w=>w.text===word),`Unit 29 silently added ${word}`);
  }
  assert.ok(!u28.newCharacters.includes('逛')&&!u29.newCharacters.includes('逛'));
  assert.ok(!u28.newCharacters.includes('臺')&&!u29.newCharacters.includes('臺'));
});
