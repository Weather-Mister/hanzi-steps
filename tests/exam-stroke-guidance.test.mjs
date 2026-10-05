import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {strokeGeometryLooksAligned} from '../lib/stroke-data-validation.ts';
import {examStudyItems,examStudySets} from '../lib/exam-study.ts';

const strokeData=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url),'utf8'));

test('every Exam Study set has valid handwriting coverage or safe fallback',()=>{
 for(const set of examStudySets){
  const chars=[...new Set(examStudyItems(set).flatMap(item=>item.characters))];
  assert.ok(chars.length>0,`Exam Study ${set.id} must contain handwriting characters`);
  for(const char of chars){
   const local=strokeData[char];
   if(!local)continue; // Hanzi Writer fallback is intentional for exam-only chars without bundled guides.
   assert.equal(strokeGeometryLooksAligned(local),true,`${char} must have aligned local guides`);
  }
 }
});

test('Week 2 handwriting targets include the supplied Traditional forms',()=>{
 const set=examStudySets.find(candidate=>candidate.id===2);
 assert.ok(set);
 const chars=new Set(examStudyItems(set).flatMap(item=>item.characters));
 for(const char of ['名','字','哪','呢','臺','灣','他','中','國','她','誰','華','人']){
  assert.ok(chars.has(char),`Week 2 must include ${char}`);
 }
});

test('Week 3 handwriting targets include every supplied Traditional form',()=>{
 const set=examStudySets.find(candidate=>candidate.id===3);
 assert.ok(set);
 const chars=new Set(examStudyItems(set).flatMap(item=>item.characters));
 for(const char of ['早','趙','小','姐','張','好','久','不','見','啊','很','謝','也','這','太','你','們','我','他']){
  assert.ok(chars.has(char),`Week 3 must include ${char}`);
 }
});

test('stroke geometry validator accepts repaired data and rejects inverted 國 guides',()=>{
 assert.equal(strokeGeometryLooksAligned(strokeData['人']),true);
 const guo=strokeData['國'];
 assert.equal(strokeGeometryLooksAligned(guo),true);
 const inverted={...guo,medians:guo.medians.map(stroke=>stroke.map(([x,y])=>[x,1024-y]))};
 assert.equal(strokeGeometryLooksAligned(inverted),false);
});

test('every bundled character has guides aligned with its visible strokes',()=>{
 for(const [char,data] of Object.entries(strokeData)){
  assert.equal(strokeGeometryLooksAligned(data),true,`${char}: misaligned handwriting guide`);
 }
});
