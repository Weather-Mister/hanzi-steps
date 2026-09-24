import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {compactPinyin,searchVocabulary,vocabularyLookup} from '../lib/vocabulary-lookup.ts';
import {eligibleMegaVocabulary} from '../lib/mega-challenge.ts';

const course=await loadCourse();
const byId=id=>course.modules.find(m=>m.unit.id===id);
const units=[38,39,40,41].map(n=>byId('unit-'+n));
const [u38,u39,u40,u41]=units;
const normalize=text=>String(text||'').replace(/[，。！？；、：,.!?;:\s]/g,'');

test('Units 38–41 match the frozen Lesson 13 topology and load',()=>{
  const expectations={
    38:{v:10,c:7,r:20,l:3,g:['u38-yi-jiu']},
    39:{v:8,c:6,r:21,l:3,g:['u39-verbal-le','u39-bu-vs-mei']},
    40:{v:3,c:4,r:20,l:3,g:['u40-questionword-totality','u40-more-less-verb']},
    41:{v:4,c:3,r:22,l:3,g:['u41-shibushi','u41-gen-yiyang']}
  };
  for(const u of units){
    const n=u.order,e=expectations[n],review=u.lessons.find(l=>l.id===u.reviewLessonId);
    assert.equal(u.lessons.length,7,'Unit '+n+' lesson count');
    assert.equal(u.newVocabulary.length,e.v,'Unit '+n+' vocabulary count');
    assert.equal(u.newCharacters.length,e.c,'Unit '+n+' character count');
    assert.equal(review.steps.length,e.r,'Unit '+n+' review count');
    assert.equal(review.steps.filter(s=>s.type==='listen').length,e.l,'Unit '+n+' listening count');
    assert.deepEqual(u.unit.grammarIds,e.g,'Unit '+n+' grammar IDs');
  }
});

test('Lesson 13 Units 38–41 own the exact planned vocabulary/expression forms',()=>{
  assert.deepEqual(u38.newVocabulary.map(v=>v.text),['語言','交換','熱心','西班牙文','一樣','不必客氣','太客氣','過','左右','門口']);
  assert.deepEqual(u39.newVocabulary.map(v=>v.text),['禮物','哪裡哪裡','今年','訂','豬腳','麵線','蛋','一點']);
  assert.deepEqual(u40.newVocabulary.map(v=>v.text),['傳統','大部分','年輕']);
  assert.deepEqual(u41.newVocabulary.map(v=>v.text),['蛋糕','祝','萬事如意','心想事成']);
  assert.equal(new Set(units.flatMap(u=>u.newVocabulary.map(v=>v.text))).size,25);
});

test('Units 38–41 assign the remaining 20 Lesson 13 characters exactly once',()=>{
  assert.deepEqual(u38.newCharacters,['交','換','牙','必','氣','門','口']);
  assert.deepEqual(u39.newCharacters,['禮','物','訂','豬','腳','蛋']);
  assert.deepEqual(u40.newCharacters,['傳','統','輕','部']);
  assert.deepEqual(u41.newCharacters,['糕','祝','如']);
  const all=units.flatMap(u=>u.newCharacters);
  assert.equal(all.length,20);
  assert.equal(new Set(all).size,20);
});

test('Every Unit 38–41 new vocabulary/expression is independently targeted in its review',()=>{
  for(const u of units){
    const review=u.lessons.find(l=>l.id===u.reviewLessonId);
    const targetText=[];
    for(const step of review.steps){
      for(const key of ['prompt','answer','audioText'])if(typeof step[key]==='string')targetText.push(step[key]);
      if(step.type==='order'&&step.phrase&&u.phrases[step.phrase])targetText.push(u.phrases[step.phrase].text);
    }
    const blob=targetText.join('\n');
    for(const word of u.newVocabulary)
      assert.ok(blob.includes(word.text),u.unit.id+' review never independently targets '+word.text);
  }
});

test('Phrase tokens reconstruct their displayed Traditional Chinese',()=>{
  for(const u of units) for(const [id,p] of Object.entries(u.phrases))
    assert.equal(normalize(p.tokens.join('')),normalize(p.text),u.unit.id+' '+id+' token mismatch');
});

