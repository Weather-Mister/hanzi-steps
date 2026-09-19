import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {lessons,units,books,vocabulary,characters,grammarRules,phrases,wordMeaning,lessonAvailable,validSession} from '../lib/curriculum.ts';
import {unitEightLessons as added,unitEightCharacters as chars,unitEightGrammar as rules,unitEightPhrases as ps,unitEightVocabulary as words,unitEightRevisionStepIds as revision} from '../lib/unit-eight.ts';
const hanzi=t=>[...t].filter(c=>/\p{Script=Han}/u.test(c));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('Rebalancing preserves Units 1–6, other books, and original character geometry',()=>{
 // Unit 7 is deliberately rebalanced in the same change; compare the immutable
 // earlier course instead of blessing altered hashes for the target units.
 const baseline=JSON.parse(fs.readFileSync(new URL('./fixtures/before-unit-seven-hashes.json',import.meta.url)));
 for(const [key,records]of Object.entries({lessons,units,vocabulary,characters,grammarRules,phrases})){
  const current=Array.isArray(records)?Object.fromEntries(records.map(r=>[r.id||r.text,r])):records;
  for(const [id,digest]of Object.entries(baseline[key]))assert.equal(hash(current[id]),digest,`${key} ${id}`);
 }
 assert.equal(hash(books.slice(1)),baseline.otherBooks);
 const strokes=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url)));
 for(const[c,digest]of Object.entries(baseline.strokes))assert.equal(hash(strokes[c]),digest,c);
});
test('Six smaller lessons and review have valid progression, checkpoints, and spaced retrieval',()=>{
 assert.equal(added.length,7);assert.equal(words.length,8);
 const practice=added.flatMap(l=>l.steps).filter(s=>!['intro','grammar','phrase'].includes(s.type));
 assert.ok(revision.length/practice.length>=.15&&revision.length/practice.length<=.3);
 assert.ok(added.every(l=>l.steps.length<=23));
 assert.ok(added.slice(0,-1).every(l=>l.chars.length<=3));
 assert.ok(!added.at(-1).steps.some(s=>['grammar','intro'].includes(s.type)));
 assert.equal(lessonAvailable('u8-v2-time',new Set()),false);
 const done=new Set(['u7-v2-review']);
 for(const l of added){assert.ok(lessonAvailable(l.id,done));done.add(l.id);for(let i=0;i<=l.steps.length;i++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440017',lessonId:l.id,index:i,independent:0,assisted:0,complete:i===l.steps.length,updatedAt:1}));}
 assert.deepEqual([...new Set(added.flatMap(l=>l.steps).map(s=>s.type))].sort(),['intro','trace','build','complete','memory','match','parts','listen','grammar','phrase','order','select'].sort());
 for(const w of words)assert.ok(!vocabulary.some(old=>!old.lessonId.startsWith('u8-')&&old.text===w.text),`not new: ${w.text}`);
});
test('Unit 8 teaches all tested spellings, words, writing targets, and grammar before recall',()=>{
 const prior=units.filter(u=>/^unit-[1-7]$/.test(u.id));
 const writing=new Set(prior.flatMap(u=>u.chars)),reading=new Set(writing);
 const seenWords=new Set(vocabulary.filter(w=>prior.some(u=>u.lessonIds.includes(w.lessonId))).map(w=>w.text));
 for(const w of seenWords)for(const c of hanzi(w))reading.add(c);
 const seenGrammar=new Set(prior.flatMap(u=>u.grammarIds));
 for(const l of added){
  assert.equal(new Set(l.steps.map(s=>s.id)).size,l.steps.length);
  for(const s of l.steps){
   if(s.type==='intro'){assert.ok(!writing.has(s.char));writing.add(s.char);reading.add(s.char);}
   if(s.type==='grammar'){
    const g=grammarRules[s.grammar];assert.ok(g);seenGrammar.add(g.id);
    for(const w of g.words||[]){assert.ok(words.some(v=>v.text===w));seenWords.add(w);for(const c of w)reading.add(c);}
    for(const e of g.examples)for(const c of hanzi(e.text))assert.ok(reading.has(c),`${s.id} example: ${c}`);
   }
   if(s.char&&s.type!=='intro')assert.ok(writing.has(s.char),s.id);
   const p=s.phrase?phrases[s.phrase]:null;if(s.phrase)assert.ok(p,s.phrase);
   for(const g of [...(s.grammarIds||[]),...(p?.grammarIds||[])])assert.ok(seenGrammar.has(g),`${s.id}: ${g}`);
   if(p){assert.equal(p.tokens.join(''),hanzi(p.text).join(''));for(const w of p.tokens){assert.ok(seenWords.has(w),`${s.id}: ${w}`);assert.ok(wordMeaning(w));}}
   if(s.type==='order'){const bank=[...s.tokens];for(const w of p.tokens){const i=bank.indexOf(w);assert.ok(i>=0,s.id);bank.splice(i,1);}}
   if(s.options){assert.ok(s.options.includes(s.answer));assert.equal(new Set(s.options).size,s.options.length);}
   if(s.type!=='parts')for(const t of [s.prompt||'',...(s.options||[]),...(s.tokens||[])])for(const c of hanzi(t))assert.ok(reading.has(c),`${s.id}: ${c}`);
   if(s.type==='listen')assert.equal(new Set(s.options.map(c=>characters[c].pinyin)).size,s.options.length);
  }
 }
 for(const w of words)assert.ok(seenWords.has(w.text));
 for(const g of Object.keys(rules))assert.ok(seenGrammar.has(g));
});
test('New character descriptions are unique and their parts match unchanged source geometry',()=>{
 const source=Object.fromEntries(['../lib/source/graphicsZhHant.txt','../public/stroke-source/unit-eight-graphics.txt','../public/stroke-source/character-coverage-graphics.txt'].flatMap(file=>fs.readFileSync(new URL(file,import.meta.url),'utf8').trim().split('\n').map(l=>{const d=JSON.parse(l);return[d.character,d];})));
 const data=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url)));
 assert.equal(new Set(Object.values(chars).map(c=>c.memory)).size,Object.keys(chars).length);
 for(const[c,d]of Object.entries(chars)){
  assert.ok(d.memory.length>50&&!/Follow the highlighted groups|Keep the whole character balanced/.test(d.memory));
  for(const p of d.parts)assert.ok(p.description.length>40);
  assert.deepEqual(data[c],{strokes:source[c].strokes,medians:source[c].medians});
  assert.deepEqual(d.parts.flatMap(p=>p.strokes),Array.from({length:d.strokes},(_,i)=>i));
  for(const type of ['intro','trace','complete','memory'])assert.ok(added.some(l=>l.steps.some(s=>s.char===c&&s.type===type)));
 }
});
test('Unit 8 contains genuinely new vocabulary and preserves source pronunciations',()=>{
 const expected={'今天':'jīntiān','明天':'míngtiān','覺得':'juéde','好玩':'hǎowán','一起':'yìqǐ','怎麼樣':'zěnmeyàng','好啊':'hǎo a','可以':'kěyǐ'};
 assert.deepEqual(Object.fromEntries(words.map(w=>[w.text,w.pinyin])),expected);
 for(const p of Object.values(ps)){
  if(p.text.includes('一起'))assert.ok(p.pinyin.includes('yìqǐ'));
  if(p.text.includes('好玩'))assert.ok(p.pinyin.includes('hǎowán'));
  if(/怎麼樣|好不好|要不要/.test(p.text))assert.ok(!p.text.includes('嗎'));
 }
 const text=JSON.stringify({added,chars,rules,ps,words});
 for(const c of '觉这学饭们个欢还电听为')assert.ok(!text.includes(c),`Simplified ${c}`);
 for(const l of added.slice(0,-1))assert.ok(l.steps.some(s=>s.type==='grammar'&&rules[s.grammar]),l.id);
});
