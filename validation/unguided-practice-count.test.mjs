import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
 practiceSkillKey,
 unguidedPracticeCount,
 unguidedPracticeItemId,
 updatePracticeState,
} from '../lib/practice-engine.ts';

test('unguided practice count is lifetime and per character',()=>{
 const states={};
 const niId=unguidedPracticeItemId('你');
 const haoId=unguidedPracticeItemId('好');

 states[practiceSkillKey(niId,'handwriting')]=updatePracticeState(undefined,{
  itemId:niId,mode:'handwriting',correct:true,assisted:false,now:1000,
 });
 states[practiceSkillKey(niId,'handwriting')]=updatePracticeState(states[practiceSkillKey(niId,'handwriting')],{
  itemId:niId,mode:'handwriting',correct:true,assisted:true,now:2000,
 });
 states[practiceSkillKey(haoId,'handwriting')]=updatePracticeState(undefined,{
  itemId:haoId,mode:'handwriting',correct:true,assisted:false,now:3000,
 });

 assert.equal(unguidedPracticeCount(states,'你'),2);
 assert.equal(unguidedPracticeCount(states,'好'),1);
 assert.equal(unguidedPracticeCount(states,'我'),0);
 assert.notEqual(niId,haoId);
});
