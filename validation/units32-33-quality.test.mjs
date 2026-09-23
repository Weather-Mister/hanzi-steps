import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';

const course=await loadCourse();
const u32=course.modules.find(m=>m.unit.id==='unit-32');
const u33=course.modules.find(m=>m.unit.id==='unit-33');
const b2u1=course.modules.find(m=>m.unit.id==='book-2-unit-1');
const b2u2=course.modules.find(m=>m.unit.id==='book-2-unit-2');
const b2u3=course.modules.find(m=>m.unit.id==='book-2-unit-3');

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

test('Units 32-33 keep balanced novelty and full lesson/review structure',()=>{
  assert.equal(u32.newVocabulary.length,14);
  assert.equal(u32.newCharacters.length,14);
  assert.equal(u33.newVocabulary.length,13);
  assert.equal(u33.newCharacters.length,14);
  for(const m of [u32,u33]){
    assert.equal(m.lessons.length,7);
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    assert.equal(review.steps.length,22);
    assert.ok(review.steps.filter(s=>s.type==='listen').length>=3);
    assert.ok(review.steps.some(s=>s.type==='memory'||s.type==='parts'));
  }
});

test('Every formal NEW vocabulary item is retrieved in its unit review',()=>{
  for(const m of [u32,u33]){
    const blob=reviewBlob(m);
    for(const word of m.newVocabulary.map(v=>v.text))
      assert.ok(blob.includes(word),`${m.unit.id}: review never retrieves ${word}`);
  }
});

test('Every new grammar target is independently assessed in review',()=>{
  for(const m of [u32,u33]){
    const review=m.lessons.find(l=>l.id===m.reviewLessonId);
    for(const id of m.unit.grammarIds){
      const related=review.steps.filter(s=>!['phrase','grammar'].includes(s.type)&&
        (s.grammarIds?.includes(id)||m.phrases[s.phrase]?.grammarIds?.includes(id)));
      assert.ok(related.length,`${m.unit.id}: review omits ${id}`);
    }
  }
});

test('Unit 32 teaches Lesson 11 direction and 就 distinctions explicitly',()=>{
  const lai=u32.grammarRules['u32-lai-vp'];
  assert.match(lai.explanation,/toward/i);
  assert.match(lai.explanation,/去/);
  assert.match(lai.explanation,/Negation|不/);
  const jiu=u32.grammarRules['u32-early-jiu'];
  assert.match(jiu.explanation,/sooner|less delay/i);
  assert.match(jiu.explanation,/要是…就/);
  assert.ok(u32.phrases['u32-walk'].text.includes('五分鐘就到了'));
  assert.match(u32.phrases['u32-landlord'].note,/空.*vacant/i);
  assert.equal(u32.phrases['u32-rooms'].text,'這裡是客廳，廚房在左邊，右邊有浴室。');
  assert.ok(!Object.values(u32.phrases).some(p=>p.text.includes('客廳在左邊')));
  assert.equal(u32.phrases['u32-return-call'].text,'我回去想想，再打電話給你。');
  assert.equal(u32.phrases['u32-landlord'].text,'還有兩間空房間，一間是套房，一間不是。');
  assert.equal(u32.phrases['u32-occupied'].text,'現在有人住嗎？');
  assert.equal(u32.phrases['u32-market'].text,'附近有超市和捷運站。');
  assert.equal(u32.phrases['u32-internet'].text,'房間裡面可以上網嗎？');
});

test('Unit 33 covers every Lesson 11 grammar contrast and pragmatic extension',()=>{
  const exist=u33.grammarRules['u33-existential-you'];
  assert.match(exist.explanation,/indefinite/i);
  assert.match(exist.explanation,/沒有/);
  const hui=u33.grammarRules['u33-hui-likelihood'];
  assert.match(hui.explanation,/acquired skill/i);
  assert.match(hui.explanation,/likelihood|future/i);
  const zero=u33.grammarRules['u33-zero-pronoun'];
  assert.match(zero.explanation,/subject/i);
  assert.match(zero.explanation,/object/i);
  assert.match(zero.explanation,/ambiguous/i);
  assert.match(u33.phrases['u33-then'].note,/then \/ in that case/i);
  assert.match(u33.phrases['u33-sorry'].note,/pragmatic phrase/i);
  assert.ok(u33.newVocabulary.some(v=>v.text==='等'&&v.pinyin==='děng'));
  assert.equal(u33.phrases['u33-wait'].text,'好，我在家等你。');
  assert.equal(u33.phrases['u33-rent-question'].text,'你收到我的房租了嗎？');
  assert.equal(u33.phrases['u33-time'].text,'你什麼時候有空？晚上可以嗎？');
  assert.ok(u33.phrases['u33-then'].text.includes('還有問題嗎？'));
  assert.match(u33.phrases['u33-pay'].note,/得.*děi.*must/i);
  assert.equal(u33.characters['像'].strokes,14);
});

