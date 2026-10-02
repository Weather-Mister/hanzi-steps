import readings from '../course/readings/checkpoints.json' with {type:'json'};
import rawContracts from '../course/readings/contracts.json' with {type:'json'};
import {characters,grammarRules,lessons,phrases} from '../course/runtime.ts';
import {characterOwners,grammarTeaching,knownAtUnit,lessonPosition,meetsPrerequisites,teachingThroughLesson,wordOwners} from './curriculum-relations.ts';
import {phraseGrammarLinks} from '../course/enrichment/knowledge.ts';
import type {ReadingContract,SentenceRef,TokenStatus} from '../course/materials/schema.ts';
export const readingContracts=rawContracts as Record<string,ReadingContract>;
export function resolveSentence(ref:SentenceRef){
 if(ref.kind==='phrase'){
  const phrase=phrases[ref.id];if(!phrase)return undefined;
  const source=lessons.find(l=>l.steps.some(s=>s.phrase===ref.id&&(s.type==='phrase'||s.type==='order')));
  if(!source)return undefined;
  return {id:'phrase:'+ref.id,text:phrase.text,pinyin:phrase.pinyin,meaning:phrase.meaning,note:phrase.note,lessonId:source.id,unitId:source.unitId!,productive:phrase.practice!==false,grammarIds:[...new Set([...(phrase.grammarIds||[]),...(phraseGrammarLinks[ref.id]||[])])]};
 }
 const reading=readings.find(r=>r.id===ref.readingId),line=reading?.lines[ref.line];
 if(!reading||!line)return undefined;
 return {id:ref.readingId+':'+ref.line,text:line.text,pinyin:line.pinyin,meaning:line.translation,note:line.note,lessonId:lessons.findLast(l=>l.unitId===reading.unitId)?.id||'',unitId:reading.unitId,productive:false,grammarIds:readingContracts[reading.id]?.grammarIds||[]};
}
export function sentenceAvailable(ref:SentenceRef,completed:Set<string>):boolean{
 const sentence=resolveSentence(ref);
 return Boolean(sentence?.productive&&meetsPrerequisites(teachingThroughLesson(sentence.lessonId),completed)&&sentence.grammarIds.every(id=>grammarTeaching.get(id)?.some(l=>completed.has(l))));
}
export function readingTokenStatus(readingId:string,text:string):TokenStatus{
 if(!/\p{Script=Han}/u.test(text))return 'punctuation';
 const reading=readings.find(r=>r.id===readingId);if(!reading)return 'unclassified';
 const gloss=(reading.glosses as Record<string,{unfamiliar?:boolean}>)[text];
 if(gloss?.unfamiliar)return 'support-only';
 const contextual=readingContracts[readingId]?.contextualForms?.[text];
 if(contextual&&contextual.sourceWords.every(w=>knownAtUnit(wordOwners.get(w),reading.unitId)))return 'contextual';
 const owner=wordOwners.get(text);
 if(owner)return knownAtUnit(owner,reading.unitId)?owner===reading.unitId?'recent-target':'learned':'forbidden-future';
 if(gloss&&Array.from(text).filter(c=>/\p{Script=Han}/u.test(c)).every(c=>knownAtUnit(characterOwners.get(c),reading.unitId)))return 'contextual';
 if(Array.from(text).length===1&&knownAtUnit(characterOwners.get(text),reading.unitId))return 'learned';
 return 'unclassified';
}
/** Structural safety only. Reviewed semantic fixtures preserve human adjudication. */
export function validateReadingContracts():string[]{
 const errors:string[]=[];
 for(const r of readings){
  const c=readingContracts[r.id];
  if(!c){errors.push(r.id+': missing contract');continue}
  if(c.origin.kind!=='authored-supplement'||!c.origin.note)errors.push(r.id+': missing origin');
  if(c.segments.length!==r.lines.length)errors.push(r.id+': segment line count');
  for(const [i,line] of r.lines.entries()){
   const segments=c.segments[i]||[];
   if(line.sourcePhraseId){
    const source=resolveSentence({kind:'phrase',id:line.sourcePhraseId});
    const at=lessons.findLast(l=>l.unitId===r.unitId);
    if(!source)errors.push(r.id+': missing source phrase '+line.sourcePhraseId);
    else{
     if(source.text!==line.text||source.pinyin!==line.pinyin||source.meaning!==line.translation)errors.push(r.id+': source phrase drift on line '+i);
     if((lessonPosition.get(source.lessonId)??Infinity)>(lessonPosition.get(at?.id||'')??-1))errors.push(r.id+': future source phrase '+line.sourcePhraseId);
    }
    if(segments.length&&segments.join('')!==line.text)errors.push(r.id+': text drift on line '+i);
   }else{
    if(segments.join('')!==line.text)errors.push(r.id+': text drift on line '+i);
    for(const text of segments){const status=readingTokenStatus(r.id,text);if(status==='unclassified'||status==='forbidden-future')errors.push(r.id+': '+status+' '+text)}
   }
  }
  for(const id of c.grammarIds){
   const at=lessons.findLast(l=>l.unitId===r.unitId);
   if(!grammarRules[id]||!grammarTeaching.get(id)?.some(l=>(lessonPosition.get(l)??Infinity)<=(lessonPosition.get(at?.id||'')??-1)))errors.push(r.id+': future/missing grammar '+id);
  }
  for(const [text,gloss] of Object.entries(r.glosses)){
   if(!gloss.pinyin||!gloss.meaning)errors.push(r.id+': missing gloss '+text);
  }
 }
 return errors;
}
export function sentenceHasKnownCharacters(ref:SentenceRef):boolean{
 const s=resolveSentence(ref);return Boolean(s&&Array.from(s.text).filter(c=>/\p{Script=Han}/u.test(c)).every(c=>characters[c]&&knownAtUnit(characterOwners.get(c),s.unitId)));
}
