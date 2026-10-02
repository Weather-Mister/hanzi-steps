import assert from 'node:assert/strict';
import test from 'node:test';
import unit12 from '../course/book1/unit12.ts';
import unit43 from '../course/book1/unit43.ts';
import unit44 from '../course/book1/unit44.ts';

function stepById(unit,id){
 for(const lesson of unit.lessons){
  const step=lesson.steps.find(candidate=>candidate.id===id);
  if(step)return step;
 }
 return undefined;
}

test('Unit 12 cumulative reading stays inside the taught number range',()=>{
 const step=stepById(unit12,'u12-challenge-reading-21');
 assert.ok(step);
 assert.equal(step.answer,'七十塊');
 assert.equal(step.prompt.includes('百'),false);
 assert.equal(step.options.some(option=>option.includes('百')),false);
});

test('紅葉 keeps the textbook red-maple-leaves gloss across delayed retrieval',()=>{
 const vocabulary=unit43.newVocabulary.find(word=>word.text==='紅葉');
 assert.ok(vocabulary);
 assert.equal(vocabulary.meaning,'red maple leaves');
 assert.equal(unit43.phrases['u43-nextyear-source'].meaning.includes('red maple leaves'),true);
 assert.equal(unit43.phrases['u43-nextyear-source'].note.includes('not only maple leaves'),false);
 assert.equal(unit44.phrases['u44-cum-leaves'].meaning.includes('red maple leaves'),true);
});
