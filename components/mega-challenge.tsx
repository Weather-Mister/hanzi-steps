'use client';
import {useEffect,useMemo,useState} from 'react';
import {Check,RotateCcw,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {advanceMegaQueue,combineWordPerfect,eligibleMegaVocabulary,makeMegaQueue} from '@/lib/mega-challenge';
import {learnedVocabulary,vocabularyLookup,type VocabularyLookupItem} from '@/lib/vocabulary-lookup';
import {useMegaMastery} from '@/lib/use-mega-mastery';
import {WritingPad} from './writing-pad';

type Result={item:VocabularyLookupItem;perfect:boolean};

export function MegaChallenge({
 open,onOpenChange,completed,userKey,theme,
}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;userKey:string;theme:string}){
 const {mastered,loading:masteryLoading,saving,error,setMastered}=useMegaMastery(userKey);
 const learned=useMemo(()=>learnedVocabulary(completed),[completed]);
 const eligible=useMemo(()=>eligibleMegaVocabulary(completed,mastered),[completed,mastered]);
 const itemById=useMemo(()=>new Map(vocabularyLookup.map(item=>[item.id,item])),[]);
 const masteredItems=useMemo(()=>vocabularyLookup.filter(item=>mastered.has(item.id)),[mastered]);
 const learnedKey=learned.map(item=>item.id).join('|');
 const [queue,setQueue]=useState<string[]|null>(null);
 const [knownLearned,setKnownLearned]=useState<Set<string>>(new Set());
 const [charIndex,setCharIndex]=useState(0);
 const [wordPerfect,setWordPerfect]=useState(true);
 const [result,setResult]=useState<Result|null>(null);
 const [view,setView]=useState<'challenge'|'mastered'>('challenge');
 const [confirmItem,setConfirmItem]=useState<VocabularyLookupItem|null>(null);

 useEffect(()=>{
  if(!open||masteryLoading)return;
  if(queue===null){
   setQueue(makeMegaQueue(eligible,Date.now().toString(36)+Math.random().toString(36)));
   setKnownLearned(new Set(learned.map(item=>item.id)));
   return;
  }
  const fresh=eligible.filter(item=>!knownLearned.has(item.id));
  if(fresh.length){
   const additions=makeMegaQueue(fresh,Date.now().toString(36)+Math.random().toString(36));
   setQueue(current=>current?[...current,...additions]:additions);
  }
  setKnownLearned(new Set(learned.map(item=>item.id)));
 },[open,masteryLoading,learnedKey]);

 const current=queue?.length?itemById.get(queue[0]):undefined;
 const currentChar=current?.characters[charIndex];

 function resetWord(){
  setCharIndex(0);
  setWordPerfect(true);
  setResult(null);
  setConfirmItem(null);
 }

 function finishCharacter(assisted:boolean){
  if(!current)return;
  const perfect=combineWordPerfect(wordPerfect,assisted);
  if(charIndex+1<current.characters.length){
   setWordPerfect(perfect);
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
  setQueue(makeMegaQueue(eligible,Date.now().toString(36)+Math.random().toString(36)));
  resetWord();
  setView('challenge');
 }

 function switchView(next:'challenge'|'mastered'){
  setConfirmItem(null);
  setView(next);
 }

 async function markMastered(item:VocabularyLookupItem){
  const saved=await setMastered(item.id,true);
  if(!saved)return;
  setQueue(currentQueue=>currentQueue?.filter(id=>id!==item.id)??currentQueue);
  resetWord();
 }

 async function restore(item:VocabularyLookupItem){
  const saved=await setMastered(item.id,false);
  if(!saved)return;
  setQueue(currentQueue=>{
   if(currentQueue===null)return currentQueue;
   if(currentQueue.includes(item.id))return currentQueue;
   return [...currentQueue,item.id];
  });
 }

 return <Dialog open={open} onOpenChange={nextOpen=>{if(!nextOpen)setConfirmItem(null);onOpenChange(nextOpen)}}>
  <DialogContent data-unit-theme={theme} className="mega-challenge-dialog">
   <div className="mega-title-row">
    <div><DialogTitle>Mega Challenge</DialogTitle><DialogDescription>Recall learned words from pinyin and meaning alone.</DialogDescription></div>
    <Trophy size={28}/>
   </div>
   <div className="mega-tabs" role="tablist" aria-label="Mega Challenge sections">
    <button className={view==='challenge'?'selected':''} onClick={()=>switchView('challenge')} role="tab" aria-selected={view==='challenge'}>Challenge</button>
    <button className={view==='mastered'?'selected':''} onClick={()=>switchView('mastered')} role="tab" aria-selected={view==='mastered'}>Mastered <span>{masteredItems.length}</span></button>
   </div>

   {error&&<p className="mega-sync-note" role="status">{error}</p>}

   {view==='mastered'?<section className="mastered-list">
    {masteredItems.length===0?<p className="search-empty">Words you move to Mastered will appear here.</p>:
     masteredItems.map(item=><article className="mastered-card" key={item.id}>
      <div><strong lang="zh-Hant-TW">{item.traditional}</strong><span className="pinyin">{item.pinyin}</span><p>{item.meaning}</p></div>
      <button className="secondary-button" disabled={saving} onClick={()=>void restore(item)}>{saving?'Saving…':'Restore to challenge'}</button>
     </article>)}
   </section>:
   masteryLoading||queue===null?<p className="search-empty">Preparing your learned words…</p>:
   current&&currentChar?<section className="mega-practice">
    <div className="mega-session-meta" aria-label="Mega Challenge status">
     <span><strong>{queue.length}</strong> {queue.length===1?'word':'words'} in rotation</span>
     <span>{masteredItems.length} mastered</span>
    </div>
    <div className="mega-prompt">
     <p className="pinyin">{current.pinyin}</p>
     <h2>{current.meaning}</h2>
     <div className="mega-character-progress" aria-label={`Character ${charIndex+1} of ${current.characters.length}`}>
      {current.characters.map((_,index)=><span key={index} className={index<charIndex||result&&index===charIndex?'done':index===charIndex?'current':''}/>)}
     </div>
     <p className="mega-character-label">{result?'Word complete':`Character ${charIndex+1} of ${current.characters.length}`}</p>
    </div>
    <WritingPad key={current.id+':'+charIndex} char={currentChar} mode="memory" strict revealStrokeAfterMisses={5} completionDelayMs={900} onComplete={finishCharacter}/>
    {result?<><div className={'mega-inline-result '+(result.perfect?'is-perfect':'is-retry')} role="status" aria-live="polite">
     <span className={'mega-result-icon '+(result.perfect?'perfect':'retry')}>{result.perfect?<Check size={22}/>:<RotateCcw size={21}/>}</span>
     <div className="mega-inline-copy">
      <div><strong lang="zh-Hant-TW">{result.item.traditional}</strong><span className="pinyin">{result.item.pinyin}</span></div>
      <p>{result.perfect?'Perfect first pass. Cleared for this cycle.':'Finished with help. This word will return later.'}</p>
     </div>
     <div className="mega-result-actions">
      <button className="primary-button" onClick={continueAfterResult}>Continue</button>
      {result.perfect&&!confirmItem&&<button className="text-button mega-know-button" disabled={saving} onClick={()=>setConfirmItem(result.item)}>I already know this</button>}
     </div>
    </div>
    {result.perfect&&confirmItem&&<div className="mega-master-confirm" role="group" aria-label="Move word to Mastered">
     <div>
      <strong>Move <span lang="zh-Hant-TW">{confirmItem.traditional}</span> to Mastered?</strong>
      <p>It will stay out of Mega Challenge until you restore it.</p>
     </div>
     <div className="mega-master-confirm-actions">
      <button className="text-button" disabled={saving} onClick={()=>setConfirmItem(null)}>Cancel</button>
      <button className="secondary-button" disabled={saving} onClick={()=>void markMastered(confirmItem)}>{saving?'Saving…':'Move to Mastered'}</button>
     </div>
    </div>}</>:
    confirmItem?<div className="mega-master-confirm" role="group" aria-label="Move word to Mastered">
     <div>
      <strong>Move <span lang="zh-Hant-TW">{confirmItem.traditional}</span> to Mastered?</strong>
      <p>It will stay out of Mega Challenge until you restore it.</p>
     </div>
     <div className="mega-master-confirm-actions">
      <button className="text-button" disabled={saving} onClick={()=>setConfirmItem(null)}>Cancel</button>
      <button className="secondary-button" disabled={saving} onClick={()=>void markMastered(confirmItem)}>{saving?'Saving…':'Move to Mastered'}</button>
     </div>
    </div>:
    <button className="text-button mega-know-button" onClick={()=>setConfirmItem(current)}>I already know this</button>}
   </section>:
   eligible.length>0?<section className="mega-complete">
    <Trophy size={42}/>
    <h2>Mega Challenge complete</h2>
    <p>You cleared all currently available words perfectly.</p>
    <button className="primary-button" onClick={practiceAgain}>Practice again</button>
   </section>:
   learned.length>0?<section className="mega-complete">
    <h2>No words in rotation</h2>
    <p>All of your currently learned words are in Mastered.</p>
    <button className="secondary-button" onClick={()=>switchView('mastered')}>Open Mastered</button>
   </section>:
   <section className="mega-complete"><h2>Complete a lesson first</h2><p>Mega Challenge only uses vocabulary you have already studied.</p></section>}
  </DialogContent>
 </Dialog>;
}
