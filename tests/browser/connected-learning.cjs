const {chromium}=require(process.env.HANZI_PLAYWRIGHT||'playwright');
const fs=require('node:fs');const {spawn}=require('node:child_process');const assert=require('node:assert/strict');
let server,browser,page;
(async()=>{
 fs.mkdirSync('test-results/connected-learning',{recursive:true});
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4174'],{stdio:'inherit'});
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4174/hanzi-steps/')).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const {lessons}=await import('../../course/runtime.ts');
 const sessions=lessons.map(l=>({id:crypto.randomUUID(),lessonId:l.id,index:l.steps.length,independent:0,assisted:0,complete:true,updatedAt:Date.now()}));
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await ctx.addInitScript(s=>{
  if(!localStorage.getItem('test-seeded')){localStorage.setItem('hanzi-steps-unsynced-v1-signed-out',JSON.stringify(s));localStorage.setItem('test-seeded','yes')}
  window.__audioMode='success';window.__spoken=[];
  window.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
  let timer;
  Object.defineProperty(window,'speechSynthesis',{value:{
   getVoices:()=>window.__audioMode==='no-voice'?[]:[{lang:'zh-TW'}],
   addEventListener(){},removeEventListener(){},cancel(){clearTimeout(timer)},
   speak(u){window.__spoken.push({text:u.text,rate:u.rate});timer=setTimeout(()=>window.__audioMode==='fail'?u.onerror?.():u.onend?.(),30)},
  }});
 },sessions);
 page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4174/hanzi-steps/');
 async function practice(){await page.getByRole('button',{name:'Practice',exact:true}).click()}
 async function listening(){await practice();await page.getByRole('button',{name:/Listening Path Hear/}).click()}
 await listening();const dialog=page.getByRole('dialog');
 const stageButtons=dialog.getByRole('button',{name:/^Start [3-7]-item stage$/});assert.ok(await stageButtons.count()>10);
 await page.screenshot({path:'test-results/connected-learning/listening-mobile.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await stageButtons.first().click();
 assert.equal(await dialog.locator('.listening-feedback').count(),0);
 assert.equal(await dialog.getByRole('button',{name:'I am a student.',exact:true}).isDisabled(),true);
 await dialog.getByRole('button',{name:'Play audio',exact:true}).click();await dialog.getByText('1 successful play',{exact:true}).waitFor();
 assert.deepEqual(await page.evaluate(()=>window.__spoken.at(-1)),{text:'我是學生。',rate:1});
 await dialog.getByRole('button',{name:'I am a student.',exact:true}).click();await dialog.locator('.listening-feedback').waitFor();
 await dialog.getByText('wǒ shì xuéshēng',{exact:true}).waitFor();
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')));
 assert.equal(state['listening:phrase:identity::recognition'].correct,1);
 assert.deepEqual(Object.keys(state),['listening:phrase:identity::recognition']);
 await dialog.getByRole('button',{name:'Back to Listening Path',exact:true}).last().click();
 await dialog.getByRole('button',{name:'Type pinyin',exact:true}).click();
 await dialog.getByRole('checkbox',{name:'Two-play challenge for single sentences'}).check();
 await stageButtons.first().click();
 assert.equal(await dialog.getByRole('button',{name:'Slow · with help'}).count(),0);
 await dialog.getByRole('button',{name:'Play audio',exact:true}).click();await dialog.getByText('1 plays remaining',{exact:true}).waitFor();
 await dialog.getByRole('button',{name:'Replay audio',exact:true}).click();await dialog.getByText('0 plays remaining',{exact:true}).waitFor();
 assert.equal(await dialog.getByRole('button',{name:'Replay audio',exact:true}).isDisabled(),true);
 await dialog.getByLabel('Pinyin',{exact:true}).fill('wo3shi4xue2sheng1');await dialog.getByRole('button',{name:'Check pinyin'}).click();await dialog.getByRole('heading',{name:'Correct',exact:true}).waitFor();
 await dialog.getByText('wǒ shì xuéshēng',{exact:true}).waitFor();
 await dialog.getByRole('button',{name:'Back to Listening Path',exact:true}).last().click();
 // A missing voice cannot consume a play or create a mastery attempt.
 const before=await page.evaluate(()=>localStorage.getItem('hanzi-steps-practice-v1-signed-out'));
 await page.evaluate(()=>window.__audioMode='no-voice');
 await stageButtons.first().click();await dialog.getByRole('button',{name:'Play audio',exact:true}).click();
 await dialog.getByText(/A Taiwanese Mandarin voice is not available/).waitFor();
 await dialog.getByText('2 plays remaining',{exact:true}).waitFor();
 assert.equal(await dialog.getByRole('button',{name:'Check pinyin'}).isDisabled(),true);
 await dialog.getByRole('button',{name:'Use transcript without scoring',exact:true}).click();await dialog.getByText('Transcript practice · no listening score recorded.',{exact:true}).waitFor();
 await dialog.getByRole('button',{name:'Back without scoring'}).click();assert.equal(await page.evaluate(()=>localStorage.getItem('hanzi-steps-practice-v1-signed-out')),before);
 // Stages now contain several items, so an unscored skip advances within the stage. Return to the path before changing session settings.
 await dialog.getByRole('button',{name:'Back to Listening Path',exact:true}).click();
 await page.evaluate(()=>window.__audioMode='success');
 // A synthesis error is unscored too; slow playback is explicitly assisted.
 await dialog.getByRole('checkbox',{name:'Two-play challenge for single sentences'}).uncheck();
 await dialog.getByRole('button',{name:'Hear the meaning',exact:true}).click();
 await stageButtons.first().click();
 await page.evaluate(()=>window.__audioMode='fail');
 await dialog.getByRole('button',{name:'Play audio',exact:true}).click();await dialog.getByText(/Audio could not play/).waitFor();
 await dialog.getByText('0 successful plays',{exact:true}).waitFor();
 assert.equal(await dialog.getByRole('button',{name:'I am a student.',exact:true}).isDisabled(),true);
 assert.equal(await page.evaluate(()=>localStorage.getItem('hanzi-steps-practice-v1-signed-out')),before);
 await page.evaluate(()=>window.__audioMode='success');
 await dialog.getByRole('button',{name:'Slow · with help',exact:true}).click();await dialog.getByText('1 successful play',{exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>window.__spoken.at(-1).rate),.65);
 await dialog.getByRole('button',{name:'I am a student.',exact:true}).click();await dialog.getByRole('heading',{name:'Correct with help',exact:true}).waitFor();
 const assistedState=await page.evaluate(()=>JSON.parse(localStorage.getItem('hanzi-steps-practice-v1-signed-out')));
 assert.equal(assistedState['listening:phrase:identity::recognition'].assisted,1);
 await dialog.getByRole('button',{name:'Back to Listening Path',exact:true}).last().click();
 // A complete existing scene reuses the reading's answers, transcript and notes.
 await dialog.getByRole('button',{name:'Listen to scene',exact:true}).first().click();
 assert.equal(await dialog.locator('.listening-transcript').count(),0);
 assert.equal(await dialog.getByRole('button',{name:'Submit answers & reveal transcript'}).isDisabled(),true);
 await dialog.getByRole('button',{name:'Play scene',exact:true}).click();await dialog.getByText('1 complete play',{exact:true}).waitFor();
 for(let i=0;i<4;i++)await dialog.locator('fieldset').nth(i).getByRole('radio').first().check();
 await dialog.getByRole('button',{name:'Submit answers & reveal transcript'}).click();await dialog.locator('.listening-transcript').waitFor();
 assert.equal(await dialog.locator('.listening-transcript .pinyin').count(),0);
 await dialog.getByRole('button',{name:'Reveal pinyin',exact:true}).click();assert.ok(await dialog.locator('.listening-transcript .pinyin').count()>=5);
 await page.screenshot({path:'test-results/connected-learning/scene-mobile.png',fullPage:true});
 await dialog.getByRole('button',{name:'Back to Listening Path',exact:true}).click();
 await dialog.getByRole('button',{name:'Listen to scene',exact:true}).first().click();await dialog.locator('.listening-transcript').waitFor();assert.equal(await dialog.locator('.listening-transcript .pinyin').count(),0);
 await dialog.getByRole('button',{name:'Try again with transcript hidden'}).click();assert.equal(await dialog.locator('.listening-transcript').count(),0);
 await page.keyboard.press('Escape');
 // Existing reading path launches the original gated reader.
 await practice();await page.getByRole('button',{name:/Reading Path Stories/}).click();assert.equal(await page.getByRole('button',{name:'Start reading',exact:true}).count(),44);
 await page.getByRole('button',{name:'Start reading',exact:true}).first().click();await page.getByRole('dialog').waitFor({state:'hidden'});await page.getByRole('heading',{name:'A plan everyone can enjoy',level:1}).waitFor();assert.equal(await page.locator('.reading-walkthrough').count(),0);
 await page.getByRole('button',{name:'Back to the unit',exact:true}).click();
 // Completed units expose both optional unit-scoped challenges side by side on mobile.
 const unitMega=page.getByRole('button',{name:/^Start Unit 4 Mega Challenge$/});
 const unitPinyin=page.getByRole('button',{name:/^Start Unit 4 Pinyin Gauntlet$/});
 assert.equal(await unitMega.count(),1);assert.equal(await unitPinyin.count(),1);
 const [megaBox,pinyinBox]=await Promise.all([unitMega.boundingBox(),unitPinyin.boundingBox()]);
 assert.ok(megaBox&&pinyinBox);
 assert.ok(Math.abs(megaBox.y-pinyinBox.y)<2,'unit challenge cards should share one row');
 assert.ok(megaBox.x<pinyinBox.x,'Mega Challenge should sit to the left of Pinyin Gauntlet');
 await page.screenshot({path:'test-results/connected-learning/unit-challenges-mobile.png',fullPage:true});
 await unitMega.click();
 await page.getByRole('heading',{name:'Mega Challenge · Unit 4',exact:true}).waitFor();
 await page.getByText('Unit 4 only.',{exact:false}).waitFor();
 await page.keyboard.press('Escape');
 await unitPinyin.click();
 await page.getByRole('heading',{name:'Pinyin Gauntlet · Unit 4',exact:true}).waitFor();
 await page.getByText('Unit 4 only.',{exact:false}).waitFor();
 await page.keyboard.press('Escape');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 // The recent statistics dashboard must remain contained and usable on mobile.
 await page.getByRole('button',{name:'Statistics',exact:true}).click();
 await page.getByRole('heading',{name:'Learning statistics',exact:true}).waitFor();
 await page.waitForTimeout(350);
 const statisticsDialog=page.getByRole('dialog');
 const statisticsBox=await statisticsDialog.boundingBox();
 assert.ok(statisticsBox&&statisticsBox.x>=0&&statisticsBox.x+statisticsBox.width<=390.5,'statistics dialog should fit the mobile viewport');
 await page.screenshot({path:'test-results/connected-learning/statistics-mobile.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.keyboard.press('Escape');
 // Global reference access remains, but learned-word details use completed lessons.
 await page.getByRole('button',{name:'Search by pinyin'}).click();await page.getByRole('textbox').fill('shang');
 await page.locator('.character-meanings').first().waitFor();await page.locator('.character-meanings summary').first().click();
 assert.ok(await page.locator('.character-meanings[open] .character-sense-badge').count()>0);
 assert.equal(await page.locator('.character-meanings[open] li').first().locator('.character-sense-badge').textContent(),'Learned');
 // Character reference cards expose common words without changing curriculum state.
 await page.getByRole('textbox').fill('tai');
 const taiCard=page.locator('.search-result-card').filter({has:page.locator('.search-result-title strong').filter({hasText:/^太$/})}).first();
 await taiCard.waitFor();
 await taiCard.locator('.character-meanings summary').click();
 await taiCard.getByText('Common words & expressions',{exact:true}).waitFor();
 await taiCard.getByText('太太',{exact:true}).waitFor();
 assert.ok(await taiCard.locator('.character-course-badge').count()>0,'future course words should be labelled without becoming learned');
 assert.ok(await taiCard.locator('.character-reference-badge').count()>0,'extra common words should be visibly reference-only');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'test-results/connected-learning/character-common-words-mobile.png',fullPage:true});
 await page.setViewportSize({width:1365,height:950});await page.screenshot({path:'test-results/connected-learning/cards-desktop.png',fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Statistics',exact:true}).click();
 await page.getByRole('heading',{name:'Learning statistics',exact:true}).waitFor();
 await page.waitForTimeout(350);
 await page.screenshot({path:'test-results/connected-learning/statistics-desktop.png',fullPage:true});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.keyboard.press('Escape');
 await practice();assert.equal(await page.getByRole('checkbox',{name:/Include a listening question/}).count(),0);await page.getByRole('button',{name:/Daily 10 10 adaptive/}).click();
 assert.deepEqual(errors,[]);
 // Fresh state does not unlock listening or reading from global Search/handwriting.
 const fresh=await browser.newContext({viewport:{width:390,height:844}});const p2=await fresh.newPage();await p2.goto('http://127.0.0.1:4174/hanzi-steps/');await p2.getByRole('button',{name:'Practice',exact:true}).click();await p2.getByRole('button',{name:/Listening Path Hear/}).click();assert.equal(await p2.getByRole('button',{name:'Quick listening mix · 0'}).isDisabled(),true);assert.equal(await p2.locator('.listening-stage button:not(:disabled)').count(),0);
 console.log('PASS: paths, mobile/desktop, source audio, hidden transcript, replay budgets, pinyin, failure fallback, mastery isolation, scenes, resume, unified character meanings, removed opt-in and fresh locks.');
 await browser.close();server.kill();
})().catch(async error=>{console.error(error);if(page){console.error(await page.locator('body').innerText().catch(()=>''));await page.screenshot({path:'test-results/connected-learning/failure.png',fullPage:true}).catch(()=>{})}await browser?.close();server?.kill();process.exit(1)});
