import {shuffled} from './curriculum.ts';
import {learnedVocabulary,vocabularyLookup,type VocabularyLookupItem} from './vocabulary-lookup.ts';

export function eligibleMegaVocabulary(completed:Set<string>,mastered:Set<string>):VocabularyLookupItem[]{
 return learnedVocabulary(completed).filter(item=>!mastered.has(item.id));
}

export function reverseMegaVocabulary(completed:Set<string>):VocabularyLookupItem[]{
 // Pinyin recall does not require stroke data for every glyph.
 return vocabularyLookup.filter(item=>completed.has(item.lessonId)&&item.characters.length>0);
}

export function scopedMegaVocabulary(completed:Set<string>,unitId?:string,reverse=false):VocabularyLookupItem[]{
 const items=reverse?reverseMegaVocabulary(completed):learnedVocabulary(completed);
 return unitId?items.filter(item=>item.unitId===unitId):items;
}

export {matchesPinyin as matchesMegaPinyin} from './pinyin.ts';

export function makeMegaQueue(items:VocabularyLookupItem[],seed:string):string[]{
 return shuffled([...new Set(items.map(item=>item.id))],seed);
}

export function restoreMegaWord(queue:string[]|null,id:string,learnedIds:Set<string>):string[]|null{
 if(queue===null||!learnedIds.has(id)||queue.includes(id))return queue;
 return [...queue,id];
}

export function combineWordPerfect(perfectSoFar:boolean,assisted:boolean):boolean{
 return perfectSoFar&&!assisted;
}

export function advanceMegaQueue(queue:string[],perfect:boolean):string[]{
 if(!queue.length)return [];
 const [current,...rest]=queue;
 if(perfect)return rest;
 return rest.length?[...rest,current]:[current];
}
