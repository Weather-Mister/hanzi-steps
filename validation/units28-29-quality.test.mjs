import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {validSession,findLesson,historicalLessonLengthsFor} from '../lib/curriculum.ts';

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

test('Published Units 28-29 step prefixes and every historical completion bound survive later repairs',()=>{
  for(const [id,ids] of Object.entries(baseline)){
    const lesson=findLesson(id);
    assert.ok(lesson,id);
    assert.deepEqual(lesson.steps.slice(0,ids.length).map(s=>s.id),ids,id);
    for(let index=0;index<ids.length;index++)assert.ok(validSession(sample(id,index,false)),`${id} partial ${index}`);
    const history=historicalLessonLengthsFor(id);
    assert.ok(history.includes(ids.length),`${id}: original published length missing from history`);
    assert.ok(history.includes(lesson.steps.length),`${id}: rebalanced published length missing from history`);
    for(const length of history)assert.ok(validSession(sample(id,length,true)),`${id} historical completion ${length}`);
    assert.ok(validSession(sample(id,lesson.steps.length,true)),`${id} current completion`);
    if(lesson.steps.length>ids.length)assert.ok(validSession(sample(id,ids.length,false)),`${id} first appended step`);
  }
});


function reviewBlob(module){
  const review=module.lessons.find(l=>l.id===module.reviewLessonId);
  const values=[];
  for(const step of review.steps){
    for(const key of ['prompt','answer','explanation','audioText','char'])if(typeof step[key]==='string')values.push(step[key]);
    if(Array.isArray(step.options))values.push(...step.options);
    if(Array.isArray(step.tokens))values.push(...step.tokens);
    if(step.phrase&&module.phrases[step.phrase]){
      const phrase=module.phrases[step.phrase];
      values.push(phrase.text,phrase.pinyin,phrase.meaning,phrase.note??'');
    }
  }
  return values.join('\n');
}

test('Rebalanced reviews sample every new vocabulary item and include handwriting retrieval',()=>{
  for(const m of [u28,u29]){
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    const blob=reviewBlob(m);
    for(const word of m.newVocabulary.map(v=>v.text))
      assert.ok(blob.includes(word),`${m.unit.id}: review never retrieves ${word}`);
    assert.ok(review.steps.some(s=>s.type==='memory'||s.type==='parts'),`${m.unit.id}: review lacks handwriting/component retrieval`);
    const listened=new Set(review.steps.filter(s=>s.type==='listen').map(s=>s.char));
    assert.ok([...listened].some(ch=>m.newCharacters.includes(ch)),`${m.unit.id}: review listening ignores all unit-new characters`);
  }
});

test('Unit 28 explicitly teaches the polyphonic contrast 便宜 piányi vs 便利 biànlì',()=>{
  const store=u28.newVocabulary.find(v=>v.text==='便利商店');
  assert.match(store?.note??'',/biàn/);
  assert.match(store?.note??'',/pián/);
  const lesson=u28.lessons.find(l=>l.id==='u28-object');
  const check=lesson.steps.find(s=>s.id==='u28-object-s3');
  assert.equal(check.answer,'biàn');
  assert.ok(check.options.includes('pián'));
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
