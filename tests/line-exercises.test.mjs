import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,phrases,grammarRules} from '../course/runtime.ts';
import {lineExercises,lineExerciseForStep} from '../lib/line-exercises.ts';

const timeline=lessons.flatMap(lesson=>lesson.steps.map(step=>({lesson,step})));

test('LINE exchanges are occasional ordinary practice throughout the course, using already taught messages',()=>{
 assert.equal(lineExercises.length,18);
 assert.equal(new Set(lineExercises.map(e=>e.stepId)).size,lineExercises.length);
 assert.equal(new Set(lineExercises.map(e=>e.unitId)).size,lineExercises.length);
 for(const exercise of lineExercises){
  const index=timeline.findIndex(({step})=>step.id===exercise.stepId);
  assert.ok(index>=0,`${exercise.stepId} must be an existing step`);
  const {lesson,step}=timeline[index];
  assert.equal(lesson.unitId,exercise.unitId);
  assert.equal(lineExerciseForStep(step,lesson,phrases),exercise);
  const incoming=phrases[exercise.incomingPhraseId];
  assert.ok(incoming?.text&&incoming.pinyin&&incoming.meaning,`missing source message: ${exercise.stepId}`);
  assert.ok(timeline.slice(0,index).some(({step})=>(step.type==='phrase'&&step.phrase===exercise.incomingPhraseId)||(step.type==='grammar'&&grammarRules[step.grammar]?.examples.some(example=>example.text===incoming.text))),`${exercise.stepId} leaks a future message`);
  const answer=step.type==='order'?phrases[step.phrase]?.text:step.answer;
  assert.ok(answer&&/[\u3400-\u9fff]/.test(answer),`${exercise.stepId} needs a Chinese reply`);
  if(step.type==='order')for(const token of phrases[step.phrase].tokens)assert.ok(step.tokens.includes(token),`${exercise.stepId} reply token missing from the original bank`);
  else assert.ok(step.options.includes(answer),`${exercise.stepId} answer missing from choices`);
 }
 const numbers=lineExercises.filter(e=>e.unitId.startsWith('unit-')).map(e=>Number(e.unitId.slice(5)));
 assert.equal(numbers[0],1);
 assert.equal(numbers.at(-1),48);
 for(let i=1;i<numbers.length;i++)assert.ok(numbers[i]-numbers[i-1]<=4,'long gap in LINE practice');
});

test('ordinary, character, production and unrelated lesson steps are not turned into LINE exchanges',()=>{
 for(const {lesson,step} of timeline){
  if(!lineExercises.some(e=>e.stepId===step.id))assert.equal(lineExerciseForStep(step,lesson,phrases),undefined);
 }
 const {lesson,step}=timeline.find(({step})=>step.id===lineExercises[0].stepId);
 assert.equal(lineExerciseForStep(step,{...lesson,unitId:'unit-48'},phrases),undefined);
 assert.equal(lineExerciseForStep({...step,type:'produce'},lesson,phrases),undefined);
 assert.equal(lineExerciseForStep(step,lesson,{}),undefined);
});
