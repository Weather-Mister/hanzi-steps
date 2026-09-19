import {test} from 'node:test';
import assert from 'node:assert/strict';
import {characters,grammarRules,lessonAvailable,lessons,phrases,unitOneLessons,unitTwoLessons,unitTwoCharacterOrder,units,validSession,vocabulary,wordMeaning} from '../lib/curriculum.ts';

test('Unit 2 is a manageable expansion with words counted separately from characters',()=>{
 assert.equal(unitTwoLessons.length,7);
 assert.equal(unitTwoCharacterOrder.length,11);
 const first=unitOneLessons.reduce((n,l)=>n+l.steps.length,0);
 const second=unitTwoLessons.reduce((n,l)=>n+l.steps.length,0);
 assert.ok(second>first&&second<=first*1.5);
 const words=vocabulary.filter(w=>units[1].lessonIds.includes(w.lessonId));
 assert.equal(words.length,13);
 assert.equal(new Set(vocabulary.map(w=>w.text)).size,vocabulary.length);
 assert.equal(vocabulary.filter(w=>w.text==='學生').length,1);
 assert.equal(vocabulary.filter(w=>w.core&&units.slice(0,2).some(u=>u.lessonIds.includes(w.lessonId))).length,17);
 for(const word of vocabulary)assert.ok(lessons.some(l=>l.id===word.lessonId));
});

test('New words and every required grammar pattern are introduced before their exercises',()=>{
 const seenChars=new Set(unitOneLessons.flatMap(l=>l.chars));
 const seenWords=new Set(vocabulary.filter(w=>units[0].lessonIds.includes(w.lessonId)).map(w=>w.text));
 const seenGrammar=new Set();
 const hanzi=text=>[...text].filter(c=>/\p{Script=Han}/u.test(c));
 for(const lesson of unitTwoLessons)for(const step of lesson.steps){
  if(step.type==='intro'){
   seenChars.add(step.char);
   if(vocabulary.some(w=>w.text===step.char))seenWords.add(step.char);
  }
  if(step.type==='grammar'){
   const rule=grammarRules[step.grammar];assert.ok(rule,step.id);
   seenGrammar.add(step.grammar);
   for(const word of rule.words||[]){
    assert.ok(vocabulary.some(w=>w.text===word),word);
    for(const char of word)assert.ok(seenChars.has(char),`${word} needs ${char}`);
    seenWords.add(word);
   }
   for(const example of rule.examples)for(const char of hanzi(example.text))assert.ok(seenChars.has(char),`${rule.id} example uses ${char} too early`);
  }
  for(const id of step.grammarIds||phrases[step.phrase]?.grammarIds||[])assert.ok(seenGrammar.has(id),`${step.id} uses ${id} before introducing it`);
  if(step.type==='order'){
   const phrase=phrases[step.phrase];
   assert.ok(phrase.grammarIds?.length,`${step.id} needs a pattern explanation`);
   for(const word of phrase.tokens){assert.ok(seenWords.has(word),`${step.id} tests untaught word ${word}`);assert.ok(wordMeaning(word));}
   const bank=[...step.tokens];for(const word of phrase.tokens){const i=bank.indexOf(word);assert.notEqual(i,-1);bank.splice(i,1);}
  }
  for(const text of [...(step.tokens||[]),...(step.chars||[]),...(step.options||[])])for(const c of hanzi(text))assert.ok(seenChars.has(c),`${step.id} uses untaught ${c}`);
 }
 assert.deepEqual([...seenGrammar].sort(),[...units[1].grammarIds].sort());
 for(const word of vocabulary.filter(w=>units[1].lessonIds.includes(w.lessonId)))assert.ok(seenWords.has(word.text),word.text);
});

test('All new characters retain tracing, component learning, missing strokes, and recall',()=>{
 for(const char of unitTwoCharacterOrder){
  const steps=unitTwoLessons.filter(l=>l.id!=='u2-review').flatMap(l=>l.steps).filter(s=>s.char===char);
  for(const type of ['intro','trace','complete','memory'])assert.ok(steps.some(s=>s.type===type),`${char}: ${type}`);
  if(characters[char].layout!=='whole')assert.ok(steps.some(s=>s.type==='build'),char);
 }
 // He and she have the same audio; they must never be competing listening answers.
 for(const step of unitTwoLessons.flatMap(l=>l.steps).filter(s=>s.type==='listen')){
  const sounds=step.options.map(c=>characters[c].pinyin);
  assert.equal(new Set(sounds).size,sounds.length);
 }
});

test('Unit progression crosses the existing review boundary and every new checkpoint is valid',()=>{
 const done=new Set();
 for(const lesson of lessons){
  assert.equal(lessonAvailable(lesson.id,done),true,lesson.id);
  const next=lessons[lessons.indexOf(lesson)+1];
  if(next)assert.equal(lessonAvailable(next.id,done),next.id==='b2-ask',next.id);
  done.add(lesson.id);
 }
 for(const lesson of unitTwoLessons)for(let index=0;index<=lesson.steps.length;index++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440009',lessonId:lesson.id,index,independent:0,assisted:0,complete:index===lesson.steps.length,updatedAt:1}));
 assert.equal(lessonAvailable('missing-lesson',done),false);
});
