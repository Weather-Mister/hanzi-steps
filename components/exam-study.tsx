'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowLeft,Check,GraduationCap,RotateCcw,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {advanceMegaQueue,combineWordPerfect,makeMegaQueue,restoreMegaWord} from '@/lib/mega-challenge';
import {examStudyItems,examStudySets} from '@/lib/exam-study';
import type {VocabularyLookupItem} from '@/lib/vocabulary-lookup';
import {WritingPad} from './writing-pad';

type Result={item:VocabularyLookupItem;perfect:boolean};
type View='challenge'|'mastered';
type StoredMastery={savedAt:number;ids:string[]};

const MASTERED_STORAGE_PREFIX='hanzi-steps:exam-study:mastered:v1:';
const MASTERED_TTL_MS=7*24*60*60*1000;

function storageKey(setId:number){
 return MASTERED_STORAGE_PREFIX+setId;
}

function loadMastered(setId:number,items:VocabularyLookupItem[]):Set<string>{
 if(typeof window==='undefined')return new Set();
 try{
  const raw=localStorage.getItem(storageKey(setId));
  if(!raw)return new Set();
  const parsed=JSON.parse(raw) as StoredMastery;
  if(!parsed||!Array.isArray(parsed.ids)||typeof parsed.savedAt!=='number'){
   localStorage.removeItem(storageKey(setId));
   return new Set();
  }
  if(Date.now()-parsed.savedAt>MASTERED_TTL_MS){
   localStorage.removeItem(storageKey(setId));
   return new Set();
  }
  const valid=new Set(items.map(item=>item.id));
  return new Set(parsed.ids.filter(id=>valid.has(id)));
 }catch{
  return new Set();
 }
}

function saveMastered(setId:number,ids:Set<string>){
 if(typeof window==='undefined')return;
 try{
  localStorage.setItem(storageKey(setId),JSON.stringify({savedAt:Date.now(),ids:[...ids]} satisfies StoredMastery));
 }catch{}
}

