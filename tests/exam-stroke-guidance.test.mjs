import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {strokeGeometryLooksAligned} from '../lib/stroke-data-validation.ts';
import {examStudyItems,examStudySets} from '../lib/exam-study.ts';

const strokeData=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url),'utf8'));

test('Week 1 Exam Study has valid handwriting coverage or safe fallback',()=>{
 const set=examStudySets.find(candidate=>candidate.id===1);
 assert.ok(set);
 const chars=[...new Set(examStudyItems(set).flatMap(item=>item.characters))];
 assert.ok(chars.includes('國'));
 for(const char of chars){
  const local=strokeData[char];
  if(!local)continue; // Hanzi Writer fallback is intentional for new exam-only chars.
  assert.equal(strokeGeometryLooksAligned(local),true,`${char} must have aligned local guides`);
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
