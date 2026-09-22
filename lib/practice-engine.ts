import {books,characters,lessons,phrases,shuffled,units} from './curriculum.ts';
import {learnedVocabulary,vocabularyLookup,type VocabularyLookupItem} from './vocabulary-lookup.ts';

export type PracticeMode='recognition'|'recall'|'pinyin'|'input'|'sentence'|'handwriting'|'context';
export type PracticeSessionKind='lesson'|'daily'|'revenge'|'mega'|'taiwan';
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

export type PracticeQuestion={
 id:string;
 item:PracticeItem;
 mode:PracticeMode;
 sessionKind:PracticeSessionKind;
};

export type TaiwanMissionStep={
 prompt:string;
 speaker?:string;
 answer:string;
 options:string[];
 note?:string;
};
export type TaiwanMission={
 id:string;
 stamp:string;
 title:string;
 subtitle:string;
 unlockUnitId:string;
 steps:TaiwanMissionStep[];
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
   if(!phrase?.tokens?.length)continue;
   const unit=units.find(candidate=>candidate.id===lesson.unitId);
   const book=books.find(candidate=>candidate.unitIds.includes(unit?.id||''));
   seen.add(step.phrase);
   out.push({
    id:'phrase:'+step.phrase,
    kind:'phrase',
    traditional:phrase.text,
    pinyin:phrase.pinyin,
    meaning:phrase.meaning,
    characters:Array.from(phrase.text).filter(char=>Boolean(characters[char])),
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
 return [...words,...phraseItems(completed),...fallbackCharacters];
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
 const field=choiceField(mode);
 if(!field)return mode;
 const answer=item[field];
 const values=new Set(items.filter(candidate=>candidate.id!==item.id).map(candidate=>candidate[field]).filter(value=>Boolean(value)&&value!==answer));
 return values.size>=2?mode:'input';
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

function uniqueItems(items:PracticeItem[]):PracticeItem[]{
 const seen=new Set<string>();
 return items.filter(item=>{if(seen.has(item.id))return false;seen.add(item.id);return true});
}

export function isRevengeCandidate(states:PracticeStateMap,item:PracticeItem):boolean{
 return supportedModes(item).some(mode=>{const row=stateFor(states,item.id,mode);return Boolean(row&&row.misses>0&&row.strength<0.72)});
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
 const revenge=isRevengeCandidate(states,row.item)?35:0;
 return revenge+row.misses*12+(1-row.strength)*55;
}

function forgottenScore(row:DailyRow,now:number):number{
 if(row.attempts===0)return 0;
 const overdue=Math.max(0,now-row.nextReview);
 if(overdue<=0)return 0;
 const overdueDays=Math.min(21,overdue/86400000);
 const daysSinceSeen=Math.min(30,Math.max(0,now-row.lastSeen)/86400000);
 return 45+overdueDays*3+daysSinceSeen+(1-row.strength)*30;
}

function recentScore(states:PracticeStateMap,row:DailyRow,recentUnits:string[],now:number):number{
 const unitIndex=row.item.unitId?recentUnits.indexOf(row.item.unitId):-1;
 const progressBonus=unitIndex<0?0:[46,38,30,24][unitIndex]??18;
 const unseenBonus=row.attempts===0?44:0;
 return progressBonus+unseenBonus+hardScore(states,row)+Math.min(35,forgottenScore(row,now));
}

function dailyMode(states:PracticeStateMap,item:PracticeItem,index:number,now:number):PracticeMode{
 const failed=failedMode(states,item);
 if(failed)return failed;
 const due=dueMode(states,item,now);
 if(due)return due;

 const productive=supportedModes(item).filter(mode=>mode!=='recognition');
 if(item.kind==='phrase'&&item.tokens?.length&&productive.includes('sentence')){
  const sentence=stateFor(states,item.id,'sentence');
  if(!sentence||sentence.strength<0.72)return 'sentence';
 }
 const attempted=productive
  .map(mode=>({mode,row:stateFor(states,item.id,mode)}))
  .filter(candidate=>Boolean(candidate.row))
  .sort((a,b)=>(a.row?.strength??0)-(b.row?.strength??0)||(a.row?.attempts??0)-(b.row?.attempts??0));
 if(attempted.length)return attempted[0].mode;

 const challengeOrder:Array<Exclude<PracticeMode,'recognition'>>=['recall','input','pinyin','handwriting'];
 const available=challengeOrder.filter(mode=>productive.includes(mode));
 return available[index%available.length]||weakestMode(states,item,true);
}

export function makeDailyTen(items:PracticeItem[],states:PracticeStateMap,seed:string,now=Date.now()):PracticeQuestion[]{
 if(!items.length)return [];
 const shuffledItems=shuffled(uniqueItems(items),seed);
 const withMeta:DailyRow[]=shuffledItems.map(item=>({item,...aggregateItemState(states,item)}));
 const recentUnits=recentProgressUnits(shuffledItems,4);
 const recentSet=new Set(recentUnits);
 const recent=withMeta
  .filter(row=>Boolean(row.item.unitId&&recentSet.has(row.item.unitId)))
  .sort((a,b)=>recentScore(states,b,recentUnits,now)-recentScore(states,a,recentUnits,now));
 const hard=withMeta
  .filter(row=>hardScore(states,row)>35)
  .sort((a,b)=>hardScore(states,b)-hardScore(states,a)||a.strength-b.strength);
 const forgotten=withMeta
  .filter(row=>forgottenScore(row,now)>0)
  .sort((a,b)=>forgottenScore(b,now)-forgottenScore(a,now));

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

 // Daily 10 follows the learner's curriculum frontier first:
 // 2 from each of the newest two units, then 1 from each of the next two.
 const recentQuotas=[2,2,1,1];
 for(let index=0;index<recentUnits.length&&index<recentQuotas.length;index++){
  addRows(recent.filter(row=>row.item.unitId===recentUnits[index]),recentQuotas[index]);
 }
 // Fill any missing part of the six-question recent block from the strongest
 // adaptive candidates in the same four-unit window.
 addRows(recent,Math.max(0,6-picked.length));

 // Reserve the rest for material the learner is actually struggling to retain.
 addRows(hard,2);
 addRows(forgotten,2);

 // If a bucket is short, stay near the curriculum frontier before falling back
 // to older easy material.
 addRows(recent,10-picked.length);
 addRows([...hard,...forgotten],10-picked.length);
 addRows(withMeta.sort((a,b)=>
  recentScore(states,b,recentUnits,now)+hardScore(states,b)+forgottenScore(b,now)-
  (recentScore(states,a,recentUnits,now)+hardScore(states,a)+forgottenScore(a,now))
 ),10-picked.length);

 return picked.slice(0,10).map((item,index)=>{
  let mode=dailyMode(states,item,index,now);
  mode=viableMode(item,mode,items);
  return {id:'daily:'+seed+':'+index+':'+item.id,item,mode,sessionKind:'daily'};
 });
}

export function makeRevengeRound(items:PracticeItem[],states:PracticeStateMap,seed:string):PracticeQuestion[]{
 const candidates=items
  .map(item=>({item,...aggregateItemState(states,item)}))
  .filter(row=>row.attempts>0&&isRevengeCandidate(states,row.item))
  .sort((a,b)=>b.misses-a.misses||a.strength-b.strength||a.lastSeen-b.lastSeen);
 const target=candidates[0]?.item;
 if(!target)return [];
 const modes=supportedModes(target);
 const preferred:PracticeMode[]=[
  failedMode(states,target)||'recall',
  'recognition',
  target.kind==='phrase'?'sentence':'handwriting',
  'pinyin',
  'input',
  ...modes,
 ];
 const chosen:PracticeMode[]=[];
 for(const rawMode of preferred){
  if(!modes.includes(rawMode))continue;
  const mode=viableMode(target,rawMode,items);
  if(!chosen.includes(mode))chosen.push(mode);
  if(chosen.length===3)break;
 }
 return chosen.map((mode,index)=>({
  id:'revenge:'+seed+':'+index+':'+target.id,
  item:target,
  mode,
  sessionKind:'revenge',
 }));
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

export function makeMegaCheckpoint(items:PracticeItem[],states:PracticeStateMap,seed:string,completed?:Set<string>,now=Date.now()):PracticeQuestion[]{
 if(!items.length)return [];
 if(completed&&megaCheckpointCount(completed)===0)return [];

 const source=shuffled(uniqueItems(items),seed+':source');
 const recentUnits=recentProgressUnits(source,6);
 const recentSet=new Set(recentUnits);
 const withMeta:DailyRow[]=source.map(item=>({item,...aggregateItemState(states,item)}));
 const recent=withMeta
  .filter(row=>Boolean(row.item.unitId&&recentSet.has(row.item.unitId)))
  .sort((a,b)=>recentScore(states,b,recentUnits,now)-recentScore(states,a,recentUnits,now));
 const hard=withMeta
  .filter(row=>hardScore(states,row)>28)
  .sort((a,b)=>hardScore(states,b)-hardScore(states,a)||a.strength-b.strength);
 const forgotten=withMeta
  .filter(row=>forgottenScore(row,now)>0)
  .sort((a,b)=>forgottenScore(b,now)-forgottenScore(a,now));

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

 // Mixed Mastery stays centered on the learner's current frontier, but reaches
 // farther back than Daily 10 for weak and overdue material.
 const recentQuotas=[2,2,1,1];
 for(let index=0;index<recentUnits.length&&index<recentQuotas.length;index++){
  addRows(recent.filter(row=>row.item.unitId===recentUnits[index]),recentQuotas[index]);
 }
 addRows(recent,Math.max(0,6-picked.length));
 addRows(hard,3);
 addRows(forgotten,3);
 addRows([...hard,...forgotten,...recent],12-picked.length);
 addRows(withMeta.sort((a,b)=>
  recentScore(states,b,recentUnits,now)+hardScore(states,b)+forgottenScore(b,now)-
  (recentScore(states,a,recentUnits,now)+hardScore(states,a)+forgottenScore(a,now))
 ),12-picked.length);

 return picked.slice(0,12).map((item,index)=>{
  let mode=dailyMode(states,item,index+3,now);
  // Mixed Mastery should skew productive. Recognition is only retained when it
  // is the exact overdue/failed skill that needs review.
  if(mode==='recognition'&&!dueMode(states,item,now)&&!failedMode(states,item)){
   mode=item.kind==='phrase'&&item.tokens?.length?'sentence':'input';
  }
  mode=viableMode(item,mode,source);
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

export const taiwanMissions:TaiwanMission[]=[
 {
  id:'first-conversation',stamp:'👋',title:'First conversation',subtitle:'Greet someone and introduce yourself.',unlockUnitId:'unit-1',
  steps:[
   {speaker:'Other person',prompt:'你好！',answer:'你好！',options:['你好！','我是學生。','你是學生嗎？','是。'],note:'Return the greeting.'},
   {speaker:'Other person',prompt:'你是學生嗎？',answer:'是，我是學生。',options:['是，我是學生。','你是學生嗎？','我是學生嗎？','你好！'],note:'Say yes and answer with a complete sentence.'},
   {speaker:'You',prompt:'Ask whether the other person is a student.',answer:'你是學生嗎？',options:['你是學生嗎？','我是學生。','你是學生。','你好！']},
  ],
 },
 {
  id:'tea-break',stamp:'🍵',title:'Tea break',subtitle:'Talk about drinks and preferences.',unlockUnitId:'unit-5',
  steps:[
   {speaker:'Friend',prompt:'你喜歡喝茶嗎？',answer:'我喜歡喝茶。',options:['我喜歡喝茶。','我喜歡喝咖啡。','我喝茶嗎？','茶很好喝。'],note:'Say that you like tea.'},
   {speaker:'Friend',prompt:'咖啡呢？',answer:'我也喜歡咖啡。',options:['我也喜歡咖啡。','我喜歡喝茶。','咖啡好喝嗎？','你呢？'],note:'Say that you like coffee too.'},
   {speaker:'You',prompt:'Thank your friend.',answer:'謝謝！',options:['謝謝！','請。','你好！','咖啡呢？']},
  ],
 },
 {
  id:'weekend-plan',stamp:'🎬',title:'Make a weekend plan',subtitle:'Suggest an activity and share an opinion.',unlockUnitId:'unit-8',
  steps:[
   {speaker:'Friend',prompt:'我們明天一起去游泳，怎麼樣？',answer:'好啊！',options:['好啊！','我明天去游泳。','我們一起看電影。','你呢？'],note:'Accept the suggestion.'},
   {speaker:'You',prompt:'Suggest watching a movie instead.',answer:'我們一起看電影吧！',options:['我們一起看電影吧！','我們明天一起去游泳。','我覺得游泳很好玩。','今天我們去看電影。']},
   {speaker:'Friend',prompt:'看電影好玩嗎？',answer:'我覺得看電影很好玩。',options:['我覺得看電影很好玩。','我覺得游泳很好玩。','我們一起看電影吧！','好啊！'],note:'Say that you think watching movies is fun.'},
  ],
 },
 {
  id:'buy-a-drink',stamp:'🧋',title:'Buy a drink',subtitle:'Order, choose takeout, and ask the total.',unlockUnitId:'unit-13',
  steps:[
   {speaker:'Clerk',prompt:'外帶還是內用？',answer:'外帶，謝謝。',options:['外帶，謝謝。','內用，謝謝。','一杯茶，謝謝。','請問，多少錢？'],note:'Choose takeout.'},
   {speaker:'You',prompt:'Ask how much it costs altogether.',answer:'請問，一共多少錢？',options:['請問，一共多少錢？','請問，一杯多少錢？','一共一百二十塊。','請幫我微波。']},
   {speaker:'Clerk',prompt:'一百二十塊。',answer:'好的，謝謝。',options:['好的，謝謝。','外帶，謝謝。','請問，一共多少錢？','請幫我微波。']},
  ],
 },
 {
  id:'order-food',stamp:'🍜',title:'Order food',subtitle:'Choose a dish and react to the food.',unlockUnitId:'unit-17',
  steps:[
   {speaker:'Clerk',prompt:'你要吃什麼？',answer:'我要一碗牛肉麵。',options:['我要一碗牛肉麵。','我要一杯茶。','我要一個包子。','我喜歡牛肉麵。'],note:'Order one bowl of beef noodles.'},
   {speaker:'Friend',prompt:'這個有一點辣。',answer:'我不怕辣。',options:['我不怕辣。','我怕辣。','這個有一點辣。','我喜歡甜點。'],note:'Say that spicy food does not bother you.'},
   {speaker:'Friend',prompt:'小籠包也很好吃。',answer:'太好了！',options:['太好了！','我知道。','我怕辣。','有一點辣。'],note:'React enthusiastically.'},
  ],
 },
 {
  id:'find-the-library',stamp:'📚',title:'Find the library',subtitle:'Ask where a place is on campus.',unlockUnitId:'unit-20',
  steps:[
   {speaker:'You',prompt:'Ask where the library is.',answer:'圖書館在哪裡？',options:['圖書館在哪裡？','教室在哪裡？','商店在哪裡？','宿舍在哪裡？']},
   {speaker:'Classmate',prompt:'在教室旁邊。',answer:'謝謝！',options:['謝謝！','很近嗎？','教室在哪裡？','圖書館在哪裡？'],note:'Thank the classmate.'},
   {speaker:'You',prompt:'Confirm that it is nearby.',answer:'很近嗎？',options:['很近嗎？','很遠嗎？','方便嗎？','教室在哪裡？']},
  ],
 },
 {
  id:'make-a-time-plan',stamp:'🕘',title:'Make a time plan',subtitle:'Ask when someone is free and arrange a meeting.',unlockUnitId:'unit-21',
  steps:[
   {speaker:'You',prompt:'Ask when your friend is free.',answer:'你什麼時候有空？',options:['你什麼時候有空？','你今天有空嗎？','你後天有空嗎？','你晚上有空嗎？']},
   {speaker:'Friend',prompt:'我後天有空。晚上七點可以嗎？',answer:'沒問題！',options:['沒問題！','我晚上有空。','下次一起去吧！','你什麼時候有空？'],note:'Confirm that 7 PM works.'},
   {speaker:'You',prompt:'Confirm the plan: meet at 7 PM the day after tomorrow.',answer:'我們後天晚上七點見面。',options:['我們後天晚上七點見面。','我們九點二十分見面。','我中午在餐廳吃飯。','我後天和朋友見面。']},
  ],
 },
 {
  id:'choose-a-ride',stamp:'🚆',title:'Choose a ride',subtitle:'Talk about transport and compare a train with High Speed Rail.',unlockUnitId:'unit-24',
  steps:[
   {speaker:'Friend',prompt:'你怎麼去學校？',answer:'我坐火車去學校。',options:['我坐火車去學校。','我坐高鐵去學校。','我跟朋友去玩。','我明天去學校。'],note:'Say that you are taking the train to school.'},
   {speaker:'Friend',prompt:'火車比較慢。',answer:'高鐵比較快。',options:['高鐵比較快。','火車比較慢。','高鐵車票有一點貴。','高鐵又快又舒服。'],note:'Reply with the faster option.'},
   {speaker:'Friend',prompt:'高鐵又快又舒服。',answer:'好，我坐高鐵去。',options:['好，我坐高鐵去。','我坐火車去學校。','我跟朋友一起去。','高鐵車票有一點貴。'],note:'Choose High Speed Rail.'},
  ],
 },
 {
  id:'directions',stamp:'🚇',title:'Ask for directions',subtitle:'Follow the Shida route from Book 2 in a short exchange.',unlockUnitId:'book-2-unit-3',
  steps:[
   {speaker:'You',prompt:'Ask how to get to Shida.',answer:'請問，到師大怎麼走？',options:['請問，到師大怎麼走？','這附近有銀行嗎？','師大離這裡遠嗎？','在第二個路口右轉嗎？']},
   {speaker:'Passerby',prompt:'到下一個路口，右轉。',answer:'好的。',options:['好的。','左轉嗎？','一直走嗎？','第二個路口嗎？'],note:'Acknowledge the first route step.'},
   {speaker:'Passerby',prompt:'再往前一直走，過第二個紅綠燈。',answer:'謝謝！',options:['謝謝！','好的。','右轉嗎？','下一個路口嗎？'],note:'Thank the person after the final direction.'},
  ],
 },
];

export function availableTaiwanMissions(completed:Set<string>){
 return taiwanMissions.map(mission=>({...mission,unlocked:unitComplete(completed,mission.unlockUnitId)}));
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

export function fromLookupItem(item:VocabularyLookupItem):PracticeItem{
 return {
  id:item.id,kind:'word',traditional:item.traditional,pinyin:item.pinyin,meaning:item.meaning,
  characters:item.characters,unitId:item.unitId,unitNumber:item.unitNumber,bookId:item.bookId,bookNumber:item.bookNumber,lessonId:item.lessonId,
 };
}
