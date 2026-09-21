import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';

const course=await loadCourse();
const u28=course.modules.find(m=>m.unit.id==='unit-28');
const u29=course.modules.find(m=>m.unit.id==='unit-29');

test('Units 28-29 keep honest grammar-heavy novelty and review sizes',()=>{
  assert.equal(u28.newVocabulary.length,5);
  assert.equal(u28.newCharacters.length,6);
  assert.equal(u29.newVocabulary.length,6);
  assert.equal(u29.newCharacters.length,4);
  for(const m of [u28,u29]){
    assert.equal(m.lessons.length,7);
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    assert.ok(review.steps.length>=18&&review.steps.length<=22,m.unit.id);
    assert.ok(review.steps.filter(s=>s.type==='listen').length>=3,m.unit.id);
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

test('Known Lesson 9 handwriting blockers are not silently first-taught',()=>{
  assert.ok(!u28.newVocabulary.some(w=>w.text==='逛'||w.text==='臺東'));
  assert.ok(!u29.newVocabulary.some(w=>w.text==='逛'||w.text==='臺東'));
  assert.ok(!u28.newCharacters.includes('逛')&&!u29.newCharacters.includes('逛'));
  assert.ok(!u28.newCharacters.includes('臺')&&!u29.newCharacters.includes('臺'));
});
