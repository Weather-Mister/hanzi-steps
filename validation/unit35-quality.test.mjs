import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';

const course=await loadCourse();
const u35=course.modules.find(m=>m.unit.id==='unit-35');

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

test('Unit 35 keeps coherent novelty and full lesson/review structure',()=>{
  assert.equal(u35.newVocabulary.length,9);
  assert.equal(u35.newCharacters.length,9);
  assert.equal(u35.lessons.length,7);
  const review=u35.lessons.find(l=>l.id===u35.reviewLessonId);
  assert.equal(review.steps.length,27);
  assert.ok(review.steps.filter(s=>s.type==='listen').length>=3);
  assert.ok(review.steps.filter(s=>s.type==='memory'||s.type==='parts').length>=2);
});

test('Unit 35 retrieves every formal NEW vocabulary item in review',()=>{
  const blob=reviewBlob(u35);
  for(const word of u35.newVocabulary.map(v=>v.text))
    assert.ok(blob.includes(word),'Unit 35 review never retrieves '+word);
});

test('Unit 35 preserves the complete Dialogue I tail',()=>{
  assert.equal(u35.phrases['u35-tuition'].text,'我的學費是公司替我付的。');
  assert.equal(u35.phrases['u35-duration-question'].text,'你打算學多久呢？');
  assert.equal(u35.phrases['u35-decision'].text,'大概兩年，是公司決定的。');
  assert.equal(u35.phrases['u35-future'].text,'希望我以後也可以到這麼好的公司上班。');
  assert.equal(u35.phrases['u35-workstudy'].text,'我又要上班，又要念書，真的很累。');
  assert.equal(u35.phrases['u35-cheer'].text,'我們一起加油吧！');
});

test('Unit 35 teaches source 是…的 restrictions, not only the surface frame',()=>{
  const g=u35.grammarRules['u35-shi-de'];
  assert.match(g.explanation,/past event/i);
  assert.match(g.explanation,/subject, time, place, manner/i);
  assert.match(g.explanation,/(?:not|never) the object/i);
  assert.match(g.explanation,/不 before 是/i);
  assert.match(g.explanation,/omitted/i);
  assert.match(g.explanation,/yes\/no questions with 嗎/i);
  assert.match(g.explanation,/who, when, how, or where/i);
  const intro=u35.grammarIntroductions.find(x=>x.ref==='u35-shi-de');
  assert.equal(intro.lessonId,'u35-tuition');
  assert.equal(intro.stepId,'u35-tuition-g1');
  const review=u35.lessons.find(l=>l.id===u35.reviewLessonId);
  assert.ok(review.steps.filter(s=>s.grammarIds?.includes('u35-shi-de')&&!['phrase','grammar'].includes(s.type)).length>=5);
});

test('Unit 35 keeps standalone 以後 separate from deferred Event + 以後 grammar',()=>{
  const item=u35.newVocabulary.find(v=>v.text==='以後');
  assert.equal(item.meaning,'in the future');
  assert.match(item.note,/Event \+ 以後.*deferred/i);
  assert.ok(!u35.grammarRules['u35-yihou']);
  assert.match(u35.phrases['u35-future'].note,/stands alone/i);
});

test('Unit 35 retrieves older 又…又… instead of redeclaring it',()=>{
  assert.ok(u35.reviewGrammar.includes('u24-you-you'));
  assert.ok(!u35.grammarRules['u24-you-you']);
  assert.ok(u35.phrases['u35-workstudy'].grammarIds.includes('u24-you-you'));
});

test('Unit 35 handwriting metadata covers each new character exactly once',()=>{
  for(const ch of u35.newCharacters){
    const c=u35.characters[ch];
    assert.ok(c,'missing character record: '+ch);
    const covered=c.parts.flatMap(p=>p.strokes).sort((a,b)=>a-b);
    assert.deepEqual(covered,Array.from({length:c.strokes},(_,i)=>i),ch+': component stroke coverage');
  }
});

test('Unit 35 contextual listening has exactly one audible answer option',()=>{
  const review=u35.lessons.find(l=>l.id===u35.reviewLessonId);
  for(const step of review.steps.filter(s=>s.type==='listen')){
    assert.ok(step.audioText.includes(step.answer),step.id+' audio omits answer');
    assert.equal(step.options.filter(o=>step.audioText.includes(o)).length,1,step.id+' audio contains multiple answer options');
  }
});


