import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {unitVisualThemes,visualUnitTheme} from '../lib/unit-theme.ts';

const expectedThemes=[
 'blue','teal','plum','amber','rose','indigo','cyan','orange',
 'emerald','violet','coral','sky','gold','magenta','forest','cherry',
 'mint','cobalt','lilac','raspberry','lime','scarlet','periwinkle','seafoam',
];

const css=fs.readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
const widgetSource=fs.readFileSync(new URL('../supabase/functions/hanzi-widget/index.ts',import.meta.url),'utf8');
const palettes=new Map([...css.matchAll(/\[data-unit-theme="([a-z]+)"\]\s*\{([^}]+)\}/g)]
 .filter(([, ,body])=>body.includes('--unit-accent:'))
 .map(([,name,body])=>[name,Object.fromEntries([...body.matchAll(/--unit-([a-z-]+):\s*(#[\da-f]{6});/g)].map(([,key,value])=>[key,value]))]));
const widgetPalettes=new Map([...widgetSource.matchAll(/^\s*([a-z]+):\{accent:'(#[\da-f]{6})',onAccent:'(#[\da-f]{6})'\},$/gm)]
 .map(([,name,accent,onAccent])=>[name,{accent,onAccent}]));
const rgb=hex=>hex.slice(1).match(/../g).map(value=>parseInt(value,16)/255);
const luminance=hex=>rgb(hex).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4)
 .reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
const contrast=(first,second)=>(Math.max(luminance(first),luminance(second))+.05)/(Math.min(luminance(first),luminance(second))+.05);

test('Visual themes use the expanded 24-color rotation',()=>{
 assert.deepEqual(unitVisualThemes,expectedThemes);
 assert.deepEqual(new Set(palettes.keys()),new Set(expectedThemes));
 for(let number=1;number<=48;number++)assert.equal(visualUnitTheme({number},1),expectedThemes[(number-1)%24]);
 for(let number=1;number<=4;number++)assert.equal(visualUnitTheme({number},2),expectedThemes[(number-1+8)%24]);
 assert.equal(new Set([...palettes.values()].map(palette=>palette.accent)).size,24);
 assert.equal(palettes.get('gold').accent,'#b45d24','Unit 13 keeps the burnt-orange accent');
 assert.notEqual(palettes.get('amber').accent,palettes.get('gold').accent,'yellow and burnt orange stay distinct');
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

test('Widget colors match the web palette exactly',()=>{
 assert.deepEqual(new Set(widgetPalettes.keys()),new Set(expectedThemes));
 for(const name of expectedThemes){
  const web=palettes.get(name),widget=widgetPalettes.get(name);
  assert.equal(widget.accent,web.accent,`${name}: widget accent`);
  assert.equal(widget.onAccent,web['on-accent'],`${name}: widget foreground`);
 }
});
