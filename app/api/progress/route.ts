import {getProgressUserKey} from '@/lib/progress-user';
import {database} from '@/db/raw';
import {validSession} from '@/lib/curriculum';
import {completionTimestamp} from '@/lib/streak';

export const dynamic = 'force-dynamic';
const noStore = {'Cache-Control': 'no-store'};
const fail = (message: string, status = 503) => Response.json({error: message}, {status, headers: noStore});
import {studyDaysQuery} from '@/lib/study-days';

export async function GET() {
  const user = await getProgressUserKey();
  if (!user) return fail('Sign in to load your progress.', 401);
  try {
    const db=database();
    const [progress,activity] = await db.batch<Record<string,unknown>>([db.prepare(`
      SELECT id, lesson_id AS lessonId, position AS "index", independent, assisted,
        complete, updated_at AS updatedAt
      FROM (
        SELECT *, ROW_NUMBER() OVER (
          PARTITION BY lesson_id, complete ORDER BY updated_at DESC
        ) AS rank FROM practice_sessions WHERE user_id = ?
      ) WHERE rank = 1 ORDER BY updated_at DESC
    `).bind(user),studyDaysQuery(db,user)]);
    return Response.json({sessions: progress.results.map(r => ({...r, complete: !!r.complete})),studyDays:activity.results.map(r=>r.day).filter(day=>typeof day==='string')}, {headers: noStore});
  } catch (error) {
    console.error('Progress read failed', error);
    return fail('Your progress could not be loaded. Please try again.');
  }
}

export async function PUT(request: Request) {
  const user = await getProgressUserKey();
  if (!user) return fail('Sign in to save your progress.', 401);
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return fail('Request origin does not match.', 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return fail('Expected JSON.', 415);
  if (Number(request.headers.get('content-length') || 0) > 8000) return fail('Request too large.', 413);
  let session: unknown;
  try { session = await request.json(); } catch { return fail('Invalid request.', 400); }
  if (!validSession(session)) return fail('Invalid lesson checkpoint.', 400);
  const s = session;
  try {
    const db = database();
    const result = await db.prepare(`
      INSERT INTO practice_sessions(id,user_id,lesson_id,position,independent,assisted,complete,updated_at,completed_at)
      VALUES(?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET
        position=excluded.position, independent=excluded.independent,
        assisted=excluded.assisted, complete=excluded.complete, updated_at=excluded.updated_at,
        completed_at=CASE
          WHEN practice_sessions.complete=1 THEN COALESCE(practice_sessions.completed_at,practice_sessions.updated_at)
          WHEN excluded.complete=1 THEN excluded.completed_at
          ELSE NULL END
      WHERE practice_sessions.user_id=excluded.user_id
        AND practice_sessions.lesson_id=excluded.lesson_id
        AND excluded.position>=practice_sessions.position
    `).bind(s.id, user, s.lessonId, s.index, s.independent, s.assisted, Number(s.complete), Date.now(),s.complete?completionTimestamp(s.updatedAt):null).run();
    if (!result.meta.changes) {
      // A delayed retry is already saved only when this account owns an equal
      // or later checkpoint. An ID collision must not receive a false receipt.
      const existing = await db.prepare(`
        SELECT id FROM practice_sessions
        WHERE id=? AND user_id=? AND lesson_id=? AND position>=?
      `).bind(s.id, user, s.lessonId, s.index).first();
      if (!existing) return fail('This checkpoint could not be confirmed. Please reload your progress.', 409);
    }
    const activity=s.complete?await studyDaysQuery(db,user).all():null;
    return Response.json({saved: true,...(activity?{studyDays:activity.results.map(r=>r.day).filter(day=>typeof day==='string')}:{})}, {headers: noStore});
  } catch (error) {
    console.error('Progress save failed', error);
    return fail('Your progress has not synced yet. Keep this tab open and try again.');
  }
}