test('Choice activities are unambiguous and listening answers are audible',()=>{
  for(const u of units) for(const lesson of u.lessons) for(const step of lesson.steps){
    if(!['select','listen','parts'].includes(step.type)) continue;
    assert.ok(Array.isArray(step.options)&&step.options.length>=2,step.id+' has too few options');
    assert.equal(new Set(step.options).size,step.options.length,step.id+' has duplicate options');
    assert.equal(step.options.filter(o=>o===step.answer).length,1,step.id+' answer is not keyed exactly once');
    if(step.type==='listen'&&step.audioText){
      assert.ok(step.audioText.includes(step.answer),step.id+' audio omits its answer');
      assert.equal(step.options.filter(o=>step.audioText.includes(o)).length,1,step.id+' audio contains multiple answer options');
    }
  }
});

test('No formal NEW word is assessed before its declared lesson',()=>{
  const nonAssessment=new Set(['intro','trace','build','complete','memory','phrase','grammar','parts']);
  for(const u of units){
    const lessonIndex=new Map(u.lessons.map((l,i)=>[l.id,i]));
    for(const word of u.newVocabulary){
      const declared=lessonIndex.get(word.lessonId);
      assert.notEqual(declared,undefined);
      for(let i=0;i<declared;i++) for(const step of u.lessons[i].steps){
        if(nonAssessment.has(step.type)) continue;
        const blob=[step.prompt,step.answer,step.explanation,step.audioText,...(step.options??[]),...(step.tokens??[])].filter(Boolean).join('\n');
        assert.ok(!blob.includes(word.text),u.unit.id+': '+word.text+' assessed before '+word.lessonId+' in '+step.id);
      }
    }
  }
});

test('Assessments do not expose a future new character before its intro',()=>{
  const known=new Set(course.modules.filter(m=>m.bookId==='book-1'&&m.order<38).flatMap(m=>m.newCharacters));
  const nonAssessment=new Set(['intro','trace','build','complete','memory','grammar','parts']);
  for(const u of units){
    for(const lesson of u.lessons) for(const step of lesson.steps){
      if(step.type==='intro'&&step.char) known.add(step.char);
      if(nonAssessment.has(step.type)) continue;
      const values=[step.prompt,step.answer,step.explanation,step.audioText,...(step.options??[]),...(step.tokens??[])];
      if(step.phrase&&u.phrases[step.phrase]){
        const p=u.phrases[step.phrase];
        values.push(p.text,p.note,...(p.tokens??[]));
      }
      for(const value of values.filter(Boolean)) for(const ch of han(value))
        assert.ok(known.has(ch),u.unit.id+' '+step.id+' exposes '+ch+' before its character introduction');
    }
  }
});

test('All new Lesson 13 forms resolve through Pinyin Search and Mega Challenge',()=>{
  const completed=new Set(units.flatMap(u=>u.newVocabulary.map(v=>v.lessonId)));
  const eligible=new Set(eligibleMegaVocabulary(completed,new Set()).map(v=>v.id));
  for(const u of units) for(const word of u.newVocabulary){
    const query=compactPinyin(word.pinyin);
    const hit=searchVocabulary(query,2000).find(item=>item.traditional===word.text&&item.lessonId===word.lessonId);
    assert.ok(hit,'Pinyin Search misses '+word.text+' via '+query);
    const item=vocabularyLookup.find(v=>v.traditional===word.text&&v.lessonId===word.lessonId);
    assert.ok(item,'canonical lookup missing '+word.text);
    assert.ok(eligible.has(item.id),'Mega Challenge misses '+word.text);
  }
});

test('Grammar I through VII remain assigned to the planned units',()=>{
  assert.match(u38.grammarRules['u38-yi-jiu'].explanation,/Either event can be affirmative or negative/);
  assert.match(u38.grammarRules['u38-yi-jiu'].explanation,/嗎 or 是不是/);
  assert.match(u39.grammarRules['u39-verbal-le'].explanation,/remove verbal 了/);
  assert.match(u39.grammarRules['u39-bu-vs-mei'].explanation,/bare 沒 \+ V is still grammatical/);
  assert.match(u40.grammarRules['u40-questionword-totality'].explanation,/Both 都 and 也 are source-valid/);
  assert.match(u40.grammarRules['u40-more-less-verb'].explanation,/past or future/);
  assert.match(u41.grammarRules['u41-shibushi'].explanation,/confirm information/);
  assert.match(u41.grammarRules['u41-gen-yiyang'].explanation,/一樣不一樣 or 是不是一樣/);
});

