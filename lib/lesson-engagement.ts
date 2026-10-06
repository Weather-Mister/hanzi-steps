import type {Lesson,Phrase,Step,Unit} from '../course/schema.ts';

export type EngagementKind='situation'|'reply'|'voice'|'repair'|'context';
export type EngagementFrame={kind:EngagementKind;label:string;cue:string};
export type CumulativeEncounter={
 id:string;
 unitNumber:number;
 title:string;
 targetMeaning:string;
 targetText:string;
 lines:Array<{unitNumber:number;text:string;pinyin:string;meaning:string}>;
};

const ENGAGEMENT_MIN_UNIT=11;
const ENGAGEMENT_MAX_UNIT=48;

function unitNumber(unitId?:string):number|null{
 const match=unitId?.match(/^unit-(\d+)$/);
 return match?Number(match[1]):null;
}
function hash(text:string):number{
 let value=2166136261;
 for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}
 return value>>>0;
}
function inEngagementRange(lesson:Lesson):boolean{
 const number=unitNumber(lesson.unitId);
 return number!==null&&number>=ENGAGEMENT_MIN_UNIT&&number<=ENGAGEMENT_MAX_UNIT;
}
function assessedCandidates(lesson:Lesson):Step[]{
 return lesson.steps.filter(step=>step.type==='select'||step.type==='order'||step.type==='listen');
}
function repairStepId(lesson:Lesson):string|undefined{
 const candidates=assessedCandidates(lesson);
 return candidates.length?candidates[hash(lesson.id)%candidates.length]?.id:undefined;
}
function chineseChoice(step:Step):boolean{
 const values=[step.answer,...(step.options||[])].filter((value):value is string=>Boolean(value));
 return values.length>=3&&values.every(value=>/[\u3400-\u9fff]/.test(value));
}

/**
 * Render-only engagement metadata. Canonical curriculum objects are never
 * mutated: IDs, indexes, answers, options, accepted production answers and
 * ownership remain exactly as authored.
 */
export function engagementFrame(step:Step,lesson:Lesson):EngagementFrame|undefined{
 if(!inEngagementRange(lesson)||!['select','order','listen'].includes(step.type))return undefined;
 if(repairStepId(lesson)===step.id){
  return {kind:'repair',label:'Repair challenge',cue:`If the first attempt misses, repair the exchange using the same ${lesson.subtitle.toLowerCase()}`};
 }
 if(step.type==='listen')return {kind:'voice',label:'Voice note',cue:`Listen for the detail that matters here: ${lesson.subtitle}`};
 if(step.type==='order')return {kind:'reply',label:'Your reply',cue:`Respond in Chinese to this situation: ${lesson.subtitle}`};
 if(chineseChoice(step))return {kind:'reply',label:'Choose the reply',cue:`Pick the Chinese response that fits: ${lesson.subtitle}`};
 return hash(step.id)%2===0
  ? {kind:'situation',label:'In the situation',cue:`Use the language from this lesson: ${lesson.subtitle}`}
  : {kind:'context',label:'Meaning in context',cue:`Read the whole situation before choosing: ${lesson.subtitle}`};
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
  if(phrase?.meaning)return `Build the Chinese response for “${phrase.meaning}”`;
  return 'Build the reply';
 }
 if(step.type==='select')return original||'Choose what fits this situation';
 if(step.type==='listen'){
  if(original)return original;
  if(step.semanticAnswer)return 'Choose the meaning that matches the whole message';
  return 'Choose exactly what you hear';
 }
 return step.prompt;
}

export function isRepairEngagement(step:Step,lesson:Lesson):boolean{
 return engagementFrame(step,lesson)?.kind==='repair';
}

/**
 * Thirteen non-overlapping three-unit cumulative encounters:
 * 10–12, 13–15, ... 46–48. They reuse only canonical unit goals that have
 * already been taught by the time the owning unit review is complete.
 */
export function cumulativeEncounterForUnit(unit:Unit,allUnits:Unit[]):CumulativeEncounter|undefined{
 const number=unitNumber(unit.id);
 if(number===null||number<12||number>48||(number-12)%3!==0)return undefined;
 const block=[number-2,number-1,number]
  .map(n=>allUnits.find(candidate=>candidate.id===`unit-${n}`))
  .filter((candidate):candidate is Unit=>Boolean(candidate));
 if(block.length!==3)return undefined;
 return {
  id:`cumulative-${number-2}-${number}`,
  unitNumber:number,
  title:`Three-unit encounter · Units ${number-2}–${number}`,
  targetMeaning:unit.goal.meaning,
  targetText:unit.goal.text,
  lines:block.map(candidate=>({
   unitNumber:candidate.number,
   text:candidate.goal.text,
   pinyin:candidate.goal.pinyin,
   meaning:candidate.goal.meaning,
  })),
 };
}

export function cumulativeEncounterUnitNumbers():number[]{
 return Array.from({length:13},(_,index)=>12+index*3);
}
