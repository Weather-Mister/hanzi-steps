import test from 'node:test';
import assert from 'node:assert/strict';
import {courseModules} from '../course/registry.generated.ts';
import {lessons,phrases,units} from '../course/runtime.ts';
import {readingCheckpoints} from '../lib/reading-checkpoints.ts';
import {
 cumulativeEncounterForUnit,
 cumulativeEncounterUnitNumbers,
 engagementFrame,
 engagementPrompt,
 isRepairEngagement,
} from '../lib/lesson-engagement.ts';

const runtimeById=new Map(lessons.map(lesson=>[lesson.id,lesson]));

test('engagement layer leaves the published curriculum runtime untouched',()=>{
 for(const module of courseModules){
  for(const source of module.lessons){
   const runtime=runtimeById.get(source.id);
   assert.ok(runtime,`missing runtime lesson ${source.id}`);
   assert.deepEqual(runtime.steps,source.steps,`${source.id} authored steps changed`);
  }
 }
});

test('every Book 1 unit 11-48 receives varied render-only contextual treatment',()=>{
 for(const module of courseModules.filter(module=>module.bookId==='book-1'&&module.order>=11&&module.order<=48)){
  const framed=module.lessons.flatMap(lesson=>{
   const runtime=runtimeById.get(lesson.id);
   return lesson.steps.map(step=>({lesson:runtime,step,frame:engagementFrame(step,runtime)})).filter(row=>row.frame);
  });
  assert.ok(framed.length>0,`unit ${module.order} has no engagement frames`);
  const kinds=new Set(framed.map(row=>row.frame.kind));
  assert.ok(kinds.size>=2,`unit ${module.order} needs more than one interaction treatment: ${[...kinds]}`);
  assert.ok(framed.some(row=>row.frame.kind==='repair'),`unit ${module.order} has no deterministic repair encounter`);
  for(const {lesson,step} of module.lessons.flatMap(lesson=>lesson.steps.filter(step=>step.type==='produce'||step.type==='visual').map(step=>({lesson:runtimeById.get(lesson.id),step})))){
   assert.equal(engagementPrompt(step,lesson,phrases),step.prompt,`${step.id} protected prompt changed`);
   assert.equal(engagementFrame(step,lesson),undefined,`${step.id} protected step received an engagement frame`);
  }
 }
});

test('each eligible lesson has at most one repair target and repair never changes grading data',()=>{
 for(const lesson of lessons){
  const match=lesson.unitId?.match(/^unit-(\d+)$/);
  const number=match?Number(match[1]):0;
  if(number<11||number>48)continue;
  const repairs=lesson.steps.filter(step=>isRepairEngagement(step,lesson));
  assert.ok(repairs.length<=1,`${lesson.id} has multiple repair targets`);
  for(const step of repairs){
   const source=courseModules.flatMap(module=>module.lessons).find(candidate=>candidate.id===lesson.id).steps.find(candidate=>candidate.id===step.id);
   assert.ok(source,`missing source step ${step.id}`);
   assert.equal(step.answer,source.answer,`${step.id} repair changed answer`);
   assert.deepEqual(step.options,source.options,`${step.id} repair changed options`);
   assert.deepEqual(step.production,source.production,`${step.id} repair changed production contract`);
  }
 }
});

test('generated order framing is grounded in canonical phrase meaning',()=>{
 for(const lesson of lessons){
  const match=lesson.unitId?.match(/^unit-(\d+)$/);
  const number=match?Number(match[1]):0;
  if(number<11||number>48)continue;
  for(const step of lesson.steps.filter(step=>step.type==='order'&&step.phrase&&!step.prompt)){
   const phrase=phrases[step.phrase];
   assert.ok(phrase,`missing phrase ${step.phrase}`);
   assert.ok(engagementPrompt(step,lesson,phrases)?.includes(phrase.meaning),`${step.id} framing is not grounded in its canonical meaning`);
  }
 }
});

test('cumulative layer creates exactly 13 non-overlapping three-unit encounters from vetted readings',()=>{
 const numbers=cumulativeEncounterUnitNumbers();
 assert.deepEqual(numbers,[12,15,18,21,24,27,30,33,36,39,42,45,48]);
 const encounters=units.map(unit=>cumulativeEncounterForUnit(unit,units)).filter(Boolean);
 assert.equal(encounters.length,13);
 assert.deepEqual(encounters.map(encounter=>encounter.unitNumber),numbers);
 const covered=[];
 for(const encounter of encounters){
  assert.deepEqual(encounter.blockUnitNumbers,[encounter.unitNumber-2,encounter.unitNumber-1,encounter.unitNumber]);
  covered.push(...encounter.blockUnitNumbers);
  const reading=readingCheckpoints.find(candidate=>candidate.id===encounter.readingId);
  assert.ok(reading,`${encounter.id} references a missing reading`);
  assert.equal(reading.unitId,`unit-${encounter.unitNumber}`,`${encounter.id} reading belongs to the wrong unit`);
  assert.ok(reading.lines.length>=2,`${encounter.readingId} is too thin for a snapshot`);
  assert.ok(reading.questions.length>=1,`${encounter.readingId} has no comprehension check`);
  const question=reading.questions[0];
  assert.ok(question.options.length>=3,`${encounter.readingId} needs meaningful deterministic choices`);
  assert.ok(Number.isInteger(question.answer)&&question.answer>=0&&question.answer<question.options.length,`${encounter.readingId} has an invalid answer key`);
 }
 assert.deepEqual(covered,Array.from({length:39},(_,index)=>10+index));
});
