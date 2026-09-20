import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const courseRoot = path.join(root, 'course');

async function walk(dir) {
  const out=[];
  for (const entry of await fs.readdir(dir,{withFileTypes:true})) {
    const full=path.join(dir,entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name.endsWith('.stroke-source.json')) out.push(full);
  }
  return out;
}

const declarations=await walk(courseRoot);
for (const file of declarations) {
  const spec=JSON.parse(await fs.readFile(file,'utf8'));
  if (spec.source!=='Hanzi Writer Data') throw new Error(`Unsupported stroke source in ${file}`);
  const out={};
  for (const ch of spec.characters) {
    const url=`https://raw.githubusercontent.com/chanind/hanzi-writer-data/master/data/${encodeURIComponent(ch)}.json`;
    const response=await fetch(url);
    if (!response.ok) throw new Error(`Stroke source missing ${ch}: ${response.status}`);
    const row=await response.json();
    if (!Array.isArray(row.strokes)||!Array.isArray(row.medians)||row.strokes.length!==row.medians.length) throw new Error(`Invalid stroke geometry for ${ch}`);
    out[ch]={strokes:row.strokes,medians:row.medians};
  }
  const target=file.replace(/\.stroke-source\.json$/,'.strokes.json');
  await fs.writeFile(target,JSON.stringify(out),'utf8');
  console.log(`Hydrated ${spec.characters.length} characters -> ${path.relative(root,target)}`);
}
