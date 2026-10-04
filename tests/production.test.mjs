import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {normalizeProductionAnswer,productionAnswerCorrect} from '../lib/production-answer.ts';
import {lessons,phrases,grammarRules,validSession,historicalLessonLengthsFor,lessonAvailable} from '../lib/curriculum.ts';
import {practiceAttemptForStep,updatePracticeState,learnedPracticeItems} from '../lib/practice-engine.ts';
import {knowledgeAttemptTargets} from '../lib/cumulative-knowledge.ts';
import {loadCourse} from '../validation/course-io.mjs';import {validateCourse} from '../validation/validate.mjs';
const baseline=JSON.parse(fs.readFileSync(new URL('../validation/fixtures/production-append-baseline.json',import.meta.url)));
const tasks=lessons.flatMap(l=>l.steps.filter(s=>s.type==='produce').map(s=>({l,s})));
const session=(lessonId,index,complete)=>({id:'550e8400-e29b-41d4-a716-446655440090',lessonId,index,complete,independent:0,assisted:0,updatedAt:1});

test('Production ignores only harmless spacing and punctuation; no character or grammar folding',()=>{
 const answer='我要兩杯熱茶。';assert.ok(productionAnswerCorrect(' 我 要兩杯熱茶！ ',answer,[]));
 for(const wrong of ['我要两杯热茶','我要杯熱茶','我要兩熱杯茶','我不要兩杯熱茶','我要兩杯茶','我要兩杯熱茶嗎','我想要兩杯熱茶','我要２杯熱茶','我要二杯熱茶','我要兩杯熱茶🙂','我要兩杯熱茶／',''])assert.equal(productionAnswerCorrect(wrong,answer,[]),false,wrong);
 assert.notEqual(normalizeProductionAnswer('車'),normalizeProductionAnswer('車'),'NFC must not be used as script conversion');
});
test('All authored alternatives grade explicitly and missing/trailing words never do',()=>{
 for(const {s}of tasks){for(const answer of [s.answer,...s.production.acceptedAnswers]){
  assert.ok(productionAnswerCorrect(answer,s.answer,s.production.acceptedAnswers),s.id+': '+answer);
  assert.ok(productionAnswerCorrect(' '+answer+'！',s.answer,s.production.acceptedAnswers));
 }
 assert.equal(productionAnswerCorrect(s.answer+'錯',s.answer,s.production.acceptedAnswers),false,s.id);
 }
 const conditional=tasks.find(({s})=>s.id==='u29-produce-if-free').s;
 assert.ok(productionAnswerCorrect('我要是有空我就跟你一起去',conditional.answer,conditional.production.acceptedAnswers));
 assert.equal(productionAnswerCorrect('要是我沒空我就跟你一起去',conditional.answer,conditional.production.acceptedAnswers),false);
});
test('Every old lesson prefix, completed checkpoint and partial index remains valid',()=>{
 for(const old of baseline.lessons){const l=lessons.find(l=>l.id===old.id);assert.ok(l);assert.equal(createHash('sha256').update(JSON.stringify(l.steps.slice(0,old.length))).digest('hex'),old.stepsHash,old.id);
  assert.ok(validSession(session(l.id,old.length,true)),l.id+' historical completion');
  for(let i=0;i<old.length;i++)assert.ok(validSession(session(l.id,i,false)),l.id+':'+i);
  if(l.steps.length>old.length){assert.ok(historicalLessonLengthsFor(l.id).includes(old.length));assert.ok(validSession(session(l.id,old.length,false)),'unfinished tail remains resumable');assert.ok(l.steps.slice(old.length).every(s=>s.type==='produce'));}
 }
});
test('Production targets existing phrase and linked grammar skills; assisted success cannot grow a clean streak',()=>{
 const completed=new Set(lessons.map(l=>l.id));
 for(const {l,s}of tasks){const target=practiceAttemptForStep(s);assert.ok(target);if(s.id==='u37-produce-happy-birthday'){assert.equal(target.mode,'input');assert.ok(target.itemId.startsWith('v1:u37-birthday:'))}else assert.deepEqual(target,{itemId:'phrase:'+s.phrase,mode:'sentence'});
  assert.ok(learnedPracticeItems(completed).some(i=>i.id===target.itemId));
  const clean=updatePracticeState(undefined,{...target,correct:true,assisted:false,now:1});
  const assisted=updatePracticeState(clean,{...target,correct:true,assisted:true,now:2});
  assert.equal(assisted.streak,0);assert.equal(assisted.cleanCorrect,1);assert.equal(assisted.assisted,1);
  for(const linked of knowledgeAttemptTargets(s,completed,l.id))assert.equal(linked.mode,'sentence');
 }
});
test('Production is delayed, has taught glyphs/patterns, and never exposes an initial answer bank',()=>{
 const known=new Set(),taughtRules=new Set(),taughtPhrases=new Set();let ordinal=0;const displayed=new Map();
 for(const l of lessons)for(const s of l.steps){
  if(s.type==='intro')known.add(s.char);if(s.type==='grammar')taughtRules.add(s.grammar);
  if(s.type==='produce'){
   // A transfer sentence may be new; its words, glyphs and constructions must be taught.
   assert.ok(phrases[s.phrase],s.id+' existing productive canonical phrase');
   assert.ok(l.steps.at(-1)===s||l.steps.slice(l.steps.indexOf(s)+1).every(x=>x.type==='produce'),s.id+' appended');
   assert.ok(!s.options&&!s.tokens&&!s.audioText&&!/\p{Script=Han}/u.test(s.prompt));
   assert.ok(!/\p{Script=Han}/u.test(s.production.grammarHint),'first hint must not reveal Chinese');
   for(const answer of [s.answer,...s.production.acceptedAnswers])for(const c of answer)if(/\p{Script=Han}/u.test(c))assert.ok(known.has(c)||(c==='台'&&['u43-produce-finished-stay','u43-produce-duration-question'].includes(s.id)),s.id+' untaught '+c);
   for(const g of s.grammarIds)assert.ok(taughtRules.has(g),s.id+' untaught grammar '+g);
   assert.ok(ordinal-(displayed.get(normalizeProductionAnswer(s.answer))??-1)>=4,s.id+' needs at least three intervening steps');
   assert.ok(phrases[s.phrase].practice!==false);
   assert.equal(normalizeProductionAnswer((s.production.fallbackTokens||phrases[s.phrase].tokens).join('')),normalizeProductionAnswer(s.answer));
  }else{
   const payloads=[s.prompt,s.answer,s.explanation,...s.options||[]];
   if(s.type==='phrase'||s.type==='order'){const p=phrases[s.phrase];if(p){payloads.push(p.text);taughtPhrases.add(s.phrase);}}
   if(s.type==='grammar')payloads.push(...grammarRules[s.grammar].examples.map(e=>e.text));
   for(const text of payloads.filter(Boolean))displayed.set(normalizeProductionAnswer(text),ordinal);
  }
  ordinal++;
 }
});
test('Validator rejects malformed production contracts and support-only fallback promotion',async()=>{
 const {manifest,modules,geometry}=await loadCourse();assert.deepEqual(validateCourse(manifest,modules,geometry),[]);
 for(const [field,value,pattern]of [['production',undefined,/missing production contract/],['answer','錯',/productive canonical phrase/],['options',['wrong'],/initial answer bank/]]){
  const copy=structuredClone(modules),s=copy[10].lessons.at(-1).steps.at(-1);s[field]=value;assert.ok(validateCourse(manifest,copy,geometry).some(e=>pattern.test(e)),field);
 }
 const copy=structuredClone(modules);copy[10].lessons.at(-1).steps.at(-1).production.acceptedAnswers=['我要一杯茶！'];assert.ok(validateCourse(manifest,copy,geometry).some(e=>/duplicate normalized/.test(e)));
});

 test('Density stays low, with no production in Units 1–7 or consecutive appended drills',()=>{
  for(let n=1;n<=48;n++){const current=tasks.filter(({l})=>l.unitId==='unit-'+n);assert.ok(current.length<=(n<=7?0:n<=20?1:3),'unit '+n);}
  for(const l of lessons)assert.ok(l.steps.filter(s=>s.type==='produce').length<=1,l.id);
  for(const {s}of tasks)assert.ok(normalizeProductionAnswer(s.answer).length<=24,s.id+' too long');
  const taiwan=tasks.find(({s})=>s.id==='u43-produce-finished-stay').s;
  assert.ok(productionAnswerCorrect('我在台灣住了一年',taiwan.answer,taiwan.production.acceptedAnswers));
  assert.equal(productionAnswerCorrect('我在台湾住了一年',taiwan.answer,taiwan.production.acceptedAnswers),false);
 });
