import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import * as current from '../lib/curriculum.ts';
import {readJSON,root} from './course-io.mjs';
const baseline=readJSON('validation/fixtures/live-before-refactor.json');
// Explicitly reviewed first-teaching moves; retain the immutable migration snapshot.
const amendment=readJSON('validation/fixtures/book1-first-teaching-amendment.json');
const lesson10Amendment=readJSON('validation/fixtures/book1-first-teaching-amendment-lesson10.json');
const correctionAmendment=readJSON('validation/fixtures/units26-31-correction-amendment.json');
const spotlightAmendment=readJSON('validation/fixtures/spotlight-word-amendment.json');
const lesson11Amendment=readJSON('validation/fixtures/book1-first-teaching-amendment-lesson11.json');
const polishAmendment=readJSON('validation/fixtures/units29-33-polish-amendment.json');
const hash=x=>createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');

test('All live curriculum records, answers, checkpoint sequences and card order are lossless',()=>{
 const data={...current,cards:Object.fromEntries(current.units.map(u=>[u.id,current.unitLibraryCharacters(u)]))};
 for(const [key,records]of Object.entries(baseline.records)){
  const actual=Array.isArray(data[key])?Object.fromEntries(data[key].map(v=>[v.id||v.text,v])):data[key];
  for(const [id,digest]of Object.entries(records)){
   const first=amendment.records[key]?.[id];
   if(first)assert.equal(first.before,digest,`amendment must identify original ${key} ${id}`);
   const firstExpected=first?.after??digest;
   const later=lesson10Amendment.records?.[key]?.[id];
   if(later)assert.equal(later.before,firstExpected,`Lesson 10 amendment must identify prior ${key} ${id}`);
   const priorExpected=later?.after??firstExpected;
   const correction=correctionAmendment.records?.[key]?.[id];
   if(correction)assert.equal(correction.before,priorExpected,`correction must identify prior ${key} ${id}`);
   const correctedExpected=correction?.after??priorExpected;
   const spotlight=spotlightAmendment.records?.[key]?.[id];
   if(spotlight)assert.equal(spotlight.before,correctedExpected,`spotlight amendment must identify prior ${key} ${id}`);
   const spotlightExpected=spotlight?.after??correctedExpected;
   const lesson11=lesson11Amendment.records?.[key]?.[id];
   if(lesson11)assert.equal(lesson11.before,spotlightExpected,`Lesson 11 amendment must identify prior ${key} ${id}`);
   const lesson11Expected=lesson11?.after??spotlightExpected;
   const polish=polishAmendment.records?.[key]?.[id];
   if(polish)assert.equal(polish.before,lesson11Expected,`Units 29-33 polish amendment must identify prior ${key} ${id}`);
   assert.equal(hash(actual[id]),polish?.after??lesson11Expected,`${key} ${id}`);
  }
 }
 assert.deepEqual(current.units.filter(u=>baseline.order.includes(u.id)).map(u=>u.id),baseline.order);
 for(const b of baseline.books){const live=current.books.find(x=>x.id===b.id);assert.ok(live,b.id);assert.equal(live.title,b.title);assert.equal(live.number,b.number);assert.deepEqual(live.unitIds.filter(id=>b.unitIds.includes(id)),b.unitIds);}
 assert.deepEqual(current.characterOrder.filter(c=>baseline.characterOrder.includes(c)),lesson11Amendment.characterOrder??lesson10Amendment.characterOrder??amendment.characterOrder);
 for(const [ch,digest]of Object.entries(baseline.practice)){
  const first=amendment.practice?.[ch];
  if(first)assert.equal(first.before,digest,`practice amendment must identify original ${ch}`);
  const firstExpected=first?.after??digest;
  const later=lesson10Amendment.practice?.[ch];
  if(later)assert.equal(later.before,firstExpected,`Lesson 10 amendment must identify prior ${ch}`);
  const priorExpected=later?.after??firstExpected;
  const lesson11=lesson11Amendment.practice?.[ch];
  if(lesson11)assert.equal(lesson11.before,priorExpected,`Lesson 11 amendment must identify prior practice ${ch}`);
  assert.equal(hash(current.practiceLesson(ch)),lesson11?.after??priorExpected,`practice-${ch}`);
 }
});
test('Original complete and partial progress checkpoints remain valid',()=>{
 for(const l of current.lessons.filter(l=>Object.hasOwn(baseline.records.lessons,l.id)))for(const index of [0,Math.floor(l.steps.length/2),l.steps.length]){
  assert.ok(current.validSession({id:'550e8400-e29b-41d4-a716-446655440030',lessonId:l.id,index,independent:0,assisted:0,complete:index===l.steps.length,updatedAt:1}),l.id);
 }
 for(const [lessonId,length]of Object.entries(current.previousLessonLengths))assert.ok(current.validSession({id:'550e8400-e29b-41d4-a716-446655440030',lessonId,index:length,independent:0,assisted:0,complete:true,updatedAt:1}));
});

// This gate is intentionally migration-only: future feature work can change app files.
test('Architecture migration preserves every UI, auth, saving, streak, handwriting and deployment source', {skip:process.env.COURSE_MIGRATION_CHECK!=='1'},()=>{
 for(const [file,digest]of Object.entries(baseline.files))assert.equal(hash(fs.readFileSync(`${root}/${file}`,'utf8')),digest,file);
});
