'use client';
import {useState} from 'react';
import {MessageCircle} from 'lucide-react';
import type {Phrase} from '../course/schema';
import type {LineExercise} from '../lib/line-exercises';
import '@/app/line-message.css';

export function LineMessage({exercise,incoming,onHelp,sentReply}:{exercise:LineExercise;incoming:Phrase;onHelp:()=>void;sentReply?:{text:string;pinyin?:string}}){
 const [showHelp,setShowHelp]=useState(false);
 return <section className="line-message" aria-label="LINE message exercise">
  <header><MessageCircle size={19} aria-hidden="true"/><strong>LINE practice</strong><span>{exercise.sender}</span></header>
  <p className="line-setup">{exercise.setup}</p>
  <div className="line-thread" aria-live="polite">
   <div className="line-received"><small>{exercise.sender}</small><p lang="zh-Hant-TW">{incoming.text}</p>{showHelp&&<div className="line-message-help"><p>{incoming.pinyin}</p><p>{incoming.meaning}</p></div>}</div>
   {sentReply&&<div className="line-sent"><small>You</small><p lang="zh-Hant-TW">{sentReply.text}</p>{sentReply.pinyin&&<p className="line-reply-pinyin">{sentReply.pinyin}</p>}<small>Reply sent</small></div>}
  </div>
  {!showHelp&&<button className="text-button line-help-button" onClick={()=>{setShowHelp(true);onHelp()}}>Help with this message</button>}
  <p className="line-task">{exercise.task}</p>
 </section>;
}
