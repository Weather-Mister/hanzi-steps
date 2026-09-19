import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {characters,characterOrder,grammarRules,lessonAvailable,lessons,phrases,unitOneLessons,unitTwoLessons,unitThreeLessons,unitThreeCharacterOrder,units,validSession,vocabulary,wordMeaning} from '../lib/curriculum.ts';

const unit=units.find(u=>u.id==='unit-3');
const earlierUnits=units.filter(u=>u.number<3);
const earlierLessons=[...unitOneLessons,...unitTwoLessons];
const throughUnitThree=units.filter(u=>u.number<=3);
const wordsThroughUnitThree=vocabulary.filter(w=>throughUnitThree.some(u=>u.lessonIds.includes(w.lessonId)));
const hanzi=text=>[...text].filter(c=>/\p{Script=Han}/u.test(c));

test('Unit 3 adds six manageable lessons and a review toward the common-word goal',()=>{
 assert.equal(unitThreeLessons.length,7);
 assert.deepEqual(unit.lessonIds,unitThreeLessons.map(l=>l.id));
 assert.deepEqual(unit.chars,unitThreeCharacterOrder);
 assert.equal(unitThreeCharacterOrder.length,13);
 assert.equal(new Set(throughUnitThree.flatMap(u=>u.chars)).size,31);
 const steps=unitThreeLessons.reduce((n,l)=>n+l.steps.length,0);
 const previous=unitTwoLessons.reduce((n,l)=>n+l.steps.length,0);
 assert.equal(steps,113);
 assert.ok(steps>=previous&&steps<=previous*1.2);
 for(const lesson of unitThreeLessons)assert.ok(lesson.steps.length>=10&&lesson.steps.length<=21,lesson.id);
 const words=vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId));
 assert.equal(words.length,13);
 assert.equal(wordsThroughUnitThree.length,33);
 assert.equal(new Set(vocabulary.map(w=>w.text)).size,vocabulary.length);
 assert.deepEqual(words.filter(w=>w.core).map(w=>w.text),['這','那','什麼','兩','很','大','在','都']);
 assert.equal(wordsThroughUnitThree.filter(w=>w.core).length,25);
 for(const word of ['什麼','這裡','那裡'])assert.equal(words.filter(w=>w.text===word).length,1);
 for(const component of ['什','麼','裡'])assert.ok(!words.some(w=>w.text===component),'Do not count a word component as another word');
 // Each book has its own palette; Unit 7 reuses an existing theme without global CSS changes.
 for(const group of [units.filter(u=>!u.id.startsWith('book-2-')),units.filter(u=>u.id.startsWith('book-2-'))])assert.equal(new Set(group.map(u=>u.theme)).size,group.length);
 const css=fs.readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
 assert.ok(css.includes(`[data-unit-theme="${unit.theme}"]`));
});

