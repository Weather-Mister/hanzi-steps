import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/mixed-review.json',import.meta.url),'utf8'));
const manifest=JSON.parse(fs.readFileSync(new URL('../course/manifest.json',import.meta.url),'utf8'));
const modules=[];
for(const b of manifest.books)for(const entry of b.units)modules.push((await import(new URL('../'+entry.path,import.meta.url))).default);
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
const selected=new Map(fixture.items.map(r=>[r.stepId,r]));
const han=text=>[...new Set([...text].filter(c=>/\p{Script=Han}/u.test(c)))];

test('mixed review stays sparse and preserves teaching, ownership, and every checkpoint position',()=>{
 assert.equal(selected.size,fixture.items.length,'duplicate reviewed activity');
 const counts=new Map();
 for(const item of fixture.items)counts.set(item.lessonId,(counts.get(item.lessonId)||0)+1);
 for(const [id,n]of counts)assert.ok(n<=2,id+' has too many mixed checks');
 for(const [id,baseline]of Object.entries(fixture.units)){
  const unit=modules.find(m=>m.unit.id===id);
  assert.ok(unit,id);
  const masked=structuredClone(unit);
  for(const l of masked.lessons)l.steps=l.steps.map(s=>selected.has(s.id)?{id:s.id,type:s.type}:s);
  assert.equal(hash(masked),baseline.unchangedHash,id+': unrelated content or checkpoint topology changed');
 }
});

test('mixed questions use already explained words, characters and grammar, including distractors',()=>{
 let priorText='';const taughtRules=new Set();let checked=0;
 for(const m of modules){
  let taughtText=priorText;
  for(const l of m.lessons)for(const s of l.steps){
   const record=selected.get(s.id);
   if(record){
    checked++;
    assert.equal(record.unitId,m.unit.id);assert.equal(record.lessonId,l.id);
    assert.equal(s.type,'select');assert.ok(!l.review,'do not inflate the unit review');
    assert.equal(new Set(s.options).size,s.options.length,s.id);
    assert.equal(s.options.filter(o=>o===s.answer).length,1,s.id);
    assert.ok(s.explanation.length>=40,s.id+' needs corrective feedback');
    const payload=[s.prompt,...s.options,s.explanation].join(' ');
    assert.deepEqual(han(payload).filter(ch=>!taughtText.includes(ch)),[],s.id+': unseen character');
    for(const word of record.current)assert.ok(taughtText.includes(word),s.id+': target not explained: '+word);
    for(const word of record.review)assert.ok(priorText.includes(word),s.id+': review not taught in an earlier unit: '+word);
    for(const id of s.grammarIds||[])assert.ok(taughtRules.has(id),s.id+': grammar not taught: '+id);
    assert.deepEqual(s.grammarIds,record.grammarIds,s.id+': prerequisite declaration drift');
   }
   if(s.type==='grammar'){taughtRules.add(s.grammar);taughtText+=JSON.stringify(m.grammarRules[s.grammar]);}
   if(s.type==='phrase')taughtText+=JSON.stringify(m.phrases[s.phrase]);
   if(s.type==='intro')taughtText+=JSON.stringify(m.characters[s.char]);
  }
  priorText=taughtText;
 }
 assert.equal(checked,selected.size,'missing mixed check');
});
