import assert from 'node:assert/strict';
import test from 'node:test';
import {advanceMegaQueue,makeMegaQueue,restoreMegaWord} from '../lib/mega-challenge.ts';
import {examStudyItems,examStudySets} from '../lib/exam-study.ts';

test('Week 1 exam list is complete and isolated',()=>{
 const set=examStudySets.find(candidate=>candidate.id===1);
 assert.ok(set);
 assert.equal(set.title,'Week 1');
 assert.equal(set.words.length,19);

 const items=examStudyItems(set);
 assert.equal(items.length,19);
 assert.equal(new Set(items.map(item=>item.id)).size,19);
 assert.ok(items.every(item=>item.lessonId==='exam-study-1'));
 assert.ok(items.every(item=>item.characters.length>0));
});

test('Week 2 exam list exactly matches supplied textbook vocabulary and is isolated',()=>{
 const set=examStudySets.find(candidate=>candidate.id===2);
 assert.ok(set);
 assert.equal(set.title,'Week 2');
 assert.deepEqual(set.words,[
  {traditional:'名字',pinyin:'míngzi',meaning:'full name; first name; given name'},
  {traditional:'哪',pinyin:'nǎ / něi',meaning:'which'},
  {traditional:'呢',pinyin:'ne',meaning:'question particle'},
  {traditional:'臺灣',pinyin:'Táiwān',meaning:'Taiwan'},
  {traditional:'他',pinyin:'tā',meaning:'he; him; she; her'},
  {traditional:'中國',pinyin:'Zhōngguó',meaning:'China; Chinese'},
  {traditional:'她',pinyin:'tā',meaning:'she; her'},
  {traditional:'誰',pinyin:'shéi',meaning:'who; whom'},
  {traditional:'華人',pinyin:'Huárén',meaning:'Ethnic Chinese; overseas Chinese; citizen of Chinese origin'},
 ]);

 const items=examStudyItems(set);
 assert.equal(items.length,9);
 assert.equal(new Set(items.map(item=>item.id)).size,9);
 assert.ok(items.every(item=>item.lessonId==='exam-study-2'));
 assert.ok(items.every(item=>item.characters.length>0));
});

test('Week 3 exam list exactly matches supplied textbook vocabulary and is isolated',()=>{
 const set=examStudySets.find(candidate=>candidate.id===3);
 assert.ok(set);
 assert.equal(set.title,'Week 3');
 assert.deepEqual(set.words,[
  {traditional:'早',pinyin:'zǎo',meaning:'Good morning / to be early'},
  {traditional:'趙',pinyin:'Zhào',meaning:'a common Chinese surname'},
  {traditional:'小姐',pinyin:'xiǎojiě',meaning:'Miss'},
  {traditional:'張',pinyin:'Zhāng',meaning:'a common Chinese surname'},
  {traditional:'好久不見',pinyin:'hǎojiǔbújiàn',meaning:'Long time no see.'},
  {traditional:'好',pinyin:'hǎo',meaning:'very, quite, so'},
  {traditional:'久',pinyin:'jiǔ',meaning:'to be a long time'},
  {traditional:'見',pinyin:'jiàn',meaning:'to see, to meet'},
  {traditional:'啊',pinyin:'a',meaning:'a phrase final particle, indicating affirmation, exclamation, etc; an interrogative final particle, used when the answer is assumed.'},
  {traditional:'很',pinyin:'hěn',meaning:'very'},
  {traditional:'謝謝',pinyin:'xièxie',meaning:'to thank, to thank you'},
  {traditional:'也',pinyin:'yě',meaning:'also'},
  {traditional:'這',pinyin:'zhè / zhèi',meaning:'this'},
  {traditional:'太太',pinyin:'tàitai',meaning:'Mrs., wife'},
  {traditional:'你們',pinyin:'nǐmen',meaning:'you (plural)'},
  {traditional:'們',pinyin:'men',meaning:'used after pronouns 我, 你, 他 or certain nouns denoting a group of persons'},
  {traditional:'我們',pinyin:'wǒmen',meaning:'we, us'},
  {traditional:'他們',pinyin:'tāmen',meaning:'they, them'},
 ]);

 const items=examStudyItems(set);
 assert.equal(items.length,18);
 assert.equal(new Set(items.map(item=>item.id)).size,18);
 assert.ok(items.every(item=>item.lessonId==='exam-study-3'));
 assert.ok(items.every(item=>item.characters.length>0));
});


test('Week 4 exam list exactly matches supplied textbook vocabulary and is isolated',()=>{
 const set=examStudySets.find(candidate=>candidate.id===4);
 assert.ok(set);
 assert.equal(set.title,'Week 4');
 assert.deepEqual(set.words,[
  {traditional:'天氣',pinyin:'tiānqì / tiānci',meaning:'weather'},
  {traditional:'熱',pinyin:'rè',meaning:'to be hot'},
  {traditional:'忙',pinyin:'máng',meaning:'to be busy'},
  {traditional:'太',pinyin:'tài',meaning:'too'},
  {traditional:'去',pinyin:'qù / cyù',meaning:'to go'},
  {traditional:'上課',pinyin:'shàngkè',meaning:'to go to class; to attend class'},
  {traditional:'再見',pinyin:'zàijiàn',meaning:'Good-bye. (lit. See you again.)'},
  {traditional:'冷',pinyin:'lěng',meaning:'to be cold'},
 ]);

 const items=examStudyItems(set);
 assert.equal(items.length,8);
 assert.equal(new Set(items.map(item=>item.id)).size,8);
 assert.ok(items.every(item=>item.lessonId==='exam-study-4'));
 assert.ok(items.every(item=>item.characters.length>0));
});

test('Exam Study sets use Mega Challenge queue semantics without progress state',()=>{
 for(const set of examStudySets){
  const items=examStudyItems(set);
  const queue=makeMegaQueue(items,`week-${set.id}-test`);
  assert.equal(queue.length,items.length);

  const failed=advanceMegaQueue(queue,false);
  assert.equal(failed.length,queue.length);
  assert.equal(failed.at(-1),queue[0]);

  const passed=advanceMegaQueue(queue,true);
  assert.equal(passed.length,queue.length-1);
  assert.ok(!passed.includes(queue[0]));
 }
});

test('restoring an Exam Study mastered word cannot duplicate queue entries',()=>{
 for(const set of examStudySets){
  const items=examStudyItems(set);
  const ids=new Set(items.map(item=>item.id));
  const first=items[0].id;
  const second=items[1].id;

  assert.deepEqual(restoreMegaWord([first],second,ids),[first,second]);
  assert.deepEqual(restoreMegaWord([first],first,ids),[first]);
 }
});
