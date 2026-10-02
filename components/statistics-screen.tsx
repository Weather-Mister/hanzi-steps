'use client';
import {useEffect,useMemo,useState} from 'react';
import {Activity,BookOpen,CalendarDays,CheckCircle2,Flame,PenLine,Repeat2,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {characterOrder,units,type Session} from '@/lib/curriculum';
import type {PracticeStateMap} from '@/lib/practice-engine';
import {completionTimestamp,taipeiDay} from '@/lib/streak';
import {learningStatistics} from '@/lib/statistics';

function formatDay(day:string|null){
 if(!day)return '—';
 return new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})
  .format(new Date(day+'T00:00:00Z'));
}

function Ring({value,label,subtle=false}:{value:number;label:string;subtle?:boolean}){
 return <div className={`statistics-ring ${subtle?'subtle':''}`}>
  <svg viewBox="0 0 120 120" role="img" aria-label={`${label}: ${value}%`}>
   <circle className="statistics-ring-track" cx="60" cy="60" r="48" pathLength="100"/>
   <circle className="statistics-ring-value" cx="60" cy="60" r="48" pathLength="100" strokeDasharray={`${value} 100`}/>
  </svg>
  <div><strong>{value}%</strong><span>{label}</span></div>
 </div>;
}

type Props={
 open:boolean;
 onOpenChange:(open:boolean)=>void;
 completed:Set<string>;
 learnedCharacters:number;
 completedUnits:number;
 studyDays:string[]|null;
 sessions:Session[];
 needsSignIn:boolean;
 practiceStates:PracticeStateMap;
 mastered:Set<string>;
 reverseMastered:Set<string>;
 theme:string;
 loading:boolean;
};

