import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {compactPinyin,searchVocabulary,vocabularyLookup} from '../lib/vocabulary-lookup.ts';
import {eligibleMegaVocabulary} from '../lib/mega-challenge.ts';

const course=await loadCourse();
const u37=course.modules.find(m=>m.unit.id==='unit-37');

function runtimeBlob(module){
  const values=[];
  const visit=value=>{
    if(typeof value==='string')values.push(value);
    else if(Array.isArray(value))value.forEach(visit);
    else if(value&&typeof value==='object')Object.values(value).forEach(visit);
  };
  visit(module);
  return values.join('\n');
}
function reviewBlob(module){
  const review=module.lessons.find(l=>l.id===module.reviewLessonId);
  const values=[];
  for(const step of review.steps){
    // Count only fields that make the item an actual target. Distractors and
    // explanations must not satisfy review retrieval by themselves.
    for(const key of ['prompt','answer','audioText'])if(typeof step[key]==='string')values.push(step[key]);
    if(step.type==='order'&&step.phrase&&module.phrases[step.phrase])values.push(module.phrases[step.phrase].text);
  }
  return values.join('\n');
}
const normalize=text=>String(text||'').replace(/[，。！？；、：,.!?;:\s]/g,'');

test('Unit 37 matches the frozen Phase 2 topology and load',()=>{
  assert.equal(u37.newVocabulary.length,10);
  assert.deepEqual(u37.newCharacters,['忘','記','當','然']);
  assert.equal(u37.lessons.length,7);
  assert.equal(u37.reviewLessonId,'u37-review');
  assert.deepEqual(u37.unit.grammarIds,[]);
  assert.deepEqual(Object.keys(u37.grammarRules),[]);
  assert.deepEqual(u37.lessons.map(l=>l.id),[
    'u37-phone','u37-birthday','u37-return','u37-forget','u37-remember','u37-of-course','u37-review'
  ]);
  const review=u37.lessons.find(l=>l.id===u37.reviewLessonId);
  assert.equal(review.steps.length,19);
  assert.equal(review.steps.filter(s=>s.type==='listen').length,3);
});

test('Unit 37 exact first-taught forms are 7 ordinary items plus 3 source phrases',()=>{
  const expected=['我就是','好久不見','生日','快樂','生日快樂','回來','啊','忘','記得','當然'];
  assert.deepEqual(u37.newVocabulary.map(v=>v.text),expected);
  assert.ok(!u37.newVocabulary.some(v=>['怎麼','對不對','臺東','花蓮'].includes(v.text)));
});

test('Unit 37 retrieves every indexed first-taught form in review',()=>{
  const blob=reviewBlob(u37);
  for(const word of u37.newVocabulary.map(v=>v.text))
    assert.ok(blob.includes(word),'Unit 37 review never retrieves '+word);
});

test('Unit 37 preserves the learner-safe Dialogue I opening and blocks proper-name leakage',()=>{
  const blob=runtimeBlob(u37);
  for(const text of [
    '喂，是你嗎？','是，我就是。','好久不見！','我剛從臺東回來。','找我有什麼事？',
    '明天是你的生日，對不對？','啊，我怎麼忘了！','最近太忙了。','謝謝你還記得。','當然記得！'
  ]) assert.ok(blob.includes(text),'Unit 37 lost dialogue foundation: '+text);
  for(const glyph of ['怡','君','安','蓮','妳'])
    assert.ok(!blob.includes(glyph),'Unit 37 runtime leaks untaught proper-name/source glyph '+glyph);
});

test('Unit 37 explicitly handles 樂 as lè in 快樂 without reteaching the character',()=>{
  const happy=u37.newVocabulary.find(v=>v.text==='快樂');
  assert.equal(happy.pinyin,'kuàilè');
  assert.match(happy.note,/音樂 yīnyuè/);
  assert.ok(!u37.newCharacters.includes('樂'));
  const step=u37.lessons.find(l=>l.id==='u37-birthday').steps.find(s=>s.id==='u37-birthday-s3');
  assert.equal(step.answer,'lè');
});

test('Unit 37 teaches 怎麼 reaction sense but does not generalize completed-action 了',()=>{
  const forget=u37.phrases['u37-forget-source'];
  assert.equal(forget.text,'啊，我怎麼忘了！');
  assert.match(forget.note,/Unit 39 later teaches completed-action verbal 了/i);
  const step=u37.lessons.find(l=>l.id==='u37-forget').steps.find(s=>s.id==='u37-forget-s3');
  assert.equal(step.answer,'How could I…? / How come…?');
  assert.ok(!u37.newVocabulary.some(v=>v.text==='了'));
});

