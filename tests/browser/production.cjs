const {chromium}=require(process.env.HANZI_PLAYWRIGHT||'playwright');const {spawn}=require('child_process');const fs=require('fs');const assert=require('node:assert/strict');
let server,browser;
(async()=>{
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4175'],{stdio:['ignore','pipe','pipe']});
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4175/hanzi-steps/',{signal:AbortSignal.timeout(1000)})).ok)break}catch{}await new Promise(r=>setTimeout(r,200));}
 browser=await chromium.launch({headless:true,executablePath:process.env.HANZI_CHROMIUM||undefined,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
 const {lessons,phrases}=await import('../../lib/curriculum.ts');const baseline=JSON.parse(fs.readFileSync('validation/fixtures/production-append-baseline.json')).lessons;
 const targets=lessons.flatMap(l=>l.steps.map((s,index)=>({l,s,index}))).filter(x=>x.s.type==='produce');
 console.log('Browser started');const errors=[];fs.mkdirSync('test-results/production',{recursive:true});
 async function open(target,width=390,cloud=false){
  const context=await browser.newContext({viewport:{width,height:844},isMobile:width<600,hasTouch:width<600,reducedMotion:'reduce'});
  const rows=lessons.map(l=>({id:crypto.randomUUID(),lessonId:l.id,index:baseline.find(x=>x.id===l.id).length,independent:0,assisted:0,complete:true,updatedAt:1}));
  const partial={id:crypto.randomUUID(),lessonId:target.l.id,index:target.index,independent:0,assisted:0,complete:false,updatedAt:Date.now()};rows.push(partial);
  const key='account-v1-'+ 'a'.repeat(64),requests=[],remote=new Map(rows.map(r=>[r.id,r]));
  if(cloud){
   await context.addInitScript(()=>localStorage.setItem('hanziSteps.activeUsername','production_test'));
   await context.route('**://*.supabase.co/**',async route=>{
    const name=route.request().url().split('/').at(-1),body=route.request().postDataJSON();let data=[];
    if(name==='hanzi_claim_username')data=key;
    if(name==='hanzi_read_progress')data={sessions:[...remote.values()],studyDays:[]};
    if(name==='hanzi_save_progress'){assert.equal(body.expected_account,key);requests.push(body);remote.set(body.checkpoint.id,body.checkpoint);data={saved:true,studyDays:[]};}
    if(name==='hanzi_record_practice_attempt'){assert.equal(body.expected_account,key);requests.push(body);data=null;}
    await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
   });
  }
  await context.addInitScript(rows=>{if(!localStorage.getItem('production-seeded')){localStorage.setItem('hanzi-steps-unsynced-v1-signed-out',JSON.stringify(rows));localStorage.setItem('production-seeded','yes')}},rows);
  const page=await context.newPage();page.on('pageerror',e=>{errors.push(e.message);if(cloud)console.error('cloud page error',e.message)});await page.goto('http://127.0.0.1:4175/hanzi-steps/',{waitUntil:'domcontentloaded'});
  async function resume(){if(width>=600)await page.locator('.book-switcher').getByRole('button',{name:/^Book 1/}).click();await page.getByRole('button',{name:/Change book or unit/}).click();if(width<600)await page.getByRole('button',{name:'Book 1',exact:true}).click();await page.getByRole('button',{name:new RegExp(`^Unit ${Number(target.l.unitId.split('-')[1])} ·`)}).click();await page.getByRole('dialog').waitFor({state:'hidden'});await page.getByRole('button',{name:`Practice again: ${target.l.title}`,exact:true}).click();await page.locator('.production-exercise').waitFor();}
  if(cloud)await page.waitForFunction(()=>document.querySelector('.unit-picker-trigger')&&!document.querySelector('.username-login')&&!document.querySelector('.path-node:disabled')); 
  try{await resume()}catch(e){await page.screenshot({path:'test-results/production/failure.png',fullPage:true});console.error((await page.locator('body').innerText()).slice(0,2000));throw e}return {context,page,partial,resume,requests,remote};
 }
 const target=targets.find(x=>x.s.id==='u11-produce-one-tea');
 const {context,page,partial,resume}=await open(target);
 const input=page.getByRole('textbox',{name:'Your Chinese response'}),check=page.getByRole('button',{name:'Check answer',exact:true});
 assert.equal(await check.isDisabled(),true);assert.equal(await page.locator('.word-bank').count(),0);assert.equal(await page.locator('.exercise-pattern-help').count(),0);assert.equal(/\p{Script=Han}/u.test(await page.locator('.production-exercise').innerText()),false);
 await input.fill('我要一杯茶。');await input.dispatchEvent('compositionstart');assert.equal(await check.isDisabled(),true);await input.press('Enter');assert.equal(await page.locator('.exercise-footer.success').count(),0);await input.dispatchEvent('compositionend');await check.click();await page.getByText('You produced it independently!',{exact:true}).waitFor();
 let states=await page.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')));let row=states['phrase:u11-one-tea::sentence'];assert.equal(row.attempts,1);assert.equal(row.cleanCorrect,1);
 await page.getByRole('button',{name:'Continue',exact:true}).click();await page.locator('.completion-main').waitFor();
 const saved=await page.evaluate(id=>JSON.parse(localStorage.getItem('hanzi-steps-unsynced-v1-signed-out')).find(s=>s.id===id),partial.id);assert.equal(saved.complete,true);assert.equal(saved.independent,1);assert.equal(saved.index,target.l.steps.length);
 await context.close();
 // Progressive help, wrong answer, refresh and assisted recovery stay in existing mastery records.
 const helped=await open(target);const hp=helped.page;
 await hp.getByRole('button',{name:'Show grammar hint'}).click();assert.equal(/\p{Script=Han}/u.test(await hp.locator('.production-help').innerText()),false);assert.equal(await hp.locator('.word-bank').count(),0);assert.equal(await hp.getByRole('button',{name:'Show key vocabulary'}).isDisabled(),true);
 await hp.reload();await helped.resume();await hp.getByRole('textbox',{name:'Your Chinese response'}).fill(target.s.answer);await hp.getByRole('button',{name:'Check answer',exact:true}).click();await hp.getByText('Good practice with help!',{exact:true}).waitFor();
 states=await hp.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')));row=states['phrase:u11-one-tea::sentence'];assert.equal(row.cleanCorrect,0);assert.equal(row.assisted,1);assert.equal(row.streak,0);await helped.context.close();
 const wrong=await open(target);const wp=wrong.page;
 await wp.getByRole('textbox',{name:'Your Chinese response'}).fill('我要一茶');await wp.getByRole('button',{name:'Check answer',exact:true}).dblclick();await wp.getByText('This response did not match a reviewed form',{exact:true}).waitFor();
 states=await wp.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')));assert.equal(states['phrase:u11-one-tea::sentence'].attempts,1,'double-click cannot double record');
 await wp.getByRole('button',{name:'Try again'}).click();await wp.getByRole('button',{name:'Show grammar hint'}).click();await wp.getByRole('button',{name:'Show key vocabulary'}).click();assert.ok(/杯/.test(await wp.locator('.production-help').innerText()));assert.equal(await wp.locator('.word-bank').count(),0);await wp.getByRole('button',{name:'Use sentence-builder help'}).click();assert.equal(await wp.getByRole('textbox',{name:'Your Chinese response'}).count(),0);
 for(const token of phrases[target.s.phrase].tokens)await wp.locator('.word-bank').getByRole('button',{name:token,exact:true}).filter({visible:true}).first().click();
 await wp.getByRole('button',{name:'Check answer',exact:true}).click();await wp.getByText('Good practice with help!',{exact:true}).waitFor();await wrong.context.close();
 // Every prototype prompt/alternative works on a narrow mobile screen; no answer leaks.
 for(const t of targets.filter(x=>[11,29,48].includes(Number(x.l.unitId.split('-')[1])))){
  const v=await open(t,360);assert.equal(await v.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await v.page.screenshot({path:`test-results/production/${t.s.id}-mobile.png`,fullPage:true});
  await v.page.getByRole('textbox',{name:'Your Chinese response'}).fill(t.s.production.acceptedAnswers[0]||t.s.answer);await v.page.getByRole('button',{name:'Check answer',exact:true}).click();await v.page.getByText('You produced it independently!',{exact:true}).waitFor();await v.context.close();
 }
 // Signed-in RPC transport round-trips the same session and mastery attempt IDs.
 const synced=await open(target,390,true);
 await synced.page.getByRole('button',{name:'Show grammar hint'}).click();
 await synced.page.getByRole('textbox',{name:'Your Chinese response'}).fill(target.s.answer);
 await synced.page.getByRole('button',{name:'Check answer',exact:true}).click();
 await synced.page.getByText('Good practice with help!',{exact:true}).waitFor();
 await synced.page.getByRole('button',{name:'Continue',exact:true}).click();
 await synced.page.locator('.completion-main').waitFor();
 await synced.page.waitForFunction(()=>!document.querySelector('.sync-indicator.saving'));
 const uploaded=synced.requests.find(r=>r.checkpoint?.id===synced.partial.id&&r.checkpoint.complete)?.checkpoint;
 assert.ok(uploaded,'completed production checkpoint must upload through existing RPC');assert.equal(uploaded.index,target.l.steps.length);assert.equal(uploaded.assisted,1);assert.equal(uploaded.independent,0);
 const attempt=synced.requests.find(r=>r.p_item_id==='phrase:u11-one-tea');assert.ok(attempt);assert.equal(attempt.p_mode,'sentence');assert.equal(attempt.p_assisted,true);assert.equal(attempt.p_correct,true);assert.ok(attempt.p_attempt_id);
 await synced.page.reload();await synced.page.getByRole('button',{name:/Change book or unit/}).waitFor();assert.ok(synced.remote.get(synced.partial.id).complete);await synced.context.close();
 const desktop=await open(target,1365);await desktop.page.screenshot({path:'test-results/production/desktop.png',fullPage:true});assert.equal(await desktop.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await desktop.context.close();
 assert.deepEqual(errors,[]);console.log('PASS production browser: mobile/desktop, IME, accepted answers, help/fallback, deduplication, reload, mastery, signed-in RPC sync and historical progress.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.kill();});
