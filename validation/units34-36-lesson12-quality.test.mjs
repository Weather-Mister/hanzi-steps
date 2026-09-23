import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCourse} from './course-io.mjs';
import {han} from './validate.mjs';
import {compactPinyin,searchVocabulary,vocabularyLookup} from '../lib/vocabulary-lookup.ts';
import {eligibleMegaVocabulary} from '../lib/mega-challenge.ts';

const course=await loadCourse();
const units=[34,35,36].map(order=>course.modules.find(m=>m.bookId==='book-1'&&m.order===order));
const [u34,u35,u36]=units;
const normalize=text=>String(text||'').replace(/[，。！？；、：,.!?;:\s]/g,'');
const owner=new Map(course.modules.flatMap(m=>m.newVocabulary.map(v=>[v.text,m.order])));

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

test('Units 34–36 account for every Lesson 12 Vocabulary I and II entry at the correct first-teaching boundary',()=>{
  const expected=new Map([
    ['計畫',34],['年',28],['久',34],['時間',34],['先',34],['念',34],['大學',34],['需要',34],['花',34],['獎學金',34],['成績',34],
    ['學費',35],['公司',35],['替',35],['希望',35],['以後',35],['到',19],['上班',35],['念書',35],['累',35],['語言中心',34],['加油',35],
    ['工作',36],['去年',36],['做',7],['生意',36],['好',1],['找',19],['這樣',36],['國家',36],['試',36],['難',36],['那麼',36],['再',32],
  ]);
  for(const [word,order] of expected){
    assert.equal(owner.get(word),order,word+' has the wrong formal first-teaching unit');
  }
  assert.ok(!owner.has('試試看'),'transparent source phrase 試試看 must not become duplicate formal vocabulary');
  assert.equal(u36.newVocabulary.filter(v=>v.text==='工作').length,1,'工作 must keep its verb+noun senses in one exact-form entry');
});

test('Units 34–36 preserve the complete Lesson 12 dialogue sequence, including short handoff turns',()=>{
  const b34=runtimeBlob(u34),b35=runtimeBlob(u35),b36=runtimeBlob(u36);
  for(const text of [
    '你計畫在臺灣學多久的中文？','五年。','為什麼要這麼久的時間？',
    '我先在語言中心念一年，再念四年大學。','所以需要五年。','這得花不少錢！',
    '對，不過我有獎學金。','要是成績不好，就沒獎學金了。你呢？',
  ]) assert.ok(b34.includes(text),'Unit 34 lost source dialogue content: '+text);
  for(const text of [
    '我的學費是公司替我付的。','你打算學多久呢？','大概兩年，是公司決定的。',
    '希望我以後也可以到這麼好的公司上班。','我又要上班，又要念書，真的很累。','我們一起加油吧！',
  ]) assert.ok(b35.includes(text),'Unit 35 lost source dialogue content: '+text);
  for(const text of [
    '你是什麼時候來臺灣工作的？','去年，我已經在臺灣工作一年了。','為什麼你們公司要替你付學費？',
    '因為我們公司跟臺灣人做生意。','老闆希望我們都會說中文。','我覺得你們公司真好。',
    '對了，你回國以後，打算做什麼？','我回國以後，也想找個有機會說中文的工作。',
    '不錯，這樣的工作在你們國家好找嗎？','不知道好不好找，我試試看。','要是難找呢？',
    '那麼我再來臺灣學中文。','太好了！那我們就可以再見面了。',
  ]) assert.ok(b36.includes(text),'Unit 36 lost source dialogue content: '+text);
});

test('Lesson 12 grammar I–IV remains complete across Units 34–36',()=>{
  assert.deepEqual(Object.keys(u34.grammarRules),['u34-first-then']);
  assert.deepEqual(Object.keys(u35.grammarRules),['u35-shi-de']);
  assert.deepEqual(Object.keys(u36.grammarRules),['u36-yihou-after','u36-hao-nan-verb']);

  const g1=u34.grammarRules['u34-first-then'];
  assert.match(g1.explanation,/past and future/i);
  assert.match(g1.explanation,/habitual/i);
  assert.ok(g1.examples.some(ex=>ex.text==='我昨天晚上先寫功課，再看電視。'));

  const g2=u35.grammarRules['u35-shi-de'];
  for(const pattern of [/subject, time, place, manner/i,/never the object/i,/不 before 是/i,/yes\/no questions with 嗎/i,/who, when, how, or where/i,/omitted/i])
    assert.match(g2.explanation,pattern);

  const g3=u36.grammarRules['u36-yihou-after'];
  assert.match(g3.explanation,/standalone 以後.*in the future/i);
  assert.match(g3.explanation,/event or time expression comes before 以後/i);

  const g4=u36.grammarRules['u36-hao-nan-verb'];
  assert.match(g4.explanation,/perception verbs/i);
  assert.match(g4.explanation,/action verbs/i);
  assert.match(g4.explanation,/A-not-A/i);
  assert.ok(g4.examples.some(ex=>ex.text==='這個歌好聽也好唱。'));
});

