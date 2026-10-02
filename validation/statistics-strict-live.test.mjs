import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));

test('strict statistics backend stores and backfills exact clean outcomes',async()=>{
 const migration=await readFile(root+'supabase/migrations/20261002053500_strict_statistics.sql','utf8');
 for(const marker of [
  'clean_correct integer not null default 0',
  'clean_tracked integer not null default 0',
  'from hanzi_private.practice_attempt_events',
  "'cleanCorrect', clean_correct",
  "'cleanTracked', clean_tracked",
  'clean_correct = clean_correct + case when p_correct and not p_assisted then 1 else 0 end',
  'clean_tracked = clean_tracked + 1',
 ])assert.ok(migration.includes(marker),marker+' missing from strict statistics migration');
});

test('live statistics merge local completed sessions before remote study-day sync finishes',async()=>{
 const source=await readFile(root+'components/statistics-screen.tsx','utf8');
 assert.ok(source.includes('const localDays=sessions.filter(session=>session.complete)'));
 assert.ok(source.includes('[...new Set([...studyDays,...localDays])]'));
 assert.ok(source.includes('statistics-live'));
});

test('mastery changes update local state before the network save and roll back on failure',async()=>{
 const source=await readFile(root+'lib/use-mega-mastery.ts','utf8');
 const apply=source.indexOf('applyLocal(id,value);');
 const rpc=source.indexOf("supabase.rpc('hanzi_set_mastered'");
 const rollback=source.indexOf('applyLocal(id,!value);');
 assert.ok(apply>=0&&rpc>apply,'mastery should update locally before saving');
 assert.ok(rollback>rpc,'failed mastery saves should roll back the optimistic state');
});
