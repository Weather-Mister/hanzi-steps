import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import {createClient} from 'npm:@supabase/supabase-js@2.116.0';
import webpush from 'npm:web-push@3.6.7';
import {sentencesForLevel,type NotificationSentence} from './sentences.ts';

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
const CORS_HEADERS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type'};
function json(body:unknown,status=200){return Response.json(body,{status,headers:CORS_HEADERS})}

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
function streakState(rows:SessionRow[],now:number){
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
function pickKind(row:PushRow,state:ReturnType<typeof streakState>,hour:number,now:number):PushKind|null{
 if(row.streak_reminders&&state.current>0&&!state.practicedToday&&hour>=20&&hour<=22&&row.last_streak_day!==state.today)return 'streak';
 if(row.sentence_checks&&elapsed(row.last_sentence_at,now)>=60*60*1000&&sentenceHours(row,state.today).includes(hour))return 'sentence';
 if(row.encouragement&&elapsed(row.last_sent_at,now)>=24*60*60*1000&&elapsed(row.last_encouragement_at,now)>=96*60*60*1000){
  const slot=dueSlot(row,state.today,10,9,4);
  if(slot.today&&hour===slot.hour)return 'encouragement';
 }
 return null;
}
async function sessionRows(client:ReturnType<typeof createClient>,userIds:string[]){
 const all:SessionRow[]=[];
 for(let i=0;i<userIds.length;i+=75){
  const ids=userIds.slice(i,i+75);
  const {data,error}=await client.from('hanzi_sessions').select('user_id,lesson_id,complete,updated_at,completed_at').in('user_id',ids);
  if(error)throw error;
  all.push(...((data||[]) as SessionRow[]));
 }
 return all;
}

Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response(null,{status:204,headers:CORS_HEADERS});
 if(req.method!=='POST')return new Response('POST required',{status:405,headers:CORS_HEADERS});
 const url=Deno.env.get('SUPABASE_URL');
 const serviceKey=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 if(!url||!serviceKey)return new Response('Missing Supabase runtime configuration',{status:500,headers:CORS_HEADERS});
 const client=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});

 let requestBody:Record<string,unknown>={};
 try{requestBody=await req.json()}catch{}

 let {data:config,error:configError}=await client.from('hanzi_push_config').select('vapid_public_key,vapid_private_key,subject').eq('id',1).maybeSingle();
 if(configError)return json({error:configError.message},500);
 if(!config){
  const generated=webpush.generateVAPIDKeys();
  const fresh={id:1,vapid_public_key:generated.publicKey,vapid_private_key:generated.privateKey,subject:'mailto:hanzi-steps@users.noreply.github.com'};
  const {error:insertError}=await client.from('hanzi_push_config').insert(fresh);
  if(insertError){
   const retry=await client.from('hanzi_push_config').select('vapid_public_key,vapid_private_key,subject').eq('id',1).maybeSingle();
   if(retry.error||!retry.data)return json({error:'Push configuration could not be created.'},500);
   config=retry.data;
  }else config=fresh;
 }
 webpush.setVapidDetails(config.subject,config.vapid_public_key,config.vapid_private_key);

 if(requestBody.action==='test'){
  const expectedAccount=typeof requestBody.expectedAccount==='string'?requestBody.expectedAccount:'';
  const endpoint=typeof requestBody.endpoint==='string'?requestBody.endpoint:'';
  if(!expectedAccount||!endpoint)return json({error:'Missing notification target.'},400);
  const {data:state,error:readError}=await client.rpc('hanzi_push_read',{expected_account:expectedAccount,expected_endpoint:endpoint});
  if(readError)return json({error:readError.message},400);
  if(!state?.enabled)return json({error:'Notifications are not enabled on this device.'},404);
  const {data:target,error:targetError}=await client.from('hanzi_push_subscriptions').select('endpoint,p256dh,auth,enabled').eq('endpoint',endpoint).eq('enabled',true).maybeSingle();
  if(targetError)return json({error:targetError.message},500);
  if(!target)return json({error:'Push subscription was not found.'},404);
  try{
   await webpush.sendNotification(
    {endpoint:target.endpoint,keys:{p256dh:target.p256dh,auth:target.auth}},
    JSON.stringify({title:'Hanzi Steps',body:'Notifications are working! 測試成功 🎉',tag:'hanzi-test',data:{kind:'test',url:'./'}}),
    {TTL:60,urgency:'high'},
   );
   return json({sent:true});
  }catch(error){
   const status=typeof error==='object'&&error&&'statusCode' in error?Number((error as {statusCode?:number}).statusCode):0;
   if(status===404||status===410){
    await client.from('hanzi_push_subscriptions').delete().eq('endpoint',endpoint);
    return json({error:'This device push subscription expired. Turn notifications off and on again.'},410);
   }
   console.error('test push failed',{status,message:error instanceof Error?error.message:String(error)});
   return json({error:'Test notification could not be delivered.'},502);
  }
 }

 const {data:subscriptions,error:subscriptionError}=await client.from('hanzi_push_subscriptions').select('*').eq('enabled',true).limit(500);
 if(subscriptionError)return json({error:subscriptionError.message},500);
 const rows=(subscriptions||[]) as PushRow[];
 if(!rows.length)return json({checked:0,sent:0,expired:0,failed:0});

 const users=[...new Set(rows.map(row=>row.user_id))];
 const sessions=await sessionRows(client,users);
 const byUser=new Map<string,SessionRow[]>();
 for(const row of sessions){
  const list=byUser.get(row.user_id)||[];
  list.push(row);byUser.set(row.user_id,list);
 }

 const now=Date.now(),{hour}=dayParts(now);
 if(hour<8||hour>22)return json({checked:rows.length,sent:0,expired:0,failed:0,quietHours:true});

 let sent=0,expired=0,failed=0;
 for(let offset=0;offset<rows.length;offset+=15){
  const batch=rows.slice(offset,offset+15);
  await Promise.all(batch.map(async row=>{
   const learner=byUser.get(row.user_id)||[];
   const state=streakState(learner,now);
   const kind=pickKind(row,state,hour,now);
   if(!kind)return;
   const level=latestLevel(learner);
   const notification=payloadFor(kind,row,state,level,state.today,hour);
   if(!notification)return;

   const body=JSON.stringify({
    title:notification.title,
    body:notification.body,
    tag:`hanzi-${kind}-${state.today}${kind==='sentence'?`-${hour}`:''}`,
    data:{kind,url:'./'},
   });
   try{
    await webpush.sendNotification(
     {endpoint:row.endpoint,keys:{p256dh:row.p256dh,auth:row.auth}},
     body,
     {TTL:6*60*60,urgency:kind==='streak'?'high':'normal'},
    );
    const stamp=new Date(now).toISOString();
    const patch:Record<string,unknown>={last_sent_at:stamp,failure_count:0,updated_at:stamp};
    if(kind==='streak')patch.last_streak_day=state.today;
    if(kind==='encouragement')patch.last_encouragement_at=stamp;
    if(kind==='sentence'){
     patch.last_sentence_at=stamp;
     patch.last_sentence_id=notification.sentence?.id||null;
    }
    await client.from('hanzi_push_subscriptions').update(patch).eq('endpoint',row.endpoint);
    await client.from('hanzi_push_log').insert({user_id:row.user_id,kind,sentence_id:notification.sentence?.id||null});
    sent++;
   }catch(error){
    const status=typeof error==='object'&&error&&'statusCode' in error?Number((error as {statusCode?:number}).statusCode):0;
    if(status===404||status===410){
     await client.from('hanzi_push_subscriptions').delete().eq('endpoint',row.endpoint);
     expired++;
    }else{
     await client.from('hanzi_push_subscriptions').update({failure_count:row.failure_count+1,updated_at:new Date(now).toISOString()}).eq('endpoint',row.endpoint);
     failed++;
     console.error('push failed',{status,message:error instanceof Error?error.message:String(error)});
    }
   }
  }));
 }
 return json({checked:rows.length,sent,expired,failed,hour});
});
