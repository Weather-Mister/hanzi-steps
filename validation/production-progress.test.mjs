import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {lessons,historicalLessonLengthsFor} from '../lib/curriculum.ts';
const migration=fs.readFileSync(new URL('../supabase/migrations/20261004024116_controlled_production_progress_compat.sql',import.meta.url),'utf8');
const rows=new Map([...migration.matchAll(/\('([^']+)', (\d+), ARRAY\[([^\]]*)\]::integer\[\]\)/g)].map(m=>[m[1],{current:Number(m[2]),history:m[3]?m[3].split(',').map(Number):[]} ]));
test('Supabase metadata matches every current and reviewed historical curriculum bound',()=>{
 for(const l of lessons){assert.equal(rows.get(l.id)?.current,l.steps.length,l.id);assert.deepEqual(rows.get(l.id)?.history,historicalLessonLengthsFor(l.id),l.id);}
});
test('Fresh schema installs include exactly the tested compatibility migration',()=>{
 const schema=fs.readFileSync(new URL('../supabase/schema.sql',import.meta.url),'utf8');assert.ok(schema.endsWith(migration));
 // This migration changes curriculum bounds/save validation only. All existing
 // auth functions, table grants/RLS and practice RPCs remain the deployed ones.
 assert.equal(/(?:grant|revoke|drop|delete)\s/i.test(migration),false);
});
