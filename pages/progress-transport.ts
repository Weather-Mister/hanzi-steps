import type {Session} from '../lib/curriculum';
import {supabase} from './supabase';
import {broadcastWidgetProgress} from './widget-notify';

// Best-effort notification for Übersicht. Only the account-scoped topic is
// transmitted; the saved checkpoint and any curriculum data remain on the server.
// Coalesce bursts of saves to avoid waking desktop widgets on every rapid step.
const notificationTimers=new Map<string,ReturnType<typeof setTimeout>>();
function notifyDesktopWidgets(account:string){
 if(notificationTimers.has(account))return;
 notificationTimers.set(account,setTimeout(()=>{
  notificationTimers.delete(account);
  void broadcastWidgetProgress(account,supabase.supabaseUrl,supabase.supabaseKey);
 },250));
}

export async function progressRequest(method:'GET'|'PUT', account:string, body:Session|undefined, signal:AbortSignal){
 const call=method==='GET'
  ?supabase.rpc('hanzi_read_progress',{expected_account:account})
  :supabase.rpc('hanzi_save_progress',{expected_account:account,checkpoint:body});
 const {data,error,status}=await call.abortSignal(signal);
 if(error){
  const unauthorized=error.code==='28000'||status===401;
  return Response.json({error:unauthorized?'Sign in to sync your progress.':'Your progress has not synced yet. Please try again.'},{status:unauthorized?401:status>=400?status:503});
 }
 if(method==='PUT'&&data?.saved===true)notifyDesktopWidgets(account);
 return Response.json(data);
}
