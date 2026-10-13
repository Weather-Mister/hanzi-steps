import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {build} from 'esbuild';
import {Miniflare} from 'miniflare';
import {snapshotStatements,snapshotTables,sqliteValue} from './cloudflare-snapshot.mjs';
const file=process.argv[2];if(!file)throw new Error('Usage: node scripts/verify-cloudflare-import.mjs <private snapshot.json>');
const snapshot=JSON.parse(await readFile(file,'utf8'));
const temp=await mkdtemp(path.join(tmpdir(),'hanzi-import-'));
const built=await build({entryPoints:['cloudflare/worker.ts'],bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['cloudflare:workers']});
const mf=new Miniflare({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-05-22',d1Databases:['DB'],d1Persist:path.join(temp,'d1'),bindings:{ALLOWED_ORIGINS:'https://weather-mister.github.io',PUSH_ENABLED:'false'}});
try{
 const db=await mf.getD1Database('DB');
 const schema=await readFile('cloudflare/migrations/0001_hanzi.sql','utf8');
 const trigger=schema.match(/CREATE TRIGGER practice_event_added[\s\S]*?\nEND;/)[0];
 for(const statement of schema.replace(trigger,'').split(';'))if(statement.trim())await db.prepare(statement).run();
 await db.prepare(trigger).run();
 const statements=snapshotStatements(snapshot);
 for(let offset=0;offset<statements.length;offset+=15)await db.batch(statements.slice(offset,offset+15).map(sql=>db.prepare(sql)));
 const stable=row=>JSON.stringify(row);
 for(const [table,columns] of Object.entries(snapshotTables)){
  const actual=(await db.prepare('SELECT '+columns.join(',')+' FROM '+table).all()).results.map(row=>columns.map(key=>row[key])).map(stable).sort();
  const expected=snapshot.tables[table].map(row=>columns.map(key=>sqliteValue(row[key],key))).map(stable).sort();
  // Do not print rows if verification fails: private keys and learner data stay
  // in the ignored snapshot, never CI logs or committed test fixtures.
  if(JSON.stringify(actual)!==JSON.stringify(expected))throw new Error('Field comparison failed: '+table);
  console.log(table+': '+actual.length+' rows, every imported field matches');
 }
 const source=JSON.stringify((await db.prepare('SELECT * FROM practice_skill_state').all()).results);
 const retry=snapshot.tables.practice_attempt_events[0];
 if(retry){
  await db.prepare('INSERT INTO practice_attempt_events(user_id,attempt_id,item_id,mode,correct,assisted,session_kind,created_at) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT DO NOTHING').bind(...snapshotTables.practice_attempt_events.map(key=>sqliteValue(retry[key],key))).run();
  assert.equal(JSON.stringify((await db.prepare('SELECT * FROM practice_skill_state').all()).results),source);
 }
 await assert.rejects(()=>db.batch(statements.slice(0,2).map(sql=>db.prepare(sql))));
 // An imported backend still fails closed until a separate verified activation.
 const response=await mf.dispatchFetch('https://hanzi.test/rpc/hanzi_read_progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({expected_account:snapshot.tables.username_accounts[0].legacy_user_id})});
 assert.equal(response.status,503);
 console.log('Historical retry leaves imported aggregates unchanged; overwrite guard and staging gate pass.');
 // Apply generated curriculum bounds and check all current core, optional and
 // standalone character lessons after the exact source comparison.
 const metadata=await readFile('cloudflare/lesson-lengths.sql','utf8');
 const updates=metadata.split(';').filter(statement=>statement.trim());
 for(let offset=0;offset<updates.length;offset+=15)await db.batch(updates.slice(offset,offset+15).map(sql=>db.prepare(sql)));
 console.log('Generated checkpoint metadata applied.');
 const {lessons,characters,findLesson}=await import('../lib/curriculum.ts');
 const {extraLessons,extraPracticeLessons}=await import('../course/extras/units.ts');
 const ids=new Set([...lessons.map(row=>row.id),...extraLessons.map(row=>row.id),...extraPracticeLessons.map(row=>row.id),...Object.keys(characters).map(char=>'practice-'+char)]);
 const lengths=new Map((await db.prepare('SELECT lesson_id,steps,historical_steps FROM lesson_lengths').all()).results.map(row=>[row.lesson_id,row]));
 for(const id of ids)assert.equal(lengths.get(id)?.steps,findLesson(id)?.steps.length,'Current bounds differ: '+id);
 for(const old of snapshot.tables.lesson_lengths){
  const row=lengths.get(old.lesson_id);assert.ok(row,'Retired lesson removed');
  const historical=new Set(JSON.parse(row.historical_steps));
  for(const bound of old.historical_steps)assert.ok(historical.has(bound),'Historical bound removed');
  if(row.steps!==old.steps)assert.ok(historical.has(old.steps),'Previous completion bound removed');
 }
 console.log('Generated metadata covers all '+ids.size+' current lessons and retains every source historical/retired bound.');

}catch(e){console.error(e.message);process.exitCode=1;}finally{await mf.dispose();await rm(temp,{recursive:true,force:true});}
