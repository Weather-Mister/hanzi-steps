// Optional isolated PostgreSQL runner; install PGlite outside the app, then set
// HANZI_PGLITE_MODULE to its ESM entry. The SQL can also run in a staging DB.
const {PGlite}=await import(process.env.HANZI_PGLITE_MODULE||'@electric-sql/pglite');
import fs from 'node:fs';import assert from 'node:assert/strict';
const db=new PGlite();
await db.exec(`create role anon; create role authenticated; create schema hanzi_private;
create table hanzi_private.lesson_lengths(lesson_id text primary key,steps integer not null);
alter table hanzi_private.lesson_lengths enable row level security;
create table public.hanzi_sessions(id text primary key,user_id text,lesson_id text,position integer,independent integer,assisted integer,complete boolean,updated_at bigint,completed_at bigint);
create table hanzi_private.test_accounts(key text primary key);
create function public.hanzi_claim_username(p_username text) returns text language plpgsql as $$begin insert into hanzi_private.test_accounts values(p_username) on conflict do nothing;return p_username;end$$;
create function hanzi_private.resolve_account(expected_account text) returns text language sql as $$select key from hanzi_private.test_accounts where key=expected_account$$;`);
// Mirrors the deployed tables' privileges and tests the real save function;
// account auth implementation is untouched by this migration.
const before=JSON.parse(fs.readFileSync('validation/fixtures/production-append-baseline.json')).lessons;
for(const l of before)await db.query('insert into hanzi_private.lesson_lengths values($1,$2)',[l.id,l.length]);
await db.exec(fs.readFileSync('supabase/migrations/20261004024116_controlled_production_progress_compat.sql','utf8'));
await db.exec(`create function public.hanzi_save_progress(checkpoint jsonb,expected_account text) returns jsonb language sql security definer set search_path='' as $$select hanzi_private.save_progress(checkpoint,expected_account)$$;`);
const result=await db.exec(fs.readFileSync('supabase/verify-production-progress.sql','utf8'));console.log(result.at(-1).rows[0]);
assert.equal((await db.query('select count(*)::integer as n from public.hanzi_sessions')).rows[0].n,0);
assert.equal((await db.query('select count(*)::integer as n from hanzi_private.test_accounts')).rows[0].n,0);
await db.close();
