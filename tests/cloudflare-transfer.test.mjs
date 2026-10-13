import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createTransferKey,sealTransfer,openTransfer} from '../scripts/cloudflare-sealed-transfer.mjs';
import {verifyFields,cloudflareApi} from '../scripts/cloudflare-migrate-live.mjs';
import {snapshotTables,sqliteValue} from '../scripts/cloudflare-snapshot.mjs';
import {waitForHealth} from '../scripts/deploy-cloudflare-stage.mjs';
const pair=createTransferKey('synthetic-db','https://synthetic.workers.dev');
test('sealed snapshots preserve all data and do not expose signing values in the envelope',()=>{
 const payload={secret:'synthetic-private-signing-value',rows:[{name:'學',complete:true,count:42}],date:'2026-10-13'};
 const envelope=sealTransfer(payload,pair.manifest);
 assert.deepEqual(openTransfer(envelope,pair.privateKey,pair.manifest),payload);
 assert.equal(JSON.stringify(envelope).includes(payload.secret),false);
});
test('sealed snapshots refuse wrong destinations, keys, ciphertext and authentication tags',()=>{
 const envelope=sealTransfer({private:'synthetic'},pair.manifest);
 for(const field of ['databaseId','workerUrl','keyId','ciphertext','tag']){
  const changed={...envelope,[field]:'changed'+envelope[field]};
  assert.throws(()=>openTransfer(changed,pair.privateKey,pair.manifest),/authentication failed/);
 }
 const other=createTransferKey(pair.manifest.databaseId,pair.manifest.workerUrl);
 assert.throws(()=>openTransfer(envelope,other.privateKey,pair.manifest),/authentication failed/);
 assert.throws(()=>sealTransfer({}, {...pair.manifest,keyId:'wrong'}));
});
test('remote comparison includes every field and refuses a same-count changed value',async()=>{
 const snapshot={exportedAt:'2026-10-13T00:00:00Z',tables:Object.fromEntries(Object.keys(snapshotTables).map(table=>[table,[]]))};
 snapshot.tables.username_accounts=[{username:'synthetic',legacy_user_id:'account-v1-'+'a'.repeat(64),created_at:'2026-10-13T00:00:00Z'}];
 snapshot.tables.lesson_lengths=[{lesson_id:'hello',steps:5,historical_steps:[3,4]}];
 const query=async(sql)=>{
  const table=sql.match(/FROM (\w+)/)[1];return snapshot.tables[table].map(row=>Object.fromEntries(snapshotTables[table].map(key=>[key,sqliteValue(row[key],key)])));
 };
 await verifyFields(snapshot,query);
 await assert.rejects(()=>verifyFields(snapshot,async(sql)=>{const rows=await query(sql);return rows.map(row=>row.steps?{...row,steps:6}:row);}),/lesson_lengths/);
});
test('administrative API errors do not include raw query data or server messages',async()=>{
 const send=async()=>Response.json({success:false,errors:[{message:'private raw synthetic row'}]},{status:403});
 const api=cloudflareApi('a'.repeat(32),'synthetic-token',send);
 await assert.rejects(()=>api('/synthetic',{sql:'private row'}),error=>!error.message.includes('private raw synthetic row'));
 assert.throws(()=>cloudflareApi('', 'synthetic-token'));
});
test('health checks tolerate temporary HTML and remain bounded when propagation fails',async()=>{
 let calls=0,pauses=0;
 await waitForHealth('https://synthetic.workers.dev',async()=>++calls<3?new Response('<!DOCTYPE html>'):Response.json({backend:'cloudflare'}),async()=>{pauses++;});
 assert.equal(calls,3);assert.equal(pauses,2);
 calls=0;await assert.rejects(()=>waitForHealth('https://synthetic.workers.dev',async()=>{calls++;return new Response('',{status:503});},async()=>{}));assert.equal(calls,12);
});
