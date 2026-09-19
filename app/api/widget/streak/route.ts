import {database} from '@/db/raw';
import {studyDaysQuery} from '@/lib/study-days';
import {streakFromDays} from '@/lib/streak';

export const dynamic = 'force-dynamic';
const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};

// Intentionally public, read-only summary. The hash is an account identifier,
// NOT authentication. Never use this route's input for progress writes.
export async function GET(request: Request) {
  const account = new URL(request.url).searchParams.get('account') || '';
  if (!/^account-v1-[a-f0-9]{64}$/.test(account))
    return Response.json({error:'Invalid account identifier.'},{status:400,headers});
  try {
    const activity = await studyDaysQuery(database(),account).all<{day:string}>();
    const now = Date.now();
    const {current,practicedToday,today} = streakFromDays(activity.results.map(row=>row.day),now);
    // Empty/unknown accounts share the same response, without account details.
    return Response.json({current,practicedToday,day:today,capturedAt:new Date(now).toISOString()},{headers});
  } catch {
    return Response.json({error:'Streak temporarily unavailable.'},{status:503,headers});
  }
}
