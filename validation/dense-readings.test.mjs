import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {generateReadings} from '../scripts/generate-dense-readings.mjs';
import raw from '../course/readings/checkpoints.json' with {type:'json'};
import {lessons} from '../course/runtime.ts';
import {validSession} from '../lib/curriculum.ts';
import {readingCheckpoints,readingAvailable,readingStorageKey,readReadingProgress,freshReadingProgress,validReadingProgress} from '../lib/reading-checkpoints.ts';
import {readingPrerequisites} from '../lib/curriculum-relations.ts';
import {validateReadingContracts,readingContracts,readingTokenStatus} from '../lib/learning-materials.ts';
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const dense=readingCheckpoints.filter(r=>r.id.endsWith('-dense'));

test('all 44 existing readings and every lesson step remain byte-for-byte equivalent to the reviewed baseline',()=>{
 assert.equal(hash(raw.filter(r=>!/-dense$|-mini$/.test(r.id))),'09c1678074e7617f768c7a1824aa9adb4ced603d6192822699d19cb18111f901');
 assert.equal(hash(lessons.map(l=>({id:l.id,unitId:l.unitId,steps:l.steps.filter(s=>s.type!=='produce')}))),'d5158c9ff7b3bd3b9d24eb860d66774ce11a09d6d0c11bc6ecb60e603c6302ab');
});
test('dense readings are interleaved, connected, evidence-based and fully classified',()=>{
 assert.deepEqual(dense.map(r=>r.unitId),[11,14,17,20,23,26,29,32,35,38,41,44,47].map(n=>'unit-'+n));
 assert.deepEqual(new Set(dense.map(r=>r.presentation)),new Set(['dialogue','messages','schedule','notice']));
 assert.deepEqual(validateReadingContracts(),[]);
 for(const r of dense){
  assert.equal(r.version,1);assert.ok(r.lines.length>=8);assert.equal(r.questions.length,4);
  assert.ok(r.lines.map(l=>l.text).join('').length>=100,r.id+' is a substantial connected passage');
  assert.ok(r.questions.some(q=>new Set(q.evidence).size>=2),r.id+' needs cross-line comprehension');
  assert.equal(new Set(r.questions.map(q=>q.answer)).size,4,r.id+' distributes answer positions');
  for(const t of readingContracts[r.id].segments.flat())assert.ok(!['unclassified','forbidden-future'].includes(readingTokenStatus(r.id,t)),r.id+':'+t);
  assert.ok(Object.values(r.glosses).filter(g=>g.unfamiliar).length<=1);
 }
});
test('every new checkpoint requires the complete existing teaching boundary',()=>{
 for(const r of dense){
  const required=readingPrerequisites(r.unitId),complete=new Set(required);
  assert.equal(readingAvailable(r,complete),true);
  for(const lessonId of required){const gap=new Set(complete);gap.delete(lessonId);assert.equal(readingAvailable(r,gap),false,r.id+' missing '+lessonId);}
 }
});
test('old cloud session shapes, local answer resume and profile isolation remain compatible',()=>{
 const values=new Map(),storage={getItem:key=>values.get(key)||null};
 for(const [i,l] of lessons.entries()){
  const session={id:'550e8400-e29b-41d4-a716-'+String(i).padStart(12,'0'),lessonId:l.id,index:l.steps.length,independent:0,assisted:0,complete:true,updatedAt:1};
  assert.equal(validSession(session),true,l.id);
 }
 const pending='hanzi-steps-unsynced-v1-alice',pendingPayload='[{"id":"unchanged-offline-checkpoint"}]';
 values.set(pending,pendingPayload);
 for(const r of dense){
  const fresh=freshReadingProgress(r),partial={...fresh,phase:'questions',answers:[2,null,null,null],usedHelp:true};
  values.set(readingStorageKey('alice',r),JSON.stringify(partial));
  assert.deepEqual(readReadingProgress(storage,'alice',r),partial);
  assert.deepEqual(readReadingProgress(storage,'bob',r),fresh);
  const done={...partial,phase:'review',answers:r.questions.map(q=>q.answer)};
  assert.equal(validReadingProgress(done,r),true);
  values.set(readingStorageKey('alice',r),JSON.stringify(done));
  assert.deepEqual(readReadingProgress(storage,'alice',r),done);
  assert.equal(values.get(pending),pendingPayload);
  assert.ok(!readingStorageKey('alice',r).startsWith('hanzi-steps-unsynced'));
 }
});
test('authored dense sources and runtime registry are in sync',()=>{
 generateReadings(true);
});

test('every Book 1 unit from 11 through 48 has a reading with at least two questions',()=>{
 for(let n=11;n<=48;n++){
  const readings=readingCheckpoints.filter(r=>r.unitId==='unit-'+n);
  assert.ok(readings.length>=1,'Unit '+n+' needs a reading');
  assert.ok(readings.every(r=>r.questions.length>=2));
 }
 const minis=readingCheckpoints.filter(r=>r.id.endsWith('-mini'));
 assert.deepEqual(minis.map(r=>r.unitId),[12,15,18,21,24,27,30,33,36,39,42,45].map(n=>'unit-'+n));
 for(const r of minis){
  assert.equal(r.lines.length,4);assert.equal(r.questions.length,2);
  const done=new Set(readingPrerequisites(r.unitId));assert.equal(readingAvailable(r,done),true);
  done.delete(readingPrerequisites(r.unitId).at(-1));assert.equal(readingAvailable(r,done),false);
  const fresh=freshReadingProgress(r);assert.deepEqual(fresh.answers,[null,null]);
  assert.equal(validReadingProgress({...fresh,phase:'review',answers:r.questions.map(q=>q.answer)},r),true);
  assert.ok(r.questions.some(q=>q.evidence.length>=2),r.id+' requires connected comprehension');
  assert.equal(Object.values(r.glosses).filter(g=>g.unfamiliar).length,0);
 }
});
