import {ApiError,object,type Args,type Env} from './contracts';
import {decode64,validateEndpoint,sendPush,PushError} from './web-push';
import {pickKind,streakState,latestLevel,payloadFor,dayParts,type PushRow,type SessionRow} from './push-policy';
function configuration(env:Env){
 if(!env.VAPID_PUBLIC_KEY||!env.VAPID_PRIVATE_KEY)throw new ApiError('Notifications are still being prepared.',503,'NOT_READY');
 return {publicKey:env.VAPID_PUBLIC_KEY,privateKey:env.VAPID_PRIVATE_KEY,subject:env.VAPID_SUBJECT||'mailto:hanzi-steps@users.noreply.github.com'};
}
function preferences(row:PushRow){return {enabled:!!row.enabled,streakReminders:!!row.streak_reminders,encouragement:!!row.encouragement,sentenceChecks:!!row.sentence_checks};}
export async function readPush(db:D1Database,account:string,endpoint:unknown){
 if(typeof endpoint!=='string')throw new ApiError('Invalid push endpoint.');
 const row=await db.prepare('SELECT * FROM hanzi_push_subscriptions WHERE user_id=? AND endpoint=?').bind(account,endpoint).first<PushRow>();
 return row?preferences(row):null;
}
export async function upsertPush(db:D1Database,account:string,args:Args){
 const sub=args.push_subscription,prefs=args.push_preferences;
 if(!object(sub)||!object(sub.keys)||!object(prefs)||typeof prefs.streakReminders!=='boolean'||typeof prefs.encouragement!=='boolean'||typeof prefs.sentenceChecks!=='boolean'||
  typeof sub.keys.p256dh!=='string'||!/^[A-Za-z0-9_-]{40,200}$/.test(sub.keys.p256dh)||typeof sub.keys.auth!=='string'||!/^[A-Za-z0-9_-]{10,100}$/.test(sub.keys.auth))
  throw new ApiError('Invalid notification settings.');
 const endpoint=validateEndpoint(sub.endpoint);
 if(decode64(sub.keys.p256dh).length!==65||decode64(sub.keys.auth).length!==16)throw new ApiError('Invalid push encryption keys.');
 const now=new Date().toISOString();
 await db.prepare(`INSERT INTO hanzi_push_subscriptions(endpoint,user_id,p256dh,auth,enabled,streak_reminders,encouragement,sentence_checks,created_at,updated_at)
 VALUES(?,?,?,?,1,?,?,?,?,?) ON CONFLICT(endpoint) DO UPDATE SET user_id=excluded.user_id,p256dh=excluded.p256dh,auth=excluded.auth,
 enabled=1,streak_reminders=excluded.streak_reminders,encouragement=excluded.encouragement,sentence_checks=excluded.sentence_checks,updated_at=excluded.updated_at,failure_count=0`)
 .bind(endpoint,account,sub.keys.p256dh,sub.keys.auth,Number(prefs.streakReminders),Number(prefs.encouragement),Number(prefs.sentenceChecks),now,now).run();
 return {enabled:true,...prefs};
}
export async function disablePush(db:D1Database,account:string,endpoint:unknown){
 if(typeof endpoint!=='string')throw new ApiError('Invalid push endpoint.');
 await db.prepare('UPDATE hanzi_push_subscriptions SET enabled=0,updated_at=? WHERE user_id=? AND endpoint=?').bind(new Date().toISOString(),account,endpoint).run();
 return {enabled:false};
}
export async function testPush(env:Env,account:string,endpoint:unknown){
 const config=configuration(env);
 if(typeof endpoint!=='string')throw new ApiError('Invalid push endpoint.');
 const row=await env.DB.prepare('SELECT * FROM hanzi_push_subscriptions WHERE user_id=? AND endpoint=? AND enabled=1').bind(account,endpoint).first<PushRow>();
 if(!row)throw new ApiError('Notifications are not enabled on this device.',404);
 try{
  await sendPush(row,JSON.stringify({title:'Hanzi Steps',body:'Notifications are working! 測試成功 🎉',tag:'hanzi-test',data:{kind:'test',url:'./'}}),config,60,'high');
  return {sent:true};
 }catch(e){
  if(e instanceof PushError&&(e.statusCode===404||e.statusCode===410)){
   await env.DB.prepare('DELETE FROM hanzi_push_subscriptions WHERE endpoint=? AND user_id=?').bind(endpoint,account).run();
   throw new ApiError('This device push subscription expired. Turn notifications off and on again.',410);
  }
  throw new ApiError('Test notification could not be delivered.',502);
 }
}
// The scheduler fans out into separate hibernating Durable Object invocations.
// Each recipient has its own CPU/query budget and serialized delivery claims.
export async function scheduledPush(env:Env,now=Date.now()){
 if(env.PUSH_ENABLED!=='true')return {disabled:true};
 if(!env.WIDGET_EVENTS)throw new Error('Missing delivery binding');
 if((await env.DB.prepare("SELECT value FROM migration_state WHERE key='ready'").first<{value:string}>())?.value!=='true')return {notReady:true};
 const {hour}=dayParts(now);if(hour<8||hour>22)return {quietHours:true};
 const rows=(await env.DB.prepare('SELECT endpoint FROM hanzi_push_subscriptions WHERE enabled=1 ORDER BY endpoint').all<{endpoint:string}>()).results;
 // Cloudflare service-binding subrequests have a separate internal limit.
 // Batches keep active connections and memory bounded.
 let sent=0,failed=0;
 for(let offset=0;offset<rows.length;offset+=5){
  const results=await Promise.all(rows.slice(offset,offset+5).map(async row=>{
   const stub=env.WIDGET_EVENTS!.get(env.WIDGET_EVENTS!.idFromName('push:'+row.endpoint));
   const response=await stub.fetch('https://internal/push',{method:'POST',body:JSON.stringify({endpoint:row.endpoint,now})});
   return await response.json() as {sent?:boolean;failed?:boolean};
  }));
  for(const result of results){sent+=Number(!!result.sent);failed+=Number(!!result.failed);}
 }
 await env.DB.prepare('DELETE FROM push_deliveries WHERE claimed_at<?').bind(now-7*86400000).run();
 return {checked:rows.length,sent,failed};
}
export async function deliverScheduledPush(env:Env,endpoint:string,now=Date.now()){
 if(env.PUSH_ENABLED!=='true')return {disabled:true};
 const {hour}=dayParts(now);if(hour<8||hour>22)return {quietHours:true};
 const row=await env.DB.prepare('SELECT * FROM hanzi_push_subscriptions WHERE endpoint=? AND enabled=1').bind(endpoint).first<PushRow>();
 if(!row)return {disabled:true};
 const learner=(await env.DB.prepare('SELECT user_id,lesson_id,complete,updated_at,completed_at FROM hanzi_sessions WHERE user_id=?').bind(row.user_id).all<SessionRow>()).results;
 const state=streakState(learner,now),kind=pickKind(row,state,hour,now);if(!kind)return {notDue:true};
 const notification=payloadFor(kind,row,state,latestLevel(learner),state.today,hour);if(!notification)return {notDue:true};
 const slot=`${state.today}:${kind}:${kind==='sentence'?hour:0}`;
 const claim=await env.DB.prepare('INSERT INTO push_deliveries(endpoint,slot,claimed_at) VALUES(?,?,?) ON CONFLICT DO NOTHING').bind(row.endpoint,slot,now).run();
 if(!claim.meta.changes)return {duplicate:true};
 try{
  await sendPush(row,JSON.stringify({title:notification.title,body:notification.body,tag:`hanzi-${kind}-${state.today}${kind==='sentence'?`-${hour}`:''}`,data:{kind,url:'./'}}),configuration(env),21600,kind==='streak'?'high':'normal');
  const stamp=new Date(now).toISOString();
  const fields:Record<string,unknown>={last_sent_at:stamp,failure_count:0,updated_at:stamp};
  if(kind==='streak')fields.last_streak_day=state.today;
  if(kind==='encouragement')fields.last_encouragement_at=stamp;
  if(kind==='sentence'){fields.last_sentence_at=stamp;fields.last_sentence_id=notification.sentence?.id||null;}
  await env.DB.batch([
   env.DB.prepare(`UPDATE hanzi_push_subscriptions SET ${Object.keys(fields).map(key=>`${key}=?`).join(',')} WHERE endpoint=? AND user_id=?`).bind(...Object.values(fields),row.endpoint,row.user_id),
   env.DB.prepare('INSERT INTO hanzi_push_log(user_id,kind,sentence_id,sent_at) VALUES(?,?,?,?)').bind(row.user_id,kind,notification.sentence?.id||null,stamp),
   env.DB.prepare("UPDATE push_deliveries SET status='sent' WHERE endpoint=? AND slot=?").bind(row.endpoint,slot)
  ]);
  return {sent:true};
 }catch(e){
  if(e instanceof PushError&&(e.statusCode===404||e.statusCode===410))await env.DB.prepare('DELETE FROM hanzi_push_subscriptions WHERE endpoint=? AND user_id=?').bind(row.endpoint,row.user_id).run();
  else await env.DB.prepare('UPDATE hanzi_push_subscriptions SET failure_count=failure_count+1,updated_at=? WHERE endpoint=?').bind(new Date(now).toISOString(),row.endpoint).run();
  await env.DB.prepare("UPDATE push_deliveries SET status='failed' WHERE endpoint=? AND slot=?").bind(row.endpoint,slot).run();
  return {failed:true};
 }
}
