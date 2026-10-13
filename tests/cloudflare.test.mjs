import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {build} from 'esbuild';
import {Miniflare,createFetchMock} from 'miniflare';
import {createECDH,hkdfSync,createDecipheriv,generateKeyPairSync,verify,createPublicKey,randomBytes} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const origin='https://weather-mister.github.io';
let mf,db,temp,script,alice,bob,cryptoModule,client;
const pushMock=createFetchMock();pushMock.disableNetConnect();
const signing=generateKeyPairSync('ec',{namedCurve:'prime256v1'}).privateKey.export({format:'jwk'});
const signingPublic=Buffer.concat([Buffer.from([4]),Buffer.from(signing.x,'base64url'),Buffer.from(signing.y,'base64url')]).toString('base64url');
const runtime=()=>new Miniflare({modules:true,script,compatibilityDate:'2026-05-22',d1Databases:['DB'],d1Persist:path.join(temp,'d1'),durableObjects:{WIDGET_EVENTS:{className:'WidgetEvents',useSQLite:true}},fetchMock:pushMock,bindings:{ALLOWED_ORIGINS:origin,PUSH_ENABLED:'true',VAPID_PUBLIC_KEY:signingPublic,VAPID_PRIVATE_KEY:signing.d}});
export async function applySchema(database){
 const sql=await readFile(path.join(root,'cloudflare/migrations/0001_hanzi.sql'),'utf8');
 const trigger=sql.match(/CREATE TRIGGER practice_event_added[\s\S]*?\nEND;/)[0];
 for(const statement of sql.replace(trigger,'').split(';'))if(statement.trim())await database.prepare(statement).run();
 await database.prepare(trigger).run();
}
const api=async(name,args={},headers={})=>{
 const response=await mf.dispatchFetch('https://hanzi.test/rpc/'+name,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(args)});
 return {status:response.status,data:await response.json(),response};
};
const checkpoint=(id,extra={})=>({id,lessonId:'hello',index:4,independent:2,assisted:1,complete:false,updatedAt:Date.now(),...extra});
const uid=()=>crypto.randomUUID();
before(async()=>{
 temp=await mkdtemp(path.join(tmpdir(),'hanzi-cloudflare-'));
 const built=await build({absWorkingDir:root,entryPoints:['cloudflare/worker.ts'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['cloudflare:workers']});script=built.outputFiles[0].text;
 mf=runtime();db=await mf.getD1Database('DB');await applySchema(db);
 const notReady=await api('hanzi_claim_username',{p_username:'alice'});assert.equal(notReady.status,503);
 await db.prepare("UPDATE migration_state SET value='true' WHERE key='ready'").run();
 await db.prepare('INSERT INTO lesson_lengths VALUES(?,?,?)').bind('hello',10,'[8]').run();
 await db.prepare('INSERT INTO lesson_lengths VALUES(?,?,?)').bind('old-retired',7,'[]').run();
 alice=(await api('hanzi_claim_username',{p_username:' Alice '})).data;
 bob=(await api('hanzi_claim_username',{p_username:'bob'})).data;
 const modules=await Promise.all(['cloudflare/web-push.ts','pages/cloudflare-client.ts'].map(entry=>build({absWorkingDir:root,entryPoints:[entry],bundle:true,write:false,format:'esm',platform:'node'})));
 [cryptoModule,client]=await Promise.all(modules.map(result=>import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'))));
});
after(async()=>{await mf?.dispose();if(temp)await rm(temp,{recursive:true,force:true});});
test('normalizes usernames, retains imported legacy mapping and rejects unknown account keys',async()=>{
 assert.match(alice,/^account-v1-[a-f0-9]{64}$/);assert.equal((await api('hanzi_claim_username',{p_username:'ALICE'})).data,alice);
 const legacy='account-v1-'+'f'.repeat(64);
 await db.prepare('INSERT INTO username_accounts VALUES(?,?,?)').bind('imported',legacy,new Date().toISOString()).run();
 assert.equal((await api('hanzi_claim_username',{p_username:'imported'})).data,legacy);
 assert.equal((await api('hanzi_claim_username',{p_username:'x'})).status,400);
 assert.equal((await api('hanzi_read_progress',{expected_account:'account-v1-'+'e'.repeat(64)})).status,401);
});
test('progress rejects malformed, over-bound, incomplete-at-end and fabricated lessons',async()=>{
 for(const extra of [{index:10},{index:11,complete:true},{index:9,complete:true},{index:3,independent:4},{index:2.5},{complete:'true'},{lessonId:'unknown'},{updatedAt:'today'}])
  assert.equal((await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(uid(),extra)})).status,400);
});
test('delayed saves cannot undo a later checkpoint, completion or completion date',async()=>{
 const id=uid(),yesterday=Date.now()-86400000;
 assert.equal((await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{index:8})})).data.saved,true);
 assert.equal((await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{index:4})})).data.saved,true);
 let row=await db.prepare('SELECT * FROM hanzi_sessions WHERE id=?').bind(id).first();assert.equal(row.position,8);
 assert.equal((await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{index:8,complete:true,updatedAt:yesterday})})).status,200);
 await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{index:9,complete:false})});
 row=await db.prepare('SELECT * FROM hanzi_sessions WHERE id=?').bind(id).first();assert.equal(row.complete,1);assert.equal(row.position,8);assert.equal(row.completed_at,yesterday);
 await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{index:10,complete:true})});
 row=await db.prepare('SELECT * FROM hanzi_sessions WHERE id=?').bind(id).first();assert.equal(row.position,10);assert.equal(row.completed_at,yesterday);
});
test('ID collisions cannot write across accounts or receive false save receipts',async()=>{
 const id=uid();await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id)});
 assert.equal((await api('hanzi_save_progress',{expected_account:bob,checkpoint:checkpoint(id,{index:5})})).status,409);
 assert.equal((await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{lessonId:'old-retired',index:7,complete:true})})).status,409);
 assert.equal((await db.prepare('SELECT user_id FROM hanzi_sessions WHERE id=?').bind(id).first()).user_id,alice);
});
test('retired completions and Taipei offline dates survive, future times are clamped',async()=>{
 const stamp=Date.parse('2026-10-01T16:00:00Z');
 const saved=await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(uid(),{lessonId:'old-retired',index:7,complete:true,updatedAt:stamp})});
 assert.ok(saved.data.studyDays.includes('2026-10-02'));
 const id=uid(),before=Date.now();await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(id,{index:10,complete:true,updatedAt:Date.now()+86400000})});
 const row=await db.prepare('SELECT completed_at FROM hanzi_sessions WHERE id=?').bind(id).first();assert.ok(row.completed_at>=before&&row.completed_at<=Date.now());
});
test('progress reads retain all study days but return latest complete and partial attempt per lesson',async()=>{
 const read=await api('hanzi_read_progress',{expected_account:alice});assert.equal(read.status,200);
 assert.ok(read.data.sessions.every(row=>typeof row.complete==='boolean'));
 assert.equal(new Set(read.data.sessions.map(row=>row.lessonId+':'+row.complete)).size,read.data.sessions.length);
 assert.ok(read.data.studyDays.includes('2026-10-02'));
 assert.equal((await api('hanzi_read_progress',{expected_account:bob})).data.sessions.length,0);
});
const attempt=(id=uid(),extra={})=>({expected_account:alice,p_attempt_id:id,p_item_id:'word:學',p_mode:'handwriting',p_correct:true,p_assisted:false,p_session_kind:'daily',...extra});
test('concurrent retry IDs count once and reused IDs with changed data are rejected',async()=>{
 const args=attempt();const replies=await Promise.all(Array.from({length:12},()=>api('hanzi_record_practice_attempt',args)));
 assert.ok(replies.every(r=>r.status===200));assert.equal(replies.at(-1).data.attempts,1);
 const collision=await api('hanzi_record_practice_attempt',{...args,p_correct:false});assert.equal(collision.status,400);
 const state=(await api('hanzi_read_practice_state',{expected_account:alice})).data.find(r=>r.itemId==='word:學');assert.equal(state.attempts,1);assert.equal(state.misses,0);
});
test('practice scoring preserves clean accuracy, assistance, strength and review intervals',async()=>{
 let r=await api('hanzi_record_practice_attempt',attempt(uid(),{p_correct:true,p_assisted:true}));
 assert.equal(r.data.attempts,2);assert.equal(r.data.correct,2);assert.equal(r.data.assisted,1);assert.equal(r.data.cleanCorrect,1);assert.equal(r.data.cleanTracked,2);assert.equal(r.data.streak,0);
 assert.ok(Math.abs(r.data.strength-0.162)<1e-12);assert.equal(r.data.nextReview-r.data.lastSeen,600000);
 r=await api('hanzi_record_practice_attempt',attempt(uid(),{p_correct:false}));assert.equal(r.data.misses,1);assert.ok(Math.abs(r.data.strength-0.0891)<1e-12);
 assert.equal((await api('hanzi_read_practice_state',{expected_account:bob})).data.length,0);
});
test('independent attempts update aggregates atomically under concurrency',async()=>{
 const replies=await Promise.all(Array.from({length:15},()=>api('hanzi_record_practice_attempt',attempt(uid(),{p_item_id:'concurrent'}))));assert.ok(replies.every(r=>r.status===200));
 const row=(await api('hanzi_read_practice_state',{expected_account:alice})).data.find(r=>r.itemId==='concurrent');assert.equal(row.attempts,15);assert.equal(row.streak,15);assert.equal(row.strength,1);
});
test('mastered and reverse-mastered words stay distinct and account-scoped',async()=>{
 for(const word of ['word:學','reverse:word:學'])assert.equal((await api('hanzi_set_mastered',{expected_account:alice,p_vocab_id:word,p_mastered:true})).status,200);
 assert.deepEqual((await api('hanzi_read_mastered',{expected_account:alice})).data,['reverse:word:學','word:學']);
 assert.deepEqual((await api('hanzi_read_mastered',{expected_account:bob})).data,[]);
 await api('hanzi_set_mastered',{expected_account:alice,p_vocab_id:'word:學',p_mastered:false});
 assert.deepEqual((await api('hanzi_read_mastered',{expected_account:alice})).data,['reverse:word:學']);
});
test('CORS, JSON types, actual request size and unknown operations are enforced',async()=>{
 assert.equal((await api('hanzi_read_progress',{expected_account:alice},{Origin:'https://evil.test'})).status,403);
 assert.equal((await api('hanzi_read_progress',{expected_account:alice})).response.headers.get('access-control-allow-origin'),origin);
 assert.equal((await api('hanzi_read_progress',{expected_account:alice},{'Content-Type':'text/plain'})).status,415);
 assert.equal((await api('hanzi_read_progress',{expected_account:alice,junk:'x'.repeat(13000)})).status,413);
 assert.equal((await api('no_such_operation',{expected_account:alice})).status,404);
});
test('widget contract keeps streak, goal, next characters and theme, without creating profiles',async()=>{
 let response=await mf.dispatchFetch('https://hanzi.test/widget?username=alice');const data=await response.json();assert.equal(response.status,200);
 for(const key of ['version','current','streak','practicedToday','day','todayProgress','todayGoal','unit','unitTheme','unitColor','nextCharacter','nextCharacters','capturedAt'])assert.ok(Object.hasOwn(data,key),key);
 assert.equal(data.todayGoal,10);assert.ok(data.nextCharacters.length<=2);
 response=await mf.dispatchFetch('https://hanzi.test/widget?username=nonexistent');assert.equal(response.status,404);assert.equal(await db.prepare("SELECT 1 FROM username_accounts WHERE username='nonexistent'").first(),null);
});
test('push preferences remain account-scoped and server fetch endpoints reject SSRF',async()=>{
 const ua=createECDH('prime256v1');ua.generateKeys();const keys={p256dh:ua.getPublicKey().toString('base64url'),auth:randomBytes(16).toString('base64url')};
 const endpoint='https://fcm.googleapis.com/fcm/send/test';
 const args={expected_account:alice,push_subscription:{endpoint,keys},push_preferences:{streakReminders:true,encouragement:false,sentenceChecks:true}};
 assert.equal((await api('hanzi_push_upsert',args)).status,200);
 assert.equal((await api('hanzi_push_read',{expected_account:alice,expected_endpoint:endpoint})).data.encouragement,false);
 assert.equal((await api('hanzi_push_read',{expected_account:bob,expected_endpoint:endpoint})).data,null);
 for(const endpoint of ['https://127.0.0.1/private','https://fcm.googleapis.com.evil.test/path','https://user:pass@fcm.googleapis.com/path','https://fcm.googleapis.com:444/path'])
  assert.equal((await api('hanzi_push_upsert',{...args,push_subscription:{endpoint,keys}})).status,400);
 await api('hanzi_push_disable',{expected_account:bob,expected_endpoint:endpoint});assert.equal((await api('hanzi_push_read',{expected_account:alice,expected_endpoint:endpoint})).data.enabled,true);
});
test('native web-push encryption decrypts independently according to RFC 8291',async()=>{
 const ua=createECDH('prime256v1');ua.generateKeys();const auth=randomBytes(16),text='Notifications work. 測試成功 🎉';
 const encoded=await cryptoModule.encryptedBody(text,ua.getPublicKey().toString('base64url'),auth.toString('base64url'));
 const data=Buffer.from(encoded),salt=data.subarray(0,16),keyLength=data[20],as=data.subarray(21,21+keyLength),encrypted=data.subarray(21+keyLength);
 assert.equal(data.readUInt32BE(16),4096);assert.equal(keyLength,65);
 const shared=ua.computeSecret(as);
 const ikm=hkdfSync('sha256',shared,auth,Buffer.concat([Buffer.from('WebPush: info\0'),ua.getPublicKey(),as]),32);
 const key=hkdfSync('sha256',ikm,salt,Buffer.from('Content-Encoding: aes128gcm\0'),16),nonce=hkdfSync('sha256',ikm,salt,Buffer.from('Content-Encoding: nonce\0'),12);
 const decipher=createDecipheriv('aes-128-gcm',key,nonce);decipher.setAuthTag(encrypted.subarray(-16));
 const plain=Buffer.concat([decipher.update(encrypted.subarray(0,-16)),decipher.final()]);assert.equal(plain.at(-1),2);assert.equal(plain.subarray(0,-1).toString(),text);
});
test('VAPID JWT has valid ES256 signature, audience and expiry',async()=>{
 const {privateKey,publicKey}=generateKeyPairSync('ec',{namedCurve:'prime256v1'}),jwk=privateKey.export({format:'jwk'});
 const raw=Buffer.concat([Buffer.from([4]),Buffer.from(jwk.x,'base64url'),Buffer.from(jwk.y,'base64url')]).toString('base64url');
 const authorization=await cryptoModule.vapidAuthorization('https://web.push.apple.com/token',raw,jwk.d,'mailto:hanzi@example.test');
 const jwt=authorization.match(/t=([^,]+)/)[1],[header,payload,signature]=jwt.split('.');
 const claims=JSON.parse(Buffer.from(payload,'base64url'));assert.equal(claims.aud,'https://web.push.apple.com');assert.ok(claims.exp>Date.now()/1000&&claims.exp<Date.now()/1000+86400);
 assert.equal(verify('sha256',Buffer.from(header+'.'+payload),{key:publicKey,dsaEncoding:'ieee-p1363'},Buffer.from(signature,'base64url')),true);
});
test('client preserves cancellation, HTTP errors and empty successful results',async()=>{
 let calls=0,signal;const transport=client.cloudflareClient('https://hanzi.test',async(url,init)=>{calls++;signal=init.signal;return Response.json(null);});
 const controller=new AbortController(),request=transport.rpc('hanzi_read_progress',{expected_account:alice});assert.equal(calls,0);
 assert.equal((await request.abortSignal(controller.signal)).error,null);assert.equal(signal,controller.signal);assert.equal(calls,1);
 assert.equal((await request).data,null);assert.equal(calls,1);
 const fail=client.cloudflareClient('https://hanzi.test',async()=>Response.json({error:'Sign in',code:'28000'},{status:401}));
 assert.equal((await fail.rpc('hanzi_read_progress')).status,401);
});
test('hibernating widgets receive saved progress; public clients cannot publish',async()=>{
 const response=await mf.dispatchFetch(`https://hanzi.test/widgets/events?account=${alice}`,{headers:{Upgrade:'websocket',Origin:origin}});assert.equal(response.status,101);
 const socket=response.webSocket;socket.accept();
 const received=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Widget update timed out')),5000);socket.addEventListener('message',event=>{clearTimeout(timer);resolve(JSON.parse(event.data));},{once:true});});
 await api('hanzi_save_progress',{expected_account:alice,checkpoint:checkpoint(uid())});
 const event=await received;assert.equal(event.event,'progress');assert.equal(event.topic,'hanzi-progress:'+alice);
 assert.equal((await mf.dispatchFetch('https://hanzi.test/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,404);socket.close();
});
test('D1 state survives a runtime restart',async()=>{
 const previous=(await api('hanzi_read_progress',{expected_account:alice})).data;
 await mf.dispose();mf=runtime();db=await mf.getD1Database('DB');
 assert.deepEqual((await api('hanzi_read_progress',{expected_account:alice})).data,previous);
 assert.equal((await api('hanzi_claim_username',{p_username:'alice'})).data,alice);
});

test('push sends valid encrypted notifications in the actual Workers runtime',async()=>{
 let captured;
 pushMock.get('https://fcm.googleapis.com').intercept({path:'/fcm/send/test',method:'POST'}).reply(options=>{captured=options;return {statusCode:201,data:''};});
 const response=await mf.dispatchFetch('https://hanzi.test/functions/v1/hanzi-push',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({action:'test',expectedAccount:alice,endpoint:'https://fcm.googleapis.com/fcm/send/test'})});
 assert.equal(response.status,200);assert.equal((await response.json()).sent,true);assert.ok(captured);
 const headers=Array.isArray(captured.headers)?Object.fromEntries(captured.headers.reduce((out,value,index,list)=>{if(index%2===0)out.push([value,list[index+1]]);return out;},[])):captured.headers;
 assert.ok(JSON.stringify(headers).includes('aes128gcm'));assert.ok(JSON.stringify(headers).includes('vapid'));
});
test('expired push subscriptions are removed and other accounts cannot send tests',async()=>{
 const endpoint='https://fcm.googleapis.com/fcm/send/test';
 let response=await mf.dispatchFetch('https://hanzi.test/functions/v1/hanzi-push',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'test',expectedAccount:bob,endpoint})});assert.equal(response.status,404);
 pushMock.get('https://fcm.googleapis.com').intercept({path:'/fcm/send/test',method:'POST'}).reply(410,'expired');
 response=await mf.dispatchFetch('https://hanzi.test/functions/v1/hanzi-push',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'test',expectedAccount:alice,endpoint})});assert.equal(response.status,410);
 assert.equal((await api('hanzi_push_read',{expected_account:alice,expected_endpoint:endpoint})).data,null);
});
test('scheduled notification claims prevent duplicate sends across retries',async()=>{
 const endpoint='https://fcm.googleapis.com/fcm/send/scheduled',ua=createECDH('prime256v1');ua.generateKeys();
 await api('hanzi_push_upsert',{expected_account:alice,push_subscription:{endpoint,keys:{p256dh:ua.getPublicKey().toString('base64url'),auth:randomBytes(16).toString('base64url')}},push_preferences:{streakReminders:false,encouragement:false,sentenceChecks:true}});
 const bindings=await mf.getBindings();const stub=bindings.WIDGET_EVENTS.get(bindings.WIDGET_EVENTS.idFromName('push:'+endpoint));
 let requests=0;pushMock.get('https://fcm.googleapis.com').intercept({path:'/fcm/send/scheduled',method:'POST'}).reply(()=>{requests++;return {statusCode:201,data:''};}).persist();
 let due;
 for(let hour=8;hour<=19;hour++){
  const now=Date.parse('2026-10-12T00:00:00Z')+(hour-8)*3600000;
  const response=await stub.fetch('https://internal/push',{method:'POST',body:JSON.stringify({endpoint,now})});const data=await response.json();
  if(data.sent){due=now;break;}
 }
 assert.ok(due);assert.equal(requests,1);
 const again=await stub.fetch('https://internal/push',{method:'POST',body:JSON.stringify({endpoint,now:due})});assert.equal((await again.json()).sent,undefined);assert.equal(requests,1);
 assert.equal((await db.prepare('SELECT count(*) AS count FROM hanzi_push_log WHERE user_id=?').bind(alice).first()).count,1);
});
