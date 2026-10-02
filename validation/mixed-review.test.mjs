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
const embeddedReadingChecks=new Set(['u12-challenge-reading-21','u18-review-reading-20','u24-review-reading-20','u30-review-reading-23','u36-review-reading-28','u42-review-reading-26','u48-review-reading-59']);
const han=text=>[...new Set([...text].filter(c=>/\p{Script=Han}/u.test(c)))];
const canonicalMultiCharLexemes=[...new Set(
 modules.flatMap(m=>(m.newVocabulary||[]).map(v=>v.text))
)].filter(word=>[...word].filter(c=>/\p{Script=Han}/u.test(c)).length>1);

test('mixed review stays sparse and preserves teaching, ownership, and every checkpoint position',()=>{
 assert.equal(selected.size,fixture.items.length,'duplicate reviewed activity');
 const counts=new Map();
 for(const item of fixture.items)counts.set(item.lessonId,(counts.get(item.lessonId)||0)+1);
 for(const [id,n]of counts)assert.ok(n<=2,id+' has too many mixed checks');
 for(const [id,baseline]of Object.entries(fixture.units)){
  const unit=modules.find(m=>m.unit.id===id);
  assert.ok(unit,id);
  const masked=structuredClone(unit);
  for(const l of masked.lessons)l.steps=l.steps.filter(s=>!embeddedReadingChecks.has(s.id)).map(s=>selected.has(s.id)?{id:s.id,type:s.type}:s);
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
    for(const word of canonicalMultiCharLexemes){
     if(payload.includes(word))assert.ok(taughtText.includes(word),s.id+': canonical multi-character word used before explanation: '+word);
    }
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

test('audited mixed-review prompts preserve stated quantity and time certainty',()=>{
 const u11=modules.find(m=>m.unit.id==='unit-11');
 const order=u11.lessons.find(l=>l.id==='u11-order').steps.find(s=>s.id==='u11-order-13');
 assert.match(order.prompt,/一杯熱茶，外帶，謝謝/,'Unit 11 acknowledgment must not invent an unstated quantity');

 const u38=modules.find(m=>m.unit.id==='unit-38');
 const meet=u38.lessons.find(l=>l.id==='u38-meet').steps.find(s=>s.id==='u38-meet-s3');
 assert.match(meet.prompt,/fixed place.*approximate time/i,'Unit 38 prompt must distinguish a fixed place from an approximate time');
});
