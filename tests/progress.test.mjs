import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, readdir, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {Miniflare} from 'miniflare';
import {lessons,findLesson} from '../lib/curriculum.ts';
import {streakFromDays,taipeiDay} from '../lib/streak.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://hanzi-steps.huseyin-uludag.chatgpt.site';
const checkpoint = {
  id: '550e8400-e29b-41d4-a716-446655440000', lessonId: 'hello',
  index: 4, independent: 2, assisted: 1, complete: false, updatedAt: 1,
};
let temp, mf, workerCode, drafts;
const runtime = () => new Miniflare({
  modules: true, script: workerCode, compatibilityDate: '2026-05-22',
  compatibilityFlags: ['nodejs_compat'], d1Databases: ['DB'],
  d1Persist: path.join(temp, 'd1'),
});

before(async () => {
  temp = await mkdtemp(path.join(tmpdir(), 'hanzi-progress-'));
  // Run the actual route and auth helper using Vinext's actual request-header
  // context, the Workers runtime, and a real persisted D1 database.
  const bundle = await build({
    absWorkingDir: root, bundle: true, write: false, format: 'esm', platform: 'node',
    target: 'es2022', external: ['cloudflare:workers', 'node:*'],
    alias: {'next/headers': 'vinext/shims/headers', 'next/navigation': 'vinext/shims/navigation'},
    define: {'process.env.NODE_ENV': '"production"'},
    stdin: {resolveDir: root, contents: `
      import {GET, PUT} from './app/api/progress/route.ts';
      import {AccountPanel} from './app/account-panel.tsx';
      import {getChatGPTUser} from './app/chatgpt-auth.ts';
      import {createElement} from 'react';
      import {renderToStaticMarkup} from 'react-dom/server.browser';
      import {headersContextFromRequest, runWithHeadersContext} from 'vinext/shims/headers';
      export default {fetch(request) {
        return runWithHeadersContext(headersContextFromRequest(request), async () => {
          if(new URL(request.url).pathname==='/account-test')return new Response(renderToStaticMarkup(createElement(AccountPanel,{user:await getChatGPTUser()})));
          return request.method === 'PUT' ? PUT(request) : GET();
        });
      }};
    `},
  });
  workerCode = bundle.outputFiles[0].text;
  mf = runtime();
  const db = await mf.getD1Database('DB');
  for(const file of (await readdir(path.join(root,'drizzle'))).filter(file=>file.endsWith('.sql')).sort()){
    const migration=await readFile(path.join(root,'drizzle',file),'utf8');
    for(const statement of migration.split('--> statement-breakpoint'))if(statement.trim())await db.prepare(statement).run();
  }
  const draftBundle = await build({
    absWorkingDir: root, entryPoints: ['lib/progress-drafts.ts'], bundle: true,
    write: false, format: 'esm', platform: 'node',
  });
  drafts = await import(`data:text/javascript;base64,${Buffer.from(draftBundle.outputFiles[0].text).toString('base64')}`);
});
after(async () => {
  await mf?.dispose();
  if (temp) await rm(temp, {recursive: true, force: true});
});

async function request(method, body, email = 'learner@example.test', extraHeaders = {}) {
  const headers = {'sec-fetch-site': 'same-origin', ...extraHeaders};
  if (email) headers['oai-authenticated-user-email'] = email;
  if (method === 'PUT') {
    headers.origin ??= origin;
    headers['content-type'] = 'application/json';
  }
  return mf.dispatchFetch(`${origin}/api/progress`, {
    method, headers, body: body ? JSON.stringify(body) : undefined,
  });
}

function storageWith(values, failWrites = false) {
  const data = new Map(Object.entries(values));
  return {
    getItem: key => data.get(key) ?? null,
    setItem(key, value) {if (failWrites) throw new Error('Storage full'); data.set(key, value);},
    removeItem: key => data.delete(key),
  };
}

