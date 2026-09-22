'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowLeft,Check,GraduationCap,RotateCcw,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {advanceMegaQueue,combineWordPerfect,makeMegaQueue} from '@/lib/mega-challenge';
import {examStudyItems,examStudySets} from '@/lib/exam-study';
import type {VocabularyLookupItem} from '@/lib/vocabulary-lookup';
import {WritingPad} from './writing-pad';

type Result={item:VocabularyLookupItem;perfect:boolean};

export function ExamStudy({
 open,onOpenChange,theme,
}:{open:boolean;onOpenChange:(open:boolean)=>void;theme:string}){
 const [selectedId,setSelectedId]=useState<number|null>(null);
 const activeSet=examStudySets.find(set=>set.id===selectedId);
 const items=useMemo(()=>activeSet?examStudyItems(activeSet):[],[activeSet]);
 const itemById=useMemo(()=>new Map(items.map(item=>[item.id,item])),[items]);
 const [queue,setQueue]=useState<string[]|null>(null);
 const [charIndex,setCharIndex]=useState(0);
 const [wordPerfect,setWordPerfect]=useState(true);
 const [result,setResult]=useState<Result|null>(null);
 const [gaveUp,setGaveUp]=useState(false);
 const [attempt,setAttempt]=useState(0);

 useEffect(()=>{
  if(!open||!activeSet){setQueue(null);return}
  setQueue(makeMegaQueue(items,Date.now().toString(36)+Math.random().toString(36)));
  setCharIndex(0);setWordPerfect(true);setResult(null);setGaveUp(false);setAttempt(value=>value+1);
 },[open,activeSet,items]);

 const current=queue?.length?itemById.get(queue[0]):undefined;
 const currentChar=current?.characters[charIndex];

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
  setQueue(makeMegaQueue(items,Date.now().toString(36)+Math.random().toString(36)));
  resetWord();
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

 function backToLists(){
  resetWord();
  setQueue(null);
  setSelectedId(null);
 }

 function changeOpen(next:boolean){
  if(!next){
   resetWord();
   setQueue(null);
   setSelectedId(null);
  }
  onOpenChange(next);
 }

 return <Dialog open={open} onOpenChange={changeOpen}>
  <DialogContent data-unit-theme={theme} className="mega-challenge-dialog exam-study-dialog">
   {!activeSet?<>
    <div className="mega-title-row">
     <div><DialogTitle>Exam Study</DialogTitle><DialogDescription>Temporary homework practice. Nothing here changes your streak, counters, studied words, mastery, lessons, or saved progress.</DialogDescription></div>
    </div>
    <div className="exam-study-privacy"><GraduationCap size={19}/><div><strong>Off the record</strong><p>Exam Study runs only in this open session. Closing it clears the round; no results or attempts are saved anywhere.</p></div></div>
    {examStudySets.length?<div className="exam-study-list" aria-label="Exam study lists">
     {examStudySets.map(set=><button key={set.id} className="exam-study-list-card" onClick={()=>setSelectedId(set.id)}>
      <span>{set.id}</span><div><strong>{set.title||`List ${set.id}`}</strong><small>{set.words.length} {set.words.length===1?'word':'words'}</small></div>
     </button>)}
    </div>:<section className="mega-complete exam-study-empty"><GraduationCap size={38}/><h2>No exam lists yet</h2><p>Send the first word list and it will appear here as <strong>1</strong>. Later lists will be added as 2, 3, and so on.</p></section>}
   </>:
   <>
    <div className="exam-study-session-head">
     <button className="icon-button" aria-label="Back to exam study lists" onClick={backToLists}><ArrowLeft size={20}/></button>
     <div><DialogTitle>Exam Study · {activeSet.id}</DialogTitle><DialogDescription>{activeSet.title||`List ${activeSet.id}`} · Mega Challenge handwriting rules, temporary session only.</DialogDescription></div>
    </div>
    {queue===null?<p className="search-empty">Preparing this list…</p>:
    current&&currentChar?<section className={result?'mega-practice has-result':'mega-practice'}>
     {!result&&<div className="mega-session-meta" aria-label="Exam Study status"><span><strong>{queue.length}</strong> {queue.length===1?'word':'words'} in rotation</span><span>not recorded</span></div>}
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
       <p>{result.perfect?'Correct without help. This word is cleared for this temporary round.':'This word stays in this temporary rotation until you recall it cleanly.'}</p>
      </div>
      <div className="mega-result-actions"><button className="primary-button" onClick={continueAfterResult}>Continue</button></div>
     </div>:
     <div className="mega-give-up-row">
      <button className="text-button mega-skip-button" onClick={skipWord}>Skip word</button>
      {gaveUp?<span className="mega-guides-on" role="status">All guides are on.</span>:<button className="text-button mega-give-up-button" onClick={giveUp}>Give up · show all guides</button>}
     </div>}
    </section>:
    items.length?<section className="mega-complete">
     <Trophy size={42}/>
     <h2>Exam list complete</h2>
     <p>Every word was recalled cleanly in this round. Nothing from the round was saved or added to Hanzi Steps progress.</p>
     <div className="exam-study-complete-actions"><button className="primary-button" onClick={practiceAgain}>Practice again</button><button className="secondary-button" onClick={backToLists}>Back to lists</button></div>
    </section>:
    <section className="mega-complete"><h2>This list is empty</h2><p>Add words to this exam list before starting it.</p><button className="secondary-button" onClick={backToLists}>Back to lists</button></section>}
   </>}
  </DialogContent>
 </Dialog>;
}
