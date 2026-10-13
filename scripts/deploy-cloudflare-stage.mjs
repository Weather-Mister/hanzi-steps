import {readFile,writeFile,mkdir,appendFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
export async function deployStage({accountId,token,send=fetch,run=runWrangler,workingRoot=root}){
 if(!/^[a-f0-9]{32}$/.test(accountId||'')||!token)throw new Error('Add CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN repository secrets before deployment.');
 const apiBase=`https://api.cloudflare.com/client/v4/accounts/${accountId}`;
 const api=async(url,options={})=>{
  const response=await send(url,{...options,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'}});
  const data=await response.json();
  if(!response.ok||data.success!==true)throw new Error('Cloudflare provisioning was refused. Check the account and scoped token permissions.');
  return data;
 };
 const name='hanzi-steps-migration';
 const databases=[];
 for(let page=1;;page++){
  const data=await api(`${apiBase}/d1/database?per_page=100&page=${page}`);
  databases.push(...data.result);
  if(data.result.length<100||!data.result_info||page>=data.result_info.total_pages)break;
 }
 const matches=databases.filter(row=>row.name===name);if(matches.length>1)throw new Error('Ambiguous staging database.');
 let database=matches[0];
 if(database){
  const result=await api(`${apiBase}/d1/database/${database.uuid}/query`,{method:'POST',body:JSON.stringify({sql:"SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name<>'d1_migrations'"})});
  const tables=result.result[0]?.results||[];
  const exists=tables.some(row=>row.name==='migration_state');
  if(!exists&&tables.length)throw new Error('The named staging database already exists without the Hanzi migration marker. Refusing to modify it.');
  const state=exists?await api(`${apiBase}/d1/database/${database.uuid}/query`,{method:'POST',body:JSON.stringify({sql:"SELECT value FROM migration_state WHERE key='ready'"})}):null;
  if(state&&state.result[0]?.results?.[0]?.value!=='false')throw new Error('The staging backend is already active. Use the normal deployment workflow instead of staging again.');
 }else database=(await api(`${apiBase}/d1/database`,{method:'POST',body:JSON.stringify({name,primary_location_hint:'apac'})})).result;
 const config=JSON.parse(await readFile(path.join(workingRoot,'cloudflare/wrangler.jsonc'),'utf8'));
 config.account_id=accountId;
 config.main=path.join(workingRoot,'cloudflare/worker.ts');
 config.d1_databases[0]={...config.d1_databases[0],database_name:name,database_id:database.uuid,migrations_dir:path.join(workingRoot,'cloudflare/migrations')};
 config.vars={...config.vars,PUSH_ENABLED:'false'};
 const directory=path.join(workingRoot,'work/cloudflare-deployment');await mkdir(directory,{recursive:true});
 const configPath=path.join(directory,'wrangler.json');await writeFile(configPath,JSON.stringify(config,null,2)+'\n');
 await run(['d1','migrations','apply',name,'--remote','--config',configPath],{accountId,token});
 const output=await run(['deploy','--config',configPath],{accountId,token});
 const url=output.match(/https:\/\/hanzi-steps-api\.[a-z0-9-]+\.workers\.dev\b/i)?.[0];
 if(!url)throw new Error('Deployment did not report a workers.dev URL. Complete Workers onboarding in Cloudflare and rerun staging.');
 await waitForHealth(url,send);
 console.log('Cloudflare staging backend:',url);
 console.log('Production stays on Supabase. No learner data or signing keys were imported, and notifications remain disabled.');
 return {url,databaseId:database.uuid};
}
export async function waitForHealth(url,send=fetch,pause=ms=>new Promise(resolve=>setTimeout(resolve,ms))){
 for(let attempt=0;attempt<12;attempt++){
  try{const response=await send(url+'/health');if(response.ok&&(await response.json()).backend==='cloudflare')return;}catch{}
  if(attempt<11)await pause(5000);
 }
 throw new Error('The Worker was uploaded, but its public health check is not ready. Retry staging after Cloudflare finishes propagating the address.');
}
async function runWrangler(args,{accountId,token}){
 return await new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,[path.join(root,'node_modules/wrangler/bin/wrangler.js'),...args],{
   cwd:root,env:{...process.env,CLOUDFLARE_ACCOUNT_ID:accountId,CLOUDFLARE_API_TOKEN:token,WRANGLER_SEND_METRICS:'false',CI:'true'},stdio:['ignore','pipe','pipe']
  });
  let output='';
  child.stdout.on('data',data=>{output+=data;process.stdout.write(data);});
  child.stderr.on('data',data=>{output+=data;process.stderr.write(data);});
  child.on('error',reject);child.on('exit',code=>code===0?resolve(output):reject(new Error('Cloudflare staging command failed. The live site was not switched.')));
 });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{
  const result=await deployStage({accountId:process.env.CLOUDFLARE_ACCOUNT_ID,token:process.env.CLOUDFLARE_API_TOKEN});
  if(process.env.GITHUB_STEP_SUMMARY)await appendFile(process.env.GITHUB_STEP_SUMMARY,`## Hanzi Steps staging\n\nBackend: ${result.url}\n\nD1: ${result.databaseId}\n\nImported: no. Activated: no. Push: disabled.\n`);
 }catch(error){console.error(error.message);process.exitCode=1;}
}
