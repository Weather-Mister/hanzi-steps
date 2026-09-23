import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';

const course=await loadCourse();
const u34=course.modules.find(m=>m.unit.id==='unit-34');

function reviewBlob(module){
  const review=module.lessons.find(l=>l.id===module.reviewLessonId);
  const values=[];
  for(const step of review.steps){
    for(const key of ['prompt','answer','explanation','audioText','char'])if(typeof step[key]==='string')values.push(step[key]);
    if(Array.isArray(step.options))values.push(...step.options);
    if(Array.isArray(step.tokens))values.push(...step.tokens);
    if(step.phrase&&module.phrases[step.phrase]){
      const p=module.phrases[step.phrase];
      values.push(p.text,p.pinyin,p.meaning,p.note??'');
    }
  }
  return values.join('\n');
}

test('Unit 34 keeps balanced novelty and full lesson/review structure',()=>{
  assert.equal(u34.newVocabulary.length,12);
  assert.equal(u34.newCharacters.length,13);
  assert.equal(u34.lessons.length,7);
  const review=u34.lessons.find(l=>l.id===u34.reviewLessonId);
  assert.equal(review.steps.length,22);
  assert.ok(review.steps.filter(s=>s.type==='listen').length>=3);
  assert.ok(review.steps.filter(s=>s.type==='memory'||s.type==='parts').length>=2);
});

test('Unit 34 retrieves every formal NEW vocabulary item in review',()=>{
  const blob=reviewBlob(u34);
  for(const word of u34.newVocabulary.map(v=>v.text))
    assert.ok(blob.includes(word),'Unit 34 review never retrieves '+word);
});

test('Unit 34 teaches 先…再… before assessing it and preserves the source meaning',()=>{
  const g=u34.grammarRules['u34-first-then'];
  assert.match(g.explanation,/temporal order/i);
  assert.match(g.explanation,/past and future|past.*future/i);
  assert.match(g.explanation,/then \/ next/i);
  assert.equal(u34.phrases['u34-sequence-source'].text,'我先在語言中心念一年，再念四年大學。');
  const intro=u34.grammarIntroductions.find(x=>x.ref==='u34-first-then');
  assert.equal(intro.lessonId,'u34-sequence');
  assert.equal(intro.stepId,'u34-sequence-g1');
  const review=u34.lessons.find(l=>l.id===u34.reviewLessonId);
  assert.ok(review.steps.some(s=>s.grammarIds?.includes('u34-first-then')&&!['phrase','grammar'].includes(s.type)));
});

test('Unit 34 keeps Lesson 12 source distinctions and prior grammar ownership',()=>{
  assert.equal(u34.phrases['u34-plan'].text,'你計畫在臺灣學多久的中文？');
  assert.equal(u34.phrases['u34-time'].text,'為什麼要這麼久的時間？');
  assert.equal(u34.phrases['u34-cost'].text,'這得花不少錢！');
  assert.match(u34.phrases['u34-cost'].note,/得.*děi.*must/i);
  assert.equal(u34.phrases['u34-scholarship'].text,'對，不過我有獎學金。');
  assert.equal(u34.phrases['u34-need'].meaning,'So I need five years.');
  assert.equal(u34.phrases['u34-grades'].text,'要是成績不好，就沒獎學金了。');
  assert.ok(u34.reviewGrammar.includes('u29-yaoshi-jiu'));
  assert.ok(!u34.grammarRules['u29-yaoshi-jiu']);
  assert.ok(u34.reviewVocabulary.includes('再'));
  assert.ok(!u34.newVocabulary.some(v=>v.text==='再'));
});

test('Unit 34 closes the 臺灣 prerequisite gap explicitly',()=>{
  assert.ok(u34.newVocabulary.some(v=>v.text==='臺灣'));
  assert.ok(u34.newCharacters.includes('臺'));
  assert.ok(u34.newCharacters.includes('灣'));
  assert.equal(u34.characters['臺'].example.text,'臺灣');
  assert.equal(u34.characters['灣'].example.text,'臺灣');
});

test('Unit 34 does not falsely claim the deferred Lesson 12 tail',()=>{
  for(const word of ['學費','公司','替','希望','以後','上班','念書','累','加油'])
    assert.ok(!u34.newVocabulary.some(v=>v.text===word),'Deferred word was prematurely marked NEW: '+word);
  assert.ok(!u34.grammarRules['u34-focus-shi-de']);
});

test('Unit 34 handwriting metadata covers each new character exactly once',()=>{
  for(const ch of u34.newCharacters){
    const c=u34.characters[ch];
    assert.ok(c,'missing character record: '+ch);
    const covered=c.parts.flatMap(p=>p.strokes).sort((a,b)=>a-b);
    assert.deepEqual(covered,Array.from({length:c.strokes},(_,i)=>i),ch+': component stroke coverage');
  }
  assert.equal(u34.characters['獎'].strokes,15);
  assert.deepEqual(u34.characters['獎'].parts.find(p=>p.label==='將').strokes,[0,1,2,3,4,5,6,7,8,9,10]);
  assert.deepEqual(u34.characters['獎'].parts.find(p=>p.label==='犬').strokes,[11,12,13,14]);
  assert.ok(!u34.characters['獎'].parts.some(p=>p.label==='大'));
});


test('Unit 34 formal vocabulary glosses stay on the Lesson 12 source senses',()=>{
  const meanings=Object.fromEntries(u34.newVocabulary.map(v=>[v.text,v.meaning]));
  assert.equal(meanings['計畫'],'to plan to');
  assert.equal(meanings['念'],'to study');
  assert.equal(meanings['需要'],'to need');
  assert.equal(meanings['花'],'to spend (time or money)');
});

test('Unit 34 does not assess a formal NEW word before its declared lesson',()=>{
  const lessonIndex=new Map(u34.lessons.map((l,i)=>[l.id,i]));
  const nonAssessmentTypes=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const word of u34.newVocabulary){
    const declared=lessonIndex.get(word.lessonId);
    assert.notEqual(declared,undefined,'unknown declared lesson for '+word.text);
    for(let i=0;i<declared;i++){
      for(const step of u34.lessons[i].steps){
        if(nonAssessmentTypes.has(step.type))continue;
        const blob=[
          step.prompt,step.answer,step.explanation,step.audioText,
          ...(step.options??[]),...(step.tokens??[])
        ].filter(Boolean).join('\n');
        assert.ok(!blob.includes(word.text),
          word.text+' is assessed before '+word.lessonId+' in '+step.id);
      }
    }
  }
});

test('Unit 34 review listening preserves the repaired scholarship contrast',()=>{
  const review=u34.lessons.find(l=>l.id===u34.reviewLessonId);
  const item=review.steps.find(s=>s.id==='u34-review-l3');
  assert.equal(item.audioText,'對，不過我有獎學金。');
  assert.equal(item.answer,'獎學金');
});

test('Unit 34 active 需要 practice tests language rather than arithmetic',()=>{
  const lesson=u34.lessons.find(l=>l.id==='u34-need');
  const item=lesson.steps.find(s=>s.id==='u34-need-s2');
  assert.equal(item.answer,'所以需要五年。');
  assert.match(item.prompt,/Which sentence/i);
});
