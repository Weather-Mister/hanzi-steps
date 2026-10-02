import test from 'node:test';
import assert from 'node:assert/strict';
import {listeningItems,listeningStages,listeningStageAvailable,listeningOptions} from '../lib/listening-path.ts';
import {resolveSentence} from '../lib/learning-materials.ts';
import {lessonPosition} from '../lib/curriculum-relations.ts';
import {units,phrases} from '../course/runtime.ts';

function completedThrough(unitId){
 const stop=units.findIndex(unit=>unit.id===unitId);
 assert.ok(stop>=0,'unknown unit '+unitId);
 return new Set(units.slice(0,stop+1).flatMap(unit=>unit.lessonIds));
}

test('listening stages are cumulative 3-7 item sets that unlock at unit completion',()=>{
 assert.ok(listeningStages.length>10,'expected a substantial listening path');
 for(const stage of listeningStages){
  assert.ok(stage.items.length>=3&&stage.items.length<=7,stage.id+' must contain 3-7 items');
  const ids=stage.items.map(item=>resolveSentence(item.source)?.id);
  assert.equal(new Set(ids).size,ids.length,stage.id+' repeats the same source sentence');
  const completed=completedThrough(stage.unitId);
  assert.equal(listeningStageAvailable(stage,completed),true,stage.id+' should unlock after its unit is complete');
  const unit=units.find(unit=>unit.id===stage.unitId);
  const before=new Set([...completed].filter(id=>!unit.lessonIds.includes(id)));
  assert.equal(listeningStageAvailable(stage,before),false,stage.id+' unlocked before the unit ended');
 }
});

test('generated listening choices only use distinct learned meanings',()=>{
 assert.ok(listeningItems.length>25,'expected listening to cover much more than the curated seed set');
 const sentenceByMeaning=new Map();
 for(const id of Object.keys(phrases)){
  const sentence=resolveSentence({kind:'phrase',id});
  if(sentence&&!sentenceByMeaning.has(sentence.meaning))sentenceByMeaning.set(sentence.meaning,sentence);
 }
 for(const item of listeningItems){
  const source=resolveSentence(item.source);
  assert.ok(source,'missing listening source '+item.id);
  assert.ok(source.productive,'listening source must be productive '+item.id);
  const options=listeningOptions(item,'qa:'+item.id);
  assert.ok(options.length>=3,item.id+' needs at least three choices');
  assert.equal(new Set(options.map(option=>option.text)).size,options.length,item.id+' has duplicate meanings');
  assert.equal(options.filter(option=>option.correct).length,1,item.id+' must have exactly one correct meaning');
  const sourcePosition=lessonPosition.get(source.lessonId)??Infinity;
  for(const distractor of item.distractors){
   assert.notEqual(distractor.text,source.meaning,item.id+' distractor duplicates the answer');
   if(item.id.startsWith('course-')){
    const match=sentenceByMeaning.get(distractor.text);
    assert.ok(match,item.id+' generated distractor must come from another course sentence');
    assert.ok((lessonPosition.get(match.lessonId)??Infinity)<=sourcePosition,item.id+' exposes a future distractor');
   }
  }
 }
});
