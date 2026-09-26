import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCourse} from './course-io.mjs';
import {validateCourse,han} from './validate.mjs';
import {validSession,findLesson,completedLessonIds} from '../lib/curriculum.ts';
const course=await loadCourse();
const baseline=JSON.parse(readFileSync(new URL('./fixtures/units21-25-before-repair.json',import.meta.url),'utf8'));
const repaired=course.modules.filter(m=>m.bookId==='book-1'&&m.order>=21&&m.order<=25);
const sample=(lessonId,index,complete)=>({id:'550e8400-e29b-41d4-a716-446655440035',lessonId,index,complete,independent:0,assisted:0,updatedAt:1});

test('Extensions preserve every old step position, old completion and partial checkpoint',()=>{
 for(const [id,ids] of Object.entries(baseline)){
  const lesson=findLesson(id);
  assert.deepEqual(lesson.steps.slice(0,ids.length).map(s=>s.id),ids,id);
  for(let index=0;index<ids.length;index++)assert.ok(validSession(sample(id,index,false)),`${id} partial ${index}`);
  assert.ok(validSession(sample(id,ids.length,true)),`${id} old completion`);
  assert.ok(completedLessonIds([id]).has(id));
  assert.ok(validSession(sample(id,lesson.steps.length,true)),`${id} new completion`);
  assert.equal(validSession(sample(id,1,true)),false,`${id} arbitrary early completion`);
  assert.equal(validSession(sample(id,lesson.steps.length+1,true)),false);
  if(lesson.steps.length>ids.length)assert.ok(validSession(sample(id,ids.length,false)),`${id} at the first appended step`);
 }
});

test('Repaired phrase and grammar examples do not introduce uncovered characters',()=>{
 const known=new Set();
 for(const m of course.modules){
  m.newCharacters.forEach(c=>known.add(c));
  if(m.bookId!=='book-1'||m.order<21||m.order>25)continue;
  const texts=[...Object.entries(m.phrases).map(([id,p])=>[id,p.text]),...Object.entries(m.grammarRules).flatMap(([id,g])=>g.examples.map(e=>[id,e.text]))];
  for(const [id,text] of texts)for(const ch of han(text))assert.ok(known.has(ch),`${id}: untaught ${ch}`);
 }
});

test('Unit 25 compound characters have meaningful groups matching the licensed geometry',()=>{
 const m=repaired.find(m=>m.order===25);
 for(const ch of m.newCharacters){
  const c=m.characters[ch];assert.ok(c.parts.length>1,`${ch}: one-tile building exercise`);
  assert.equal(new Set(c.parts.flatMap(p=>p.strokes)).size,c.strokes,ch);
 }
 assert.deepEqual(m.characters['騎'].parts.map(p=>p.label),['馬','奇']);
 assert.deepEqual(m.characters['計'].parts.map(p=>p.label),['言','十']);
 assert.deepEqual(m.characters['載'].parts[0].strokes,[0,1,2,10,11,12]);
});

test('Actual generic fallback template is rejected, even with a different character and count',()=>{
 const modules=structuredClone(course.modules);const m=modules.find(m=>m.unit.id==='unit-25');
 m.characters['騎'].parts[0].description='Practice all 18 strokes of 騎 in the displayed Traditional stroke order before writing it from memory.';
 assert.ok(validateCourse(course.manifest,modules,course.geometry).some(e=>e.includes('generic component explanation')));
});

test('Negation scope and first-teaching regressions are corrected',()=>{
 const u22=repaired.find(m=>m.order===22),u23=repaired.find(m=>m.order===23),u24=repaired.find(m=>m.order===24);
 assert.equal(u22.phrases['u22-every-not-busy'].meaning,'I am never busy on weekends.');
 for(const w of ['每天','剛開始']){assert.ok(u22.newVocabulary.some(v=>v.text===w));assert.ok(u23.reviewVocabulary.includes(w));assert.ok(!u23.newVocabulary.some(v=>v.text===w));}
 for(const g of ['u24-bijiao','u24-you-you']){
  assert.ok(u24.grammarRules[g].examples.some(e=>e.text.includes('不')));
  assert.ok(u24.lessons.at(-1).steps.some(s=>s.type==='select'&&s.grammarIds?.includes(g)&&s.answer.includes('不')));
 }
});

test('Book 1 from Unit 23 assesses listening and all newly taught grammar in review',()=>{
 for(const m of course.modules.filter(m=>m.bookId==='book-1'&&m.order>=23)){
  const review=m.lessons.at(-1);
  assert.ok(review.steps.length>=18,m.unit.id);
  assert.ok(review.steps.filter(s=>s.type==='listen').length>=3,m.unit.id);
  for(const id of m.unit.grammarIds){
   const related=review.steps.filter(s=>!['phrase','grammar'].includes(s.type)&&
    (s.grammarIds?.includes(id)||m.phrases[s.phrase]?.grammarIds?.includes(id)));
   assert.ok(related.length,`${m.unit.id}: review omits ${id}`);
  }
 }
});

// This gate applies to future Book 1 additions too. A passing graph alone cannot
// tell whether an exercise occurs before its explanation.
test('Book 1 from Unit 21 introduces referenced grammar and phrases before assessing them',()=>{
 const taughtGrammar=new Set(),taughtPhrases=new Set();
 for(const m of course.modules){
  for(const l of m.lessons)for(const s of l.steps){
   if(s.type==='grammar')taughtGrammar.add(s.grammar);
   if(s.type==='phrase')taughtPhrases.add(s.phrase);
   if(m.bookId!=='book-1'||m.order<21||['grammar','phrase','intro'].includes(s.type))continue;
   if(s.type==='order')assert.ok(taughtPhrases.has(s.phrase),`${s.id}: phrase not taught`);
   for(const g of [...(s.grammarIds||[]),...(m.phrases[s.phrase]?.grammarIds||[])])assert.ok(taughtGrammar.has(g),`${s.id}: grammar ${g} not taught`);
  }
  // Earlier legacy grammar may be formally taught through phrase notes.
  m.grammarIntroductions.forEach(g=>taughtGrammar.add(g.id));
 }
});

test('Contextual listening audio is explicit and cannot speak two answer options',()=>{
 const u21=repaired.find(m=>m.order===21);const s=u21.lessons.flatMap(l=>l.steps).find(s=>s.id==='u21-from-to-listen-空');
 assert.equal(s.audioText,'有空');
 const modules=structuredClone(course.modules);const m=modules.find(m=>m.unit.id==='unit-21');
 const bad=m.lessons.flatMap(l=>l.steps).find(s=>s.id==='u21-from-to-listen-空');
 bad.audioText='有空';bad.options=['空','有','從'];
 assert.ok(validateCourse(course.manifest,modules,course.geometry).some(e=>e.includes('contextual audio must contain only one answer option')));
});
