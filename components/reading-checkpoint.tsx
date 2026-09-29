'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,Eye,EyeOff,Lock,RotateCcw,X} from 'lucide-react';
import {Popover,PopoverContent,PopoverTrigger} from './ui/popover';
import {KnowledgeNotes} from './knowledge-notes';
import {knowledgeForReading} from '@/lib/cumulative-knowledge';
import {characters} from '@/lib/curriculum';
import {freshReadingProgress,readReadingProgress,readingScore,readingStorageKey,tokenizeReading,type ReadingCheckpoint as Reading,type ReadingProgress,type ReadingToken} from '@/lib/reading-checkpoints';

export function ReadingStage({reading,available,userKey,onStart}:{reading:Reading;available:boolean;userKey:string;onStart:()=>void}){
 const [phase,setPhase]=useState('read');
 useEffect(()=>{try{setPhase(readReadingProgress(localStorage,userKey,reading).phase)}catch{}},[reading,userKey]);
 return <section className="reading-stage" aria-label="Reading checkpoint">
  <span className="reading-stage-icon"><BookOpen size={25}/></span><div><p className="eyebrow">EXTRA STAGE · READING {phase==='review'&&'· COMPLETE'}</p><h3>{reading.title}</h3><p>{reading.kind} · {reading.questions.length} comprehension questions</p><button className="text-button" disabled={!available} onClick={onStart}>{!available?<><Lock size={15}/>Finish the unit challenge to unlock</>:<>{phase==='review'?'Revisit reading':phase==='questions'?'Resume reading':'Start reading'}<ArrowRight size={17}/></>}</button></div>
 </section>;
}
function Word({token,onHelp}:{token:ReadingToken;onHelp:()=>void}){
 const [open,setOpen]=useState(false),[pinyin,setPinyin]=useState(false),[charHelp,setCharHelp]=useState<string|null>(null);
 if(!token.gloss)return <>{token.text}</>;
 const entry=charHelp?characters[charHelp]:token.gloss;
 return <Popover open={open} onOpenChange={value=>{setOpen(value);setPinyin(false);setCharHelp(null);if(value)onHelp()}}><PopoverTrigger asChild><button type="button" className={`reading-word ${token.gloss.unfamiliar?'reading-new-word':''}`} aria-label={`Explain ${token.text}${token.gloss.unfamiliar?' (new word)':''}`}>{token.text}</button></PopoverTrigger><PopoverContent className="reading-word-help" collisionPadding={16}>
  <div className="reading-help-heading"><strong lang="zh-Hant-TW">{charHelp||token.text}</strong><button className="icon-button" aria-label="Close word explanation" onClick={()=>setOpen(false)}><X size={18}/></button></div>
  {token.gloss.unfamiliar&&!charHelp&&<small>Extra word · help provided for this reading</small>}
  <p>{entry?.meaning}</p>{!charHelp&&token.gloss.note&&<p className="reading-help-note">{token.gloss.note}</p>}
  <button className="text-button" aria-expanded={pinyin} onClick={()=>setPinyin(!pinyin)}>{pinyin?'Hide pronunciation':'Reveal pronunciation'}</button>{pinyin&&<p className="pinyin">{entry?.pinyin}</p>}
  {token.text.length>1&&<div className="reading-character-help"><small>Inside the word</small><div>{[...new Set(Array.from(token.text))].filter(c=>characters[c]).map(c=><button key={c} lang="zh-Hant-TW" aria-label={`Explain character ${c}`} aria-pressed={charHelp===c} onClick={()=>{setCharHelp(charHelp===c?null:c);setPinyin(false)}}>{c}</button>)}</div>{charHelp&&<button className="text-button" onClick={()=>{setCharHelp(null);setPinyin(false)}}>Back to whole word</button>}</div>}
 </PopoverContent></Popover>;
}
export function ReadingCheckpoint({reading,userKey,onClose,completed}:{reading:Reading;userKey:string;completed:Set<string>;onClose:()=>void}){
 const [progress,setProgress]=useState<ReadingProgress>(()=>freshReadingProgress(reading));
 const [ready,setReady]=useState(false),[storageError,setStorageError]=useState(false),[showPinyin,setShowPinyin]=useState(false);
 const sectionRef=useRef<HTMLHeadingElement>(null);
 const pendingFocus=useRef(false);
 const tokens=useMemo(()=>reading.lines.map(line=>tokenizeReading(line.text,reading)),[reading]);
 useEffect(()=>{try{setProgress(readReadingProgress(localStorage,userKey,reading))}catch{setStorageError(true)}setReady(true)},[reading,userKey]);
 useEffect(()=>{if(pendingFocus.current){sectionRef.current?.focus();sectionRef.current?.scrollIntoView({block:'start',behavior:'instant'});pendingFocus.current=false}},[progress.phase]);
 function update(next:ReadingProgress){setProgress(next);try{localStorage.setItem(readingStorageKey(userKey,reading),JSON.stringify(next));setStorageError(false)}catch{setStorageError(true)}}
 function help(){if(!progress.usedHelp&&progress.phase!=='review')update({...progress,usedHelp:true})}
 const reviewed=progress.phase==='review';
 const answered=progress.answers.filter(a=>a!==null).length;
 const score=readingScore(reading,progress.answers);
 function changePhase(phase:ReadingProgress['phase']){pendingFocus.current=true;update({...progress,phase})}
 function retry(){setShowPinyin(false);pendingFocus.current=true;update(freshReadingProgress(reading));window.scrollTo({top:0,behavior:'instant'})}
 return <main className="reading-main">
  <button className="text-button reading-back" onClick={onClose}><ArrowLeft size={18}/>Back to the unit</button>
  <header className="reading-heading"><p className="eyebrow">READING CHECKPOINT · {reading.kind.toUpperCase()}</p><h1>{reading.title}</h1><p>{reading.setup}</p><div className="reading-flow" aria-label="Reading stages"><span aria-current={progress.phase==='read'?'step':undefined}>1 · Read</span><span aria-current={progress.phase==='questions'?'step':undefined}>2 · Understand</span><span aria-current={reviewed?'step':undefined}>3 · Unpack</span></div></header>
  {!ready?<p role="status">Opening your reading…</p>:<>
  <section className="reading-passage" aria-label="Chinese passage"><div className="reading-tools"><p>Tap any word for help. <span className="reading-new-word">Dotted words</span> are extra vocabulary.</p><button className="secondary-button" aria-pressed={showPinyin} onClick={()=>{setShowPinyin(!showPinyin);if(!showPinyin)help()}}>{showPinyin?<EyeOff size={17}/>:<Eye size={17}/>} {showPinyin?'Hide pinyin':'Reveal pinyin'}</button></div>
   {reading.lines.map((line,i)=><div className="reading-line" key={i} id={`${reading.id}-line-${i}`}><span className="reading-line-number" aria-label={`Line ${i+1}`}>{i+1}</span><div>{line.speaker&&<span className="reading-speaker">{line.speaker}</span>}<p className="reading-chinese" lang="zh-Hant-TW">{tokens[i].map((token,j)=><Word key={j} token={token} onHelp={help}/>)}</p>{showPinyin&&<p className="reading-pinyin">{line.pinyin}</p>}</div></div>)}
  </section>
  {progress.phase==='read'&&<div className="reading-continue"><p>Read for the situation first. Keep the passage open while you answer.</p><button className="primary-button" onClick={()=>changePhase('questions')}>Try the questions<ArrowRight size={18}/></button><small>Translation and sentence notes open after you submit all {reading.questions.length} answers.</small></div>}
  {progress.phase!=='read'&&<section className="reading-questions" aria-label="Comprehension questions"><h2 ref={sectionRef} tabIndex={-1}>{reviewed?'Your reading check':'What did you understand?'}</h2><p>{reviewed?`${score} / ${reading.questions.length} correct · ${progress.usedHelp?'Read with support':'No word help or pinyin revealed'}`:'Use the whole passage. Some answers need clues from more than one line.'}</p>
   {reading.questions.map((q,i)=><fieldset className="reading-question" key={i} disabled={reviewed}><legend><span>{i+1}</span>{q.prompt}</legend><div className="reading-options">{q.options.map((option,j)=><label className={`reading-option ${progress.answers[i]===j?'chosen':''} ${reviewed&&q.answer===j?'correct':''} ${reviewed&&progress.answers[i]===j&&q.answer!==j?'incorrect':''}`} key={j}><input type="radio" name={`${reading.id}-q${i}`} value={j} checked={progress.answers[i]===j} onChange={()=>{const answers=[...progress.answers];answers[i]=j;update({...progress,answers})}}/><span>{option}</span>{reviewed&&q.answer===j&&<Check size={18} aria-label="Correct answer"/>}</label>)}</div>{reviewed&&<div className="reading-answer-note"><strong>{progress.answers[i]===q.answer?'Correct.':'Look again:'}</strong> {q.explanation}<p>Evidence: {q.evidence.map((line,j)=><span key={line}>{j>0?', ':''}<a href={`#${reading.id}-line-${line}`}>line {line+1}</a></span>)}</p></div>}</fieldset>)}
   {!reviewed&&<div className="reading-submit"><span aria-live="polite">{answered} / {reading.questions.length} answered</span><button className="primary-button" disabled={answered!==reading.questions.length} onClick={()=>{if(answered===reading.questions.length)changePhase('review')}}>Check answers & unpack the reading<ArrowRight size={18}/></button></div>}
  </section>}
  {reviewed&&<section className="reading-walkthrough" aria-label="Complete reading explanation"><p className="eyebrow">NOW LET’S UNPACK IT</p><h2>From sentences to meaning</h2><p className="reading-patterns">{reading.grammarFocus.join(' · ')}</p>{reading.lines.map((line,i)=><article key={i}><h3>Line {i+1}{line.speaker?` · ${line.speaker}`:''}</h3><p lang="zh-Hant-TW" className="reading-explained-chinese">{line.text}</p>{showPinyin&&<p className="reading-pinyin">{line.pinyin}</p>}<p className="reading-translation">{line.translation}</p><p>{line.note}</p><KnowledgeNotes concepts={knowledgeForReading(reading.id,i,completed)} completed={completed} showPinyin={showPinyin}/></article>)}<div className="reading-tips"><h3>Reading habits to carry forward</h3><ul>{reading.tips.map(tip=><li key={tip}>{tip}</li>)}</ul></div><div className="reading-finish"><button className="primary-button" onClick={onClose}>Back to the unit<ArrowRight size={18}/></button><button className="secondary-button" onClick={retry}><RotateCcw size={17}/>Try again with pinyin hidden</button></div></section>}
  <p className="reading-save" role="status">{storageError?'This browser could not save your reading. Keep this page open to retain your answers.':'Reading answers and completion are saved on this device for this profile.'}</p>
  </>}
 </main>;
}
