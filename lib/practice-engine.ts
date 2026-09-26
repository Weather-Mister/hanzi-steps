import {books,characters,lessons,phrases,shuffled,units} from './curriculum.ts';
import {learnedVocabulary,vocabularyLookup,type VocabularyLookupItem} from './vocabulary-lookup.ts';

export type PracticeMode='recognition'|'recall'|'pinyin'|'input'|'sentence'|'handwriting'|'context';
export type PracticeSessionKind='lesson'|'daily'|'mega';
export type PracticeSkillState={
 itemId:string;
 mode:PracticeMode;
 attempts:number;
 correct:number;
 assisted:number;
 misses:number;
 streak:number;
 strength:number;
 lastSeen:number;
 nextReview:number;
};
export type PracticeStateMap=Record<string,PracticeSkillState>;

export type PracticeItem={
 id:string;
 kind:'word'|'phrase'|'character';
 traditional:string;
 pinyin:string;
 meaning:string;
 characters:string[];
 unitId?:string;
 unitNumber?:number;
 bookId?:string;
 bookNumber?:number;
 lessonId:string;
 tokens?:string[];
};

export type PracticeContextPrompt={
 sentence:string;
 meaning:string;
 answer:string;
};
export type PracticeQuestion={
 id:string;
 item:PracticeItem;
 mode:PracticeMode;
 sessionKind:PracticeSessionKind;
 context?:PracticeContextPrompt;
};

const skillKey=(itemId:string,mode:PracticeMode)=>itemId+'::'+mode;
export const practiceSkillKey=skillKey;

function phraseItems(completed:Set<string>):PracticeItem[]{
 const seen=new Set<string>();
 const out:PracticeItem[]=[];
 for(const lesson of lessons){
  if(!completed.has(lesson.id))continue;
  for(const step of lesson.steps){
   if(!step.phrase||seen.has(step.phrase))continue;
   const phrase=phrases[step.phrase];
   if(phrase?.practice===false)continue;
   if(!phrase?.tokens?.length)continue;
   const phraseCharacters=Array.from(phrase.text).filter(char=>Boolean(characters[char]));
   // Explanatory/source-metadata cards with no learned Hanzi belong in the lesson
   // but not in adaptive Hanzi practice or Mixed Mastery.
   if(!phraseCharacters.length)continue;
   const unit=units.find(candidate=>candidate.id===lesson.unitId);
   const book=books.find(candidate=>candidate.unitIds.includes(unit?.id||''));
   seen.add(step.phrase);
   out.push({
    id:'phrase:'+step.phrase,
    kind:'phrase',
    traditional:phrase.text,
    pinyin:phrase.pinyin,
    meaning:phrase.meaning,
    characters:phraseCharacters,
    unitId:lesson.unitId,
    unitNumber:unit?.displayNumber??unit?.number,
    bookId:book?.id,
    bookNumber:book?.number,
    lessonId:lesson.id,
    tokens:phrase.tokens,
   });
  }
 }
 return out;
}

export function learnedPracticeItems(completed:Set<string>):PracticeItem[]{
 const words:PracticeItem[]=learnedVocabulary(completed).map(item=>({
  id:item.id,
  kind:'word',
  traditional:item.traditional,
  pinyin:item.pinyin,
  meaning:item.meaning,
  characters:item.characters,
  unitId:item.unitId,
  unitNumber:item.unitNumber,
  bookId:item.bookId,
  bookNumber:item.bookNumber,
  lessonId:item.lessonId,
 }));
 const exactWordChars=new Set(words.filter(item=>Array.from(item.traditional).length===1).map(item=>item.traditional));
 const fallbackCharacters:PracticeItem[]=[];
 for(const char of Object.keys(characters)){
  if(exactWordChars.has(char))continue;
  const lesson=lessons.find(candidate=>completed.has(candidate.id)&&!candidate.review&&candidate.chars.includes(char));
  if(!lesson)continue;
  const unit=units.find(candidate=>candidate.id===lesson.unitId);
  const book=books.find(candidate=>candidate.unitIds.includes(unit?.id||''));
  fallbackCharacters.push({
   id:'char:'+char,kind:'character',traditional:char,pinyin:characters[char].pinyin,meaning:characters[char].meaning,
   characters:[char],unitId:unit?.id,unitNumber:unit?.displayNumber??unit?.number,bookId:book?.id,bookNumber:book?.number,lessonId:lesson.id,
  });
 }
 return uniqueItems([...words,...phraseItems(completed),...fallbackCharacters]);
}

export function adaptivePracticeItems(items:PracticeItem[],mastered:Set<string>):PracticeItem[]{
 return items.filter(item=>!mastered.has(item.id));
}

