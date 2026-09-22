import {shuffled} from './curriculum.ts';
import {learnedVocabulary,type VocabularyLookupItem} from './vocabulary-lookup.ts';

export function eligibleMegaVocabulary(completed:Set<string>,mastered:Set<string>):VocabularyLookupItem[]{
 return learnedVocabulary(completed).filter(item=>!mastered.has(item.id));
}

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
