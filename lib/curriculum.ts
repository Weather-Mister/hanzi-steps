// Stable app adapter. Add units through course/manifest.json; see ADDING_A_UNIT.md.
import {characters,characterOrder,lessons,units,books,vocabulary} from '../course/runtime.ts';
import type {Step,Lesson,Session,Unit} from '../course/schema.ts';
import {courseModules} from '../course/registry.generated.ts';
import {completedLessonIds,previousLessonLengths,historicalLessonLengthsFor} from './lesson-revisions.ts';
export {completedLessonIds,previousLessonLengths,additionalPreviousLessonLengths,historicalLessonLengthsFor} from './lesson-revisions.ts';
export * from '../course/schema.ts';
export {characters,characterOrder,lessons,units,books,vocabulary,grammarRules,phrases} from '../course/runtime.ts';
export const wordMeaning=(text:string)=>vocabulary.find(w=>w.text===text)?.meaning||characters[text]?.meaning||'';
export function unitLibraryCharacters(unit:Unit):string[]{return courseModules.find(m=>m.unit.id===unit.id)?.newCharacters.slice()||[];}
function characterSteps(c:string):Step[]{
 const d=characters[c];
 const list:Omit<Step,'id'>[]=[{type:'intro',char:c},{type:'trace',char:c}];
 if(d.partQuestion)list.push({type:'parts',char:c,...d.partQuestion});
 // Display layout can improve without inserting a step into saved practice sessions.
 if(d.practiceBuild??(d.layout!=='whole'))list.push({type:'build',char:c});
 list.push({type:'complete',char:c},{type:'select',char:c,prompt:`Which character means “${d.meaning}”?`,answer:c,options:characterOrder.filter(x=>x===c||(['你','好','我','是'].includes(x))).slice(0,4),explanation:`${c} (${d.pinyin}) means ${d.meaning}.`},{type:'memory',char:c});
 const select=list.find(s=>s.type==='select')!;
 select.options=[c,...characterOrder.filter(x=>x!==c).slice(0,3)];
 return list.map((step,i)=>({...step,id:`${c}-${i}`}));
}
export function lessonAvailable(lessonId:string,completed:Set<string>){const done=completedLessonIds(completed);const i=lessons.findIndex(l=>l.id===lessonId);return i>=0&&(done.has(lessonId)||books.some(b=>units.find(u=>u.id===b.unitIds[0])?.lessonIds[0]===lessonId)||done.has(lessons[i-1]?.id));}
export function characterPracticeAvailable(char:string,completed:Set<string>){
 const owner=lessons.find(lesson=>!lesson.review&&lesson.chars.includes(char));
 return Boolean(owner&&completedLessonIds(completed).has(owner.id));
}
export function practiceLesson(char:string):Lesson {return {id:`practice-${char}`,title:`Practice ${char}`,subtitle:characters[char].meaning,chars:[char],minutes:'3–4 min',steps:characterSteps(char)}}
export function findLesson(id:string){return lessons.find(x=>x.id===id)||(id.startsWith('practice-')&&characters[id.slice(9)]?practiceLesson(id.slice(9)):undefined)}
export function shuffled<T>(items:T[],seed:string):T[]{
 let n=Array.from(seed).reduce((a,c)=>Math.imul(a^c.charCodeAt(0),16777619)>>>0,2166136261);
 const copy=[...items];for(let i=copy.length-1;i>0;i--){n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[copy[i],copy[j]]=[copy[j],copy[i]]}return copy;
}
export function validSession(value:unknown):value is Session {
 if(!value||typeof value!=='object')return false;const s=value as Session;if(typeof s.lessonId!=='string')return false;
 const historical=historicalLessonLengthsFor(s.lessonId);
 const currentLength=findLesson(s.lessonId)?.steps.length;
 const length=currentLength??historical[historical.length-1];
 return typeof length==='number'&&typeof s.id==='string'&&/^[a-zA-Z0-9-]{20,80}$/.test(s.id)&&Number.isInteger(s.index)&&s.index>=0&&s.index<=length&&Number.isInteger(s.independent)&&s.independent>=0&&Number.isInteger(s.assisted)&&s.assisted>=0&&s.independent+s.assisted<=s.index&&typeof s.complete==='boolean'&&(s.complete ? (s.index===length || historical.includes(s.index)) : s.index<length)&&Number.isFinite(s.updatedAt);
}

// Historical named exports, retained for callers and checkpoint fixtures.
export const unitOneLessons=courseModules.find(m=>m.unit.id==='unit-1')!.lessons;
export const unitOneCharacterOrder=courseModules.find(m=>m.unit.id==='unit-1')!.unit.chars;
export const unitTwoLessons=courseModules.find(m=>m.unit.id==='unit-2')!.lessons;
export const unitTwoCharacterOrder=courseModules.find(m=>m.unit.id==='unit-2')!.unit.chars;
export const unitThreeLessons=courseModules.find(m=>m.unit.id==='unit-3')!.lessons;
export const unitThreeCharacterOrder=courseModules.find(m=>m.unit.id==='unit-3')!.unit.chars;
export const unitFourLessons=courseModules.find(m=>m.unit.id==='unit-4')!.lessons;
export const unitFourCharacterOrder=courseModules.find(m=>m.unit.id==='unit-4')!.unit.chars;
export const unitFiveLessons=courseModules.find(m=>m.unit.id==='unit-5')!.lessons;
export const unitFiveCharacterOrder=courseModules.find(m=>m.unit.id==='unit-5')!.unit.chars;
export const unitSixLessons=courseModules.find(m=>m.unit.id==='unit-6')!.lessons;
export const unitSixCharacterOrder=courseModules.find(m=>m.unit.id==='unit-6')!.unit.chars;
export const bookTwoLessons=courseModules.find(m=>m.unit.id==='book-2-unit-1')!.lessons;
export const unitFiveCharacters=courseModules.find(m=>m.unit.id==='unit-5')!.characters;
export const unitFiveGrammar=courseModules.find(m=>m.unit.id==='unit-5')!.grammarRules;
export const unitFivePhrases=courseModules.find(m=>m.unit.id==='unit-5')!.phrases;
export const unitFiveVocabulary=courseModules.find(m=>m.unit.id==='unit-5')!.newVocabulary;
