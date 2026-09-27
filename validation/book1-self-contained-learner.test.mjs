import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';

const course=await loadCourse();
const book1=course.modules.filter(module=>module.bookId==='book-1');

const internalKeys=new Set([
  'id','bookId','unitId','lessonId','reviewLessonId','bookReference','grammarIds',
  'revisionStepIds','reviewGrammar','lessonIds','ref','kind','theme','layout','visualScene','phrase','grammar'
]);

function collect(value,path=[],out=[]){
  if(typeof value==='string'){out.push({path:path.join('.'),text:value});return out;}
  if(Array.isArray(value)){value.forEach((item,index)=>collect(item,[...path,String(index)],out));return out;}
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      if(internalKeys.has(key))continue;
      collect(item,[...path,key],out);
    }
  }
  return out;
}

const banned=[
  /\btextbook(?:-[a-z]+)?\b/i,
  /\bDialogue\s+[IVX]+\b/i,
  /\bLesson[- ]\d+\b/i,
  /\bB1L\d+(?:-[A-Z0-9]+)?\b/i,
  /\bD[12]T\d+(?:[–-]D[12]T\d+)?\b/i,
  /\b[AGPXF]\d{3}\b/,
  /\bCUL\d{3}\b/,
  /\bActivity[-\s]?[IVX0-9]+\b/i,
  /\bGrammar\s+[IVX]+\b/i,
  /\bVocabulary\s+[IVX]+\b/i,
  /\bsource[- ](?:reply|reaction|line|sentence|phrase|word|sense|meaning|pattern|rule|system|function|distinction|support|anchor|chunk|opening|call|speaker|cost|scholarship|sequence|wh-question|interaction|transfer|outcome|question|example|order|frame|toolkit|boundary|baseline|culture|reading|prescription|role|illustration|table|style|valid|supported|required|compatible|accurate|specific|only|data|era|listed|derived)\b/i
];

test('Book 1 learner-facing content does not expose invisible source/editor metadata',()=>{
  const leaks=[];
  for(const unit of book1)for(const item of collect(unit)){
    const rule=banned.find(pattern=>pattern.test(item.text));
    if(rule)leaks.push(`${unit.unit.id} ${item.path}: ${item.text}`);
  }
  assert.deepEqual(leaks,[]);
});

const flatSteps=unit=>unit.lessons.flatMap(lesson=>lesson.steps);
const stepIndex=(unit,id)=>flatSteps(unit).findIndex(step=>step.id===id);

test('Culture and reference-dependent questions have visible local context first',()=>{
  const u40=book1.find(module=>module.unit.id==='unit-40');
  const u44=book1.find(module=>module.unit.id==='unit-44');
  const u48=book1.find(module=>module.unit.id==='unit-48');

  assert.ok(stepIndex(u40,'u40-customs-p1')>=0);
  assert.ok(stepIndex(u40,'u40-customs-p1')<stepIndex(u40,'u40-customs-c1'));
  const birthday=u40.phrases['u40-dialogue-tail'].note;
  for(const fact of ['lunar calendar','Gregorian calendar','one month and one year','60, 70, and 80','zhuāzhōu'])
    assert.ok(birthday.includes(fact),`birthday culture card misses ${fact}`);

  assert.ok(stepIndex(u44,'u44-typhoon-p5')<stepIndex(u44,'u44-culture-s1'));
  const typhoon=u44.phrases['u44-culture-note'].note;
  for(const fact of ['next four hours','regional governments','Historical'])
    assert.ok(typhoon.includes(fact),`typhoon context card misses ${fact}`);

  assert.ok(stepIndex(u48,'u48-a001-table')<stepIndex(u48,'u48-a001-s1'));
  assert.ok(stepIndex(u48,'u48-prescription-visual')<stepIndex(u48,'u48-a003-s1'));
  assert.ok(stepIndex(u48,'u48-culture-source-era')<stepIndex(u48,'u48-culture-s1'));
  const mask=u48.phrases['u48-culture-source-era'].note;
  assert.match(mask,/crowded buses\/MRT/);
  assert.match(mask,/Historical/i);
});