test('Unit 3 explains its words and patterns before testing them',()=>{
 const seenChars=new Set(earlierLessons.flatMap(l=>l.chars));
 const seenWords=new Set(vocabulary.filter(w=>earlierUnits.some(u=>u.lessonIds.includes(w.lessonId))).map(w=>w.text));
 const seenGrammar=new Set(earlierUnits.flatMap(u=>u.grammarIds));
 const introduced=new Set();
 const ids=new Set();
 for(const lesson of unitThreeLessons)for(const step of lesson.steps){
  assert.ok(!ids.has(step.id),`Duplicate step ${step.id}`);ids.add(step.id);
  if(step.type==='intro'){
   assert.ok(!seenChars.has(step.char),`Repeated introduction ${step.char}`);
   seenChars.add(step.char);
   if(vocabulary.some(w=>w.text===step.char))seenWords.add(step.char);
  }
  if(step.type==='grammar'){
   assert.notEqual(lesson.id,'u3-review','The review must not introduce new grammar');
   const rule=grammarRules[step.grammar];assert.ok(rule,step.id);
   seenGrammar.add(rule.id);introduced.add(rule.id);
   assert.ok(rule.explanation&&rule.pattern&&rule.remember&&rule.examples.length>=2,rule.id);
   for(const word of rule.words||[]){
    assert.ok(vocabulary.some(w=>w.text===word),word);
    for(const char of word)assert.ok(seenChars.has(char),`${word} needs ${char}`);
    seenWords.add(word);
   }
   for(const example of rule.examples){
    assert.ok(example.meaning&&example.pinyin,rule.id);
    for(const char of hanzi(example.text))assert.ok(seenChars.has(char),`${rule.id} uses ${char} too early`);
   }
  }
  const phrase=step.phrase?phrases[step.phrase]:undefined;
  if(step.phrase)assert.ok(phrase,step.id);
  for(const id of [...(step.grammarIds||[]),...(phrase?.grammarIds||[])])assert.ok(seenGrammar.has(id),`${step.id} tests unexplained ${id}`);
  if(phrase){
   assert.ok(phrase.grammarIds?.length,`${step.id} needs grammar notes`);
   assert.equal(phrase.tokens.join(''),hanzi(phrase.text).join(''),step.id);
   for(const word of phrase.tokens){assert.ok(seenWords.has(word),`${step.id} tests untaught ${word}`);assert.ok(wordMeaning(word));}
  }
  if(step.type==='order'){
   const bank=[...step.tokens];
   for(const word of phrase.tokens){const i=bank.indexOf(word);assert.notEqual(i,-1,`${step.id}: missing ${word}`);bank.splice(i,1);}
  }
  if(step.options){assert.ok(step.options.includes(step.answer),step.id);assert.equal(new Set(step.options).size,step.options.length,step.id);}
  if(step.type==='match')assert.equal(new Set(step.chars.map(c=>characters[c].meaning)).size,step.chars.length,step.id);
  for(const text of [step.prompt||'',...(step.tokens||[]),...(step.chars||[]),...(step.options||[])]){
   for(const char of hanzi(text))assert.ok(seenChars.has(char),`${step.id} tests untaught ${char}`);
  }
 }
 assert.deepEqual([...introduced].sort(),[...unit.grammarIds].sort());
 for(const word of vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId)))assert.ok(seenWords.has(word.text),word.text);
 for(const other of units.filter(u=>u.number>1&&u.number<=5))assert.ok(other.grammarIds.every(id=>id.startsWith(`u${other.number}-`)),'Notes must stay in their own unit');
});

test('Every new character has all writing stages, meaningful parts, and unambiguous listening',()=>{
 for(const char of unitThreeCharacterOrder){
  const detail=characters[char];
  const steps=unitThreeLessons.filter(l=>l.id!=='u3-review').flatMap(l=>l.steps).filter(s=>s.char===char);
  for(const type of ['intro','trace','complete','memory'])assert.ok(steps.some(s=>s.type===type),`${char}: ${type}`);
  if(detail.layout!=='whole')assert.ok(steps.some(s=>s.type==='build'),char);
  assert.ok(detail.note&&detail.memory&&detail.pinyin&&detail.zhuyin,char);
  for(const part of detail.parts)assert.ok(part.name&&part.role&&part.description&&part.strokes.length,char);
 }
 for(const step of unitThreeLessons.flatMap(l=>l.steps).filter(s=>s.type==='listen')){
  assert.equal(step.answer,step.char,step.id);
  const sounds=step.options.map(c=>characters[c].pinyin);
  assert.equal(new Set(sounds).size,sounds.length,step.id);
 }
});

test('Existing Unit 2 exercises and saved positions are unchanged, and Unit 3 unlocks after its review',()=>{
 const original=JSON.parse(fs.readFileSync(new URL('./fixtures/unit-two-checkpoints.json',import.meta.url),'utf8'));
 assert.deepEqual(unitTwoLessons.map(({id,chars,steps})=>({id,chars,steps})),original);
 const completed=new Set(earlierLessons.filter(l=>l.id!=='u2-review').map(l=>l.id));
 assert.equal(lessonAvailable('u3-point',completed),false);
 completed.add('u2-review');
 assert.equal(lessonAvailable('u3-point',completed),true);
 for(const lesson of [...unitTwoLessons,...unitThreeLessons])for(let index=0;index<=lesson.steps.length;index++){
  assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440013',lessonId:lesson.id,index,independent:0,assisted:0,complete:index===lesson.steps.length,updatedAt:1}),`${lesson.id}:${index}`);
 }
 assert.equal(lessons.filter(l=>l.unitId==='unit-3').at(-1).id,'u3-review');
 assert.equal(lessons.filter(l=>l.unitId==='unit-3').at(-1).review,true);
});
