import type {Lesson,Phrase,Step,Unit} from '../course/schema.ts';

const ENGAGEMENT_MIN_UNIT=11;
const ENGAGEMENT_MAX_UNIT=48;
const LABELS=['Situation','Quick reply','Context check','Make the call','In the moment'] as const;

function unitNumber(unitId?:string):number|null{
 const match=unitId?.match(/^unit-(\d+)$/);
 return match?Number(match[1]):null;
}
function hash(text:string):number{
 let value=2166136261;
 for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}
 return value>>>0;
}
function labelFor(id:string):string{return LABELS[hash(id)%LABELS.length]}

function contextualPrompt(step:Step,lesson:Lesson,phrases:Record<string,Phrase>):string|undefined{
 const original=step.prompt?.trim();
 if(step.type==='order'){
  const phrase=step.phrase?phrases[step.phrase]:undefined;
  if(original)return `${labelFor(step.id)} · ${original}`;
  if(phrase?.meaning)return `${labelFor(step.id)} · Build the Chinese for “${phrase.meaning}”`;
  return `${labelFor(step.id)} · Build the reply`;
 }
 if(step.type==='select'){
  if(!original)return `${labelFor(step.id)} · Choose what fits this lesson: ${lesson.subtitle}`;
  return `${labelFor(step.id)} · ${original}`;
 }
 if(step.type==='listen'){
  if(original)return `Listen in · ${original}`;
  if(step.semanticAnswer)return 'Listen in · Choose the meaning that matches the whole message';
  return 'Listen in · Choose exactly what you hear';
 }
 return step.prompt;
}

/**
 * Presentation-only engagement pass for the mature Book 1 curriculum.
 *
 * It deliberately changes no IDs, ordering, answers, options, audio, ownership,
 * prerequisites, production contracts, or step counts. Published progress
 * therefore keeps the same indexes and completion bounds while Units 11–48
 * gain more varied, contextual moment-to-moment framing.
 */
export function engageLesson(lesson:Lesson,unit:Unit,phrases:Record<string,Phrase>):Lesson{
 const number=unitNumber(unit.id);
 if(number===null||number<ENGAGEMENT_MIN_UNIT||number>ENGAGEMENT_MAX_UNIT)return lesson;
 return {
  ...lesson,
  steps:lesson.steps.map(step=>{
   if(step.type==='produce'||step.type==='visual')return step;
   const prompt=contextualPrompt(step,lesson,phrases);
   return prompt===step.prompt?step:{...step,prompt};
  }),
 };
}
