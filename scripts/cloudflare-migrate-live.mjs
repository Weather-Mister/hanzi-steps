import {readFile,writeFile,mkdir,appendFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createTransferKey,openTransfer,digest} from './cloudflare-sealed-transfer.mjs';
import {snapshotTables,snapshotStatements,sqliteValue,validateSnapshot} from './cloudflare-snapshot.mjs';
import {waitForHealth} from './deploy-cloudflare-stage.mjs';
export const databaseId='eb12d6dd-e8f7-4636-b0e9-c6ba772896bb';
export const workerUrl='https://hanzi-steps-api.weatherisgood06.workers.dev';
const root=path.resolve(import.meta.dirname,'..');
export function cloudflareApi(accountId,token,send=fetch){
 if(!/^[a-f0-9]{32}$/.test(accountId||'')||!token)throw new Error('Cloudflare credentials are missing.');
 return async(resource,body)=>{
  const response=await send(`https://api.cloudflare.com/client/v4/accounts/${accountId}${resource}`,{method:body?'POST':'GET',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
  let data;try{data=await response.json();}catch{throw new Error('Cloudflare returned an invalid administrative response.');}
  if(!response.ok||!data.success||data.result?.some?.(row=>row.success===false))throw new Error('Cloudflare refused the administrative operation. No private query or values were logged.');
  return data.result;
 };
}
export async function verifyFields(snapshot,query){
 validateSnapshot(snapshot);
 for(const [table,columns] of Object.entries(snapshotTables)){
  const actual=[];
  for(let offset=0;;offset+=200){
   const results=await query(`SELECT ${columns.join(',')} FROM ${table} ORDER BY ${columns[0]},${columns[1]} LIMIT 200 OFFSET ${offset}`);
   actual.push(...results.map(row=>JSON.stringify(columns.map(key=>row[key]))));if(results.length<200)break;
  }
  const expected=snapshot.tables[table].map(row=>JSON.stringify(columns.map(key=>sqliteValue(row[key],key))));
  if(JSON.stringify(actual.sort())!==JSON.stringify(expected.sort()))throw new Error('Imported fields differ in '+table+'.');
  console.log(table+': '+actual.length+' rows; every field matches.');
 }
}
async function settings(query){return Object.fromEntries((await query('SELECT key,value FROM migration_state')).map(row=>[row.key,row.value]));}
const set=(key,value)=>({sql:'INSERT INTO migration_state(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',params:[key,value]});
async function prepare(query,batch){
 const state=await settings(query);if(state.ready!=='false')throw new Error('Transfer preparation requires an inactive backend.');
 let manifest;
 if(state.transfer_public){manifest=JSON.parse(state.transfer_public);if(!state.transfer_private)throw new Error('Transfer key is incomplete.');}
 else{
  for(const table of Object.keys(snapshotTables))if((await query('SELECT COUNT(*) AS count FROM '+table))[0].count)throw new Error('Transfer preparation requires empty learner tables.');
  const pair=createTransferKey(databaseId,workerUrl);manifest=pair.manifest;
  // The private decryption key remains inside D1. Only the public key is
  // output; no credential, signing key, subscription or learner row is logged.
  await batch([set('transfer_private',pair.privateKey),set('transfer_public',JSON.stringify(manifest))]);
 }
 await mkdir(path.join(root,'work'),{recursive:true});await writeFile(path.join(root,'work/transfer-public.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log('PUBLIC_TRANSFER_MANIFEST='+JSON.stringify(manifest));return manifest;
}
async function importSnapshot(query,batch,uploadSecrets){
 const state=await settings(query);if(state.ready!=='false')throw new Error('Import requires an inactive backend.');
 if(!state.transfer_private||!state.transfer_public)throw new Error('Prepare the transfer key first.');
 const text=await readFile(path.join(root,'cloudflare/migration-transfer.sealed.json'),'utf8');
 const hash=digest(text);if(state.transfer_digest&&state.transfer_digest!==hash)throw new Error('Refusing to resume a different encrypted snapshot.');
 if(state.transfer_verified===hash){console.log('This encrypted import was already verified. Readiness remains closed.');return;}
 const envelope=JSON.parse(text),payload=openTransfer(envelope,state.transfer_private,JSON.parse(state.transfer_public));
 const {snapshot,vapid}=payload;validateSnapshot(snapshot);
 if(!snapshot.sourceFrozen||!snapshot.sourceCronPaused)throw new Error('Snapshot is missing source freeze evidence.');
 if(Date.now()-Date.parse(snapshot.exportedAt)>3600000)throw new Error('Final snapshot is too old. Restore source writes and prepare a fresh transfer.');
 if(!vapid||!/^[A-Za-z0-9_-]{87}$/.test(vapid.vapid_public_key)||!/^[A-Za-z0-9_-]{43}$/.test(vapid.vapid_private_key)||typeof vapid.subject!=='string')throw new Error('Invalid existing notification signing settings.');
 const statements=snapshotStatements(snapshot);
 let cursor=Number(state.transfer_cursor||0);
 if(!Number.isSafeInteger(cursor)||cursor<0||cursor>statements.length)throw new Error('Invalid import cursor.');
 if(!state.transfer_digest){
  for(const table of Object.keys(snapshotTables))if((await query('SELECT COUNT(*) AS count FROM '+table))[0].count)throw new Error('Import requires empty learner tables.');
  await batch([set('transfer_digest',hash),set('transfer_cursor','0')]);
 }
 for(;cursor<statements.length;){
  const end=Math.min(cursor+10,statements.length);
  // Each chunk and its cursor commit together. A failed chunk can be retried
  // safely without counting historical events or overwriting partial rows.
  await batch([...statements.slice(cursor,end).map(sql=>({sql})),set('transfer_cursor',String(end))]);cursor=end;
 }
 await verifyFields(snapshot,query);
 const retry=snapshot.tables.practice_attempt_events[0];
 if(retry){
  const before=digest(JSON.stringify(await query('SELECT * FROM practice_skill_state ORDER BY user_id,item_id,mode')));
  const columns=snapshotTables.practice_attempt_events;
  await batch([{sql:`INSERT INTO practice_attempt_events(${columns.join(',')}) VALUES(${columns.map(()=>'?').join(',')}) ON CONFLICT DO NOTHING`,params:columns.map(key=>sqliteValue(retry[key],key))}]);
  const after=digest(JSON.stringify(await query('SELECT * FROM practice_skill_state ORDER BY user_id,item_id,mode')));
  if(before!==after)throw new Error('An imported historical retry changed mastery aggregates.');
 }
 const metadata=(await readFile(path.join(root,'cloudflare/lesson-lengths.sql'),'utf8')).split(';').filter(sql=>sql.trim());
 for(let i=0;i<metadata.length;i+=15)await batch(metadata.slice(i,i+15).map(sql=>({sql})));
 const {lessons,characters,findLesson}=await import('../lib/curriculum.ts');
 const {extraLessons,extraPracticeLessons}=await import('../course/extras/units.ts');
 const ids=new Set([...lessons.map(row=>row.id),...extraLessons.map(row=>row.id),...extraPracticeLessons.map(row=>row.id),...Object.keys(characters).map(char=>'practice-'+char)]);
 const lengths=new Map((await query('SELECT lesson_id,steps,historical_steps FROM lesson_lengths')).map(row=>[row.lesson_id,row]));
 for(const id of ids)if(lengths.get(id)?.steps!==findLesson(id)?.steps.length)throw new Error('Current curriculum bounds differ.');
 for(const row of snapshot.tables.lesson_lengths){
  const current=lengths.get(row.lesson_id),history=new Set(current?JSON.parse(current.historical_steps):[]);
  if(!current||row.historical_steps.some(n=>!history.has(n))||(current.steps!==row.steps&&!history.has(row.steps)))throw new Error('Historical curriculum bounds were lost.');
 }
 await uploadSecrets({VAPID_PUBLIC_KEY:vapid.vapid_public_key,VAPID_PRIVATE_KEY:vapid.vapid_private_key,VAPID_SUBJECT:vapid.subject});
 await batch([set('transfer_verified',hash),set('sourceFrozen','true'),set('sourceCronPaused','true')]);
 console.log('Remote field comparison, historical retry, '+ids.size+' current lesson bounds and VAPID transfer passed. Readiness remains closed.');
}
async function smoke(query,batch){
 await waitForHealth(workerUrl);
 const profiles=await query('SELECT username,legacy_user_id FROM username_accounts ORDER BY username');
 if(!profiles.length)throw new Error('No imported profiles.');
 for(const profile of profiles){
  const rpc=async(name,args)=>{
   const response=await fetch(workerUrl+'/rpc/'+name,{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://weather-mister.github.io'},body:JSON.stringify(args)});
   if(!response.ok)throw new Error('Live imported-profile request failed: '+name);return response.json();
  };
  const claimed=await rpc('hanzi_claim_username',{p_username:profile.username});
  if(claimed!==profile.legacy_user_id)throw new Error('Imported profile mapping differs.');
  const progress=await rpc('hanzi_read_progress',{expected_account:claimed});
  if(!Array.isArray(progress.sessions)||!Array.isArray(progress.studyDays))throw new Error('Invalid live progress.');
  await rpc('hanzi_read_practice_state',{expected_account:claimed});await rpc('hanzi_read_mastered',{expected_account:claimed});
  const widget=await fetch(workerUrl+'/widget?account='+claimed);if(!widget.ok||!(await widget.json()).version)throw new Error('Live widget read failed.');
 }
 console.log('All '+profiles.length+' imported profiles resolve; live progress, mastery and widgets pass.');
 const rpc=async(name,args)=>fetch(workerUrl+'/rpc/'+name,{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://weather-mister.github.io'},body:JSON.stringify(args)});
 const accounts=[],suffix=crypto.randomUUID().slice(0,8);let socket;
 try{
  for(const letter of ['a','b']){
   const response=await rpc('hanzi_claim_username',{p_username:'migration_probe_'+letter+'_'+suffix});
   if(!response.ok)throw new Error('Live save probe profile could not be created.');accounts.push(await response.json());
  }
  const account=accounts[0],other=accounts[1];
  const lesson=(await query('SELECT lesson_id,steps FROM lesson_lengths WHERE steps>1 ORDER BY lesson_id LIMIT 1'))[0];
  if(!lesson)throw new Error('No curriculum lesson for the live save probe.');
  const checkpoint={id:crypto.randomUUID(),lessonId:lesson.lesson_id,index:1,independent:1,assisted:0,complete:false,updatedAt:Date.now()};
  socket=new WebSocket(workerUrl.replace('https:','wss:')+'/widgets/events?account='+account);
  const event=type=>new Promise((resolve,reject)=>{
   const timeout=setTimeout(()=>reject(new Error('Live widget '+type+' timed out.')),15000);
   if(type==='open'){socket.addEventListener('open',()=>{clearTimeout(timeout);resolve();},{once:true});socket.addEventListener('error',()=>{clearTimeout(timeout);reject(new Error('Live widget connection failed.'));},{once:true});}
   else socket.addEventListener('message',function listener(message){let data;try{data=JSON.parse(message.data);}catch{return;}if(data.event===type||data.type===type){socket.removeEventListener('message',listener);clearTimeout(timeout);resolve(data);}});
  });
  await event('open');const changed=event('progress');
  const saved=await rpc('hanzi_save_progress',{expected_account:account,checkpoint});
  if(!saved.ok||!(await saved.json()).saved)throw new Error('Live checkpoint save failed.');await changed;
  const cross=await rpc('hanzi_save_progress',{expected_account:other,checkpoint:{...checkpoint,index:Math.min(2,lesson.steps-1)}});if(cross.status!==409)throw new Error('Live cross-account checkpoint isolation failed.');
  const delayed=await rpc('hanzi_save_progress',{expected_account:account,checkpoint:{...checkpoint,index:0,independent:0}});if(!delayed.ok)throw new Error('Live delayed checkpoint receipt failed.');
  const reloaded=await rpc('hanzi_read_progress',{expected_account:account});const read=await reloaded.json();if(read.sessions.find(row=>row.id===checkpoint.id)?.index!==1)throw new Error('Live delayed save regressed a checkpoint.');
  const done=await rpc('hanzi_save_progress',{expected_account:account,checkpoint:{...checkpoint,index:lesson.steps,complete:true}});const receipt=await done.json();if(!done.ok||!receipt.studyDays?.includes(new Date(Date.now()+8*3600000).toISOString().slice(0,10)))throw new Error('Live completion/study day check failed.');
  const attempt={expected_account:account,p_attempt_id:crypto.randomUUID(),p_item_id:'word:一',p_mode:'recognition',p_correct:true,p_assisted:false,p_session_kind:'daily'};
  for(let i=0;i<2;i++){const response=await rpc('hanzi_record_practice_attempt',attempt);if(!response.ok||(await response.json()).attempts!==1)throw new Error('Live practice retry counted twice.');}
  console.log('Live save/reload, delayed retry, completion day, account isolation, practice idempotency and widget event delivery pass.');
 }finally{
  socket?.close();
  // Only ephemeral profiles created by this check are removed; imported
  // learner rows are never mutated by the live save probe.
  for(const account of accounts)await batch(['hanzi_sessions','practice_attempt_events','practice_skill_state','mastered_vocab','hanzi_push_subscriptions','hanzi_push_log'].map(table=>({sql:'DELETE FROM '+table+' WHERE user_id=?',params:[account]})).concat([{sql:'DELETE FROM username_accounts WHERE legacy_user_id=?',params:[account]}]));
 }
}
async function wrangler(args,input){
 return new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,[path.join(root,'node_modules/wrangler/bin/wrangler.js'),...args],{cwd:root,env:{...process.env,CI:'true',WRANGLER_SEND_METRICS:'false'},stdio:['pipe','pipe','pipe']});
  // Values are supplied only through stdin. Suppress vendor output on failure
  // to avoid logging server responses containing private deployment values.
  child.stdout.resume();child.stderr.resume();child.on('error',()=>reject(new Error('Worker administrative command failed.')));child.on('exit',code=>code===0?resolve():reject(new Error('Worker administrative command failed.')));child.stdin.on('error',()=>{});child.stdin.end(input||'');
 });
}
export async function migrate(mode){
 const accountId=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN,api=cloudflareApi(accountId,token);
 const info=await api('/d1/database/'+databaseId);if(info.name!=='hanzi-steps-migration')throw new Error('The target database identity differs.');
 const resource='/d1/database/'+databaseId+'/query';
 const query=async(sql,params)=>(await api(resource,{sql,...(params?{params}:{})}))[0].results;
 const batch=async statements=>api(resource,{batch:statements});
 const directory=path.join(root,'work/cloudflare-deployment');await mkdir(directory,{recursive:true});
 const config=JSON.parse(await readFile(path.join(root,'cloudflare/wrangler.jsonc'),'utf8'));
 config.account_id=accountId;config.main=path.join(root,'cloudflare/worker.ts');config.d1_databases[0]={...config.d1_databases[0],database_id:databaseId,database_name:'hanzi-steps-migration',migrations_dir:path.join(root,'cloudflare/migrations')};
 const configPath=path.join(directory,'wrangler.json');
 if(mode==='prepare'){await prepare(query,batch);return;}
 if(mode==='import'){
  config.vars.PUSH_ENABLED='false';await writeFile(configPath,JSON.stringify(config));
  await importSnapshot(query,batch,values=>wrangler(['secret','bulk','--config',configPath],JSON.stringify(values)));return;
 }
 const state=await settings(query);if(!state.transfer_verified||state.transfer_verified!==state.transfer_digest||state.sourceFrozen!=='true'||state.sourceCronPaused!=='true')throw new Error('Import verification is incomplete.');
 if(mode==='activate'){
  await batch([set('ready','true')]);
  try{await smoke(query,batch);}catch(error){await batch([set('ready','false')]);throw error;}
  // Remove the private transfer key only after successful activation. This
  // cannot be used to decrypt the committed encrypted bundle afterwards.
  await batch([{sql:"DELETE FROM migration_state WHERE key='transfer_private'"}]);
 }else if(mode==='verify'){if(state.ready!=='true')throw new Error('Backend is inactive.');await smoke(query,batch);}
 else if(mode==='enable-push'){
  if(state.ready!=='true')throw new Error('Backend is inactive.');await smoke(query,batch);
  config.vars.PUSH_ENABLED='true';await writeFile(configPath,JSON.stringify(config));await wrangler(['deploy','--config',configPath]);await waitForHealth(workerUrl);await batch([set('pushEnabled','true')]);
 }else throw new Error('Unknown migration mode.');
 console.log('Cloudflare migration step complete: '+mode);
 if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,`Hanzi backend: ${workerUrl}\n\nCompleted: ${mode}.\n`);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{await migrate(process.argv[2]);}catch(error){console.error(error.message);process.exitCode=1;}}
