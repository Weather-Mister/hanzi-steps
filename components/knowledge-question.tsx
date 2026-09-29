'use client';
import {useEffect,useMemo,useState} from 'react';
import {shuffled} from '@/lib/curriculum';
import {knowledgeAnswerCorrect,type KnowledgeTask} from '@/lib/cumulative-knowledge';
import {WritingPad} from './writing-pad';

export function KnowledgeQuestion({task,seed,onAnswer}:{task:KnowledgeTask;seed:string;onAnswer:(ok:boolean,answer:string,assisted?:boolean)=>void}){
 const [discover,setDiscover]=useState(task.introduce),[help,setHelp]=useState(task.introduce),[showHelp,setShowHelp]=useState(false),[value,setValue]=useState(''),[picked,setPicked]=useState<number[]>([]),[guided,setGuided]=useState(false);
 const bank=useMemo(()=>shuffled((task.tokens||task.options||[]).map((text,id)=>({id,text})),seed),[task,seed]);
 const answer=(text:string)=>onAnswer(knowledgeAnswerCorrect(task,text),task.answer,help);
 useEffect(()=>{
  if(discover||task.format!=='order'||picked.length!==bank.length)return;
  const submit=(event:KeyboardEvent)=>{
   if(event.key!=='Enter'||event.repeat||event.isComposing||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
   const target=event.target instanceof HTMLElement?event.target:null;
   if(target?.closest('input,textarea,select,a,summary,[contenteditable="true"]'))return;
   // Let focused action buttons handle their own Enter click.
   if(target?.closest('button')&&!target.closest('.smart-token-bank'))return;
   event.preventDefault();
   const text=picked.map(id=>bank.find(t=>t.id===id)!.text).join('');
   onAnswer(knowledgeAnswerCorrect(task,text),task.answer,help);
  };
  window.addEventListener('keydown',submit);
  return()=>window.removeEventListener('keydown',submit);
 },[discover,task,picked,bank,help,onAnswer]);
 if(discover)return <div className="smart-question knowledge-discovery"><span className="smart-mode-label">Make a connection</span><h2>{task.concept.title}</h2><p>{task.concept.explanation}</p><button className="primary-button" onClick={()=>setDiscover(false)}>Try it</button></div>;
 return <div className="smart-question knowledge-question"><span className="smart-mode-label">{task.format==='order'?'Build the sentence':task.format==='write'?'Write it':task.format==='cloze'?'Use it':'Notice the difference'}</span>
  <div className="smart-prompt"><h2>{task.prompt}</h2>{task.format==='order'&&<p>Use all the tiles to express this meaning.</p>}</div>
  {task.format==='order'&&<><div className="smart-built-sentence" lang="zh-Hant-TW">{picked.map(id=>bank.find(t=>t.id===id)!.text).join(' ')||'…'}</div><div className="smart-token-bank">{bank.map(t=><button key={t.id} lang="zh-Hant-TW" disabled={picked.includes(t.id)} onClick={()=>setPicked(old=>[...old,t.id])}>{t.text}</button>)}</div><div className="smart-inline-actions"><button className="text-button" disabled={!picked.length} onClick={()=>setPicked(old=>old.slice(0,-1))}>Undo</button><button className="primary-button" disabled={picked.length!==bank.length} onClick={()=>answer(picked.map(id=>bank.find(t=>t.id===id)!.text).join(''))}>Check</button></div></>}
  {task.format==='choice'&&<div className="smart-choice-grid">{bank.map(t=><button key={t.id} onClick={()=>answer(t.text)}>{t.text}</button>)}</div>}
  {task.format==='cloze'&&<form onSubmit={e=>{e.preventDefault();if(value.trim())answer(value)}}><label className="smart-input-label">Type the missing Traditional Chinese<input value={value} onChange={e=>setValue(e.target.value)} lang="zh-Hant-TW" autoComplete="off" spellCheck={false}/></label><button className="primary-button" disabled={!value.trim()}>Check</button></form>}
  {task.format==='write'&&<><WritingPad key={String(guided)} char={task.answer} mode={guided?'trace':'memory'} strict={!guided} revealStrokeAfterMisses={guided?undefined:5} onComplete={assisted=>onAnswer(true,task.answer,help||guided||assisted)}/><button className="text-button" disabled={guided} onClick={()=>{setGuided(true);setHelp(true)}}>{guided?'Guides are on':'Show guides'}</button></>}
  <button className="text-button" aria-expanded={showHelp} onClick={()=>{setShowHelp(!showHelp);setHelp(true)}}>{showHelp?'Hide reminder':'Show a reminder'}</button>
  {showHelp&&<div className="knowledge-reminder"><strong>{task.concept.title}</strong><p>{task.concept.explanation}</p></div>}
 </div>;
}
