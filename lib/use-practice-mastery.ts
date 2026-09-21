'use client';
import {useCallback,useEffect,useMemo,useState} from 'react';
import {supabase} from '@/pages/supabase';
import {
 practiceSkillKey,
 updatePracticeState,
 type PracticeMode,
 type PracticeSessionKind,
 type PracticeSkillState,
 type PracticeStateMap,
} from './practice-engine';

const storageKey=(userKey:string)=>'hanzi-steps-practice-v1-'+userKey;

function parseState(value:unknown):PracticeStateMap{
 if(!value||typeof value!=='object')return {};
 const out:PracticeStateMap={};
 for(const [key,row] of Object.entries(value as Record<string,unknown>)){
  if(!row||typeof row!=='object')continue;
  const r=row as Record<string,unknown>;
  if(
   typeof r.itemId==='string'&&
   typeof r.mode==='string'&&
   ['recognition','recall','pinyin','input','sentence','handwriting','context'].includes(r.mode)&&
   Number.isFinite(r.attempts)&&Number.isFinite(r.correct)&&Number.isFinite(r.assisted)&&
   Number.isFinite(r.misses)&&Number.isFinite(r.streak)&&Number.isFinite(r.strength)&&
   Number.isFinite(r.lastSeen)&&Number.isFinite(r.nextReview)
  ){
   out[key]={
    itemId:r.itemId,
    mode:r.mode as PracticeMode,
    attempts:Number(r.attempts),
    correct:Number(r.correct),
    assisted:Number(r.assisted),
    misses:Number(r.misses),
    streak:Number(r.streak),
    strength:Number(r.strength),
    lastSeen:Number(r.lastSeen),
    nextReview:Number(r.nextReview),
   };
  }
 }
 return out;
}

function readLocal(userKey:string):PracticeStateMap{
 try{return parseState(JSON.parse(localStorage.getItem(storageKey(userKey))||'{}'))}catch{return {}}
}
function writeLocal(userKey:string,state:PracticeStateMap){
 try{localStorage.setItem(storageKey(userKey),JSON.stringify(state))}catch{}
}

function rowsToState(value:unknown):PracticeStateMap{
 if(!Array.isArray(value))return {};
 const out:PracticeStateMap={};
 for(const row of value){
  if(!row||typeof row!=='object')continue;
  const r=row as Record<string,unknown>;
  if(typeof r.itemId!=='string'||typeof r.mode!=='string')continue;
  const mode=r.mode as PracticeMode;
  if(!['recognition','recall','pinyin','input','sentence','handwriting','context'].includes(mode))continue;
  const state:PracticeSkillState={
   itemId:r.itemId,
   mode,
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
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState('');

 useEffect(()=>{
  let cancelled=false;
  const local=readLocal(userKey);
  setStates(local);
  setError('');
  if(userKey==='signed-out'){
   setLoading(false);
   return()=>{cancelled=true};
  }
  setLoading(true);
  void supabase.rpc('hanzi_read_practice_state',{expected_account:userKey}).then(({data,error:readError})=>{
   if(cancelled)return;
   if(readError){
    setError('Practice history could not sync. Local practice still works.');
    setLoading(false);
    return;
   }
   const remote=rowsToState(data);
   const merged={...local,...remote};
   setStates(merged);
   writeLocal(userKey,merged);
   setLoading(false);
  });
  return()=>{cancelled=true};
 },[userKey]);

 const record=useCallback(async(args:{
  itemId:string;
  mode:PracticeMode;
  correct:boolean;
  assisted?:boolean;
  sessionKind:PracticeSessionKind;
 })=>{
  const assisted=Boolean(args.assisted);
  const key=practiceSkillKey(args.itemId,args.mode);
  let optimistic:PracticeSkillState|undefined;
  setStates(previous=>{
   optimistic=updatePracticeState(previous[key],{itemId:args.itemId,mode:args.mode,correct:args.correct,assisted});
   const next={...previous,[key]:optimistic};
   writeLocal(userKey,next);
   return next;
  });
  if(userKey==='signed-out')return optimistic;
  setSaving(true);
  const {data,error:saveError}=await supabase.rpc('hanzi_record_practice_attempt',{
   expected_account:userKey,
   p_item_id:args.itemId,
   p_mode:args.mode,
   p_correct:args.correct,
   p_assisted:assisted,
   p_session_kind:args.sessionKind,
  });
  setSaving(false);
  if(saveError){
   setError('Practice history is saved on this device but has not synced yet.');
   return optimistic;
  }
  const row=rowsToState(data?[data]:[]);
  const remote=row[key];
  if(remote){
   setStates(previous=>{
    const next={...previous,[key]:remote};
    writeLocal(userKey,next);
    return next;
   });
  }
  setError('');
  return remote??optimistic;
 },[userKey]);

 const stats=useMemo(()=>{
  const values=Object.values(states);
  return {
   tracked:values.length,
   due:values.filter(row=>row.attempts>0&&row.nextReview<=Date.now()).length,
   weak:values.filter(row=>row.attempts>0&&(row.strength<0.55||row.misses>0)).length,
  };
 },[states]);

 return {states,loading,saving,error,record,stats};
}
