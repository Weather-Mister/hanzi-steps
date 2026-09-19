'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {Session,validSession} from './curriculum';
import {progressDraftKey,readProgressDrafts} from './progress-drafts';
import {validStudyDays} from './streak';
class ProgressRequestError extends Error {constructor(message:string,public status:number){super(message)}}
const merge=(list:Session[],s:Session)=>[s,...list.filter(x=>x.id!==s.id)].sort((a,b)=>b.updatedAt-a.updatedAt);
async function request(method:'GET'|'PUT',body?:Session){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);try{const r=await fetch('/api/progress',{method,signal:controller.signal,credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});if(r.status===401)throw new ProgressRequestError('Sign in to sync your progress.',401);const data=await r.json() as {error?:string;sessions?:unknown;saved?:boolean;studyDays?:unknown};if(!r.ok)throw new ProgressRequestError(data.error||'Progress is temporarily unavailable.',r.status);if(method==='PUT'&&data.saved!==true)throw new Error('The checkpoint was not confirmed.');return data}finally{clearTimeout(timer)}}
export function useProgress(userKey:string){
 const [needsSignIn,setNeedsSignIn]=useState(userKey==='signed-out');const authExpired=useRef(userKey==='signed-out');
 const [sessions,setSessions]=useState<Session[]>([]);const [loading,setLoading]=useState(true);const [loadError,setLoadError]=useState('');const [saveError,setSaveError]=useState('');const [saveState,setSaveState]=useState<'saved'|'saving'|'error'>('saved');
 const [activity,setActivity]=useState<{userKey:string;days:string[]}|null>(null);
 const pending=useRef(new Map<string,Session>());const flushing=useRef(false);const mounted=useRef(true);const key=progressDraftKey(userKey);
 const cache=useCallback(()=>{try{if(pending.current.size)localStorage.setItem(key,JSON.stringify([...pending.current.values()]));else localStorage.removeItem(key)}catch{/* Server remains authoritative when local draft caching is unavailable. */}},[key]);
 const flush=useCallback(async()=>{if(flushing.current||authExpired.current)return;flushing.current=true;if(pending.current.size&&mounted.current){setSaveState('saving');setSaveError('')}try{while(pending.current.size){const s=pending.current.values().next().value as Session;const data=await request('PUT',s);if(mounted.current&&validStudyDays(data.studyDays))setActivity(current=>({userKey,days:[...new Set([...(current?.userKey===userKey?current.days:[]),...data.studyDays as string[]])]}));if(pending.current.get(s.id)?.index===s.index)pending.current.delete(s.id);cache()}if(mounted.current){setSaveState('saved');setSaveError('')}}catch(e){if(mounted.current){if(e instanceof ProgressRequestError&&e.status===401){authExpired.current=true;setNeedsSignIn(true)}setSaveState('error');setSaveError(e instanceof Error?e.message:'Your progress has not synced yet.')}}finally{flushing.current=false}},[cache,userKey]);
 const save=useCallback((s:Session)=>{setSessions(prev=>merge(prev,s));pending.current.set(s.id,s);cache();void flush()},[cache,flush]);
 const load=useCallback(async()=>{
  setLoading(true);setLoadError('');let drafts:Session[]=[];
  try{drafts=readProgressDrafts(localStorage,userKey)}catch{}
  for(const s of drafts){const current=pending.current.get(s.id);if(!current||s.index>current.index)pending.current.set(s.id,s)}
  if(userKey==='signed-out'){if(mounted.current){setSessions(drafts);setLoading(false)}return}
  try{const {sessions:rows,studyDays}=await request('GET');if(!Array.isArray(rows))throw new Error('Progress could not load.');const remote:Session[]=rows.filter(validSession);let combined=remote;
   if(mounted.current&&validStudyDays(studyDays))setActivity(current=>({userKey,days:[...new Set([...(current?.userKey===userKey?current.days:[]),...studyDays])]}));
   for(const s of pending.current.values()){const existing=remote.find(x=>x.id===s.id);if(!existing||s.index>existing.index)combined=merge(combined,s);else pending.current.delete(s.id)}
   cache();if(mounted.current)setSessions(combined);if(pending.current.size)void flush();
  }catch(e){if(mounted.current){if(e instanceof ProgressRequestError&&e.status===401){authExpired.current=true;setNeedsSignIn(true)}setLoadError(e instanceof Error?e.message:'Progress could not load.');setSessions(prev=>drafts.reduce(merge,prev));if(pending.current.size)setSaveState('error')}}finally{if(mounted.current)setLoading(false)}
 },[userKey,cache,flush]);
 useEffect(()=>{mounted.current=true;void load();const online=()=>{void flush()};window.addEventListener('online',online);return()=>{mounted.current=false;window.removeEventListener('online',online)}},[load,flush]);
 return {sessions,loading,loadError,saveError,saveState,needsSignIn,save,retrySave:flush,reload:load,studyDays:activity?.userKey===userKey?activity.days:null};
}