test('Unit 37 phrase tokens reconstruct displayed Traditional Chinese',()=>{
  for(const [id,p] of Object.entries(u37.phrases))
    assert.equal(normalize(p.tokens.join('')),normalize(p.text),id+' tokens do not reconstruct the phrase');
});

test('Unit 37 handwriting metadata covers every stroke exactly once',()=>{
  for(const ch of u37.newCharacters){
    const c=u37.characters[ch];
    assert.ok(c,'missing character record: '+ch);
    const covered=c.parts.flatMap(p=>p.strokes).sort((a,b)=>a-b);
    assert.deepEqual(covered,Array.from({length:c.strokes},(_,i)=>i),ch+': component stroke coverage');
    assert.ok(c.note&&c.memory);
    for(const p of c.parts)assert.ok(p.description);
  }
});

test('Unit 37 choice activities are unambiguous and listening answers are audible',()=>{
  for(const lesson of u37.lessons)for(const step of lesson.steps){
    if(!['select','listen','parts'].includes(step.type))continue;
    assert.ok(Array.isArray(step.options)&&step.options.length>=2,step.id+' has too few options');
    assert.equal(new Set(step.options).size,step.options.length,step.id+' has duplicate options');
    assert.equal(step.options.filter(o=>o===step.answer).length,1,step.id+' answer is not keyed exactly once');
    if(step.type==='listen'&&step.audioText){
      assert.ok(step.audioText.includes(step.answer),step.id+' audio omits its answer');
      assert.equal(step.options.filter(o=>step.audioText.includes(o)).length,1,step.id+' audio contains multiple answer options');
    }
  }
});

test('Unit 37 does not assess a formal NEW word before its declared lesson',()=>{
  const lessonIndex=new Map(u37.lessons.map((l,i)=>[l.id,i]));
  const nonAssessment=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const word of u37.newVocabulary){
    const declared=lessonIndex.get(word.lessonId);
    assert.notEqual(declared,undefined);
    for(let i=0;i<declared;i++)for(const step of u37.lessons[i].steps){
      if(nonAssessment.has(step.type))continue;
      const blob=[step.prompt,step.answer,step.explanation,step.audioText,...(step.options??[]),...(step.tokens??[])].filter(Boolean).join('\n');
      assert.ok(!blob.includes(word.text),word.text+' assessed before '+word.lessonId+' in '+step.id);
    }
  }
});

test('Unit 37 assessments do not expose a future new character before its intro',()=>{
  const known=new Set(course.modules.filter(m=>m.bookId==='book-1'&&m.order<u37.order).flatMap(m=>m.newCharacters));
  const nonAssessment=new Set(['intro','trace','build','complete','memory','grammar','parts']);
  for(const lesson of u37.lessons)for(const step of lesson.steps){
    if(step.type==='intro'&&step.char)known.add(step.char);
    if(nonAssessment.has(step.type))continue;
    const values=[step.prompt,step.answer,step.explanation,step.audioText,...(step.options??[]),...(step.tokens??[])];
    if(step.phrase&&u37.phrases[step.phrase]){
      const p=u37.phrases[step.phrase];
      values.push(p.text,p.note,...(p.tokens??[]));
    }
    for(const value of values.filter(Boolean))for(const ch of han(value))
      assert.ok(known.has(ch),step.id+' exposes '+ch+' before its character introduction');
  }
});

test('Unit 37 Pinyin Search resolves every new vocabulary/expression canonically',()=>{
  for(const word of u37.newVocabulary){
    const query=compactPinyin(word.pinyin);
    const hit=searchVocabulary(query,1000).find(item=>item.traditional===word.text&&item.lessonId===word.lessonId);
    assert.ok(hit,'Pinyin Search misses '+word.text+' via '+query);
    assert.equal(hit.pinyin,word.pinyin);
    assert.equal(hit.meaning,word.meaning);
  }
});

test('Unit 37 vocabulary becomes Mega Challenge eligible after teaching lessons complete',()=>{
  const completed=new Set(u37.newVocabulary.map(v=>v.lessonId));
  const eligible=new Set(eligibleMegaVocabulary(completed,new Set()).map(v=>v.id));
  for(const word of u37.newVocabulary){
    const item=vocabularyLookup.find(v=>v.traditional===word.text&&v.lessonId===word.lessonId);
    assert.ok(item,'canonical lookup missing '+word.text);
    assert.ok(eligible.has(item.id),'Mega Challenge misses '+word.text);
  }
});


test('Unit 37 learner activities do not expose curriculum-planning meta',()=>{
  const text=u37.lessons.flatMap(l=>l.steps).flatMap(s=>[
    s.prompt,s.answer,s.explanation,...(s.options??[])
  ]).filter(Boolean).join('\n');
  assert.doesNotMatch(text,/\bUnit\s+\d+\b|formal grammar here|new Hanzi target|which unit|curriculum/i);
});
