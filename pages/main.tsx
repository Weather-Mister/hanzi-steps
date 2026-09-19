import {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import type {Session} from '@supabase/supabase-js';
import {LearningApp} from '../components/learning-app';
import {supabase} from './supabase';
import '../app/globals.css';

function App(){
 const [account,setAccount]=useState<{key:string;email:string}|null>(null);
 const [busy,setBusy]=useState(true),[error,setError]=useState('');
 const currentUser=useRef<string|null>(null),revision=useRef(0);
 useEffect(()=>{
  let alive=true;
  async function connect(session:Session|null){
   const version=++revision.current;
   if(!session){currentUser.current=null;setAccount(null);setBusy(false);return;}
   if(currentUser.current===session.user.id)return;
   setBusy(true);setAccount(null);
   try{
    const {data,error:claimError}=await supabase.rpc('hanzi_claim_account');
    if(claimError)throw claimError;
    if(typeof data!=='string'||!/^account-v1-[a-f0-9]{64}$/.test(data))throw new Error('Invalid account');
    if(alive&&version===revision.current){currentUser.current=session.user.id;setAccount({key:data,email:session.user.email||''});setError('');}
   }catch{if(alive&&version===revision.current)setError('Your account could not connect. Sign in with the same Google email you used for Hanzi Steps.');}
   finally{if(alive&&version===revision.current)setBusy(false);}
  }
  // Leave the auth callback synchronous to avoid holding Supabase's auth lock.
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setTimeout(()=>{if(alive)void connect(session)},0)});
  void supabase.auth.getSession().then(({data,error:sessionError})=>{if(!alive)return;if(sessionError){setError('Sign-in could not be restored. Please try again.');setBusy(false);}else void connect(data.session)});
  const params=new URLSearchParams(location.search),hash=new URLSearchParams(location.hash.slice(1));
  if(params.has('error')||hash.has('error')){setError('Google sign-in was not completed. Please try again.');history.replaceState(null,'',location.pathname);}
  return()=>{alive=false;revision.current++;subscription.unsubscribe()};
 },[]);
 async function signIn(){
  setBusy(true);setError('');
  try{
   const {error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:new URL(import.meta.env.BASE_URL,location.origin).href}});
   if(error)throw error;
  }catch{setError('Google sign-in is unavailable. Please try again shortly.');setBusy(false);}
 }
 async function signOut(){
  setBusy(true);setError('');
  const {error}=await supabase.auth.signOut({scope:'local'});
  if(error)setError('Sign-out could not complete. Please try again.');
  setBusy(false);
 }
 const signInPanel=<section className="account-panel"><div><strong>Sign in to save your progress</strong><p>Your practice on this device can sync after you sign in.</p>{error&&<p role="alert">{error}</p>}</div><button className="primary-button" disabled={busy} onClick={()=>void signIn()}>{busy?'Connecting…':'Sign in with Google'}</button></section>;
 const accountPanel=account?<section className="account-panel signed-in"><div><strong>Signed in</strong><p className="account-email">{account.email}</p>{error&&<p role="alert">{error}</p>}</div><button className="text-button" disabled={busy} onClick={()=>void signOut()}>Sign out</button></section>:signInPanel;
 return <LearningApp key={account?.key||'signed-out'} userKey={account?.key||'signed-out'} accountPanel={accountPanel} signInPanel={signInPanel}/>;
}

createRoot(document.getElementById('root')!).render(<App/>);
