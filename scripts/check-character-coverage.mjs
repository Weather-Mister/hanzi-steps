import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import {books,units,vocabulary,characters,unitLibraryCharacters,practiceLesson} from '../lib/curriculum.ts';

const strokes=JSON.parse(fs.readFileSync(new URL('../lib/stroke-data.json',import.meta.url),'utf8'));
const hanzi=text=>[...text].filter(char=>/\p{Script=Han}/u.test(char));
const generic=/^\s*remember the shape(?:[.!:\s]|$)|follow the highlighted groups in order|keep the whole character balanced inside the square/i;
const toneMark=/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜńňǹḿ]/i;

// Check the displayed teaching lists independently of the function that builds them.
// Optional inputs make the failure cases testable without changing live curriculum.
export function validateCharacterCoverage({courseBooks=books,courseUnits=units,words=vocabulary,entries=characters,display=unitLibraryCharacters}={}){
 const errors=[],report=[],taught=new Map(),explanations=new Map();
 const order=courseBooks.flatMap(book=>book.unitIds);
 if(new Set(order).size!==order.length)errors.push('Course order contains a duplicate unit.');
 for(const unit of courseUnits)if(!order.includes(unit.id))errors.push(`${unit.id}: missing from course order`);
 for(const id of order){
  const unit=courseUnits.find(unit=>unit.id===id);
  if(!unit){errors.push(`${id}: missing unit`);continue;}
  const unitWords=words.filter(word=>unit.lessonIds.includes(word.lessonId));
  const wordCharacters=new Set(unitWords.flatMap(word=>hanzi(word.text)));
  const required=[...wordCharacters].filter(char=>!taught.has(char));
  const displayed=display(unit);
  if(new Set(unit.chars).size!==unit.chars.length)errors.push(`${id}: duplicate guided character target`);
  // Guided handwriting can revisit an earlier formal character even when its
  // word is now REVIEW and therefore absent from this unit's NEW vocabulary.
  for(const char of unit.chars)if(!wordCharacters.has(char)&&!taught.has(char))errors.push(`${id}: ${char} guided target is disconnected from vocabulary`);
  if(new Set(displayed).size!==displayed.length)errors.push(`${id}: duplicate character card`);
  for(const char of required)if(!displayed.includes(char)){
   const word=unitWords.find(word=>word.text.includes(char));
   errors.push(`${id}: ${word.text} is missing first-time character ${char}`);
  }
  for(const char of new Set(displayed)){
   const fail=message=>errors.push(`${id}: ${char} ${message}`);
   if(taught.has(char))fail(`is already taught in ${taught.get(char)}`);
   if(!wordCharacters.has(char))fail('is disconnected from new vocabulary');
   if(hanzi(char).length!==1||[...char].length!==1)fail('is not one Han character');
   const entry=entries[char];
   if(!entry){fail('has no character-teaching entry');continue;}
   if(entry.hanzi!==char)fail('has a mismatched teaching entry');
   if(!entry.pinyin?.trim())fail('is missing pinyin');
   else if(/\d/.test(entry.pinyin)||(!toneMark.test(entry.pinyin)&&!entry.zhuyin?.includes('˙')))fail('is missing a pinyin tone mark (neutral tones use unmarked pinyin)');
   for(const field of ['note','memory'])if(!entry[field]?.trim()||generic.test(entry[field]))fail(`is missing a character-specific ${field} explanation`);
   if(explanations.has(entry.memory)&&explanations.get(entry.memory)!==char)fail(`reuses the explanation for ${explanations.get(entry.memory)}`);
   explanations.set(entry.memory,char);
   if(!entry.parts?.length||entry.parts.some(part=>!part.description?.trim()||generic.test(part.description)))fail('is missing a character-specific component explanation');
   const shape=strokes[char];
   if(!shape||shape.strokes.length!==entry.strokes||shape.medians.length!==entry.strokes)fail('is missing complete handwriting geometry');
   const covered=entry.parts?.flatMap(part=>part.strokes).sort((a,b)=>a-b);
   if(JSON.stringify(covered)!==JSON.stringify(Array.from({length:entry.strokes},(_,index)=>index)))fail('has incomplete or duplicate component strokes');
   try{
    const lesson=practiceLesson(char);
    for(const type of ['intro','trace','complete','memory'])if(!lesson.steps.some(step=>step.type===type&&step.char===char))fail(`is missing ${type} practice`);
   }catch{fail('cannot open character practice');}
  }
  report.push({unit:id,count:displayed.length,characters:displayed.join('')});
  // Only earlier formal cards count as taught; never consult a later book's records.
  for(const char of displayed)if(entries[char]&&!taught.has(char))taught.set(char,id);
 }
 return {errors,report};
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 const {errors,report}=validateCharacterCoverage();
 for(const row of report)console.log(`${row.unit}: ${row.count} new characters — ${row.characters}`);
 if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
 else console.log(`Character coverage passed: ${report.length} units, ${report.reduce((total,row)=>total+row.count,0)} unique first-time characters.`);
}