test('All Units 34–36 phrase token definitions reconstruct their displayed Traditional Chinese',()=>{
  for(const module of units){
    for(const [id,phrase] of Object.entries(module.phrases)){
      assert.equal(normalize(phrase.tokens.join('')),normalize(phrase.text),module.unit.id+' '+id+' tokens do not reconstruct the phrase');
    }
  }
});

test('Units 34–36 choice activities have one unambiguous keyed option',()=>{
  for(const module of units)for(const lesson of module.lessons)for(const step of lesson.steps){
    if(!['select','listen','parts'].includes(step.type))continue;
    assert.ok(Array.isArray(step.options)&&step.options.length>=2,step.id+' has too few options');
    assert.equal(new Set(step.options).size,step.options.length,step.id+' has duplicate options');
    assert.equal(step.options.filter(option=>option===step.answer).length,1,step.id+' answer is not keyed exactly once');
    if(step.type==='listen'&&step.audioText){
      assert.ok(step.audioText.includes(step.answer),step.id+' audio omits its answer');
      assert.equal(step.options.filter(option=>step.audioText.includes(option)).length,1,step.id+' audio contains multiple answer options');
      assert.ok(step.answer.includes(step.char),step.id+' focal character is not inside the listening answer');
    }
  }
});

test('Learner-facing phrase and grammar cards in Units 34–36 never expose a future NEW character before its intro',()=>{
  const earlier=new Set(course.modules.filter(m=>m.bookId==='book-1'&&m.order<34).flatMap(m=>m.newCharacters));
  for(const module of units){
    const known=new Set(earlier);
    for(const prior of units.filter(u=>u.order<module.order))for(const ch of prior.newCharacters)known.add(ch);
    for(const lesson of module.lessons)for(const step of lesson.steps){
      if(step.type==='intro'&&step.char)known.add(step.char);
      const values=[];
      if(step.type==='phrase'&&step.phrase){
        const p=module.phrases[step.phrase];
        values.push(p.text,p.note,...(p.tokens||[]));
      }else if(step.type==='grammar'&&step.grammar){
        const g=module.grammarRules[step.grammar];
        values.push(g.title,g.pattern,g.explanation,g.remember,...g.examples.flatMap(ex=>[ex.text,ex.meaning]),...(g.words||[]));
      }else if(!['trace','build','complete','memory','parts'].includes(step.type)){
        values.push(step.prompt,step.answer,step.explanation,step.audioText,...(step.options||[]),...(step.tokens||[]));
      }
      for(const value of values.filter(Boolean))for(const ch of han(value))
        assert.ok(known.has(ch),module.unit.id+' '+step.id+' exposes '+ch+' before its intro');
    }
  }
});

test('Pinyin Search resolves every formal NEW vocabulary item from Units 34–36 canonically',()=>{
  for(const module of units)for(const word of module.newVocabulary){
    const query=compactPinyin(word.pinyin);
    const hit=searchVocabulary(query,1000).find(item=>item.traditional===word.text&&item.lessonId===word.lessonId);
    assert.ok(hit,module.unit.id+' Pinyin Search misses '+word.text+' via '+query);
    assert.equal(hit.pinyin,word.pinyin);
    assert.equal(hit.meaning,word.meaning);
  }
});

test('Mega Challenge can receive every formal NEW word after its teaching lesson is completed',()=>{
  const completed=new Set(units.flatMap(module=>module.newVocabulary.map(word=>word.lessonId)));
  const eligibleIds=new Set(eligibleMegaVocabulary(completed,new Set()).map(item=>item.id));
  for(const module of units)for(const word of module.newVocabulary){
    const item=vocabularyLookup.find(v=>v.traditional===word.text&&v.lessonId===word.lessonId);
    assert.ok(item,'canonical lookup missing '+word.text);
    assert.ok(eligibleIds.has(item.id),'Mega Challenge misses '+word.text);
  }
});

test('Units 34–36 keep published lesson/activity topology stable while content is repaired',()=>{
  const expected={
    'unit-34':[['u34-plan',19],['u34-sequence',14],['u34-center',14],['u34-need',9],['u34-money',19],['u34-grades',13],['u34-review',22]],
    'unit-35':[['u35-tuition',19],['u35-focus',15],['u35-decision',5],['u35-future',19],['u35-workstudy',9],['u35-cheer',17],['u35-review',27]],
    'unit-36':[['u36-work',15],['u36-business',7],['u36-after',8],['u36-job',12],['u36-try',9],['u36-hard',8],['u36-review',27]],
  };
  for(const module of units)
    assert.deepEqual(module.lessons.map(l=>[l.id,l.steps.length]),expected[module.unit.id],module.unit.id+' topology changed');
});
