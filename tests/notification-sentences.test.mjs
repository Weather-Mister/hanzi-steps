import test from 'node:test';
import assert from 'node:assert/strict';
import {courseModules} from '../course/registry.generated.ts';
import {notificationSentences,sentencesForLevel} from '../supabase/functions/hanzi-push/sentences.ts';

test('notification reading checks are unique and not copied from learner-facing course content',()=>{
 const texts=notificationSentences.map(sentence=>sentence.text);
 assert.equal(new Set(texts).size,texts.length,'notification sentence bank contains a duplicate');
 const corpus=JSON.stringify(courseModules);
 const repeated=[];
 for(const sentence of notificationSentences){
  const stem=sentence.text.replace(/[。？！!?]+$/u,'');
  assert.ok(stem.length>=4,`notification sentence is too short: ${sentence.id}`);
  if(corpus.includes(stem))repeated.push(`${sentence.id}: ${sentence.text}`);
 }
 assert.deepEqual(repeated,[],`notification sentences must not repeat course content:\n${repeated.join('\n')}`);
});

test('reading checks stay within the latest four units of the current level',()=>{
 for(let unit=4;unit<=48;unit++){
  const candidates=sentencesForLevel(1,unit);
  assert.ok(candidates.length>=4,`Book 1 Unit ${unit} should have at least four recent candidates`);
  assert.ok(candidates.every(sentence=>sentence.book===1&&sentence.unit>=unit-3&&sentence.unit<=unit));
 }
 for(let unit=1;unit<=4;unit++){
  const candidates=sentencesForLevel(2,unit);
  assert.ok(candidates.length>=3,`Book 2 Unit ${unit} should have several candidates`);
  assert.ok(candidates.every(sentence=>sentence.book===2||(unit===1&&sentence.book===1&&sentence.unit>=46)));
 }
});
