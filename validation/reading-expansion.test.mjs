import test from 'node:test';
import assert from 'node:assert/strict';
import readings from '../course/readings/checkpoints.json' with {type:'json'};
import {readingsForUnit,readingStorageKey} from '../lib/reading-checkpoints.ts';
import {findLesson,validSession} from '../lib/curriculum.ts';
import {validateReadingContracts} from '../lib/learning-materials.ts';

const milestones=['unit-10','unit-13','unit-16','unit-19','unit-22','unit-25','unit-28','unit-31','unit-34','unit-37','unit-40','unit-43','unit-46'];
const legacy=[
 'reading-unit-10','reading-unit-13','reading-unit-16','reading-unit-19','reading-unit-22',
 'reading-unit-25','reading-unit-28','reading-unit-31','reading-unit-34','reading-unit-37',
 'reading-unit-40','reading-unit-44','reading-unit-48','reading-book-2-unit-4'
];

test('reading expansion keeps the three-per-milestone rhythm and preserved bonuses',()=>{
 assert.equal(readings.length,69);
 assert.equal(new Set(readings.map(r=>r.id)).size,69,'reading ids stay unique');
 for(const unitId of milestones)assert.equal(readingsForUnit(unitId).length,3,unitId);
 assert.equal(readingsForUnit('unit-44').filter(r=>!r.id.endsWith('-dense')).length,1,'Unit 44 retains its original bonus reading');
 assert.equal(readingsForUnit('unit-48').length,1,'Unit 48 remains a bonus reading');
 assert.equal(readingsForUnit('book-2-unit-4').length,3,'Book 2 Unit 4 gets a full reading set');
 for(const id of legacy){
  const reading=readings.find(r=>r.id===id);
  assert.ok(reading,id);
  assert.equal(reading.version,1,id+' keeps its saved-answer version');
 }
 const keys=readings.map(r=>readingStorageKey('compat-user',r));
 assert.equal(new Set(keys).size,69,'every reading keeps independent saved progress');
});

test('new phrase-backed readings remain tied to canonical learner-facing course phrases',()=>{
 const old=new Set(legacy);
 for(const reading of readings.filter(r=>!old.has(r.id)&&!r.id.endsWith('-dense')&&!r.id.endsWith('-mini'))){
  assert.ok(reading.lines.length>=3,reading.id);
  assert.ok(reading.questions.length>=2,reading.id);
  for(const line of reading.lines)assert.ok(line.sourcePhraseId,reading.id+' line needs canonical source');
 }
 assert.deepEqual(validateReadingContracts(),[]);
});

test('old completed reviews stay complete after embedded reading checks are appended',()=>{
 const historical={
  'u12-challenge':20,
  'u18-review':19,
  'u24-review':19,
  'u30-review':22,
  'u36-review':27,
  'u42-review':25,
  'u48-review':58,
 };
 let i=0;
 for(const [lessonId,oldLength] of Object.entries(historical)){
  const lesson=findLesson(lessonId);
  assert.equal(lesson.steps.length,oldLength+1,lessonId);
  const base={id:'550e8400-e29b-41d4-a716-44665544'+String(i++).padStart(4,'0'),lessonId,index:oldLength,independent:0,assisted:0,updatedAt:1};
  assert.equal(validSession({...base,complete:true}),true,lessonId+' historical completion');
  assert.equal(validSession({...base,complete:false}),true,lessonId+' historical draft can continue into appended check');
  assert.equal(validSession({...base,index:oldLength+1,complete:true}),true,lessonId+' new completion');
 }
});
