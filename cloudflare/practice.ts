import {ApiError,string,practiceColumns,type Args} from './contracts';
export async function readPractice(db:D1Database,account:string){
 return (await db.prepare(`SELECT ${practiceColumns} FROM practice_skill_state WHERE user_id=? ORDER BY item_id,mode`).bind(account).all()).results;
}
export async function recordPractice(db:D1Database,account:string,args:Args){
 const {p_attempt_id:id,p_item_id:item,p_mode:mode,p_correct:correct,p_assisted:assisted,p_session_kind:kind}=args;
 if(!string(id,36,36)||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(id)||
  !string(item)||!string(mode)||!['recognition','recall','pinyin','input','sentence','handwriting','context'].includes(mode)||
  typeof correct!=='boolean'||typeof assisted!=='boolean'||!string(kind)||!['lesson','daily','revenge','mega','taiwan'].includes(kind))
  throw new ApiError('Invalid practice attempt.');
 const [,prior,state]=await db.batch<Args>([
  db.prepare('INSERT INTO practice_attempt_events(user_id,attempt_id,item_id,mode,correct,assisted,session_kind,created_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(user_id,attempt_id) DO NOTHING')
   .bind(account,id,item,mode,Number(correct),Number(assisted),kind,new Date().toISOString()),
  db.prepare('SELECT item_id,mode,correct,assisted,session_kind FROM practice_attempt_events WHERE user_id=? AND attempt_id=?').bind(account,id),
  db.prepare(`SELECT ${practiceColumns} FROM practice_skill_state WHERE user_id=? AND item_id=? AND mode=?`).bind(account,item,mode)
 ]);
 const row=prior.results[0];
 if(!row||row.item_id!==item||row.mode!==mode||!!row.correct!==correct||!!row.assisted!==assisted||row.session_kind!==kind)
  throw new ApiError('Attempt identifier was reused with different data.');
 return state.results[0]||null;
}
export async function readMastered(db:D1Database,account:string){
 return (await db.prepare('SELECT vocab_id FROM mastered_vocab WHERE user_id=? ORDER BY vocab_id').bind(account).all<{vocab_id:string}>()).results.map(row=>row.vocab_id);
}
export async function setMastered(db:D1Database,account:string,args:Args){
 if(!string(args.p_vocab_id)||typeof args.p_mastered!=='boolean')throw new ApiError('Invalid mastered word.');
 if(args.p_mastered)await db.prepare('INSERT INTO mastered_vocab(user_id,vocab_id,created_at) VALUES(?,?,?) ON CONFLICT DO NOTHING').bind(account,args.p_vocab_id,new Date().toISOString()).run();
 else await db.prepare('DELETE FROM mastered_vocab WHERE user_id=? AND vocab_id=?').bind(account,args.p_vocab_id).run();
 return {saved:true};
}
