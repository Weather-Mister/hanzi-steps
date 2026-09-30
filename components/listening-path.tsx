'use client';
import {useState} from 'react';
import {Headphones,Lock} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {units,books} from '@/course/runtime';
import {readingCheckpoints,readingAvailable} from '@/lib/reading-checkpoints';
import {listeningItems,listeningSceneIds,eligibleListening,listeningQuestion,listeningItemId} from '@/lib/listening-path';
import {resolveSentence,sentenceAvailable} from '@/lib/learning-materials';
import {prerequisiteHint,teachingThroughLesson} from '@/lib/curriculum-relations';
import type {PracticeQuestion} from '@/lib/practice-engine';
import type {PracticeMasteryController} from '@/lib/use-practice-mastery';
import {ListeningFeedback,ListeningQuestion} from './listening-question';
import {ListeningScene} from './listening-scene';
export function ListeningPath({open,onOpenChange,completed,userKey,theme,mastery}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;userKey:string;theme:string;mastery:PracticeMasteryController}){
 const [mode,setMode]=useState<'meaning'|'pinyin'>('meaning'),[challenge,setChallenge]=useState(false),[queue,setQueue]=useState<PracticeQuestion[]>([]),[index,setIndex]=useState(0),[result,setResult]=useState<{ok:boolean;assisted:boolean}|null>(null),[sceneId,setSceneId]=useState<string|null>(null);
 const eligible=eligibleListening(completed),question=queue[index];
 const scene=readingCheckpoints.find(r=>r.id===sceneId);
 function back(){setQueue([]);setIndex(0);setResult(null);setSceneId(null)}
 function start(items:typeof listeningItems){setQueue(items.map((item,i)=>listeningQuestion(item,mode,Date.now()+':'+i)));setIndex(0);setResult(null)}
 function next(){setResult(null);if(index+1>=queue.length)back();else setIndex(n=>n+1)}
 function answer(ok:boolean,_text:string,assisted=false){if(result||!question)return;setResult({ok,assisted});void mastery.record({itemId:question.item.id,mode:question.mode,correct:ok,assisted,sessionKind:'daily'})}
 return <Dialog open={open} onOpenChange={value=>{onOpenChange(value);if(!value)back()}}><DialogContent className="learning-path-dialog" data-unit-theme={theme}><DialogTitle><Headphones size={23}/> Listening Path</DialogTitle><DialogDescription>Listen to Chinese you have learned. Meaning, pinyin recall, and short scenes share the same course material.</DialogDescription>
 {mastery.error&&<p role="status">{mastery.error} <button className="text-button" onClick={()=>void mastery.retrySync()}>Retry sync</button></p>}
 {scene?<ListeningScene key={userKey+scene.id} reading={scene} userKey={userKey} completed={completed} onBack={back}/>:question?<section className="listening-session"><button className="text-button" onClick={back}>Back to Listening Path</button><p className="listening-meta">{index+1} / {queue.length} · {challenge?'Two-play challenge':'Replay freely'}</p>{!result?<ListeningQuestion key={question.id} task={question.listening!} seed={question.id} challenge={challenge} onAnswer={answer} onSkip={next}/>:<div role="status"><h2>{result.ok?(result.assisted?'Correct with help':'Correct'):'Listen for this next time'}</h2><ListeningFeedback task={question.listening!}/><button className="primary-button" onClick={next}>{index+1<queue.length?'Next item':'Back to Listening Path'}</button></div>}</section>:<>
 <div className="learning-path-settings"><div role="group" aria-label="Listening interaction"><button className={mode==='meaning'?'primary-button':'secondary-button'} onClick={()=>setMode('meaning')}>Hear the meaning</button><button className={mode==='pinyin'?'primary-button':'secondary-button'} onClick={()=>setMode('pinyin')}>Type pinyin</button></div><label><input type="checkbox" checked={challenge} onChange={event=>setChallenge(event.target.checked)}/> Two-play challenge for single sentences</label><button className="primary-button" disabled={!eligible.length||mastery.loading} onClick={()=>start(eligible)}>Practice available sentences · {eligible.length}</button></div>
 <p className="learning-path-note">New stages open after their teaching lessons and earlier prerequisites. Each skill keeps its own practice history.</p>
 {books.filter(b=>b.available).map(book=><section className="learning-path-group" key={book.id}><h2>Book {book.number}</h2><div className="listening-stage-grid">{listeningItems.filter(item=>book.unitIds.includes(resolveSentence(item.source)!.unitId)).map(item=>{
 const s=resolveSentence(item.source)!,unit=units.find(u=>u.id===s.unitId)!,available=sentenceAvailable(item.source,completed),row=mastery.states[listeningItemId(item)+'::'+(mode==='meaning'?'recognition':'pinyin')];
 return <article className="listening-stage" key={item.id}><p className="eyebrow">UNIT {unit.displayNumber??unit.number}</p><h3>{unit.title}</h3><p>{mode==='meaning'?'Listen for the complete meaning.':'Hear the sounds, then recall the pinyin.'}</p><small>{row?.attempts?`${row.attempts} ${row.attempts===1?'attempt':'attempts'} · ${row.correct} correct`:'Not practiced in this mode'}</small><button className="secondary-button" disabled={!available||mastery.loading} onClick={()=>start([item])}>{available?'Start listening':<><Lock size={15}/>Complete prerequisite lessons</>}</button>{!available&&<p className="learning-path-note">{prerequisiteHint(teachingThroughLesson(s.lessonId),completed)}</p>}</article>;
 })}</div></section>)}
 <section className="learning-path-group"><h2>Listen to a scene</h2><p>A full situation with four comprehension checks. These reuse readings from your course; replay is unlimited.</p><div className="listening-stage-grid">{listeningSceneIds.map(id=>{const r=readingCheckpoints.find(r=>r.id===id)!;return <article className="listening-stage" key={id}><h3>{r.title}</h3><p>{r.kind} · {r.questions.length} questions</p><button className="secondary-button" disabled={!readingAvailable(r,completed)} onClick={()=>setSceneId(id)}>Listen to scene</button></article>})}</div></section>
 <p className="learning-path-note">Uses your device’s Taiwan Mandarin voice. If audio is unavailable, transcript practice does not receive a listening score.</p>
 </>}
 </DialogContent></Dialog>;
}
