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
   await page.getByRole('tab',{name:'Learn',exact:true}).click();
   await page.locator('.extra-unit-banner').waitFor();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth?Array.from(document.querySelectorAll('body *')).filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.left < -1||b.right>innerWidth+1)}).slice(0,12).map(e=>({tag:e.tagName,classes:e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right})):[]);
   if(overflow.length)console.warn('Viewport overflow at '+width+'px: '+JSON.stringify(overflow));
  }
  return {context,page,choose};
 }

 for(const width of [320,375,390,430,768,1365]){
  const device=await open(width);
  for(const unit of extraUnits){
   await device.choose(unit);
   const problems=await device.page.evaluate(()=>{
    const errors=[],path=document.querySelector('.lesson-path'),bounds=path.getBoundingClientRect();
    const inside=(element,label)=>{
     const b=element.getBoundingClientRect();
     if(b.left < Math.max(0,bounds.left)-1 || b.right > Math.min(innerWidth,bounds.right)+1)errors.push(label+' outside lesson path: '+JSON.stringify({left:b.left,right:b.right,viewport:innerWidth}));
    };
    for(const heading of path.querySelectorAll('.extra-section-heading')){
     if(heading.closest('.path-row'))errors.push('Section heading must not be a flex-row child');
     const row=heading.nextElementSibling;
     if(!row?.classList.contains('path-row'))errors.push('Section heading must precede a lesson row');
     else if(heading.getBoundingClientRect().bottom>row.getBoundingClientRect().top+1)errors.push('Section heading overlaps its lesson');
     inside(heading,'section heading');
    }
    for(const row of path.querySelectorAll('.path-row')){
     if(row.children.length!==2)errors.push('A lesson row must contain only its track and copy');
     for(const selector of ['.path-node','.path-copy','.path-copy h3','.start-button'])inside(row.querySelector(selector),selector);
    }
    return errors;
   });
   assert.deepEqual(problems,[],unit.id+' at '+width+'px');
   await device.page.screenshot({path:'test-results/extras/'+unit.id+'-layout-'+width+'.png',fullPage:true});
   console.log('PASS: '+unit.id+' section headings, lesson content and buttons at '+width+'px');
  }
  await device.context.close();
 }
 assert.deepEqual(errors,[]);
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();server?.kill();});
