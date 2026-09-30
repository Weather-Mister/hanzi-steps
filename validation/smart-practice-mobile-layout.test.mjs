import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');

function mobilePracticeCss(){
  const practiceStart=css.indexOf('/* Adaptive practice: Daily 10, checkpoint challenges, handwriting, and exam study. */');
  assert.notEqual(practiceStart,-1);
  const practiceCss=css.slice(practiceStart);
  const mobileStart=practiceCss.indexOf('@media(max-width:700px) {');
  const mobileEnd=practiceCss.indexOf('@media(max-width:390px) {',mobileStart);
  assert.ok(mobileStart>=0&&mobileEnd>mobileStart);
  return practiceCss.slice(mobileStart,mobileEnd);
}

test('Practice modal is safe-area bounded and scrollable on mobile',()=>{
  const mobile=mobilePracticeCss();
  assert.ok(mobile.includes('top:max(8px,env(safe-area-inset-top));'));
  assert.ok(mobile.includes('bottom:max(8px,env(safe-area-inset-bottom));'));
  assert.ok(mobile.includes('transform:none;'));
  assert.ok(mobile.includes('overflow-x:hidden;'));
  assert.ok(mobile.includes('overflow-y:auto;'));
  assert.ok(mobile.includes('overscroll-behavior:contain;'));
  assert.ok(mobile.includes('-webkit-overflow-scrolling:touch;'));
  assert.ok(mobile.includes('.smart-session {'));
  assert.ok(mobile.includes('overflow:visible;'));
  assert.ok(mobile.includes('flex:none;'));
});

test('Practice mobile content cannot force horizontal overflow',()=>{
  const mobile=mobilePracticeCss();
  assert.ok(mobile.includes('.smart-mode-card {'));
  assert.ok(mobile.includes('max-width:100%;'));
  assert.ok(mobile.includes('.smart-token-bank>button {'));
  assert.ok(mobile.includes('white-space:normal;'));
  assert.ok(mobile.includes('overflow-wrap:anywhere;'));
  assert.ok(mobile.includes('.smart-prompt h2 {'));
});

test('Practice close control stays reachable on mobile',()=>{
  const mobile=mobilePracticeCss();
  assert.ok(mobile.includes('.smart-practice-dialog>[data-slot=dialog-close] {'));
  assert.ok(mobile.includes('position:fixed;'));
  assert.ok(mobile.includes('width:40px;'));
  assert.ok(mobile.includes('height:40px;'));
});