export function StatisticsScreen({
 open,onOpenChange,completed,learnedCharacters,completedUnits,studyDays,sessions,needsSignIn,
 practiceStates,mastered,reverseMastered,theme,loading,
}:Props){
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{
  if(!open)return;
  const tick=()=>setNow(Date.now());
  tick();
  const timer=window.setInterval(tick,30_000);
  return()=>window.clearInterval(timer);
 },[open]);
 const days=useMemo(()=>{
  if(now===null)return studyDays;
  const localDays=sessions.filter(session=>session.complete).map(session=>taipeiDay(completionTimestamp(session.updatedAt,now)));
  if(studyDays!==null)return [...new Set([...studyDays,...localDays])];
  if(needsSignIn||localDays.length)return [...new Set(localDays)];
  return null;
 },[studyDays,needsSignIn,now,sessions]);
 const stats=useMemo(()=>learningStatistics({
  completed,
  studyDays:days??[],
  practiceStates,
  mastered,
  reverseMastered,
  learnedCharacters,
  completedUnits,
  now:now??Date.now(),
 }),[completed,days,practiceStates,mastered,reverseMastered,learnedCharacters,completedUnits,now]);
 const streakReady=days!==null&&now!==null;
 const topWordMax=Math.max(1,...stats.topPracticedWords.map(word=>word.attempts));
 const modeMax=Math.max(1,...stats.practiceByMode.map(mode=>mode.attempts));
 const charRate=characterOrder.length?Math.round(stats.learnedCharacters/characterOrder.length*100):0;
 const unitRate=units.length?Math.round(stats.completedUnits/units.length*100):0;

 return <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent data-unit-theme={theme} className="statistics-dialog">
   <div className="statistics-heading">
    <span className="statistics-heading-icon"><Activity size={24}/></span>
    <div>
     <div className="statistics-title-line"><DialogTitle>Learning statistics</DialogTitle><span className="statistics-live"><i/>Live</span></div>
     <DialogDescription>Your progress, habits, practice mix, and the words you keep coming back to.</DialogDescription>
    </div>
   </div>
   {loading&&<p className="statistics-sync" role="status">Refreshing your saved progress…</p>}

   <section className="statistics-hero-grid">
    <article className="statistics-streak-hero">
     <div className="statistics-streak-flame"><Flame size={31}/></div>
     <div>
      <span>CURRENT STREAK</span>
      <strong>{streakReady?stats.streak.current:'—'}<small>{streakReady?' days':''}</small></strong>
      <p>{streakReady&&stats.streak.currentStart?'Going since '+formatDay(stats.streak.currentStart):'Complete a study day to get one going.'}</p>
     </div>
    </article>
    <article className="statistics-quick-card"><Trophy size={20}/><span>Longest streak</span><strong>{streakReady?stats.streak.best:'—'}</strong><small>days</small></article>
    <article className="statistics-quick-card"><BookOpen size={20}/><span>Learned words</span><strong>{stats.learnedWords}</strong><small>{stats.masteredWords} mastered</small></article>
    <article className="statistics-quick-card"><Repeat2 size={20}/><span>Direct attempts</span><strong>{stats.totalPracticeAttempts}</strong><small>{stats.totalCleanTracked?stats.strictAccuracy+'% strict accuracy':'Strict scoring starts now'}</small></article>
   </section>

   <div className="statistics-dashboard-grid">
    <section className="statistics-panel statistics-activity-panel">
     <div className="statistics-panel-heading">
      <div><span>STUDY RHYTHM</span><h3>Study-day history</h3></div>
      <strong>{streakReady?stats.studyDays:'—'}<small> total study days</small></strong>
     </div>
     <div className="statistics-heatmap-wrap">
      <div className="statistics-heatmap-copy"><span>LAST 12 WEEKS</span><small>Each square is one day</small></div>
      <div className="statistics-heatmap" role="img" aria-label="Study-day heatmap for the last twelve weeks">
       {stats.activityGrid.map(day=><span key={day.date} className={day.active?'active':''} data-today={day.today||undefined} title={day.date+(day.active?' · studied':'')}/>)}
      </div>
     </div>
    </section>

    <section className="statistics-panel statistics-mastery-panel">
     <div className="statistics-panel-heading"><div><span>MASTERY</span><h3>How much has stuck</h3></div></div>
     <div className="statistics-rings">
      <Ring value={stats.masteredRate} label="Mega mastered"/>
      <Ring value={stats.pinyinMasteredRate} label="Pinyin mastered" subtle/>
     </div>
     <div className="statistics-progress-list">
      <div><span>Characters learned <b>{stats.learnedCharacters}/{characterOrder.length}</b></span><i><b style={{width:`${charRate}%`}}/></i></div>
      <div><span>Units completed <b>{stats.completedUnits}/{units.length}</b></span><i><b style={{width:`${unitRate}%`}}/></i></div>
     </div>
    </section>

    <section className="statistics-panel statistics-practice-panel">
     <div className="statistics-panel-heading">
      <div><span>PRACTICE MIX</span><h3>Where your repetitions go</h3></div>
      <strong>{stats.totalCleanTracked?stats.strictAccuracy+'%':'—'}<small> strict accuracy</small></strong>
     </div>
     {stats.practiceByMode.length?<div className="statistics-mode-bars">
      {stats.practiceByMode.map(mode=><div className="statistics-mode-row" key={mode.mode}>
       <span>{mode.label}</span>
       <div><i style={{width:`${mode.attempts/modeMax*100}%`}}/></div>
       <strong>{mode.attempts}</strong>
      </div>)}
     </div>:<p className="statistics-empty">Practice a few items and this graph will fill itself in.</p>}
     <div className="statistics-practice-foot">
      <span><b>{stats.totalCleanCorrect}</b> clean</span>
      <span><b>{stats.totalMisses}</b> misses</span>
      <span><b>{stats.assistedRate}%</b> assisted</span>
      <span><b>{stats.successRate}%</b> overall correct</span>
     </div>
     <p className="statistics-definition">Strict accuracy counts only correct answers completed without help. Linked knowledge bookkeeping and skipped items are excluded from direct-attempt totals.{stats.strictCoverage<100&&stats.totalPracticeAttempts>0?' '+stats.totalCleanTracked+' of '+stats.totalPracticeAttempts+' direct attempts have exact clean-history data; older legacy attempts are not guessed.':''}</p>
    </section>

    <section className="statistics-panel statistics-top-words">
     <div className="statistics-panel-heading"><div><span>FREQUENT FLYERS</span><h3>Most practiced words</h3></div></div>
     {stats.topPracticedWords.length?<div className="statistics-word-bars">
      {stats.topPracticedWords.map((word,index)=><div className="statistics-word-row" key={word.id}>
       <span className="statistics-rank">{index+1}</span>
       <div className="statistics-word-copy"><strong lang="zh-Hant-TW">{word.traditional}</strong><small>{word.pinyin} · {word.meaning}{word.unguidedRounds?' · '+word.unguidedRounds+' free-writing '+(word.unguidedRounds===1?'round':'rounds'):''}</small></div>
       <div className="statistics-word-track"><i style={{width:`${word.attempts/topWordMax*100}%`}}/></div>
       <b>{word.attempts}</b>
      </div>)}
     </div>:<p className="statistics-empty">Tracked word practice will show up here.</p>}
    </section>
   </div>

   <section className="statistics-milestones">
    <article><CalendarDays size={18}/><span>Study days</span><strong>{streakReady?stats.studyDays:'—'}</strong></article>
    <article><PenLine size={18}/><span>Characters</span><strong>{stats.learnedCharacters}</strong></article>
    <article><CheckCircle2 size={18}/><span>Mastered words</span><strong>{stats.masteredWords}</strong></article>
    <article><Activity size={18}/><span>Pinyin mastered</span><strong>{stats.pinyinMasteredWords}</strong></article>
   </section>

   <p className="statistics-footnote">The dashboard recalculates from current app state as you learn. Infinite free-writing rounds count toward a ranked word only when that practiced character is itself a learned one-character word.</p>
   {needsSignIn&&<p className="statistics-footnote">These numbers are using this device’s saved progress. Sign in to keep them consistent across devices.</p>}
  </DialogContent>
 </Dialog>;
}
