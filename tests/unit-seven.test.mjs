import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {lessons,units,books,vocabulary,characters,grammarRules,phrases,wordMeaning,lessonAvailable,validSession} from '../lib/curriculum.ts';
import {unitSevenLessons as added,unitSevenCharacters as chars,unitSevenGrammar as rules,unitSevenPhrases as ps,unitSevenVocabulary as words,unitSevenRevisionStepIds as revision} from '../lib/unit-seven.ts';
const hanzi=t=>[...t].filter(c=>/\p{Script=Han}/u.test(c));
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('Unit 7 preserves every pre-existing lesson, word, rule, phrase, unit, other book, and stroke',()=>{
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
 assert.equal(added.length,7);assert.equal(words.length,10);
 const practice=added.flatMap(l=>l.steps).filter(s=>!['intro','grammar','phrase'].includes(s.type));
 assert.ok(revision.length/practice.length>=.15&&revision.length/practice.length<=.3);
 assert.ok(added.every(l=>l.steps.length<=23));
 assert.ok(added.slice(0,-1).every(l=>l.chars.length<=3));
 assert.ok(!added.at(-1).steps.some(s=>['grammar','intro'].includes(s.type)));
 assert.equal(lessonAvailable('u7-v2-numbers',new Set()),false);
 const done=new Set(['u6-review']);
 for(const l of added){assert.ok(lessonAvailable(l.id,done));done.add(l.id);for(let i=0;i<=l.steps.length;i++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440017',lessonId:l.id,index:i,independent:0,assisted:0,complete:i===l.steps.length,updatedAt:1}));}
 assert.deepEqual([...new Set(added.flatMap(l=>l.steps).map(s=>s.type))].sort(),['intro','trace','build','complete','memory','match','parts','listen','grammar','phrase','order','select'].sort());
 for(const w of words)assert.ok(!vocabulary.some(old=>!old.lessonId.startsWith('u7-')&&old.text===w.text),`not new: ${w.text}`);
});
test('Unit 7 teaches all tested spellings, words, writing targets, and grammar before recall',()=>{
 const prior=units.filter(u=>/^unit-[1-6]$/.test(u.id));
 const writing=new Set(prior.flatMap(u=>u.chars)),reading=new Set(writing);
 const seenWords=new Set(vocabulary.filter(w=>prior.some(u=>u.lessonIds.includes(w.lessonId))).map(w=>w.text));
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
 const source=Object.fromEntries(['../lib/source/graphicsZhHant.txt','../public/stroke-source/unit-seven-graphics.txt','../public/stroke-source/character-coverage-graphics.txt'].flatMap(file=>fs.readFileSync(new URL(file,import.meta.url),'utf8').trim().split('\n').map(l=>{const d=JSON.parse(l);return[d.character,d];})));
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
test('Unit 7 uses reviewed Traditional spellings, source pinyin, and avoids unapproved deeper grammar',()=>{
 const text=JSON.stringify({added,chars,rules,ps,words});
 for(const c of '几师这谁个们没欢还篮踢泳电体书语时来')if(!'踢泳'.includes(c))assert.ok(!text.includes(c),`Simplified ${c}`);
 const expected={'幾':'jǐ','兄弟':'xiōngdì','姐妹':'jiěmèi','漂亮':'piàoliàng','好看':'hǎokàn','房子':'fángzi','老師':'lǎoshī','照相':'zhàoxiàng','週末':'zhōumò','做':'zuò','看電影':'kàn diànyǐng','打籃球':'dǎ lánqiú','踢足球':'tī zúqiú','游泳':'yóuyǒng','常':'cháng','還是':'háishì','吧':'ba'};
 for(const w of words)assert.equal(w.pinyin,expected[w.text]);
 for(const p of Object.values(ps)){if(p.text.includes('喜歡'))assert.ok(p.pinyin.includes('xǐhuān'));if(p.text.includes('還是'))assert.ok(!p.text.includes('嗎'));}
 for(const deeper of ['可以','一起','怎麼樣','覺得','也都常','不都是'])assert.ok(!text.includes(deeper));
});
