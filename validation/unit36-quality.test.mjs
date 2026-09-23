import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';

const course=await loadCourse();
const u36=course.modules.find(m=>m.unit.id==='unit-36');

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

test('Unit 36 completes Lesson 12 with coherent density and review',()=>{
  assert.equal(u36.newVocabulary.length,8);
  assert.deepEqual(u36.newCharacters,['工','作','試','難']);
  assert.equal(u36.lessons.length,7);
  assert.deepEqual(u36.unit.grammarIds,['u36-yihou-after','u36-hao-nan-verb']);
  const review=u36.lessons.find(l=>l.id===u36.reviewLessonId);
  assert.ok(review.steps.length>=18);
  assert.ok(review.steps.filter(s=>s.type==='listen').length>=3);
  assert.ok(review.steps.filter(s=>s.type==='memory'||s.type==='parts').length>=2);
});

test('Unit 36 retrieves every formal NEW vocabulary item in review',()=>{
  const blob=reviewBlob(u36);
  for(const word of u36.newVocabulary.map(v=>v.text))
    assert.ok(blob.includes(word),'Unit 36 review never retrieves '+word);
});

test('Unit 36 preserves Dialogue II core lines and source phrase treatment',()=>{
  assert.equal(u36.phrases['u36-work-question'].text,'你是什麼時候來臺灣工作的？');
  assert.equal(u36.phrases['u36-last-year'].text,'去年，我已經在臺灣工作一年了。');
  assert.equal(u36.phrases['u36-tuition-question'].text,'為什麼你們公司要替你付學費？');
  assert.equal(u36.phrases['u36-business'].text,'因為我們公司跟臺灣人做生意。');
  assert.equal(u36.phrases['u36-company-good'].text,'我覺得你們公司真好。');
  assert.equal(u36.phrases['u36-after-question'].text,'對了，你回國以後，打算做什麼？');
  assert.equal(u36.phrases['u36-after-home'].text,'我回國以後，也想找個有機會說中文的工作。');
  assert.equal(u36.phrases['u36-job-question'].text,'不錯，這樣的工作在你們國家好找嗎？');
  assert.equal(u36.phrases['u36-try-it'].text,'不知道好不好找，我試試看。');
  assert.equal(u36.phrases['u36-hard-find'].text,'要是難找呢？');
  assert.equal(u36.phrases['u36-then'].text,'那麼我再來臺灣學中文。');
  assert.equal(u36.phrases['u36-see-again'].text,'太好了！那我們就可以再見面了。');
  assert.ok(!u36.newVocabulary.some(v=>v.text==='試試看'));
  assert.ok(!u36.newVocabulary.some(v=>v.text==='做生意'));
});

test('Unit 36 distinguishes both source functions of 以後',()=>{
  const g=u36.grammarRules['u36-yihou-after'];
  assert.match(g.explanation,/standalone.*in the future/i);
  assert.match(g.explanation,/event or time expression comes before 以後/i);
  assert.equal(u36.phrases['u36-after-home'].grammarIds[0],'u36-yihou-after');
  const intro=u36.grammarIntroductions.find(x=>x.ref==='u36-yihou-after');
  assert.equal(intro.lessonId,'u36-after');
  assert.equal(intro.stepId,'u36-after-g1');
});

test('Unit 36 teaches full 好/難 + verb distinctions',()=>{
  const g=u36.grammarRules['u36-hao-nan-verb'];
  assert.match(g.explanation,/perception verbs/i);
  assert.match(g.explanation,/action verbs/i);
  assert.match(g.explanation,/easy to/i);
  assert.match(g.explanation,/hard\/difficult to/i);
  assert.match(g.explanation,/degree adverbs/i);
  assert.match(g.explanation,/Negation puts 不/i);
  assert.match(g.explanation,/A-not-A/i);
  const review=u36.lessons.find(l=>l.id===u36.reviewLessonId);
  assert.ok(review.steps.filter(s=>s.grammarIds?.includes('u36-hao-nan-verb')&&!['phrase','grammar'].includes(s.type)).length>=4);
});

test('Unit 36 keeps 工作 source verb and noun senses in one written-form entry',()=>{
  const work=u36.newVocabulary.find(v=>v.text==='工作');
  assert.equal(work.meaning,'to work; job, work');
  assert.match(work.note,/verb/i);
  assert.match(work.note,/noun/i);
  assert.equal(u36.newVocabulary.filter(v=>v.text==='工作').length,1);
});

test('Unit 36 handwriting metadata covers each new character exactly once',()=>{
  for(const ch of u36.newCharacters){
    const c=u36.characters[ch];
    assert.ok(c,'missing character record: '+ch);
    const covered=c.parts.flatMap(p=>p.strokes).sort((a,b)=>a-b);
    assert.deepEqual(covered,Array.from({length:c.strokes},(_,i)=>i),ch+': component stroke coverage');
  }
});

test('Unit 36 contextual listening has exactly one audible answer option',()=>{
  const review=u36.lessons.find(l=>l.id===u36.reviewLessonId);
  for(const step of review.steps.filter(s=>s.type==='listen')){
    assert.ok(step.audioText.includes(step.answer),step.id+' audio omits answer');
    assert.equal(step.options.filter(o=>step.audioText.includes(o)).length,1,step.id+' audio contains multiple answer options');
  }
});

test('Unit 36 does not assess a formal NEW word before its declared lesson',()=>{
  const lessonIndex=new Map(u36.lessons.map((l,i)=>[l.id,i]));
  const nonAssessmentTypes=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const word of u36.newVocabulary){
    const declared=lessonIndex.get(word.lessonId);
    assert.notEqual(declared,undefined,'unknown declared lesson for '+word.text);
    for(let i=0;i<declared;i++){
      for(const step of u36.lessons[i].steps){
        if(nonAssessmentTypes.has(step.type))continue;
        const blob=[step.prompt,step.answer,step.explanation,step.audioText,...(step.options??[]),...(step.tokens??[])].filter(Boolean).join('\n');
        assert.ok(!blob.includes(word.text),word.text+' is assessed before '+word.lessonId+' in '+step.id);
      }
    }
  }
});

test('Unit 36 assessments do not use a new character before its intro step',()=>{
  const known=new Set(course.modules.filter(m=>m.bookId==='book-1'&&m.order<u36.order).flatMap(m=>m.newCharacters));
  const nonAssessmentTypes=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const lesson of u36.lessons){
    for(const step of lesson.steps){
      if(step.type==='intro'&&step.char)known.add(step.char);
      if(nonAssessmentTypes.has(step.type))continue;
      const values=[step.prompt,step.answer,step.explanation,step.audioText,...(step.options??[]),...(step.tokens??[])];
      if(step.phrase&&u36.phrases[step.phrase]){
        const p=u36.phrases[step.phrase];
        values.push(p.text,...(p.tokens??[]));
      }
      for(const value of values.filter(Boolean))
        for(const ch of han(value))
          assert.ok(known.has(ch),step.id+' assesses '+ch+' before its character introduction');
    }
  }
});
