import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {characters,characterOrder,grammarRules,lessonAvailable,lessons,phrases,unitThreeLessons,unitFourLessons,unitFourCharacterOrder,units,validSession,vocabulary,wordMeaning} from '../lib/curriculum.ts';

const unit=units.find(u=>u.id==='unit-4');
const earlierUnits=units.filter(u=>u.number<4);
const earlierLessons=lessons.filter(l=>earlierUnits.some(u=>u.id===l.unitId));
const throughUnitFour=units.filter(u=>u.number<=4);
const wordsThroughUnitFour=vocabulary.filter(w=>throughUnitFour.some(u=>u.lessonIds.includes(w.lessonId)));
const hanzi=text=>[...text].filter(c=>/\p{Script=Han}/u.test(c));

test('Unit 4 stays close to Unit 3 in size and counts words separately from character parts',()=>{
 assert.equal(unitFourLessons.length,7);
 assert.deepEqual(unit.lessonIds,unitFourLessons.map(l=>l.id));
 assert.deepEqual(unit.chars,unitFourCharacterOrder);
 assert.equal(unitFourCharacterOrder.length,13);
 assert.equal(new Set(throughUnitFour.flatMap(u=>u.chars)).size,44);
 const count=unitFourLessons.reduce((n,l)=>n+l.steps.length,0);
 assert.equal(count,119);
 assert.ok(count<=unitThreeLessons.reduce((n,l)=>n+l.steps.length,0)*1.15);
 for(const lesson of unitFourLessons)assert.ok(lesson.steps.length>=10&&lesson.steps.length<=21,lesson.id);
 const words=vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId));
 assert.equal(words.length,13);
 assert.equal(wordsThroughUnitFour.length,46);
 assert.equal(wordsThroughUnitFour.filter(w=>w.core).length,32);
 assert.equal(new Set(vocabulary.map(w=>w.text)).size,vocabulary.length);
 assert.deepEqual(words.filter(w=>w.core).map(w=>w.text),['去','來','和','說','想','要','會']);
 for(const word of ['中文','英文','哪裡','學'])assert.equal(words.filter(w=>w.text===word).length,1);
 for(const component of ['中','文','英','哪'])assert.ok(!words.some(w=>w.text===component));
 // Each book has its own palette; Unit 7 reuses an existing theme without global CSS changes.
 for(const group of [units.filter(u=>!u.id.startsWith('book-2-')),units.filter(u=>u.id.startsWith('book-2-'))])assert.equal(new Set(group.map(u=>u.theme)).size,group.length);
 const css=fs.readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
 assert.ok(css.includes(`[data-unit-theme="${unit.theme}"]`));
});

