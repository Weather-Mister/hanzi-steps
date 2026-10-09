/**
 * Read-only change signal for desktop widgets.
 *
 * Call only AFTER the checkpoint RPC reports saved=true. Do not transmit the
 * checkpoint, username, lesson ID or progress values: observers use the signal
 * to re-fetch their own existing public widget summary.
 *
 * A failed notification must never fail an already-committed progress save.
 */
export const WIDGET_PROGRESS_EVENT='progress_saved';

export function widgetProgressTopic(account:string):string|null {
 return /^account-v1-[a-f0-9]{64}$/.test(account) ? `hanzi-progress:${account}` : null;
}

export async function broadcastWidgetProgress(
 account:string,
 projectUrl:string,
 publishableKey:string,
 send:typeof fetch=fetch,
):Promise<boolean> {
 const topic=widgetProgressTopic(account);
 if(!topic||!/^https:\/\/[-a-z0-9.]+$/.test(projectUrl)||!publishableKey)return false;
 try {
  const response=await send(`${projectUrl}/realtime/v1/api/broadcast`,{
   method:'POST',
   keepalive:true,
   headers:{'Content-Type':'application/json',apikey:publishableKey},
   body:JSON.stringify({messages:[{topic,event:WIDGET_PROGRESS_EVENT,payload:{}}]}),
  });
  return response.ok;
 } catch {
  return false; // Reconnect/resume always reloads the authoritative summary.
 }
}
