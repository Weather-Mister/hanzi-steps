import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {loadCourse} from './course-io.mjs';
import {historicalLessonLengthsFor} from '../lib/lesson-revisions.ts';
const course=await loadCourse();
const book1=course.modules.filter(u=>u.bookId==='book-1');
const book2=course.modules.filter(u=>u.bookId==='book-2');
const baseline=JSON.parse(fs.readFileSync(new URL('./fixtures/book2-published-checkpoints.json',import.meta.url),'utf8'));
const ignored=new Set(['id','bookId','unitId','lessonId','reviewLessonId','bookReference','grammarIds','revisionStepIds','reviewGrammar','lessonIds','ref','kind','phrase','grammar']);
function strings(v){if(typeof v==='string')return [v];if(Array.isArray(v))return v.flatMap(strings);if(v&&typeof v==='object')return Object.entries(v).filter(([k])=>!ignored.has(k)).flatMap(([,x])=>strings(x));return [];}
const allSteps=book2.flatMap(u=>u.lessons.flatMap(l=>l.steps));
const find=id=>allSteps.find(s=>s.id===id);

test('Book 2 never asks a learner to retrieve an absent source, picture or story',()=>{
 const forbidden=/\b(?:in|from|according to|shown in|refer to|look at|see) (?:the|this|that) (?:dialogue|reading|story|picture|image|illustration|chart|textbook)\b|source[- ](?:aligned|situation|text)|Rebuild this complete/i;
 for(const u of book2)for(const text of strings(u))assert.ok(!forbidden.test(text),text);
 const s=find('b2u4-l7-book2-cumulative-3');
 assert.match(s.prompt,/郵局也可以提錢/);
 assert.equal(s.answer,'郵局');
 for(const [unit,lesson,id] of [[1,6,'b2u1-help-exchange'],[2,6,'b2u2-cash-context'],[3,6,'b2u3-walk-context'],[4,6,'b2u4-shopping-context']]){
  const u=book2[unit-1],steps=u.lessons[lesson-1].steps;
  const teaching=steps.findIndex(s=>s.phrase===id),check=steps.findIndex(s=>s.id===id+'-check');
  assert.ok(teaching>=0&&check>teaching,id);
  assert.ok(u.phrases[id].pinyin&&u.phrases[id].meaning&&u.phrases[id].note);
  assert.equal(u.phrases[id].practice,false,'multi-speaker/paragraph input must stay out of standalone sentence practice');
  assert.match(steps[check].prompt,/\p{Script=Han}/u,'question repeats its own evidence');
 }
});

test('All Book 2 first-owned forms are grounded in the supplied Lesson 1 vocabulary lists',()=>{
 // Printed pp. 4-5 (Vocabulary I / names / phrases), 7-8 (Vocabulary II / phrases).
 const source='走 路人 幫忙 迷路 下 路口 段 過 第 紅綠燈 告訴 提款機 超商 應該 郵局 提 那邊 師大 和平東路 往前 右轉 聽起來 看見 下載 地圖 好用 著 日用品 經過 巷子 餓 一邊 發現 離 背包 正好 最後 枝 筆 本 本子 左轉 師大路上 麵店'.split(' ');
 const canonical=new Map(course.modules.flatMap(u=>u.newVocabulary.map(w=>[w.text,u.bookId])));
 for(const w of source)assert.ok(canonical.has(w),`missing source form ${w}`);
 for(const u of book2)for(const w of u.newVocabulary)assert.ok(source.includes(w.text),`unsupported new target ${w.text}`);
 assert.equal(book2.flatMap(u=>u.newVocabulary).length,41);
 assert.equal(book2[3].newVocabulary.find(w=>w.text==='背包').pinyin,'bēibāo');
 assert.equal(book2[1].characters['段'].example.pinyin,'yī duàn');
 assert.equal(book2[3].newVocabulary.find(w=>w.text==='一邊').meaning,'while; marks simultaneous actions');
});

