const {chromium}=require(process.env.HANZI_PLAYWRIGHT||'playwright');const fs=require('fs');const {spawn}=require('child_process');const assert=require('node:assert/strict');
let server,activePage;
(async()=>{
fs.mkdirSync('test-results/readings',{recursive:true});
server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4173'],{stdio:'inherit'});
for(let i=0;i<100;i++){try{const r=await fetch('http://127.0.0.1:4173/hanzi-steps/');if(r.ok)break;}catch{}await new Promise(r=>setTimeout(r,200));}
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
const {lessons}=await import('../../course/runtime.ts');
const sessions=lessons.map(l=>({id:crypto.randomUUID(),lessonId:l.id,index:l.steps.length,independent:0,assisted:0,complete:true,updatedAt:Date.now()}));
await context.addInitScript(s=>{if(!localStorage.getItem('test-seeded')){localStorage.setItem('hanzi-steps-unsynced-v1-signed-out',JSON.stringify(s));localStorage.setItem('test-seeded','yes')}},sessions);
const page=await context.newPage();activePage=page;const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173/hanzi-steps/');
async function choose(n,book=1){await page.getByRole('button',{name:/Change book or unit/}).click();await page.getByRole('button',{name:`Book ${book}`,exact:true}).click();await page.getByRole('button',{name:new RegExp(`^Unit ${n} ·`)}).click();await page.getByRole('dialog').waitFor({state:'hidden'});}
await choose(10);await page.getByRole('button',{name:'Start reading',exact:true}).first().click();
await page.getByRole('heading',{name:'A plan everyone can enjoy'}).waitFor();
assert.equal(await page.locator('.reading-pinyin').count(),0);assert.equal(await page.locator('.reading-walkthrough').count(),0);
await page.screenshot({path:'test-results/readings/mobile.png',fullPage:true});
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
await page.getByRole('button',{name:'Explain 可是 (new word)',exact:true}).click();
await page.getByText('but; connects two contrasting statements',{exact:true}).waitFor();
assert.equal(await page.getByText('kěshì',{exact:true}).count(),0);
await page.getByRole('button',{name:'Reveal pronunciation',exact:true}).click();await page.getByText('kěshì',{exact:true}).waitFor();
await page.getByRole('button',{name:'Close word explanation'}).click();
await page.getByRole('button',{name:'Reveal pinyin',exact:true}).click();assert.equal(await page.locator('.reading-pinyin').count(),5);
await page.getByRole('button',{name:'Hide pinyin',exact:true}).click();
await page.getByRole('button',{name:'Try the questions',exact:true}).click();
await page.getByRole('button',{name:'Explain 爸爸',exact:true}).first().click();await page.getByRole('button',{name:'Explain character 爸',exact:true}).click();await page.getByRole('button',{name:'Back to whole word',exact:true}).waitFor();await page.getByRole('button',{name:'Close word explanation'}).click();
const submit=page.getByRole('button',{name:'Check answers & unpack the reading'});assert.equal(await submit.isDisabled(),true);
await page.locator('fieldset').first().getByRole('radio').first().check();
await page.reload();await choose(10);await page.getByRole('button',{name:'Resume reading',exact:true}).click();
assert.equal(await page.locator('fieldset').first().getByRole('radio').first().isChecked(),true);assert.equal(await page.locator('.reading-walkthrough').count(),0);assert.equal(await page.locator('.reading-pinyin').count(),0);
for(let i=1;i<4;i++)await page.locator('fieldset').nth(i).getByRole('radio').first().check();
await submit.click();await page.getByRole('heading',{name:'From sentences to meaning'}).waitFor();assert.equal(await page.locator('.reading-answer-note').count(),4);assert.equal(await page.locator('.reading-walkthrough article').count(),5);
await page.screenshot({path:'test-results/readings/mobile-review.png',fullPage:true});
await page.getByRole('button',{name:'Back to the unit',exact:true}).last().click();await page.getByRole('button',{name:'Revisit reading',exact:true}).waitFor();
await page.getByRole('button',{name:'Revisit reading',exact:true}).click();await page.getByRole('heading',{name:'From sentences to meaning'}).waitFor();
await page.getByRole('button',{name:'Try again with pinyin hidden',exact:true}).click();assert.equal(await page.locator('.reading-walkthrough').count(),0);assert.equal(await page.locator('.reading-pinyin').count(),0);
await page.getByRole('button',{name:'Back to the unit',exact:true}).click();
// Every checkpoint is reachable on mobile and respects hidden-pinyin defaults.
async function checkUnitReadings(n,expected,book=1){
 await choose(n,book);
 const stages=page.locator('.reading-stage');
 assert.equal(await stages.count(),expected,`Book ${book} Unit ${n} reading count`);
 for(let i=0;i<expected;i++){
  await stages.nth(i).getByRole('button',{name:'Start reading',exact:true}).click();
  await page.locator('.reading-passage').waitFor();
  assert.equal(await page.locator('.reading-pinyin').count(),0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.getByRole('button',{name:'Back to the unit',exact:true}).click();
 }
}
for(const n of [10,13,16,19,22,25,28,31,34,37,40,43,46])await checkUnitReadings(n,3);
await checkUnitReadings(48,1);
await checkUnitReadings(44,2);
for(const n of [11,12,14,15,17,18,20,21,23,24,26,27,29,30,32,33,35,36,38,39,41,42,45,47])await checkUnitReadings(n,1);
// Exercise each richer presentation on phone and desktop without changing lesson drafts.
const lessonDraftsBefore=await page.evaluate(()=>localStorage.getItem('hanzi-steps-unsynced-v1-signed-out'));
for(const [n,format] of [[11,'dialogue'],[17,'messages'],[23,'schedule'],[32,'notice']]){
 await choose(n);await page.getByRole('button',{name:'Start reading',exact:true}).click();
 assert.equal(await page.locator(`.reading-document[data-presentation=${format}] .reading-line`).count(),8);
 assert.equal(await page.locator('.reading-pinyin').count(),0);
 assert.equal(await page.locator('.reading-walkthrough').count(),0);
 await page.screenshot({path:`test-results/readings/dense-${format}-mobile.png`,fullPage:true});
 await page.getByRole('button',{name:'Reveal pinyin',exact:true}).click();
 assert.equal(await page.locator('.reading-pinyin').count(),8);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.getByRole('button',{name:'Try the questions',exact:true}).click();
 await page.locator('fieldset').first().getByRole('radio').nth(1).check();
 await page.reload();await choose(n);await page.getByRole('button',{name:'Resume reading',exact:true}).click();
 assert.equal(await page.locator('fieldset').first().getByRole('radio').nth(1).isChecked(),true);
 assert.equal(await page.locator('.reading-pinyin').count(),0);
 for(let i=1;i<4;i++)await page.locator('fieldset').nth(i).getByRole('radio').nth(i).check();
 await page.getByRole('button',{name:'Check answers & unpack the reading'}).click();
 assert.equal(await page.locator('.reading-walkthrough article').count(),8);
 const href=await page.locator('.reading-answer-note a').first().getAttribute('href');
 assert.equal(await page.locator(href).count(),1,'evidence targets the original passage line');
 await page.setViewportSize({width:1365,height:950});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.screenshot({path:`test-results/readings/dense-${format}-desktop.png`,fullPage:true});
 await page.getByRole('button',{name:'Try again with pinyin hidden',exact:true}).click();
 assert.equal(await page.locator('.reading-pinyin').count(),0);
 assert.equal(await page.locator('.reading-walkthrough').count(),0);
 await page.getByRole('button',{name:'Back to the unit',exact:true}).click();
 await page.setViewportSize({width:390,height:844});
}
await choose(12);await page.getByRole('button',{name:'Start reading',exact:true}).click();
assert.equal(await page.locator('.reading-line').count(),4);
assert.equal(await page.locator('.reading-pinyin').count(),0);
await page.getByRole('button',{name:'Try the questions',exact:true}).click();
assert.equal(await page.locator('fieldset').count(),2);
await page.locator('fieldset').first().getByRole('radio').nth(1).check();
await page.reload();await choose(12);await page.getByRole('button',{name:'Resume reading',exact:true}).click();
assert.equal(await page.locator('fieldset').first().getByRole('radio').nth(1).isChecked(),true);
assert.equal(await page.getByRole('button',{name:'Check answers & unpack the reading'}).isDisabled(),true);
await page.locator('fieldset').nth(1).getByRole('radio').nth(3).check();
await page.getByRole('button',{name:'Check answers & unpack the reading'}).click();
assert.equal(await page.locator('.reading-walkthrough article').count(),4);
await page.getByRole('button',{name:'Try again with pinyin hidden',exact:true}).click();
assert.equal(await page.locator('.reading-pinyin').count(),0);
await page.getByRole('button',{name:'Back to the unit',exact:true}).click();
assert.equal(await page.evaluate(()=>localStorage.getItem('hanzi-steps-unsynced-v1-signed-out')),lessonDraftsBefore,'reading attempts must not alter the offline lesson sync queue');
await checkUnitReadings(4,3,2);
await choose(4,2);await page.locator('.reading-stage').first().getByRole('button',{name:'Start reading',exact:true}).click();await page.getByRole('heading',{name:'The shop you walk past'}).waitFor();
await page.setViewportSize({width:1365,height:950});await page.screenshot({path:'test-results/readings/desktop.png',fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
assert.deepEqual(errors,[]);
// Fresh learner can preview the set but cannot launch any Unit 10 reading.
const locked=await browser.newContext({viewport:{width:390,height:844}});const p2=await locked.newPage();await p2.goto('http://127.0.0.1:4173/hanzi-steps/');await p2.getByRole('button',{name:/Change book or unit/}).click();await p2.getByRole('button',{name:/^Unit 10 ·/}).click();const locks=p2.getByRole('button',{name:'Unlocks at end of Unit 10'});await locks.first().waitFor();assert.equal(await locks.count(),3);for(let i=0;i<3;i++)assert.equal(await locks.nth(i).isDisabled(),true);
await p2.getByRole('button',{name:/Change book or unit/}).click();await p2.getByRole('button',{name:/^Unit 11 ·/}).click();assert.equal(await p2.getByRole('button',{name:'Unlocks at end of Unit 11'}).isDisabled(),true);
// Mock the configured RPC boundary: no real user account or production writes.
const cloud=await browser.newContext({viewport:{width:390,height:844}});
const account='account-v1-'+'a'.repeat(64),remote=new Map(sessions.map(s=>[s.id,s])),saved=[];
const pending={...sessions[0],id:crypto.randomUUID(),updatedAt:Date.now()};
await cloud.route('https://*.supabase.co/**',async route=>{
 const rpc=route.request().url().split('/').pop(),body=route.request().postDataJSON();
 let response;
 if(rpc==='hanzi_claim_username')response=account;
 else if(rpc==='hanzi_read_progress'){assert.equal(body.expected_account,account);response={sessions:[...remote.values()],studyDays:[]};}
 else if(rpc==='hanzi_save_progress'){assert.equal(body.expected_account,account);saved.push(body.checkpoint);remote.set(body.checkpoint.id,body.checkpoint);response={saved:true,studyDays:[]};}
 else if(rpc==='hanzi_read_mastered')response={mastered:[]};
 else if(rpc==='hanzi_read_practice_state')response={states:[],mastery:[]};
 else response=[];
 await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(response)});
});
await cloud.addInitScript(({account,pending})=>{if(!localStorage.getItem('sync-test-seeded')){localStorage.setItem('hanziSteps.activeUsername','dense_reading_test');localStorage.setItem('hanzi-steps-unsynced-v1-'+account,JSON.stringify([pending]));localStorage.setItem('sync-test-seeded','yes')}},{account,pending});
const cp=await cloud.newPage();cp.on('pageerror',e=>errors.push(e.message));await cp.goto('http://127.0.0.1:4173/hanzi-steps/');
await cp.waitForFunction(key=>localStorage.getItem(key)===null,'hanzi-steps-unsynced-v1-'+account);
assert.equal(saved.length,1,'old offline lesson draft is flushed exactly once');assert.deepEqual(saved[0],pending);
const cloudBefore=JSON.stringify([...remote.values()]);
async function openCloudReading(){await cp.getByRole('button',{name:/Change book or unit/}).click();await cp.getByRole('button',{name:'Book 1',exact:true}).click();await cp.getByRole('button',{name:/^Unit 11 ·/}).click();await cp.locator('.reading-stage button').click();await cp.locator('.reading-passage').waitFor();}
await openCloudReading();await cp.getByRole('button',{name:'Try the questions',exact:true}).click();
for(let i=0;i<4;i++)await cp.locator('fieldset').nth(i).getByRole('radio').nth(i).check();
await cp.getByRole('button',{name:'Check answers & unpack the reading'}).click();
assert.equal(saved.length,1,'reading does not submit a fake lesson checkpoint');
await cp.reload();await openCloudReading();await cp.getByRole('heading',{name:'From sentences to meaning'}).waitFor();
assert.equal(await cp.locator('.reading-pinyin').count(),0);assert.equal(saved.length,1);
assert.equal(JSON.stringify([...remote.values()]),cloudBefore,'cloud lesson progress is unchanged after reading completion and reload');
assert.deepEqual(errors,[]);
console.log('PASS: all 69 reading stages; four dense layouts; mobile/desktop; hidden pinyin; evidence; resume; replay; locks; offline queue preserved; mocked RPC lesson sync and reading isolation.');
await browser.close();server.kill();
})().catch(async e=>{console.error(e);if(activePage){console.error(await activePage.locator('body').innerText().catch(()=>''));await activePage.screenshot({path:'test-results/readings/failure.png',fullPage:true}).catch(()=>{});}server?.kill();process.exit(1)});
