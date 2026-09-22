import assert from 'node:assert/strict';
import test from 'node:test';
import {advanceMegaQueue,combineWordPerfect,eligibleMegaVocabulary,makeMegaQueue,restoreMegaWord} from '../lib/mega-challenge.ts';
import {vocabularyLookup} from '../lib/vocabulary-lookup.ts';

test('Mega Challenge eligibility follows completed lesson IDs and mastered exclusions',()=>{
 const first=vocabularyLookup.find(item=>item.characters.length>0);
 assert.ok(first);
 const completed=new Set([first.lessonId]);
 const eligible=eligibleMegaVocabulary(completed,new Set());
 assert.ok(eligible.length>0);
 assert.ok(eligible.every(item=>completed.has(item.lessonId)));
 const excluded=eligibleMegaVocabulary(completed,new Set([first.id]));
 assert.ok(!excluded.some(item=>item.id===first.id));
});

test('failed words rotate behind other queue items while perfect words clear',()=>{
 const queue=['a','b','c'];
 assert.deepEqual(advanceMegaQueue(queue,true),['b','c']);
 assert.deepEqual(advanceMegaQueue(queue,false),['b','c','a']);
 assert.deepEqual(advanceMegaQueue(['a'],false),['a']);
});

test('challenge queue contains each eligible ID once',()=>{
 const items=vocabularyLookup.slice(0,8);
 const queue=makeMegaQueue(items,'test-seed');
 assert.equal(queue.length,items.length);
 assert.equal(new Set(queue).size,items.length);
 assert.deepEqual(makeMegaQueue([...items,...items],'test-seed'),queue);
});

test('restoring mastery cannot enqueue unlearned or duplicate words',()=>{
 const learned=new Set(['a','b']);
 assert.deepEqual(restoreMegaWord(['a'],'b',learned),['a','b']);
 assert.deepEqual(restoreMegaWord(['a'],'a',learned),['a']);
 assert.deepEqual(restoreMegaWord(['a'],'c',learned),['a']);
 assert.equal(restoreMegaWord(null,'a',learned),null);
});


test('multi-character word is perfect only when every character is first-pass perfect',()=>{
 let perfect=true;
 perfect=combineWordPerfect(perfect,false);
 assert.equal(perfect,true);
 perfect=combineWordPerfect(perfect,true);
 assert.equal(perfect,false);
 perfect=combineWordPerfect(perfect,false);
 assert.equal(perfect,false);
});

test('newly completed lessons automatically add their vocabulary to eligibility',()=>{
 const first=vocabularyLookup.find(item=>item.characters.length>0);
 const second=vocabularyLookup.find(item=>item.characters.length>0&&item.lessonId!==first?.lessonId);
 assert.ok(first&&second);
 const early=eligibleMegaVocabulary(new Set([first.lessonId]),new Set());
 const later=eligibleMegaVocabulary(new Set([first.lessonId,second.lessonId]),new Set());
 assert.ok(later.length>=early.length);
 assert.ok(later.some(item=>item.lessonId===second.lessonId));
});
