import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const courseRoot = path.join(root, 'course');

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, {withFileTypes:true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name.endsWith('.stroke-source.json')) out.push(full);
  }
  return out;
}

async function loadGraphics(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`AnimCJK download failed (${response.status}): ${url}`);
  return (await response.text()).split(/\r?\n/).filter(Boolean).map(line=>JSON.parse(line));
}

const declarations = await walk(courseRoot);
if (!declarations.length) process.exit(0);
const wanted = new Set();
const specs = [];
for (const file of declarations) {
  const spec = JSON.parse(await fs.readFile(file, 'utf8'));
  if (spec.source !== 'AnimCJK graphicsZhHant') throw new Error(`Unsupported stroke source in ${file}`);
  for (const ch of spec.characters) wanted.add(ch);
  specs.push({file,spec});
}

const found = new Map();
const hant = await loadGraphics('https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsZhHant.txt');
for (const row of hant) if (wanted.has(row.character)) found.set(row.character,{strokes:row.strokes,medians:row.medians});

// AnimCJK stores some characters whose Traditional and Simplified glyph/stroke data are identical only in graphicsZhHans.
// Use that dataset solely as a fallback for characters absent from graphicsZhHant; never replace an available Traditional entry.
if ([...wanted].some(ch=>!found.has(ch))) {
  const hans = await loadGraphics('https://raw.githubusercontent.com/parsimonhi/animCJK/master/graphicsZhHans.txt');
  for (const row of hans) if (wanted.has(row.character) && !found.has(row.character)) found.set(row.character,{strokes:row.strokes,medians:row.medians});
}
for (const ch of wanted) if (!found.has(ch)) throw new Error(`AnimCJK source missing ${ch}`);

for (const {file,spec} of specs) {
  const out = Object.fromEntries(spec.characters.map(ch=>[ch,found.get(ch)]));
  const target = file.replace(/\.stroke-source\.json$/, '.strokes.json');
  await fs.writeFile(target, JSON.stringify(out), 'utf8');
  console.log(`Hydrated ${spec.characters.length} characters -> ${path.relative(root,target)}`);
}
