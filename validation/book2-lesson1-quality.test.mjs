import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';

const course=await loadCourse();
const book1=course.modules.filter(m=>m.bookId==='book-1');
const book2=course.modules.filter(m=>m.bookId==='book-2');
const chars=text=>[...text].filter(c=>/\p{Script=Han}/u.test(c));

test('Book 2 Lesson 1 covers both source texts and all five grammar patterns',()=>{
 assert.equal(book2.length,4);
 assert.deepEqual(book2.map(m=>m.newVocabulary.length),[10,12,8,11]);
 for(const module of book2){
  assert.equal(module.lessons.length,7);
  assert.equal(module.lessons.at(-1).id,module.reviewLessonId);
  assert.ok(module.lessons.at(-1).steps.length>=18);
  assert.ok(module.lessons.at(-1).steps.filter(s=>s.type==='listen'&&s.semanticAnswer).length>=3);
 }
 const owned=new Set(book2.flatMap(m=>m.newVocabulary.map(w=>w.text)));
 for(const word of '走 路人 幫忙 迷路 下 路口 段 第 紅綠燈 告訴 提款機 超商 郵局 提 那邊 師大 和平東路 往前 右轉 聽起來 看見 下載 地圖 好用 著 日用品 經過 巷子 餓 一邊 發現 離 背包 正好 最後 枝 筆 本子 左轉 師大路上 麵店'.split(' '))assert.ok(owned.has(word),`missing source item ${word}`);
 const prior=new Set(book1.flatMap(m=>m.newVocabulary.map(w=>w.text)));
 for(const word of ['過','本','往','應該','附近','便利商店','一直']){
  assert.ok(prior.has(word),`Book 1 must own ${word}`);
  assert.ok(!owned.has(word),`Book 2 duplicated ${word}`);
 }
 assert.deepEqual(book2.map(m=>Object.keys(m.grammarRules).length),[1,1,1,2]);
 assert.ok(book2[1].reviewVocabulary.includes('過'));
 assert.match(book2[1].phrases['b2u2-l3-guo-cross'].note,/crossing or passing|crossing or passing|physically crossing/);
 assert.equal(book2[3].revisionStepIds.length,5,'last review must retrieve earlier directions, services and ongoing action');
 assert.deepEqual(book2[3].reviewGrammar,[
  'b2u1-l4-from-toward','b2u2-l4-evaluative','b2u3-l3-ongoing'
 ]);
});

test('Strict prerequisite learner sees characters and rules before assessed use',()=>{
 const known=new Set(book1.flatMap(m=>m.newCharacters));
 const taughtRules=new Set(book1.flatMap(m=>Object.keys(m.grammarRules)));
 for(const module of book2){
  const owned=new Set(module.newVocabulary.map(w=>w.text));
  const taughtWords=new Set();
  for(const lesson of module.lessons){
   for(const step of lesson.steps){
    if(step.type==='phrase'){
     const phrase=module.phrases[step.phrase];
     if(owned.has(phrase.text)){
      taughtWords.add(phrase.text);
      assert.equal(phrase.practice,false,`${phrase.text} is a teaching card, not a one-token mixed-practice item`);
     }
    }
    if(step.type==='intro')known.add(step.char);
    if(step.type==='grammar')taughtRules.add(step.grammar);
    if(['select','listen','order'].includes(step.type)){
     const payload=[step.prompt,...(step.options||[]),step.audioText,step.type==='order'?module.phrases[step.phrase]?.text:''].filter(Boolean).join(' ');
     for(const character of chars(payload))assert.ok(known.has(character),`${step.id}: unintroduced character ${character}`);
     for(const word of owned)if(payload.includes(word)&&!taughtWords.has(word)){
      // 提 appears inside the taught compound 提款機 before the independent verb card.
      assert.ok(word==='提'&&taughtWords.has('提款機'),`${step.id}: assessed before ${word} was explained`);
     }
    }
   }
  }
  assert.deepEqual([...taughtWords].sort(),[...owned].sort());
  for(const id of Object.keys(module.grammarRules))assert.ok(taughtRules.has(id));
 }
});

test('Source distinctions and full-utterance listening are preserved',()=>{
 const all=book2.flatMap(m=>m.lessons.flatMap(l=>l.steps));
 const find=id=>all.find(s=>s.id===id);
 assert.equal(find('b2u2-l3-guo-cross-check').answer,'pass or cross');
 assert.equal(find('b2u4-l3-g-distance-check').answer,'The post office is close to the school.');
 assert.equal(find('b2u4-l5-application').answer,'兩枝筆');
 for(const module of book2){
  for(const step of module.lessons.at(-1).steps.filter(s=>s.semanticAnswer)){
   assert.ok(step.audioText.length>5);
   assert.ok(step.options.includes(step.answer));
   assert.ok(!step.audioText.includes(step.answer),'listening is meaning-based, not an answer substring');
  }
 }
});
