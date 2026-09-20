'use client';
import {useCallback,useEffect,useState} from 'react';
import {supabase} from '@/pages/supabase';

const storageKey=(userKey:string)=>'hanzi-steps-mastered-v1-'+userKey;

function readLocal(userKey:string):Set<string>{
 try{
  const value:unknown=JSON.parse(localStorage.getItem(storageKey(userKey))||'[]');
  return new Set(Array.isArray(value)?value.filter(item=>typeof item==='string'):[]);
 }catch{return new Set();}
}

function writeLocal(userKey:string,values:Set<string>){
 try{localStorage.setItem(storageKey(userKey),JSON.stringify([...values]));}catch{}
}

export function useMegaMastery(userKey:string){
 const [mastered,setMastered]=useState<Set<string>>(new Set());
 const [loading,setLoading]=useState(true);
 const [saving,setSaving]=useState(false);
 const [error,setError]=useState('');

 useEffect(()=>{
  let cancelled=false;
  const cached=readLocal(userKey);
  setMastered(cached);
  setError('');
  if(userKey==='signed-out'){
   setLoading(false);
   return()=>{cancelled=true};
  }
  setLoading(true);
  void supabase.rpc('hanzi_read_mastered',{expected_account:userKey}).then(({data,error:readError})=>{
   if(cancelled)return;
   if(readError){
    setError('Mastered words could not sync. Your local list is still available.');
    setLoading(false);
    return;
   }
   const values=new Set(Array.isArray(data)?data.filter(item=>typeof item==='string') as string[]:[]);
   setMastered(values);
   writeLocal(userKey,values);
   setLoading(false);
  });
  return()=>{cancelled=true};
 },[userKey]);

 const setMasteredValue=useCallback(async(id:string,value:boolean)=>{
  setMastered(previous=>{
   const next=new Set(previous);
   if(value)next.add(id);else next.delete(id);
   writeLocal(userKey,next);
   return next;
  });
  if(userKey==='signed-out')return true;
  setSaving(true);
  const {error:saveError}=await supabase.rpc('hanzi_set_mastered',{
   expected_account:userKey,
   p_vocab_id:id,
   p_mastered:value,
  });
  setSaving(false);
  if(saveError){
   setError('Mastered words could not sync. Try again when you are online.');
   return false;
  }
  setError('');
  return true;
 },[userKey]);

 return {mastered,loading,saving,error,setMastered:setMasteredValue};
}
