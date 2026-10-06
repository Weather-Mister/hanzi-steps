import test from 'node:test';
import assert from 'node:assert/strict';
import {courseModules} from '../course/registry.generated.ts';
import {lessons,phrases} from '../course/runtime.ts';

const runtimeById=new Map(lessons.map(lesson=>[lesson.id,lesson]));

test('Units 11-48 engagement pass preserves published curriculum contracts',()=>{
 for(const module of courseModules){
  for(const source of module.lessons){
   const runtime=runtimeById.get(source.id);
   assert.ok(runtime,`missing runtime lesson ${source.id}`);
   assert.equal(runtime.steps.length,source.steps.length,`${source.id} step count changed`);
   source.steps.forEach((step,index)=>{
    const engaged=runtime.steps[index];
    assert.equal(engaged.id,step.id,`${source.id} moved/replaced step ${step.id}`);
    assert.equal(engaged.type,step.type,`${step.id} type changed`);
    assert.equal(engaged.answer,step.answer,`${step.id} answer changed`);
    assert.deepEqual(engaged.options,step.options,`${step.id} options changed`);
    assert.equal(engaged.audioText,step.audioText,`${step.id} audio changed`);
    assert.equal(engaged.phrase,step.phrase,`${step.id} phrase changed`);
    assert.deepEqual(engaged.production,step.production,`${step.id} production contract changed`);
   });
  }
 }
});

test('every Book 1 unit 11-48 receives contextual assessed framing without touching production',()=>{
 for(const module of courseModules.filter(module=>module.bookId==='book-1'&&module.order>=11&&module.order<=48)){
  const sourceSteps=module.lessons.flatMap(lesson=>lesson.steps);
  const runtimeSteps=module.lessons.flatMap(lesson=>runtimeById.get(lesson.id).steps);
  const candidates=sourceSteps.filter(step=>['select','order','listen'].includes(step.type));
  assert.ok(candidates.length>0,`unit ${module.order} has no engagement candidates`);
  const changed=candidates.filter(step=>{
   const engaged=runtimeSteps.find(item=>item.id===step.id);
   return engaged?.prompt!==step.prompt;
  });
  assert.ok(changed.length>0,`unit ${module.order} received no contextual framing`);
  for(const step of sourceSteps.filter(step=>step.type==='produce')){
   const engaged=runtimeSteps.find(item=>item.id===step.id);
   assert.deepEqual(engaged,step,`${step.id} production step must remain byte-for-byte curriculum-equivalent`);
  }
 }
});

test('order framing is grounded in the canonical phrase meaning',()=>{
 for(const lesson of lessons){
  const match=lesson.unitId?.match(/^unit-(\d+)$/);
  const number=match?Number(match[1]):0;
  if(number<11||number>48)continue;
  for(const step of lesson.steps.filter(step=>step.type==='order'&&step.phrase)){
   const phrase=phrases[step.phrase];
   assert.ok(phrase,`missing phrase ${step.phrase}`);
   assert.ok(step.prompt,`${step.id} has no engagement prompt`);
   if(!courseModules.flatMap(m=>m.lessons).flatMap(l=>l.steps).find(s=>s.id===step.id)?.prompt){
    assert.ok(step.prompt.includes(phrase.meaning),`${step.id} generated framing is not grounded in its canonical meaning`);
   }
  }
 }
});
