import {test} from 'node:test';
import assert from 'node:assert/strict';
import {learningStatistics} from '../lib/statistics.ts';
import {practiceSkillKey,unguidedPracticeItemId,updatePracticeState} from '../lib/practice-engine.ts';
import {vocabularyLookup,learnedVocabulary} from '../lib/vocabulary-lookup.ts';

test('statistics use exact clean outcomes, exclude bookkeeping, and include unguided rounds for one-character words',()=>{
 const seed=vocabularyLookup.find(item=>Array.from(item.traditional).length===1&&item.characters.length===1);
 assert.ok(seed);
 const completed=new Set([seed.lessonId]);
 const learned=learnedVocabulary(completed);
 const target=learned.find(item=>item.id===seed.id);
 assert.ok(target);

 const states={};
 states[practiceSkillKey(target.id,'recognition')]=updatePracticeState(undefined,{
  itemId:target.id,mode:'recognition',correct:true,assisted:false,now:1000,
 });
 states[practiceSkillKey(target.id,'handwriting')]=updatePracticeState(undefined,{
  itemId:target.id,mode:'handwriting',correct:true,assisted:false,now:2000,
 });
 states[practiceSkillKey(target.id,'handwriting')]=updatePracticeState(states[practiceSkillKey(target.id,'handwriting')],{
  itemId:target.id,mode:'handwriting',correct:true,assisted:true,now:3000,
 });

 const freeId=unguidedPracticeItemId(target.traditional);
 states[practiceSkillKey(freeId,'handwriting')]=updatePracticeState(undefined,{
  itemId:freeId,mode:'handwriting',correct:true,assisted:false,now:4000,
 });
 states[practiceSkillKey(freeId,'handwriting')]=updatePracticeState(states[practiceSkillKey(freeId,'handwriting')],{
  itemId:freeId,mode:'handwriting',correct:true,assisted:true,now:5000,
 });

 // Internal knowledge evidence is useful for scheduling but is not a separate
 // learner attempt, so strict dashboard totals must not double count it.
 states[practiceSkillKey('grammar:test-shadow','recognition')]=updatePracticeState(undefined,{
  itemId:'grammar:test-shadow',mode:'recognition',correct:false,assisted:true,now:6000,
 });

 const stats=learningStatistics({
  completed,
  studyDays:['2026-09-07','2026-09-08','2026-09-09','2026-09-11','not-a-day'],
  practiceStates:states,
  mastered:new Set([target.id,'phrase:not-a-word']),
  reverseMastered:new Set([target.id]),
  learnedCharacters:12,
  completedUnits:3,
  dailyExerciseCounts:{
   '2026-09-07':2,
   '2026-09-08':8,
   '2026-09-09':27,
  },
  now:Date.parse('2026-09-10T08:00:00Z'),
 });

 assert.equal(stats.streak.current,3);
 assert.equal(stats.streak.currentStart,'2026-09-07');
 assert.equal(stats.streak.best,3);
 assert.equal(stats.learnedWords,learned.length);
 assert.equal(stats.masteredWords,1);
 assert.equal(stats.pinyinMasteredWords,1);
 assert.equal(stats.learnedCharacters,12);
 assert.equal(stats.completedUnits,3);
 assert.equal(stats.studyDays,3,'future and malformed dates must not inflate study-day totals');

 assert.equal(stats.totalPracticeAttempts,5);
 assert.equal(stats.totalCorrect,5);
 assert.equal(stats.totalCleanTracked,5);
 assert.equal(stats.totalCleanCorrect,3);
 assert.equal(stats.strictAccuracy,60);
 assert.equal(stats.successRate,100);
 assert.equal(stats.strictCoverage,100);
 assert.equal(stats.assistedRate,40);
 assert.equal(stats.totalMisses,0);

 assert.equal(stats.mostPracticedWord?.id,target.id);
 assert.equal(stats.mostPracticedWord?.attempts,5);
 assert.equal(stats.mostPracticedWord?.unguidedRounds,2);
 assert.equal(stats.topPracticedWords[0]?.id,target.id);
 assert.equal(stats.practiceByMode.find(row=>row.mode==='handwriting')?.attempts,4);
 assert.equal(stats.activityGrid.length,84);
 assert.equal(stats.activityGrid.filter(day=>day.active).length,3);
 const activeDays=stats.activityGrid.filter(day=>day.active);
 assert.deepEqual(activeDays.map(day=>day.exercises),[2,8,27]);
 assert.deepEqual(activeDays.map(day=>day.level),[1,2,4]);
 assert.equal(stats.masteredRate,Math.round(1/learned.length*100));
 assert.equal(stats.pinyinMasteredRate,Math.round(1/learned.length*100));
});

test('legacy aggregate rows never get guessed into strict accuracy',()=>{
 const seed=vocabularyLookup.find(item=>item.characters.length>0);
 assert.ok(seed);
 const states={
  [practiceSkillKey(seed.id,'recognition')]:{
   itemId:seed.id,mode:'recognition',attempts:4,correct:3,assisted:1,misses:1,
   streak:0,strength:.2,lastSeen:1000,nextReview:2000,
  },
 };
 const stats=learningStatistics({
  completed:new Set([seed.lessonId]),
  studyDays:[],
  practiceStates:states,
  mastered:new Set(),
  reverseMastered:new Set(),
  learnedCharacters:0,
  completedUnits:0,
  now:Date.parse('2026-09-10T08:00:00Z'),
 });
 assert.equal(stats.totalPracticeAttempts,4);
 assert.equal(stats.totalCleanTracked,0);
 assert.equal(stats.totalCleanCorrect,0);
 assert.equal(stats.strictAccuracy,0);
 assert.equal(stats.strictCoverage,0);
 assert.equal(stats.successRate,75);
});

test('statistics stay empty rather than inventing practice history',()=>{
 const seed=vocabularyLookup.find(item=>item.characters.length>0);
 assert.ok(seed);
 const stats=learningStatistics({
  completed:new Set([seed.lessonId]),
  studyDays:[],
  practiceStates:{},
  mastered:new Set(),
  reverseMastered:new Set(),
  learnedCharacters:0,
  completedUnits:0,
  now:Date.parse('2026-09-10T08:00:00Z'),
 });
 assert.equal(stats.mostPracticedWord,null);
 assert.equal(stats.streak.currentStart,null);
 assert.equal(stats.totalPracticeAttempts,0);
 assert.equal(stats.strictAccuracy,0);
 assert.equal(stats.successRate,0);
 assert.equal(stats.assistedRate,0);
 assert.deepEqual(stats.topPracticedWords,[]);
 assert.deepEqual(stats.practiceByMode,[]);
 assert.equal(stats.activityGrid.length,84);
});
