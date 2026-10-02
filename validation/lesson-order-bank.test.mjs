import assert from 'node:assert/strict';
import test from 'node:test';
import {buildLessonOrderBank,lessonOrderEnhancementEnabled,lessonOrderUnitNumber} from '../lib/lesson-order-bank.ts';

const target={
 id:'lesson-order:u11-test',
 kind:'phrase',
 traditional:'我要一杯茶',
 pinyin:'Wǒ yào yì bēi chá.',
 meaning:'I want one cup of tea.',
 characters:['我','要','一','杯','茶'],
 unitId:'unit-11',
 unitNumber:11,
 bookId:'book-1',
 bookNumber:1,
 lessonId:'u11-test',
 tokens:['我','要','一杯茶'],
};

const familiar=[
 {
  id:'word:咖啡',kind:'word',traditional:'咖啡',pinyin:'kāfēi',meaning:'coffee',
  characters:['咖','啡'],unitId:'unit-10',unitNumber:10,bookId:'book-1',bookNumber:1,lessonId:'u10-a',
 },
 {
  id:'word:今天',kind:'word',traditional:'今天',pinyin:'jīntiān',meaning:'today',
  characters:['今','天'],unitId:'unit-10',unitNumber:10,bookId:'book-1',bookNumber:1,lessonId:'u10-b',
 },
 {
  id:'word:買',kind:'word',traditional:'買',pinyin:'mǎi',meaning:'buy',
  characters:['買'],unitId:'unit-10',unitNumber:10,bookId:'book-1',bookNumber:1,lessonId:'u10-c',
 },
];

test('sentence-bank enhancement is scoped exactly to Book 1 Units 11-48',()=>{
 assert.equal(lessonOrderUnitNumber('u11-cups-09'),11);
 assert.equal(lessonOrderUnitNumber('u48-review-01'),48);
 assert.equal(lessonOrderEnhancementEnabled('u10-review-01'),false);
 assert.equal(lessonOrderEnhancementEnabled('u11-cups-09'),true);
 assert.equal(lessonOrderEnhancementEnabled('u48-review-01'),true);
 assert.equal(lessonOrderEnhancementEnabled('u49-test-01'),false);
});

test('Units 11-48 sentence banks add only familiar distractors and keep every token addressable',()=>{
 const baseTokens=['茶','杯','一','要','我'];
 const bank=buildLessonOrderBank({
  stepId:'u11-cups-09',
  baseTokens,
  answerTokens:target.tokens,
  learnedItems:familiar,
  currentItem:target,
  seed:'session-a',
 });
 assert.equal(bank.distractors.length,1);
 assert.ok(familiar.some(item=>item.traditional===bank.distractors[0]),'distractor should come from familiar material');
 assert.ok(!target.tokens.includes(bank.distractors[0]),'answer token must not be reused as a distractor');
 assert.deepEqual(bank.tokens.slice(0,baseTokens.length),baseTokens,'authored lesson bank remains intact');
 assert.deepEqual([...bank.order].sort((a,b)=>a-b),bank.tokens.map((_,index)=>index),'display order must reference each bank token exactly once');
});

test('outside Units 11-48 the authored sentence bank is left unchanged',()=>{
 const baseTokens=['茶','杯','一','要','我'];
 const bank=buildLessonOrderBank({
  stepId:'u10-review-01',
  baseTokens,
  answerTokens:target.tokens,
  learnedItems:familiar,
  currentItem:target,
  seed:'session-a',
 });
 assert.deepEqual(bank.tokens,baseTokens);
 assert.deepEqual(bank.order,[0,1,2,3,4]);
 assert.deepEqual(bank.distractors,[]);
});