function supportedModes(item:PracticeItem):PracticeMode[]{
 const base:PracticeMode[]=['recognition','recall','pinyin','input'];
 if(item.kind==='phrase'&&item.tokens?.length)base.push('sentence');
 if(item.characters.length)base.push('handwriting');
 return base;
}
export const practiceModesForItem=supportedModes;

export function stateFor(states:PracticeStateMap,itemId:string,mode:PracticeMode):PracticeSkillState|undefined{
 return states[skillKey(itemId,mode)];
}

export function aggregateItemState(states:PracticeStateMap,item:PracticeItem){
 const records=supportedModes(item).map(mode=>stateFor(states,item.id,mode)).filter(Boolean) as PracticeSkillState[];
 if(!records.length)return {attempts:0,misses:0,strength:0,lastSeen:0,nextReview:0};
 return {
  attempts:records.reduce((sum,row)=>sum+row.attempts,0),
  misses:records.reduce((sum,row)=>sum+row.misses,0),
  strength:records.reduce((sum,row)=>sum+row.strength,0)/records.length,
  lastSeen:Math.max(...records.map(row=>row.lastSeen)),
  nextReview:Math.min(...records.map(row=>row.nextReview||0)),
 };
}

function weakestMode(states:PracticeStateMap,item:PracticeItem,avoidEasy=false):PracticeMode{
 const modes=supportedModes(item).filter(mode=>!avoidEasy||mode!=='recognition');
 const ranked=modes.map(mode=>({mode,row:stateFor(states,item.id,mode)})).sort((a,b)=>{
  const sa=a.row?.strength??0;
  const sb=b.row?.strength??0;
  if(sa!==sb)return sa-sb;
  return (a.row?.attempts??0)-(b.row?.attempts??0);
 });
 return ranked[0]?.mode||'recognition';
}

function choiceField(mode:PracticeMode):'traditional'|'meaning'|'pinyin'|null{
 if(mode==='recognition')return 'meaning';
 if(mode==='recall')return 'traditional';
 if(mode==='pinyin')return 'pinyin';
 return null;
}

function viableMode(item:PracticeItem,mode:PracticeMode,items:PracticeItem[]):PracticeMode{
 const ambiguous=practicePromptIsAmbiguous(item,mode,items);
 if(ambiguous){
  const fallbacks:PracticeMode[]=[
   item.kind==='phrase'&&item.tokens?.length?'sentence':'handwriting',
   'handwriting',
   'input',
   'pinyin',
   'recall',
   'recognition',
  ];
  for(const fallback of fallbacks){
   if(!supportedModes(item).includes(fallback)||fallback===mode)continue;
   if(practicePromptIsAmbiguous(item,fallback,items))continue;
   const field=choiceField(fallback);
   if(field){
    const answer=item[field];
    const values=new Set(items.filter(candidate=>candidate.id!==item.id).map(candidate=>candidate[field]).filter(value=>Boolean(value)&&value!==answer));
    if(values.size<2)continue;
   }
   return fallback;
  }
 }
 const field=choiceField(mode);
 if(!field)return mode;
 const answer=item[field];
 const values=new Set(items.filter(candidate=>candidate.id!==item.id).map(candidate=>candidate[field]).filter(value=>Boolean(value)&&value!==answer));
 if(values.size>=2)return mode;
 if(!practicePromptIsAmbiguous(item,'input',items))return 'input';
 if(item.characters.length&&!practicePromptIsAmbiguous(item,'handwriting',items))return 'handwriting';
 return mode;
}

function dueMode(states:PracticeStateMap,item:PracticeItem,now:number):PracticeMode|undefined{
 return supportedModes(item)
  .map(mode=>stateFor(states,item.id,mode))
  .filter((row):row is PracticeSkillState=>Boolean(row&&row.attempts>0&&row.nextReview<=now))
  .sort((a,b)=>a.nextReview-b.nextReview||a.strength-b.strength)[0]?.mode;
}

function failedMode(states:PracticeStateMap,item:PracticeItem):PracticeMode|undefined{
 return supportedModes(item)
  .map(mode=>stateFor(states,item.id,mode))
  .filter((row):row is PracticeSkillState=>Boolean(row&&row.misses>0&&row.strength<0.72))
  .sort((a,b)=>a.strength-b.strength||b.misses-a.misses)[0]?.mode;
}

