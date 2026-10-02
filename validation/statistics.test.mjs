import {test} from 'node:test';
import assert from 'node:assert/strict';
import {learningStatistics} from '../lib/statistics.ts';
import {practiceSkillKey,updatePracticeState} from '../lib/practice-engine.ts';
import {vocabularyLookup,learnedVocabulary} from '../lib/vocabulary-lookup.ts';

test('statistics summarize streaks, learned/mastered words, and practice favorites',()=>{
 const seed=vocabularyLookup.find(item=>item.characters.length>0);
 assert.ok(seed);
 const completed=new Set([seed.lessonId]);
 const learned=learnedVocabulary(completed);
 assert.ok(learned.length>0);
 const target=learned[0];

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

 const stats=learningStatistics({
  completed,
  studyDays:['2026-09-07','2026-09-08','2026-09-09'],
  practiceStates:states,
  mastered:new Set([target.id,'phrase:not-a-word']),
  reverseMastered:new Set([target.id]),
  learnedCharacters:12,
  completedUnits:3,
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
 assert.equal(stats.studyDays,3);
 assert.equal(stats.totalPracticeAttempts,3);
 assert.equal(stats.totalCorrect,3);
 assert.equal(stats.accuracy,100);
 assert.equal(stats.assistedRate,33);
 assert.equal(stats.mostPracticedWord?.id,target.id);
 assert.equal(stats.mostPracticedWord?.attempts,3);
 assert.equal(stats.topPracticedWords[0]?.id,target.id);
 assert.equal(stats.practiceByMode.find(row=>row.mode==='handwriting')?.attempts,2);
 assert.equal(stats.activityGrid.length,84);
 assert.equal(stats.activityGrid.filter(day=>day.active).length,3);
 assert.equal(stats.weeklyActivity.length,12);
 assert.equal(stats.weeklyActivity.at(-1)?.activeDays,3);
 assert.equal(stats.masteredRate,Math.round(1/learned.length*100));
 assert.equal(stats.pinyinMasteredRate,Math.round(1/learned.length*100));
});

test('statistics do not invent a most-practiced word without tracked word attempts',()=>{
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
 assert.equal(stats.accuracy,0);
 assert.equal(stats.assistedRate,0);
 assert.deepEqual(stats.topPracticedWords,[]);
 assert.deepEqual(stats.practiceByMode,[]);
 assert.equal(stats.activityGrid.length,84);
 assert.equal(stats.weeklyActivity.length,12);
});
