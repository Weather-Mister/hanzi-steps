import {FormEvent,useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {LearningApp} from '../components/learning-app';
import {supabase} from './supabase';
import '../app/globals.css';

const ACTIVE_USERNAME_KEY='hanziSteps.activeUsername';
const normalizeUsername=(value:string)=>value.trim().toLowerCase();
const validUsername=(value:string)=>/^[a-z0-9_]{2,32}$/.test(value);

function App(){
 const [account,setAccount]=useState<{key:string;username:string}|null>(null);
 const [username,setUsername]=useState('');
 const [busy,setBusy]=useState(true),[error,setError]=useState('');
 const attempt=useRef(0);

 async function connectUsername(raw:string){
  const name=normalizeUsername(raw);
  if(!validUsername(name)){
   setError('Use 2–32 letters, numbers, or underscores.');
   setBusy(false);
   return;
  }

  const version=++attempt.current;
  setBusy(true);setError('');
  try{
   const {data,error:claimError}=await supabase.rpc('hanzi_claim_username',{p_username:name});
   if(claimError)throw claimError;
   if(typeof data!=='string'||!/^account-v1-[a-f0-9]{64}$/.test(data))throw new Error('Invalid account');
   if(version!==attempt.current)return;
   localStorage.setItem(ACTIVE_USERNAME_KEY,name);
   setUsername(name);
   setAccount({key:data,username:name});
  }catch{
   if(version===attempt.current){
    setAccount(null);
    setError('This profile could not connect right now. Please try again.');
   }
  }finally{
   if(version===attempt.current)setBusy(false);
  }
 }

 useEffect(()=>{
  const remembered=normalizeUsername(localStorage.getItem(ACTIVE_USERNAME_KEY)||'');
  if(validUsername(remembered)){
   setUsername(remembered);
   void connectUsername(remembered);
  }else setBusy(false);
 },[]);

 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  void connectUsername(username);
 }

 function signOut(){
  attempt.current++;
  localStorage.removeItem(ACTIVE_USERNAME_KEY);
  setAccount(null);setUsername('');setError('');setBusy(false);
 }

 const signInPanel=<section className="account-panel">
  <div>
   <strong>Sign in to save your progress</strong>
   <p>Enter a username. The same username opens the same Hanzi Steps profile on any device.</p>
   {error&&<p role="alert">{error}</p>}
  </div>
  <form className="username-login" onSubmit={submit}>
   <input
    className="username-input"
    name="username"
    value={username}
    onChange={event=>setUsername(event.target.value)}
    placeholder="username"
    autoCapitalize="none"
    autoCorrect="off"
    spellCheck={false}
    maxLength={32}
    aria-label="Username"
    disabled={busy}
   />
   <button className="primary-button" disabled={busy} type="submit">{busy?'Connecting…':'Sign in'}</button>
  </form>
 </section>;

 const accountPanel=account?<section className="account-panel signed-in">
  <div><strong>Signed in</strong><p className="account-email">@{account.username}</p></div>
  <button className="text-button" disabled={busy} onClick={signOut}>Switch user</button>
 </section>:signInPanel;

 return <LearningApp
  key={account?.key||'signed-out'}
  userKey={account?.key||'signed-out'}
  accountPanel={accountPanel}
  signInPanel={signInPanel}
 />;
}

createRoot(document.getElementById('root')!).render(<App/>);
