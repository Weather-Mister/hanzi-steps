import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';

export const snapshotTables={
 username_accounts:['username','legacy_user_id','created_at'],
 lesson_lengths:['lesson_id','steps','historical_steps'],
 hanzi_sessions:['id','user_id','lesson_id','position','independent','assisted','complete','updated_at','completed_at'],
 mastered_vocab:['user_id','vocab_id','created_at'],
 practice_skill_state:['user_id','item_id','mode','attempts','correct','assisted','misses','streak','strength','last_seen','next_review','clean_correct','clean_tracked'],
 practice_attempt_events:['user_id','attempt_id','item_id','mode','correct','assisted','session_kind','created_at'],
 hanzi_push_subscriptions:['endpoint','user_id','p256dh','auth','enabled','streak_reminders','encouragement','sentence_checks','created_at','updated_at','last_sent_at','last_streak_day','last_encouragement_at','last_sentence_at','last_sentence_id','failure_count'],
 hanzi_push_log:['id','user_id','kind','sentence_id','sent_at'],
};
export function sqliteValue(value,column){
 if(column==='historical_steps')return JSON.stringify(value);
 if(typeof value==='boolean')return Number(value);
 if(value===null)return null;
 if(typeof value==='string'||(typeof value==='number'&&Number.isFinite(value)))return value;
 throw new Error('Invalid snapshot field: '+column);
}
const literal=(value)=>value===null?'NULL':typeof value==='number'?String(value):"'"+value.replace(/'/g,"''")+"'";
export function validateSnapshot(snapshot){
 if(!snapshot?.exportedAt||!Number.isFinite(Date.parse(snapshot.exportedAt))||!snapshot.tables)throw new Error('Missing snapshot metadata');
 for(const [table,columns] of Object.entries(snapshotTables)){
  if(!Array.isArray(snapshot.tables[table]))throw new Error('Missing snapshot table: '+table);
  for(const row of snapshot.tables[table])for(const column of columns){
   if(!Object.hasOwn(row,column))throw new Error('Missing snapshot field: '+table+'.'+column);
   sqliteValue(row[column],column);
  }
 }
 // Historical rows without a current username are archived too. They must
 // not be discarded, assigned a guessed username or exposed as new profiles.
 for(const row of snapshot.tables.username_accounts)
  if(!/^[a-z0-9_]{2,32}$/.test(row.username)||!/^account-v1-[a-f0-9]{64}$/.test(row.legacy_user_id))throw new Error('Invalid username mapping');

}
export function snapshotStatements(snapshot){
 validateSnapshot(snapshot);
 // Staging-only. Refuse to overwrite an active/populated backend, and disable
 // the aggregate trigger while importing historical events. Their aggregates
 // are imported exactly, rather than recalculated or counted a second time.
 const trigger=readFileSync(new URL('../cloudflare/migrations/0001_hanzi.sql',import.meta.url),'utf8').match(/CREATE TRIGGER practice_event_added[\s\S]*?\nEND;/)[0];
 const statements=[
  'CREATE TABLE IF NOT EXISTS import_guard (ok INTEGER CHECK(ok=1));',
  "INSERT INTO import_guard(ok) SELECT CASE WHEN (SELECT value FROM migration_state WHERE key='ready')='false' AND NOT EXISTS(SELECT 1 FROM username_accounts) AND NOT EXISTS(SELECT 1 FROM hanzi_sessions) AND NOT EXISTS(SELECT 1 FROM practice_attempt_events) THEN 1 ELSE 0 END;",
  'DROP TRIGGER IF EXISTS practice_event_added;'
 ];
 for(const [table,columns] of Object.entries(snapshotTables)){
  const rows=snapshot.tables[table];
  // Modest chunks stay below D1's SQL statement size limit.
  for(let offset=0;offset<rows.length;offset+=25){
   const values=rows.slice(offset,offset+25).map(row=>'('+columns.map(column=>literal(sqliteValue(row[column],column))).join(',')+')');
   statements.push(`INSERT INTO ${table}(${columns.join(',')}) VALUES ${values.join(',')};`);
  }
 }
 statements.push(trigger,`INSERT INTO migration_state(key,value) VALUES('exportedAt',${literal(snapshot.exportedAt)}) ON CONFLICT(key) DO UPDATE SET value=excluded.value;`,'DROP TABLE import_guard;');
 return statements;
}
export function snapshotToSQL(snapshot){
 return snapshotStatements(snapshot).join('\n')+'\n';
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 const [input,output]=process.argv.slice(2);
 if(!input||!output)throw new Error('Usage: node scripts/cloudflare-snapshot.mjs <private snapshot.json> <private import.sql>');
 const snapshot=JSON.parse(readFileSync(input,'utf8'));
 writeFileSync(output,snapshotToSQL(snapshot),{mode:0o600});
 console.log('Prepared Hanzi-only staging import:',Object.fromEntries(Object.entries(snapshot.tables).map(([table,rows])=>[table,rows.length])));
}
