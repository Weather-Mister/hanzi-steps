const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {spawn}=require('node:child_process');
let server;
(async()=>{
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4173'],{stdio:'ignore'});
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4173/hanzi-steps/')).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}

 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const {lessons}=await import('../../lib/curriculum.ts');
 

 const {learnedPracticeItems}=await import('../../lib/practice-engine.ts');
 const all=new Set(lessons.map(l=>l.id));
 const sessions=lessons.map(l=>({id:crypto.randomUUID(),lessonId:l.id,index:l.steps.length,independent:0,assisted:0,complete:true,updatedAt:Date.now()}));
 fs.mkdirSync('test-results/cumulative',{recursive:true});
 const context=await browser.newContext({viewport:{width:390,height:844}});
 await context.addInitScript(({sessions,mastered})=>{localStorage.setItem('hanzi-steps-unsynced-v1-signed-out',JSON.stringify(sessions));localStorage.setItem('hanzi-steps-mastered-v1-signed-out',JSON.stringify(mastered))},{sessions,mastered:learnedPracticeItems(all).map(i=>i.id)});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/hanzi-steps/');
 // A CJK font can be supplied for minimal headless environments without one.
 if(process.env.CJK_FONT_DIR){
  await page.route('**/__qa_fonts/*',route=>{const name=new URL(route.request().url()).pathname.split('/').pop();return route.fulfill({body:fs.readFileSync(process.env.CJK_FONT_DIR+'/files/'+name),contentType:'font/woff2'})});
  const css=fs.readFileSync(process.env.CJK_FONT_DIR+'/400.css','utf8').replaceAll('./files/','http://127.0.0.1:4173/__qa_fonts/');
  await page.addStyleTag({content:css+'\nbody{font-family:Arial,"Noto Sans TC",sans-serif}'});
  await page.evaluate(()=>document.fonts.ready);
 }

 
 await page.getByRole('button',{name:'Practice',exact:true}).click();
 await page.getByRole('button',{name:/Daily 10/}).click();
 const visited=[];
 // This isolated profile excludes base items to exercise the shared integration
 // in a short round. Intentional wrong answers must persist independently.
 for(let i=0;i<10;i++){
  if(await page.locator('.smart-finish').count())break;
  const discovery=page.locator('.knowledge-discovery');
  if(await discovery.count()){visited.push(await discovery.locator('h2').innerText());await discovery.getByRole('button',{name:'Try it',exact:true}).click();}
  const k=page.locator('.knowledge-question');
  if(await k.count()){
   if(await k.locator('.smart-token-bank').count()){
    while(await k.locator('.smart-token-bank button:enabled').count())await k.locator('.smart-token-bank button:enabled').first().click();
    await k.getByRole('button',{name:'Check',exact:true}).click();
   }else if(await k.locator('.smart-choice-grid').count())await k.locator('.smart-choice-grid button').first().click();
   else {await k.locator('input').fill('本');await k.getByRole('button',{name:'Check',exact:true}).click();}
   await page.locator('.knowledge-answer .pinyin').waitFor();
   await page.screenshot({path:'test-results/cumulative/mobile-feedback.png',fullPage:true});
  }else if(await page.locator('.smart-token-bank').count()){
   const bank=page.locator('.smart-token-bank');
   while(await page.getByRole('button',{name:'Check',exact:true}).isDisabled())await bank.locator('button:enabled').first().click();
   await page.getByRole('button',{name:'Check',exact:true}).click();
  }else if(await page.locator('.smart-choice-grid').count())await page.locator('.smart-choice-grid button').first().click();
  else if(await page.locator('.smart-question input').count()){await page.locator('.smart-question input').fill('錯');await page.getByRole('button',{name:'Check',exact:true}).click();}
  else {console.log('Handwriting slot encountered; browser test covered connections so far:',visited);break;}
  if(await page.getByRole('button',{name:'See results',exact:true}).count())await page.getByRole('button',{name:'See results',exact:true}).click();
  else await page.getByRole('button',{name:'Continue',exact:true}).click();
 }
 assert.equal(visited.length,3);
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')||'{}'));
 assert.ok(Object.keys(state).some(k=>/^(grammar|usage|family):/.test(k)));
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.keyboard.press('Escape');
 // Search remains unlocked; richer usages stay collapsed.
 await page.getByRole('button',{name:/Find by pinyin|Pinyin Search|Search by pinyin/}).click();
 await page.getByRole('textbox',{name:'Search Hanzi Steps by pinyin'}).fill('bang');
 const notes=page.locator('.pinyin-search-dialog .knowledge-notes');await notes.first().waitFor();assert.equal(await notes.first().getAttribute('open'),null);
 await notes.first().locator('summary').click();await page.getByText('Doing something for someone',{exact:true}).first().waitFor();
 await page.screenshot({path:'test-results/cumulative/mobile-search.png',fullPage:true});
 await page.setViewportSize({width:1365,height:950});await page.screenshot({path:'test-results/cumulative/desktop-search.png',fullPage:true});
 await page.keyboard.press('Escape');
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:/Change book or unit/}).click();
 await page.locator('.unit-picker-dialog').getByRole('button',{name:'Book 1',exact:true}).click();
 await page.getByRole('button',{name:/^Unit 13 ·/}).click();
 await page.getByRole('button',{name:'Start reading',exact:true}).click();
 assert.equal(await page.locator('.reading-main .knowledge-notes').count(),0);
 await page.getByRole('button',{name:'Try the questions',exact:true}).click();
 for(const field of await page.locator('fieldset').all())await field.getByRole('radio').first().check();
 await page.getByRole('button',{name:'Check answers & unpack the reading'}).click();
 const readingNotes=page.locator('.reading-walkthrough .knowledge-notes');await readingNotes.first().locator('summary').click();
 assert.equal(await readingNotes.locator('.pinyin').count(),0,'reading pinyin remains hidden');
 assert.ok(await readingNotes.getByText('Doing something for someone',{exact:true}).count());
 // Passive notes must not add practice attempts.
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')||'{}')),state);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/cumulative/mobile-reading.png',fullPage:true});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(errors,[]);await browser.close();server.kill();console.log('PASS cumulative UI, local persistence, mobile/desktop, clean console');
})().catch(e=>{console.error(e);server?.kill();process.exit(1)});
