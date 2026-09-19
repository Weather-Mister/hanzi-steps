import fs from 'node:fs';
import {pathToFileURL,fileURLToPath} from 'node:url';
import path from 'node:path';
import {validateCourse} from './validate.mjs';
export const root=fileURLToPath(new URL('../',import.meta.url));
export function readJSON(file){return JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));}
export async function loadCourse(){
 const manifest=readJSON('course/manifest.json'),modules=[],geometry={},errors=[];
 if(!Array.isArray(manifest.books))return {manifest,modules,geometry,errors:['manifest: malformed books']};
 for(const book of manifest.books)for(const e of book.units||[]){
  if(typeof e.path!=='string'||!/^course\/book[1-9]\d*\/unit\d{2,}\.ts$/.test(e.path)){errors.push(`manifest: invalid path ${e.path}`);continue;}
  try{
   const m=(await import(pathToFileURL(path.join(root,e.path)))).default;modules.push(m);
   const g=readJSON(e.path.replace(/\.ts$/,'.strokes.json'));
   if(!g||Array.isArray(g)||typeof g!=='object')throw Error('malformed handwriting object');
   if(JSON.stringify(Object.keys(g))!==JSON.stringify(m.newCharacters))errors.push(`${e.id}: handwriting file keys must match NEW characters`);
   for(const [ch,value]of Object.entries(g)){if(Object.hasOwn(geometry,ch))errors.push(`${e.id}: duplicate handwriting declaration ${ch}`);geometry[ch]=value;}
  }catch(error){errors.push(`${e.id} (${e.path}): malformed/missing unit data: ${error.message}`);}
 }
 try{for(const [ch,g]of Object.entries(readJSON('course/legacy/strokes.json'))){if(ch in geometry)errors.push(`legacy: duplicate handwriting declaration ${ch}`);geometry[ch]=g;}}catch(error){errors.push(`legacy handwriting: ${error.message}`)}
 errors.push(...validateCourse(manifest,modules,geometry));
 return {manifest,modules,geometry,errors};
}
export function ensureValid(course){if(course.errors.length)throw Error(course.errors.join('\n'));}
// Compile only fields used by the app. Repeated long strings become constants;
// this saves parsing/download bytes without a runtime decoder or extra requests.
export function registrySource(manifest,modules){
 const fields=['unit','reviewLessonId','lessons','newVocabulary','newCharacters','characters','grammarRules','phrases'];
 const data=modules.map(m=>Object.fromEntries(fields.map(k=>[k,m[k]])));
 const counts=new Map();
 function count(v){if(typeof v==='string'&&v.length>=16)counts.set(v,(counts.get(v)||0)+1);else if(v&&typeof v==='object')Object.values(v).forEach(count);}
 count(data);
 const pool=new Map([...counts].filter(([s,n])=>n>1&&s.length*(n-1)>24).map(([s],i)=>[s,`text${i}`]));
 function emit(v){
  if(typeof v==='string')return pool.get(v)||JSON.stringify(v);
  if(Array.isArray(v))return '['+v.map(emit).join(',')+']';
  if(v&&typeof v==='object')return '{'+Object.entries(v).map(([k,x])=>JSON.stringify(k)+':'+emit(x)).join(',')+'}';
  return JSON.stringify(v);
 }
 return '// Generated from course/manifest.json and unit modules by npm run course:generate. Do not edit.\n'+
  "import type {UnitData} from './schema.ts';\n"+
  'type RuntimeUnit = Pick<UnitData,'+fields.map(k=>JSON.stringify(k)).join('|')+'>;\n'+
  [...pool].map(([s,id])=>`const ${id}=${JSON.stringify(s)};`).join('\n')+'\n'+
  'export const courseModules:RuntimeUnit[]=[\n'+data.map(emit).join(',\n')+'\n];\n';
}
export function strokeSource(geometry){
 const keys=readJSON('course/legacy/registry-order.json').strokes;
 return JSON.stringify(Object.fromEntries([...new Set([...keys,...Object.keys(geometry)])].filter(k=>k in geometry).map(k=>[k,geometry[k]])));
}
export function curriculumIndex({manifest,modules}){
 const index={schemaVersion:1,columns:{vocabulary:['pinyin','meaning','book','unit','lesson'],characters:['pinyin','meaning','book','unit','lesson'],grammar:['title','pattern','book','unit','lesson','activity']},order:manifest.books.flatMap(b=>b.units.map(u=>[b.id,u.id,u.order])),vocabulary:{},characters:{},grammar:{}};
 for(const m of modules){
  for(const w of m.newVocabulary)index.vocabulary[w.text]=[w.pinyin,w.meaning,m.bookId,m.unit.id,w.lessonId];
  for(const ch of m.newCharacters){const c=m.characters[ch];const l=m.lessons.find(l=>l.steps.some(s=>s.type==='intro'&&s.char===ch));index.characters[ch]=[c.pinyin,c.meaning,m.bookId,m.unit.id,l?.id??null];}
  for(const g of m.grammarIntroductions){const r=g.kind==='rule'?m.grammarRules[g.ref]:m.phrases[g.ref];index.grammar[g.id]=[g.kind==='rule'?r.title:r.text,g.kind==='rule'?r.pattern:r.note,m.bookId,m.unit.id,g.lessonId,g.stepId];}
 }
 return index;
}
export function indexSource(index){
 return '{\n  "schemaVersion": 1,\n  "columns": '+JSON.stringify(index.columns)+',\n  "order": '+JSON.stringify(index.order)+',\n'+['vocabulary','characters','grammar'].map(k=>'  '+JSON.stringify(k)+': {\n'+Object.entries(index[k]).map(([id,v])=>'    '+JSON.stringify(id)+': '+JSON.stringify(v)).join(',\n')+'\n  }').join(',\n')+'\n}\n';
}