test('Words are introduced before assessment across unit boundaries, including distractors and order banks',()=>{
 const vocab=course.modules.flatMap(u=>u.newVocabulary.map(w=>w.text)).sort((a,b)=>b.length-a.length);
 const known=new Set(book1.flatMap(u=>u.newVocabulary.map(w=>w.text)));
 function missing(text){const result=new Set();for(const run of text.match(/[\p{Script=Han}]+/gu)||[]){let i=0;while(i<run.length){const word=vocab.find(w=>run.startsWith(w,i));if(word){if(!known.has(word))result.add(word);i+=word.length;}else i++;}}return [...result];}
 for(const u of book2)for(const l of u.lessons)for(const s of l.steps){
  if(s.type==='phrase'){
   const p=u.phrases[s.phrase];if(u.newVocabulary.some(w=>w.text===p.text))known.add(p.text);
   const missingTeaching=missing(p.text+' '+p.note);
   // 提款 is explicitly glossed as the internal compound of ATM, not tested as a new standalone verb.
   if(p.text==='提款機'){
    assert.match(p.note,/提款 \(tíkuǎn\) means withdraw money/);
    assert.deepEqual(missingTeaching,['提']);
   }else assert.deepEqual(missingTeaching,[],`${s.id}: unglossed future vocabulary in teaching`);
  }
  if(s.type==='grammar')assert.deepEqual(missing(strings(u.grammarRules[s.grammar]).join(' ')),[],`${s.id}: future vocabulary in grammar examples`);
  if(['select','listen','order'].includes(s.type)){
   const payload=[s.prompt,...(s.options||[]),s.audioText,...(s.tokens||[]),s.type==='order'?u.phrases[s.phrase].text:''].filter(Boolean).join(' ');
   assert.deepEqual(missing(payload),[],`${s.id}: word assessed before introduction`);
  }
 }
});

test('Real grammar use has an earlier introduction and meaningful negative/question practice',()=>{
 const taught=new Set(book1.flatMap(u=>Object.keys(u.grammarRules)));
 const patterns=[[/從.*往/s,'b2u1-l4-from-toward'],[/(?:聽|看|吃)起來.+(?:遠|辣|怎麼樣)/s,'b2u2-l4-evaluative'],[/[看拿]著/s,'b2u3-l3-ongoing'],[/一邊.+一邊/s,'b2u4-l2-simultaneous'],[/離.+(?:遠|近)/s,'b2u4-l3-distance']];
 for(const u of book2)for(const l of u.lessons)for(const s of l.steps){
  if(s.type==='grammar')taught.add(s.grammar);
  if(!['select','listen','order'].includes(s.type))continue;
  const text=[s.prompt,s.audioText,...(s.options||[]),s.type==='order'?u.phrases[s.phrase].text:''].filter(Boolean).join(' ');
  for(const [pattern,id] of patterns)if(pattern.test(text))assert.ok(taught.has(id),`${s.id} uses ${id} before explanation`);
  for(const id of s.grammarIds||[])assert.ok(taught.has(id));
 }
 for(const prefix of ['b2u1-route','b2u2-evaluation','b2u3-ongoing','b2u4-simultaneous','b2u4-distance'])for(const suffix of ['negative','question'])assert.ok(find(`${prefix}-${suffix}`));
 for(const u of book2)for(const g of Object.values(u.grammarRules)){
  assert.ok(g.examples.some(e=>/[不沒]/u.test(e.text)),`${g.id}: no negative model`);
  assert.ok(g.examples.some(e=>e.text.endsWith('？')),`${g.id}: no question model`);
 }
});

test('Published checkpoints keep their original positions and completion bounds',()=>{
 for(const u of book2)for(const l of u.lessons){
  const old=baseline.lessons[l.id];assert.ok(old,`unexpected renamed lesson ${l.id}`);
  const digest=createHash('sha256').update(JSON.stringify(l.steps.slice(0,old.length).map(s=>s.id))).digest('hex');
  assert.equal(digest,old.stepIdsSha256,`${l.id}: a saved position changed`);
  if(l.steps.length>old.length)assert.ok(historicalLessonLengthsFor(l.id).includes(old.length),`${l.id}: old completion lost`);
 }
});
