import {ApiError,object,string,resolveAccount,type Env,type Args} from './contracts';
import {readProgress,saveProgress} from './progress';
import {readPractice,recordPractice,readMastered,setMastered} from './practice';
import {readPush,upsertPush,disablePush,testPush,scheduledPush} from './push';
import {widgetData} from './widget';
export {WidgetEvents} from './widget-events';

async function claimUsername(db:D1Database,value:unknown){
 if(typeof value!=='string')throw new ApiError('Use 2–32 letters, numbers, or underscores.');
 const username=value.trim().toLowerCase();
 if(!/^[a-z0-9_]{2,32}$/.test(username))throw new ApiError('Use 2–32 letters, numbers, or underscores.');
 // Imported username mappings take precedence over new deterministic hashes.
 // Older Google-linked accounts must never be silently assigned a new ID.
 const previous=await db.prepare('SELECT legacy_user_id FROM username_accounts WHERE username=?').bind(username).first<{legacy_user_id:string}>();
 if(previous)return previous.legacy_user_id;
 const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('hanzi-steps/username/v1:'+username));
 const account='account-v1-'+Array.from(new Uint8Array(hash),x=>x.toString(16).padStart(2,'0')).join('');
 await db.prepare('INSERT INTO username_accounts(username,legacy_user_id,created_at) VALUES(?,?,?) ON CONFLICT(username) DO NOTHING').bind(username,account,new Date().toISOString()).run();
 const row=await db.prepare('SELECT legacy_user_id FROM username_accounts WHERE username=?').bind(username).first<{legacy_user_id:string}>();
 if(!row)throw new Error('Profile mapping failed');
 return row.legacy_user_id;
}
async function notifyWidgets(env:Env,account:string){
 if(!env.WIDGET_EVENTS)return;
 const stub=env.WIDGET_EVENTS.get(env.WIDGET_EVENTS.idFromName(account));
 await stub.fetch('https://internal/publish',{method:'POST',body:JSON.stringify({account})});
}
async function rpc(env:Env,name:string,args:Args,context:ExecutionContext){
 if(name==='hanzi_claim_username')return claimUsername(env.DB,args.p_username);
 if(name==='hanzi_push_public_key')return env.VAPID_PUBLIC_KEY||null;
 const account=await resolveAccount(env.DB,args.expected_account);
 switch(name){
  case 'hanzi_read_progress':return readProgress(env.DB,account);
  case 'hanzi_save_progress':{
   const result=await saveProgress(env.DB,account,args.checkpoint);
   context.waitUntil(notifyWidgets(env,account).catch(()=>{console.error('Widget update unavailable');}));
   return result;
  }
  case 'hanzi_read_mastered':return readMastered(env.DB,account);
  case 'hanzi_set_mastered':return setMastered(env.DB,account,args);
  case 'hanzi_read_practice_state':return readPractice(env.DB,account);
  case 'hanzi_record_practice_attempt':return recordPractice(env.DB,account,args);
  case 'hanzi_push_read':return readPush(env.DB,account,args.expected_endpoint);
  case 'hanzi_push_upsert':return upsertPush(env.DB,account,args);
  case 'hanzi_push_disable':return disablePush(env.DB,account,args.expected_endpoint);
  default:throw new ApiError('Unknown operation.',404,'NOT_FOUND');
 }
}
async function body(request:Request):Promise<Args>{
 if(!request.headers.get('content-type')?.startsWith('application/json'))throw new ApiError('Expected JSON.',415);
 if(Number(request.headers.get('content-length')||0)>12000)throw new ApiError('Request is too large.',413);
 // Enforce the actual byte length too, including chunked requests without a
 // Content-Length header. Stop reading as soon as the limit is exceeded.
 const reader=request.body?.getReader();if(!reader)throw new ApiError('Invalid request.');
 let size=0;const chunks:Uint8Array[]=[];
 for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>12000){await reader.cancel();throw new ApiError('Request is too large.',413);}chunks.push(value);}
 const buffer=new Uint8Array(size);let offset=0;for(const chunk of chunks){buffer.set(chunk,offset);offset+=chunk.byteLength;}
 try{const value=JSON.parse(new TextDecoder().decode(buffer));if(object(value))return value;}catch{}
 throw new ApiError('Invalid request.');
}
export default {
 async fetch(request:Request,env:Env,context:ExecutionContext):Promise<Response>{
  const origin=request.headers.get('origin');
  const allowed=(env.ALLOWED_ORIGINS||'').split(',').map(value=>value.trim()).filter(Boolean);
  const headers:Record<string,string>={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',Vary:'Origin'};
  if(origin&&allowed.includes(origin))headers['Access-Control-Allow-Origin']=origin;
  headers['Access-Control-Allow-Headers']='content-type, authorization, apikey, x-client-info';
  headers['Access-Control-Allow-Methods']='GET, POST, OPTIONS';
  const json=(data:unknown,status=200)=>Response.json(data,{status,headers});
  if(origin&&!allowed.includes(origin))return json({error:'Request origin does not match.',code:'FORBIDDEN'},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  const url=new URL(request.url);
  if(url.pathname==='/health')return json({service:'hanzi-steps',backend:'cloudflare',version:1});
  try{
   // Fail closed until imports and comparisons have succeeded. A half-filled
   // migration must not create duplicate profiles or display empty progress.
   if((await env.DB.prepare("SELECT value FROM migration_state WHERE key='ready'").first<{value:string}>())?.value!=='true')
    throw new ApiError('Cloud progress is being migrated. Please try again shortly.',503,'NOT_READY');
   if(url.pathname==='/widgets/events'){
    if(request.method!=='GET'||request.headers.get('upgrade')?.toLowerCase()!=='websocket')throw new ApiError('WebSocket required.',426);
    const account=await resolveAccount(env.DB,url.searchParams.get('account'));
    if(!env.WIDGET_EVENTS)throw new ApiError('Widget updates are unavailable.',503);
    return env.WIDGET_EVENTS.get(env.WIDGET_EVENTS.idFromName(account)).fetch('https://internal/connect',{headers:request.headers});
   }
   if(url.pathname==='/widget'||url.pathname==='/functions/v1/hanzi-widget'){
    if(request.method!=='GET')throw new ApiError('GET required.',405);
    const username=url.searchParams.get('username');
    let account:string;
    if(username){
     if(!/^[a-z0-9_]{2,32}$/.test(username.trim().toLowerCase()))throw new ApiError('Invalid username.');
     // Read-only widgets never create new profiles as a side effect.
     const found=await env.DB.prepare('SELECT legacy_user_id FROM username_accounts WHERE username=?').bind(username.trim().toLowerCase()).first<{legacy_user_id:string}>();
     if(!found)throw new ApiError('This profile was not found.',404);
     account=found.legacy_user_id;
    }else account=await resolveAccount(env.DB,url.searchParams.get('account'));
    return json(await widgetData(env.DB,account,username?.trim().toLowerCase()||null));
   }
   if(request.method!=='POST')throw new ApiError('POST required.',405);
   const args=await body(request);
   if(url.pathname==='/functions/v1/hanzi-push'){
    if(args.action!=='test')throw new ApiError('Unknown operation.',404);
    const account=await resolveAccount(env.DB,args.expectedAccount);
    return json(await testPush(env,account,args.endpoint));
   }
   const match=/^\/(?:rpc|rest\/v1\/rpc)\/([a-z_]+)$/.exec(url.pathname);
   if(!match||!string(match[1]))throw new ApiError('Unknown operation.',404,'NOT_FOUND');
   return json(await rpc(env,match[1],args,context));
  }catch(e){
   if(e instanceof ApiError)return json({error:e.message,message:e.message,code:e.code},e.status);
   // Never return raw database errors, push URLs, encryption keys or row data.
   console.error('Hanzi backend request failed');
   return json({error:'Cloud progress is temporarily unavailable. Your local drafts are kept.',code:'BACKEND_UNAVAILABLE'},503);
  }
 },
 async scheduled(_controller:ScheduledController,env:Env,context:ExecutionContext){
  context.waitUntil(scheduledPush(env).catch(()=>{console.error('Scheduled Hanzi notifications failed');}));
 }
};
