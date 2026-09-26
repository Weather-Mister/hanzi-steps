import fs from 'node:fs/promises';
import path from 'node:path';
import {strokeGeometryLooksAligned} from '../lib/stroke-data-validation.ts';
const root=process.cwd(),courseRoot=path.join(root,'course');
async function walk(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else if(e.name.endsWith('.stroke-source.json'))out.push(f)}return out}
async function rows(name){const url=`https://raw.githubusercontent.com/parsimonhi/animCJK/master/${name}`;const r=await fetch(url);if(!r.ok)throw Error(`AnimCJK download failed ${r.status}: ${name}`);return (await r.text()).split(/\r?\n/).filter(Boolean).map(JSON.parse)}
function normalizeGeometry(row){
  const medians=row.medians;
  // AnimCJK paths and medians already share the same y-up coordinate system.
  // Flipping only the medians breaks tracing and handwriting recognition.
  // Preserve coordinates outside 0..1024 too: source strokes can extend there.
  const geometry={strokes:row.strokes,medians};
  if(!strokeGeometryLooksAligned(geometry))throw Error(`Misaligned stroke source: ${row.character}`);
  return geometry;
}
const files=await walk(courseRoot);if(!files.length)process.exit(0);
const specs=[],wanted=new Set();
for(const file of files){
  const spec=JSON.parse(await fs.readFile(file,'utf8'));
  if(spec.source!=='AnimCJK')throw Error(`Unsupported stroke source in ${file}`);
  const target=file.replace(/\.stroke-source\.json$/,'.strokes.json');
  let existing={};try{existing=JSON.parse(await fs.readFile(target,'utf8'))}catch{}
  const missing=spec.characters.filter(ch=>!existing[ch]);
  missing.forEach(ch=>wanted.add(ch));
  specs.push({file,spec,target,existing,missing});
}
if(!wanted.size){console.log('All declared stroke sources are already hydrated.');process.exit(0)}
const found=new Map(),used=new Map();
for(const name of ['graphicsZhHant.txt','graphicsZhHans.txt','graphicsJa.txt']){
  for(const row of await rows(name))if(wanted.has(row.character)&&!found.has(row.character)){found.set(row.character,normalizeGeometry(row));used.set(row.character,name)}
}
for(const ch of wanted)if(!found.has(ch))throw Error(`AnimCJK source missing ${ch}`);
for(const {target,existing,missing} of specs){
  if(!missing.length)continue;
  for(const ch of missing)existing[ch]=found.get(ch);
  await fs.writeFile(target,JSON.stringify(existing),'utf8');
  console.log(`Hydrated ${missing.length} missing characters -> ${path.relative(root,target)}`);
  for(const ch of missing)console.log(`${ch}: ${used.get(ch)}`);
}
