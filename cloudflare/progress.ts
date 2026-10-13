import {ApiError,object,string,type Args} from './contracts';

type Checkpoint={id:string;lessonId:string;index:number;independent:number;assisted:number;complete:boolean;updatedAt:number};
export async function studyDays(db:D1Database,account:string){
 const rows=await db.prepare("SELECT DISTINCT date(COALESCE(completed_at,updated_at)/1000.0,'unixepoch','+8 hours') AS day FROM hanzi_sessions WHERE user_id=? AND complete=1 ORDER BY day").bind(account).all<{day:string}>();
 return rows.results.map(row=>row.day);
}
export async function readProgress(db:D1Database,account:string){
 const rows=await db.prepare(`SELECT id,lesson_id AS lessonId,position AS "index",independent,assisted,complete,updated_at AS updatedAt
 FROM (SELECT *,ROW_NUMBER() OVER(PARTITION BY lesson_id,complete ORDER BY updated_at DESC,id) AS rank
 FROM hanzi_sessions WHERE user_id=?) WHERE rank=1 ORDER BY updated_at DESC,id`).bind(account).all<Args>();
 return {sessions:rows.results.map(row=>({...row,complete:!!row.complete})),studyDays:await studyDays(db,account)};
}
async function validate(db:D1Database,value:unknown):Promise<Checkpoint>{
 if(!object(value)||new TextEncoder().encode(JSON.stringify(value)).length>8000||
  !string(value.id,20,80)||!/^[a-zA-Z0-9-]{20,80}$/.test(value.id)||!string(value.lessonId,1,200)||
  !Number.isSafeInteger(value.index)||!Number.isSafeInteger(value.independent)||!Number.isSafeInteger(value.assisted)||
  typeof value.complete!=='boolean'||typeof value.updatedAt!=='number'||!Number.isFinite(value.updatedAt))
  throw new ApiError('Invalid lesson checkpoint.');
 const s=value as Checkpoint;
 const lesson=await db.prepare('SELECT steps,historical_steps FROM lesson_lengths WHERE lesson_id=?').bind(s.lessonId).first<{steps:number;historical_steps:string}>();
 if(!lesson||s.index<0||s.index>lesson.steps||s.independent<0||s.assisted<0||s.independent+s.assisted>s.index||
  (s.complete?!(s.index===lesson.steps||(JSON.parse(lesson.historical_steps) as number[]).includes(s.index)):s.index>=lesson.steps))
  throw new ApiError('Invalid lesson checkpoint.');
 return s;
}
export async function saveProgress(db:D1Database,account:string,value:unknown,now=Date.now()){
 const s=await validate(db,value);
 const completed=s.complete?(s.updatedAt>0?Math.floor(Math.min(s.updatedAt,now)):now):null;
 const [write,receipt]=await db.batch([
  db.prepare(`INSERT INTO hanzi_sessions(id,user_id,lesson_id,position,independent,assisted,complete,updated_at,completed_at)
  VALUES(?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET position=excluded.position,independent=excluded.independent,
  assisted=excluded.assisted,complete=excluded.complete,updated_at=excluded.updated_at,
  completed_at=CASE WHEN hanzi_sessions.complete=1 THEN COALESCE(hanzi_sessions.completed_at,hanzi_sessions.updated_at)
  WHEN excluded.complete=1 THEN excluded.completed_at ELSE NULL END
  WHERE hanzi_sessions.user_id=excluded.user_id AND hanzi_sessions.lesson_id=excluded.lesson_id
  AND excluded.position>=hanzi_sessions.position AND (hanzi_sessions.complete=0 OR excluded.complete=1)`)
  .bind(s.id,account,s.lessonId,s.index,s.independent,s.assisted,Number(s.complete),now,completed),
  db.prepare('SELECT 1 FROM hanzi_sessions WHERE id=? AND user_id=? AND lesson_id=? AND (position>=? OR complete=1)').bind(s.id,account,s.lessonId,s.index)
 ]);
 if(!write.meta.changes&&!receipt.results.length)throw new ApiError('This checkpoint could not be confirmed.',409,'23505');
 return {saved:true,...(s.complete?{studyDays:await studyDays(db,account)}:{})};
}