function completion(id,lessonId,timestamp){
 return {...checkpoint,id,lessonId,index:findLesson(lessonId).steps.length,complete:true,updatedAt:Date.parse(timestamp)};
}

test('Streak days count completions across all attempts and respect Taiwan midnight',async()=>{
 const email='daily-streak@example.test';
 assert.deepEqual((await (await request('GET',undefined,email)).json()).studyDays,[]);
 assert.equal((await request('PUT',{...checkpoint,id:'550e8400-e29b-41d4-a716-446655440077'},email)).status,200);
 assert.deepEqual((await (await request('GET',undefined,email)).json()).studyDays,[],'Opening or partially practising a lesson does not count');
 const first=completion('550e8400-e29b-41d4-a716-446655440070','hello','2026-09-08T15:59:59.999Z');
 const second=completion('550e8400-e29b-41d4-a716-446655440071','hello','2026-09-08T16:00:00.000Z');
 const practice=completion('550e8400-e29b-41d4-a716-446655440072','practice-你','2026-09-09T02:00:00.000Z');
 for(const row of [first,second,practice])assert.equal((await request('PUT',row,email)).status,200);
 const loaded=await (await request('GET',undefined,email)).json();
 assert.deepEqual(loaded.studyDays,['2026-09-08','2026-09-09']);
 assert.equal(loaded.sessions.filter(s=>s.lessonId==='hello'&&s.complete).length,1,'Progress returns only the latest completed hello, while streak includes older attempts');
 assert.equal(streakFromDays(loaded.studyDays,Date.parse('2026-09-09T05:00:00Z')).current,2);
 assert.deepEqual((await (await request('GET',undefined,'different-streak@example.test')).json()).studyDays,[],'Another account cannot see these study days');
});

test('Completion retries and stale checkpoints never shift or duplicate a study day',async()=>{
 const email='retry-streak@example.test';
 const original=completion('550e8400-e29b-41d4-a716-446655440073','hello','2026-09-05T04:00:00Z');
 assert.equal((await request('PUT',original,email)).status,200);
 assert.equal((await request('PUT',{...original,updatedAt:Date.parse('2026-09-09T04:00:00Z')},email)).status,200);
 assert.equal((await request('PUT',{...original,index:4,complete:false,updatedAt:Date.now()},email)).status,200);
 const loaded=await (await request('GET',undefined,email)).json();
 assert.deepEqual(loaded.studyDays,['2026-09-05']);
 const db=await mf.getD1Database('DB');
 const saved=await db.prepare('SELECT completed_at FROM practice_sessions WHERE id=?').bind(original.id).first();
 assert.equal(saved.completed_at,original.updatedAt);
 assert.equal((await request('PUT',original,'wrong-owner@example.test')).status,409);
 assert.deepEqual((await (await request('GET',undefined,'wrong-owner@example.test')).json()).studyDays,[]);
});

test('Pre-feature completions retain their historical day, including after a later retry',async()=>{
 const email='historical-streak@example.test',db=await mf.getD1Database('DB');
 const original=completion('550e8400-e29b-41d4-a716-446655440074','hello','2026-09-06T04:00:00Z');
 assert.equal((await request('PUT',{...original,index:4,complete:false},email)).status,200);
 // Simulate a pre-feature row while retaining the real route's hashed owner ID.
 await db.prepare('UPDATE practice_sessions SET position=?,complete=1,updated_at=?,completed_at=NULL WHERE id=?')
  .bind(original.index,original.updatedAt,original.id).run();
 assert.deepEqual((await (await request('GET',undefined,email)).json()).studyDays,['2026-09-06']);
 assert.equal((await request('PUT',{...original,updatedAt:Date.parse('2026-09-09T04:00:00Z')},email)).status,200);
 assert.deepEqual((await (await request('GET',undefined,email)).json()).studyDays,['2026-09-06']);
});

