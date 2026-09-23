import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {compactPinyin,searchVocabulary,vocabularyLookup} from '../lib/vocabulary-lookup.ts';
import {eligibleMegaVocabulary} from '../lib/mega-challenge.ts';

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


test('Unit 36 deep audit retrieves both Grammar IV branches with source examples',()=>{
  const job=u36.lessons.find(l=>l.id==='u36-job');
  const hard=u36.lessons.find(l=>l.id==='u36-hard');
  const review=u36.lessons.find(l=>l.id===u36.reviewLessonId);
  const blob=[...job.steps,...hard.steps,...review.steps].flatMap(step=>[step.prompt,step.answer,step.explanation,...(step.options??[])]).filter(Boolean).join('\n');
  assert.match(blob,/日本菜好吃也好看/);
  assert.match(blob,/便宜的咖啡不好喝/);
  assert.match(blob,/學校餐廳的菜不難吃/);
  assert.match(blob,/你覺得那個電影好看不好看/);
  assert.match(blob,/老師今天教的甜點難不難學/);
  assert.match(blob,/好喝 \/ 難喝/);
});


test('Unit 36 pinyin search resolves every new vocabulary entry to its canonical item',()=>{
  for(const word of u36.newVocabulary){
    const query=compactPinyin(word.pinyin);
    const hit=searchVocabulary(query,1000).find(item=>item.traditional===word.text&&item.lessonId===word.lessonId);
    assert.ok(hit,'Pinyin search misses '+word.text+' via '+query);
    assert.equal(hit.pinyin,word.pinyin);
    assert.equal(hit.meaning,word.meaning);
  }
});

test('Unit 36 vocabulary becomes Mega Challenge eligible after its teaching lessons are complete',()=>{
  const completed=new Set(u36.newVocabulary.map(word=>word.lessonId));
  const eligible=eligibleMegaVocabulary(completed,new Set());
  const ids=new Set(eligible.map(item=>item.id));
  for(const word of u36.newVocabulary){
    const item=vocabularyLookup.find(v=>v.traditional===word.text&&v.lessonId===word.lessonId);
    assert.ok(item,'canonical lookup missing '+word.text);
    assert.ok(ids.has(item.id),'Mega Challenge eligibility misses '+word.text);
  }
});

test('Unit 36 grammar review keeps perception and action A-not-A forms distinct',()=>{
  const hard=u36.lessons.find(l=>l.id==='u36-hard');
  const review=u36.lessons.find(l=>l.id===u36.reviewLessonId);
  const perception=hard.steps.find(s=>s.id==='u36-hard-s4');
  const action=review.steps.find(s=>s.id==='u36-review-g7');
  assert.equal(perception.answer,'你覺得那個電影好看不好看？');
  assert.match(perception.explanation,/whole compound/i);
  assert.equal(action.answer,'老師今天教的甜點難不難學？');
  assert.match(action.explanation,/難不難 \+ action verb/);
});

test('Unit 36 review covers time-anchor 以後 and degree modification, not only event anchors and bare predicates',()=>{
  const review=u36.lessons.find(l=>l.id===u36.reviewLessonId);
  const time=review.steps.find(s=>s.id==='u36-review-g2');
  const degree=review.steps.find(s=>s.id==='u36-review-g4');
  assert.equal(time.answer,'half a year later');
  assert.match(time.prompt,/半年以後/);
  assert.equal(degree.answer,'我媽媽做的菜很好吃。');
  assert.match(degree.explanation,/degree adverbs/i);
});


test('Unit 36 learner-facing runtime content does not leak the omitted textbook glyphs 田 or 妳',()=>{
  const values=[];
  const visit=value=>{
    if(typeof value==='string')values.push(value);
    else if(Array.isArray(value))value.forEach(visit);
    else if(value&&typeof value==='object')Object.values(value).forEach(visit);
  };
  visit(u36);
  const blob=values.join('\n');
  assert.ok(!blob.includes('田'),'Unit 36 runtime content leaks untaught proper-name glyph 田');
  assert.ok(!blob.includes('妳'),'Unit 36 runtime content leaks untaught orthographic variant 妳');
});

test('Unit 36 source dialogue pinyin keeps 臺灣 人 as separate words',()=>{
  assert.equal(u36.phrases['u36-business'].pinyin,'Yīnwèi wǒmen gōngsī gēn Táiwān rén zuò shēngyì.');
});


test('Unit 36 explains both 工作 source senses before testing them',()=>{
  const note=u36.phrases['u36-work-question'].note;
  assert.match(note,/verb 'to work'/i);
  assert.match(note,/noun 'job, work'/i);
  const lesson=u36.lessons.find(l=>l.id==='u36-work');
  assert.ok(lesson.steps.findIndex(s=>s.id==='u36-work-p1')<lesson.steps.findIndex(s=>s.id==='u36-work-s3'));
});
