'use client';
import {useEffect,useState} from 'react';
import {Check,Flame,Trophy} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import type {Session} from '@/lib/curriculum';
import {completionTimestamp,streakFromDays,taipeiDay} from '@/lib/streak';

type Streak=ReturnType<typeof streakFromDays>;
export function StreakSummary({streak}:{streak:Streak}){
 const message=streak.practicedToday?'Today is done. Keep it going tomorrow!':streak.current>0?'Keep your streak going with one lesson today.':'Complete a lesson to start your streak.';
 return <>
  <div className={`streak-hero ${streak.current>0?'lit':''}`}>
   <Flame size={54} aria-hidden="true"/>
   <strong>{streak.current}</strong><span>day streak</span>
  </div>
  <p className="streak-message" role="status">{message}</p>
  <ol className="streak-week" aria-label="Study days this week, Monday to Sunday">
   {streak.week.map(day=><li key={day.date} className={`${day.done?'done ':''}${day.today?'today ':''}${day.future?'future':''}`} aria-current={day.today?'date':undefined} aria-label={`${day.label}, ${day.date}: ${day.done?'practiced':day.today?'today, not yet practiced':day.future?'upcoming':'not practiced'}`}>
    <span>{day.label}</span><span className="streak-day">{day.done?<Check size={18} aria-hidden="true"/>:Number(day.date.slice(-2))}</span>
   </li>)}
  </ol>
  <p className="streak-best"><Trophy size={18} aria-hidden="true"/>Best streak <strong>{streak.best} {streak.best===1?'day':'days'}</strong></p>
 </>;
}

type Props={studyDays:string[]|null;sessions:Session[];loading:boolean;loadError:string;needsSignIn:boolean;saveState:'saved'|'saving'|'error';onRetry:()=>void};
export function StreakCounter({studyDays,sessions,loading,loadError,needsSignIn,saveState,onRetry}:Props){
 const [open,setOpen]=useState(false),[now,setNow]=useState<number|null>(null);
 useEffect(()=>{
  const tick=()=>setNow(Date.now());tick();
  const timer=window.setInterval(tick,30_000);
  const visible=()=>{if(document.visibilityState==='visible')tick()};
  window.addEventListener('focus',tick);document.addEventListener('visibilitychange',visible);
  return()=>{window.clearInterval(timer);window.removeEventListener('focus',tick);document.removeEventListener('visibilitychange',visible)};
 },[]);
 const days=studyDays??(needsSignIn&&now!==null?sessions.filter(s=>s.complete).map(s=>taipeiDay(completionTimestamp(s.updatedAt,now))):null);
 const ready=now!==null&&days!==null;
 const streak=streakFromDays(days||[],now??0);
 const unavailable=!loading&&!ready;
 const label=ready?`${streak.current}-day streak. ${streak.practicedToday?'Practiced today.':'Complete one lesson today.'} Open streak details.`:loading?'Loading streak.':'Streak unavailable. Open details.';
 return <>
  <button className={`streak-button ${ready&&streak.current>0?'lit':''} ${ready&&streak.practicedToday?'today-done':''}`} aria-label={label} aria-haspopup="dialog" onClick={()=>setOpen(true)}>
   <Flame size={23} aria-hidden="true"/><strong aria-live="polite">{ready?streak.current:'—'}</strong><span className="streak-button-label">day streak</span>
  </button>
  <Dialog open={open} onOpenChange={setOpen}>
   <DialogContent className="streak-dialog">
    <DialogTitle>Your daily streak</DialogTitle>
    <DialogDescription>Finish one lesson, review, or character-practice session each day. More practice on the same day still counts as one day.</DialogDescription>
    {ready?<StreakSummary streak={streak}/>:<p className="streak-message" role="status">{loading?'Loading your study days…':'Your streak could not load. Your saved work has not been reset.'}</p>}
    {(unavailable||loadError)&&!needsSignIn&&<button className="secondary-button" onClick={onRetry}>Retry loading</button>}
    {!needsSignIn&&saveState!=='saved'&&<p className="streak-sync" role="status">{saveState==='saving'?'Syncing your practice. The counter updates after saving.':'Your latest practice is waiting to sync. Your streak updates when it saves.'}</p>}
    <p className="streak-timezone">A new day starts at midnight in Taiwan (UTC+8). Missing a full day resets the current streak.</p>
    {needsSignIn&&<p className="streak-sync">Sign in to save your streak across devices.</p>}
   </DialogContent>
  </Dialog>
 </>;
}