test('An offline completion uses its completion day; future clocks cannot pre-award days',async()=>{
 const email='offline-streak@example.test';
 const offline=completion('550e8400-e29b-41d4-a716-446655440075','hello','2026-09-07T18:00:00Z');
 const response=await request('PUT',offline,email);
 assert.equal(response.status,200);
 assert.deepEqual((await response.json()).studyDays,['2026-09-08']);
 const future={...offline,id:'550e8400-e29b-41d4-a716-446655440076',updatedAt:Date.now()+86_400_000*100};
 const receivedAt=Date.now();
 assert.equal((await request('PUT',future,email)).status,200);
 const row=await (await mf.getD1Database('DB')).prepare('SELECT completed_at FROM practice_sessions WHERE id=?').bind(future.id).first();
 assert.ok(row.completed_at>=receivedAt&&row.completed_at<=Date.now());
 assert.equal(taipeiDay(row.completed_at),taipeiDay(Date.now()));
});

test('Email-only production identity saves, reloads, and survives a Workers restart', async () => {
  let response = await request('PUT', checkpoint);
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(await response.json(), {saved: true});
  response = await request('GET');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  let saved = (await response.json()).sessions[0];
  assert.equal(saved.index, 4);
  assert.equal(saved.independent, 2);
  assert.equal(saved.assisted, 1);
  assert.equal(saved.complete, false);

  const completed = {...checkpoint, index: lessons[0].steps.length, complete: true};
  assert.equal((await request('PUT', completed)).status, 200);
  await mf.dispose();
  mf = runtime();
  response = await request('GET');
  saved = (await response.json()).sessions[0];
  assert.equal(saved.id, checkpoint.id);
  assert.equal(saved.index, lessons[0].steps.length);
  assert.equal(saved.complete, true);

  // A later optional identity header must not split the existing account.
  response = await request('GET', undefined, 'Learner@Example.Test', {'oai-authenticated-user-id': 'optional-future-id'});
  assert.equal((await response.json()).sessions[0].id, checkpoint.id);
  // A delayed offline write must not undo the completed lesson.
  assert.equal((await request('PUT', checkpoint)).status, 200);
  assert.equal((await (await request('GET')).json()).sessions[0].complete, true);
});

test('Saved progress remains private, and rejected writes never receive a saved receipt', async () => {
  assert.equal((await request('GET', undefined, null)).status, 401);
  assert.equal((await request('PUT', checkpoint, null)).status, 401);
  assert.equal((await request('PUT', {...checkpoint, userId: 'learner@example.test'}, 'other@example.test')).status, 409);
  assert.deepEqual((await (await request('GET', undefined, 'other@example.test')).json()).sessions, []);
  assert.equal((await request('PUT', checkpoint, 'learner@example.test', {origin: 'https://elsewhere.example'})).status, 403);
  assert.equal((await request('PUT', {...checkpoint, complete: true})).status, 400);
});

test('Unit 2 checkpoints save and resume alongside original completed lessons',async()=>{
 const email='unit-two-learner@example.test';
 const records=lessons.filter(lesson=>['unit-1','unit-2'].includes(lesson.unitId)).map((lesson,i)=>({...checkpoint,
  id:`550e8400-e29b-41d4-a716-4466554420${String(i).padStart(2,'0')}`,
  lessonId:lesson.id,index:lesson.unitId==='unit-1'?lesson.steps.length:Math.floor(lesson.steps.length/2),
  complete:lesson.unitId==='unit-1',updatedAt:i+1,
 }));
 for(const record of records)assert.equal((await request('PUT',record,email)).status,200,record.lessonId);
 let rows=(await (await request('GET',undefined,email)).json()).sessions;
 assert.equal(rows.length,12);
 for(const record of records){const saved=rows.find(s=>s.id===record.id);assert.equal(saved.index,record.index);assert.equal(saved.complete,record.complete);}
 const last=records.find(s=>s.lessonId==='u2-review');
 const finished={...last,index:lessons.find(l=>l.id==='u2-review').steps.length,complete:true,updatedAt:99};
 assert.equal((await request('PUT',finished,email)).status,200);
 assert.equal((await request('PUT',last,email)).status,200);
 rows=(await (await request('GET',undefined,email)).json()).sessions;
 assert.equal(rows.find(s=>s.id===last.id).complete,true,'An older offline checkpoint cannot undo Unit 2 completion');
 assert.equal(rows.find(s=>s.lessonId==='review').index,11,'Unit 1 completion remains at its original checkpoint');
});

