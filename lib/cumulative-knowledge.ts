import {characters,grammarRules,lessons,phrases,vocabulary,shuffled,type Step,type Phrase} from './curriculum.ts';
import {learnedCharacter} from './curriculum-relations.ts';
export {learnedCharacter} from './curriculum-relations.ts';
import {characterFamilies,usageLinks,phraseGrammarLinks,grammarContrasts,readingKnowledgeLinks,grammarExampleLinks} from '../course/enrichment/knowledge.ts';
import type {PracticeMode,PracticeQuestion,PracticeStateMap,PracticeSessionKind} from './practice-engine.ts';

export type KnowledgeConcept={id:string;kind:'grammar'|'usage'|'family';title:string;explanation:string;words:string[];phraseIds:string[];requiredLessons:string[];source:string};
export type KnowledgeTask={concept:KnowledgeConcept;exampleId:string;format:'order'|'cloze'|'choice'|'write';prompt:string;answer:string;accepted:string[];tokens?:string[];options?:string[];pinyin:string;explanation:string;introduce:boolean};
const phraseLessons=new Map<string,string[]>();
const grammarLessons=new Map<string,string[]>();
for(const lesson of lessons)for(const step of lesson.steps){
 if((step.type==='phrase'||step.type==='order')&&step.phrase)phraseLessons.set(step.phrase,[...phraseLessons.get(step.phrase)||[],lesson.id]);
 if(step.type==='grammar'&&step.grammar)grammarLessons.set(step.grammar,[...grammarLessons.get(step.grammar)||[],lesson.id]);
}
const knowledgePhrases:Record<string,Phrase>={...phrases};
for(const link of grammarExampleLinks){
 const rule=grammarRules[link.grammarId],example=rule.examples[link.example];
 const id='rule-example:'+link.grammarId+':'+link.example;
 knowledgePhrases[id]={...example,note:rule.remember,tokens:link.tokens,grammarIds:[link.grammarId]};
 phraseLessons.set(id,grammarLessons.get(link.grammarId)||[]);
}
const wordLessons=new Map(vocabulary.map(w=>[w.text,w.lessonId]));
const hasAny=(completed:Set<string>,ids:string[]|undefined)=>Boolean(ids?.some(id=>completed.has(id)));
export const phraseConceptGrammar=(id:string)=>[...new Set([...(knowledgePhrases[id]?.grammarIds||[]),...(phraseGrammarLinks[id]||[])])];
export const taughtGrammar=(id:string,completed:Set<string>)=>hasAny(completed,grammarLessons.get(id));
export function safeKnowledgePhrase(id:string,completed:Set<string>):boolean{
 const phrase=knowledgePhrases[id];
 if(!phrase||phrase.practice===false||!hasAny(completed,phraseLessons.get(id)))return false;
 if(!phraseConceptGrammar(id).every(g=>taughtGrammar(g,completed)))return false;
 // Unknown/support-only glyphs are not promoted into productive assessment.
 return Array.from(phrase.text).filter(c=>/\p{Script=Han}/u.test(c)).every(c=>learnedCharacter(c,completed));
}
const grammarConcepts:KnowledgeConcept[]=Object.values(grammarRules).map(rule=>({
 id:'grammar:'+rule.id,kind:'grammar',title:rule.title,explanation:rule.pattern+' · '+rule.remember,
 words:rule.words||[],phraseIds:Object.keys(knowledgePhrases).filter(id=>phraseConceptGrammar(id).includes(rule.id)),
 requiredLessons:grammarLessons.get(rule.id)||[],source:'Existing course rule '+rule.id,
}));
const usageConcepts:KnowledgeConcept[]=usageLinks.map(link=>({
 id:'usage:'+link.id,kind:'usage',title:link.title,explanation:link.explanation,words:link.words,phraseIds:link.phraseIds,
 requiredLessons:[],source:link.source,
}));
const familyConcepts:KnowledgeConcept[]=characterFamilies.map(family=>({
 id:'family:'+family.id,kind:'family',title:family.title,explanation:family.explanation,words:family.members,phraseIds:[],requiredLessons:[],source:family.source,
}));
export const knowledgeConcepts=[...grammarConcepts,...usageConcepts,...familyConcepts];
const conceptIndex=new Map(knowledgeConcepts.map(c=>[c.id,c]));
export const knowledgeConcept=(id:string)=>conceptIndex.get(id);
export function availableKnowledge(completed:Set<string>):KnowledgeConcept[]{
 return knowledgeConcepts.filter(c=>{
  if(c.kind==='family')return c.words.every(char=>learnedCharacter(char,completed));
  if(c.kind==='grammar')return hasAny(completed,c.requiredLessons);
  const link=usageLinks.find(u=>'usage:'+u.id===c.id)!;
  return link.words.every(w=>completed.has(wordLessons.get(w)||''))&&(link.grammarIds||[]).every(g=>taughtGrammar(g,completed))&&link.phraseIds.some(id=>safeKnowledgePhrase(id,completed));
 });
}
export function knowledgeForWord(word:string,completed:Set<string>):KnowledgeConcept[]{
 return availableKnowledge(completed).filter(c=>c.kind!=='grammar'&&(c.words.includes(word)||(c.kind==='family'&&Array.from(word).some(char=>c.words.includes(char)))));
}
export function knowledgeForPhrase(id:string,completed:Set<string>):KnowledgeConcept[]{
 return availableKnowledge(completed).filter(c=>c.phraseIds.includes(id));
}
export function knowledgeForReading(readingId:string,line:number,completed:Set<string>):KnowledgeConcept[]{
 const ids=readingKnowledgeLinks[readingId]?.find(link=>link.line===line)?.conceptIds||[];
 const available=new Set(availableKnowledge(completed).map(c=>c.id));
 return ids.filter(id=>available.has(id)).flatMap(id=>conceptIndex.get(id)||[]);
}
export function examplesForKnowledge(concept:KnowledgeConcept,completed:Set<string>){
 return concept.phraseIds.filter(id=>safeKnowledgePhrase(id,completed)).map(id=>({id,...knowledgePhrases[id]}));
}
const key=(id:string,mode:PracticeMode)=>id+'::'+mode;
const modes:PracticeMode[]=['recognition','sentence','context','handwriting'];
const rowsFor=(states:PracticeStateMap,id:string)=>modes.flatMap(mode=>states[key(id,mode)]||[]);
function attempts(states:PracticeStateMap,id:string){return rowsFor(states,id).reduce((n,r)=>n+r.attempts,0);}
function latestSeen(states:PracticeStateMap,id:string){return Math.max(0,...rowsFor(states,id).map(r=>r.lastSeen));}
function score(concept:KnowledgeConcept,states:PracticeStateMap,now:number){
 const rows=rowsFor(states,concept.id);
 if(!rows.length)return 35;
 const latest=rows.reduce((a,b)=>a.lastSeen>b.lastSeen?a:b);
 if(now-latest.lastSeen<10*60*1000)return -100; // no immediate daily-round loop
 const due=Math.min(...rows.map(r=>r.nextReview));
 if(due>now)return -100;
 const mistakes=rows.reduce((sum,r)=>sum+(r.streak===0?Math.min(3,r.misses):0),0);
 const contrast=grammarContrasts.find(group=>group.some(id=>'grammar:'+id===concept.id))||[];
 const contrastTrouble=contrast.some(id=>rowsFor(states,'grammar:'+id).some(r=>r.streak===0&&r.misses>0&&r.lastSeen>now-7*86400000));
 return (due<=now?65+Math.min(30,(now-due)/86400000):0)+mistakes*12+(contrastTrouble?12:0)+Math.min(15,(now-latest.lastSeen)/86400000);
}
const normalize=(value:string)=>value.normalize('NFKC').replace(/[\s，。！？、,.!?;；:：'"“”‘’（）()]/g,'');
export const knowledgeAnswerCorrect=(task:KnowledgeTask,answer:string)=>task.accepted.some(a=>normalize(a)===normalize(answer));
function taskFor(concept:KnowledgeConcept,completed:Set<string>,states:PracticeStateMap,seed:string):KnowledgeTask|undefined{
 const introduce=attempts(states,concept.id)===0;
 if(concept.kind==='family'){
  const family=characterFamilies.find(f=>'family:'+f.id===concept.id)!;
  const row=states[key(concept.id,'recognition')];
  const write=Boolean(row&&row.streak>=2&&row.strength>=0.4);
  const members=shuffled(family.members,seed);
  const answer=write?members[0]:family.answer;
  return {concept,exampleId:'family:'+family.id+':'+answer,format:write?'write':'choice',prompt:write?'Write the character meaning “'+characters[answer].meaning+'” ('+characters[answer].pinyin+').':family.prompt,answer,accepted:[answer],options:members,pinyin:characters[answer].pinyin,explanation:family.explanation,introduce};
 }
 const examples=shuffled(examplesForKnowledge(concept,completed),seed).sort((a,b)=>latestSeen(states,concept.id+':example:'+a.id)-latestSeen(states,concept.id+':example:'+b.id));
 const link=usageLinks.find(u=>'usage:'+u.id===concept.id);
 const retrieval=states[key(concept.id,'sentence')];
 const cloze=link?.cloze?.find(c=>examples.some(e=>e.id===c.phraseId)&&(retrieval?.streak||0)>=2);
 if(cloze){
  const p=phrases[cloze.phraseId];
  return {concept,exampleId:cloze.phraseId,format:'cloze',prompt:p.text.replace(cloze.target,'＿＿')+'\n'+p.meaning,answer:cloze.answers[0],accepted:cloze.answers,pinyin:p.pinyin,explanation:concept.explanation,introduce};
 }
 // Reconstruct only clean, multi-token taught text. No invented distractors,
 // contextual instructions, or one-tile "sentences" enter this pool.
 const example=examples.find(p=>p.tokens.length>1&&normalize(p.tokens.join(''))===normalize(p.text));
 if(!example){
  if(concept.id==='usage:gen-recipient'&&examples.length)return {concept,exampleId:'u48-gen-recipient',format:'choice',prompt:'In 跟老師說, what does 跟 tell you?',answer:'Who is being spoken to',accepted:['Who is being spoken to'],options:['Who is being spoken to','Who accompanies the speaker'],pinyin:phrases['u48-gen-recipient'].pinyin,explanation:concept.explanation,introduce};
  return undefined;
 }
 return {concept,exampleId:example.id,format:'order',prompt:example.meaning,answer:example.text,accepted:[example.text,...(example.acceptedTokenOrders||[]).map(tokens=>tokens.join(''))],tokens:example.tokens,pinyin:example.pinyin,explanation:example.note||concept.explanation,introduce};
}
export function knowledgeQuestions(completed:Set<string>,states:PracticeStateMap,seed:string,count=3,now=Date.now(),sessionKind:PracticeSessionKind='daily'):PracticeQuestion[]{
 const available=shuffled(availableKnowledge(completed),seed).filter(c=>score(c,states,now)>=0).sort((a,b)=>score(b,states,now)-score(a,states,now));
 const picked:KnowledgeTask[]=[];const texts=new Set<string>();
 const add=(concept:KnowledgeConcept)=>{
  if(picked.length>=count||picked.some(t=>t.concept.id===concept.id))return;
  const task=taskFor(concept,completed,states,seed+concept.id);
  if(!task||texts.has(normalize(task.answer)))return;
  picked.push(task);texts.add(normalize(task.answer));
 };
 // Balance the three relationships, without forcing unavailable material.
 for(const kind of ['grammar','usage','family'] as const){const c=available.find(c=>c.kind===kind&&taskFor(c,completed,states,seed+c.id));if(c)add(c);}
 for(const c of available)add(c);
 return picked.map((task,i)=>{
  const mode:PracticeMode=task.format==='order'?'sentence':task.format==='cloze'?'context':task.format==='write'?'handwriting':'recognition';
  const lessonId=phraseLessons.get(task.exampleId)?.find(id=>completed.has(id))||task.concept.requiredLessons.find(id=>completed.has(id))||'';
  return {id:'knowledge:'+seed+':'+i,item:{id:task.concept.id,kind:task.concept.kind==='family'?'character':'phrase',traditional:task.answer,pinyin:task.pinyin,meaning:task.prompt,characters:Array.from(task.answer).filter(c=>Boolean(characters[c])),lessonId,tokens:task.tokens},mode,sessionKind,knowledge:task};
 });
}
export function interleaveKnowledge(base:PracticeQuestion[],completed:Set<string>,states:PracticeStateMap,seed:string,size=10,now=Date.now()):PracticeQuestion[]{
 const additions=knowledgeQuestions(completed,states,seed,Math.min(3,size),now,base[0]?.sessionKind||'daily');
 const answers=new Set(additions.map(q=>normalize(q.knowledge!.answer)));
 const remaining=base.filter(q=>!answers.has(normalize(q.item.traditional))).slice(0,size-additions.length);
 // Spread discoveries through the existing round, not three separate modes.
 additions.forEach((q,i)=>remaining.splice(Math.min(remaining.length,2+i*3),0,q));
 return remaining;
}
export function knowledgeAttemptTargets(step:Step,completed:Set<string>,lessonId?:string):{itemId:string;mode:PracticeMode}[]{
 if(!['select','listen','order','memory'].includes(step.type))return [];
 const ids=[...new Set([...(step.grammarIds||[]),...(step.phrase?phraseConceptGrammar(step.phrase):[])])];
 const current=lessonId?lessons.find(l=>l.id===lessonId):undefined;
 const index=current?.steps.findIndex(s=>s.id===step.id)??-1;
 const taughtHere=(id:string)=>index>0&&Boolean(current?.steps.slice(0,index).some(s=>s.type==='grammar'&&s.grammar===id));
 const targets=ids.filter(id=>taughtGrammar(id,completed)||taughtHere(id)).map(id=>({itemId:'grammar:'+id,mode:(step.type==='order'?'sentence':'recognition') as PracticeMode}));
 if(step.phrase){
  for(const c of knowledgeForPhrase(step.phrase,completed).filter(c=>c.kind==='usage'))targets.push({itemId:c.id,mode:step.type==='order'?'sentence':'recognition'});
 }
 return targets;
}

