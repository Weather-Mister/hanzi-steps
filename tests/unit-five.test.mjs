import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {books,characters,grammarRules,lessonAvailable,lessons,phrases,unitFiveLessons,unitFiveCharacterOrder,units,vocabulary,validSession,wordMeaning} from '../lib/curriculum.ts';
const hanzi=text=>[...text].filter(c=>/\p{Script=Han}/u.test(c));
const unit=units.find(u=>u.id==='unit-5');
test('Book sections preserve earlier checkpoints',()=>{
 assert.deepEqual(books.map(b=>[b.number,b.available,b.unitIds.length]),[[1,true,8],[2,true,2],[3,false,0]]);
 assert.deepEqual(books[0].unitIds,units.filter(u=>!u.id.startsWith('book-2-')).map(u=>u.id));
 assert.deepEqual(lessons.filter(l=>['unit-1','unit-2','unit-3','unit-4'].includes(l.unitId)),JSON.parse(fs.readFileSync(new URL('./fixtures/unit-four-and-earlier-checkpoints.json',import.meta.url))));
 assert.equal(unitFiveLessons.length,7);
 assert.equal(lessonAvailable('u5-drinks',new Set()),false);
 const completed=new Set(['u4-review']);
 for(const l of unitFiveLessons){assert.ok(lessonAvailable(l.id,completed));completed.add(l.id);assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440015',lessonId:l.id,index:l.steps.length,independent:0,assisted:0,complete:true,updatedAt:1}));}
});
test('Book 1 gap unit teaches all vocabulary and patterns before exercises, including duplicate word tiles',()=>{
 const seenChars=new Set(units.filter(u=>u.number<5).flatMap(u=>u.chars));
 const seenWords=new Set(vocabulary.filter(w=>!w.lessonId.startsWith('u5-')).map(w=>w.text));
 const seenGrammar=new Set(units.filter(u=>u.number<5).flatMap(u=>u.grammarIds));
 const introduced=new Set();
 for(const lesson of unitFiveLessons)for(const step of lesson.steps){
  if(step.type==='intro'){assert.ok(!seenChars.has(step.char));seenChars.add(step.char);if(vocabulary.some(w=>w.text===step.char))seenWords.add(step.char);}
  if(step.type==='grammar'){
   assert.notEqual(lesson.id,'u5-review');
   const rule=grammarRules[step.grammar];assert.ok(rule);seenGrammar.add(rule.id);introduced.add(rule.id);
   for(const word of rule.words||[]){assert.ok(vocabulary.some(w=>w.text===word));for(const c of word)assert.ok(seenChars.has(c));seenWords.add(word);}
   for(const ex of rule.examples)for(const c of hanzi(ex.text))assert.ok(seenChars.has(c),`${rule.id}: ${c}`);
  }
  const phrase=step.phrase?phrases[step.phrase]:undefined;
  for(const id of [...(step.grammarIds||[]),...(phrase?.grammarIds||[])])assert.ok(seenGrammar.has(id),`${step.id}: ${id}`);
  if(phrase){assert.equal(phrase.tokens.join(''),hanzi(phrase.text).join(''));for(const word of phrase.tokens){assert.ok(seenWords.has(word),`${step.id}: ${word}`);assert.ok(wordMeaning(word));}}
  if(step.type==='order'){const bank=[...step.tokens];for(const word of phrase.tokens){const index=bank.indexOf(word);assert.notEqual(index,-1);bank.splice(index,1);}}
  if(step.type!=='parts')for(const text of [step.prompt||'',...(step.tokens||[]),...(step.options||[])])for(const c of hanzi(text))assert.ok(seenChars.has(c),`${step.id}: ${c}`);
  if(step.type==='listen')assert.equal(new Set(step.options.map(c=>characters[c].pinyin)).size,step.options.length);
 }
 assert.deepEqual([...introduced].sort(),[...unit.grammarIds].sort());
 for(const word of vocabulary.filter(w=>w.lessonId.startsWith('u5-')))assert.ok(seenWords.has(word.text));
 for(const char of unitFiveCharacterOrder)for(const type of ['intro','trace','build','complete','memory'])assert.ok(unitFiveLessons.flatMap(l=>l.steps).some(s=>s.char===char&&s.type===type),`${char}: ${type}`);
});
