'use client';
import {useEffect,useRef,useState} from 'react';
import {Volume2} from 'lucide-react';
import {useSpeech} from '@/lib/use-speech';
import {freshReadingProgress,validReadingProgress,readingScore,type ReadingCheckpoint,type ReadingProgress} from '@/lib/reading-checkpoints';
import {KnowledgeNotes} from './knowledge-notes';
import {knowledgeForReading} from '@/lib/cumulative-knowledge';
export function ListeningScene({reading,userKey,completed,onBack}:{reading:ReadingCheckpoint;userKey:string;completed:Set<string>;onBack:()=>void}){
 const storageKey=`hanzi-listening-scene:${encodeURIComponent(userKey)}:${reading.id}:v${reading.version}`;
 const [progress,setProgress]=useState<ReadingProgress>(()=>freshReadingProgress(reading));
 const [ready,setReady]=useState(false),[storageError,setStorageError]=useState(false),[plays,setPlays]=useState(0),[running,setRunning]=useState(false),[showPinyin,setShowPinyin]=useState(false),[fallback,setFallback]=useState(false);
 const {speak,stop,message}=useSpeech();
 const generation=useRef(0),busy=useRef(false),helpUsed=useRef(false);
 useEffect(()=>{
  try{const p:unknown=JSON.parse(localStorage.getItem(storageKey)||'null');if(validReadingProgress(p,reading)){setProgress(p);helpUsed.current=p.usedHelp}}catch{setStorageError(true)}
  setReady(true);
  return()=>{generation.current++;stop()};
 },[storageKey,reading]);
 const reviewed=progress.phase==='review';
 function update(next:ReadingProgress){setProgress(next);try{localStorage.setItem(storageKey,JSON.stringify(next));setStorageError(false)}catch{setStorageError(true)}}
 async function play(slow=false){
  if(busy.current)return;busy.current=true;setRunning(true);const run=++generation.current;
  if(slow){helpUsed.current=true;update({...progress,usedHelp:true})}
  for(const line of reading.lines){
   const ok=await speak(line.text,slow,{natural:true});
   if(run!==generation.current)return;
   if(!ok){busy.current=false;setRunning(false);return}
  }
  busy.current=false;setRunning(false);setPlays(n=>n+1);
 }
 function cancel(){generation.current++;busy.current=false;stop();setRunning(false)}
 const answered=progress.answers.filter(a=>a!==null).length;
 const transcript=reviewed||fallback;
 return <section className="listening-scene"><button className="text-button" onClick={()=>{cancel();onBack()}}>Back to Listening Path</button><p className="eyebrow">AUDIO SCENE · {reading.kind}</p><h2>{reading.title}</h2><p>{reading.setup}</p><p>Listen for the whole situation. Replay freely; the transcript opens after all answers are submitted.</p>
 <div className="listening-controls" data-feedback="quiet"><button className="primary-button" disabled={!ready||running} onClick={()=>void play()}><Volume2 size={19}/>{running?'Playing scene…':plays?'Replay scene':'Play scene'}</button><button className="secondary-button" disabled={!ready||running} onClick={()=>void play(true)}>Slow · with help</button>{running&&<button className="text-button" onClick={cancel}>Stop audio</button>}</div>
 <p className="listening-meta" aria-live="polite">{plays} complete {plays===1?'play':'plays'}</p>{message&&<p role="status">{message}</p>}
 {!reviewed&&!fallback&&message&&<button className="text-button" onClick={()=>{cancel();setFallback(true)}}>Use transcript without scoring</button>}
 {ready&&!fallback&&<div className="reading-questions">{reading.questions.map((q,i)=><fieldset className="reading-question" key={i} disabled={!plays||running||reviewed}><legend>{i+1}. {q.prompt}</legend><div className="reading-options">{q.options.map((option,j)=><label className={`reading-option ${progress.answers[i]===j?'chosen':''} ${reviewed&&q.answer===j?'correct':''}`} key={j}><input type="radio" name={`${reading.id}-listening-${i}`} checked={progress.answers[i]===j} onChange={()=>{const answers=progress.answers.slice();answers[i]=j;update({...progress,phase:'questions',answers})}}/><span>{option}</span></label>)}</div>{reviewed&&<p className="reading-answer-note">{q.explanation} Evidence: {q.evidence.map(n=>n+1).join(', ')}.</p>}</fieldset>)}
 {!reviewed&&<button className="primary-button" disabled={answered!==reading.questions.length||!plays||running} onClick={()=>update({...progress,phase:'review',usedHelp:helpUsed.current})}>Submit answers & reveal transcript</button>}
 </div>}
 {transcript&&<section className="listening-transcript"><h3>{fallback?'Transcript practice · no listening score':`${readingScore(reading,progress.answers)} / ${reading.questions.length} correct${progress.usedHelp?' · with slow-audio support':''}`}</h3><button className="secondary-button" onClick={()=>setShowPinyin(v=>!v)}>{showPinyin?'Hide pinyin':'Reveal pinyin'}</button>{reading.lines.map((line,i)=><article key={i}><p lang="zh-Hant-TW">{line.speaker&&<strong>{line.speaker}: </strong>}{line.text}</p>{showPinyin&&<p className="pinyin">{line.pinyin}</p>}<p>{line.translation}</p><p>{line.note}</p><KnowledgeNotes completed={completed} concepts={knowledgeForReading(reading.id,i,completed)} showPinyin={showPinyin}/></article>)}<button className="secondary-button" onClick={()=>{cancel();setFallback(false);setPlays(0);setShowPinyin(false);helpUsed.current=false;update(freshReadingProgress(reading))}}>Try again with transcript hidden</button></section>}
 <p className="reading-save" role="status">{storageError?'This browser could not save these answers. Keep the scene open to retain them.':'Scene answers are saved on this device for this profile. They do not complete course lessons or mark words mastered.'}</p>
 </section>;
}
