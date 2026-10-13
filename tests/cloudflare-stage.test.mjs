import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {deployStage} from '../scripts/deploy-cloudflare-stage.mjs';
const accountId='a'.repeat(32),token='synthetic-scoped-token';
test('staging fails before any external request when credentials are missing',async()=>{
 let calls=0;await assert.rejects(()=>deployStage({accountId,send:async()=>{calls++;}}));assert.equal(calls,0);
});
test('provisions only a Hanzi staging database and deploys without importing or activating',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'hanzi-stage-'));await mkdir(path.join(root,'cloudflare'));
 await writeFile(path.join(root,'cloudflare/wrangler.jsonc'),await readFile('cloudflare/wrangler.jsonc'));
 const calls=[],commands=[];
 try{
  const result=await deployStage({accountId,token,workingRoot:root,send:async(url,options={})=>{
   calls.push({url,options});
   if(url.endsWith('/health'))return Response.json({backend:'cloudflare'});
   if(options.method==='POST')return Response.json({success:true,result:{uuid:'staging-db',name:'hanzi-steps-migration'}});
   return Response.json({success:true,result:[{uuid:'other-db',name:'unrelated'}],result_info:{total_pages:1}});
  },run:async(args)=>{commands.push(args);return args[0]==='deploy'?'https://hanzi-steps-api.example.workers.dev':'Migrations complete';}});
  assert.equal(result.databaseId,'staging-db');assert.equal(commands.length,2);assert.equal(commands[0][0],'d1');assert.equal(commands[1][0],'deploy');
  const config=JSON.parse(await readFile(commands[1].at(-1),'utf8'));assert.equal(config.vars.PUSH_ENABLED,'false');assert.equal(config.d1_databases[0].database_id,'staging-db');
  assert.equal(JSON.stringify(config).includes(token),false);
  assert.equal(calls.filter(call=>call.options.method==='POST').length,1);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('refuses to modify an unrelated or already active existing staging database',async()=>{
 for(const active of [false,true]){
  let commands=0,queries=0;
  await assert.rejects(()=>deployStage({accountId,token,send:async(url,options={})=>{
   if(!options.method)return Response.json({success:true,result:[{uuid:'existing',name:'hanzi-steps-migration'}],result_info:{total_pages:1}});
   queries++;return Response.json({success:true,result:[{results:queries===1?(active?[{name:'migration_state'}]:[{name:'unrelated'}]):[{value:'true'}]}]});
  },run:async()=>{commands++;}}));assert.equal(commands,0);
 }
});
