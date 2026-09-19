import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {characters,grammarRules,phrases,vocabulary,units,books,lessons,lessonAvailable,validSession,wordMeaning} from '../lib/curriculum.ts';
import {bookTwoUnitTwoLessons as added,bookTwoUnitTwoCharacterOrder as order,bookTwoUnitTwoVocabulary as words} from '../lib/book-two-unit-two.ts';
const hanzi=t=>[...t].filter(c=>/\p{Script=Han}/u.test(c));
test('Book 2 Unit 2 has six lessons and review, preserved sequence, and valid resumable checkpoints',()=>{
 assert.equal(added.length,7);
 assert.deepEqual(order,[...'銀行超商附近遠離']);
 assert.equal(words.length,6);
 assert.deepEqual(books[0].unitIds,['unit-1','unit-2','unit-3','unit-4','unit-5','unit-6','unit-7','unit-8']);
 assert.deepEqual(books[1].unitIds,['book-2-unit-1','book-2-unit-2']);
 assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
 assert.equal(lessonAvailable(added[0].id,new Set()),false);
 const done=new Set(['b2-review']);
 for(const l of added){
  assert.ok(lessonAvailable(l.id,done));done.add(l.id);
  assert.equal(new Set(l.steps.map(s=>s.id)).size,l.steps.length);
  for(let i=0;i<=l.steps.length;i++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440022',lessonId:l.id,index:i,independent:0,assisted:0,complete:i===l.steps.length,updatedAt:1}));
 }
 const steps=added.flatMap(l=>l.steps);
 assert.deepEqual([...new Set(steps.map(s=>s.type))].sort(),['intro','trace','build','complete','memory','match','listen','parts','select','grammar','phrase','order'].sort());
 for(const c of order)for(const t of ['intro','trace','build','complete','memory'])assert.ok(steps.some(s=>s.char===c&&s.type===t),`${c} ${t}`);
 assert.ok(!added.at(-1).steps.some(s=>s.type==='intro'||s.type==='grammar'));
});
test('Book 2 Unit 2 teaches every tested character, word, and pattern before exercises',()=>{
 const prior=units.filter(u=>u.id!=='book-2-unit-2');
 const seenChars=new Set(prior.flatMap(u=>u.chars));
 const seenWords=new Set(vocabulary.filter(w=>!w.lessonId.startsWith('b2u2-')).map(w=>w.text));
 const seenGrammar=new Set(prior.flatMap(u=>u.grammarIds));
 for(const l of added)for(const s of l.steps){
  if(s.type==='intro'){assert.ok(!seenChars.has(s.char));seenChars.add(s.char);}
  if(s.char&&s.type!=='intro')assert.ok(seenChars.has(s.char),s.id);
  if(s.type==='grammar'){
   const g=grammarRules[s.grammar];assert.ok(g);seenGrammar.add(g.id);
   for(const w of g.words||[]){assert.ok(words.some(v=>v.text===w));seenWords.add(w);for(const c of w)assert.ok(seenChars.has(c),`${s.id}: ${c}`);}
   for(const ex of g.examples)for(const c of hanzi(ex.text))assert.ok(seenChars.has(c),`${s.id} example ${c}`);
  }
  const p=phrases[s.phrase];
  for(const id of [...(s.grammarIds||[]),...(p?.grammarIds||[])])assert.ok(seenGrammar.has(id),`${s.id}: ${id}`);
  if(p){assert.equal(p.tokens.join(''),hanzi(p.text).join(''));for(const w of p.tokens){assert.ok(seenWords.has(w),`${s.id}: ${w}`);assert.ok(wordMeaning(w));}}
  if(s.type==='order'){const bank=[...s.tokens];for(const w of p.tokens){const i=bank.indexOf(w);assert.ok(i>=0,`${s.id}: missing ${w}`);bank.splice(i,1);}}
  if(s.options){assert.ok(s.options.includes(s.answer));assert.equal(new Set(s.options).size,s.options.length);}
  if(s.type!=='parts')for(const t of [s.prompt||'',...(s.options||[]),...(s.tokens||[])])for(const c of hanzi(t))assert.ok(seenChars.has(c),`${s.id}: ${c}`);
  if(s.type==='listen')assert.equal(new Set(s.options.map(c=>characters[c].pinyin)).size,s.options.length);
 }
 for(const w of words)assert.ok(seenWords.has(w.text));
});
test('Every new character has source-exact geometry and a unique component explanation',()=>{
 const source=Object.fromEntries(fs.readFileSync(new URL('../public/stroke-source/book-two-unit-two-graphics.txt',import.meta.url),'utf8').trim().split('\n').map(l=>{const d=JSON.parse(l);return [d.character,d]}));
 const data=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url),'utf8'));
 const memories=new Set();
 for(const c of order){
  assert.deepEqual(data[c].strokes,source[c].strokes,c);assert.deepEqual(data[c].medians,source[c].medians,c);
  assert.deepEqual(characters[c].parts.flatMap(p=>p.strokes).sort((a,b)=>a-b),Array.from({length:source[c].strokes.length},(_,i)=>i));
  const memory=characters[c].memory;assert.ok(memory.length>30);assert.ok(!/Follow the highlighted groups|Keep the whole character balanced/.test(memory));memories.add(memory);
  for(const p of characters[c].parts)assert.ok(p.description.length>35);
 }
 assert.equal(memories.size,order.length);
 assert.equal(characters['行'].audioText,'銀行');
 for(const c of ['超','近','遠'])assert.equal(characters[c].layoutLabel,'Wraparound');
});
