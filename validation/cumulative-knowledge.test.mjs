import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {lessons,grammarRules,phrases,vocabulary,characters,units} from '../lib/curriculum.ts';
import {knowledgeConcepts,availableKnowledge,examplesForKnowledge,knowledgeQuestions,interleaveKnowledge,knowledgeForWord,knowledgeForReading,knowledgeAnswerCorrect,knowledgeAttemptTargets,learnedCharacter,safeKnowledgePhrase} from '../lib/cumulative-knowledge.ts';
import {usageLinks,characterFamilies,phraseGrammarLinks,grammarExampleLinks,readingKnowledgeLinks} from '../course/enrichment/knowledge.ts';
import {readingCheckpoints} from '../lib/reading-checkpoints.ts';
import {learnedPracticeItems,makeDailyTen,updatePracticeState,practiceSkillKey} from '../lib/practice-engine.ts';
import {eligibleMegaVocabulary,reverseMegaVocabulary} from '../lib/mega-challenge.ts';
const all=new Set(lessons.map(l=>l.id));
const through=id=>new Set(lessons.slice(0,lessons.findIndex(l=>l.id===id)+1).map(l=>l.id));
const now=1900000000000;
function row(id,mode,options={}){return {itemId:id,mode,attempts:3,correct:3,assisted:0,misses:0,streak:3,strength:.6,lastSeen:now-8*86400000,nextReview:now-86400000,...options};}
function isolate(id,extra={}){return {...Object.fromEntries(knowledgeConcepts.filter(c=>c.id!==id).map(c=>[c.id+'::recognition',row(c.id,'recognition',{lastSeen:now,nextReview:now+86400000})])),...extra};}
const normalized=s=>s.replace(/[\s，。！？、,.!?;；:：'"“”‘’（）()]/g,'');

test('relationships retain valid source references and exact authored segmentation',()=>{
 assert.equal(new Set(knowledgeConcepts.map(c=>c.id)).size,knowledgeConcepts.length);
 for(const u of usageLinks){assert.ok(u.source);for(const w of u.words)assert.ok(vocabulary.some(v=>v.text===w),w);for(const id of u.phraseIds)assert.ok(phrases[id]&&phrases[id].practice!==false,id);for(const id of u.grammarIds||[])assert.ok(grammarRules[id]);for(const c of u.cloze||[]){assert.ok(phrases[c.phraseId].text.includes(c.target));assert.equal(phrases[c.phraseId].text.split(c.target).length,2,'single cloze span');assert.ok(c.answers.includes(c.target));}}
 for(const [id,gs] of Object.entries(phraseGrammarLinks)){assert.ok(phrases[id],id);for(const g of gs)assert.ok(grammarRules[g],g);}
 for(const link of grammarExampleLinks)assert.equal(normalized(link.tokens.join('')),normalized(grammarRules[link.grammarId].examples[link.example].text));
 for(const family of characterFamilies){assert.ok(family.source);assert.ok(family.members.includes(family.answer));assert.ok(family.members.every(c=>characters[c]));}
});

test('fresh and partial learners receive no future grammar, family, or usage assessment',()=>{
 assert.deepEqual(knowledgeQuestions(new Set(),{},'new',3,now),[]);
 assert.deepEqual(availableKnowledge(new Set()),[]);
 const completed=new Set();
 for(const lesson of lessons){
  for(const q of knowledgeQuestions(completed,{},lesson.id,3,now)){
   const task=q.knowledge;assert.ok(task);
   if(task.concept.kind==='family')assert.ok(task.concept.words.every(c=>learnedCharacter(c,completed)));
   else assert.ok(safeKnowledgePhrase(task.exampleId,completed),task.exampleId+' before '+lesson.id);
   if(task.format==='order')assert.ok(knowledgeAnswerCorrect(task,task.tokens.join('')));
  }
  completed.add(lesson.id);
 }
});

test('every current grammar rule has a safe cumulative retrieval path when taught',()=>{
 for(const c of knowledgeConcepts.filter(c=>c.kind==='grammar')){
  assert.ok(examplesForKnowledge(c,all).length,c.id);
  const q=knowledgeQuestions(all,isolate(c.id),'each:'+c.id,1,now)[0];
  assert.equal(q?.item.id,c.id,c.id+' must be selectable');
 }
});

test('later 幾 and 跟 senses do not unlock with canonical word ownership',()=>{
 assert.ok(!knowledgeForWord('幾',through('u13-help')).some(c=>c.id==='usage:ji-few'));
 assert.ok(knowledgeForWord('幾',through('u46-nonspecific')).some(c=>c.id==='usage:ji-few'));
 assert.ok(!knowledgeForWord('跟',through('u46-nonspecific')).some(c=>c.id==='usage:gen-recipient'));
 assert.ok(knowledgeForWord('跟',through('u48-advice')).some(c=>c.id==='usage:gen-recipient'));
 const q=knowledgeQuestions(all,isolate('usage:gen-recipient'),'recipient',1,now)[0];assert.equal(q.item.id,'usage:gen-recipient');assert.equal(q.knowledge.format,'choice');
 assert.equal(vocabulary.filter(w=>w.text==='幾').length,1);assert.equal(vocabulary.filter(w=>w.text==='跟').length,1);
});

test('shared examples move older grammar into later Book 1 and Book 2 contexts',()=>{
 const cup=knowledgeConcepts.find(c=>c.id==='grammar:u11-cup');assert.ok(examplesForKnowledge(cup,all).some(p=>p.id==='u13-buy-for-her'));
 const le=knowledgeConcepts.find(c=>c.id==='grammar:u39-verbal-le');assert.ok(examplesForKnowledge(le,all).some(p=>p.id==='b2u3-l2-model'));
 assert.ok(!examplesForKnowledge(le,through('u48-advice')).some(p=>p.id==='b2u3-l2-model'));
 const b2only=new Set(lessons.filter(l=>l.unitId?.startsWith('book-2')).map(l=>l.id));assert.equal(knowledgeQuestions(b2only,{},'skip-book1',3,now).length,0,'no implicit Book 1 knowledge when jumping books');
});

test('all reviewed usages are retrievable and family clues never create canonical characters',()=>{
 for(const u of usageLinks){const q=knowledgeQuestions(all,isolate('usage:'+u.id),u.id,1,now)[0];assert.equal(q?.item.id,'usage:'+u.id);}
 assert.equal(characters['青'],undefined);assert.equal(characters['份'],undefined);assert.equal(characters['診'],undefined);
 for(const c of knowledgeConcepts)assert.ok(!c.words.includes('份')&&!c.words.includes('診'));
});

test('scaffolding fades separately from recognition, pinyin and handwriting; cooldown respects due dates',()=>{
 const id='usage:books-ben';const fresh=knowledgeQuestions(all,isolate(id),'intro',1,now)[0];assert.equal(fresh.knowledge.introduce,true);assert.equal(fresh.knowledge.format,'order');
 const assisted=updatePracticeState(undefined,{itemId:id,mode:'sentence',correct:true,assisted:true,now});assert.ok(assisted.strength<.2);assert.equal(assisted.streak,0);
 const practiced={...isolate(id),[id+'::sentence']:row(id,'sentence')};const harder=knowledgeQuestions(all,practiced,'harder',1,now)[0];assert.equal(harder.knowledge.introduce,false);assert.equal(harder.knowledge.format,'cloze');assert.ok(knowledgeAnswerCorrect(harder.knowledge,' 本 '));assert.ok(!knowledgeAnswerCorrect(harder.knowledge,'個'));
 const pinyinOnly={...isolate(id),[id+'::pinyin']:row(id,'pinyin')};assert.equal(knowledgeQuestions(all,pinyinOnly,'pinyin',1,now)[0].knowledge.format,'order');
 const waiting={...isolate(id),[id+'::sentence']:row(id,'sentence',{nextReview:now+86400000})};assert.deepEqual(knowledgeQuestions(all,waiting,'waiting',1,now),[]);
 const family='family:da-tai';assert.equal(knowledgeQuestions(all,isolate(family),'f',1,now)[0].knowledge.format,'choice');assert.equal(knowledgeQuestions(all,{...isolate(family),[family+'::recognition']:row(family,'recognition')},'f',1,now)[0].knowledge.format,'write');
});

test('mistakes, delayed review and example history affect selection without resetting old state',()=>{
 const snapshot={['word:我::pinyin']:row('word:我','pinyin'),['grammar:u13-help::sentence']:row('grammar:u13-help','sentence',{correct:0,misses:3,streak:0,strength:0})};
 const before=JSON.stringify(snapshot);const q=knowledgeQuestions(all,snapshot,'due',3,now);assert.equal(q[0].item.id,'grammar:u13-help');assert.equal(JSON.stringify(snapshot),before);
 const id='usage:bang-beneficiary',state=isolate(id);const first=knowledgeQuestions(all,state,'same',1,now)[0];state[id+':example:'+first.knowledge.exampleId+'::sentence']=row(id+':example:'+first.knowledge.exampleId,'sentence');const next=knowledgeQuestions(all,state,'same',1,now)[0];assert.notEqual(next.knowledge.exampleId,first.knowledge.exampleId);
});

test('rounds retain their bounds and challenges retain exact learned-word eligibility',()=>{
 const items=learnedPracticeItems(all),base=makeDailyTen(items,{},'mix',now);const mega=eligibleMegaVocabulary(all,new Set()).map(w=>w.id);const reverse=reverseMegaVocabulary(all).map(w=>w.id);
 for(let i=0;i<20;i++){const q=interleaveKnowledge(base,all,{},'mix'+i,10,now);assert.ok(q.length<=10);assert.equal(q.filter(q=>q.knowledge).length,3);assert.equal(new Set(q.filter(q=>q.knowledge).map(q=>q.knowledge.answer)).size,3);}
 assert.deepEqual(eligibleMegaVocabulary(all,new Set()).map(w=>w.id),mega);assert.deepEqual(reverseMegaVocabulary(all).map(w=>w.id),reverse);
 assert.ok(!mega.some(id=>id.startsWith('grammar:')||id.startsWith('usage:')||id.startsWith('family:')));
});

test('reading and lesson links are gated and use the same concepts without granting passive mastery',()=>{
 for(const [id,links] of Object.entries(readingKnowledgeLinks)){
  const reading=readingCheckpoints.find(r=>r.id===id);assert.ok(reading);
  for(const link of links){assert.ok(reading.lines[link.line]);for(const conceptId of link.conceptIds)assert.ok(knowledgeConcepts.some(c=>c.id===conceptId),conceptId);assert.deepEqual(knowledgeForReading(id,link.line,new Set()),[]);}
 }
 const targets=knowledgeAttemptTargets({id:'test',type:'order',phrase:'u13-buy-for-her'},all);assert.ok(targets.some(t=>t.itemId==='grammar:u11-cup'));assert.ok(targets.some(t=>t.itemId==='usage:bang-beneficiary'));assert.deepEqual(knowledgeAttemptTargets({id:'test',type:'phrase',phrase:'u13-buy-for-her'},all),[]);
 const readingUI=fs.readFileSync(new URL('../components/reading-checkpoint.tsx',import.meta.url),'utf8');assert.ok(readingUI.indexOf('knowledgeForReading(reading.id')>readingUI.indexOf('{reviewed&&<section'));assert.ok(!readingUI.includes('mastery.record'));
});


test('first-lesson grammar evidence is recorded only after its actual explanation',()=>{
 const l=lessons.find(l=>l.id==='u13-help');
 const order=l.steps.find(s=>s.type==='order'&&s.phrase==='u13-buy-for-her');
 assert.ok(order);
 assert.ok(knowledgeAttemptTargets(order,new Set(),l.id).some(t=>t.itemId==='grammar:u13-help'));
 assert.deepEqual(knowledgeAttemptTargets({...order,id:'not-a-current-step'},new Set(),l.id),[]);
 assert.deepEqual(knowledgeAttemptTargets(order,new Set(),'u13-sell'),[]);
});
