import {test} from 'node:test';
import assert from 'node:assert/strict';
import {books,units,vocabulary,characters,unitLibraryCharacters} from '../lib/curriculum.ts';
import {validateCharacterCoverage} from '../scripts/check-character-coverage.mjs';

test('Every implemented unit has exactly its first-time vocabulary characters',()=>{
 const {errors,report}=validateCharacterCoverage();
 assert.deepEqual(errors,[]);
 assert.deepEqual(report.slice(0,8).map(row=>[row.unit,row.count]),[
  ['unit-1',7],['unit-2',11],['unit-3',13],['unit-4',13],['unit-5',9],
  ['unit-6',10],['unit-7',13],['unit-8',12]
 ]);
 assert.deepEqual(report.map(row=>row.unit),books.flatMap(b=>b.unitIds));
 const taught=new Set();
 for(const row of report){
  const unit=units.find(u=>u.id===row.unit);
  const required=new Set(vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId)).flatMap(w=>[...w.text].filter(c=>/\p{Script=Han}/u.test(c)&&!taught.has(c))));
  assert.equal(row.count,required.size,row.unit);
  assert.deepEqual([...row.characters].sort(),[...required].sort(),row.unit);
  for(const c of required)taught.add(c);
 }
 const list=id=>unitLibraryCharacters(units.find(unit=>unit.id===id));
 assert.ok(list('unit-8').includes('以'));
 assert.ok(list('unit-7').includes('師'));
 assert.ok(list('unit-8').includes('怎'));
 assert.ok(!list('book-2-unit-1').some(char=>['師','怎'].includes(char)));
 assert.equal(characters['師'].example.text,'老師');
 assert.equal(characters['怎'].example.text,'怎麼樣');
});

test('Coverage rejects missing cards, metadata, generic explanations and later duplicates',()=>{
 const run=options=>validateCharacterCoverage(options).errors.join('\n');
 const display=change=>unit=>change(unit.id,[...unitLibraryCharacters(unit)]);
 assert.match(run({display:display((id,cards)=>id==='unit-8'?cards.filter(char=>char!=='以'):cards)}),/可以 is missing first-time character 以/);
 assert.match(run({entries:{...characters,'以':undefined}}),/以 has no character-teaching entry/);
 for(const [field,value,pattern] of [
  ['pinyin','',/以 is missing pinyin/],['pinyin','yi',/以 is missing a pinyin tone mark/],
  ['memory','',/以 is missing a character-specific memory/],
  ['memory','Remember the shape',/以 is missing a character-specific memory/],
  ['parts',[],/以 is missing a character-specific component/]
 ])assert.match(run({entries:{...characters,'以':{...characters['以'],[field]:value}}}),pattern);
 assert.match(run({display:display((id,cards)=>id==='unit-8'?[...cards,'以']:cards)}),/unit-8: duplicate character card/);
 assert.match(run({display:display((id,cards)=>id==='book-2-unit-1'?[...cards,'師']:cards)}),/師 is already taught in unit-7/);
 assert.match(run({display:display((id,cards)=>id==='unit-1'?[...cards,'以']:cards)}),/以 is disconnected from new vocabulary/);
});

test('Repeated word characters and non-Hanzi symbols do not create extra cards',()=>{
 const unit={id:'sample',chars:['可','以'],lessonIds:['sample-lesson']};
 const result=validateCharacterCoverage({
  courseBooks:[{unitIds:[unit.id]}],courseUnits:[unit],
  words:[{text:'可以，可以！ ABC 123 🙂',lessonId:'sample-lesson'}],
  display:()=>['可','以']
 });
 assert.deepEqual(result.errors,[]);
 assert.equal(result.report[0].count,2);
});
