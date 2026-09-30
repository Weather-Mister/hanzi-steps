import assert from 'node:assert/strict';
import test from 'node:test';
import {isOrderAnswerAccepted,isTimeToken} from '../lib/order-answer.ts';

test('recognizes the beginner time expressions used by sentence builders',()=>{
 for(const token of ['明天','早上','晚上','明天晚上','星期六','九點','九點半']){
  assert.equal(isTimeToken(token),true,token);
 }
 assert.equal(isTimeToken('分鐘'),false);
 assert.equal(isTimeToken('喜歡'),false);
});

test('accepts time before or immediately after the subject/topic',()=>{
 assert.equal(isOrderAnswerAccepted(
  ['早上','我','常','喝茶'],
  ['我','早上','常','喝茶'],
 ),true);
 assert.equal(isOrderAnswerAccepted(
  ['我','明天','早上','去','游泳'],
  ['明天','早上','我','去','游泳'],
 ),true);
 assert.equal(isOrderAnswerAccepted(
  ['明天晚上','我們','一起','去','吃','越南菜'],
  ['我們','明天晚上','一起','去','吃','越南菜'],
 ),true);
});

test('does not relax the rest of the sentence or the internal time order',()=>{
 assert.equal(isOrderAnswerAccepted(
  ['早上','我','喝茶','常'],
  ['我','早上','常','喝茶'],
 ),false);
 assert.equal(isOrderAnswerAccepted(
  ['早上','明天','我們','去','游泳'],
  ['我們','明天','早上','去','游泳'],
 ),false);
});

test('strict order keeps a single required answer when a question explicitly specifies placement',()=>{
 assert.equal(isOrderAnswerAccepted(
  ['早上','我','常','喝茶'],
  ['我','早上','常','喝茶'],
  {strict:true},
 ),false);
 assert.equal(isOrderAnswerAccepted(
  ['我','早上','常','喝茶'],
  ['我','早上','常','喝茶'],
  {strict:true},
 ),true);
});
