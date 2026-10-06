import test from 'node:test';
import assert from 'node:assert/strict';
import {courseModules} from '../course/registry.generated.ts';
import {lessons,phrases} from '../course/runtime.ts';
import {engagementPrompt} from '../lib/lesson-engagement.ts';

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

test('every Book 1 unit 11-48 receives render-only contextual assessed framing',()=>{
 for(const module of courseModules.filter(module=>module.bookId==='book-1'&&module.order>=11&&module.order<=48)){
  const candidates=module.lessons.flatMap(lesson=>lesson.steps.map(step=>({lesson,step}))).filter(({step})=>['select','order','listen'].includes(step.type));
  assert.ok(candidates.length>0,`unit ${module.order} has no engagement candidates`);
  assert.ok(candidates.some(({lesson,step})=>engagementPrompt({...step},runtimeById.get(lesson.id),phrases)!==step.prompt),`unit ${module.order} received no contextual framing`);
  for(const {lesson,step} of module.lessons.flatMap(lesson=>lesson.steps.filter(step=>step.type==='produce'||step.type==='visual').map(step=>({lesson,step})))){
   assert.equal(engagementPrompt(step,runtimeById.get(lesson.id),phrases),step.prompt,`${step.id} protected prompt changed`);
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
