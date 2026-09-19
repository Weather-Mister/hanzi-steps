import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {lessons,units,books,characters,grammarRules,phrases,vocabulary,characterOrder,lessonAvailable,validSession} from '../lib/curriculum.ts';
import {unitSixLessons,unitSixCharacterOrder,unitSixVocabulary,unitSixGrammar} from '../lib/unit-six.ts';
const hanzi=t=>[...t].filter(c=>/\p{Script=Han}/u.test(c));
const digest=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const baseline=JSON.parse(fs.readFileSync(new URL('./fixtures/before-unit-six-hashes.json',import.meta.url)));
test('Unit 6 preserves all existing lessons, units, words, character records, grammar, phrases, and Book 2/3',()=>{
 for(const [name,items] of Object.entries({lessons,units,vocabulary,characters,grammarRules,phrases})){
  const current=Array.isArray(items)?Object.fromEntries(items.map(v=>[v.id||v.text,v])):items;
  for(const [id,hash] of Object.entries(baseline[name]))assert.equal(digest(current[id]),hash,`${name}: ${id}`);
 }
 assert.equal(digest(books.slice(1).map(b=>({...b,unitIds:b.unitIds.filter(id=>id!=='book-2-unit-2')}))),baseline.otherBooks);
 const data=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url)));
 for(const [c,hash] of Object.entries(baseline.strokes))assert.equal(digest(data[c]),hash,c);
});
test('Unit 6 has only the approved vocabulary, 10 new characters, six lessons and a review',()=>{
 assert.deepEqual(unitSixVocabulary.map(w=>w.text),['家','家人','爸爸','媽媽','哥哥','姐姐','妹妹','誰','照片','張']);
 assert.deepEqual(unitSixCharacterOrder,[...'家爸媽哥姐妹誰照片張']);
 assert.equal(characterOrder.filter(c=>c==='人').length,1);
 assert.equal(unitSixVocabulary.some(w=>w.text==='人'),false);
 assert.equal(unitSixLessons.length,7);
 const steps=unitSixLessons.flatMap(l=>l.steps);
 assert.ok(steps.length>=95&&steps.length<=105);
 assert.deepEqual([...new Set(steps.map(s=>s.type))].sort(),['intro','trace','complete','memory','select','parts','build','match','phrase','order','listen','grammar'].sort());
 for(const c of unitSixCharacterOrder)for(const t of ['intro','trace','complete','memory'])assert.ok(steps.some(s=>s.char===c&&s.type===t),`${c} ${t}`);
 for(const c of unitSixCharacterOrder.filter(c=>characters[c].layout!=='whole'))assert.ok(steps.some(s=>s.char===c&&s.type==='build'));
 for(const t of ['trace','memory'])assert.ok(steps.some(s=>s.char==='人'&&s.type===t));
 assert.ok(!steps.some(s=>s.char==='人'&&s.type==='intro'));
 const oldUnits=units.filter(u=>/^unit-[1-5]$/.test(u.id));
 const oldChars=new Set(oldUnits.flatMap(u=>u.chars));
 const reserved=['房子','漂亮','好看','照相','幾','兄弟','姐妹','老師'];
 const body=JSON.stringify({lessons:unitSixLessons,rules:unitSixGrammar,phrases:Object.fromEntries(Object.entries(phrases).filter(([k])=>k.startsWith('u6-')))});
 for(const word of reserved)if(![...word].every(c=>oldChars.has(c)))assert.ok(!body.includes(word),word);
 assert.ok(!body.includes('二個'));
 assert.ok(unitSixGrammar['u6-close'].explanation.includes('我的爸爸 is grammatical'));
 assert.equal(lessonAvailable('u6-family',new Set()),false);
 const done=new Set(['u5-review']);
 for(const l of unitSixLessons){assert.ok(lessonAvailable(l.id,done));done.add(l.id);for(let i=0;i<=l.steps.length;i++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440016',lessonId:l.id,index:i,independent:0,assisted:0,complete:i===l.steps.length,updatedAt:1}));}
});
test('Unit 6 introduces tested words, characters, and grammar before exercises',()=>{
 const old=units.filter(u=>/^unit-[1-5]$/.test(u.id));
 const seenChars=new Set(old.flatMap(u=>u.chars));
 const seenWords=new Set(vocabulary.filter(w=>old.some(u=>u.lessonIds.includes(w.lessonId))).map(w=>w.text));
 const seenGrammar=new Set(old.flatMap(u=>u.grammarIds));
 for(const l of unitSixLessons){
  assert.equal(new Set(l.steps.map(s=>s.id)).size,l.steps.length);
  for(const s of l.steps){
   if(s.type==='intro'){assert.ok(!seenChars.has(s.char));seenChars.add(s.char);}
   if(s.type==='grammar'){
    assert.notEqual(l.id,'u6-review');
    const r=grammarRules[s.grammar];assert.ok(r);seenGrammar.add(r.id);
    for(const w of r.words||[]){assert.ok(unitSixVocabulary.some(v=>v.text===w));seenWords.add(w);for(const c of w)assert.ok(seenChars.has(c));}
    for(const ex of r.examples)for(const c of hanzi(ex.text))assert.ok(seenChars.has(c),`${r.id}: ${c}`);
   }
   const p=phrases[s.phrase];
   for(const id of [...(s.grammarIds||[]),...(p?.grammarIds||[])])assert.ok(seenGrammar.has(id),`${s.id}: ${id}`);
   if(p){assert.equal(p.tokens.join(''),hanzi(p.text).join(''));for(const w of p.tokens)assert.ok(seenWords.has(w),`${s.id}: ${w}`);}
   if(s.type==='order'){const bank=[...s.tokens];for(const w of p.tokens){const i=bank.indexOf(w);assert.ok(i>=0,`${s.id}: missing ${w}`);bank.splice(i,1);}}
   if(s.options){assert.ok(s.options.includes(s.answer));assert.equal(new Set(s.options).size,s.options.length);}
   if(s.type!=='parts')for(const text of [s.prompt||'',...(s.options||[]),...(s.tokens||[])])for(const c of hanzi(text))assert.ok(seenChars.has(c),`${s.id}: ${c}`);
   if(s.char&&s.type!=='intro')assert.ok(seenChars.has(s.char));
   if(s.type==='listen')assert.equal(new Set(s.options.map(c=>characters[c].pinyin)).size,s.options.length);
  }
 }
 for(const w of unitSixVocabulary)assert.ok(seenWords.has(w.text));
 for(const g of Object.keys(unitSixGrammar))assert.ok(seenGrammar.has(g));
});