test('Lesson 11 transparent forms and source dialogue vocabulary are not dropped',()=>{
  const text32=Object.values(u32.phrases).map(p=>p.text+' '+p.note).join('\n');
  const text33=Object.values(u33.phrases).map(p=>p.text+' '+p.note).join('\n');
  for(const item of ['分鐘','房間','回去','再','打電話','捷運站','上網'])assert.ok(text32.includes(item),`Unit 32 lost ${item}`);
  for(const item of ['房租','不好意思','那','等','得自己付錢'])assert.ok(text33.includes(item),`Unit 33 lost ${item}`);
  for(const item of ['喂','已經','習慣','問題','熱水器','好像','裝','不過','付','收到','沒關係','有線電視'])
    assert.ok(text33.includes(item),`Unit 33 lost ${item}`);
});

test('Units 32-33 phrases and grammar examples use already-covered or local Han characters',()=>{
  const known=new Set();
  for(const m of course.modules){
    m.newCharacters.forEach(ch=>known.add(ch));
    if(!['unit-32','unit-33'].includes(m.unit.id))continue;
    const texts=[
      ...Object.values(m.phrases).map(p=>p.text),
      ...Object.values(m.grammarRules).flatMap(g=>g.examples.map(e=>e.text)),
    ];
    for(const value of texts)for(const ch of han(value))
      assert.ok(known.has(ch),`${m.unit.id}: uncovered ${ch} in ${value}`);
  }
});

test('Book 2 keeps its lessons while first-teaching ownership moves earlier',()=>{
  for(const ch of ['走','左','右','路']){
    assert.ok(u32.newCharacters.includes(ch));
    assert.ok(!b2u1.newCharacters.includes(ch));
    assert.ok(b2u1.reviewCharacters.includes(ch));
  }
  assert.ok(u32.newCharacters.includes('超'));
  assert.ok(!b2u2.newCharacters.includes('超'));
  assert.ok(b2u2.reviewCharacters.includes('超'));

  assert.ok(u33.newCharacters.includes('過'));
  assert.ok(!b2u3.newCharacters.includes('過'));
  assert.ok(b2u3.reviewCharacters.includes('過'));

  assert.ok(u32.newCharacters.includes('再'));
  assert.ok(!b2u3.newCharacters.includes('再'));
  assert.ok(b2u3.reviewCharacters.includes('再'));
  assert.ok(u32.newVocabulary.some(v=>v.text==='再'));
  assert.ok(!b2u3.newVocabulary.some(v=>v.text==='再'));
  assert.ok(b2u3.reviewVocabulary.includes('再'));

  assert.ok(b2u1.lessons.find(l=>l.id==='b2-turn').steps.some(s=>s.char==='左'));
  assert.ok(b2u2.lessons.find(l=>l.id==='b2u2-store').steps.some(s=>s.char==='超'));
  assert.ok(b2u3.lessons.find(l=>l.id==='b2u3-pass').steps.some(s=>s.char==='過'));
  assert.ok(b2u3.lessons.find(l=>l.id==='b2u3-then').steps.some(s=>s.char==='再'));
});


test('Learner-facing Units 32-33 stay Traditional Chinese',()=>{
  const blob=[JSON.stringify(u32),JSON.stringify(u33)].join('\n');
  for(const simplified of ['厅','厨','间','线','视','关','经','惯','这','里','话','东'])
    assert.ok(!blob.includes(simplified),`Simplified form leaked into learner content: ${simplified}`);
  for(const traditional of ['廳','廚','間','線','視','關','經','慣','這','裡','話','東'])
    assert.ok(blob.includes(traditional),`Expected Traditional form missing: ${traditional}`);
});

test('Known Lesson 10 handwriting blockers remain explicit rather than smuggled into Lesson 11',()=>{
  for(const m of [u32,u33]){
    assert.ok(!m.newVocabulary.some(v=>v.text==='芒果'||v.text==='窗戶'));
    assert.ok(!m.newCharacters.includes('芒'));
    assert.ok(!m.newCharacters.includes('窗'));
    assert.ok(!m.newCharacters.includes('戶'));
  }
});
