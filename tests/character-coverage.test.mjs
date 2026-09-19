import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {books,units,vocabulary,characters,unitLibraryCharacters,practiceLesson,validSession,characterOrder,lessons} from '../lib/curriculum.ts';
import {supplementalCharacters} from '../lib/supplemental-characters.ts';
const data=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url)));
const source=Object.fromEntries(fs.readFileSync(new URL('../public/stroke-source/character-coverage-graphics.txt',import.meta.url),'utf8').trim().split('\n').map(l=>{const r=JSON.parse(l);return[r.character,r];}));
test('Every vocabulary character is formally introduced by its first unit with valid metadata and geometry',()=>{
 const taught=new Set();
 for(const id of books.flatMap(book=>book.unitIds)){
  const u=units.find(unit=>unit.id===id);
  const displayed=unitLibraryCharacters(u);assert.equal(new Set(displayed).size,displayed.length);
  for(const w of vocabulary.filter(w=>u.lessonIds.includes(w.lessonId)))for(const c of w.text){
   if(!/\p{Script=Han}/u.test(c))continue;
   assert.ok(taught.has(c)||displayed.includes(c),`${u.id}: ${w.text} missing ${c}`);
   const d=characters[c];assert.ok(d,`${c}: character record`);
   for(const field of ['pinyin','zhuyin','note','memory'])assert.ok(d[field]?.length,`${c}: ${field}`);
   assert.equal(data[c].strokes.length,d.strokes,c);assert.equal(data[c].medians.length,d.strokes,c);
   assert.deepEqual(d.parts.flatMap(p=>p.strokes).sort((a,b)=>a-b),Array.from({length:d.strokes},(_,i)=>i),c);
  }
  for(const c of displayed){assert.ok(!taught.has(c),`${u.id}: duplicate new character ${c}`);taught.add(c);}
 }
 assert.ok(unitLibraryCharacters(units.find(u=>u.id==='unit-8')).includes('以'));
 assert.ok(unitLibraryCharacters(units.find(u=>u.id==='unit-7')).includes('師'));
});
test('Supplemental explanations and independent handwriting practice are complete and resumable',()=>{
 const memories=Object.values(supplementalCharacters).map(c=>c.memory);assert.equal(new Set(memories).size,23);
 for(const[c,d]of Object.entries(supplementalCharacters)){
  assert.equal(characterOrder.includes(c),lessons.some(l=>l.steps.some(s=>s.type==='intro'&&s.char===c)),'Only characters with actual guided teaching count toward guided progress');
  assert.deepEqual(data[c],{strokes:source[c].strokes,medians:source[c].medians});
  assert.ok(d.memory.length>70&&!/Follow the highlighted groups|Keep the whole character balanced/.test(d.memory));
  assert.ok(d.parts.every(p=>p.description.length>50));
  const l=practiceLesson(c);assert.equal(l.steps[0].type,'intro');
  for(const t of ['trace','complete','memory'])assert.ok(l.steps.some(s=>s.type===t));
  for(const s of l.steps){if(s.options)assert.ok(s.options.includes(s.answer));}
  for(let i=0;i<=l.steps.length;i++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440020',lessonId:l.id,index:i,independent:0,assisted:0,complete:i===l.steps.length,updatedAt:1}));
 }
 for(const [c,py]of Object.entries({'以':'yǐ','覺':'jué','得':'de','漂':'piào','亮':'liàng','子':'zi','還':'hái','吃':'chī'}))assert.equal(characters[c].pinyin,py);
 assert.equal(characters['以'].strokes,5);
 const ui=fs.readFileSync(new URL('../components/learning-app.tsx',import.meta.url),'utf8');
 assert.ok(ui.includes('const unitCharacters=unitLibraryCharacters(unit)'));
 assert.ok(ui.includes('unitCharacters.map'));
 assert.ok(ui.includes('{unitLearned.length}/{unitCharacters.length}'));
 assert.ok(!ui.includes('{unitLearned.length}/{unit.chars.length}'));
 assert.ok(ui.includes('text={characters[detail].audioText||detail}'));
});
test('All added character strokes pass the actual writing recognizer',()=>{
 const src=fs.readFileSync(new URL('../node_modules/hanzi-writer/dist/index.cjs.js',import.meta.url),'utf8');
 const context={module:{exports:{}},global:{},setTimeout,clearTimeout};vm.runInNewContext(src+'\nmodule.exports={strokeMatches,parseCharData};',context);
 const {strokeMatches,parseCharData}=context.module.exports;
 for(const c of Object.keys(supplementalCharacters)){
  const parsed=parseCharData(c,data[c]);
  data[c].medians.forEach((m,i)=>{const points=m.map(([x,y])=>({x,y}));assert.ok(strokeMatches({points},parsed,i,{leniency:1.25}).isMatch,`${c} stroke ${i+1}`);});
 }
});
