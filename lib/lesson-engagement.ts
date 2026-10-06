import type {Lesson,Phrase,Step} from '../course/schema.ts';

const LABELS=['Situation','Quick reply','Context check','Make the call','In the moment'] as const;

function hash(text:string):number{
 let value=2166136261;
 for(let i=0;i<text.length;i++){value^=text.charCodeAt(i);value=Math.imul(value,16777619)}
 return value>>>0;
}
function labelFor(id:string):string{return LABELS[hash(id)%LABELS.length]}

/**
 * Learner-facing framing only. This never mutates or replaces curriculum data.
 * Call it at render time so authored steps, progress indexes and regression
 * baselines remain byte-for-byte stable.
 */
export function engagementPrompt(step:Step,lesson:Lesson,phrases:Record<string,Phrase>):string|undefined{
 const match=lesson.unitId?.match(/^unit-(\d+)$/);
 const unit=match?Number(match[1]):null;
 if(unit===null||unit<11||unit>48||step.type==='produce'||step.type==='visual')return step.prompt;
 const original=step.prompt?.trim();
 if(step.type==='order'){
  const phrase=step.phrase?phrases[step.phrase]:undefined;
  if(original)return `${labelFor(step.id)} · ${original}`;
  if(phrase?.meaning)return `${labelFor(step.id)} · Build the Chinese for “${phrase.meaning}”`;
  return `${labelFor(step.id)} · Build the reply`;
 }
 if(step.type==='select'){
  return original?`${labelFor(step.id)} · ${original}`:`${labelFor(step.id)} · Choose what fits this lesson: ${lesson.subtitle}`;
 }
 if(step.type==='listen'){
  if(original)return `Listen in · ${original}`;
  if(step.semanticAnswer)return 'Listen in · Choose the meaning that matches the whole message';
  return 'Listen in · Choose exactly what you hear';
 }
 return step.prompt;
}
