import {listeningItems as curatedListeningItems,listeningSceneIds} from '../course/listening/items.ts';
import {characters,units,books,phrases} from '../course/runtime.ts';
import {shuffled} from './curriculum.ts';
import {resolveSentence,sentenceAvailable} from './learning-materials.ts';
import {lessonPosition} from './curriculum-relations.ts';
import {matchesPinyin} from './pinyin.ts';
import type {ListeningItem,SentenceRef} from '../course/materials/schema.ts';
import type {PracticeQuestion,PracticeStateMap} from './practice-engine.ts';

export {listeningSceneIds};
export type ListeningTask={item:ListeningItem;mode:'meaning'|'pinyin'};
export type ListeningStage={id:string;unitId:string;items:ListeningItem[]};

type Candidate={
 id:string;
 source:SentenceRef;
 sentence:NonNullable<ReturnType<typeof resolveSentence>>;
 position:number;
 unitIndex:number;
};

const unitIndex=new Map(units.map((unit,index)=>[unit.id,index]));
const candidates:Candidate[]=Object.keys(phrases).flatMap(id=>{
 const source={kind:'phrase' as const,id};
 const sentence=resolveSentence(source);
 if(!sentence?.productive)return [];
 return [{id,source,sentence,position:lessonPosition.get(sentence.lessonId)??Number.MAX_SAFE_INTEGER,unitIndex:unitIndex.get(sentence.unitId)??Number.MAX_SAFE_INTEGER}];
});

const curatedBySentence=new Map(curatedListeningItems.flatMap(item=>{
 const sentence=resolveSentence(item.source);
 return sentence?[[sentence.id,item] as const]:[];
}));

function autoDistractors(candidate:Candidate){
 const alternatives=candidates
  .filter(other=>other.sentence.id!==candidate.sentence.id&&other.position<=candidate.position&&other.sentence.meaning!==candidate.sentence.meaning)
  .sort((a,b)=>{
   const sameUnitA=Number(a.sentence.unitId!==candidate.sentence.unitId);
   const sameUnitB=Number(b.sentence.unitId!==candidate.sentence.unitId);
   if(sameUnitA!==sameUnitB)return sameUnitA-sameUnitB;
   const unitDistanceA=Math.abs(candidate.unitIndex-a.unitIndex);
   const unitDistanceB=Math.abs(candidate.unitIndex-b.unitIndex);
   if(unitDistanceA!==unitDistanceB)return unitDistanceA-unitDistanceB;
   return b.position-a.position;
  });
 const seen=new Set<string>();
 return alternatives.filter(other=>{
  if(seen.has(other.sentence.meaning))return false;
  seen.add(other.sentence.meaning);return true;
 }).slice(0,3);
}

const generatedListeningItems:ListeningItem[]=candidates.flatMap(candidate=>{
 if(curatedBySentence.has(candidate.sentence.id))return [];
 const distractors=autoDistractors(candidate);
 if(distractors.length<2)return [];
 return [{
  id:'course-'+candidate.id,
  source:candidate.source,
  modes:['meaning','pinyin'],
  reason:'Listen for the complete sentence rather than matching only one familiar word.',
  distractors:distractors.map(other=>({
   text:other.sentence.meaning,
   rationale:'That meaning belongs to a different sentence you have already learned.',
  })),
 }];
});

export const listeningItems:ListeningItem[]=[...curatedListeningItems,...generatedListeningItems];

function uniqueItems(items:ListeningItem[]){
 const seen=new Set<string>();
 return items.filter(item=>{
  const sentence=resolveSentence(item.source);
  if(!sentence||seen.has(sentence.id))return false;
  seen.add(sentence.id);return true;
 });
}

const itemsByUnit=new Map<string,ListeningItem[]>();
for(const item of listeningItems){
 const sentence=resolveSentence(item.source);
 if(!sentence)continue;
 const list=itemsByUnit.get(sentence.unitId)||[];
 list.push(item);itemsByUnit.set(sentence.unitId,list);
}

/**
 * Listening stages are deliberately cumulative. Each stage starts with its
 * current unit's sentences, then adds recent learned material until it has a
 * useful 3-7 item session. This keeps every stage substantial without creating
 * duplicate curriculum ownership.
 */
export const listeningStages:ListeningStage[]=units.flatMap((unit,index)=>{
 const own=uniqueItems(itemsByUnit.get(unit.id)||[]);
 if(!own.length)return [];
 const recent=units.slice(0,index).reverse().flatMap(previous=>itemsByUnit.get(previous.id)||[]);
 const items=uniqueItems([...own,...recent]).slice(0,7);
 if(items.length<3)return [];
 return [{id:'listening-stage-'+unit.id,unitId:unit.id,items}];
});

export function listeningStageAvailable(stage:ListeningStage,completed:Set<string>){
 const unit=units.find(candidate=>candidate.id===stage.unitId);
 return Boolean(unit&&unit.lessonIds.every(id=>completed.has(id))&&stage.items.every(item=>sentenceAvailable(item.source,completed)));
}

export const listeningItemId=(item:ListeningItem)=>'listening:'+resolveSentence(item.source)!.id;

export function eligibleListening(completed:Set<string>){
 return uniqueItems(listeningItems.filter(item=>sentenceAvailable(item.source,completed)));
}

export function listeningOptions(item:ListeningItem,seed:string){
 const s=resolveSentence(item.source)!;
 return shuffled([{text:s.meaning,correct:true,rationale:item.reason},...item.distractors.map(d=>({...d,correct:false}))],seed);
}

export const listeningPinyinCorrect=(task:ListeningTask,value:string)=>matchesPinyin(value,resolveSentence(task.item.source)!.pinyin);

export function listeningQuestion(item:ListeningItem,mode:'meaning'|'pinyin',id:string):PracticeQuestion{
 const s=resolveSentence(item.source)!,unit=units.find(u=>u.id===s.unitId),book=books.find(b=>b.unitIds.includes(s.unitId));
 return {id,item:{id:listeningItemId(item),kind:'phrase',traditional:s.text,pinyin:s.pinyin,meaning:s.meaning,characters:Array.from(s.text).filter(c=>Boolean(characters[c])),lessonId:s.lessonId,unitId:s.unitId,unitNumber:unit?.displayNumber??unit?.number,bookId:book?.id,bookNumber:book?.number},mode:mode==='meaning'?'recognition':'pinyin',sessionKind:'daily',listening:{item,mode}};
}

/** At most one due listening task; never removes a cumulative connection task. */
export function interleaveListening(queue:PracticeQuestion[],completed:Set<string>,states:PracticeStateMap,seed:string,enabled:boolean,now=Date.now()):PracticeQuestion[]{
 if(!enabled||!queue.length)return queue;
 const eligible=shuffled(eligibleListening(completed).filter(item=>{const row=states[listeningItemId(item)+'::recognition'];return !row||row.nextReview<=now}),seed).sort((a,b)=>(states[listeningItemId(a)+'::recognition']?.nextReview||0)-(states[listeningItemId(b)+'::recognition']?.nextReview||0));
 if(!eligible.length)return queue;
 const index=queue.findLastIndex(q=>!q.knowledge&&!q.listening);if(index<0)return queue;
 const next=queue.slice();next[index]=listeningQuestion(eligible[0],'meaning',seed+':listening');return next;
}
