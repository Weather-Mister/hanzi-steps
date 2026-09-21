'use client';
import {useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {supabase} from '@/pages/supabase';
import {
 practiceSkillKey,
 updatePracticeState,
 type PracticeMode,
 type PracticeSessionKind,
 type PracticeSkillState,
 type PracticeStateMap,
} from './practice-engine';

const modes:PracticeMode[]=['recognition','recall','pinyin','input','sentence','handwriting','context'];
const sessionKinds:PracticeSessionKind[]=['lesson','daily','revenge','mega','taiwan'];
const storageKey=(userKey:string)=>'hanzi-steps-practice-v1-'+userKey;
const pendingKey=(userKey:string)=>'hanzi-steps-practice-pending-v1-'+userKey;

type PendingAttempt={
 attemptId:string;
 itemId:string;
 mode:PracticeMode;
 correct:boolean;
 assisted:boolean;
 sessionKind:PracticeSessionKind;
 createdAt:number;
};

function parseState(value:unknown):PracticeStateMap{
 if(!value||typeof value!=='object')return {};
 const out:PracticeStateMap={};
 for(const [key,row] of Object.entries(value as Record<string,unknown>)){
  if(!row||typeof row!=='object')continue;
  const r=row as Record<string,unknown>;
  if(
   typeof r.itemId==='string'&&
   typeof r.mode==='string'&&modes.includes(r.mode as PracticeMode)&&
   typeof r.attempts==='number'&&Number.isFinite(r.attempts)&&
   typeof r.correct==='number'&&Number.isFinite(r.correct)&&
   typeof r.assisted==='number'&&Number.isFinite(r.assisted)&&
   typeof r.misses==='number'&&Number.isFinite(r.misses)&&
   typeof r.streak==='number'&&Number.isFinite(r.streak)&&
   typeof r.strength==='number'&&Number.isFinite(r.strength)&&
   typeof r.lastSeen==='number'&&Number.isFinite(r.lastSeen)&&
   typeof r.nextReview==='number'&&Number.isFinite(r.nextReview)
  ){
   out[key]={
    itemId:r.itemId,
    mode:r.mode as PracticeMode,
    attempts:r.attempts,
    correct:r.correct,
    assisted:r.assisted,
    misses:r.misses,
    streak:r.streak,
    strength:Math.max(0,Math.min(1,r.strength)),
    lastSeen:r.lastSeen,
    nextReview:r.nextReview,
   };
  }
 }
 return out;
}

function parsePending(value:unknown):PendingAttempt[]{
 if(!Array.isArray(value))return [];
 return value.flatMap(entry=>{
  if(!entry||typeof entry!=='object')return [];
  const row=entry as Record<string,unknown>;
  if(
   typeof row.attemptId!=='string'||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(row.attemptId)||
   typeof row.itemId!=='string'||row.itemId.length<1||row.itemId.length>1024||
   typeof row.mode!=='string'||!modes.includes(row.mode as PracticeMode)||
   typeof row.correct!=='boolean'||typeof row.assisted!=='boolean'||
   typeof row.sessionKind!=='string'||!sessionKinds.includes(row.sessionKind as PracticeSessionKind)||
   typeof row.createdAt!=='number'||!Number.isFinite(row.createdAt)
  )return [];
  return [{
   attemptId:row.attemptId,
   itemId:row.itemId,
   mode:row.mode as PracticeMode,
   correct:row.correct,
   assisted:row.assisted,
   sessionKind:row.sessionKind as PracticeSessionKind,
   createdAt:row.createdAt,
  }];
 });
}

function readLocal(userKey:string):PracticeStateMap{
 try{return parseState(JSON.parse(localStorage.getItem(storageKey(userKey))||'{}'))}catch{return {}}
}
function writeLocal(userKey:string,state:PracticeStateMap){
 try{localStorage.setItem(storageKey(userKey),JSON.stringify(state))}catch{}
}
function readPending(userKey:string):PendingAttempt[]{
 try{return parsePending(JSON.parse(localStorage.getItem(pendingKey(userKey))||'[]'))}catch{return []}
}
function writePending(userKey:string,pending:PendingAttempt[]){
 try{
  if(pending.length)localStorage.setItem(pendingKey(userKey),JSON.stringify(pending));
  else localStorage.removeItem(pendingKey(userKey));
 }catch{}
}

function rowsToState(value:unknown):PracticeStateMap{
 if(!Array.isArray(value))return {};
 const out:PracticeStateMap={};
 for(const row of value){
  if(!row||typeof row!=='object')continue;
  const r=row as Record<string,unknown>;
  if(typeof r.itemId!=='string'||typeof r.mode!=='string'||!modes.includes(r.mode as PracticeMode))continue;
  const state:PracticeSkillState={
   itemId:r.itemId,
   mode:r.mode as PracticeMode,
   attempts:Number(r.attempts)||0,
   correct:Number(r.correct)||0,
   assisted:Number(r.assisted)||0,
   misses:Number(r.misses)||0,
   streak:Number(r.streak)||0,
   strength:Math.max(0,Math.min(1,Number(r.strength)||0)),
   lastSeen:Number(r.lastSeen)||0,
   nextReview:Number(r.nextReview)||0,
  };
  out[practiceSkillKey(state.itemId,state.mode)]=state;
 }
 return out;
}

export function usePracticeMastery(userKey:string){
 const [states,setStates]=useState<PracticeStateMap>({});
 const statesRef=useRef<PracticeStateMap>({});
 const pendingRef=useRef<PendingAttempt[]>([]);
 const flushing=useRef(false);
 const activeKeyRef=useRef(userKey);
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState('');

 const flush=useCallback(async()=>{
  const key=userKey;
  if(key==='signed-out'||activeKeyRef.current!==key||flushing.current||!pendingRef.current.length)return;
  flushing.current=true;
  setSaving(true);
  setError('');
  try{
   while(activeKeyRef.current===key&&pendingRef.current.length){
    const attempt=pendingRef.current[0];
    const {data,error:saveError}=await supabase.rpc('hanzi_record_practice_attempt',{
     expected_account:key,
     p_attempt_id:attempt.attemptId,
     p_item_id:attempt.itemId,
     p_mode:attempt.mode,
     p_correct:attempt.correct,
     p_assisted:attempt.assisted,
     p_session_kind:attempt.sessionKind,
    });
    if(saveError)throw saveError;
    if(activeKeyRef.current!==key)return;

    const row=rowsToState(data?[data]:[]);
    const stateKey=practiceSkillKey(attempt.itemId,attempt.mode);
    const remote=row[stateKey];
    if(remote){
     const current=statesRef.current[stateKey];
     const chosen=!current||remote.attempts>=current.attempts?remote:current;
     const next={...statesRef.current,[stateKey]:chosen};
     statesRef.current=next;
     setStates(next);
     writeLocal(key,next);
    }

    pendingRef.current=pendingRef.current.slice(1);
    writePending(key,pendingRef.current);
   }
   if(activeKeyRef.current===key)setError('');
  }catch{
   if(activeKeyRef.current===key)setError('Practice history is saved on this device and will retry when you are online.');
  }finally{
   flushing.current=false;
   if(activeKeyRef.current===key)setSaving(false);
  }
 },[userKey]);

 useEffect(()=>{
  let cancelled=false;
  activeKeyRef.current=userKey;
  const local=readLocal(userKey);
  const pending=readPending(userKey);
  statesRef.current=local;
  pendingRef.current=pending;
  setStates(local);
  setSaving(false);
  setError('');

  if(userKey==='signed-out'){
   setLoading(false);
   return()=>{cancelled=true};
  }

  setLoading(true);
  void supabase.rpc('hanzi_read_practice_state',{expected_account:userKey}).then(({data,error:readError})=>{
   if(cancelled||activeKeyRef.current!==userKey)return;
   if(readError){
    setError('Practice history could not sync. Local practice still works.');
    setLoading(false);
    if(pendingRef.current.length)void flush();
    return;
   }

   const remote=rowsToState(data);
   const merged={...remote};
   if(pendingRef.current.length){
    for(const [key,row] of Object.entries(statesRef.current)){
     if(!merged[key]||row.attempts>merged[key].attempts)merged[key]=row;
    }
   }
   statesRef.current=merged;
   setStates(merged);
   writeLocal(userKey,merged);
   setLoading(false);
   if(pendingRef.current.length)void flush();
  });

  return()=>{cancelled=true};
 },[userKey,flush]);

 useEffect(()=>{
  const online=()=>{void flush()};
  window.addEventListener('online',online);
  return()=>window.removeEventListener('online',online);
 },[flush]);

 const record=useCallback((args:{
  itemId:string;
  mode:PracticeMode;
  correct:boolean;
  assisted?:boolean;
  sessionKind:PracticeSessionKind;
 })=>{
  const assisted=Boolean(args.assisted);
  const key=practiceSkillKey(args.itemId,args.mode);
  const now=Date.now();
  const optimistic=updatePracticeState(statesRef.current[key],{itemId:args.itemId,mode:args.mode,correct:args.correct,assisted,now});
  const optimisticState={...statesRef.current,[key]:optimistic};
  statesRef.current=optimisticState;
  setStates(optimisticState);
  writeLocal(userKey,optimisticState);

  if(userKey!=='signed-out'){
   const attempt:PendingAttempt={
    attemptId:crypto.randomUUID(),
    itemId:args.itemId,
    mode:args.mode,
    correct:args.correct,
    assisted,
    sessionKind:args.sessionKind,
    createdAt:now,
   };
   pendingRef.current=[...pendingRef.current,attempt];
   writePending(userKey,pendingRef.current);
   setSaving(true);
   void flush();
  }
  return Promise.resolve(optimistic);
 },[userKey,flush]);

 const stats=useMemo(()=>{
  const values=Object.values(states);
  return {
   tracked:values.length,
   due:values.filter(row=>row.attempts>0&&row.nextReview<=Date.now()).length,
   weak:values.filter(row=>row.attempts>0&&row.misses>0&&row.strength<0.72).length,
  };
 },[states]);

 return {states,loading,saving,error,record,stats,retrySync:flush};
}

export type PracticeMasteryController=ReturnType<typeof usePracticeMastery>;
