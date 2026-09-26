import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';

const course=await loadCourse();
const u30=course.modules.find(m=>m.unit.id==='unit-30');
const u31=course.modules.find(m=>m.unit.id==='unit-31');

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

test('Units 30-31 keep intended novelty, lesson count and review depth',()=>{
  assert.equal(u30.newVocabulary.length,11);
  assert.equal(u30.newCharacters.length,8);
  assert.equal(u31.newVocabulary.length,14);
  assert.equal(u31.newCharacters.length,12);
  for(const m of [u30,u31]){
    assert.equal(m.lessons.length,7);
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    assert.ok(review.steps.length>=18&&review.steps.length<=22,m.unit.id);
    assert.ok(review.steps.filter(s=>s.type==='listen').length>=3,m.unit.id);
    assert.ok(review.steps.some(s=>s.type==='memory'||s.type==='parts'),m.unit.id+' lacks handwriting/component retrieval');
  }
});

test('Every new vocabulary item is sampled in its unit review',()=>{
  for(const m of [u30,u31]){
    const blob=reviewBlob(m);
    for(const word of m.newVocabulary.map(v=>v.text))
      assert.ok(blob.includes(word),`${m.unit.id}: review never retrieves ${word}`);
  }
});

test('Every new grammar target is independently assessed in review',()=>{
  for(const m of [u30,u31]){
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    for(const id of m.unit.grammarIds){
      const related=review.steps.filter(s=>!['phrase','grammar'].includes(s.type)&&
        (s.grammarIds?.includes(id)||m.phrases[s.phrase]?.grammarIds?.includes(id)));
      assert.ok(related.length,`${m.unit.id}: review omits ${id}`);
    }
  }
});

test('Unit 30 explicitly teaches the Lesson 10 restrictions, not just forms',()=>{
  const vv=u30.grammarRules['u30-vv-kan'];
  assert.match(vv.explanation,/object/i);
  assert.match(vv.explanation,/generally does not/i);
  const redup=u30.grammarRules['u30-state-redup'];
  assert.match(redup.explanation,/Do not add 很/i);
  assert.match(redup.explanation,/not every state verb/i);
  const ba=u30.grammarRules['u30-ba-guess'];
  assert.match(ba.explanation,/suggestion/i);
  assert.match(ba.explanation,/guess/i);
});

test('Unit 31 covers affirmative and negative clause modifiers and changed-state 了',()=>{
  const modifier=u31.grammarRules['u31-clause-modifier'];
  assert.ok(modifier.examples.some(e=>e.text.startsWith('不')));
  const le=u31.grammarRules['u31-sentential-le'];
  assert.ok(le.examples.some(e=>e.text.includes('不住這裡了')));
  assert.ok(le.examples.some(e=>e.text.endsWith('了嗎？')));
  assert.match(le.explanation,/not simply a past-tense marker/i);
});

test('Units 30-31 phrases and grammar examples use covered Han characters',()=>{
  const known=new Set();
  for(const m of course.modules){
    m.newCharacters.forEach(ch=>known.add(ch));
    if(!['unit-30','unit-31'].includes(m.unit.id))continue;
    const texts=[
      ...Object.values(m.phrases).map(p=>p.text),
      ...Object.values(m.grammarRules).flatMap(g=>g.examples.map(e=>e.text)),
    ];
    for(const value of texts)for(const ch of han(value))
      assert.ok(known.has(ch),`${m.unit.id}: uncovered ${ch} in ${value}`);
  }
});

test('紅 and 往 keep their Book 1 first-teaching ownership',()=>{
  assert.ok(u30.newCharacters.includes('紅'));
  assert.ok(u31.newVocabulary.some(v=>v.text==='往'));
  assert.ok(u31.newCharacters.includes('往'));
});


test('Lesson 10 Vocabulary I-II is cumulatively accounted for through Unit 31',()=>{
  const taught=new Set(course.modules.filter(m=>m.bookId==='book-1'&&m.order<=31).flatMap(m=>m.newVocabulary.map(v=>v.text)));
  for(const word of ['水果','黃色','芒果','給','塊','香','甜','紅色','西瓜','吧','對','以前','機會','請','吃吃看'])
    assert.ok(taught.has(word),`Lesson 10 Vocabulary I missing ${word}`);
  for(const word of ['拍','笑','開心','穿','衣服','旅館','太太','男','矮','高','弟弟','乾淨','窗戶','往','藍色','因為','住','上個月','這些'])
    assert.ok(taught.has(word),`Lesson 10 Vocabulary II missing ${word}`);
  assert.equal(u30.phrases['u30-piece'].text,'這個黃色的水果是芒果。我給你一塊。');
  assert.equal(u31.phrases['u31-toward'].text,'從窗戶往外看，是藍色的大海。');
});

test('Lesson 10 source-debt vocabulary is now restored with exact Traditional codepoints',()=>{
  assert.ok(u30.newVocabulary.some(v=>v.text==='芒果'));
  assert.ok(u30.newCharacters.includes('芒'));
  assert.ok(u31.newVocabulary.some(v=>v.text==='窗戶'));
  assert.ok(u31.newCharacters.includes('窗'));
  assert.ok(u31.newCharacters.includes('戶'));
  assert.equal(u31.phrases['u31-toward'].text,'從窗戶往外看，是藍色的大海。');
});