export function ExamStudy({
 open,onOpenChange,theme,
}:{open:boolean;onOpenChange:(open:boolean)=>void;theme:string}){
 const [selectedId,setSelectedId]=useState<number|null>(null);
 const activeSet=examStudySets.find(set=>set.id===selectedId);
 const items=useMemo(()=>activeSet?examStudyItems(activeSet):[],[activeSet]);
 const itemById=useMemo(()=>new Map(items.map(item=>[item.id,item])),[items]);
 const [queue,setQueue]=useState<string[]|null>(null);
 const [mastered,setMastered]=useState<Set<string>>(new Set());
 const [view,setView]=useState<View>('challenge');
 const [charIndex,setCharIndex]=useState(0);
 const [wordPerfect,setWordPerfect]=useState(true);
 const [result,setResult]=useState<Result|null>(null);
 const [gaveUp,setGaveUp]=useState(false);
 const [attempt,setAttempt]=useState(0);

 const masteredItems=useMemo(()=>items.filter(item=>mastered.has(item.id)),[items,mastered]);
 const eligibleItems=useMemo(()=>items.filter(item=>!mastered.has(item.id)),[items,mastered]);

 useEffect(()=>{
  if(!open||!activeSet){
   setQueue(null);
   setMastered(new Set());
   setView('challenge');
   return;
  }
  const stored=loadMastered(activeSet.id,items);
  setMastered(stored);
  setQueue(makeMegaQueue(items.filter(item=>!stored.has(item.id)),Date.now().toString(36)+Math.random().toString(36)));
  setView('challenge');
  setCharIndex(0);
  setWordPerfect(true);
  setResult(null);
  setGaveUp(false);
  setAttempt(value=>value+1);
 },[open,activeSet,items]);

 const current=queue?.length?itemById.get(queue[0]):undefined;
 const currentChar=current?.characters[charIndex];

 // Never carry guided/give-up state into a different character or word.
 // This is deliberately defensive because Exam Study advances words and
 // characters without saving a session object anywhere.
 useEffect(()=>{
  setGaveUp(false);
 },[current?.id,charIndex]);

 function resetWord(){
  setAttempt(value=>value+1);
  setCharIndex(0);
  setWordPerfect(true);
  setResult(null);
  setGaveUp(false);
 }

 function finishCharacter(assisted:boolean){
  if(!current||result)return;
  const perfect=combineWordPerfect(wordPerfect,assisted);
  if(charIndex+1<current.characters.length){
   setWordPerfect(perfect);
   setGaveUp(false);
   setCharIndex(index=>index+1);
   return;
  }
  setResult({item:current,perfect});
 }

 function continueAfterResult(){
  if(!result)return;
  setQueue(currentQueue=>currentQueue?advanceMegaQueue(currentQueue,result.perfect):currentQueue);
  resetWord();
 }

 function practiceAgain(){
  setQueue(makeMegaQueue(eligibleItems,Date.now().toString(36)+Math.random().toString(36)));
  resetWord();
  setView('challenge');
 }

 function giveUp(){
  if(result||gaveUp)return;
  setGaveUp(true);
  setWordPerfect(false);
 }

 function skipWord(){
  if(result||!current)return;
  setQueue(currentQueue=>currentQueue?advanceMegaQueue(currentQueue,false):currentQueue);
  resetWord();
 }

 function switchView(next:View){
  if(next!==view&&!result)resetWord();
  setView(next);
 }

 function markMastered(item:VocabularyLookupItem){
  if(!activeSet)return;
  const next=new Set(mastered);
  next.add(item.id);
  setMastered(next);
  saveMastered(activeSet.id,next);
  // Remove the mastered word first, then hard-reset the next prompt to
  // character 1 in memory mode. Nothing from the finished word can leak over.
  setQueue(currentQueue=>currentQueue?.filter(id=>id!==item.id)??currentQueue);
  setCharIndex(0);
  setWordPerfect(true);
  setResult(null);
  setGaveUp(false);
  setAttempt(value=>value+1);
 }

 function restore(item:VocabularyLookupItem){
  if(!activeSet)return;
  const next=new Set(mastered);
  next.delete(item.id);
  setMastered(next);
  saveMastered(activeSet.id,next);
  setQueue(currentQueue=>restoreMegaWord(currentQueue,item.id,new Set(items.map(word=>word.id))));
 }

 function backToLists(){
  resetWord();
  setQueue(null);
  setMastered(new Set());
  setView('challenge');
  setSelectedId(null);
 }

 function changeOpen(next:boolean){
  if(!next){
   resetWord();
   setQueue(null);
   setMastered(new Set());
   setView('challenge');
   setSelectedId(null);
  }
  onOpenChange(next);
 }

 return <Dialog open={open} onOpenChange={changeOpen}>
  <DialogContent data-unit-theme={theme} className="mega-challenge-dialog exam-study-dialog">
   {!activeSet?<>
    <div className="mega-title-row">
     <div><DialogTitle>Exam Study</DialogTitle><DialogDescription>Homework practice isolated from your real Hanzi Steps progress.</DialogDescription></div>
    </div>
    <div className="exam-study-privacy"><GraduationCap size={19}/><div><strong>Off the record</strong><p>Attempts, results, streaks, counters, studied words, lessons, and normal mastery are never saved here. The only exception is each exam list’s own Mastered checklist, kept locally on this device for 7 days so you can track the week.</p></div></div>
    {examStudySets.length?<div className="exam-study-list" aria-label="Exam study lists">
     {examStudySets.map(set=><button key={set.id} className="exam-study-list-card" onClick={()=>setSelectedId(set.id)}>
      <span>{set.id}</span><div><strong>{set.title||`List ${set.id}`}</strong><small>{set.words.length} {set.words.length===1?'word':'words'} · separate mastery</small></div>
     </button>)}
    </div>:<section className="mega-complete exam-study-empty"><GraduationCap size={38}/><h2>No exam lists yet</h2><p>Send the first word list and it will appear here as <strong>1</strong>. Later lists will be added as 2, 3, and so on.</p></section>}
   </>:
   <>
    <div className="exam-study-session-head">
     <button className="icon-button" aria-label="Back to exam study lists" onClick={backToLists}><ArrowLeft size={20}/></button>
     <div><DialogTitle>Exam Study · {activeSet.id}</DialogTitle><DialogDescription>{activeSet.title||`List ${activeSet.id}`} · its Mastered list is separate from every other exam list and from Hanzi Steps mastery.</DialogDescription></div>
    </div>
    <div className="mega-tabs" role="group" aria-label={`Exam Study ${activeSet.id} sections`}>
     <button className={view==='challenge'?'selected':''} onClick={()=>switchView('challenge')} aria-pressed={view==='challenge'}>Challenge</button>
     <button className={view==='mastered'?'selected':''} onClick={()=>switchView('mastered')} aria-pressed={view==='mastered'}>Mastered <span>{masteredItems.length}</span></button>
    </div>
    {view==='mastered'?<section className="mastered-list">
     {masteredItems.length===0?<p className="search-empty">Words you mark Mastered in this exam list will appear here for 7 days on this device.</p>:
      masteredItems.map(item=><article className="mastered-card" key={item.id}>
       <div><strong lang="zh-Hant-TW">{item.traditional}</strong><span className="pinyin">{item.pinyin}</span><p>{item.meaning}</p></div>
       <button className="secondary-button" aria-label={'Restore '+item.traditional+' to Exam Study '+activeSet.id} onClick={()=>restore(item)}>Restore</button>
      </article>)}
    </section>:
    queue===null?<p className="search-empty">Preparing this list…</p>:
    current&&currentChar?<section className={result?'mega-practice has-result':'mega-practice'}>
     {!result&&<div className="mega-session-meta" aria-label="Exam Study status"><span><strong>{queue.length}</strong> {queue.length===1?'word':'words'} in rotation</span><span>{masteredItems.length} mastered for this list</span></div>}
     <div className="mega-prompt">
      <p className="pinyin">{current.pinyin}</p>
      <h2>{current.meaning}</h2>
      {!result&&<>
       <div className="mega-character-progress" aria-label={`Character ${charIndex+1} of ${current.characters.length}`}>
        {current.characters.map((_,index)=><span key={index} className={index<charIndex?'done':index===charIndex?'current':''}/>)}
       </div>
       <p className="mega-character-label">{`Character ${charIndex+1} of ${current.characters.length}`}</p>
      </>}
     </div>
     <WritingPad
      key={current.id+':'+attempt+':'+charIndex+':'+(gaveUp?'guided':'memory')}
      char={currentChar}
      mode={gaveUp?'trace':'memory'}
      strict={!gaveUp}
      revealStrokeAfterMisses={gaveUp?undefined:5}
      completionDelayMs={900}
      onComplete={assisted=>finishCharacter(gaveUp||assisted)}
     />
     {result?<div className={'mega-inline-result '+(result.perfect?'is-perfect':'is-retry')} role="status" aria-live="polite">
      <span className={'mega-result-icon '+(result.perfect?'perfect':'retry')}>{result.perfect?<Check size={22}/>:<RotateCcw size={21}/>}</span>
      <div className="mega-inline-copy">
       <span className="mega-result-kicker">{result.perfect?'Perfect recall':'Completed with support or corrections'}</span>
       <div><strong lang="zh-Hant-TW">{result.item.traditional}</strong><span className="pinyin">{result.item.pinyin}</span></div>
       <p>{result.perfect?'Correct without help. Continue the round or mark it Mastered for this exam list.':'This word stays in this temporary rotation unless you mark it Mastered for this exam list.'}</p>
      </div>
      <div className="mega-result-actions">
       <button className="primary-button" onClick={continueAfterResult}>Continue</button>
       <button className="secondary-button mega-master-button" onClick={()=>markMastered(result.item)}><Check size={16}/>Add to Mastered</button>
      </div>
     </div>:
     <div className="mega-give-up-row">
      <button className="text-button mega-skip-button" onClick={skipWord}>Skip word</button>
      {gaveUp?<span className="mega-guides-on" role="status">All guides are on.</span>:<button className="text-button mega-give-up-button" onClick={giveUp}>Give up · show all guides</button>}
     </div>}
    </section>:
    eligibleItems.length>0?<section className="mega-complete">
     <Trophy size={42}/>
     <h2>Exam round complete</h2>
     <p>Every non-mastered word was recalled cleanly in this round. The round itself was not saved.</p>
     <div className="exam-study-complete-actions"><button className="primary-button" onClick={practiceAgain}>Practice again</button><button className="secondary-button" onClick={()=>switchView('mastered')}>Open Mastered</button></div>
    </section>:
    items.length>0?<section className="mega-complete">
     <Check size={42}/>
     <h2>Everything is Mastered</h2>
     <p>All words in Exam Study {activeSet.id} are in this list’s separate weekly Mastered section.</p>
     <button className="secondary-button" onClick={()=>switchView('mastered')}>Open Mastered</button>
    </section>:
    <section className="mega-complete"><h2>This list is empty</h2><p>Add words to this exam list before starting it.</p><button className="secondary-button" onClick={backToLists}>Back to lists</button></section>}
   </>}
  </DialogContent>
 </Dialog>;
}
