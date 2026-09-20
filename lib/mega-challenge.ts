import {shuffled} from './curriculum';
import {learnedVocabulary,type VocabularyLookupItem} from './vocabulary-lookup';

export function eligibleMegaVocabulary(completed:Set<string>,mastered:Set<string>):VocabularyLookupItem[]{
 return learnedVocabulary(completed).filter(item=>!mastered.has(item.id));
}

export function makeMegaQueue(items:VocabularyLookupItem[],seed:string):string[]{
 return shuffled(items.map(item=>item.id),seed);
}

export function advanceMegaQueue(queue:string[],perfect:boolean):string[]{
 if(!queue.length)return [];
 const [current,...rest]=queue;
 if(perfect)return rest;
 return rest.length?[...rest,current]:[current];
}