function normalizePracticeSurface(value:string):string{
 return value.normalize('NFKC').trim().replace(/[\s，。！？、,.!?;；:：'"“”‘’（）()]/g,'');
}

function normalizePracticeMeaning(value:string):string{
 return value.normalize('NFKC').trim().toLowerCase().replace(/[“”‘’'"]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');
}

function normalizePracticePinyin(value:string):string{
 return value.normalize('NFC').trim().toLowerCase().replace(/\s+/g,' ');
}

function uniqueItems(items:PracticeItem[]):PracticeItem[]{
 const seenIds=new Set<string>();
 const seenSurfaces=new Set<string>();
 return items.filter(item=>{
  const surface=normalizePracticeSurface(item.traditional);
  if(seenIds.has(item.id)||seenSurfaces.has(surface))return false;
  seenIds.add(item.id);
  seenSurfaces.add(surface);
  return true;
 });
}

function practiceAnswerKey(item:PracticeItem,mode:PracticeMode):string{
 if(mode==='recognition')return normalizePracticeMeaning(item.meaning);
 if(mode==='pinyin')return normalizePracticePinyin(item.pinyin);
 if(mode==='sentence')return normalizePracticeSurface((item.tokens||[]).join(''));
 return normalizePracticeSurface(item.traditional);
}

function practicePromptKey(item:PracticeItem,mode:PracticeMode):string{
 if(mode==='recognition')return normalizePracticeSurface(item.traditional);
 if(mode==='pinyin')return normalizePracticeSurface(item.traditional)+'|'+normalizePracticeMeaning(item.meaning);
 if(mode==='recall'||mode==='handwriting')return normalizePracticeMeaning(item.meaning)+'|'+normalizePracticePinyin(item.pinyin);
 if(mode==='input'||mode==='sentence')return normalizePracticeMeaning(item.meaning);
 return normalizePracticeSurface(item.traditional);
}

export function practicePromptIsAmbiguous(item:PracticeItem,mode:PracticeMode,items:PracticeItem[]):boolean{
 const prompt=practicePromptKey(item,mode);
 const answer=practiceAnswerKey(item,mode);
 return items.some(candidate=>
  candidate.id!==item.id&&
  practicePromptKey(candidate,mode)===prompt&&
  practiceAnswerKey(candidate,mode)!==answer
 );
}

export function isWeakPracticeCandidate(states:PracticeStateMap,item:PracticeItem):boolean{
 const rows=supportedModes(item)
  .map(mode=>stateFor(states,item.id,mode))
  .filter((row):row is PracticeSkillState=>Boolean(row));
 const unresolved=rows.filter(row=>row.misses>0&&row.strength<0.72&&row.streak===0);
 if(!unresolved.length)return false;

 // Historical misses should not keep an item weak forever. A later clean recovery
 // clears older weak spots for this item; only a newer mistake can bring it back.
 const latestUnresolved=Math.max(...unresolved.map(row=>row.lastSeen));
 const latestCleanRecovery=Math.max(0,...rows.filter(row=>row.streak>0).map(row=>row.lastSeen));
 return latestUnresolved>latestCleanRecovery;
}

const unitRank=(()=>{
 const map=new Map<string,number>();
 let rank=0;
 for(const book of books)for(const unitId of book.unitIds)map.set(unitId,rank++);
 return map;
})();

function progressRank(item:PracticeItem):number{
 if(item.unitId&&unitRank.has(item.unitId))return unitRank.get(item.unitId)!;
 return (item.bookNumber??0)*1000+(item.unitNumber??0);
}

function recentProgressUnits(items:PracticeItem[],count=4):string[]{
 const seen=new Set<string>();
 return uniqueItems(items)
  .filter(item=>Boolean(item.unitId))
  .sort((a,b)=>progressRank(b)-progressRank(a))
  .flatMap(item=>{
   const unitId=item.unitId!;
   if(seen.has(unitId))return [];
   seen.add(unitId);
   return [unitId];
  })
  .slice(0,count);
}

type DailyRow=ReturnType<typeof aggregateItemState>&{item:PracticeItem};

function hardScore(states:PracticeStateMap,row:DailyRow):number{
 if(row.attempts===0)return 0;
 const weaknessBoost=isWeakPracticeCandidate(states,row.item)?35:0;
 return weaknessBoost+row.misses*12+(1-row.strength)*55;
}

function forgottenScore(row:DailyRow,now:number):number{
 if(row.attempts===0)return 0;
 const overdue=Math.max(0,now-row.nextReview);
 if(overdue<=0)return 0;
 const overdueDays=Math.min(21,overdue/86400000);
 const daysSinceSeen=Math.min(30,Math.max(0,now-row.lastSeen)/86400000);
 return 45+overdueDays*3+daysSinceSeen+(1-row.strength)*30;
}

function memoryRiskScore(row:DailyRow,now:number,frontierRank:number):number{
 const scheduled=forgottenScore(row,now);
 if(scheduled>0)return scheduled+Math.min(18,Math.max(0,frontierRank-progressRank(row.item))*1.5);
 if(row.attempts>0)return 0;

 // For material that predates the mastery tracker, estimate forgetting from
 // curriculum distance. Prefer the middle-back window over constantly falling
 // all the way to Unit 1.
 const distance=Math.max(0,frontierRank-progressRank(row.item));
 if(distance<4)return 0;
 // The best "probably forgotten" window is several units behind the frontier,
 // not the very beginning of the course. Truly old material comes back through
 // actual weakness/due history instead of dominating by age alone.
 if(distance<=9)return 64-Math.abs(distance-5.5)*6;
 if(distance<=14)return 30-(distance-10)*2;
 return 12;
}

function recentScore(states:PracticeStateMap,row:DailyRow,recentUnits:string[],now:number):number{
 const unitIndex=row.item.unitId?recentUnits.indexOf(row.item.unitId):-1;
 const progressBonus=unitIndex<0?0:[46,38,30,24][unitIndex]??18;
 const unseenBonus=row.attempts===0?44:0;
 return progressBonus+unseenBonus+hardScore(states,row)+Math.min(35,forgottenScore(row,now));
}

function randomizedAdaptiveRows(
 rows:DailyRow[],
 seed:string,
 score:(row:DailyRow)=>number,
 jitter=22,
):DailyRow[]{
 if(rows.length<2)return [...rows];
 const noiseOrder=shuffled(rows,seed+':noise');
 const noise=new Map(noiseOrder.map((row,index)=>[
  row.item.id,
  ((index/Math.max(1,noiseOrder.length-1))-.5)*jitter,
 ]));
 return [...rows].sort((a,b)=>
  (score(b)+(noise.get(b.item.id)??0))-(score(a)+(noise.get(a.item.id)??0))
 );
}

function challengeComplexity(item:PracticeItem):number{
 const length=Array.from(item.traditional).length;
 if(item.kind==='phrase')return 34+Math.min(18,length);
 if(item.kind==='word')return length===1?4:16+Math.min(12,length*3);
 return 2;
}

function actualTrouble(row:DailyRow,frontierRank:number,now:number):boolean{
 if(row.attempts===0)return false;
 const distance=Math.max(0,frontierRank-progressRank(row.item));
 const weak=row.misses>0&&row.strength<0.72;
 const overdue=row.nextReview<=now&&row.strength<0.62;
 if(distance<=4)return weak||overdue;
 return row.misses>=2&&row.strength<0.45;
}

function challengeScore(states:PracticeStateMap,row:DailyRow,recentUnits:string[],frontierRank:number,now:number):number{
 const distance=Math.max(0,frontierRank-progressRank(row.item));
 const frontierBonus=distance===0?70:distance===1?36:distance===2?24:distance===3?14:0;
 const unseenBonus=row.attempts===0?28:0;
 const repetitionPenalty=row.attempts>0?Math.min(24,row.attempts*2.5+row.strength*12):0;
 return frontierBonus+unseenBonus+challengeComplexity(row.item)+hardScore(states,row)+Math.min(20,forgottenScore(row,now))-repetitionPenalty;
}

function productiveMode(states:PracticeStateMap,item:PracticeItem,index:number,now:number,forceHard=false):PracticeMode{
 const failed=failedMode(states,item);
 const due=dueMode(states,item,now);
 const requested=failed||due;

 if(requested==='sentence'||requested==='handwriting'||requested==='input'||requested==='pinyin')return requested;
 if(item.kind==='phrase'&&item.tokens?.length)return 'sentence';
 if(item.kind==='character')return 'handwriting';

 // Recognition/recall multiple choice is intentionally not the default here.
 // Adaptive practice should make the learner produce language, not keep asking
 // beginner prompts they can answer on sight.
 if(forceHard&&item.characters.length&&index%3===0)return 'handwriting';
 return index%4===3&&item.characters.length?'handwriting':'input';
}

export function makeDailyTen(items:PracticeItem[],states:PracticeStateMap,seed:string,now=Date.now()):PracticeQuestion[]{
 if(!items.length)return [];
 const shuffledItems=shuffled(uniqueItems(items),seed);
 const withMeta:DailyRow[]=shuffledItems.map(item=>({item,...aggregateItemState(states,item)}));
 const recentUnits=recentProgressUnits(shuffledItems,4);
 const frontierUnit=recentUnits[0];
 const previousUnit=recentUnits[1];
 const secondPreviousUnit=recentUnits[2];
 const frontierRank=Math.max(...withMeta.map(row=>progressRank(row.item)));

 const current=randomizedAdaptiveRows(
  withMeta.filter(row=>row.item.unitId===frontierUnit),
  seed+':current',
  row=>challengeScore(states,row,recentUnits,frontierRank,now),
  34,
 );
 const previous=randomizedAdaptiveRows(
  withMeta.filter(row=>row.item.unitId===previousUnit),
  seed+':previous',
  row=>challengeScore(states,row,recentUnits,frontierRank,now),
  32,
 );
 const secondPrevious=randomizedAdaptiveRows(
  withMeta.filter(row=>row.item.unitId===secondPreviousUnit),
  seed+':second-previous',
  row=>challengeScore(states,row,recentUnits,frontierRank,now),
  28,
 );
 const hard=randomizedAdaptiveRows(
  withMeta.filter(row=>actualTrouble(row,frontierRank,now)),
  seed+':hard',
  row=>hardScore(states,row)+challengeComplexity(row.item),
  18,
 );
 const forgotten=randomizedAdaptiveRows(
  withMeta.filter(row=>{
   const distance=Math.max(0,frontierRank-progressRank(row.item));
   return distance>=3&&distance<=5&&challengeComplexity(row.item)>=16&&memoryRiskScore(row,now,frontierRank)>0;
  }),
  seed+':forgotten',
  row=>memoryRiskScore(row,now,frontierRank)+challengeComplexity(row.item),
  18,
 );

 const picked:PracticeItem[]=[];
 const addRows=(rows:{item:PracticeItem}[],count:number)=>{
  let added=0;
  for(const row of rows){
   if(picked.length>=10||added>=count)break;
   if(picked.some(item=>item.id===row.item.id))continue;
   picked.push(row.item);
   added++;
  }
 };

 // Daily 10 should feel like a rolling learning window, not a single-unit drill:
 // current + previous + second-previous dominate together. Only one slot is
 // reserved for an older genuinely weak/forgotten item.
 addRows(current,4);
 addRows(previous,3);
 addRows(secondPrevious,2);
 addRows([...hard,...forgotten],1);

 addRows([...current,...previous,...secondPrevious],10-picked.length);
 addRows([...hard,...forgotten],10-picked.length);

 const safeFallback=randomizedAdaptiveRows(
  withMeta.filter(row=>{
   const distance=Math.max(0,frontierRank-progressRank(row.item));
   return distance<=3||actualTrouble(row,frontierRank,now);
  }),
  seed+':fallback',
  row=>challengeScore(states,row,recentUnits,frontierRank,now),
  24,
 );
 addRows(safeFallback,10-picked.length);

 const finalPicked=shuffled(picked.slice(0,10),seed+':question-order');
 return finalPicked.map((item,index)=>{
  let mode=productiveMode(states,item,index,now,false);
  mode=viableMode(item,mode,items);
  return {id:'daily:'+seed+':'+index+':'+item.id,item,mode,sessionKind:'daily'};
 });
}

export function megaCheckpointUnits(completed:Set<string>):string[]{
 for(let bookIndex=books.length-1;bookIndex>=0;bookIndex--){
  const completedUnits=books[bookIndex].unitIds.filter(unitId=>unitComplete(completed,unitId));
  const end=Math.floor(completedUnits.length/4)*4;
  if(end>=4)return completedUnits.slice(end-4,end);
 }
 return [];
}

export function megaCheckpointCount(completed:Set<string>):number{
 return books.reduce((sum,book)=>sum+Math.floor(book.unitIds.filter(unitId=>unitComplete(completed,unitId)).length/4),0);
}

function contextSpanInPhrase(phrase:PracticeItem,item:PracticeItem):{start:number;end:number}|null{
 const tokens=phrase.tokens||[];
 const target=normalizePracticeSurface(item.traditional);
 if(!target||!tokens.length)return null;
 for(let start=0;start<tokens.length;start++){
  let joined='';
  for(let end=start;end<tokens.length;end++){
   joined+=tokens[end];
   const normalized=normalizePracticeSurface(joined);
   if(normalized===target)return {start,end:end+1};
   if(normalized.length>target.length)break;
  }
 }
 return null;
}

function mixedMasteryContext(item:PracticeItem,pool:PracticeItem[],seed:string):PracticeContextPrompt|undefined{
 // Single characters are better tested by writing them from memory. Context
 // clozes are for words and short phrases that would otherwise produce weak
 // prompts such as simply showing "one person".
 if(Array.from(item.traditional).length===1)return undefined;

 const candidates=pool.flatMap(candidate=>{
  if(candidate.id===item.id||candidate.kind!=='phrase'||!candidate.tokens?.length)return [];
  const span=contextSpanInPhrase(candidate,item);
  if(!span)return [];
  const targetSurface=normalizePracticeSurface(item.traditional);
  const sentenceSurface=normalizePracticeSurface(candidate.traditional);
  if(!targetSurface||sentenceSurface===targetSurface)return [];
  return [{candidate,span}];
 });
 if(!candidates.length)return undefined;

 const ranked=shuffled(candidates,seed+':contexts').sort((a,b)=>{
  const aLength=Array.from(a.candidate.traditional).length;
  const bLength=Array.from(b.candidate.traditional).length;
  const aWords=a.candidate.tokens?.length??0;
  const bWords=b.candidate.tokens?.length??0;
  return bWords-aWords||bLength-aLength;
 });
 const selected=ranked[0];
 const chosen=selected.candidate;
 const chosenTokens=chosen.tokens||[];
 const rawSpan=chosenTokens.slice(selected.span.start,selected.span.end).join('');
 let sentence=rawSpan?chosen.traditional.replace(rawSpan,'＿＿＿'):chosen.traditional.replace(item.traditional,'＿＿＿');
 // A normalized token span can match even when the target item carries terminal
 // punctuation that the larger sentence does not. Never emit a context question
 // unless the visible prompt actually contains the cloze blank.
 if(!sentence.includes('＿＿＿'))return undefined;
 let meaning=chosen.meaning;

 // Turn a bare existential example into a slightly richer sentence when the
 // learner already knows 這裡. This keeps the grammar familiar while avoiding
 // the exact textbook-sized fragment ("有一個人。") as the prompt.
 const knowsHere=pool.some(candidate=>normalizePracticeSurface(candidate.traditional)==='這裡');
 if(knowsHere&&sentence.startsWith('有')&&!sentence.startsWith('這裡')){
  sentence='這裡'+sentence;
  const cleanMeaning=meaning.trim().replace(/[.!?]+$/,'');
  meaning=cleanMeaning+' here.';
 }

 return {sentence,meaning,answer:item.traditional};
}

export function makeMegaCheckpoint(items:PracticeItem[],states:PracticeStateMap,seed:string,completed?:Set<string>,now=Date.now()):PracticeQuestion[]{
 if(!items.length)return [];
 if(completed&&megaCheckpointCount(completed)===0)return [];

 const source=shuffled(uniqueItems(items),seed+':source');
 const checkpointUnits=completed?megaCheckpointUnits(completed):recentProgressUnits(source,4).reverse();
 if(!checkpointUnits.length)return [];

 const withMeta:DailyRow[]=source.map(item=>({item,...aggregateItemState(states,item)}));
 const checkpointRows=withMeta.filter(row=>row.item.unitId&&checkpointUnits.includes(row.item.unitId));
 const frontierRank=Math.max(...withMeta.map(row=>progressRank(row.item)));

 const picked:PracticeItem[]=[];
 const addRows=(rows:{item:PracticeItem}[],count:number)=>{
  let added=0;
  for(const row of rows){
   if(picked.length>=12||added>=count)break;
   if(picked.some(item=>item.id===row.item.id))continue;
   picked.push(row.item);
   added++;
  }
 };

 // Keep the original Mixed Mastery picker: the latest completed four-unit
 // checkpoint contributes evenly, while complexity, weakness and forgetting
 // decide which material inside each unit deserves another turn.
 for(const unitId of checkpointUnits){
  const rows=randomizedAdaptiveRows(
   checkpointRows.filter(row=>row.item.unitId===unitId),
   seed+':checkpoint:'+unitId,
   row=>challengeComplexity(row.item)+hardScore(states,row)+Math.min(24,forgottenScore(row,now)),
   30,
  );
  addRows(rows,3);
 }

 const checkpointFallback=randomizedAdaptiveRows(
  checkpointRows,
  seed+':checkpoint-fallback',
  row=>challengeComplexity(row.item)+hardScore(states,row)+Math.min(24,forgottenScore(row,now)),
  24,
 );
 addRows(checkpointFallback,12-picked.length);

 const broadFallback=randomizedAdaptiveRows(
  withMeta.filter(row=>row.item.unitId&&!checkpointUnits.includes(row.item.unitId)),
  seed+':broad-fallback',
  row=>hardScore(states,row)+memoryRiskScore(row,now,frontierRank)+challengeComplexity(row.item),
  18,
 );
 addRows(broadFallback,12-picked.length);

 // Context may use any sentence the learner has already completed, including a
 // phrase removed from the adaptive pool after being marked Mega-mastered.
 const learnedContextPool=completed?learnedPracticeItems(completed):[];
 const contextPool=uniqueItems([...source,...learnedContextPool]);
 const finalPicked=shuffled(picked.slice(0,12),seed+':question-order');
 const masteryPattern:PracticeMode[]=['input','handwriting','input','handwriting'];

 return finalPicked.map((item,index)=>{
  const context=mixedMasteryContext(item,contextPool,seed+':'+index+':'+item.id);
  if(context){
   return {id:'mega:'+seed+':'+index+':'+item.id,item,mode:'context',sessionKind:'mega',context};
  }

  let mode:PracticeMode;
  if(item.kind==='character')mode='handwriting';
  else mode=masteryPattern[index%masteryPattern.length];
  mode=viableMode(item,mode,source);

  // Mixed Mastery should stay productive even when no good sentence context is
  // available. Never fall back to a recognition/recall/pinyin choice question.
  if(mode==='recognition'||mode==='recall'||mode==='pinyin'){
   mode=viableMode(item,item.characters.length?'handwriting':'input',source);
  }
  if(mode==='recognition'||mode==='recall'||mode==='pinyin')mode='input';

  return {id:'mega:'+seed+':'+index+':'+item.id,item,mode,sessionKind:'mega'};
 });
}

export function unitComplete(completed:Set<string>,unitId:string):boolean{
 const unit=units.find(candidate=>candidate.id===unitId);
 return Boolean(unit?.lessonIds.length&&completed.has(unit.lessonIds[unit.lessonIds.length-1]));
}

export function practiceAttemptForStep(step:{type:string;char?:string;phrase?:string}):{itemId:string;mode:PracticeMode}|null{
 if(step.phrase){
  if(step.type==='order')return {itemId:'phrase:'+step.phrase,mode:'sentence'};
  return null;
 }
 if(!step.char)return null;
 const word=vocabularyLookup.find(item=>item.traditional===step.char&&Array.from(item.traditional).length===1);
 const itemId=word?.id||'char:'+step.char;
 if(step.type==='memory')return {itemId,mode:'handwriting'};
 if(step.type==='select')return {itemId,mode:'recall'};
 if(step.type==='listen')return {itemId,mode:'recognition'};
 return null;
}

export function updatePracticeState(previous:PracticeSkillState|undefined,args:{
 itemId:string;mode:PracticeMode;correct:boolean;assisted:boolean;now?:number;
}):PracticeSkillState{
 const now=args.now??Date.now();
 const old=previous??{itemId:args.itemId,mode:args.mode,attempts:0,correct:0,assisted:0,misses:0,streak:0,strength:0,lastSeen:0,nextReview:0};
 const cleanCorrect=args.correct&&!args.assisted;
 const streak=cleanCorrect?old.streak+1:0;
 let strength:number;
 if(cleanCorrect)strength=Math.min(1,old.strength+0.16+Math.min(streak,5)*0.02);
 else if(args.correct)strength=Math.max(0.05,old.strength*0.9);
 else strength=Math.max(0,old.strength*0.55);
 const interval=strength<0.2?10*60*1000:strength<0.4?24*60*60*1000:strength<0.65?3*24*60*60*1000:strength<0.82?7*24*60*60*1000:14*24*60*60*1000;
 return {
  itemId:args.itemId,
  mode:args.mode,
  attempts:old.attempts+1,
  correct:old.correct+Number(args.correct),
  assisted:old.assisted+Number(args.assisted),
  misses:old.misses+Number(!args.correct),
  streak,
  strength,
  lastSeen:now,
  nextReview:now+interval,
 };
}

export function distractorPool(item:PracticeItem,items:PracticeItem[],field:'traditional'|'meaning'|'pinyin',seed:string,count=4):string[]{
 const answer=item[field];
 const score=(candidate:PracticeItem)=>{
  let value=0;
  if(candidate.unitId&&candidate.unitId===item.unitId)value+=6;
  if(candidate.bookId&&candidate.bookId===item.bookId)value+=2;
  if(candidate.kind===item.kind)value+=1;
  if(Array.from(candidate.traditional).length===Array.from(item.traditional).length)value+=1;
  if(field==='pinyin'&&candidate.pinyin[0]?.toLowerCase()===item.pinyin[0]?.toLowerCase())value+=1;
  return value;
 };
 const candidates=shuffled(items.filter(candidate=>candidate.id!==item.id),seed)
  .sort((a,b)=>score(b)-score(a))
  .map(candidate=>candidate[field])
  .filter(value=>value&&value!==answer);
 return [answer,...candidates].filter((value,index,array)=>array.indexOf(value)===index).slice(0,count);
}

type SentenceTokenCandidate={
 token:string;
 unitId?:string;
 unitNumber?:number;
 bookId?:string;
 kind:PracticeItem['kind'];
 pinyin?:string;
 meaning?:string;
 phrasePositions:number[];
};

function tokenMeaningWords(value:string|undefined):Set<string>{
 if(!value)return new Set();
 const stop=new Set(['a','an','the','to','of','is','are','am','be','my','your','his','her','their','this','that','these','those','one','some']);
 return new Set(value.toLowerCase().replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(word=>word.length>1&&!stop.has(word)));
}

function visualTokenSimilarity(a:string,b:string):number{
 const aa=Array.from(a),bb=Array.from(b);
 let score=0;
 if(aa.length===bb.length)score+=12;
 if(aa.length>1&&bb.length>1&&new Set(aa).size===1&&new Set(bb).size===1)score+=9;
 const length=Math.min(aa.length,bb.length);
 for(let i=0;i<length;i++){
  const left=characters[aa[i]],right=characters[bb[i]];
  if(!left||!right)continue;
  if(left.layout===right.layout)score+=3;
  if(Math.abs(left.strokes-right.strokes)<=2)score+=3;
  const leftParts=new Set(left.parts.flatMap(part=>[part.label,part.name]).filter(Boolean));
  const shared=right.parts.some(part=>leftParts.has(part.label)||leftParts.has(part.name));
  if(shared)score+=7;
 }
 return score;
}

function sentenceTokenCandidates(items:PracticeItem[]):SentenceTokenCandidate[]{
 const byToken=new Map<string,SentenceTokenCandidate>();
 const upsert=(token:string,item:PracticeItem,position?:number)=>{
  if(!token||Array.from(token).length>4)return;
  const existing=byToken.get(token);
  if(existing){
   if(position!==undefined&&!existing.phrasePositions.includes(position))existing.phrasePositions.push(position);
   if(!existing.meaning&&item.meaning)existing.meaning=item.meaning;
   if(!existing.pinyin&&item.pinyin)existing.pinyin=item.pinyin;
   return;
  }
  byToken.set(token,{
   token,unitId:item.unitId,unitNumber:item.unitNumber,bookId:item.bookId,kind:item.kind,
   pinyin:item.kind==='phrase'?undefined:item.pinyin,
   meaning:item.kind==='phrase'?undefined:item.meaning,
   phrasePositions:position===undefined?[]:[position],
  });
 };
 for(const item of items){
  if(item.kind!=='phrase')upsert(item.traditional,item);
  for(const [index,token] of (item.tokens||[]).entries())upsert(token,item,index);
 }
 return [...byToken.values()];
}

function targetTokenMetadata(token:string,items:PracticeItem[]):SentenceTokenCandidate|undefined{
 return sentenceTokenCandidates(items).find(candidate=>candidate.token===token);
}

export function sentenceDistractors(item:PracticeItem,items:PracticeItem[],seed:string,count?:number):string[]{
 const answerTokens=item.tokens||[];
 if(!answerTokens.length)return [];
 const desired=count??(answerTokens.length<=4?2:answerTokens.length<=7?3:4);
 const answerSet=new Set(answerTokens);
 const targetMeta=answerTokens.map(token=>({token,meta:targetTokenMetadata(token,items)}));
 const targetMeanings=new Set(targetMeta.map(target=>target.meta?.meaning?.trim().toLowerCase()).filter(Boolean));
 const candidates=sentenceTokenCandidates(items).filter(candidate=>{
  if(answerSet.has(candidate.token))return false;
  const meaning=candidate.meaning?.trim().toLowerCase();
  return !meaning||!targetMeanings.has(meaning);
 });

 const score=(candidate:SentenceTokenCandidate)=>{
  let best=0;
  for(const target of targetMeta){
   let value=visualTokenSimilarity(target.token,candidate.token);
   const targetLength=Array.from(target.token).length,candidateLength=Array.from(candidate.token).length;
   if(targetLength===candidateLength)value+=10;
   const targetWords=tokenMeaningWords(target.meta?.meaning);
   const candidateWords=tokenMeaningWords(candidate.meaning);
   const sharedMeaning=[...targetWords].filter(word=>candidateWords.has(word)).length;
   value+=sharedMeaning*14;
   if(target.meta?.pinyin&&candidate.pinyin){
    const a=target.meta.pinyin.toLowerCase(),b=candidate.pinyin.toLowerCase();
    if(a[0]&&a[0]===b[0])value+=3;
    if(a.split(/\s+/).length===b.split(/\s+/).length)value+=2;
   }
   const targetPositions=answerTokens.flatMap((token,index)=>token===target.token?[index]:[]);
   if(candidate.phrasePositions.some(position=>targetPositions.includes(position)))value+=12;
   best=Math.max(best,value);
  }
  if(candidate.unitId&&candidate.unitId===item.unitId)best+=15;
  else if(candidate.bookId&&candidate.bookId===item.bookId){
   const gap=Math.abs((candidate.unitNumber??999)-(item.unitNumber??-999));
   if(gap===1)best+=11;
   else if(gap===2)best+=7;
   else if(gap<=4)best+=3;
  }
  return best;
 };

 const ranked=shuffled(candidates,seed+':sentence-distractors')
  .sort((a,b)=>score(b)-score(a))
  .map(candidate=>candidate.token)
  .filter((token,index,array)=>array.indexOf(token)===index);

 return ranked.slice(0,Math.min(desired,ranked.length));
}

export function fromLookupItem(item:VocabularyLookupItem):PracticeItem{
 return {
  id:item.id,kind:'word',traditional:item.traditional,pinyin:item.pinyin,meaning:item.meaning,
  characters:item.characters,unitId:item.unitId,unitNumber:item.unitNumber,bookId:item.bookId,bookNumber:item.bookNumber,lessonId:item.lessonId,
 };
}
