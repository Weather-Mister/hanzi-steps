import type {database} from '@/db/raw';

// Use all completed attempts, not only the latest checkpoint per lesson. An
// older completion predating the feature uses its existing saved timestamp.
export function studyDaysQuery(db:ReturnType<typeof database>,user:string){
 return db.prepare(`
  SELECT DISTINCT date(COALESCE(completed_at,updated_at)/1000,'unixepoch','+8 hours') AS day
  FROM practice_sessions WHERE user_id=? AND complete=1
  ORDER BY day
 `).bind(user);
}

