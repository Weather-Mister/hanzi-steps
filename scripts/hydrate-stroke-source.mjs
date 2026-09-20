import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),courseRoot=path.join(root,'course');
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else if(e.name.endsWith('.stroke-source.json'))out.push(f)}return out}
async function rows(name){const url=`https://raw.githubusercontent.com/parsimonhi/animCJK/master/${name}`;const r=await fetch(url);if(!r.ok)throw Error(`AnimCJK download failed ${r.status}: ${name}`);return (await r.text()).split(/\r?\n/).filter(Boolean).map(JSON.parse)}
const files=await walk(courseRoot);if(!files.length)process.exit(0);
const specs=[],wanted=new Set();for(const file of files){const spec=JSON.parse(await fs.readFile(file,'utf8'));if(spec.source!=='AnimCJK')throw Error(`Unsupported stroke source in ${file}`);spec.characters.forEach(c=>wanted.add(c));specs.push({file,spec})}
const found=new Map(),used=new Map();for(const name of ['graphicsZhHant.txt','graphicsZhHans.txt','graphicsJa.txt']){for(const row of await rows(name)){if(wanted.has(row.character)&&!found.has(row.character)){found.set(row.character,{strokes:row.strokes,medians:row.medians});used.set(row.character,name)}}}
for(const ch of wanted)if(!found.has(ch))throw Error(`AnimCJK source missing ${ch}`);
for(const {file,spec} of specs){const out=Object.fromEntries(spec.characters.map(ch=>[ch,found.get(ch)]));const target=file.replace(/\.stroke-source\.json$/,'.strokes.json');await fs.writeFile(target,JSON.stringify(out),'utf8');console.log(`Hydrated ${spec.characters.length} characters -> ${path.relative(root,target)}`);for(const ch of spec.characters)console.log(`${ch}: ${used.get(ch)}`)}
