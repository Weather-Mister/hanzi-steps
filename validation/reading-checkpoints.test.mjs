import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readingCheckpoints,readingAvailable,tokenizeReading,readingDictionary,freshReadingProgress,validReadingProgress,readReadingProgress,readingStorageKey,readingScore} from '../lib/reading-checkpoints.ts';
import {units} from '../course/runtime.ts';
import {readingPrerequisites} from '../lib/curriculum-relations.ts';
const index=JSON.parse(readFileSync(new URL('../course/index.json',import.meta.url),'utf8'));
const order=index.order.map(row=>row[1]);
const han=/\p{Script=Han}/u;
test('69 unique checkpoints preserve milestone sets and add dense interleaved readings',()=>{
 assert.equal(readingCheckpoints.length,69);
 assert.equal(new Set(readingCheckpoints.map(r=>r.id)).size,69);
 const milestones=[10,13,16,19,22,25,28,31,34,37,40,43,46].map(n=>`unit-${n}`);
 for(const unitId of milestones)assert.equal(readingCheckpoints.filter(r=>r.unitId===unitId).length,3,unitId);
 assert.equal(readingCheckpoints.filter(r=>r.unitId==='unit-44').length,2);
 assert.equal(readingCheckpoints.filter(r=>r.unitId==='unit-48').length,1);
 assert.equal(readingCheckpoints.filter(r=>r.unitId==='book-2-unit-4').length,3);
});
for(const r of readingCheckpoints){
 test(`${r.id}: all text has help, unknown language is explicitly supported, questions have evidence`,()=>{
  const end=order.indexOf(r.unitId);assert.ok(end>=0);
  const knownChars=new Set(Object.entries(index.characters).filter(([,v])=>order.indexOf(v[3])<=end).map(([c])=>c));
  const tokens=r.lines.flatMap(line=>tokenizeReading(line.text,r));
  assert.equal(tokens.map(t=>t.text).join(''),r.lines.map(l=>l.text).join(''));
  const unknown=new Set();
  for(const token of tokens){
   if(!han.test(token.text))continue;
   assert.ok(token.gloss?.pinyin&&token.gloss?.meaning,`Missing help: ${token.text}`);
   for(const c of token.text)if(han.test(c)&&!knownChars.has(c)){unknown.add(c);assert.equal(token.gloss.unfamiliar,true,`Unmarked new character ${c}`)}
   // A later lexical form must not silently become a known word, even when its characters are known.
   const canonical=index.vocabulary[token.text];
   if(canonical&&order.indexOf(canonical[3])>end){
    const clockOne=token.text==='一點'&&r.unitId==='unit-22';
    const rainVerb=token.text==='下'&&r.unitId==='unit-44'&&order.indexOf(index.vocabulary['下雨'][3])<=end;
    assert.ok(clockOne||rainVerb||r.glosses[token.text]?.unfamiliar,`Later word ${token.text} needs explicit support`);
   }
  }
  assert.ok(unknown.size<=3,`Too many unfamiliar characters: ${[...unknown]}`);
  assert.ok(r.lines.length>=(r.id.endsWith('-mini')?4:5));assert.ok(r.questions.length>=(r.id.endsWith('-mini')?2:4));
  for(const line of r.lines){assert.ok(line.pinyin&&line.translation&&line.note);assert.ok(line.note.length>55)}
  for(const q of r.questions){assert.equal(new Set(q.options).size,q.options.length);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);assert.ok(q.explanation.length>35);assert.ok(q.evidence.length);assert.ok(q.evidence.every(i=>Number.isInteger(i)&&i>=0&&i<r.lines.length));}
  assert.ok(r.tips.length>=2);
  const unit=units.find(u=>u.id===r.unitId);
  assert.equal(readingAvailable(r,new Set()),false);
  assert.equal(readingAvailable(r,new Set(unit.lessonIds.slice(0,-1))),false);
  assert.equal(readingAvailable(r,new Set([unit.lessonIds.at(-1)])),false,'a review alone is not proof of prior teaching');
  assert.equal(readingAvailable(r,new Set(readingPrerequisites(r.unitId))),true);
 });
}
test('partial, completed, corrupt and old progress; profile isolation and replay',()=>{
 const r=readingCheckpoints[0],fresh=freshReadingProgress(r);
 assert.equal(validReadingProgress(fresh,r),true);
 assert.equal(validReadingProgress({...fresh,phase:'review'},r),false);
 assert.equal(validReadingProgress({...fresh,answers:[-1,0,0,0]},r),false);
 assert.equal(validReadingProgress({...fresh,answers:[5,0,0,0]},r),false);
 assert.equal(validReadingProgress({...fresh,version:0},r),false);
 const done={...fresh,phase:'review',answers:r.questions.map(q=>q.answer)};
 assert.equal(validReadingProgress(done,r),true);assert.equal(readingScore(r,done.answers),4);
 const saved=new Map([[readingStorageKey('alice',r),JSON.stringify(done)]]);
 const storage={getItem:key=>saved.get(key)||null};
 assert.deepEqual(readReadingProgress(storage,'alice',r),done);
 assert.deepEqual(readReadingProgress(storage,'bob',r),fresh);
 assert.deepEqual(readReadingProgress({getItem:()=>'{broken'},'alice',r),fresh);
 assert.deepEqual(readReadingProgress({getItem:()=>{throw Error('blocked')}},'alice',r),fresh);
 assert.deepEqual(freshReadingProgress(r).answers,[null,null,null,null]);
});
test('support vocabulary stays outside canonical ownership and practice',()=>{
 const early=readingCheckpoints[0];assert.equal(readingDictionary(early).has('甜點'),false);
 assert.equal(index.vocabulary['可是'][3],'unit-16');
 assert.equal(index.vocabulary['站'][3],'unit-28');
 assert.equal(index.vocabulary['分鐘'],undefined);
});
