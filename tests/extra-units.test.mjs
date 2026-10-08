import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {extraUnits,extraLessons,extraWords,extraChoices,extraAnswer,extraWord,extraUnitComplete} from '../course/extras/units.ts';
import {lessons,units,vocabulary,characters,findLesson,lessonAvailable,validSession,completedLessonIds} from '../lib/curriculum.ts';
import {learnedPracticeItems} from '../lib/practice-engine.ts';
import {streakFromDays,taipeiDay} from '../lib/streak.ts';

test('extras coexist without entering canonical ownership or prerequisites',()=>{
 const completed=new Set(extraLessons.map(l=>l.id));
 assert.equal(extraUnits.length,2);assert.equal(extraWords.length,20);
 assert.equal(extraLessons.length,14);
 assert.equal(extraLessons.filter(l=>lessons.some(core=>core.id===l.id)).length,0);
 assert.equal(extraUnits.filter(u=>units.some(core=>core.id===u.id)).length,0);
 assert.equal(vocabulary.filter(w=>completed.has(w.lessonId)).length,0);
 assert.deepEqual(learnedPracticeItems(completed),learnedPracticeItems(new Set()));
 assert.equal(lessonAvailable('u2-people',completed),false);
 assert.equal(lessonAvailable('u31-because',completed),false);
 assert.equal(completedLessonIds(completed).size,14);
 for(const lesson of extraLessons){
  assert.equal(lessonAvailable(lesson.id,new Set()),true);
  assert.equal(findLesson(lesson.id),lesson);
 }
 assert.equal(lessonAvailable('extra-missing',new Set()),false);
 // Supplementary 褲子 must leave the course's real owning lesson untouched.
 for(const word of vocabulary.filter(w=>extraWords.some(extra=>extra.text===w.text)))assert.ok(!word.lessonId.startsWith('extra-'));
});

test('every directly accessible assessed lesson teaches its targets before testing',()=>{
 for(const lesson of extraLessons){
  const taught=new Set();
  for(const step of lesson.steps){
   const activity=step.extra;
   assert.equal(step.type,'extra');
   if(activity.mode==='learn'){
    for(const id of activity.wordId?[activity.wordId]:(activity.wordIds||[]))taught.add(id);
   }else{
    for(const id of activity.mode==='match'||activity.mode==='measure-match'?activity.wordIds:[activity.wordId]){
     assert.ok(taught.has(id),lesson.id+': target '+id+' was not taught first');
    }
   }
  }
 }
});

test('choice banks are distinct and contain exactly one authored answer',()=>{
 for(const lesson of extraLessons)for(const step of lesson.steps){
  const {mode}=step.extra;
  if(mode==='learn')continue;
  const choices=extraChoices(step);
  assert.equal(new Set(choices).size,choices.length,step.id);
  assert.ok(choices.every(choice=>typeof choice==='string'&&choice.length>0),step.id);
  if(mode==='match'||mode==='measure-match'){
   assert.ok(choices.length>=3);
   if(mode==='measure-match')assert.equal(new Set(choices.map(id=>extraWord(id).measure)).size,choices.length);
  }else{
   assert.equal(choices.filter(choice=>choice===extraAnswer(step)).length,1,step.id);
   assert.ok(choices.length>=2,step.id);
   if(mode==='picture'||mode==='word'||mode==='listen-picture')assert.ok(choices.every(id=>extraWord(id)));
   if(mode==='character')assert.ok(extraWord(step.extra.wordId).text.includes(extraAnswer(step)));
  }
 }
});

test('checkpoint validation, local drafts, and Taipei streak support extras',()=>{
 const time=Date.parse('2026-10-08T02:00:00Z');
 for(const lesson of extraLessons){
  const base={id:'550e8400-e29b-41d4-a716-446655440000',lessonId:lesson.id,index:0,independent:0,assisted:0,complete:false,updatedAt:time};
  assert.equal(validSession(base),true);
  assert.equal(validSession({...base,index:lesson.steps.length,complete:true}),true);
  assert.equal(validSession({...base,index:lesson.steps.length-1,complete:true}),false);
  assert.equal(validSession({...base,index:lesson.steps.length+1,complete:true}),false);
  assert.equal(validSession({...base,index:0,independent:1}),false);
 }
 assert.equal(validSession({id:'550e8400-e29b-41d4-a716-446655440000',lessonId:'extra-invented',index:1,independent:0,assisted:0,complete:true,updatedAt:time}),false);
 assert.equal(streakFromDays([taipeiDay(time)],time).current,1);
});

test('extra completion requires all lessons, including when review is done first',()=>{
 for(const unit of extraUnits){
  const reviewOnly=new Set([unit.lessonIds.at(-1)]);
  assert.equal(extraUnitComplete(unit,reviewOnly),false);
  assert.equal(extraUnitComplete(unit,new Set(unit.lessonIds)),true);
  assert.equal(extraUnitComplete(unit,new Set(unit.lessonIds.slice(1))),false);
 }
});

test('supplementary glyphs and meanings do not overwrite canonical records',()=>{
 const before=JSON.stringify(characters);
 for(const word of extraWords){
  assert.ok(word.glyphNotes.length>0);
  assert.ok(word.counted.includes(word.measure+word.text));
  assert.ok(word.pinyin&&word.countedPinyin&&word.measurePinyin);
 }
 assert.equal(JSON.stringify(characters),before);
 const art=fs.readFileSync(new URL('../components/extra-picture.tsx',import.meta.url),'utf8');
 for(const word of extraWords)assert.ok(art.includes("case '"+word.id+"'"),'missing illustration: '+word.id);
 const runtime=fs.readFileSync(new URL('../course/runtime.ts',import.meta.url),'utf8');
 assert.ok(!runtime.includes('extras'));
});

test('backend registration has the exact extra lesson lengths',()=>{
 const sql=fs.readFileSync(new URL('../course/extras/progress.sql',import.meta.url),'utf8');
 for(const lesson of extraLessons){
  const match=sql.match(new RegExp("\\('"+lesson.id+"',\\s*(\\d+)\\)"));
  assert.ok(match,'missing backend lesson: '+lesson.id);
  assert.equal(Number(match[1]),lesson.steps.length,lesson.id);
 }
 assert.equal((sql.match(/\('extra-/g)||[]).length,extraLessons.length);
});
