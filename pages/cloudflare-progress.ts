import type {Session} from '../lib/curriculum';
import {backend} from './cloudflare-backend';
export async function progressRequest(method:'GET'|'PUT',account:string,body:Session|undefined,signal:AbortSignal){
 const {data,error,status}=await backend.rpc(method==='GET'?'hanzi_read_progress':'hanzi_save_progress',{
  expected_account:account,...(method==='PUT'?{checkpoint:body}:{})
 }).abortSignal(signal);
 if(error){const unauthorized=error.code==='28000'||status===401;return Response.json({error:unauthorized?'Sign in to sync your progress.':'Your progress has not synced yet. Please try again.'},{status:unauthorized?401:status>=400?status:503});}
 return Response.json(data);
}
