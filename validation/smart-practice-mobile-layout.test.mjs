import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');

test('Practice modal remains viewport-bounded and scrollable on mobile',()=>{
  const practiceStart=css.indexOf('/* Adaptive practice: Daily 10, checkpoint challenges, handwriting, and exam study. */');
  assert.notEqual(practiceStart,-1);
  const practiceCss=css.slice(practiceStart);
  const mobileStart=practiceCss.indexOf('@media(max-width:700px) {');
  const mobileEnd=practiceCss.indexOf('@media(max-width:390px) {',mobileStart);
  assert.ok(mobileStart>=0&&mobileEnd>mobileStart);
  const mobile=practiceCss.slice(mobileStart,mobileEnd);
  assert.ok(mobile.includes('max-height:calc(100dvh - 18px);'));
  assert.ok(mobile.includes('overflow-x:hidden;'));
  assert.ok(mobile.includes('overflow-y:auto;'));
  assert.ok(mobile.includes('overscroll-behavior:contain;'));
  assert.ok(mobile.includes('.smart-session {'));
  assert.ok(mobile.includes('overflow:visible;'));
  assert.ok(mobile.includes('flex:none;'));
  assert.ok(mobile.includes('.smart-mode-card {'));
  assert.ok(mobile.includes('max-width:100%;'));
});
