const {chromium}=require(process.env.HANZI_PLAYWRIGHT||'playwright');const fs=require('fs');const {spawn}=require('child_process');const assert=require('node:assert/strict');
let server,activePage;
(async()=>{
fs.mkdirSync('test-results/readings',{recursive:true});
server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4173'],{stdio:'inherit'});
for(let i=0;i<100;i++){try{const r=await fetch('http://127.0.0.1:4173/hanzi-steps/');if(r.ok)break;}catch{}await new Promise(r=>setTimeout(r,200));}
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
const {lessons}=await import('../../course/runtime.ts');
const sessions=lessons.map(l=>({id:crypto.randomUUID(),lessonId:l.id,index:l.steps.length,independent:0,assisted:0,complete:true,updatedAt:Date.now()}));
await context.addInitScript(s=>{if(!localStorage.getItem('test-seeded')){localStorage.setItem('hanzi-steps-unsynced-v1-signed-out',JSON.stringify(s));localStorage.setItem('test-seeded','yes')}},sessions);
const page=await context.newPage();activePage=page;const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4173/hanzi-steps/');
async function choose(n,book=1){await page.getByRole('button',{name:/Change book or unit/}).click();await page.getByRole('button',{name:`Book ${book}`,exact:true}).click();await page.getByRole('button',{name:new RegExp(`^Unit ${n} ·`)}).click();await page.getByRole('dialog').waitFor({state:'hidden'});}
await choose(10);await page.getByRole('button',{name:'Start reading',exact:true}).click();
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
for(const n of [13,16,19,22,25,28,31,34,37,40,44,48]){await choose(n);await page.getByRole('button',{name:'Start reading',exact:true}).click();await page.locator('.reading-passage').waitFor();assert.equal(await page.locator('.reading-pinyin').count(),0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.getByRole('button',{name:'Back to the unit',exact:true}).click();}
await choose(4,2);await page.getByRole('button',{name:'Start reading',exact:true}).click();await page.getByRole('heading',{name:'The shop you walk past'}).waitFor();
await page.setViewportSize({width:1365,height:950});await page.screenshot({path:'test-results/readings/desktop.png',fullPage:true});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
assert.deepEqual(errors,[]);
// Fresh learner can preview unit but cannot launch its reading.
const locked=await browser.newContext({viewport:{width:390,height:844}});const p2=await locked.newPage();await p2.goto('http://127.0.0.1:4173/hanzi-steps/');await p2.getByRole('button',{name:/Change book or unit/}).click();await p2.getByRole('button',{name:/^Unit 10 ·/}).click();assert.equal(await p2.getByRole('button',{name:'Finish the unit challenge to unlock'}).isDisabled(),true);
console.log('PASS: all 14 stages; mobile/desktop; word and character help; hidden pinyin; submit gate; walkthrough; resume; replay; completion; fresh learner lock; no page errors.');
await browser.close();server.kill();
})().catch(async e=>{console.error(e);if(activePage){console.error(await activePage.locator('body').innerText().catch(()=>''));await activePage.screenshot({path:'test-results/readings/failure.png',fullPage:true}).catch(()=>{});}server?.kill();process.exit(1)});
