import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {books,units,lessons,characters,grammarRules,phrases,vocabulary,lessonAvailable,bookTwoLessons,wordMeaning} from '../lib/curriculum.ts';
import {bookTwoCharacterOrder} from '../lib/book-two.ts';
const hanzi=t=>[...t].filter(c=>/\p{Script=Han}/u.test(c));
test('Book 2 has an independent entry and sequential lessons, while Book 3 remains a placeholder',()=>{
 assert.equal(bookTwoLessons.length,7);
 assert.equal(books[1].available,true);
 assert.deepEqual(books[1].unitIds,['book-2-unit-1','book-2-unit-2']);
 assert.equal(books[2].available,false);
 const done=new Set();
 for(const [i,l] of bookTwoLessons.entries()){
  if(i)assert.equal(lessonAvailable(l.id,new Set()),false);
  assert.ok(lessonAvailable(l.id,done));done.add(l.id);
 }
 assert.equal(lessonAvailable('u5-drinks',new Set()),false);
 assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
});
test('Book 2 teaches every tested word and grammar pattern before recall',()=>{
 const old=units.filter(u=>books[0].unitIds.includes(u.id));
 const seenChars=new Set(old.flatMap(u=>u.chars));
 const seenWords=new Set(vocabulary.filter(w=>old.some(u=>u.lessonIds.includes(w.lessonId))).map(w=>w.text));
 const seenGrammar=new Set(old.flatMap(u=>u.grammarIds));
 for(const lesson of bookTwoLessons){
  assert.equal(new Set(lesson.steps.map(s=>s.id)).size,lesson.steps.length);
  for(const s of lesson.steps){
   if(s.type==='intro')seenChars.add(s.char);
   if(s.type==='grammar'){
    assert.notEqual(lesson.id,'b2-review');
    const g=grammarRules[s.grammar];assert.ok(g);seenGrammar.add(g.id);
    for(const w of g.words||[]){assert.ok(vocabulary.some(v=>v.text===w));seenWords.add(w);for(const c of w)assert.ok(seenChars.has(c),`${s.id}: ${c}`);}
    for(const ex of g.examples)for(const c of hanzi(ex.text))assert.ok(seenChars.has(c),`${g.id}: ${c}`);
   }
   const p=phrases[s.phrase];
   for(const g of [...(s.grammarIds||[]),...(p?.grammarIds||[])])assert.ok(seenGrammar.has(g),g);
   if(p){assert.equal(p.tokens.join(''),hanzi(p.text).join(''));for(const w of p.tokens){assert.ok(seenWords.has(w),`${s.id}: ${w}`);assert.ok(wordMeaning(w));}}
   if(s.type==='order'){const bank=[...s.tokens];for(const w of p.tokens){const i=bank.indexOf(w);assert.ok(i>=0);bank.splice(i,1);}}
   if(s.options){assert.ok(s.options.includes(s.answer));assert.equal(new Set(s.options).size,s.options.length);}
   if(s.type!=='parts')for(const t of [s.prompt||'',...(s.options||[]),...(s.tokens||[])])for(const c of hanzi(t))assert.ok(seenChars.has(c),`${s.id}: ${c}`);
   if(s.type==='listen')assert.equal(new Set(s.options.map(c=>characters[c].pinyin)).size,s.options.length);
  }
 }
 for(const c of bookTwoCharacterOrder)for(const t of ['intro','trace','complete','memory'])assert.ok(bookTwoLessons.flatMap(l=>l.steps).some(s=>s.char===c&&s.type===t));
});
