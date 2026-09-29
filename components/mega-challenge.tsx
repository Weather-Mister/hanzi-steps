'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Check,RotateCcw,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {advanceMegaQueue,combineWordPerfect,makeMegaQueue,matchesMegaPinyin,restoreMegaWord,reverseMegaVocabulary} from '@/lib/mega-challenge';
import {learnedVocabulary,vocabularyLookup,type VocabularyLookupItem} from '@/lib/vocabulary-lookup';
import type {MegaMasteryController} from '@/lib/use-mega-mastery';
import {WritingPad} from './writing-pad';

type Result={item:VocabularyLookupItem;perfect:boolean};
const itemById=new Map(vocabularyLookup.map(item=>[item.id,item]));

export function MegaChallenge({
 open,onOpenChange,completed,theme,mastery,mode='handwriting',
}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;theme:string;mastery:MegaMasteryController;mode?:'handwriting'|'pinyin'}){
 const reverse=mode==='pinyin';
 const {loading:masteryLoading,saving,error}=mastery;
 const mastered=reverse?mastery.reverseMastered:mastery.mastered;
 const learned=useMemo(()=>reverse?reverseMegaVocabulary(completed):learnedVocabulary(completed),[completed,reverse]);
 const eligible=useMemo(()=>learned.filter(item=>!mastered.has(item.id)),[learned,mastered]);
 const masteredItems=useMemo(()=>vocabularyLookup.filter(item=>mastered.has(item.id)),[mastered]);
 const [queue,setQueue]=useState<string[]|null>(null);
 const knownLearned=useRef<Set<string>>(new Set());
 const [charIndex,setCharIndex]=useState(0);
 const [wordPerfect,setWordPerfect]=useState(true);
 const [result,setResult]=useState<Result|null>(null);
 const [view,setView]=useState<'challenge'|'mastered'>('challenge');
 const [gaveUp,setGaveUp]=useState(false);
 const [attempt,setAttempt]=useState(0);
 const [pinyinInput,setPinyinInput]=useState('');

 useEffect(()=>{
  if(!open||masteryLoading)return;
  const learnedIds=new Set(learned.map(item=>item.id));
  // Capture before updating the ref: React may defer the state updater.
  const fresh=eligible.filter(item=>!knownLearned.current.has(item.id));
  const seed=Date.now().toString(36)+Math.random().toString(36);
  setQueue(currentQueue=>{
   if(currentQueue===null){
    return makeMegaQueue(eligible,seed);
   }
   const queued=new Set(currentQueue);
   const additions=makeMegaQueue(fresh.filter(item=>!queued.has(item.id)),seed);
   if(!additions.length)return currentQueue;
   return [...currentQueue,...additions];
  });
  knownLearned.current=learnedIds;
 },[open,masteryLoading,eligible,learned]);

 const current=queue?.length?itemById.get(queue[0]):undefined;
 const currentChar=current?.characters[charIndex];

 function resetWord(){
  setAttempt(value=>value+1);
  setCharIndex(0);
  setWordPerfect(true);
  setResult(null);
  setGaveUp(false);
  setPinyinInput('');
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
  setQueue(makeMegaQueue(eligible,Date.now().toString(36)+Math.random().toString(36)));
  resetWord();
  setView('challenge');
 }

 function switchView(next:'challenge'|'mastered'){
  // Leaving the pad unmounts it. Restart the whole word, never a partly
  // completed word with its assistance history discarded.
  if(next!==view&&!result)resetWord();
  setView(next);
 }

 function giveUp(){
  if(result||gaveUp)return;
  setGaveUp(true);
  setWordPerfect(false);
  if(reverse&&current)setResult({item:current,perfect:false});
 }

 function checkPinyin(){
  if(!reverse||!current||result||!pinyinInput.trim())return;
  setResult({item:current,perfect:matchesMegaPinyin(pinyinInput,current.pinyin)});
 }

 function skipWord(){
  if(result||!current)return;
  setQueue(currentQueue=>currentQueue?advanceMegaQueue(currentQueue,false):currentQueue);
  resetWord();
 }

 async function markMastered(item:VocabularyLookupItem){
  const saved=await (reverse?mastery.setReverseMastered:mastery.setMastered)(item.id,true);
  if(!saved)return;
  setQueue(currentQueue=>currentQueue?.filter(id=>id!==item.id)??currentQueue);
  resetWord();
 }

 async function restore(item:VocabularyLookupItem){
  const saved=await (reverse?mastery.setReverseMastered:mastery.setMastered)(item.id,false);
  if(!saved)return;
  setQueue(currentQueue=>restoreMegaWord(currentQueue,item.id,new Set(learned.map(word=>word.id))));
 }

 function changeOpen(next:boolean){
  if(!next&&!result)resetWord();
  onOpenChange(next);
 }

 return <Dialog open={open} onOpenChange={changeOpen}>
  <DialogContent data-unit-theme={theme} className="mega-challenge-dialog">
   <div className="mega-title-row">
    <div><DialogTitle>{reverse?'Reverse Mega Challenge':'Mega Challenge'}</DialogTitle><DialogDescription>{reverse?'See the Traditional Chinese and type its pinyin. Tone marks, tone numbers, and toneless pinyin all count. A correct answer clears the word for this round; Mastered excludes it until you restore it.':'Write words from completed lessons using pinyin and meaning. First-pass recall clears a word for this round; Mastered excludes it until you restore it.'}</DialogDescription></div>
   </div>
   <div className="mega-tabs" role="group" aria-label="Mega Challenge sections">
    <button className={view==='challenge'?'selected':''} disabled={saving} onClick={()=>switchView('challenge')} aria-pressed={view==='challenge'}>Challenge</button>
    <button className={view==='mastered'?'selected':''} disabled={saving} onClick={()=>switchView('mastered')} aria-pressed={view==='mastered'}>Mastered <span>{masteredItems.length}</span></button>
   </div>

   {error&&<p className="mega-sync-note" role="status">{error}</p>}

   {view==='mastered'?<section className="mastered-list">
    {masteredItems.length===0?<p className="search-empty">Words you add to Mastered will appear here.</p>:
     masteredItems.map(item=><article className="mastered-card" key={item.id}>
      <div><strong lang="zh-Hant-TW">{item.traditional}</strong><span className="pinyin">{item.pinyin}</span><p>{item.meaning}</p>{item.bookNumber&&item.unitNumber&&<small>Book {item.bookNumber} · Unit {item.unitNumber}</small>}</div>
      <button className="secondary-button" disabled={saving} aria-label={'Restore '+item.traditional+' to the challenge'} onClick={()=>void restore(item)}>{saving?'Saving…':'Restore'}</button>
     </article>)}
   </section>:
   masteryLoading||queue===null?<p className="search-empty">Preparing your learned words…</p>:
   current&&(reverse||currentChar)?<section className={result?'mega-practice has-result':'mega-practice'}>
    {!result&&<div className="mega-session-meta" aria-label="Mega Challenge status">
     <span><strong>{queue.length}</strong> {queue.length===1?'word':'words'} in rotation</span>
     <span>{masteredItems.length} mastered</span>
    </div>}
    <div className="mega-prompt">
     {reverse?<p className="mega-reverse-hanzi" lang="zh-Hant-TW">{current.traditional}</p>:<p className="pinyin">{current.pinyin}</p>}
     <h2>{current.meaning}</h2>
     {!reverse&&!result&&<>
      <div className="mega-character-progress" aria-label={`Character ${charIndex+1} of ${current.characters.length}`}>
       {current.characters.map((_,index)=><span key={index} className={index<charIndex?'done':index===charIndex?'current':''}/>)}
      </div>
      <p className="mega-character-label">{`Character ${charIndex+1} of ${current.characters.length}`}</p>
     </>}
    </div>
    {reverse?(!result&&<form className="mega-pinyin-form" onSubmit={event=>{event.preventDefault();checkPinyin()}}>
     <label htmlFor="mega-pinyin-answer">Type the pinyin</label>
     <input id="mega-pinyin-answer" value={pinyinInput} onChange={event=>setPinyinInput(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} inputMode="text" placeholder="nǐ hǎo / ni3hao3 / nihao" />
     <button className="primary-button" type="submit" disabled={!pinyinInput.trim()}>Check answer</button>
    </form>):<WritingPad
     key={current.id+':'+attempt+':'+charIndex+':'+(gaveUp?'guided':'memory')}
     char={currentChar!}
     mode={gaveUp?'trace':'memory'}
     strict={!gaveUp}
     revealStrokeAfterMisses={gaveUp?undefined:5}
     completionDelayMs={900}
     onComplete={assisted=>finishCharacter(gaveUp||assisted)}
    />}
    {result?<div className={'mega-inline-result '+(result.perfect?'is-perfect':'is-retry')} role="status" aria-live="polite">
     <span className={'mega-result-icon '+(result.perfect?'perfect':'retry')}>{result.perfect?<Check size={22}/>:<RotateCcw size={21}/>}</span>
     <div className="mega-inline-copy">
      <span className="mega-result-kicker">{result.perfect?'Perfect recall':reverse?(gaveUp?'Answer revealed':'Try again later'):'Completed with support or corrections'}</span>
      <div><strong lang="zh-Hant-TW">{result.item.traditional}</strong><span className="pinyin">{result.item.pinyin}</span></div>
      <p>{result.perfect?(reverse?'Correct. The toned pinyin is shown above. Continue, or move it to Mastered.':'Correct without help. Continue, or move it to Mastered.'):'This word will stay in rotation unless you move it to Mastered.'}</p>
     </div>
     <div className="mega-result-actions">
      <button className="primary-button" disabled={saving} onClick={continueAfterResult}>Continue</button>
      <button className="secondary-button mega-master-button" disabled={saving} onClick={()=>void markMastered(result.item)}><Check size={16}/>{saving?'Saving…':'Add to Mastered'}</button>
     </div>
    </div>:
    <div className="mega-give-up-row">
     <button className="text-button mega-skip-button" onClick={skipWord}>Skip word</button>
     {gaveUp?<span className="mega-guides-on" role="status">All guides are on.</span>:
      <button className="text-button mega-give-up-button" onClick={giveUp}>{reverse?'Give up · show pinyin':'Give up · show all guides'}</button>}
    </div>}
   </section>:
   eligible.length>0?<section className="mega-complete">
    <Trophy size={42}/>
    <h2>{reverse?'Reverse Mega Challenge complete':'Mega Challenge complete'}</h2>
    <p>No words remain in this round. Words recalled perfectly are cleared for the round; words in Mastered stay excluded.</p>
    <button className="primary-button" onClick={practiceAgain}>Practice again</button>
   </section>:
   learned.length>0?<section className="mega-complete">
    <h2>No words in rotation</h2>
    <p>All of your currently learned words are in Mastered.</p>
    <button className="secondary-button" onClick={()=>switchView('mastered')}>Open Mastered</button>
   </section>:
   <section className="mega-complete"><h2>Complete a lesson first</h2><p>{reverse?'Reverse Mega Challenge':'Mega Challenge'} only uses vocabulary you have already studied.</p></section>}
  </DialogContent>
 </Dialog>;
}
