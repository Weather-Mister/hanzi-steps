import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {characters,lessons,vocabulary,phrases} from '../course/runtime.ts';
import {characterOwners,knownAtUnit,learnedCharacter,learnedWordsForCharacter,readingPrerequisites,teachingThroughLesson,prerequisiteHint} from '../lib/curriculum-relations.ts';
import {learnedCharacterMeanings} from '../lib/character-intelligence.ts';
import {readingCheckpoints,readingAvailable,readingDictionary,readingCharacterHelp} from '../lib/reading-checkpoints.ts';
import {readingContracts,readingTokenStatus,validateReadingContracts,resolveSentence,sentenceAvailable,sentenceHasKnownCharacters} from '../lib/learning-materials.ts';
import {listeningItems,listeningSceneIds,eligibleListening,listeningQuestion,listeningOptions,listeningPinyinCorrect,listeningItemId,interleaveListening} from '../lib/listening-path.ts';
import {characterSenseGates} from '../course/enrichment/character-sense-gates.ts';
import {characterMeanings} from '../lib/character-meanings.ts';
import {matchesPinyin} from '../lib/pinyin.ts';
import {matchesMegaPinyin,reverseMegaVocabulary} from '../lib/mega-challenge.ts';
import {learnedPracticeItems,makeDailyTen,updatePracticeState} from '../lib/practice-engine.ts';
import {interleaveKnowledge} from '../lib/cumulative-knowledge.ts';
import {materialReviewPayloads,fingerprint} from './material-review.mjs';
const all=new Set(lessons.map(l=>l.id));

