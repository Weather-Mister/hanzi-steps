export const STREAK_TIME_ZONE='Asia/Taipei';
const DAY=86_400_000;
const formatter=new Intl.DateTimeFormat('en-CA',{timeZone:STREAK_TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'});

export function taipeiDay(timestamp:number):string{
 const parts=formatter.formatToParts(new Date(timestamp));
 return ['year','month','day'].map(type=>parts.find(part=>part.type===type)!.value).join('-');
}

export function completionTimestamp(timestamp:number,now:number=Date.now()):number{
 // Offline completion retains its actual day; a clock set in the future cannot
 // pre-award future study days. The first stored completion is then immutable.
 return timestamp>0&&Number.isFinite(timestamp)?Math.min(timestamp,now):now;
}

const dayString=(index:number)=>new Date(index*DAY).toISOString().slice(0,10);
function dayIndex(value:unknown):number|null{
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;
 const timestamp=Date.parse(value+'T00:00:00Z');
 if(!Number.isFinite(timestamp))return null;
 const index=timestamp/DAY;
 return dayString(index)===value?index:null;
}

export function validStudyDays(value:unknown):value is string[]{
 return Array.isArray(value)&&value.every(day=>dayIndex(day)!==null);
}

export function streakFromDays(activityDays:readonly string[],now:number=Date.now()){
 const today=taipeiDay(now),todayIndex=dayIndex(today)!;
 const days=new Set(activityDays.flatMap(value=>{const index=dayIndex(value);return index!==null&&index<=todayIndex?[index]:[]}));
 const practicedToday=days.has(todayIndex);
 let current=0,cursor=practicedToday?todayIndex:todayIndex-1;
 while(days.has(cursor)){current++;cursor--;}
 let best=0,run=0,previous=-Infinity;
 for(const index of [...days].sort((a,b)=>a-b)){run=index===previous+1?run+1:1;best=Math.max(best,run);previous=index;}
 const monday=todayIndex-((new Date(todayIndex*DAY).getUTCDay()+6)%7);
 const week=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((label,i)=>{
  const index=monday+i;
  return {date:dayString(index),label,done:days.has(index),today:index===todayIndex,future:index>todayIndex};
 });
 return {current,best,today,practicedToday,week};
}

