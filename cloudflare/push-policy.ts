import {sentencesForLevel,type NotificationSentence} from './sentences';
type PushRow={
 endpoint:string;
 user_id:string;
 p256dh:string;
 auth:string;
 enabled:boolean;
 streak_reminders:boolean;
 encouragement:boolean;
 sentence_checks:boolean;
 last_sent_at:string|null;
 last_streak_day:string|null;
 last_encouragement_at:string|null;
 last_sentence_at:string|null;
 last_sentence_id:string|null;
 failure_count:number;
};
type SessionRow={user_id:string;lesson_id:string;complete:boolean;updated_at:number;completed_at:number|null};
type Level={book:1|2;unit:number};
type PushKind='streak'|'encouragement'|'sentence';
const TAIPEI='Asia/Taipei';
const DAY=86_400_000;
const encouragements=[
 'A short session still counts. Keep the rhythm.',
 'One character is progress. A few minutes is enough.',
 'Come back for one small round of Chinese.',
 'Your Mandarin gets easier to retrieve every time you return.',
 'A quick review today can make tomorrow feel much easier.',
 'No need for a long session — just keep the Chinese moving.',
];

function dayParts(timestamp=Date.now()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TAIPEI,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date(timestamp));
 const value=(type:string)=>parts.find(part=>part.type===type)?.value||'';
 return {day:`${value('year')}-${value('month')}-${value('day')}`,hour:Number(value('hour'))};
}
function dayIndex(value:string){return Date.parse(value+'T00:00:00Z')/DAY}
function fnv(value:string){
 let hash=2166136261;
 for(let i=0;i<value.length;i++){hash^=value.charCodeAt(i);hash=Math.imul(hash,16777619)}
 return hash>>>0;
}
function elapsed(value:string|null,now:number){return value?now-Date.parse(value):Infinity}
function lessonLevel(lessonId:string):Level|null{
 if(lessonId.startsWith('practice-'))return null;
 const book2=/^b2u(\d+)-/.exec(lessonId);
 if(book2)return {book:2,unit:Number(book2[1])};
 const book1=/^u(\d+)-/.exec(lessonId);
 if(book1)return {book:1,unit:Number(book1[1])};
 if(['hello','identity','student','question','review'].includes(lessonId))return {book:1,unit:1};
 return null;
}
function latestLevel(rows:SessionRow[]):Level{
 let best:Level={book:1,unit:1};
 for(const row of rows){
  const level=lessonLevel(row.lesson_id);
  if(!level)continue;
  if(level.book>best.book||(level.book===best.book&&level.unit>best.unit))best=level;
 }
 return best;
}
export function streakState(rows:SessionRow[],now:number){
 const today=dayParts(now).day,todayIndex=dayIndex(today);
 const days=new Set<number>();
 for(const row of rows){
  if(!row.complete)continue;
  const stamp=row.completed_at??row.updated_at;
  if(!Number.isFinite(stamp))continue;
  const index=dayIndex(dayParts(stamp).day);
  if(index<=todayIndex)days.add(index);
 }
 const practicedToday=days.has(todayIndex);
 let current=0,cursor=practicedToday?todayIndex:todayIndex-1;
 while(days.has(cursor)){current++;cursor--}
 return {today,practicedToday,current};
}
function chooseSentence(row:PushRow,level:Level,today:string,hour:number):NotificationSentence|null{
 const candidates=sentencesForLevel(level.book,level.unit);
 if(!candidates.length)return null;
 const fresh=candidates.filter(sentence=>sentence.id!==row.last_sentence_id);
 const source=fresh.length?fresh:candidates;
 return source[fnv(row.endpoint+today+`:sentence:${hour}`)%source.length]||null;
}
function chooseEncouragement(row:PushRow,today:string){
 return encouragements[fnv(row.endpoint+today+':encouragement')%encouragements.length];
}
function dueSlot(row:PushRow,today:string,start:number,span:number,mod:number){
 const hash=fnv(row.endpoint+today);
 return {today:hash%mod===0,hour:start+((hash>>>8)%span)};
}
function sentenceHours(row:PushRow,today:string){
 const windows=[
  {key:'morning',start:8,span:4},
  {key:'afternoon',start:13,span:4},
  {key:'evening',start:18,span:2},
 ];
 return windows.map(window=>window.start+(fnv(row.endpoint+today+`:sentence-slot:${window.key}`)%window.span));
}
function payloadFor(kind:PushKind,row:PushRow,state:ReturnType<typeof streakState>,level:Level,today:string,hour:number){
 if(kind==='streak')return {
  title:'🔥 Keep your streak alive',
  body:`${state.current}-day streak — one quick lesson, review, or character practice today keeps it going.`,
  sentence:null as NotificationSentence|null,
 };
 if(kind==='sentence'){
  const sentence=chooseSentence(row,level,today,hour);
  if(!sentence)return null;
  return {title:'小挑戰 · Can you read this?',body:sentence.text,sentence};
 }
 return {title:'Hanzi Steps',body:chooseEncouragement(row,today),sentence:null as NotificationSentence|null};
}
export function pickKind(row:PushRow,state:ReturnType<typeof streakState>,hour:number,now:number):PushKind|null{
 if(row.streak_reminders&&state.current>0&&!state.practicedToday&&hour>=20&&hour<=22&&row.last_streak_day!==state.today)return 'streak';
 if(row.sentence_checks&&elapsed(row.last_sentence_at,now)>=60*60*1000&&sentenceHours(row,state.today).includes(hour))return 'sentence';
 if(row.encouragement&&elapsed(row.last_sent_at,now)>=24*60*60*1000&&elapsed(row.last_encouragement_at,now)>=96*60*60*1000){
  const slot=dueSlot(row,state.today,10,9,4);
  if(slot.today&&hour===slot.hour)return 'encouragement';
 }
 return null;
}

export {latestLevel,payloadFor,dayParts};
export type {PushRow,SessionRow};