test('all reading spans and declared grammar satisfy explicit contracts',()=>{
 assert.deepEqual(validateReadingContracts(),[]);
 for(const r of readingCheckpoints){
  for(const [i,segments] of readingContracts[r.id].segments.entries()){
   const line=r.lines[i];
   if(line.sourcePhraseId){
    const source=resolveSentence({kind:'phrase',id:line.sourcePhraseId});
    assert.ok(source,r.id+': missing canonical phrase '+line.sourcePhraseId);
    assert.equal(source.text,line.text);
    assert.equal(source.pinyin,line.pinyin);
    assert.equal(source.meaning,line.translation);
    continue;
   }
   assert.equal(segments.join(''),line.text);
   for(const token of segments)assert.ok(!['forbidden-future','unclassified'].includes(readingTokenStatus(r.id,token)),r.id+':'+token);
  }
 }
});
test('early reading help never uses global future character records',()=>{
 const early=readingCheckpoints[0];
 for(const char of characterOwners.keys()){
  if(!knownAtUnit(characterOwners.get(char),early.unitId))assert.ok(!readingDictionary(early).has(char),char);
 }
 const transport=readingCheckpoints.find(r=>r.unitId==='unit-25');
 assert.deepEqual(readingCharacterHelp(transport,'捷運站'),[]);
 assert.equal(readingTokenStatus(early.id,'甜點'),'forbidden-future');
 assert.equal(readingTokenStatus(early.id,'龘'),'unclassified');
 assert.equal(readingTokenStatus(early.id,'可是'),'support-only');
 assert.equal(readingTokenStatus('reading-unit-22','一點'),'contextual');
 assert.equal(readingTokenStatus('reading-unit-44','下'),'contextual');
});
test('readings reject sparse reviews and Book 2 jumps, without changing saved lesson state',()=>{
 for(const r of readingCheckpoints){
  const ids=readingPrerequisites(r.unitId),complete=new Set(ids);
  assert.ok(readingAvailable(r,complete));
  for(const missing of [ids[0],ids.at(-1)]){const sparse=new Set(ids);sparse.delete(missing);assert.equal(readingAvailable(r,sparse),false)}
 }
 const b2=new Set(lessons.filter(l=>l.unitId?.startsWith('book-2')).map(l=>l.id));
 assert.equal(readingAvailable(readingCheckpoints.at(-1),b2),false);
 assert.deepEqual(eligibleListening(b2),[]);
});
test('card word relations are derived, exhaustive and gated by canonical teaching',()=>{
 for(const char of characterOwners.keys()){
  assert.ok(characters[char]);
  assert.deepEqual(learnedWordsForCharacter(char,all),vocabulary.filter(w=>w.text.includes(char)));
  assert.deepEqual(learnedWordsForCharacter(char,new Set()),[]);
  assert.ok(learnedWordsForCharacter(char,all).every(w=>w.text.includes(char)));
 }
 const completed=new Set(['practice-上']);
 assert.deepEqual(learnedWordsForCharacter('上',completed),[]);
 assert.equal(learnedCharacter('上',completed),false);
 assert.deepEqual(learnedCharacterMeanings('上',completed),[]);
});
test('every lesson boundary gates listening cumulatively and supplies an actionable lock reason',()=>{
 const completed=new Set();
 for(const lesson of lessons){
  completed.add(lesson.id);
  for(const item of listeningItems){
   const source=resolveSentence(item.source),required=teachingThroughLesson(source.lessonId);
   if(!required.every(id=>completed.has(id))){
    assert.equal(sentenceAvailable(item.source,completed),false,item.id+':'+lesson.id);
    assert.match(prerequisiteHint(required,completed),/^Next prerequisite: Book [12] · Unit \d+ · /);
   }
  }
 }
 assert.equal(prerequisiteHint(teachingThroughLesson(lessons.at(-1).id),completed),undefined);
});
test('initial audio scenes never assess unfamiliar reading support without a listening gloss',()=>{
 assert.equal(new Set(listeningSceneIds).size,listeningSceneIds.length);
 for(const id of listeningSceneIds){
  const reading=readingCheckpoints.find(r=>r.id===id);assert.ok(reading,id);
  assert.ok(Object.values(reading.glosses).every(g=>!g.unfamiliar),id+' needs a pre-listening support design before inclusion');
  assert.ok(readingAvailable(reading,all));
 }
});
test('reviewed senses reuse safe source examples and do not inherit early ownership',()=>{
 for(const gate of characterSenseGates){
  const s=resolveSentence(gate.exampleRef),sense=characterMeanings(gate.char)[gate.sense];
  assert.ok(sense&&s&&s.text.includes(gate.char),gate.char);
  assert.ok(sentenceHasKnownCharacters(gate.exampleRef));
  assert.ok(learnedCharacterMeanings(gate.char,all).some(e=>e.example.text===s.text));
  const before=new Set(teachingThroughLesson(s.lessonId));before.delete(s.lessonId);
  assert.ok(!learnedCharacterMeanings(gate.char,before).some(e=>e.example.text===s.text));
 }
 assert.deepEqual(learnedCharacterMeanings('幾',new Set(['u7-v2-family'])),[]);
 assert.ok(learnedCharacterMeanings('了',all).some(s=>s.meaning.includes('completed action')));
 assert.ok(!learnedCharacterMeanings('了',all).some(s=>s.pinyin==='liǎo'),'untaught productive senses stay hidden');
});
test('listening only uses reviewed productive source references and safe English distractors',()=>{
 assert.equal(new Set(listeningItems.map(i=>i.id)).size,listeningItems.length);
 for(const item of listeningItems){
  const source=resolveSentence(item.source);assert.ok(source?.productive&&sentenceHasKnownCharacters(item.source),item.id);
  const options=listeningOptions(item,item.id);assert.equal(options.filter(o=>o.correct).length,1);
  assert.equal(options.find(o=>o.correct).text,source.meaning);
  assert.equal(new Set(options.map(o=>o.text.toLowerCase())).size,options.length);
  assert.ok(options.every(o=>o.rationale.length>15));
  assert.ok(item.distractors.every(o=>!/[\p{Script=Han}]/u.test(o.text)));
  assert.equal(sentenceAvailable(item.source,new Set([source.lessonId])),false,'a lone source completion cannot imply all prerequisites');
  assert.equal(sentenceAvailable(item.source,all),true);
  const q=listeningQuestion(item,'meaning','test');assert.ok(q.item.id.startsWith('listening:'));assert.equal(q.mode,'recognition');
 }
 assert.equal(sentenceAvailable({kind:'phrase',id:'u48-prescription-support'},all),false);
 assert.equal(sentenceAvailable({kind:'reading-line',readingId:'reading-unit-10',line:0},all),false,'reading support never becomes typed recall');
});
test('pinyin grading preserves the Gauntlet policy and canonical display',()=>{
 for(const input of ['nǐ hǎo','ni3hao3','ni hao','NIHAO','ni2 hao4']){assert.equal(matchesPinyin(input,'nǐ hǎo'),true);assert.equal(matchesMegaPinyin(input,'nǐ hǎo'),true)}
 for(const input of ['nǚ ér','nv3er2','nu:3 er2'])assert.equal(matchesPinyin(input,'nǚ ér'),true);
 for(const input of ['', 'ni hao ma','hao'])assert.equal(matchesPinyin(input,'nǐ hǎo'),false);
 const task={item:listeningItems[0],mode:'pinyin'};assert.equal(listeningPinyinCorrect(task,'wo3shi4xue2sheng1'),true);
 assert.equal(resolveSentence(task.item.source).pinyin,'wǒ shì xuéshēng');
});
test('adaptive listening is opt-in, bounded, due-aware and preserves knowledge tasks',()=>{
 const items=learnedPracticeItems(all),base=interleaveKnowledge(makeDailyTen(items,{},'base'),all,{},'base');
 assert.strictEqual(interleaveListening(base,all,{},'same',false),base);
 const withAudio=interleaveListening(base,all,{},'same',true);assert.equal(withAudio.length,base.length);assert.equal(withAudio.filter(q=>q.listening).length,1);
 assert.deepEqual(withAudio.filter(q=>q.knowledge),base.filter(q=>q.knowledge));
 const states=Object.fromEntries(listeningItems.map(item=>{const id=listeningItemId(item),row=updatePracticeState(undefined,{itemId:id,mode:'recognition',correct:true,assisted:false,now:Date.now()});return [id+'::recognition',{...row,nextReview:Date.now()+86400000}]}));
 assert.deepEqual(interleaveListening(base,all,states,'same',true),base);
 assert.ok(!reverseMegaVocabulary(all).some(w=>w.id.startsWith('listening:')));
 assert.deepEqual(eligibleListening(new Set()),[]);
});
test('source, pinyin, translation, answers, segmentation and sense drift invalidate editorial review',()=>{
 const fixture=JSON.parse(fs.readFileSync(new URL('./fixtures/connected-materials-reviewed.json',import.meta.url),'utf8'));
 assert.deepEqual(materialReviewPayloads(),fixture.payloads,'Changed material needs semantic review, not an automatic snapshot refresh.');
 const item=listeningItems[0],source=phrases[item.source.id],original=source.meaning;
 try{source.meaning='This no longer matches the audio.';assert.notEqual(materialReviewPayloads().listening[item.id],fixture.payloads.listening[item.id])}finally{source.meaning=original}
 const r=readingCheckpoints[0],contract=readingContracts[r.id],token=contract.segments[0][0];
 try{contract.segments[0][0]='甜點';assert.ok(validateReadingContracts().some(e=>e.includes('future')))}finally{contract.segments[0][0]=token}
 assert.notEqual(fingerprint({text:'你',pinyin:'nǐ'}),fingerprint({text:'你',pinyin:'nī'}));
});