test('Unit 4 introduces its vocabulary, grammar, and word-bank characters before testing them',()=>{
 const seenChars=new Set(earlierLessons.flatMap(l=>l.chars));
 const seenWords=new Set(vocabulary.filter(w=>earlierUnits.some(u=>u.lessonIds.includes(w.lessonId))).map(w=>w.text));
 const seenGrammar=new Set(earlierUnits.flatMap(u=>u.grammarIds));
 const introduced=new Set();
 const ids=new Set();
 for(const lesson of unitFourLessons)for(const step of lesson.steps){
  assert.ok(!ids.has(step.id),step.id);ids.add(step.id);
  if(step.type==='intro'){
   assert.ok(!seenChars.has(step.char),`Repeated introduction ${step.char}`);
   seenChars.add(step.char);
   if(vocabulary.some(w=>w.text===step.char))seenWords.add(step.char);
  }
  if(step.type==='grammar'){
   assert.notEqual(lesson.id,'u4-review','The review must not introduce new grammar');
   const rule=grammarRules[step.grammar];assert.ok(rule,step.id);
   seenGrammar.add(rule.id);introduced.add(rule.id);
   assert.ok(rule.explanation&&rule.pattern&&rule.remember&&rule.examples.length>=2,rule.id);
   for(const word of rule.words||[]){
    assert.ok(vocabulary.some(w=>w.text===word),word);
    for(const char of word)assert.ok(seenChars.has(char),`${word} needs ${char}`);
    seenWords.add(word);
   }
   for(const example of rule.examples){
    assert.ok(example.pinyin&&example.meaning,rule.id);
    for(const char of hanzi(example.text))assert.ok(seenChars.has(char),`${rule.id} uses ${char} too early`);
   }
  }
  const phrase=step.phrase?phrases[step.phrase]:undefined;
  if(step.phrase)assert.ok(phrase,step.id);
  for(const id of [...(step.grammarIds||[]),...(phrase?.grammarIds||[])])assert.ok(seenGrammar.has(id),`${step.id} tests unexplained ${id}`);
  if(phrase){
   assert.ok(phrase.grammarIds?.length,step.id);
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
   for(const char of hanzi(text))assert.ok(seenChars.has(char),`${step.id} uses untaught ${char}`);
  }
 }
 assert.deepEqual([...introduced].sort(),[...unit.grammarIds].sort());
 for(const word of vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId)))assert.ok(seenWords.has(word.text),word.text);
 for(const other of units.filter(u=>u.number>1&&u.number<=5))assert.ok(other.grammarIds.every(id=>id.startsWith(`u${other.number}-`)),'Keep notes in their own unit');
});

test('Unit 4 keeps all writing stages, explains every component, and avoids listening homophones',()=>{
 for(const char of unitFourCharacterOrder){
  const detail=characters[char];
  const steps=unitFourLessons.filter(l=>l.id!=='u4-review').flatMap(l=>l.steps).filter(s=>s.char===char);
  for(const type of ['intro','trace','complete','memory'])assert.ok(steps.some(s=>s.type===type),`${char}: ${type}`);
  if(detail.layout!=='whole')assert.ok(steps.some(s=>s.type==='build'),char);
  assert.ok(detail.note&&detail.memory&&detail.pinyin&&detail.zhuyin,char);
  for(const part of detail.parts)assert.ok(part.name&&part.role&&part.description&&part.strokes.length,char);
 }
 for(const step of unitFourLessons.flatMap(l=>l.steps).filter(s=>s.type==='listen')){
  assert.equal(step.answer,step.char,step.id);
  const sounds=step.options.map(c=>characters[c].pinyin);
  assert.equal(new Set(sounds).size,sounds.length,step.id);
 }
 assert.ok(characterOrder.includes('聽'));
 assert.equal(characters['聽'].strokes,22);
 assert.equal(characters['說'].strokes,14);
 assert.equal(characters['英'].strokes,9);
});

test('Unit 3 checkpoints stay identical and Unit 4 unlocks only after its review',()=>{
 const original=JSON.parse(fs.readFileSync(new URL('./fixtures/unit-three-checkpoints.json',import.meta.url),'utf8'));
 assert.deepEqual(unitThreeLessons.map(({id,chars,steps})=>({id,chars,steps})),original);
 const completed=new Set(earlierLessons.filter(l=>l.id!=='u3-review').map(l=>l.id));
 assert.equal(lessonAvailable('u4-go',completed),false);
 completed.add('u3-review');
 for(const lesson of unitFourLessons){
  assert.equal(lessonAvailable(lesson.id,completed),true,lesson.id);
  const next=unitFourLessons[unitFourLessons.indexOf(lesson)+1];
  if(next)assert.equal(lessonAvailable(next.id,completed),false,next.id);
  completed.add(lesson.id);
  for(let index=0;index<=lesson.steps.length;index++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440014',lessonId:lesson.id,index,independent:0,assisted:0,complete:index===lesson.steps.length,updatedAt:1}),`${lesson.id}:${index}`);
 }
 assert.equal(lessons.filter(l=>l.unitId==='unit-4').at(-1).id,'u4-review');
 assert.equal(lessons.filter(l=>l.unitId==='unit-4').at(-1).review,true);
});
