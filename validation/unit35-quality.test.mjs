import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';

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
  assert.equal(review.steps.length,24);
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
  assert.match(g.explanation,/not the object/i);
  assert.match(g.explanation,/不 before 是/i);
  assert.match(g.explanation,/omitted/i);
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
