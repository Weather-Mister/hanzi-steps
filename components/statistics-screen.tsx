'use client';
import {useEffect,useMemo,useState} from 'react';
import {Activity,BookOpen,CalendarDays,CheckCircle2,Flame,PenLine,Repeat2,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import type {Session} from '@/lib/curriculum';
import type {PracticeStateMap} from '@/lib/practice-engine';
import {completionTimestamp,taipeiDay} from '@/lib/streak';
import {learningStatistics} from '@/lib/statistics';

function formatDay(day:string|null){
 if(!day)return '—';
 return new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})
  .format(new Date(day+'T00:00:00Z'));
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
  if(studyDays)return studyDays;
  if(!needsSignIn||now===null)return null;
  return sessions.filter(session=>session.complete).map(session=>taipeiDay(completionTimestamp(session.updatedAt,now)));
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

 const cards=[
  {label:'Current streak',value:streakReady?String(stats.streak.current):'—',detail:streakReady&&stats.streak.currentStart?'Since '+formatDay(stats.streak.currentStart):'No active streak yet',icon:<Flame size={21}/>},
  {label:'Longest streak',value:streakReady?String(stats.streak.best):'—',detail:streakReady?(stats.streak.best===1?'1 day':'days'):'Loading study days',icon:<Trophy size={21}/>},
  {label:'Learned words',value:String(stats.learnedWords),detail:'Unlocked by completed lessons',icon:<BookOpen size={21}/>},
  {label:'Mastered words',value:String(stats.masteredWords),detail:'Mega Challenge mastery',icon:<CheckCircle2 size={21}/>},
  {label:'Pinyin mastered',value:String(stats.pinyinMasteredWords),detail:'Pinyin Gauntlet mastery',icon:<Activity size={21}/>},
  {label:'Characters learned',value:String(stats.learnedCharacters),detail:'Characters reached in the course',icon:<PenLine size={21}/>},
  {label:'Study days',value:streakReady?String(stats.studyDays):'—',detail:'Distinct days with completed work',icon:<CalendarDays size={21}/>},
  {label:'Practice attempts',value:String(stats.totalPracticeAttempts),detail:'Tracked adaptive + handwriting attempts',icon:<Repeat2 size={21}/>},
  {label:'Units completed',value:String(stats.completedUnits),detail:'Across all available books',icon:<CheckCircle2 size={21}/>},
 ];

 return <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent data-unit-theme={theme} className="statistics-dialog">
   <div className="statistics-heading">
    <span className="statistics-heading-icon"><Activity size={24}/></span>
    <div><DialogTitle>Your statistics</DialogTitle><DialogDescription>A running snapshot of how far you have taken Hanzi Steps.</DialogDescription></div>
   </div>
   {loading&&<p className="statistics-sync" role="status">Refreshing your saved progress…</p>}
   <div className="statistics-grid">
    {cards.map(card=><article className="statistics-card" key={card.label}>
     <span className="statistics-card-icon">{card.icon}</span>
     <div><span>{card.label}</span><strong>{card.value}</strong><small>{card.detail}</small></div>
    </article>)}
   </div>
   <section className="statistics-favorite">
    <div>
     <span className="statistics-favorite-label">MOST PRACTICED WORD</span>
     {stats.mostPracticedWord?<><strong lang="zh-Hant-TW">{stats.mostPracticedWord.traditional}</strong><p>{stats.mostPracticedWord.pinyin} · {stats.mostPracticedWord.meaning}</p></>:<><strong>—</strong><p>Tracked word practice will show up here.</p></>}
    </div>
    {stats.mostPracticedWord&&<span className="statistics-favorite-count">{stats.mostPracticedWord.attempts}<small>{stats.mostPracticedWord.attempts===1?'attempt':'attempts'}</small></span>}
   </section>
   {needsSignIn&&<p className="statistics-footnote">These numbers are using this device’s saved progress. Sign in to keep them consistent across devices.</p>}
  </DialogContent>
 </Dialog>;
}
