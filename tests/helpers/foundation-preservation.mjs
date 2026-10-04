import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as curriculum from '../../lib/curriculum.ts';
import {assertReviewedRecord,recordHash} from '../../validation/record-preservation.mjs';

const read=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url),'utf8'));
const migration=read('../../validation/fixtures/live-before-refactor.json');
const geometryRevisions=read('../fixtures/foundation-stroke-revisions.json');
const geometry=read('../../lib/stroke-data.json');
// Exact first-teaching inventory of the retired Book 2 prototype in commit
// 41f57f7. It was intentionally removed by 6107c5e and the two September 26
// purge migrations. Do not restore that content or alias its saved positions.
const retiredWords=new Set(['請問','怎麼','走','到','師大','從','往','前','一直','左','右','轉','左轉','右轉','路','路口','銀行','超商','附近','近','遠','離']);
const retiredCharacters=new Set([...'問走怎到師從往前直左右轉路口銀行超商附近遠離']);

export function assertFoundationPreserved(baseline,current=curriculum,strokes=geometry){
 for(const key of ['lessons','units','vocabulary','characters','grammarRules','phrases']){
  const records=current[key];
  const actual=Array.isArray(records)?Object.fromEntries(records.map(r=>[r.id||r.text,r])):records;
  for(const [id,digest] of Object.entries(baseline[key])){
   if(['lessons','grammarRules','phrases'].includes(key)&&/^b2/.test(id)){
    assert.equal(Object.hasOwn(actual,id),false,`${key} ${id}: retired IDs must not be reused`);
    continue;
   }
   if(key==='units'&&/^book-2-unit-[12]$/.test(id))continue;
   if(key==='vocabulary'&&retiredWords.has(id))continue;
   // Shared glyphs now belong to Book 1. When its immutable migration snapshot
   // retains the old record, apply the normal reviewed chain to it as well.
   if(key==='characters'&&retiredCharacters.has(id)&&migration.records.characters[id]!==digest)continue;
   assertReviewedRecord(key,id,digest,actual[id]);
  }
 }
 const bookThree=migration.books.find(b=>b.id==='book-3');
 assert.deepEqual(current.books.find(b=>b.id==='book-3'),bookThree);
 // Current Book 2 has its own published checkpoint gate. Its old container
 // cannot be whole-book hashed after an explicit purge and complete rebuild.
 for(const [char,digest] of Object.entries(baseline.strokes)){
  if(char==='銀'){
   assert.equal(strokes[char],undefined,'The retired-only 銀 dataset stays removed');
   assert.equal(current.characters[char],undefined);
   continue;
  }
  const revision=geometryRevisions.strokes[char];
  if(revision)assert.equal(revision.before,digest,`${char}: original geometry`);
  assert.notEqual(strokes[char],undefined,`${char}: geometry must still exist`);
  assert.equal(recordHash(strokes[char]),revision?.after??digest,`${char}: geometry`);
 }
}
