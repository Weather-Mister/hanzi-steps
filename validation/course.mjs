import fs from 'node:fs';
import path from 'node:path';
import {loadCourse,ensureValid,root,registrySource,strokeSource,curriculumIndex,indexSource} from './course-io.mjs';
try{
 const course=await loadCourse();ensureValid(course);
 const outputs={'course/registry.generated.ts':registrySource(course.manifest,course.modules),'course/index.json':indexSource(curriculumIndex(course)),'lib/stroke-data.json':strokeSource(course.geometry)};
 const mode=process.argv[2]||'check';
 if(!['check','generate','context'].includes(mode))throw Error('Usage: course.mjs check|generate|context [--book book-1 --before 9]');
 if(mode==='context'){
  const args=process.argv.slice(3),book=args[args.indexOf('--book')+1],before=Number(args[args.indexOf('--before')+1]);
  const b=course.manifest.books.find(b=>b.id===book);if(!b||!Number.isInteger(before)||before<1||before>b.units.length+1)throw Error('Use a valid --book and --before unit number (including the next unit).');
  const ix=curriculumIndex(course);const order=ix.order;const start=order.findIndex(r=>r[0]===book);const cutoff=(start<0?order.length:start)+before-1;
  const prior=new Set(order.slice(0,cutoff).map(r=>r[1]));
  const filtered={...ix,order:order.slice(0,cutoff)};for(const k of ['vocabulary','characters','grammar'])filtered[k]=Object.fromEntries(Object.entries(ix[k]).filter(([,r])=>prior.has(r[3])));
  console.log(indexSource(filtered));
 }else{
  for(const [file,source]of Object.entries(outputs)){
   if(mode==='generate')fs.writeFileSync(path.join(root,file),source);
   else if(!fs.existsSync(path.join(root,file))||fs.readFileSync(path.join(root,file),'utf8')!==source)throw Error(`${file} is stale. Run npm run course:generate.`);
  }
  console.log(`Curriculum ${mode==='generate'?'generated':'valid'}: ${course.modules.length} units, ${course.modules.flatMap(m=>m.lessons).length} lessons; NEW vocabulary, character coverage, IDs, references, answers, grammar and handwriting checked.`);
 }
}catch(error){console.error(error.message);process.exitCode=1;}
