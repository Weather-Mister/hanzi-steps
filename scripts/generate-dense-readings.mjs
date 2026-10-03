import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {denseSpecs} from '../course/readings/dense-source.mjs';
import {miniSpecs} from '../course/readings/mini-source.mjs';
import {grammarRules} from '../course/runtime.ts';
export function generateReadings(checkOnly=false){
const root=new URL('../course/readings/',import.meta.url);
const readings=JSON.parse(readFileSync(new URL('checkpoints.json',root),'utf8')).filter(r=>!/-dense$|-mini$/.test(r.id));
const contracts=JSON.parse(readFileSync(new URL('contracts.json',root),'utf8'));
const kinds={dialogue:'Extended dialogue',messages:'LINE-style messages',schedule:'Schedule and notes',notice:'Notice and conversation'};
for(const spec of [...denseSpecs,...miniSpecs]){
 const id=`reading-unit-${spec.unit}-${spec.short?'mini':'dense'}`;
 const segments=spec.lines.map(l=>l.text.split('|'));
 readings.push({id,unitId:`unit-${spec.unit}`,title:spec.title,kind:spec.short?'Mini reading · '+kinds[spec.presentation]:kinds[spec.presentation],presentation:spec.presentation,setup:spec.setup,version:1,lines:spec.lines.map((l,i)=>({...l,text:segments[i].join('')})),questions:spec.questions,tips:spec.tips,grammarFocus:spec.grammarIds.map(id=>grammarRules[id].title),glosses:spec.glosses});
 contracts[id]={origin:{kind:'authored-supplement',note:spec.short?'Original mini reading authored for this unit boundary; not a textbook quotation. See dense-reading-review.md and mini-source.mjs.':'Original connected reading authored for this unit boundary; not a textbook quotation. See dense-reading-plan.md and dense-source.mjs.'},segments,grammarIds:spec.grammarIds};
}
for(const [name,data] of [['checkpoints.json',readings],['contracts.json',contracts]]){
 const path=new URL(name,root),output=JSON.stringify(data,null,2)+'\n';
 if(checkOnly){if(readFileSync(path,'utf8')!==output)throw Error(name+' is stale; run node scripts/generate-dense-readings.mjs');}
 else writeFileSync(path,output);
}
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url)generateReadings(process.argv.includes('--check'));
