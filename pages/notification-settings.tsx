import {useEffect,useState} from 'react';
import {Bell,BookOpen,Flame,Sparkles} from 'lucide-react';
import {Switch} from '@/components/ui/switch';
import {supabase} from './supabase';

const VAPID_PUBLIC_KEY='BEja82dxXHbHlF3YjTAA3-QEWG3IfwNXgrjOSbwh37hebp5SDg9A1FJZP2AfFOvN6X1sjWc7ngFa6fgR0dOtgVE';
const BASE_URL=import.meta.env.BASE_URL;

type PushPrefs={
 enabled:boolean;
 streakReminders:boolean;
 encouragement:boolean;
 sentenceChecks:boolean;
};
const DEFAULTS:PushPrefs={enabled:false,streakReminders:true,encouragement:true,sentenceChecks:true};

function supported(){
 return typeof window!=='undefined'&&'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;
}
function isAppleMobile(){
 return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function isStandalone(){
 return window.matchMedia('(display-mode: standalone)').matches||Boolean((navigator as Navigator&{standalone?:boolean}).standalone);
}
function applicationServerKey(value:string){
 const padding='='.repeat((4-value.length%4)%4);
 const base64=(value+padding).replace(/-/g,'+').replace(/_/g,'/');
 const raw=atob(base64);
 return Uint8Array.from(raw,char=>char.charCodeAt(0));
}
async function existingSubscription(){
 const registration=await navigator.serviceWorker.getRegistration(BASE_URL);
 return registration?.pushManager.getSubscription()||null;
}
async function activeRegistration(){
 const registration=await navigator.serviceWorker.register(`${BASE_URL}push-sw.js`,{scope:BASE_URL});
 await navigator.serviceWorker.ready;
 return registration;
}

export function NotificationSettings({accountKey}:{accountKey:string|null}){
 const [prefs,setPrefs]=useState<PushPrefs>(DEFAULTS);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 const [available,setAvailable]=useState<boolean|null>(null);
 const [permission,setPermission]=useState<NotificationPermission>('default');

 useEffect(()=>{
  let cancelled=false;
  async function load(){
   const ok=supported();
   if(cancelled)return;
   setAvailable(ok);
   if(!ok){setMessage('Push notifications are not available in this browser.');return}
   setPermission(Notification.permission);
   if(isAppleMobile()&&!isStandalone()){
    setMessage('On iPhone or iPad, add Hanzi Steps to your Home Screen first, then enable notifications from the installed app.');
   }
   if(!accountKey){setPrefs(DEFAULTS);return}
   try{
    const subscription=await existingSubscription();
    if(cancelled||!subscription)return;
    const {data,error}=await supabase.rpc('hanzi_push_read',{expected_account:accountKey,expected_endpoint:subscription.endpoint});
    if(error)throw error;
    if(cancelled||!data)return;
    setPrefs({
     enabled:Boolean(data.enabled),
     streakReminders:data.streakReminders!==false,
     encouragement:data.encouragement!==false,
     sentenceChecks:data.sentenceChecks!==false,
    });
    if(data.enabled)setMessage('Enabled on this device.');
   }catch{
    if(!cancelled)setMessage('Notification settings could not load right now.');
   }
  }
  void load();
  return()=>{cancelled=true};
 },[accountKey]);

 async function persist(next:PushPrefs,subscription:PushSubscription){
  if(!accountKey)throw new Error('Sign in first.');
  const json=subscription.toJSON();
  if(!json.endpoint||!json.keys?.p256dh||!json.keys?.auth)throw new Error('This browser did not provide a complete push subscription.');
  const {error}=await supabase.rpc('hanzi_push_upsert',{
   expected_account:accountKey,
   push_subscription:{endpoint:json.endpoint,keys:{p256dh:json.keys.p256dh,auth:json.keys.auth}},
   push_preferences:{
    streakReminders:next.streakReminders,
    encouragement:next.encouragement,
    sentenceChecks:next.sentenceChecks,
   },
  });
  if(error)throw error;
 }

 async function enable(){
  if(!accountKey){setMessage('Sign in to a Hanzi Steps profile before enabling notifications.');return}
  if(!supported()){setMessage('Push notifications are not available in this browser.');return}
  if(isAppleMobile()&&!isStandalone()){
   setMessage('Add Hanzi Steps to your Home Screen first, then open the installed app and enable notifications here.');
   return;
  }
  setBusy(true);setMessage('');
  try{
   const result=await Notification.requestPermission();
   setPermission(result);
   if(result!=='granted'){
    setMessage(result==='denied'?'Notifications are blocked. Allow them in your device settings to use reminders.':'Notification permission was not granted.');
    return;
   }
   const registration=await activeRegistration();
   let subscription=await registration.pushManager.getSubscription();
   if(!subscription){
    subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:applicationServerKey(VAPID_PUBLIC_KEY)});
   }
   const next={...prefs,enabled:true};
   await persist(next,subscription);
   setPrefs(next);
   setMessage('Enabled on this device.');
  }catch(error){
   setMessage(error instanceof Error?error.message:'Notifications could not be enabled.');
  }finally{setBusy(false)}
 }

 async function disable(){
  setBusy(true);setMessage('');
  try{
   const subscription=await existingSubscription();
   if(subscription&&accountKey){
    const {error}=await supabase.rpc('hanzi_push_disable',{expected_account:accountKey,expected_endpoint:subscription.endpoint});
    if(error)throw error;
    await subscription.unsubscribe();
   }
   setPrefs(current=>({...current,enabled:false}));
   setMessage('Notifications are off on this device.');
  }catch{
   setMessage('Notifications could not be turned off right now.');
  }finally{setBusy(false)}
 }

 async function update<K extends 'streakReminders'|'encouragement'|'sentenceChecks'>(key:K,value:boolean){
  if(!prefs.enabled||busy)return;
  const next={...prefs,[key]:value};
  setPrefs(next);
  setBusy(true);setMessage('');
  try{
   const subscription=await existingSubscription();
   if(!subscription)throw new Error('Push subscription is missing. Turn notifications off and on again.');
   await persist(next,subscription);
   setMessage('Notification preferences saved.');
  }catch(error){
   setPrefs(prefs);
   setMessage(error instanceof Error?error.message:'Notification preferences could not be saved.');
  }finally{setBusy(false)}
 }

 const masterDisabled=busy||!accountKey||available===false||(isAppleMobile()&&!isStandalone());
 return <section className="notification-settings" aria-labelledby="notification-settings-title">
  <div className="notification-settings-heading">
   <div className="notification-settings-icon"><Bell size={20}/></div>
   <div><h3 id="notification-settings-title">Notifications</h3><p>Optional reminders and tiny reading checks. Nothing is sent unless you turn this on.</p></div>
  </div>
  <div className="preference-row">
   <label htmlFor="notification-master"><strong>Allow notifications</strong><span>{prefs.enabled?'Hanzi Steps can notify this device.':'Off by default.'}</span></label>
   <Switch id="notification-master" checked={prefs.enabled} disabled={masterDisabled} onCheckedChange={value=>void(value?enable():disable())}/>
  </div>
  <div className="notification-kind-row">
   <Flame size={18}/><label htmlFor="notification-streak"><strong>Streak reminders</strong><span>If your current streak is still waiting late in the day.</span></label>
   <Switch id="notification-streak" checked={prefs.streakReminders} disabled={!prefs.enabled||busy} onCheckedChange={value=>void update('streakReminders',value)}/>
  </div>
  <div className="notification-kind-row">
   <Sparkles size={18}/><label htmlFor="notification-encouragement"><strong>Occasional encouragement</strong><span>A light nudge a few times a week, never every day.</span></label>
   <Switch id="notification-encouragement" checked={prefs.encouragement} disabled={!prefs.enabled||busy} onCheckedChange={value=>void update('encouragement',value)}/>
  </div>
  <div className="notification-kind-row">
   <BookOpen size={18}/><label htmlFor="notification-sentences"><strong>Chinese sentence checks</strong><span>Original, pinyin-free sentences around the level of the last 3–4 units you reached.</span></label>
   <Switch id="notification-sentences" checked={prefs.sentenceChecks} disabled={!prefs.enabled||busy} onCheckedChange={value=>void update('sentenceChecks',value)}/>
  </div>
  {permission==='denied'&&<p className="notification-status error">Notifications are blocked by the device. Change the permission in system settings, then return here.</p>}
  {message&&permission!=='denied'&&<p className="notification-status" role="status">{message}</p>}
 </section>;
}
