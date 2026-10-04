import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {unitVisualThemes,visualUnitTheme} from '../lib/unit-theme.ts';

const css=fs.readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
const palettes=new Map([...css.matchAll(/\[data-unit-theme="([a-z]+)"\]\s*\{([^}]+)\}/g)]
 .filter(([, ,body])=>body.includes('--unit-accent:'))
 .map(([,name,body])=>[name,Object.fromEntries([...body.matchAll(/--unit-([a-z-]+):\s*(#[\da-f]{6});/g)].map(([,key,value])=>[key,value]))]));
const rgb=hex=>hex.slice(1).match(/../g).map(value=>parseInt(value,16)/255);
const luminance=hex=>rgb(hex).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4)
 .reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
const contrast=(first,second)=>(Math.max(luminance(first),luminance(second))+.05)/(Math.min(luminance(first),luminance(second))+.05);

test('Visual themes retain their existing identities and unit/book rotation',()=>{
 const historical=['blue','teal','plum','amber','rose','indigo','cyan','orange','emerald','violet','coral','sky','gold','magenta','forest','cherry'];
 assert.deepEqual(unitVisualThemes,historical);
 assert.deepEqual(new Set(palettes.keys()),new Set(historical));
 for(let number=1;number<=48;number++)assert.equal(visualUnitTheme({number},1),historical[(number-1)%16]);
 for(let number=1;number<=4;number++)assert.equal(visualUnitTheme({number},2),historical[(number-1+8)%16]);
 assert.equal(new Set([...palettes.values()].map(palette=>palette.accent)).size,16);
});

test('Every theme defines complete tokens and readable controls, text and focus',()=>{
 const keys=['accent','hover','depth','edge','focus','on-accent','tint','tint-hover','surface','border','line','text'];
 for(const [name,palette] of palettes){
  assert.deepEqual(Object.keys(palette).sort(),keys.toSorted(),name);
  for(const background of ['accent','hover']){
   assert.ok(contrast(palette['on-accent'],palette[background])>=4.5,`${name}: text on ${background}`);
  }
  for(const background of ['#ffffff',palette.tint,palette['tint-hover'],palette.surface]){
   assert.ok(contrast(palette.text,background)>=4.5,`${name}: text on ${background}`);
   assert.ok(contrast(palette.focus,background)>=3,`${name}: focus on ${background}`);
  }
 }
});
