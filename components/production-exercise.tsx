'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Check,Lightbulb,PenLine,RotateCcw} from 'lucide-react';
import {phrases,shuffled,wordMeaning,type Step} from '@/lib/curriculum';
import {productionAnswerCorrect} from '@/lib/production-answer';
import {isOrderAnswerAccepted} from '@/lib/order-answer';
import {useInteractionFeedback} from './interaction-feedback';
import {SentenceBuilder} from './sentence-builder';
import '@/app/production.css';

export function ProductionExercise({step,sessionSeed,userKey,onAdvance,onAttempt}:{step:Step;sessionSeed:string;userKey:string;onAdvance:(assessed:boolean,assisted:boolean)=>void;onAttempt:(step:Step,correct:boolean,assisted:boolean)=>void}){
 const task=step.production!,phrase=phrases[step.phrase!],tokens=task.fallbackTokens||phrase.tokens;
 const helpKey='hanzi-steps-attempt-help:'+userKey+':'+sessionSeed+':'+step.id;
 const [value,setValue]=useState(''),[help,setHelp]=useState(0),[picked,setPicked]=useState<number[]>([]),[retry,setRetry]=useState(0),[feedback,setFeedback]=useState<boolean|null>(null),[composing,setComposing]=useState(false),[hasHelp,setHasHelp]=useState(false),[generated,setGenerated]=useState(false);
 const assisted=useRef(false),composition=useRef(false),submitted=useRef(false),advanced=useRef(false),heading=useRef<HTMLHeadingElement>(null);
 const {feedback:feel}=useInteractionFeedback();
 const hasChinese=/\p{Script=Han}/u.test(value),fallback=help===3,order=shuffled(tokens.map((_,i)=>i),sessionSeed+step.id+retry);
 function support(){assisted.current=true;setHasHelp(true);try{sessionStorage.setItem(helpKey,'assisted')}catch{}}
 useEffect(()=>{try{if(sessionStorage.getItem(helpKey)==='assisted'){assisted.current=true;setHasHelp(true)}}catch{};heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})},[step.id]);
 function reveal(){if(help>0&&!generated)return;support();setHelp(level=>Math.min(3,level+1));}
 function check(){
  if(submitted.current||composition.current||(!fallback&&!hasChinese)||(fallback&&!picked.length))return;
  submitted.current=true;
  const correct=fallback?isOrderAnswerAccepted(picked.map(i=>tokens[i]),tokens,{strict:true}):productionAnswerCorrect(value,step.answer!,task.acceptedAnswers);
  onAttempt(step,correct,assisted.current); // Same phrase and grammar records as sentence-builder practice.
  if(!correct)support();
  setFeedback(correct);feel(correct?'success':'retry');
 }
 function proceed(){
  if(feedback===false){submitted.current=false;setFeedback(null);setPicked([]);setRetry(n=>n+1);return;}
  if(feedback===true&&!advanced.current){advanced.current=true;try{sessionStorage.removeItem(helpKey)}catch{};onAdvance(true,assisted.current);}
 }
 return <><section className="exercise-body production-exercise">
  <div className="exercise-kind"><PenLine size={16}/><span>Write your own Chinese · {task.level==='early'?'Short recall':task.level==='middle'?'In a situation':'A short message'}</span></div>
  <h1 ref={heading} tabIndex={-1} className="exercise-prompt">{step.prompt}</h1>
  <p className="production-constraints">{task.constraints}</p>
  <p className="exercise-note" id={'production-scope-'+step.id}>Use Traditional Chinese. Follow the stated frame; this check accepts reviewed forms.</p>
  <details className="production-grading"><summary>About grading</summary><p>Spaces and sentence punctuation do not affect grading. Other wording may be valid Chinese; this check accepts only reviewed forms.</p></details>
  {!fallback?<><label className="production-label" htmlFor={'production-input-'+step.id}>Your Chinese response</label><textarea id={'production-input-'+step.id} lang="zh-Hant-TW" className="production-input" value={value} disabled={feedback!==null} rows={3} maxLength={200} autoComplete="off" autoCorrect="off" spellCheck={false} aria-describedby={'production-scope-'+step.id} placeholder="Type your response here" onChange={event=>{setValue(event.target.value);if(/\p{Script=Han}/u.test(event.target.value))setGenerated(true)}} onCompositionStart={()=>{composition.current=true;setComposing(true)}} onCompositionEnd={()=>{composition.current=false;setComposing(false)}}/></>:<><p className="exercise-note">Sentence-builder help is on. Build the example response.</p><SentenceBuilder tokens={tokens} order={order} picked={picked} disabled={feedback!==null} onPick={i=>setPicked(p=>[...p,i])} onRemove={position=>setPicked(p=>p.filter((_,j)=>j!==position))}/></>}
  {help>0&&<div className="production-help" role="status"><strong>Grammar hint</strong><p>{task.grammarHint}</p>{help>1&&<><strong>Key vocabulary</strong><ul>{task.keyVocabulary.map(word=><li key={word}><span lang="zh-Hant-TW">{word}</span>{wordMeaning(word)&&<span> — {wordMeaning(word)}</span>}</li>)}</ul></>}</div>}
  {help<3&&feedback===null&&<button className="text-button production-help-button" disabled={help>0&&!generated} onClick={reveal}><Lightbulb size={16}/>{['Show grammar hint','Show key vocabulary','Use sentence-builder help'][help]}</button>}
  {help>0&&!generated&&feedback===null&&<p className="exercise-note">Try a little Chinese before revealing vocabulary or sentence-builder help.</p>}
  {hasHelp&&<p className="exercise-note">This attempt counts as assisted.</p>}
 </section><footer className={`exercise-footer ${feedback===true?'success':feedback===false?'error':''}`}><div className="feedback-area" aria-live="polite">{feedback!==null?<><span className="feedback-icon">{feedback?<Check size={27}/>:<RotateCcw size={25}/>}</span><div><strong>{feedback?(assisted.current?'Good practice with help!':'You produced it independently!'):'This response did not match a reviewed form'}</strong><p><span lang="zh-Hant-TW">Example: {step.answer}</span><br/>{phrase.pinyin}<br/>{step.explanation}</p></div></>:<p>Try from memory first. Help is available whenever you need it.</p>}</div><button className="primary-button continue-button" disabled={feedback===null&&(composing||(!fallback?!hasChinese:!picked.length))} onClick={feedback===null?check:proceed}>{feedback===false?'Try again':feedback===true?'Continue':'Check answer'}<ArrowRight size={19}/></button></footer></>;
}
