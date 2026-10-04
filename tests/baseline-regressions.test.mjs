import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {books,units,lessons,vocabulary,characters,grammarRules,phrases,characterOrder,unitLibraryCharacters,practiceLesson,validSession} from '../lib/curriculum.ts';
import {assertFoundationPreserved} from './helpers/foundation-preservation.mjs';
import {assertReviewedRecord} from '../validation/record-preservation.mjs';

const read=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url),'utf8'));
const baseline=read('./fixtures/before-unit-seven-hashes.json');
const snapshot=()=>structuredClone({books,units,lessons,vocabulary,characters,grammarRules,phrases});

test('The guided character total is attainable without counting read-only cards as handwriting',()=>{
 const introduced=new Set(lessons.flatMap(l=>l.steps.filter(s=>s.type==='intro').map(s=>s.char)));
 assert.deepEqual(new Set(characterOrder),introduced);
 assert.equal(characterOrder.length,introduced.size);
 const complete=new Set(lessons.map(l=>l.id));
 const learned=characterOrder.filter(c=>lessons.some(l=>!l.review&&l.chars.includes(c)&&complete.has(l.id)));
 assert.deepEqual(learned,characterOrder,'Finishing the guided course reaches its full denominator');
 for(const char of ['逛','芒','窗','戶','進']){
  assert.equal(characterOrder.includes(char),false,char);
  assert.ok(units.some(u=>unitLibraryCharacters(u).includes(char)),`${char}: retain its first-time card`);
  const practice=practiceLesson(char);
  assert.equal(practice.id,`practice-${char}`);
  for(let index=0;index<=practice.steps.length;index++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440071',lessonId:practice.id,index,independent:0,assisted:0,complete:index===practice.steps.length,updatedAt:1}),`${char}:${index}`);
 }
});

test('Historical preservation still rejects deleted or unreviewed foundation records',()=>{
 assertFoundationPreserved(baseline);
 const changedLesson=snapshot();changedLesson.lessons[0].steps[0].char='我';
 assert.throws(()=>assertFoundationPreserved(baseline,changedLesson),/lessons hello/);
 const missingWord=snapshot(),word=Object.keys(baseline.vocabulary)[0];
 missingWord.vocabulary=missingWord.vocabulary.filter(w=>w.text!==word);
 assert.throws(()=>assertFoundationPreserved(baseline,missingWord),/vocabulary.*must still exist/);
 const changedRule=snapshot();changedRule.grammarRules['u3-point'].explanation+=' Unreviewed change.';
 assert.throws(()=>assertFoundationPreserved(baseline,changedRule),/grammarRules u3-point/);
 const missingCard=snapshot();delete missingCard.characters['好'];
 assert.throws(()=>assertFoundationPreserved(baseline,missingCard),/characters 好 must still exist/);
});

test('Retirement exceptions cannot bless reused IDs or unrelated geometry changes',()=>{
 const revived=snapshot();revived.lessons.push({...revived.lessons[0],id:'b2-ask'});
 assert.throws(()=>assertFoundationPreserved(baseline,revived),/retired IDs must not be reused/);
 const strokes=read('../lib/stroke-data.json');strokes['你'].medians[0][0][0]+=1;
 assert.throws(()=>assertFoundationPreserved(baseline,snapshot(),strokes),/你: geometry/);
 const wrongBook=snapshot();wrongBook.books.find(b=>b.id==='book-3').available=true;
 assert.throws(()=>assertFoundationPreserved(baseline,wrongBook));
});

test('Reviewed amendments cannot attach to a different original hash',()=>{
 assert.throws(()=>assertReviewedRecord('characters','弟','unreviewed-original',characters['弟']),/prior characters 弟/);
});
