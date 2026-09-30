/** Read-only indexes over canonical declarations. Browsing and handwriting
 * availability deliberately do not participate in these learning selectors. */
import {courseModules} from '../course/registry.generated.ts';
import {books,characters,lessons,units,vocabulary} from '../course/runtime.ts';
import type {VocabularyWord} from '../course/schema.ts';

export const unitPosition=new Map(units.map((u,i)=>[u.id,i]));
export const lessonPosition=new Map(lessons.map((l,i)=>[l.id,i]));
export const wordByText=new Map(vocabulary.map(w=>[w.text,w]));
export const characterOwners=new Map(courseModules.flatMap(m=>m.newCharacters.map(c=>[c,m.unit.id] as const)));
export const wordOwners=new Map(courseModules.flatMap(m=>m.newVocabulary.map(w=>[w.text,m.unit.id] as const)));
const characterTeaching=new Map<string,string[]>();
for(const m of courseModules)for(const char of m.newCharacters){
 const ids=m.lessons.filter(l=>l.steps.some(s=>s.type==='intro'&&s.char===char)).map(l=>l.id);
 characterTeaching.set(char,[...new Set([...ids,...m.newVocabulary.filter(w=>w.text.includes(char)).map(w=>w.lessonId)])]);
}
export const grammarTeaching=new Map<string,string[]>();
for(const lesson of lessons)for(const step of lesson.steps)if(step.type==='grammar'&&step.grammar){
 grammarTeaching.set(step.grammar,[...new Set([...(grammarTeaching.get(step.grammar)||[]),lesson.id])]);
}
export const learnedCharacter=(char:string,completed:Set<string>)=>(characterTeaching.get(char)||[]).some(id=>completed.has(id));
export const learnedWord=(text:string,completed:Set<string>)=>completed.has(wordByText.get(text)?.lessonId||'');
export const learnedGrammar=(id:string,completed:Set<string>)=>(grammarTeaching.get(id)||[]).some(l=>completed.has(l));
const wordsByCharacter=new Map<string,VocabularyWord[]>();
for(const word of vocabulary)for(const char of new Set(Array.from(word.text))){
 if(!characters[char])continue;
 wordsByCharacter.set(char,[...(wordsByCharacter.get(char)||[]),word]);
}
export const learnedWordsForCharacter=(char:string,completed:Set<string>)=>(wordsByCharacter.get(char)||[]).filter(w=>completed.has(w.lessonId));
export function knownAtUnit(owner:string|undefined,unitId:string):boolean{
 const start=owner?unitPosition.get(owner):undefined,end=unitPosition.get(unitId);
 return start!==undefined&&end!==undefined&&start<=end;
}
const boundaryCache=new Map<string,string[]>();
/** Conservative cumulative contract. Reviews do not stand in for teaching. */
export function teachingThroughLesson(lessonId:string):string[]{
 const cached=boundaryCache.get(lessonId);if(cached)return cached;
 const end=lessonPosition.get(lessonId);if(end===undefined)return [];
 const ids=lessons.slice(0,end+1).filter(l=>!l.review).map(l=>l.id);
 boundaryCache.set(lessonId,ids);return ids;
}
export function readingPrerequisites(unitId:string):string[]{
 const unit=units.find(u=>u.id===unitId),review=unit?.lessonIds.at(-1);
 return review?[...teachingThroughLesson(review),review]:[];
}
export const meetsPrerequisites=(ids:string[],completed:Set<string>)=>ids.length>0&&ids.every(id=>completed.has(id));
export const missingPrerequisites=(ids:string[],completed:Set<string>)=>ids.filter(id=>!completed.has(id));
export function prerequisiteHint(ids:string[],completed:Set<string>):string|undefined{
 const id=ids.find(id=>!completed.has(id)),lesson=lessons.find(l=>l.id===id);
 if(!lesson)return undefined;
 const unit=units.find(u=>u.id===lesson.unitId),book=books.find(b=>b.unitIds.includes(lesson.unitId||''));
 return `Next prerequisite: Book ${book?.number} · Unit ${unit?.displayNumber??unit?.number} · ${lesson.title}`;
}
