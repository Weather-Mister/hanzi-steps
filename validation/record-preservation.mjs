import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readJSON} from './course-io.mjs';

// One ordered chain shared by current and historical preservation gates.
// A revision is valid only if its before hash matches the preceding snapshot.
export const recordAmendments=[
 'book1-first-teaching-amendment',
 'book1-first-teaching-amendment-lesson10',
 'units26-31-correction-amendment',
 'spotlight-word-amendment',
 'book1-first-teaching-amendment-lesson11',
 'units29-33-polish-amendment',
 'book1-first-teaching-amendment-lesson13',
 'book1-first-teaching-amendment-lesson15',
 'book1-character-quality-amendment',
 'book1-self-contained-learner-amendment',
 'book1-grammar-clarity-amendment',
 'teaching-quality-amendment',
 'baseline-regression-amendment'
].map(name=>({name,...readJSON(`validation/fixtures/${name}.json`)}));

export const recordHash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function assertReviewedRecord(key,id,original,actual){
 let expected=original;
 for(const amendment of recordAmendments){
  const change=amendment.records?.[key]?.[id];
  if(!change)continue;
  assert.equal(change.before,expected,`${amendment.name}: prior ${key} ${id}`);
  expected=change.after;
 }
 assert.notEqual(actual,undefined,`${key} ${id} must still exist`);
 assert.equal(recordHash(actual),expected,`${key} ${id}`);
}
