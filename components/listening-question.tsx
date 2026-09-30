'use client';
import {useMemo,useRef,useState} from 'react';
import {Volume2} from 'lucide-react';
import {useSpeech} from '@/lib/use-speech';
import {resolveSentence} from '@/lib/learning-materials';
import {listeningOptions,listeningPinyinCorrect,type ListeningTask} from '@/lib/listening-path';
export function ListeningFeedback({task}:{task:ListeningTask}){
 const source=resolveSentence(task.item.source)!;
 return <div className="listening-feedback"><p lang="zh-Hant-TW">{source.text}</p><p className="pinyin">{source.pinyin}</p><p>{source.meaning}</p><p>{task.item.reason}</p>{source.note&&<p>{source.note}</p>}</div>;
}
export function ListeningQuestion({task,seed,challenge=false,onAnswer,onSkip}:{task:ListeningTask;seed:string;challenge?:boolean;onAnswer:(ok:boolean,answer:string,assisted?:boolean)=>void;onSkip:()=>void}){
 const source=resolveSentence(task.item.source)!;
 const {speak,stop,playing,message}=useSpeech();
 const [plays,setPlays]=useState(0),[value,setValue]=useState(''),[assisted,setAssisted]=useState(false),[fallback,setFallback]=useState(false);
 const busy=useRef(false),answered=useRef(false);
 const options=useMemo(()=>listeningOptions(task.item,seed),[task.item,seed]);
 async function play(slow=false){
  if(busy.current||answered.current||(challenge&&plays>=2))return;
  busy.current=true;if(slow)setAssisted(true);
  try{if(await speak(source.text,slow,{natural:true}))setPlays(n=>n+1)}finally{busy.current=false}
 }
 function answer(ok:boolean,help=assisted){if(answered.current||plays===0||playing)return;answered.current=true;stop();onAnswer(ok,source.text,help)}
 if(fallback)return <section className="listening-fallback"><p role="status">Transcript practice · no listening score recorded.</p><ListeningFeedback task={task}/><button className="primary-button" onClick={onSkip}>Back without scoring</button></section>;
 return <div className="smart-question listening-question"><span className="smart-mode-label">Listening · {task.mode==='meaning'?'meaning':'pinyin recall'}</span><div className="smart-prompt"><h2>{task.mode==='meaning'?'What did you hear?':'Listen and type the pinyin'}</h2><p>{challenge?'Two successful plays · no slow playback.':'Replay as often as you need. Try the natural speed first.'}</p></div>
  <div className="listening-controls" data-feedback="quiet"><button className="primary-button" disabled={playing||(challenge&&plays>=2)} onClick={()=>void play()}><Volume2 size={20}/>{playing?'Playing…':plays?'Replay audio':'Play audio'}</button>{!challenge&&<button className="secondary-button" disabled={playing} onClick={()=>void play(true)}>Slow · with help</button>}</div>
  <p className="listening-meta" aria-live="polite">{challenge?`${Math.max(0,2-plays)} plays remaining`:`${plays} successful ${plays===1?'play':'plays'}`}</p>
  {message&&<p role="status" className="audio-message">{message}</p>}
  {task.mode==='meaning'?<div className="smart-choice-grid">{options.map((o,i)=><button key={i} disabled={!plays||playing} onClick={()=>answer(o.correct)}>{o.text}</button>)}</div>:<form onSubmit={event=>{event.preventDefault();if(value.trim())answer(listeningPinyinCorrect(task,value))}}><label className="smart-input-label">Pinyin<input value={value} disabled={!plays||playing} onChange={event=>setValue(event.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false}/></label><p className="listening-meta">Tone marks, tone numbers, or plain pinyin. This checks spelling; canonical tones appear afterward.</p><button className="primary-button" disabled={!plays||playing||!value.trim()}>Check pinyin</button></form>}
  <div className="listening-footer"><button className="text-button" disabled={!plays||playing} onClick={()=>answer(false,true)}>Give up & see answer</button><button className="text-button" onClick={()=>{answered.current=true;stop();onSkip()}}>Skip without scoring</button>{message&&<button className="text-button" onClick={()=>{answered.current=true;stop();setFallback(true)}}>Use transcript without scoring</button>}</div>
 </div>;
}