test('Unit 35 now represents the source yes-no, omission, and wh-question subpatterns explicitly',()=>{
  assert.equal(u35.phrases['u35-focus-yesno'].text,'你的房租是自己付的嗎？');
  assert.equal(u35.phrases['u35-focus-omitted'].text,'我跟朋友一起來的。');
  assert.equal(u35.phrases['u35-focus-who'].text,'是誰打電話給你的？');
  assert.equal(u35.phrases['u35-focus-how'].text,'你是怎麼去的？');
  assert.equal(u35.phrases['u35-focus-where'].text,'你是在哪裡吃飯的？');
  const focus=u35.lessons.find(l=>l.id==='u35-focus');
  for(const id of ['u35-focus-p5','u35-focus-p6','u35-focus-p7','u35-focus-p8','u35-focus-p9'])
    assert.ok(focus.steps.some(s=>s.id===id),id+' is not taught');
  const review=u35.lessons.find(l=>l.id===u35.reviewLessonId);
  for(const id of ['u35-review-g6','u35-review-g7','u35-review-g8'])
    assert.ok(review.steps.some(s=>s.id===id&&s.grammarIds?.includes('u35-shi-de')),id+' missing review retrieval');
});

test('Unit 35 does not add an unsupported condition to optional 是',()=>{
  const item=u35.lessons.find(l=>l.id==='u35-cheer').steps.find(s=>s.id==='u35-cheer-s4');
  assert.equal(item.answer,'yes, 是 can sometimes be omitted');
  assert.doesNotMatch(item.answer,/recoverable/i);
  assert.doesNotMatch(item.explanation,/recoverable/i);
});

test('Unit 35 keeps textbook dialogue translations source-safe',()=>{
  assert.equal(u35.phrases['u35-decision'].meaning,'Probably two years. My company will decide.');
  assert.equal(u35.grammarRules['u35-shi-de'].examples[0].meaning,'My tuition is paid by my company for me.');
});

test('Unit 35 替 and 班 decomposition matches the audited Taiwan forms',()=>{
  assert.deepEqual(u35.characters['替'].parts.map(p=>p.label),['㚘','曰']);
  assert.deepEqual(u35.characters['替'].parts[0].strokes,[0,1,2,3,4,5,6,7]);
  assert.deepEqual(u35.characters['替'].parts[1].strokes,[8,9,10,11]);
  assert.deepEqual(u35.characters['班'].parts.map(p=>p.label),['王','丶丿','王']);
  assert.deepEqual(u35.characters['班'].parts[0].strokes,[0,1,2,3]);
  assert.deepEqual(u35.characters['班'].parts[1].strokes,[4,5]);
  assert.deepEqual(u35.characters['班'].parts[2].strokes,[6,7,8,9]);
});

test('Unit 35 does not assess a formal NEW word before its declared lesson',()=>{
  const lessonIndex=new Map(u35.lessons.map((l,i)=>[l.id,i]));
  const nonAssessmentTypes=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const word of u35.newVocabulary){
    const declared=lessonIndex.get(word.lessonId);
    assert.notEqual(declared,undefined,'unknown declared lesson for '+word.text);
    for(let i=0;i<declared;i++){
      for(const step of u35.lessons[i].steps){
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

test('Unit 35 assessments do not use a new character before its intro step',()=>{
  const known=new Set(
    course.modules
      .filter(m=>m.bookId==='book-1'&&m.order<u35.order)
      .flatMap(m=>m.newCharacters)
  );
  const nonAssessmentTypes=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const lesson of u35.lessons){
    for(const step of lesson.steps){
      if(step.type==='intro'&&step.char)known.add(step.char);
      if(nonAssessmentTypes.has(step.type))continue;
      const values=[
        step.prompt,step.answer,step.explanation,step.audioText,
        ...(step.options??[]),...(step.tokens??[])
      ];
      if(step.phrase&&u35.phrases[step.phrase]){
        const p=u35.phrases[step.phrase];
        values.push(p.text,...(p.tokens??[]));
      }
      for(const value of values.filter(Boolean))
        for(const ch of han(value))
          assert.ok(known.has(ch),step.id+' assesses '+ch+' before its character introduction');
    }
  }
});


test('Unit 35 yes-no distractors do not use alternative grammatical question patterns',()=>{
  const focus=u35.lessons.find(l=>l.id==='u35-focus').steps.find(s=>s.id==='u35-focus-s4');
  const review=u35.lessons.find(l=>l.id===u35.reviewLessonId).steps.find(s=>s.id==='u35-review-g6');
  assert.deepEqual(focus.options,['你的房租是自己付的嗎？','你的房租是自己嗎付的？']);
  assert.deepEqual(review.options,['你的房租是自己付的嗎？','你的房租是嗎自己付的？']);
  assert.ok(!focus.options.some(option=>option.includes('是不是')));
  assert.ok(!review.options.some(option=>option.includes('是不是')));
});
