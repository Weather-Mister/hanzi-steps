import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {previousLessonLengths} from '../lib/lesson-revisions.ts';

const course=await loadCourse();
const u28=course.modules.find(m=>m.unit.id==='unit-28');
const u29=course.modules.find(m=>m.unit.id==='unit-29');

test('Rebalanced Units 28-29 are substantive without novelty padding',()=>{
  assert.equal(u28.newVocabulary.length,11);
  assert.equal(u29.newVocabulary.length,11);
  assert.equal(u28.newCharacters.length,8);
  assert.equal(u29.newCharacters.length,8);
  for(const m of [u28,u29]){
    assert.equal(m.lessons.length,7);
    assert.ok(m.newVocabulary.length>=10&&m.newVocabulary.length<=13,m.unit.id);
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    assert.ok(review.steps.length>=18&&review.steps.length<=22,m.unit.id);
    assert.ok(review.steps.filter(s=>s.type==='listen').length>=3,m.unit.id);
  }
  assert.ok(!u29.newVocabulary.some(w=>['九月','三十號','一塊芒果'].includes(w.text)));
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

test('Published Unit 28-29 completion bounds remain accepted after append-only rebalance',()=>{
  const expected={
    'u28-film':5,'u28-years-days':14,'u28-hours':13,'u28-separable':6,'u28-review':20,
    'u29-date':16,'u29-hai':5,'u29-maokong':9,'u29-condition':10,
    'u29-negative':4,'u29-integrate':6,'u29-review':20,
  };
  for(const [id,len] of Object.entries(expected))assert.equal(previousLessonLengths[id],len,id);
});

test('Known Lesson 9 handwriting blockers remain explicit rather than silently substituted',()=>{
  assert.ok(!u28.newVocabulary.some(w=>w.text==='逛'||w.text==='臺東'));
  assert.ok(!u29.newVocabulary.some(w=>w.text==='逛'||w.text==='臺東'));
  assert.ok(!u28.newCharacters.includes('逛')&&!u29.newCharacters.includes('逛'));
  assert.ok(!u28.newCharacters.includes('臺')&&!u29.newCharacters.includes('臺'));
});

test('Unit 29 starts Lesson 10 with the source-supported VV看 restriction',()=>{
  const g=u29.grammarRules['u29-vv-kan'];
  assert.ok(g);
  assert.match(g.explanation,/normally does not follow 看 directly|normally does not take|cannot be followed/i);
  assert.ok(u29.newVocabulary.some(w=>w.text==='吃吃看'));
  assert.ok(u29.newVocabulary.some(w=>w.text==='水果'));
});
