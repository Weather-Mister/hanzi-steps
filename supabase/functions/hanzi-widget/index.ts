import {streakFromDays} from './streak.ts';

// Platform JWT verification is enabled. Widgets may use the project's public
// legacy anon JWT; no privileged key ever leaves this server function.
Deno.serve(async (request: Request) => {
  const headers = {'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
  const reply = (data: unknown, status=200) => new Response(JSON.stringify(data), {status, headers});
  if (request.method !== 'GET') return reply({error:'Method not allowed.'},405);
  const account = new URL(request.url).searchParams.get('account') || '';
  if (!/^account-v1-[a-f0-9]{64}$/.test(account)) return reply({error:'Invalid account identifier.'},400);
  try {
    const url = Deno.env.get('SUPABASE_URL');
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!url || !key) throw new Error('Missing server configuration');
    const response = await fetch(`${url}/rest/v1/rpc/hanzi_widget_days`, {
      method:'POST', headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
      body:JSON.stringify({account_key:account}),signal:AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error('Unavailable');
    const days = await response.json();
    if (!Array.isArray(days) || !days.every(day=>typeof day==='string')) throw new Error('Invalid data');
    const now=Date.now();
    const {current,practicedToday,today}=streakFromDays(days,now);
    return reply({current,practicedToday,day:today,capturedAt:new Date(now).toISOString()});
  } catch { return reply({error:'Streak temporarily unavailable.'},503); }
});

