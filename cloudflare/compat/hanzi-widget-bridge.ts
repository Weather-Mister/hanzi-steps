// Transitional read-only bridge for installed widgets and the schedule proxy.
// Substitute the verified Worker URL before deploying as hanzi-widget. Keep the
// existing platform JWT setting. This reads no Supabase tables or secrets.
const BACKEND_URL='https://hanzi-steps-api.weatherisgood06.workers.dev';
Deno.serve(async(request:Request)=>{
 const headers={'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
 if(request.method!=='GET')return new Response(JSON.stringify({error:'GET required.'}),{status:405,headers});
 try{
  const source=new URL(request.url),target=new URL('/widget',BACKEND_URL);
  for(const key of ['username','account']){const value=source.searchParams.get(key);if(value)target.searchParams.set(key,value);}
  const response=await fetch(target,{signal:AbortSignal.timeout(10000),redirect:'manual'});
  return new Response(await response.text(),{status:response.status,headers});
 }catch{return new Response(JSON.stringify({error:'Hanzi widget data is temporarily unavailable.'}),{status:503,headers});}
});
