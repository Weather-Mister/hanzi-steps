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

function uniqueItems(items:PracticeItem[]):PracticeItem[]{
 const seen=new Set<string>();
 return items.filter(item=>{if(seen.has(item.id))return false;seen.add(item.id);return true});
}

export function isRevengeCandidate(states:PracticeStateMap,item:PracticeItem):boolean{
 return supportedModes(item).some(mode=>{const row=stateFor(states,item.id,mode);return Boolean(row&&row.misses>0&&row.strength<0.72)});
}

export function makeDailyTen(items:PracticeItem[],states:PracticeStateMap,seed:string,now=Date.now()):PracticeQuestion[]{
 if(!items.length)return [];
 const shuffledItems=shuffled(uniqueItems(items),seed);
 const withMeta=shuffledItems.map(item=>({item,...aggregateItemState(states,item)}));
 const due=withMeta.filter(row=>row.attempts>0&&row.nextReview<=now).sort((a,b)=>a.nextReview-b.nextReview||a.strength-b.strength);
 const weak=withMeta.filter(row=>row.attempts>0&&(row.strength<0.45||isRevengeCandidate(states,row.item))).sort((a,b)=>a.strength-b.strength||b.misses-a.misses);
 const unseen=withMeta.filter(row=>row.attempts===0).sort((a,b)=>(b.item.bookNumber??0)-(a.item.bookNumber??0)||(b.item.unitNumber??0)-(a.item.unitNumber??0));
 const recent=withMeta.filter(row=>row.attempts>0).sort((a,b)=>b.lastSeen-a.lastSeen);

 const picked:PracticeItem[]=[];
 const add=(rows:{item:PracticeItem}[],count:number)=>{
  for(const row of rows){
   if(picked.length>=10||count<=0)break;
   if(picked.some(item=>item.id===row.item.id))continue;
   picked.push(row.item);count--;
  }
 };
 add(due,4);
 add(weak,3);
 add(unseen,2);
 add(recent,10-picked.length);
 add(withMeta,10-picked.length);

 return picked.slice(0,10).map((item,index)=>{
  let mode=weakestMode(states,item,index===9);
  if(index===9&&item.kind==='phrase'&&item.tokens?.length)mode='sentence';
  else if(index===9&&item.characters.length)mode='handwriting';
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
 const preferred:PracticeMode[]=['recognition','recall',target.kind==='phrase'?'sentence':'handwriting'];
 const chosen=preferred.filter(mode=>modes.includes(mode));
 while(chosen.length<3){
  const candidate=weakestMode(states,target,true);
  if(!chosen.includes(candidate))chosen.push(candidate);else break;
 }
 return chosen.slice(0,3).map((mode,index)=>({
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

export function makeMegaCheckpoint(items:PracticeItem[],states:PracticeStateMap,seed:string,completed?:Set<string>):PracticeQuestion[]{
 if(!items.length)return [];
 const checkpointUnits=completed?megaCheckpointUnits(completed):[];
 const source=checkpointUnits.length?items.filter(item=>item.unitId&&checkpointUnits.includes(item.unitId)):items;
 if(!source.length)return [];
 const unitIds=checkpointUnits.length?checkpointUnits:[...new Set(source.map(item=>item.unitId||'other'))];
 const byUnit=new Map<string,PracticeItem[]>();
 for(const item of source){
  const key=item.unitId||'other';
  byUnit.set(key,[...(byUnit.get(key)||[]),item]);
 }
 const spread:PracticeItem[]=[];
 for(let round=0;round<3&&spread.length<12;round++){
  for(const unitId of unitIds){
   const pool=shuffled(byUnit.get(unitId)||[],seed+':'+unitId);
   const item=pool[round];
   if(item&&!spread.some(existing=>existing.id===item.id))spread.push(item);
   if(spread.length>=12)break;
  }
 }
 if(spread.length<12){
  for(const item of shuffled(source,seed+':fill')){
   if(!spread.some(existing=>existing.id===item.id))spread.push(item);
   if(spread.length>=12)break;
  }
 }
 const cycle:PracticeMode[]=['recall','input','pinyin','sentence','handwriting','recall'];
 return spread.slice(0,12).map((item,index)=>{
  const modes=supportedModes(item);
  let mode=cycle[index%cycle.length];
  if(!modes.includes(mode))mode=weakestMode(states,item,true);
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
 if(step.type==='memory'||step.type==='trace'||step.type==='complete')return {itemId,mode:'handwriting'};
 if(step.type==='select')return {itemId,mode:'recall'};
 if(step.type==='listen'||step.type==='parts'||step.type==='build')return {itemId,mode:'recognition'};
 return null;
}

export const taiwanMissions:TaiwanMission[]=[
 {
  id:'first-conversation',stamp:'👋',title:'First conversation',subtitle:'Greet someone and introduce yourself.',unlockUnitId:'unit-1',
  steps:[
   {speaker:'對方',prompt:'你好！',answer:'你好！',options:['你好！','我是學生。','你是學生嗎？','是。'],note:'Return the greeting.'},
   {speaker:'對方',prompt:'你是學生嗎？',answer:'是，我是學生。',options:['是，我是學生。','你是學生嗎？','我是學生嗎？','你好！'],note:'Say yes and answer with a complete sentence.'},
   {speaker:'你',prompt:'Ask whether the other person is a student.',answer:'你是學生嗎？',options:['你是學生嗎？','我是學生。','你是學生。','你好！']},
  ],
 },
 {
  id:'tea-break',stamp:'🍵',title:'Tea break',subtitle:'Talk about drinks and preferences.',unlockUnitId:'unit-5',
  steps:[
   {speaker:'朋友',prompt:'你喜歡喝茶嗎？',answer:'我喜歡喝茶。',options:['我喜歡喝茶。','我喜歡喝咖啡。','我喝茶嗎？','茶很好喝。'],note:'Say that you like tea.'},
   {speaker:'朋友',prompt:'咖啡呢？',answer:'我也喜歡咖啡。',options:['我也喜歡咖啡。','我喜歡喝茶。','咖啡好喝嗎？','你呢？'],note:'Say that you like coffee too.'},
   {speaker:'你',prompt:'Thank your friend.',answer:'謝謝！',options:['謝謝！','請。','你好！','咖啡呢？']},
  ],
 },
 {
  id:'weekend-plan',stamp:'🎬',title:'Make a weekend plan',subtitle:'Suggest an activity and agree on a plan.',unlockUnitId:'unit-8',
  steps:[
   {speaker:'朋友',prompt:'明天一起看電影，怎麼樣？',answer:'好啊！',options:['好啊！','一起游泳吧！','可以嗎？','明天呢？'],note:'Accept the plan.'},
   {speaker:'你',prompt:'Suggest swimming instead.',answer:'一起游泳吧！',options:['一起游泳吧！','一起看電影吧！','明天看電影。','可以嗎？']},
   {speaker:'朋友',prompt:'游泳可以嗎？',answer:'好啊！',options:['好啊！','看電影吧！','明天呢？','不可以。'],note:'Agree.'},
  ],
 },
 {
  id:'buy-a-drink',stamp:'🧋',title:'Buy a drink',subtitle:'Order, choose takeout, and ask the total.',unlockUnitId:'unit-13',
  steps:[
   {speaker:'店員',prompt:'內用還是外帶？',answer:'外帶，謝謝。',options:['外帶，謝謝。','內用，謝謝。','一杯茶，謝謝。','請問，多少錢？'],note:'Choose takeout.'},
   {speaker:'你',prompt:'Ask how much it costs altogether.',answer:'請問，一共多少錢？',options:['請問，一共多少錢？','請問，一杯多少錢？','一共一百二十塊。','請幫我微波。']},
   {speaker:'店員',prompt:'一百二十塊。',answer:'好的，謝謝。',options:['好的，謝謝。','外帶，謝謝。','請問，一共多少錢？','請幫我微波。']},
  ],
 },
 {
  id:'order-food',stamp:'🍜',title:'Order food',subtitle:'Choose a dish and react to the food.',unlockUnitId:'unit-17',
  steps:[
   {speaker:'店員',prompt:'你要吃什麼？',answer:'我要一碗牛肉麵。',options:['我要一碗牛肉麵。','我要一杯茶。','我要一個包子。','我喜歡牛肉麵。'],note:'Order one bowl of beef noodles.'},
   {speaker:'朋友',prompt:'這個有一點辣。',answer:'我不怕辣。',options:['我不怕辣。','我怕辣。','這個有一點辣。','我喜歡甜點。'],note:'Say that spicy food does not bother you.'},
   {speaker:'朋友',prompt:'小籠包也很好吃。',answer:'太好了！',options:['太好了！','我知道。','我怕辣。','有一點辣。'],note:'React enthusiastically.'},
  ],
 },
 {
  id:'find-the-library',stamp:'📚',title:'Find the library',subtitle:'Ask where a place is on campus.',unlockUnitId:'unit-20',
  steps:[
   {speaker:'你',prompt:'Ask where the library is.',answer:'圖書館在哪裡？',options:['圖書館在哪裡？','教室在哪裡？','商店在哪裡？','宿舍在哪裡？']},
   {speaker:'同學',prompt:'在教室旁邊。',answer:'謝謝！',options:['謝謝！','真的嗎？','很遠嗎？','歡迎！']},
   {speaker:'你',prompt:'Confirm that it is nearby.',answer:'很近嗎？',options:['很近嗎？','很遠嗎？','方便嗎？','教室在哪裡？']},
  ],
 },
 {
  id:'make-a-time-plan',stamp:'🕘',title:'Make a time plan',subtitle:'Ask when someone is free and arrange a meeting.',unlockUnitId:'unit-23',
  steps:[
   {speaker:'你',prompt:'Ask when your friend is free.',answer:'你什麼時候有空？',options:['你什麼時候有空？','你今天有空嗎？','你在哪裡？','你最近忙嗎？']},
   {speaker:'朋友',prompt:'我下午有空。',answer:'那我們下午見面吧！',options:['那我們下午見面吧！','那我們明天見面吧！','我下午很忙。','你下午有空嗎？'],note:'Suggest meeting in the afternoon.'},
   {speaker:'朋友',prompt:'下午三點可以嗎？',answer:'可以，沒問題！',options:['可以，沒問題！','我下午很忙。','下次見。','幾點？'],note:'Confirm the time.'},
  ],
 },
 {
  id:'take-the-train',stamp:'🚆',title:'Take the train',subtitle:'Talk about how you are getting somewhere.',unlockUnitId:'unit-25',
  steps:[
   {speaker:'朋友',prompt:'你怎麼去？',answer:'我坐火車去。',options:['我坐火車去。','我跟朋友一起去。','我明天去。','我坐火車來。'],note:'Say that you are taking the train.'},
   {speaker:'朋友',prompt:'坐火車比較快。',answer:'好，我坐火車。',options:['好，我坐火車。','我坐火車比較慢。','我跟朋友一起去。','我不坐火車。'],note:'Agree and choose the train.'},
   {speaker:'你',prompt:'Say you are going with a friend.',answer:'我跟朋友一起去。',options:['我跟朋友一起去。','我一個人去。','我跟朋友一起吃飯。','我坐火車去。']},
  ],
 },
 {
  id:'directions',stamp:'🚇',title:'Ask for directions',subtitle:'Use the Book 2 direction language in a short exchange.',unlockUnitId:'book-2-unit-3',
  steps:[
   {speaker:'你',prompt:'Ask how to get to the bank.',answer:'請問，到銀行怎麼走？',options:['請問，到銀行怎麼走？','這附近有銀行嗎？','銀行離這裡遠嗎？','在第二個路口右轉嗎？']},
   {speaker:'路人',prompt:'從這裡往前一直走，到第二個路口，再右轉。',answer:'在第二個路口右轉嗎？',options:['在第二個路口右轉嗎？','過第二個紅綠燈。','銀行離這裡不遠。','這附近有銀行。'],note:'Confirm the turning point.'},
   {speaker:'路人',prompt:'對。銀行離這裡不遠。',answer:'好的，謝謝！',options:['好的，謝謝！','在第二個路口右轉嗎？','請問，到銀行怎麼走？','這附近有銀行嗎？']},
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
  misses:old.misses+Number(!args.correct||args.assisted),
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
