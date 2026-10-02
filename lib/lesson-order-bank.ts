import {shuffled} from './curriculum.ts';
import {sentenceDistractors,type PracticeItem} from './practice-engine.ts';

export type LessonOrderBank={
 tokens:string[];
 order:number[];
 distractors:string[];
};

export function lessonOrderUnitNumber(stepId:string):number|undefined{
 const match=/^u(\d+)-/.exec(stepId);
 if(!match)return undefined;
 const value=Number(match[1]);
 return Number.isFinite(value)?value:undefined;
}

export function lessonOrderEnhancementEnabled(stepId:string):boolean{
 const unit=lessonOrderUnitNumber(stepId);
 return unit!==undefined&&unit>=11&&unit<=48;
}

function distractorCount(answerTokens:string[]):number{
 if(answerTokens.length<=3)return 1;
 if(answerTokens.length<=6)return 2;
 return 3;
}

/**
 * Builds the learner-facing bank for Book 1 Units 11–48 sentence construction.
 *
 * The authored step tokens remain the source of truth. We only add a small set
 * of distractors drawn from already-learned practice material, then shuffle the
 * whole bank with the lesson-session seed. This keeps future targets out of the
 * bank and avoids changing lesson IDs or saved-progress positions.
 */
export function buildLessonOrderBank(args:{
 stepId:string;
 baseTokens:string[];
 answerTokens:string[];
 learnedItems:PracticeItem[];
 currentItem:PracticeItem;
 seed:string;
}):LessonOrderBank{
 const base=[...args.baseTokens];
 if(!lessonOrderEnhancementEnabled(args.stepId)){
  return {tokens:base,order:base.map((_,index)=>index),distractors:[]};
 }

 const current={...args.currentItem,tokens:[...args.answerTokens]};
 const desired=distractorCount(args.answerTokens);
 const generated=sentenceDistractors(
  current,
  [...args.learnedItems,current],
  args.seed+':lesson-order',
  desired+4,
 );
 const distractors=generated
  .filter(token=>!base.includes(token)&&!args.answerTokens.includes(token))
  .filter((token,index,array)=>array.indexOf(token)===index)
  .slice(0,desired);
 const tokens=[...base,...distractors];
 return {
  tokens,
  order:shuffled(tokens.map((_,index)=>index),args.seed+':bank-order'),
  distractors,
 };
}
