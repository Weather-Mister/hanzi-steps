'use client';
import {useState} from 'react';
import {Headphones,Lock} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Progress} from '@/components/ui/progress';
import {units,books} from '@/course/runtime';
import {readingCheckpoints,readingAvailable} from '@/lib/reading-checkpoints';
import {eligibleListening,listeningSceneIds,listeningStages,listeningStageAvailable,listeningQuestion,listeningItemId} from '@/lib/listening-path';
import type {PracticeQuestion} from '@/lib/practice-engine';
import type {PracticeMasteryController} from '@/lib/use-practice-mastery';
import type {ListeningItem} from '@/course/materials/schema';
import {ListeningFeedback,ListeningQuestion} from './listening-question';
import {ListeningScene} from './listening-scene';

export function ListeningPath({open,onOpenChange,completed,userKey,theme,mastery}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;userKey:string;theme:string;mastery:PracticeMasteryController}){
 const [mode,setMode]=useState<'meaning'|'pinyin'>('meaning'),[challenge,setChallenge]=useState(false),[queue,setQueue]=useState<PracticeQuestion[]>([]),[index,setIndex]=useState(0),[result,setResult]=useState<{ok:boolean;assisted:boolean}|null>(null),[sceneId,setSceneId]=useState<string|null>(null);
 const eligible=eligibleListening(completed),question=queue[index],quickMix=eligible.slice(-Math.min(7,eligible.length));
 const scene=readingCheckpoints.find(r=>r.id===sceneId);
 function back(){setQueue([]);setIndex(0);setResult(null);setSceneId(null)}
 function start(items:ListeningItem[]){setQueue(items.map((item,i)=>listeningQuestion(item,mode,Date.now()+':'+i)));setIndex(0);setResult(null)}
 function next(){setResult(null);if(index+1>=queue.length)back();else setIndex(n=>n+1)}
 function answer(ok:boolean,_text:string,assisted=false){if(result||!question)return;setResult({ok,assisted});void mastery.record({itemId:question.item.id,mode:question.mode,correct:ok,assisted,sessionKind:'daily'})}
 return <Dialog open={open} onOpenChange={value=>{onOpenChange(value);if(!value)back()}}><DialogContent className="learning-path-dialog" data-unit-theme={theme}><DialogTitle><Headphones size={23}/> Listening Path</DialogTitle><DialogDescription>Each stage is a substantial 3–7 item listening set built from Chinese you have already learned. Practice full meaning, pinyin recall, and short scenes without creating a separate vocabulary track.</DialogDescription>
 {mastery.error&&<p role="status">{mastery.error} <button className="text-button" onClick={()=>void mastery.retrySync()}>Retry sync</button></p>}
 {scene?<ListeningScene key={userKey+scene.id} reading={scene} userKey={userKey} completed={completed} onBack={back}/>:question?<section key={question.id+(result?':result':':question')} className="listening-session"><button className="text-button" onClick={back}>Back to Listening Path</button><div className="listening-session-progress"><p className="listening-meta">{index+1} / {queue.length} · {challenge?'Two-play challenge':'Replay freely'}</p><Progress value={(index+(result?1:0))/queue.length*100} aria-label={String(index+(result?1:0))+' of '+String(queue.length)+' complete'}/></div>{!result?<ListeningQuestion key={question.id} task={question.listening!} seed={question.id} challenge={challenge} onAnswer={answer} onSkip={next}/>:<div className="listening-result" role="status"><h2>{result.ok?(result.assisted?'Correct with help':'Correct'):'Listen for this next time'}</h2><ListeningFeedback task={question.listening!}/><button className="primary-button" onClick={next}>{index+1<queue.length?'Next item':'Back to Listening Path'}</button></div>}</section>:<>
 <div className="learning-path-settings"><div role="group" aria-label="Listening interaction"><button className={mode==='meaning'?'primary-button':'secondary-button'} onClick={()=>setMode('meaning')}>Hear the meaning</button><button className={mode==='pinyin'?'primary-button':'secondary-button'} onClick={()=>setMode('pinyin')}>Type pinyin</button></div><label><input type="checkbox" checked={challenge} onChange={event=>setChallenge(event.target.checked)}/> Two-play challenge for single sentences</label><button className="primary-button" disabled={!quickMix.length||mastery.loading} onClick={()=>start(quickMix)}>Quick listening mix · {quickMix.length}</button></div>
 <p className="learning-path-note">Stages unlock after their unit is complete. A stage starts with that unit’s material and adds recent review so every session has 3–7 useful listens.</p>
 {books.filter(b=>b.available).map(book=><section className="learning-path-group" key={book.id}><h2>Book {book.number}</h2><div className="listening-stage-grid">{listeningStages.filter(stage=>book.unitIds.includes(stage.unitId)).map(stage=>{
 const unit=units.find(u=>u.id===stage.unitId)!,available=listeningStageAvailable(stage,completed);
 const rows=stage.items.map(item=>mastery.states[listeningItemId(item)+'::'+(mode==='meaning'?'recognition':'pinyin')]).filter(Boolean);
 const attempts=rows.reduce((sum,row)=>sum+(row?.attempts||0),0),correct=rows.reduce((sum,row)=>sum+(row?.correct||0),0);
 return <article className="listening-stage" key={stage.id}><p className="eyebrow">UNIT {unit.displayNumber??unit.number} · {stage.items.length} LISTENS</p><h3>{unit.title}</h3><p>{mode==='meaning'?'Listen for complete meaning across several sentences.':'Hear each sentence, then recall its pinyin.'}</p><small>{attempts?`${attempts} ${attempts===1?'attempt':'attempts'} · ${correct} correct across this set`:'Not practiced in this mode yet'}</small><button className="secondary-button" disabled={!available||mastery.loading} onClick={()=>start(stage.items)}>{available?`Start ${stage.items.length}-item stage`:<><Lock size={15}/>Unlocks at end of Unit {unit.displayNumber??unit.number}</>}</button></article>;
 })}</div></section>)}
 <section className="learning-path-group"><h2>Listen to a scene</h2><p>A full situation with four comprehension checks. These reuse readings from your course; replay is unlimited.</p><div className="listening-stage-grid">{listeningSceneIds.map(id=>{const r=readingCheckpoints.find(r=>r.id===id)!;return <article className="listening-stage" key={id}><h3>{r.title}</h3><p>{r.kind} · {r.questions.length} questions</p><button className="secondary-button" disabled={!readingAvailable(r,completed)} onClick={()=>setSceneId(id)}>Listen to scene</button></article>})}</div></section>
 <p className="learning-path-note">Uses your device’s Taiwan Mandarin voice. If audio is unavailable, transcript practice does not receive a listening score.</p>
 </>}
 </DialogContent></Dialog>;
}
