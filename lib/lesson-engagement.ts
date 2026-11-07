import type {Lesson,Phrase,Step,Unit} from '../course/schema.ts';

export type CumulativeEncounter={
 id:string;
 unitNumber:number;
 title:string;
 blockUnitNumbers:[number,number,number];
 readingId:string;
};
const ENGAGEMENT_MIN_UNIT=11;
const ENGAGEMENT_MAX_UNIT=48;

function unitNumber(unitId?:string):number|null{
 const match=unitId?.match(/^unit-(\d+)$/);
 return match?Number(match[1]):null;
}
function inEngagementRange(lesson:Lesson):boolean{
 const number=unitNumber(lesson.unitId);
 return number!==null&&number>=ENGAGEMENT_MIN_UNIT&&number<=ENGAGEMENT_MAX_UNIT;
}

/**
 * Learner-facing wording only. It is computed at render time so authored
 * steps and regression baselines stay byte-for-byte stable.
 */
export function engagementPrompt(step:Step,lesson:Lesson,phrases:Record<string,Phrase>):string|undefined{
 if(!inEngagementRange(lesson)||step.type==='produce'||step.type==='visual')return step.prompt;
 const original=step.prompt?.trim();
 if(step.type==='order'){
  const phrase=step.phrase?phrases[step.phrase]:undefined;
  if(original)return original;
  if(phrase?.meaning)return `Build the Chinese sentence for “${phrase.meaning}”`;
  return 'Build the sentence';
 }
 if(step.type==='select')return original||'Choose the answer';
 if(step.type==='listen'){
  if(original)return original;
  if(step.semanticAnswer)return 'Choose the meaning that matches the whole message';
  return 'Choose exactly what you hear';
 }
 return step.prompt;
}

/**
 * Thirteen non-overlapping three-unit encounter anchors:
 * 10–12, 13–15, ... 46–48. Each points to an already-reviewed reading
 * checkpoint owned by the closing unit, so no new Chinese or grading contract
 * is invented by the engagement layer.
 */
export function cumulativeEncounterForUnit(unit:Unit,_allUnits:Unit[]):CumulativeEncounter|undefined{
 const number=unitNumber(unit.id);
 if(number===null||number<12||number>48||(number-12)%3!==0)return undefined;
 const readingId=number===48?'reading-unit-48':`reading-unit-${number}-mini`;
 return {
  id:`cumulative-${number-2}-${number}`,
  unitNumber:number,
  title:`Three-unit encounter · Units ${number-2}–${number}`,
  blockUnitNumbers:[number-2,number-1,number],
  readingId,
 };
}

export function cumulativeEncounterUnitNumbers():number[]{
 return Array.from({length:13},(_,index)=>12+index*3);
}
