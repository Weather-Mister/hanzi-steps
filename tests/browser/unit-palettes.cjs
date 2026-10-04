let server,browser;
(async()=>{
 const {chromium}=await import(process.env.HANZI_PLAYWRIGHT?`${process.env.HANZI_PLAYWRIGHT}/index.mjs`:'playwright');
 const {spawn}=await import('node:child_process');
 const fs=(await import('node:fs')).default;
 const assert=(await import('node:assert/strict')).default;
 const {unitVisualThemes,visualUnitTheme}=await import('../../lib/unit-theme.ts');
 const {lessons}=await import('../../lib/curriculum.ts');
 const css=fs.readFileSync('app/globals.css','utf8');
 const accent=name=>css.match(new RegExp(`\\[data-unit-theme="${name}"\\]\\s*\\{[^}]*--unit-accent:\\s*(#[\\da-f]{6})`))[1];
 const toRgb=hex=>`rgb(${hex.slice(1).match(/../g).map(value=>parseInt(value,16)).join(', ')})`;
 server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--config','vite.pages.config.ts','--host','127.0.0.1','--port','4176','--strictPort'],{stdio:'ignore'});
 let ready=false;
 for(let i=0;i<100;i++){
  try{if((await fetch('http://127.0.0.1:4176/hanzi-steps/',{signal:AbortSignal.timeout(1000)})).ok){ready=true;break;}}catch{}
  await new Promise(resolve=>setTimeout(resolve,200));
 }
 assert.ok(ready,'palette preview server must start');
 browser=await chromium.launch({headless:true,executablePath:process.env.HANZI_CHROMIUM||undefined,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage']});
 fs.mkdirSync('test-results/unit-palettes',{recursive:true});
 const errors=[];
 const sessions=lessons.map(lesson=>({id:crypto.randomUUID(),lessonId:lesson.id,index:lesson.steps.length,independent:0,assisted:0,complete:true,updatedAt:1}));
 for(const width of [360,1365]){
  const context=await browser.newContext({viewport:{width,height:950},isMobile:width<600,hasTouch:width<600,reducedMotion:'reduce'});
  await context.addInitScript(sessions=>{
   if(!localStorage.getItem('hanzi-steps-unsynced-v1-signed-out'))localStorage.setItem('hanzi-steps-unsynced-v1-signed-out',JSON.stringify(sessions));
  },sessions);
  const page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:4176/hanzi-steps/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('.unit-picker-trigger')&&!document.querySelector('.path-node:disabled'));
  const before=await page.evaluate(()=>localStorage.getItem('hanzi-steps-unsynced-v1-signed-out'));
  async function openPicker(){
   await page.getByRole('button',{name:/Change book or unit/}).click();
   await page.locator('.unit-picker-dialog').waitFor();
  }
  async function assertTheme(selector,theme){
   assert.equal(await page.locator(selector).getAttribute('data-unit-theme'),theme);
   assert.equal(await page.locator(selector).evaluate(element=>getComputedStyle(element).getPropertyValue('--unit-accent').trim()),accent(theme));
  }
  if(width>=600)await page.locator('.book-switcher').getByRole('button',{name:/^Book 1/}).click();
  await openPicker();
  if(width<600)await page.locator('.unit-picker-dialog').getByRole('button',{name:'Book 1',exact:true}).click();
  assert.equal(await page.locator('.unit-picker-option').count(),48);
  for(let number=1;number<=16;number++){
   const row=page.getByRole('button',{name:new RegExp(`^Unit ${number} ·`)});
   assert.equal(await row.getAttribute('data-unit-theme'),unitVisualThemes[number-1]);
   assert.equal(await row.locator('.unit-picker-number').evaluate(element=>getComputedStyle(element).backgroundColor),toRgb(accent(unitVisualThemes[number-1])));
  }
  await page.screenshot({path:`test-results/unit-palettes/picker-${width}.png`});
  await page.getByRole('button',{name:/^Unit 1 ·/}).click();
  await page.getByRole('dialog').waitFor({state:'hidden'});
  for(const number of [4,8,13,16]){
   await openPicker();
   await page.getByRole('button',{name:new RegExp(`^Unit ${number} ·`)}).click();
   await page.getByRole('dialog').waitFor({state:'hidden'});
   const theme=visualUnitTheme({number},1);
   await assertTheme('.learning-app',theme);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'no horizontal overflow');
   await page.screenshot({path:`test-results/unit-palettes/unit-${number}-${width}.png`});
   await page.getByRole('button',{name:'Learning settings',exact:true}).click();
   await assertTheme('.settings-dialog',theme);
   await page.keyboard.press('Escape');
  }
  if(width>=600)await page.locator('.book-switcher').getByRole('button',{name:/^Book 2/}).click();
  await openPicker();
  if(width<600)await page.locator('.unit-picker-dialog').getByRole('button',{name:'Book 2',exact:true}).click();
  await page.getByRole('button',{name:/^Unit 1 ·/}).click();
  await page.getByRole('dialog').waitFor({state:'hidden'});
  await assertTheme('.learning-app',visualUnitTheme({number:1},2));
  await page.reload();
  await page.locator('.unit-picker-trigger').waitFor();
  assert.equal(await page.evaluate(()=>localStorage.getItem('hanzi-steps-unsynced-v1-signed-out')),before,'theme navigation/reload must not rewrite progress');
  await context.close();
 }
 assert.deepEqual(errors,[]);
 console.log('PASS all 16 palette styles, 48-unit picker, mobile/desktop, themed portals, Book 2 rotation, unchanged progress and clean console.');
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
