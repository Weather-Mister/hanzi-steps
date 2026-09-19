import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {characters,characterOrder,unitOneCharacterOrder,unitOneLessons,lessons,phrases,grammarRules,validSession} from '../lib/curriculum.ts';
const data=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url),'utf8'));
test('Every taught character has full Taiwan stroke geometry and complete component coverage',()=>{
 assert.deepEqual(unitOneCharacterOrder,['你','好','我','是','學','生','嗎']);
 for(const c of characterOrder){const d=data[c],meta=characters[c];assert.equal(d.strokes.length,meta.strokes,c);assert.equal(d.medians.length,meta.strokes,c);assert.deepEqual(meta.parts.flatMap(p=>p.strokes).sort((a,b)=>a-b),Array.from({length:meta.strokes},(_,i)=>i),c);for(const path of d.strokes)assert.ok(/^[MLCQZmlcqz0-9.,\s-]+$/.test(path),`Component bounds support commands in ${c}`)}
});
test('Unit flow teaches each character before recall and only uses taught words in sentence exercises',()=>{
 const seen=new Set();const reading=new Set();for(const lesson of lessons){const ids=new Set();for(const s of lesson.steps){assert.ok(!ids.has(s.id));ids.add(s.id);if(s.type==='intro'){seen.add(s.char);reading.add(s.char);}if(s.type==='grammar')for(const w of grammarRules[s.grammar].words||[])for(const c of w)reading.add(c);if(['memory','trace','complete','build'].includes(s.type))assert.ok(seen.has(s.char));if(s.options)assert.ok(s.options.includes(s.answer),s.id);if(s.type==='order'){for(const c of phrases[s.phrase].tokens.join(''))assert.ok(reading.has(c),`${s.id} uses ${c} before teaching it`);for(const word of phrases[s.phrase].tokens)assert.ok(s.tokens.includes(word))}}}assert.equal(seen.size,characterOrder.length)
});
test('Every existing Unit 1 checkpoint keeps the same exercise, answer, and position',()=>{
 const original=JSON.parse(fs.readFileSync(new URL('./fixtures/unit-one-checkpoints.json',import.meta.url),'utf8'));
 assert.deepEqual(unitOneLessons.map(({id,chars,steps})=>({id,chars,steps})),original);
 for(const lesson of original)for(let index=0;index<=lesson.steps.length;index++)assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440000',lessonId:lesson.id,index,independent:0,assisted:0,complete:index===lesson.steps.length,updatedAt:1}));
});
test('Checkpoint validation rejects malformed, out-of-range, and false completion records',()=>{
 const s={id:'550e8400-e29b-41d4-a716-446655440000',lessonId:'hello',index:1,independent:0,assisted:0,complete:false,updatedAt:1};assert.ok(validSession(s));for(const invalid of [null,{}, {...s,lessonId:2},{...s,complete:true},{...s,index:999},{...s,independent:5},{...s,index:-1},{...s,index:.5}])assert.equal(validSession(invalid),false);assert.ok(validSession({...s,index:lessons[0].steps.length,complete:true}));
});
test('Taiwan median data passes real handwriting recognition while reversed strokes and taps fail',()=>{
 // Exercise the installed engine with source geometry, without a browser or a fake canvas.
 const file=new URL('../node_modules/hanzi-writer/dist/index.cjs.js',import.meta.url);const source=fs.readFileSync(file,'utf8');const context={module:{exports:{}},global:{},setTimeout,clearTimeout};vm.runInNewContext(source+'\nmodule.exports={strokeMatches,parseCharData,Positioner};',context);const {strokeMatches,parseCharData,Positioner}=context.module.exports;
 let checked=0;for(const c of characterOrder){const parsed=parseCharData(c,data[c]);data[c].medians.forEach((median,i)=>{const points=median.map(([x,y])=>({x,y}));assert.ok(strokeMatches({points},parsed,i,{leniency:1.25}).isMatch,`${c} stroke ${i+1}`);assert.equal(strokeMatches({points:[points[0]]},parsed,i,{leniency:1.25}).isMatch,false);assert.equal(strokeMatches({points:[...points].reverse()},parsed,i,{leniency:1.25}).isMatch,false,`${c} backwards ${i+1}`);checked++})}
 assert.equal(checked,characterOrder.reduce((sum,c)=>sum+characters[c].strokes,0));
 const positioner=new Positioner({width:316,height:316,padding:24});const scale=(316-48)/1024;for(const point of data['學'].medians.flat()){const [x,y]=point;const converted=positioner.convertExternalPoint({x:24+x*scale,y:24+900*scale-y*scale});assert.ok(Math.abs(converted.x-x)<.001&&Math.abs(converted.y-y)<.001,'Visible guide aligns with the engine coordinates')}
});
