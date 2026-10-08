let browser,server;
(async()=>{
 const {chromium}=await import(process.env.HANZI_PLAYWRIGHT?process.env.HANZI_PLAYWRIGHT+'/index.mjs':'playwright');
 const {spawn}=await import('node:child_process');
 const assert=(await import('node:assert/strict')).default;
 const fs=(await import('node:fs')).default;
 const {extraUnits,extraLessons,extraPracticeLessons,extraAnswer,extraChoices}=await import('../../course/extras/units.ts');
 const {validSession}=await import('../../lib/curriculum.ts');
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4176'],{stdio:'inherit'});
 let serving=false;
 for(let i=0;i<100;i++){try{if((await fetch('http://127.0.0.1:4176/hanzi-steps/')).ok){serving=true;break}}catch{}await new Promise(r=>setTimeout(r,200))}
 assert.ok(serving,'preview did not serve');
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 fs.mkdirSync('test-results/extras',{recursive:true});
 const coreStrokes=JSON.parse(fs.readFileSync('lib/stroke-data.json','utf8'));
 const supplementaryStrokes=JSON.parse(fs.readFileSync('course/extras/strokes.json','utf8'));
 async function drawWriting(page,step){
  const activity=step.extra,geometry=coreStrokes[activity.glyph]||supplementaryStrokes[activity.glyph];
  const check=page.getByRole('button',{name:'Check answer',exact:true});
  assert.equal(await check.isDisabled(),true,'writing cannot advance before completion');
  await page.waitForFunction(()=>!document.querySelector('.writing-area .pad-overlay'));
  assert.equal(await page.locator('.writing-area .pad-overlay').count(),0);
  const box=await page.locator('.writing-target').boundingBox(),scale=(box.width-48)/1024;
  const start=activity.writeMode==='complete'?Math.max(0,geometry.medians.length-3):0;
  for(let index=start;index<geometry.medians.length;index++){
   const points=geometry.medians[index];
   let accepted=false;
   for(let retry=0;retry<3&&!accepted;retry++){
    const pos=point=>({x:box.x+24+point[0]*scale,y:box.y+24+900*scale-point[1]*scale});
    const first=pos(points[0]);await page.mouse.move(first.x,first.y);await page.mouse.down();
    for(const point of points.slice(1)){const next=pos(point);await page.mouse.move(next.x,next.y,{steps:2});}
    await page.mouse.up();
    try{await page.waitForFunction(({next,last})=>last?!!document.querySelector('.writing-frame.is-done'):document.querySelector('.stroke-status')?.textContent.startsWith(next+' of'),{next:index+2,last:index===geometry.medians.length-1},{timeout:2000});accepted=true}catch{}
   }
   assert.ok(accepted,step.id+' stroke '+index+' was not accepted');
  }
  await page.getByText('You got it.',{exact:true}).waitFor();
 }
 const remote=new Map(),errors=[],uploads=[];
 const key='account-v1-'+'a'.repeat(64);
 async function open(width){
  const context=await browser.newContext({viewport:{width,height:844},isMobile:width<600,hasTouch:width<600,reducedMotion:'reduce'});
  await context.addInitScript(()=>{
   localStorage.setItem('hanziSteps.activeUsername','extras_test');
   // Deterministic device audio for exercise flow; real device voices retain
   // the existing TTS implementation and an explicitly assisted text fallback.
   window.SpeechSynthesisUtterance=class{constructor(text){this.text=text}};
   Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{lang:'zh-TW'}],cancel(){},speak(u){queueMicrotask(()=>u.onend?.())},addEventListener(){},removeEventListener(){}}});
  });
  await context.route('**://*.supabase.co/**',async route=>{
   const request=route.request(),name=request.url().split('/').at(-1),body=request.postDataJSON();
   let data=[];
   if(name==='hanzi_claim_username')data=key;
   if(name==='hanzi_read_progress')data={sessions:[...remote.values()],studyDays:[...remote.values()].some(s=>s.complete)?[new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(Date.now())]:[]};
   if(name==='hanzi_save_progress'){
    assert.equal(body.expected_account,key);assert.ok(validSession(body.checkpoint));
    remote.set(body.checkpoint.id,body.checkpoint);uploads.push(body.checkpoint);
    data={saved:true,studyDays:body.checkpoint.complete?[new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(Date.now())]:[]};
   }
   await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(data)});
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4176/hanzi-steps/',{waitUntil:'domcontentloaded'});
  try{await page.waitForFunction(()=>document.querySelector('.unit-picker-trigger')&&document.querySelector('.path-node:not(:disabled)'))}catch(error){console.error('Initial page:',(await page.locator('body').innerText()).slice(0,3000),errors);await page.screenshot({path:'test-results/extras/initial-failure.png',fullPage:true});throw error;}
  async function choose(unit){
   await page.getByRole('button',{name:/Change book or unit/}).click();
   if(width<600)await page.getByRole('button',{name:'Extras',exact:true}).click();
   else{
    await page.getByRole('dialog').press('Escape');
    await page.locator('.book-switcher').getByRole('button',{name:/^Extras/}).click();
    await page.getByRole('button',{name:/Change book or unit/}).click();
   }
   await page.locator('.unit-picker-option').filter({hasText:unit.label}).click();
   await page.locator('.extra-unit-banner').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  }
  return {context,page,choose};
 }
 await Promise.all(extraUnits.map(async unit=>{
  const mobile=await open(390);
  await mobile.choose(unit);
  assert.equal(await mobile.page.locator('.lesson-path .path-node:disabled').count(),0);
  await mobile.page.screenshot({path:'test-results/extras/'+unit.id+'-mobile.png',fullPage:true});
  for(const lesson of extraLessons.filter(l=>l.unitId===unit.id)){
   console.log('Browser lesson '+lesson.id+' ('+lesson.steps.length+' steps)');
   await mobile.page.getByRole('button',{name:'Start: '+lesson.title,exact:true}).click();
   for(const step of lesson.steps){
    await mobile.page.locator('[data-extra-step="'+step.id+'"]').waitFor();
    const mode=step.extra.mode;
    if(mode==='learn'||mode==='sentence-learn'||mode==='character-learn'){await mobile.page.getByRole('button',{name:'Continue',exact:true}).click();continue;}
    if(mode==='writing'){
     await drawWriting(mobile.page,step);
     assert.equal(await mobile.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,step.id);
     await mobile.page.getByRole('button',{name:'Continue',exact:true}).click();continue;
    }
    const check=mobile.page.getByRole('button',{name:'Check answer',exact:true});
    if(mode==='match'||mode==='measure-match'||mode==='mixed-match'){
     for(const id of mode==='mixed-match'?step.extra.pairs.map(pair=>pair.id):step.extra.wordIds){
      await mobile.page.locator('[data-extra-match-side="left"][data-extra-word="'+id+'"]').click();
      const rightId=step.id==='extra-fruits-measure-match'?(id==='apple'?'strawberry':id==='strawberry'?'apple':id):id;
      await mobile.page.locator('[data-extra-match-side="right"][data-extra-word="'+rightId+'"]').click();
     }
    }else if(mode==='sentence-order'){
     assert.equal(await check.isDisabled(),true);
     const bank=mobile.page.locator('.word-bank');
     if(step.id==='extra-clothing-learn-1-sentence-sentence-order'){
      await bank.getByRole('button',{name:'有',exact:true}).click();
      await check.click();await mobile.page.getByRole('button',{name:'Try again',exact:true}).click();
     }
     for(const token of step.extra.sentence.tokens)await bank.getByRole('button',{name:token,exact:true}).click();
     await check.click();
    }else{
     assert.equal(await check.isDisabled(),true);
     if(mode==='listen-picture'||mode==='listen-word'||mode==='listen-question')await mobile.page.getByRole('button',{name:mode==='listen-question'?'Play the sentence':'Play the word',exact:true}).click();
     // Exercise a wrong answer and recovery without counting it as clean.
     if(step.id==='extra-clothing-1-picture-tshirt'){
      const wrong=extraChoices(step).find(value=>value!==extraAnswer(step));
      await mobile.page.locator('[data-extra-choice="'+wrong+'"]').click();await check.click();
      await mobile.page.getByRole('button',{name:'Try again',exact:true}).click();
     }
     await mobile.page.locator('[data-extra-choice="'+extraAnswer(step)+'"]').click();await check.click();
    }
    await mobile.page.getByText('You got it.',{exact:true}).waitFor();
    assert.equal(await mobile.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,step.id);
    await mobile.page.getByRole('button',{name:'Continue',exact:true}).click();
   }
   await mobile.page.locator('.completion-main').waitFor();
   await mobile.page.waitForFunction(()=>document.querySelector('.completion-main .sync-state.saved'));
   const saved=[...remote.values()].find(s=>s.lessonId===lesson.id&&s.complete);
   assert.ok(saved,lesson.id+' did not save');assert.equal(saved.index,lesson.steps.length);
   if(lesson.id==='extra-clothing-learn-1')assert.ok(saved.assisted>=1);
   await mobile.page.getByRole('button',{name:'Back to the unit',exact:true}).click();
  }
  await mobile.page.getByText('All '+unit.lessonIds.length+' lessons complete.',{exact:false}).waitFor();
  await mobile.context.close();
 }));
 // Reopen from a separate device context: completion comes from remote rows.
 const desktop=await open(1365);await desktop.choose(extraUnits[1]);
 assert.equal(await desktop.page.locator('.path-row.completed').count(),extraUnits[1].lessonIds.length);
 await desktop.page.getByRole('tab',{name:'Characters',exact:true}).click();
 assert.equal(await desktop.page.locator('.character-library .library-card').count(),extraUnits[1].chars.length);
 assert.equal(await desktop.page.locator('.extra-word-card').count(),0);
 await desktop.page.locator('.library-card').filter({hasText:'berry'}).first().click();
 await desktop.page.getByRole('dialog').waitFor();
 assert.ok(await desktop.page.locator('.character-parts').count());
 await desktop.page.getByRole('button',{name:'Practice this character',exact:true}).click();
 const focused=extraPracticeLessons.find(lesson=>lesson.id==='extra-practice-莓');
 for(const step of focused.steps){
  await desktop.page.locator('[data-extra-step="'+step.id+'"]').waitFor();
  if(step.extra.mode==='writing')await drawWriting(desktop.page,step);
  await desktop.page.getByRole('button',{name:'Continue',exact:true}).click();
 }
 await desktop.page.locator('.completion-main').waitFor();
 await desktop.page.waitForFunction(()=>document.querySelector('.completion-main .sync-state.saved'));
 assert.ok([...remote.values()].some(session=>session.lessonId===focused.id&&session.complete));
 await desktop.page.getByRole('button',{name:'Back to the unit',exact:true}).click();
 await desktop.page.getByRole('tab',{name:'Notes',exact:true}).click();
 assert.equal(await desktop.page.locator('.extra-word-card').count(),20);
 await desktop.page.screenshot({path:'test-results/extras/fruits-notes-desktop.png',fullPage:true});
 await desktop.choose(extraUnits[2]);
 await desktop.page.getByRole('tab',{name:'Notes',exact:true}).click();
 assert.equal(await desktop.page.locator('.extra-word-card').count(),16);
 assert.equal(await desktop.page.locator('.extra-measure-label').count(),1);
 await desktop.page.screenshot({path:'test-results/extras/colors-notes-desktop.png',fullPage:true});
 await desktop.page.getByRole('tab',{name:'Characters',exact:true}).click();
 assert.equal(await desktop.page.locator('.library-card').count(),extraUnits[2].chars.length);
 await desktop.page.screenshot({path:'test-results/extras/colors-characters-desktop.png',fullPage:true});
 await desktop.page.getByRole('button',{name:'Statistics',exact:true}).click();
 await desktop.page.getByText('Extra units completed',{exact:false}).waitFor();
 assert.equal(await desktop.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await desktop.context.close();
 assert.equal(uploads.filter(s=>s.complete).length,extraLessons.length+1);
 assert.deepEqual(errors,[]);
 console.log('PASS: required handwriting, sentence ordering, mixed matching, normal character cards, focused character practice, all extra steps, every lesson completion, wrong-answer assistance, mobile layout, listening, both matching modes, cloud sync and second-device readback.');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.kill();});
