type Result={data:any;error:{message:string;code:string}|null;status:number};
// RPC result semantics match the existing client hooks; their local queues,
// account keys, retry IDs, cancellation and recovery storage stay intact.
export function cloudflareClient(base:string,send:typeof fetch=fetch){
 async function call(path:string,args:unknown,signal?:AbortSignal):Promise<Result>{
  try{
   const response=await send(base+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(args),signal:signal||AbortSignal.timeout(12000)});
   const data=await response.json();
   if(!response.ok)return {data:null,error:{message:data?.error||'Cloud progress is temporarily unavailable.',code:data?.code||'BACKEND_UNAVAILABLE'},status:response.status};
   return {data,error:null,status:response.status};
  }catch{return {data:null,error:{message:'Cloud progress could not connect. Your local drafts are kept.',code:'NETWORK_ERROR'},status:503};}
 }
 function rpc(name:string,args:Record<string,unknown>={}){
  // Lazy, thenable request: abortSignal must be applied before a save starts.
  let signal:AbortSignal|undefined;
  let pending:Promise<Result>|undefined;
  const run=()=>pending??=call('/rpc/'+name,args,signal);
  return {
   abortSignal(value:AbortSignal){signal=value;return run();},
   then<TResult1=Result,TResult2=never>(onfulfilled?:((value:Result)=>TResult1|PromiseLike<TResult1>)|null,onrejected?:((reason:any)=>TResult2|PromiseLike<TResult2>)|null){return run().then(onfulfilled,onrejected);}
  };
 }
 return {rpc,functions:{invoke(name:string,{body}:{body:unknown}){return call('/functions/v1/'+name,body);}}};
}
