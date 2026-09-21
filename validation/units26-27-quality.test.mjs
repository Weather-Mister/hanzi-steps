import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';

const course=await loadCourse();
const u26=course.modules.find(m=>m.unit.id==='unit-26');
const u27=course.modules.find(m=>m.unit.id==='unit-27');
const b2u2=course.modules.find(m=>m.unit.id==='book-2-unit-2');

test('Units 26-27 keep the intended honest novelty and review sizes',()=>{
  assert.equal(u26.newVocabulary.length,11);
  assert.equal(u26.newCharacters.length,15);
  assert.equal(u27.newVocabulary.length,10);
  assert.equal(u27.newCharacters.length,11);
  for(const m of [u26,u27]){
    assert.equal(m.lessons.length,7);
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    assert.ok(review.steps.length>=18&&review.steps.length<=22,m.unit.id);
    assert.ok(review.steps.filter(s=>s.type==='listen').length>=3,m.unit.id);
  }
});

test('Units 26-27 phrases and grammar examples use covered Han characters',()=>{
  const known=new Set();
  for(const m of course.modules){
    m.newCharacters.forEach(ch=>known.add(ch));
    if(!['unit-26','unit-27'].includes(m.unit.id))continue;
    const texts=[
      ...Object.values(m.phrases).map(p=>p.text),
      ...Object.values(m.grammarRules).flatMap(g=>g.examples.map(e=>e.text)),
    ];
    for(const text of texts)for(const ch of han(text))assert.ok(known.has(ch),`${m.unit.id}: uncovered ${ch} in ${text}`);
  }
});

test('Every new grammar target is independently assessed in its review',()=>{
  for(const m of [u26,u27]){
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    for(const id of m.unit.grammarIds){
      const related=review.steps.filter(s=>!['phrase','grammar'].includes(s.type)&&
        (s.grammarIds?.includes(id)||m.phrases[s.phrase]?.grammarIds?.includes(id)));
      assert.ok(related.length,`${m.unit.id}: review omits ${id}`);
    }
  }
});

test('行 is first-taught as xing in Book 1 but bank pronunciation remains explicitly hang',()=>{
  assert.ok(u26.newCharacters.includes('行'));
  assert.equal(u26.characters['行'].pinyin,'xíng');
  assert.equal(u26.characters['行'].audioText,'不行');
  assert.ok(!b2u2.newCharacters.includes('行'));
  assert.ok(!Object.hasOwn(b2u2.characters,'行'));
  const bank=b2u2.lessons.find(l=>l.id==='b2u2-bank');
  assert.ok(!bank.chars.includes('行'));
  const pronunciation=bank.steps.find(s=>s.id==='b2u2-bank-5');
  assert.equal(pronunciation.answer,'háng');
  assert.match(pronunciation.explanation,/yínháng/);
});
