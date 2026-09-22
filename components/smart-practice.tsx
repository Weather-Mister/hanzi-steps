'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowLeft,Check,Flame,MapPin,RotateCcw,Sparkles,Swords,Trophy,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {Progress} from '@/components/ui/progress';
import {WritingPad} from './writing-pad';
import {shuffled} from '@/lib/curriculum';
import {
 adaptivePracticeItems,availableTaiwanMissions,distractorPool,isRevengeCandidate,learnedPracticeItems,
 makeDailyTen,makeMegaCheckpoint,makeRevengeRound,megaCheckpointCount,practiceSkillKey,
 type PracticeItem,type PracticeQuestion,type TaiwanMission,
} from '@/lib/practice-engine';
import type {PracticeMasteryController} from '@/lib/use-practice-mastery';
import type {MegaMasteryController} from '@/lib/use-mega-mastery';
import {useInteractionFeedback} from './interaction-feedback';

type Result={correct:boolean;assisted:boolean;answer:string};
type Screen='hub'|'session'|'taiwan'|'mission';

function normalizeChinese(value:string){
 return value.trim().replace(/[\s，。！？、,.!?;；:：'"“”‘’（）()]/g,'');
}
function seed(prefix:string){
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Taipei'}).format(new Date());
 const nonce=typeof crypto!=='undefined'&&'randomUUID' in crypto?crypto.randomUUID():Math.random().toString(36).slice(2);
 return prefix+':'+day+':'+Date.now()+':'+nonce;
}
function ModeLabel({mode}:{mode:PracticeQuestion['mode']}){
 const labels:Record<PracticeQuestion['mode'],string>={
  recognition:'Recognize',recall:'Recall',pinyin:'Pinyin',input:'Type it',
  sentence:'Build the sentence',handwriting:'Write it',context:'Use it',
 };
 return <span className="smart-mode-label">{labels[mode]}</span>;
}
function ChoiceQuestion({question,items,onAnswer}:{question:PracticeQuestion;items:PracticeItem[];onAnswer:(ok:boolean,answer:string)=>void}){
 const item=question.item,mode=question.mode;
 const field=mode==='recognition'?'meaning':mode==='recall'?'traditional':'pinyin';
 const options=useMemo(()=>shuffled(distractorPool(item,items,field,question.id,4),question.id+':options'),[field,item,items,question.id]);
 const answer=item[field];
 const prompt=mode==='recognition'?item.traditional:mode==='recall'?item.meaning:item.traditional;
 const sub=mode==='recognition'?item.pinyin:mode==='pinyin'?item.meaning:item.pinyin;
 return <div className="smart-question"><ModeLabel mode={mode}/><div className="smart-prompt">
  <h2 lang={mode==='recognition'||mode==='pinyin'?'zh-Hant-TW':undefined}>{prompt}</h2><p>{sub}</p>
 </div><div className="smart-choice-grid">{options.map(option=><button key={option} onClick={()=>onAnswer(option===answer,answer)} lang={field==='traditional'?'zh-Hant-TW':undefined}>{option}</button>)}</div></div>;
}
function InputQuestion({question,onAnswer}:{question:PracticeQuestion;onAnswer:(ok:boolean,answer:string)=>void}){
 const [value,setValue]=useState('');const answer=question.item.traditional;
 const submit=()=>onAnswer(normalizeChinese(value)===normalizeChinese(answer),answer);
 return <div className="smart-question"><ModeLabel mode={question.mode}/><div className="smart-prompt"><h2>{question.item.meaning}</h2></div>
  <label className="smart-input-label">Type the Traditional Chinese<input value={value} onChange={event=>setValue(event.target.value)} lang="zh-Hant-TW" autoComplete="off" autoCapitalize="off" spellCheck={false} onKeyDown={event=>{if(event.key==='Enter'&&value.trim())submit()}}/></label>
  <button className="primary-button" disabled={!value.trim()} onClick={submit}>Check</button>
 </div>;
}
function SentenceQuestion({question,onAnswer}:{question:PracticeQuestion;onAnswer:(ok:boolean,answer:string)=>void}){
 const tokens=question.item.tokens||[];
 const order=useMemo(()=>shuffled(tokens.map((_,i)=>i),question.id+':tokens'),[question.id,tokens]);
 const [picked,setPicked]=useState<number[]>([]);
 const built=picked.map(i=>tokens[i]).join('');
 return <div className="smart-question"><ModeLabel mode={question.mode}/><div className="smart-prompt"><h2>{question.item.meaning}</h2><p>Build the Chinese sentence.</p></div>
  <div className="smart-built-sentence" lang="zh-Hant-TW">{picked.length?picked.map(i=>tokens[i]).join(' '):'…'}</div>
  <div className="smart-token-bank">{order.map(i=><button key={i} disabled={picked.includes(i)} onClick={()=>setPicked(old=>[...old,i])} lang="zh-Hant-TW">{tokens[i]}</button>)}</div>
  <div className="smart-inline-actions"><button className="text-button" disabled={!picked.length} onClick={()=>setPicked(old=>old.slice(0,-1))}>Undo</button>
   <button className="primary-button" disabled={picked.length!==tokens.length} onClick={()=>onAnswer(built===tokens.join(''),question.item.traditional)}>Check</button></div>
 </div>;
}
function HandwritingQuestion({question,onAnswer}:{question:PracticeQuestion;onAnswer:(ok:boolean,answer:string,assisted?:boolean)=>void}){
 const [charIndex,setCharIndex]=useState(0),[assisted,setAssisted]=useState(false),[guided,setGuided]=useState(false);
 const chars=question.item.characters,char=chars[charIndex];
 function done(help:boolean){const used=assisted||guided||help;if(charIndex+1<chars.length){setAssisted(used);setGuided(false);setCharIndex(i=>i+1)}else onAnswer(true,question.item.traditional,used)}
 return <div className="smart-question smart-writing-question"><ModeLabel mode={question.mode}/><div className="smart-prompt"><h2>{question.item.meaning}</h2><p>{question.item.pinyin} · character {charIndex+1} of {chars.length}</p></div>
  <WritingPad key={question.id+':'+charIndex+':'+guided} char={char} mode={guided?'trace':'memory'} strict={!guided} revealStrokeAfterMisses={guided?undefined:5} completionDelayMs={500} onComplete={done}/>
  <button className="text-button" disabled={guided} onClick={()=>{setGuided(true);setAssisted(true)}}>{guided?'Guides are on':'Show guides'}</button>
 </div>;
}
function QuestionView({question,items,onAnswer}:{question:PracticeQuestion;items:PracticeItem[];onAnswer:(ok:boolean,answer:string,assisted?:boolean)=>void}){
 if(question.mode==='recognition'||question.mode==='recall'||question.mode==='pinyin')return <ChoiceQuestion key={question.id} question={question} items={items} onAnswer={onAnswer}/>;
 if(question.mode==='input')return <InputQuestion key={question.id} question={question} onAnswer={onAnswer}/>;
 if(question.mode==='sentence')return <SentenceQuestion key={question.id} question={question} onAnswer={onAnswer}/>;
 return <HandwritingQuestion key={question.id} question={question} onAnswer={onAnswer}/>;
}
function Session({title,subtitle,queue,items,onExit,onRecord}:{title:string;subtitle:string;queue:PracticeQuestion[];items:PracticeItem[];onExit:()=>void;onRecord:(question:PracticeQuestion,ok:boolean,assisted:boolean)=>Promise<unknown>}){
 const {feedback:feel}=useInteractionFeedback();
 const [index,setIndex]=useState(0),[result,setResult]=useState<Result|null>(null),[answers,setAnswers]=useState<Result[]>([]);
 const question=queue[index],complete=index>=queue.length;
 async function answer(correct:boolean,answerText:string,assisted=false){if(result||!question)return;const next={correct,assisted,answer:answerText};setResult(next);setAnswers(old=>[...old,next]);feel(correct?'success':'retry');await onRecord(question,correct,assisted)}
 function continueRound(){if(index+1===queue.length)feel('complete');setResult(null);setIndex(i=>i+1)}
 if(!queue.length)return <section className="smart-empty"><RotateCcw size={34}/><h2>Nothing needs this round yet.</h2><p>Keep learning normally. Mistakes and older material will appear here when useful.</p><button className="secondary-button" onClick={onExit}>Back to practice</button></section>;
 if(complete){const clean=answers.filter(a=>a.correct&&!a.assisted).length,wrong=answers.filter(a=>!a.correct).length;return <section className="smart-finish"><Trophy size={42}/><p className="eyebrow">ROUND COMPLETE</p><h2>{title} complete</h2>
  <div className="smart-finish-stats"><div><strong>{clean}</strong><span>clean recalls</span></div><div><strong>{answers.length-wrong}</strong><span>correct</span></div><div><strong>{wrong}</strong><span>to revisit</span></div></div>
  <p>{wrong?String(wrong)+' '+(wrong===1?'item is':'items are')+' now more likely to return in Revenge and Daily 10.':'No misses this round. Strong items will wait longer before returning.'}</p><button className="primary-button" onClick={onExit}>Back to practice</button></section>}
 return <section className="smart-session"><div className="smart-session-head"><button className="icon-button" aria-label="Back to practice" onClick={onExit}><ArrowLeft size={20}/></button><div><strong>{title}</strong><small>{subtitle}</small></div><span>{index+1}/{queue.length}</span></div>
  <Progress value={index/queue.length*100} aria-label={String(index)+' of '+String(queue.length)+' complete'}/>
  {!result?<QuestionView question={question} items={items} onAnswer={answer}/>:<div className={'smart-result '+(result.correct?'correct':'wrong')} role="status"><span className="smart-result-icon">{result.correct?<Check size={24}/>:<X size={24}/>}</span>
   <div><strong>{result.correct?(result.assisted?'Completed with help':'Correct'):'Not this time'}</strong><p>{result.correct&&!result.assisted?'That answer strengthens this skill.':<>Answer: <span lang="zh-Hant-TW">{result.answer}</span></>}</p></div>
   <button className="primary-button" onClick={continueRound}>{index+1===queue.length?'See results':'Continue'}</button></div>}
 </section>;
}
function MissionSession({mission,onExit,onRecord}:{mission:TaiwanMission;onExit:()=>void;onRecord:(itemId:string,ok:boolean)=>Promise<unknown>}){
 const {feedback:feel}=useInteractionFeedback();
 const [index,setIndex]=useState(0),[result,setResult]=useState<Result|null>(null),[score,setScore]=useState(0);
 const step=mission.steps[index],complete=index>=mission.steps.length;
 async function answer(choice:string){if(result||!step)return;const correct=choice===step.answer;setResult({correct,assisted:false,answer:step.answer});if(correct)setScore(v=>v+1);feel(correct?'success':'retry');await onRecord('mission:'+mission.id+':'+index,correct)}
 function continueMission(){if(index+1===mission.steps.length)feel('complete');setResult(null);setIndex(i=>i+1)}
 if(complete)return <section className="smart-finish mission-finish"><div className="mission-stamp">{mission.stamp}</div><p className="eyebrow">MISSION COMPLETE</p><h2>{mission.title}</h2><p>{score}/{mission.steps.length} first-try choices correct. You can replay this mission any time.</p><button className="primary-button" onClick={onExit}>Back to Taiwan Mode</button></section>;
 return <section className="smart-session mission-session"><div className="smart-session-head"><button className="icon-button" aria-label="Back to Taiwan Mode" onClick={onExit}><ArrowLeft size={20}/></button><div><strong>{mission.stamp} {mission.title}</strong><small>{mission.subtitle}</small></div><span>{index+1}/{mission.steps.length}</span></div><Progress value={index/mission.steps.length*100}/>
  <div className="mission-scene">{step.speaker&&<span>{step.speaker}</span>}<h2 lang="zh-Hant-TW">{step.prompt}</h2>{step.note&&<p>{step.note}</p>}</div>
  {!result?<div className="smart-choice-grid">{shuffled(step.options,mission.id+':'+index).map(option=><button key={option} onClick={()=>void answer(option)} lang="zh-Hant-TW">{option}</button>)}</div>:
   <div className={'smart-result '+(result.correct?'correct':'wrong')} role="status"><span className="smart-result-icon">{result.correct?<Check size={24}/>:<X size={24}/>}</span><div><strong>{result.correct?'That works.':'Use this line:'}</strong><p lang="zh-Hant-TW">{result.answer}</p></div>
   <button className="primary-button" onClick={continueMission}>{index+1===mission.steps.length?'Finish mission':'Continue'}</button></div>}
 </section>;
}
export type PracticeEntry='hub'|'daily'|'revenge'|'mixed'|'taiwan';
export function SmartPractice({open,onOpenChange,completed,theme,mastery,megaMastery,startMode='hub',onOpenMegaChallenge}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;theme:string;mastery:PracticeMasteryController;megaMastery:MegaMasteryController;startMode?:PracticeEntry;onOpenMegaChallenge?:()=>void}){
 const {states,loading,saving,error,record,retrySync}=mastery;
 const allItems=useMemo(()=>learnedPracticeItems(completed),[completed]);
 const items=useMemo(()=>adaptivePracticeItems(allItems,megaMastery.mastered),[allItems,megaMastery.mastered]);
 const preparing=loading||megaMastery.loading;
 const missions=useMemo(()=>availableTaiwanMissions(completed),[completed]);
 const checkpointCount=useMemo(()=>megaCheckpointCount(completed),[completed]);
 const revengePreview=useMemo(()=>makeRevengeRound(items,states,'preview'),[items,states]);
 const weakItemCount=useMemo(()=>items.filter(item=>isRevengeCandidate(states,item)).length,[items,states]);
 const dailySize=Math.min(10,items.length);
 const [screen,setScreen]=useState<Screen>('hub'),[queue,setQueue]=useState<PracticeQuestion[]>([]),[sessionTitle,setSessionTitle]=useState(''),[sessionSubtitle,setSessionSubtitle]=useState(''),[mission,setMission]=useState<TaiwanMission|null>(null);
 function back(){setScreen('hub');setQueue([])}
 function startDaily(){setQueue(makeDailyTen(items,states,seed('daily')));setSessionTitle('Daily 10');setSessionSubtitle('Current unit plus the last one or two, with only useful weak review mixed in.');setScreen('session')}
 function startRevenge(){setQueue(makeRevengeRound(items,states,seed('revenge')));setSessionTitle('Revenge Round');setSessionSubtitle('One old mistake, attacked in different ways.');setScreen('session')}
 function startMega(){setQueue(makeMegaCheckpoint(items,states,seed('mega'),completed));setSessionTitle('Mixed Mastery');setSessionSubtitle('A harder productive round across your current unit and the last one or two.');setScreen('session')}
 useEffect(()=>{
  if(!open)return;
  setQueue([]);setMission(null);
  if(startMode==='taiwan'){setScreen('taiwan');return}
  if(startMode==='daily'&&!preparing&&items.length){startDaily();return}
  if(startMode==='revenge'&&!preparing&&items.length){startRevenge();return}
  if(startMode==='mixed'&&!preparing&&items.length){startMega();return}
  setScreen('hub');
 },[open,startMode,preparing]);
 const recordQuestion=(q:PracticeQuestion,correct:boolean,assisted:boolean)=>record({itemId:q.item.id,mode:q.mode,correct,assisted,sessionKind:q.sessionKind});
 const recordMission=(itemId:string,correct:boolean)=>record({itemId,mode:'context',correct,assisted:false,sessionKind:'taiwan'});
 const missionDone=(candidate:TaiwanMission)=>candidate.steps.every((_,i)=>(states[practiceSkillKey('mission:'+candidate.id+':'+i,'context')]?.correct??0)>0);
 return <Dialog open={open} onOpenChange={value=>{onOpenChange(value);if(!value){setScreen('hub');setQueue([]);setMission(null)}}}><DialogContent data-unit-theme={theme} className="smart-practice-dialog">
  {screen==='hub'&&<><div className="smart-title-row"><div><DialogTitle>Practice</DialogTitle><DialogDescription>Adaptive review, mistake practice, handwriting challenges, and real Taiwan situations.</DialogDescription></div>{saving&&<span className="smart-saving">Saving…</span>}</div>{error&&<div className="smart-sync-note" role="status"><span>{error}</span><button className="text-button" onClick={()=>void retrySync()}>Try sync</button></div>}
   {preparing?<div className="smart-empty"><Sparkles size={30}/><p>Preparing your practice history…</p></div>:items.length===0?<div className="smart-empty"><Sparkles size={30}/><h2>Nothing useful to drill right now</h2><p>Words you marked Mastered stay out of adaptive practice. Complete more of your current unit or restore a word from Mega Challenge if you want it back.</p></div>:<div className="smart-hub-grid">
    <button className="smart-mode-card daily" onClick={startDaily}><span className="smart-card-icon"><Flame size={23}/></span><span><strong>Daily 10</strong><small>{dailySize<10?'Up to 10 adaptive questions':'10 adaptive questions'} · current + last 1–2 units</small></span><b>{dailySize}</b></button>
    <button className="smart-mode-card revenge" onClick={startRevenge} disabled={!revengePreview.length}><span className="smart-card-icon"><Swords size={23}/></span><span><strong>Revenge Round</strong><small>{revengePreview.length?'Attack your weakest item three ways.':'No mistake is ready for revenge yet.'}</small></span><b>{weakItemCount}</b></button>
    <button className="smart-mode-card mega" onClick={startMega} disabled={checkpointCount===0}><span className="smart-card-icon"><Trophy size={23}/></span><span><strong>Mixed Mastery</strong><small>{checkpointCount?'12 productive questions · current + last 1–2 units':'Complete 4 units in a book to unlock Mixed Mastery.'}</small></span><b>{checkpointCount?12:0}</b></button>
    <button className="smart-mode-card legacy-mega" disabled={!onOpenMegaChallenge} onClick={()=>{onOpenChange(false);onOpenMegaChallenge?.()}}><span className="smart-card-icon"><Trophy size={23}/></span><span><strong>Mega Challenge</strong><small>Original handwriting challenge · clear the full learned-word rotation.</small></span><b>∞</b></button>
    <button className="smart-mode-card taiwan" onClick={()=>setScreen('taiwan')}><span className="smart-card-icon"><MapPin size={23}/></span><span><strong>Taiwan Mode</strong><small>Use what you know in short real-life missions.</small></span><b>{missions.filter(m=>m.unlocked).length}</b></button>
   </div>}
  </>}
  {screen==='session'&&<><DialogTitle className="sr-only">{sessionTitle}</DialogTitle><DialogDescription className="sr-only">{sessionSubtitle}</DialogDescription><Session title={sessionTitle} subtitle={sessionSubtitle} queue={queue} items={items} onExit={back} onRecord={recordQuestion}/></>}
  {screen==='taiwan'&&<><div className="smart-session-head taiwan-head"><button className="icon-button" aria-label="Back to practice" onClick={back}><ArrowLeft size={20}/></button><div><DialogTitle>Taiwan Mode</DialogTitle><DialogDescription>Small situations built only from language you have already unlocked.</DialogDescription></div><span>{missions.filter(m=>m.unlocked).length}/{missions.length}</span></div>
   <div className="mission-grid">{missions.map(candidate=><button key={candidate.id} className={'mission-card '+(candidate.unlocked?'unlocked':'locked')+' '+(missionDone(candidate)?'done':'')} disabled={!candidate.unlocked} onClick={()=>{setMission(candidate);setScreen('mission')}}><span className="mission-stamp">{candidate.stamp}</span><span><strong>{candidate.title}</strong><small>{candidate.unlocked?candidate.subtitle:'Keep learning to unlock this mission.'}</small></span><b>{missionDone(candidate)?<Check size={18}/>:candidate.unlocked?'Play':'🔒'}</b></button>)}</div></>}
  {screen==='mission'&&mission&&<><DialogTitle className="sr-only">{mission.title}</DialogTitle><DialogDescription className="sr-only">{mission.subtitle}</DialogDescription><MissionSession mission={mission} onExit={()=>setScreen('taiwan')} onRecord={recordMission}/></>}
 </DialogContent></Dialog>;
}