test('Unit 40 preserves the 了 scope contrast and actually teaches the source culture reading',()=>{
  assert.equal(u40.phrases['u40-young-source'].text,'現在大部分年輕人過生日不吃這些東西了。');
  const customs=JSON.stringify(u40.lessons.find(l=>l.id==='u40-customs'));
  for(const phrase of ['lunar calendar','Gregorian calendar','one month and one year','60, 70, and 80','future character or profession'])
    assert.ok(customs.includes(phrase),'Unit 40 culture lesson misses '+phrase);
  assert.ok(customs.includes("zhuāzhōu"),'Unit 40 should identify the first-birthday custom in romanization');
  assert.ok(!customs.includes('抓週'),'Unit 40 leaks culture-only Hanzi 抓週');
});

test('Unit 41 capstone covers all four Lesson 13 objectives',()=>{
  const cap=JSON.stringify(u41.lessons.find(l=>l.id==='u41-capstone'));
  assert.ok(cap.includes('Phone appointment'));
  assert.ok(cap.includes('Dietary preferences'));
  assert.ok(cap.includes('我們跟你們一樣吃蛋糕。'));
  assert.ok(cap.includes('birthday wishes'));
});

test('Book 2 ownership migrations preserve topology while moving first ownership to Unit 38',()=>{
  const b2u1=byId('book-2-unit-1');
  const b2u3=byId('book-2-unit-3');
  assert.ok(!b2u1.newCharacters.includes('口'));
  assert.ok(b2u1.reviewCharacters.includes('口'));
  assert.equal(b2u1.characters['口'],undefined);
  const intersection=b2u1.lessons.find(l=>l.id==='b2-intersection');
  for(const id of ['b2-char-口-0','b2-char-口-1','b2-char-口-2','b2-char-口-3','b2-char-口-4'])
    assert.ok(intersection.steps.some(s=>s.id===id),'B2U1 lost saved-progress step '+id);

  assert.ok(!b2u3.newVocabulary.some(v=>v.text==='過'));
  assert.ok(b2u3.reviewVocabulary.includes('過'));
  const pass=b2u3.lessons.find(l=>l.id==='b2u3-pass');
  for(let i=1;i<=14;i++){
    const id='b2u3-pass-'+String(i).padStart(2,'0');
    assert.ok(pass.steps.some(s=>s.id===id),'B2U3 lost saved-progress step '+id);
  }
});

test('Source-specific ambiguity guards remain explicit',()=>{
  assert.match(u38.grammarRules['u38-yi-jiu'].explanation,/Both question strategies are source-valid/);
  assert.match(u39.grammarRules['u39-bu-vs-mei'].explanation,/bare 沒 \+ V is still grammatical/);
  assert.match(u40.grammarRules['u40-questionword-totality'].explanation,/Both 都 and 也 are source-valid/);
  assert.match(u41.grammarRules['u41-gen-yiyang'].explanation,/both are source-valid/);
});


test('Unit 39 review tests completed-action listening and directly retrieves the formerly distractor-only forms',()=>{
  const review=u39.lessons.find(l=>l.id==='u39-review');
  const listening=review.steps.find(s=>s.id==='u39-review-l3');
  assert.equal(listening.type,'listen');
  assert.equal(listening.audioText,'我今天沒吃蛋。');
  assert.equal(listening.answer,'沒吃蛋');
  assert.deepEqual(listening.grammarIds,['u39-verbal-le','u39-bu-vs-mei']);
  assert.equal(review.steps.find(s=>s.id==='u39-review-v4').answer,'pork knuckles');
  assert.equal(review.steps.find(s=>s.id==='u39-review-t1').answer,'a little; some amount');
});

test('Unit 41 keeps comparison scope semantically neutral in English',()=>{
  assert.equal(
    u41.phrases['u41-not-target'].meaning,
    "He isn't the same height as me; he's the same height as you."
  );
});

test('Lesson 13 learner activities do not expose curriculum-planning meta',()=>{
  const learnerText=units.flatMap(u=>u.lessons).flatMap(l=>l.steps).flatMap(s=>[
    s.prompt,s.answer,s.explanation,...(s.options??[])
  ]).filter(Boolean).join('\n');
  assert.doesNotMatch(learnerText,/\bUnit\s+\d+\b|formal grammar here|new Hanzi target|which unit|curriculum/i);
});