test('Rebalanced lessons save alongside original Unit 7/8 history without rewriting checkpoints',async()=>{
 const email='rebalanced-learner@example.test';
 const original={...checkpoint,id:'550e8400-e29b-41d4-a716-446655440060',lessonId:'u7-review',index:20,complete:true};
 const draft={...checkpoint,id:'550e8400-e29b-41d4-a716-446655440061',lessonId:'u8-time',index:25};
 const revised={...checkpoint,id:'550e8400-e29b-41d4-a716-446655440062',lessonId:'u8-v2-time',index:4};
 for(const row of [original,draft,revised])assert.equal((await request('PUT',row,email)).status,200,row.lessonId);
 const rows=(await (await request('GET',undefined,email)).json()).sessions;
 for(const expected of [original,draft,revised]){
  const actual=rows.find(row=>row.id===expected.id);
  assert.equal(actual.lessonId,expected.lessonId);assert.equal(actual.index,expected.index);assert.equal(actual.complete,expected.complete);
 }
});

test('Unsynced version-one checkpoints recover into the account queue without moving backwards', async () => {
  const {readProgressDrafts, progressDraftKey} = drafts;
  const legacy = progressDraftKey('signed-out'), current = progressDraftKey('account-test');
  const later = {...checkpoint, index: 8, updatedAt: 2};
  const store = storageWith({[legacy]: JSON.stringify([later]), [current]: JSON.stringify([checkpoint])});
  const recovered = readProgressDrafts(store, 'account-test');
  assert.deepEqual(recovered, [later]);
  assert.equal(store.getItem(legacy), null);
  assert.deepEqual(JSON.parse(store.getItem(current)), [later]);
  // The recovered draft follows exactly the same save/load route as new work.
  const recoveredSession = {...recovered[0], id: '550e8400-e29b-41d4-a716-446655440001'};
  assert.equal((await request('PUT', recoveredSession)).status, 200);
  const rows = (await (await request('GET')).json()).sessions;
  assert.equal(rows.find(s => s.id === recoveredSession.id).index, 8);
});

test('Draft recovery keeps the original backup when browser storage cannot write', () => {
  const {readProgressDrafts, progressDraftKey} = drafts;
  const legacy = progressDraftKey('signed-out');
  const backup = JSON.stringify([checkpoint, {invalid: true}]);
  const store = storageWith({[legacy]: backup}, true);
  assert.deepEqual(readProgressDrafts(store, 'account-test'), [checkpoint]);
  assert.equal(store.getItem(legacy), backup);
  assert.deepEqual(readProgressDrafts(store, 'signed-out'), [checkpoint]);
  assert.equal(store.getItem(legacy), backup);
});


test('Account UI uses top-level platform sign-in and displays the verified signed-in account',async()=>{
 const anonymous=await (await mf.dispatchFetch(`${origin}/account-test`)).text();
 assert.match(anonymous,/href="\/signin-with-chatgpt\?return_to=%2F" target="_top"/);
 assert.match(anonymous,/Sign in with ChatGPT/);
 assert.doesNotMatch(anonymous,/Sign out/);
 const signedIn=await (await mf.dispatchFetch(`${origin}/account-test`,{headers:{'oai-authenticated-user-email':'learner@example.test'}})).text();
 assert.match(signedIn,/Signed in/);
 assert.match(signedIn,/learner@example.test/);
 assert.match(signedIn,/href="\/signout-with-chatgpt\?return_to=%2F" target="_top"/);
 assert.doesNotMatch(signedIn,/Sign in with ChatGPT/);
});
