import {books,characters,lessons,units,vocabulary} from './curriculum';

export type VocabularyLookupItem={
 id:string;
 traditional:string;
 pinyin:string;
 normalizedPinyin:string;
 normalizedSpacedPinyin:string;
 meaning:string;
 characters:string[];
 lessonId:string;
 unitId?:string;
 unitNumber?:number;
 bookId?:string;
 bookNumber?:number;
};

const toneMap:Record<string,string>={
 'ā':'a','á':'a','ǎ':'a','à':'a',
 'ē':'e','é':'e','ě':'e','è':'e','ê':'e',
 'ī':'i','í':'i','ǐ':'i','ì':'i',
 'ō':'o','ó':'o','ǒ':'o','ò':'o',
 'ū':'u','ú':'u','ǔ':'u','ù':'u',
 'ǖ':'v','ǘ':'v','ǚ':'v','ǜ':'v','ü':'v',
 'ń':'n','ň':'n','ǹ':'n','ḿ':'m',
};

export function normalizePinyin(value:string):string{
 return value
  .normalize('NFC')
  .trim()
  .toLowerCase()
  .replace(/u:/g,'v')
  .replace(/[āáǎàēéěèêīíǐìōóǒòūúǔùǖǘǚǜüńňǹḿ]/g,char=>toneMap[char]||char)
  .replace(/[1-5]/g,'')
  .replace(/[^a-zv]+/g,' ')
  .trim()
  .replace(/\s+/g,' ');
}

export const compactPinyin=(value:string)=>normalizePinyin(value).replace(/\s/g,'');

const lessonById=new Map(lessons.map(lesson=>[lesson.id,lesson]));
const unitById=new Map(units.map(unit=>[unit.id,unit]));
const seen=new Set<string>();

export const vocabularyLookup:VocabularyLookupItem[]=vocabulary.flatMap(word=>{
 const dedupeKey=[word.text,word.pinyin,word.meaning].join('\u0000');
 if(seen.has(dedupeKey))return [];
 seen.add(dedupeKey);
 const lesson=lessonById.get(word.lessonId);
 const unit=lesson?.unitId?unitById.get(lesson.unitId):undefined;
 const book=unit?books.find(entry=>entry.unitIds.includes(unit.id)):undefined;
 const normalizedSpacedPinyin=normalizePinyin(word.pinyin);
 return [{
  id:'v1:'+word.lessonId+':'+word.text+':'+normalizedSpacedPinyin.replace(/\s/g,'')+':'+word.meaning,
  traditional:word.text,
  pinyin:word.pinyin,
  normalizedPinyin:normalizedSpacedPinyin.replace(/\s/g,''),
  normalizedSpacedPinyin,
  meaning:word.meaning,
  characters:Array.from(word.text).filter(char=>/[\u3400-\u9fff\uf900-\ufaff]/.test(char)),
  lessonId:word.lessonId,
  unitId:unit?.id,
  unitNumber:unit?.displayNumber??unit?.number,
  bookId:book?.id,
  bookNumber:book?.number,
 }];
});

export function searchVocabulary(query:string,limit=80):VocabularyLookupItem[]{
 const normalizedSpaced=normalizePinyin(query);
 const normalized=normalizedSpaced.replace(/\s/g,'');
 if(!normalized)return [];
 return vocabularyLookup
  .map(item=>{
   let score=99;
   if(item.normalizedPinyin===normalized)score=0;
   else if(item.normalizedPinyin.startsWith(normalized))score=1;
   else if(item.normalizedSpacedPinyin.split(' ').includes(normalizedSpaced))score=2;
   else if(item.normalizedPinyin.includes(normalized))score=3;
   return {item,score};
  })
  .filter(result=>result.score<99)
  .sort((a,b)=>a.score-b.score||a.item.normalizedPinyin.length-b.item.normalizedPinyin.length||a.item.traditional.localeCompare(b.item.traditional,'zh-Hant'))
  .slice(0,limit)
  .map(result=>result.item);
}

export function learnedVocabulary(completed:Set<string>):VocabularyLookupItem[]{
 return vocabularyLookup.filter(item=>
  completed.has(item.lessonId)&&
  item.characters.length>0&&
  item.characters.every(char=>Boolean(characters[char]))
 );
}
