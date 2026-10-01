import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {loadCourse} from './course-io.mjs';
import {validateCourse} from './validate.mjs';
import {isOrderAnswerAccepted} from '../lib/order-answer.ts';
import {learnedPracticeItems} from '../lib/practice-engine.ts';
const course=await loadCourse();
const phrases=Object.assign({},...course.modules.map(m=>m.phrases));

test('every sentence has an explanation and every choice has an answer and rationale',()=>{
 for(const m of course.modules){
  for(const [id,p]of Object.entries(m.phrases)){
   assert.ok(p.note.trim().length>=20,id+' needs an explanation');
   assert.doesNotMatch(p.note,/support-only|canonical ownership|deferred .*glyph|learner-visible application only|source turn\s*\d|Recognition\/read card|Meaning-first lexical explanation/i,id);
  }
  for(const l of m.lessons)for(const s of l.steps)if(['select','listen','parts'].includes(s.type)){
   assert.ok(s.options.includes(s.answer),s.id);
   assert.equal(new Set(s.options).size,s.options.length,s.id+' has duplicate options');
   assert.ok(s.explanation?.trim(),s.id+' needs feedback');
  }
 }
});

test('validation rejects empty explanations and invalid alternative token inventories',()=>{
 const c=structuredClone(course),p=Object.values(c.modules[0].phrases)[0];
 p.note='';p.acceptedTokenOrders=[['unavailable token']];
 const errors=validateCourse(c.manifest,c.modules,c.geometry).join('\n');
 assert.match(errors,/requires a learner-facing explanation/);
 assert.match(errors,/alternative must reuse exactly the canonical tokens/);
});

test('reviewed simultaneous-action alternatives reach practice without accepting arbitrary rearrangement',()=>{
 const completed=new Set(course.modules.flatMap(m=>m.lessons.map(l=>l.id)));
 const items=learnedPracticeItems(completed);
 for(const id of ['b2u4-l2-model','b2u4-l7-cumulative-1']){
  const p=phrases[id],options={alternatives:p.acceptedTokenOrders};
  assert.equal(isOrderAnswerAccepted(['他們','一邊','看','地圖','一邊','吃麵'],p.tokens,options),true);
  assert.equal(isOrderAnswerAccepted(['他們','看','一邊','地圖','一邊','吃麵'],p.tokens,options),false);
  assert.equal(isOrderAnswerAccepted(p.acceptedTokenOrders[0],p.tokens,{...options,strict:true}),false);
  assert.deepEqual(items.find(item=>item.traditional===p.text)?.acceptedTokenOrders,p.acceptedTokenOrders);
 }
});

test('lesson feedback exposes notes without requiring grammar tags and practice shares grading',()=>{
 const app=fs.readFileSync(new URL('../components/learning-app.tsx',import.meta.url),'utf8');
 const practice=fs.readFileSync(new URL('../components/smart-practice.tsx',import.meta.url),'utf8');
 assert.match(app,/phrase!\.note\?` \$\{phrase!\.note\}`/);
 assert.doesNotMatch(app,/phrase!\.grammarIds\?\.length\?` \$\{phrase!\.note\}`/);
 assert.match(app,/step\.semanticAnswer\?'Choose the meaning you hear'/);
 assert.equal((practice.match(/isOrderAnswerAccepted\(chosen,tokens,/g)||[]).length,2,'keyboard and button must use the shared grader');
});

test('the packet calculation has its one-packet-per-dose premise before assessment',()=>{
 const m=course.modules.find(m=>m.unit.id==='unit-48'),steps=m.lessons.flatMap(l=>l.steps);
 assert.match(m.phrases['u48-prescription-visual'].note,/each dose is one packet/);
 assert.ok(steps.findIndex(s=>s.id==='u48-prescription-visual')<steps.findIndex(s=>s.id==='u48-a003-s3'));
});
