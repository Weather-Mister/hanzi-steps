import test from 'node:test';
import assert from 'node:assert/strict';
import {courseModules} from '../course/registry.generated.ts';
import {lessons,phrases,units} from '../course/runtime.ts';
import {readingCheckpoints} from '../lib/reading-checkpoints.ts';
import {
 cumulativeEncounterForUnit,
 cumulativeEncounterUnitNumbers,
 engagementPrompt,
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

test('ordinary practice no longer wraps exercises in generic situation or reply cards',async()=>{
 const {readFile}=await import('node:fs/promises');
 const ui=await readFile(new URL('../components/learning-app.tsx',import.meta.url),'utf8');
 const metadata=await readFile(new URL('../lib/lesson-engagement.ts',import.meta.url),'utf8');
 assert.ok(!ui.includes('engagement-frame'));
 assert.ok(!metadata.includes('Respond in Chinese to this situation'));
 assert.ok(!metadata.includes('lesson.subtitle'));
 for(const lesson of lessons)for(const step of lesson.steps.filter(step=>step.type==='produce'||step.type==='visual')){
  assert.equal(engagementPrompt(step,lesson,phrases),step.prompt);
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
