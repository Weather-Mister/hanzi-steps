import {test} from 'node:test';
import assert from 'node:assert/strict';
import {broadcastWidgetProgress,widgetProgressTopic,WIDGET_PROGRESS_EVENT} from '../pages/widget-notify.ts';

const account='account-v1-'+'b'.repeat(64);

test('widget broadcasts only account-scoped empty invalidation, never private checkpoint details',async()=>{
 const calls=[];
 const fakeFetch=async(url,options)=>{calls.push({url,options});return {ok:true}};
 assert.equal(await broadcastWidgetProgress(account,'https://example.supabase.co','sb_publishable_test',fakeFetch),true);
 assert.equal(calls.length,1);
 assert.equal(calls[0].url,'https://example.supabase.co/realtime/v1/api/broadcast');
 assert.equal(calls[0].options.method,'POST');
 assert.equal(calls[0].options.keepalive,true);
 assert.equal(calls[0].options.headers.apikey,'sb_publishable_test');
 assert.deepEqual(JSON.parse(calls[0].options.body),{messages:[{topic:`hanzi-progress:${account}`,event:WIDGET_PROGRESS_EVENT,payload:{}}]});
 assert.ok(!calls[0].options.body.includes('lesson'));
});

test('invalid account keys never emit signals',async()=>{
 let hits=0;
 const send=async()=>{hits++;return {ok:true}};
 for(const bad of ['','my_username','account-v1-no','account-v1-'+('X'.repeat(64))]){
  assert.equal(widgetProgressTopic(bad),null);
  assert.equal(await broadcastWidgetProgress(bad,'https://example.supabase.co','sb_publishable_test',send),false);
 }
 assert.equal(hits,0);
});

test('network failure and failed HTTP response never throw or change saved progress',async()=>{
 assert.equal(await broadcastWidgetProgress(account,'https://example.supabase.co','sb_publishable_test',async()=>{throw new Error('offline')}),false);
 assert.equal(await broadcastWidgetProgress(account,'https://example.supabase.co','sb_publishable_test',async()=>({ok:false})),false);
});
