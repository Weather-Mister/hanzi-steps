// Bundler-facing assembly only. Curriculum authoring does not edit this file.
import manifest from './manifest.json' with {type:'json'};
import {courseModules} from './registry.generated.ts';
import legacyCharacters from './legacy/characters.json' with {type:'json'};
import order from './legacy/registry-order.json' with {type:'json'};
import type {Character,GrammarRule,Phrase,Lesson,Unit,VocabularyWord} from './schema.ts';

function ordered<T>(records:Record<string,T>,keys:string[]):Record<string,T>{
 return Object.fromEntries([...new Set([...keys,...Object.keys(records)])].filter(k=>k in records).map(k=>[k,records[k]]));
}
export const units:Unit[]=courseModules.map(m=>m.unit);
export const books=manifest.books.map(({units:entries,...book})=>({id:book.id,number:book.number,title:book.title,unitIds:entries.map(e=>e.id),available:book.available}));
export const lessons:Lesson[]=courseModules.flatMap(m=>m.lessons.map(l=>({...l,unitId:m.unit.id,review:l.id===m.reviewLessonId})));
export const vocabulary:VocabularyWord[]=courseModules.flatMap(m=>m.newVocabulary);
export const characters:Record<string,Character>=ordered(Object.assign({},...courseModules.map(m=>m.characters),legacyCharacters),order.characters);
export const grammarRules:Record<string,GrammarRule>=ordered(Object.assign({},...courseModules.map(m=>m.grammarRules)),order.grammarRules);
export const phrases:Record<string,Phrase>=ordered(Object.assign({},...courseModules.map(m=>m.phrases)),order.phrases);
export const characterOrder:string[]=[...new Set(courseModules.flatMap(m=>m.unit.chars))];
