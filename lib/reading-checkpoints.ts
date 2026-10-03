import rawReadings from '../course/readings/checkpoints.json' with {type:'json'};
import {characters, vocabulary, units} from '../course/runtime.ts';
import {characterOwners,knownAtUnit,readingPrerequisites,meetsPrerequisites} from './curriculum-relations.ts';
import {readingContracts,readingTokenStatus} from './learning-materials.ts';

export type ReadingGloss = {pinyin:string; meaning:string; note?:string; unfamiliar?:boolean};
export type ReadingLine = {text:string; pinyin:string; translation:string; note:string; speaker?:string; sourcePhraseId?:string};
export type ReadingQuestion = {prompt:string; options:string[]; answer:number; evidence:number[]; explanation:string};
export type ReadingCheckpoint = {id:string;unitId:string;title:string;kind:string;presentation?:'dialogue'|'messages'|'schedule'|'notice';setup:string;version:number;lines:ReadingLine[];questions:ReadingQuestion[];tips:string[];grammarFocus:string[];glosses:Record<string,ReadingGloss>};
const readingUnitOrder=new Map(units.map((unit,index)=>[unit.id,index]));
export const readingCheckpoints:ReadingCheckpoint[] = (rawReadings as ReadingCheckpoint[]).map((reading,index)=>({reading,index})).sort((a,b)=>(readingUnitOrder.get(a.reading.unitId)??Infinity)-(readingUnitOrder.get(b.reading.unitId)??Infinity)||a.index-b.index).map(entry=>entry.reading);
export const readingsForUnit=(unitId:string)=>readingCheckpoints.filter(r=>r.unitId===unitId);
// Compatibility helper for callers that only need the first checkpoint in a set.
export const readingForUnit=(unitId:string)=>readingsForUnit(unitId)[0];
export function readingAvailable(reading:ReadingCheckpoint,completed:Set<string>){
 return meetsPrerequisites(readingPrerequisites(reading.unitId),completed);
}
export type ReadingToken={text:string;gloss?:ReadingGloss};
export function readingCharacterHelp(reading:ReadingCheckpoint,text:string):string[]{
 if(readingTokenStatus(reading.id,text)==='support-only')return [];
 return [...new Set(Array.from(text))].filter(c=>knownAtUnit(characterOwners.get(c),reading.unitId)&&Boolean(characters[c]));
}
const dictionaryCache=new Map<string,Map<string,ReadingGloss>>();
export function readingDictionary(reading:ReadingCheckpoint){
 const cached=dictionaryCache.get(reading.id);if(cached)return cached;
 const end=units.findIndex(u=>u.id===reading.unitId);
 const learnedUnits=units.slice(0,end+1);
 const lessonIds=new Set(learnedUnits.flatMap(u=>u.lessonIds));
 // Word entries are limited to the checkpoint's prerequisites. A reading never
 // makes a later curriculum word canonical or unlocks handwriting/practice.
 const dictionary=new Map<string,ReadingGloss>();
 for(const word of vocabulary)if(lessonIds.has(word.lessonId))dictionary.set(word.text,{pinyin:word.pinyin,meaning:word.meaning});
 // Some formal characters are deliberately not selected for unit handwriting.
 // Characters are fallback help; complete words always take precedence.
 for(const [char,entry] of Object.entries(characters))if(knownAtUnit(characterOwners.get(char),reading.unitId)&&!dictionary.has(char))dictionary.set(char,{pinyin:entry.pinyin,meaning:entry.meaning});
 for(const [word,gloss] of Object.entries(reading.glosses))dictionary.set(word,gloss);
 dictionaryCache.set(reading.id,dictionary);return dictionary;
}
export function tokenizeReading(text:string,reading:ReadingCheckpoint):ReadingToken[]{
 const dictionary=readingDictionary(reading);
 const line=reading.lines.findIndex(l=>l.text===text);
 const segments=readingContracts[reading.id]?.segments[line];
 if(segments&&segments.join('')===text)return segments.map(text=>({text,gloss:dictionary.get(text)}));
 const words=[...dictionary.keys()].sort((a,b)=>b.length-a.length);
 const result:ReadingToken[]=[];
 for(let i=0;i<text.length;){
  const word=words.find(w=>text.startsWith(w,i));
  if(word){result.push({text:word,gloss:dictionary.get(word)});i+=word.length;}
  else{const char=String.fromCodePoint(text.codePointAt(i)!);result.push({text:char});i+=char.length;}
 }
 return result;
}
export type ReadingProgress={version:number;phase:'read'|'questions'|'review';answers:(number|null)[];usedHelp:boolean};
export const freshReadingProgress=(r:ReadingCheckpoint):ReadingProgress=>({version:r.version,phase:'read',answers:r.questions.map(()=>null),usedHelp:false});
export function validReadingProgress(value:unknown,r:ReadingCheckpoint):value is ReadingProgress{
 if(!value||typeof value!=='object')return false;
 const v=value as ReadingProgress;
 return v.version===r.version&&['read','questions','review'].includes(v.phase)&&typeof v.usedHelp==='boolean'&&Array.isArray(v.answers)&&v.answers.length===r.questions.length&&v.answers.every((a,i)=>a===null||(Number.isInteger(a)&&a>=0&&a<r.questions[i].options.length))&&(v.phase!=='review'||v.answers.every(a=>a!==null));
}
export const readingStorageKey=(userKey:string,r:ReadingCheckpoint)=>`hanzi-reading:${encodeURIComponent(userKey)}:${r.id}:v${r.version}`;
export function readReadingProgress(storage:Pick<Storage,'getItem'>,userKey:string,r:ReadingCheckpoint):ReadingProgress{
 try{const value:unknown=JSON.parse(storage.getItem(readingStorageKey(userKey,r))||'null');if(validReadingProgress(value,r))return value;}catch{}
 return freshReadingProgress(r);
}
export const readingScore=(r:ReadingCheckpoint,answers:(number|null)[])=>r.questions.reduce((total,q,i)=>total+Number(answers[i]===q.answer),0);
