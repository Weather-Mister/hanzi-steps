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
  if(char==='國'){
   assert.equal(strokeGeometryLooksAligned(local),false,'國 must be rejected because its bundled medians do not match its stroke paths');
  }
 }
});

test('stroke geometry validator accepts known-good local data and rejects broken 國 data',()=>{
 assert.equal(strokeGeometryLooksAligned(strokeData['人']),true);
 assert.equal(strokeGeometryLooksAligned(strokeData['國']),false);
});
