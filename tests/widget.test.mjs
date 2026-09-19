import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare} from 'miniflare';
import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {streakFromDays,taipeiDay} from '../lib/streak.ts';
let mf,db;
const account='account-v1-'+createHash('sha256').update('hanzi-steps/progress/v1:widget@example.test').digest('hex');
before(async()=>{
 const bundle=await build({bundle:true,write:false,format:'esm',platform:'node',external:['cloudflare:workers'],stdin:{resolveDir:process.cwd(),contents:`import {GET} from './app/api/widget/streak/route.ts';export default {fetch(request){return request.method==='GET'?GET(request):new Response(null,{status:405})}}`}});
 mf=new Miniflare({modules:true,script:bundle.outputFiles[0].text,compatibilityDate:'2026-05-22',compatibilityFlags:['nodejs_compat'],d1Databases:['DB']});
 db=await mf.getD1Database('DB');
 for(const file of (await readdir('drizzle')).filter(f=>f.endsWith('.sql')).sort())for(const statement of (await readFile('drizzle/'+file,'utf8')).split('--> statement-breakpoint'))if(statement.trim())await db.prepare(statement).run();
});
after(async()=>{await mf?.dispose()});
const request=(key=account)=>mf.dispatchFetch('https://example.test/api/widget/streak?account='+encodeURIComponent(key));
test('Public widget reads the same completed attempts and exposes only four summary fields',async()=>{
 const now=Date.now();
 for(const [i,offset] of [0,1,2,2].entries())await db.prepare('INSERT INTO practice_sessions(id,user_id,lesson_id,position,independent,assisted,complete,updated_at,completed_at) VALUES(?,?,?,?,?,?,?,?,?)').bind('widget-'+i,account,'hello',4,1,0,1,now,now-offset*86400000).run();
 const res=await request();assert.equal(res.status,200);assert.equal(res.headers.get('cache-control'),'no-store');
 const data=await res.json();const expected=streakFromDays([0,1,2].map(i=>taipeiDay(now-i*86400000)),now);
 assert.deepEqual(Object.keys(data).sort(),['capturedAt','current','day','practicedToday']);
 assert.equal(data.current,expected.current);assert.equal(data.practicedToday,expected.practicedToday);assert.equal(data.day,expected.today);
 const other=await (await request('account-v1-'+'0'.repeat(64))).json();assert.equal(other.current,0);
});
test('Invalid identifiers rejected; route has no write method',async()=>{
 for(const invalid of ['','widget@example.test',"' OR 1=1 --",'account-v1-abc'])assert.equal((await request(invalid)).status,400);
 const src=await readFile('app/api/widget/streak/route.ts','utf8');assert.doesNotMatch(src,/export (?:async )?function (?:PUT|POST|DELETE|PATCH)/);
});
test('Database failure is 503, never a fabricated zero streak',async()=>{
 await db.prepare('DROP TABLE practice_sessions').run();assert.equal((await request()).status,503);
});
