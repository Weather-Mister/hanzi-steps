import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCourse} from './course-io.mjs';
import {validSession} from '../lib/curriculum.ts';
const {modules}=await loadCourse();
const units=modules.filter(m=>m.bookId==='book-1'&&m.order>=26&&m.order<=31);
const baseline=JSON.parse(readFileSync(new URL('./fixtures/units26-31-before-audit.json',import.meta.url),'utf8'));
const get=n=>units.find(m=>m.order===n);

test('Six-unit repair preserves every published position and completed checkpoint',()=>{
 for(const u of units)for(const l of u.lessons){
  assert.deepEqual(l.steps.map(s=>s.id),baseline[l.id],l.id);
  for(let index=0;index<=l.steps.length;index++){
   const complete=index===l.steps.length;
   assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440031',lessonId:l.id,index,complete,independent:0,assisted:0,updatedAt:1}),`${l.id} ${index}`);
  }
 }
});
test('Lesson 10 direction phrase pinyin follows 去 in both teaching surfaces',()=>{
 for(const p of [get(31).phrases['u31-toward'],get(31).characters['往'].example]){
  assert.match(p.text,/去[。]?$/);assert.match(p.pinyin,/qù[.]?$/);assert.doesNotMatch(p.pinyin,/zǒu/);
 }
});
test('Clothing pronunciation follows textbook printed p.207 throughout Units 30-31',()=>{
 let count=0;
 for(const u of [get(30),get(31)]){
  const objects=[...u.newVocabulary,...Object.values(u.phrases),...Object.values(u.characters).map(c=>c.example),...Object.values(u.grammarRules).flatMap(g=>g.examples)];
  for(const p of objects)if(p.text.includes('衣服')){assert.match(p.pinyin,/yīfú/);count++;}
 }
 assert.ok(count>=6);
});
test('Source table correction keeps 美 allowed and tests its actual classification',()=>{
 const u=get(30),g=u.grammarRules['u30-state-redup'];
 assert.match(g.explanation,/permits 美/);assert.match(g.explanation,/excludes 多、貴、近、忙、新、少/);
 assert.doesNotMatch(g.explanation,/not freely reduplicate.*美/);
 assert.equal(u.lessons.flatMap(l=>l.steps).find(s=>s.id==='u30-taste-s3').answer,'美');
});
test('Known movable-clause exercises no longer reject an equivalent order',()=>{
 for(const [n,ids] of [[26,['u26-break-o1','u26-review-10','u26-when-o2']],[27,['u27-when-o1','u27-when-o2','u27-review-10','u27-sometimes-o1','u27-review-12']]]){
  for(const id of ids)assert.equal(get(n).lessons.flatMap(l=>l.steps).find(s=>s.id===id).type,'select',id);
 }
});
test('Character labels describe the actual source stroke groups',()=>{
 assert.match(get(26).characters['出'].parts[1].description,/upper/);
 assert.deepEqual(get(28).characters['非'].parts.map(p=>p.strokes),[[0,1,2,3],[4,5,6,7]]);
 assert.match(get(29).characters['果'].parts[0].label,/日/);
 assert.match(get(30).characters['心'].memory,/left dot/);
});

test('Ordering banks are unsolved permutations, with no missing or extra tokens',()=>{
 for(const u of units)for(const l of u.lessons)for(const s of l.steps)if(s.type==='order'){
  const answer=u.phrases[s.phrase].tokens;
  assert.deepEqual([...s.tokens].sort(),[...answer].sort(),s.id);
  assert.notEqual(s.tokens.join(''),answer.join(''),`${s.id}: bank gives away answer`);
 }
});
