// Regenerate the exact optional lesson registry, keeping published completions.
import fs from 'node:fs';
import {extraLessons,extraPracticeLessons} from '../course/extras/units.ts';
const marker='-- Register always-available optional worksheets without changing canonical introductions.';
const path='course/extras/progress.sql',old=fs.readFileSync(path,'utf8');
const history=new Map([...old.matchAll(/\('([^']+)',\s*\d+,\s*ARRAY\[([^\]]*)\]/g)].map(m=>[m[1],m[2]]));
const rows=[...extraLessons,...extraPracticeLessons].map(l=>`  ('${l.id}', ${l.steps.length}, ARRAY[${history.get(l.id)||''}]::integer[])`);
const sql=marker+'\n-- Preserve existing lesson positions and all reviewed historical completion bounds.\ninsert into hanzi_private.lesson_lengths as existing (lesson_id, steps, historical_steps) values\n'+rows.join(',\n')+'\non conflict (lesson_id) do update\nset steps=excluded.steps,\n historical_steps=ARRAY(select distinct n from unnest(existing.historical_steps || excluded.historical_steps || case when existing.steps <> excluded.steps then ARRAY[existing.steps] else \'{}\'::integer[] end) n where n > 0 and n <= excluded.steps order by n);\n';
fs.writeFileSync(path,sql);
const schema=fs.readFileSync('supabase/schema.sql','utf8'),index=schema.indexOf(marker);
if(index<0)throw new Error('Missing optional registry section in Supabase schema');
fs.writeFileSync('supabase/schema.sql',schema.slice(0,index)+sql);
console.log('Registered '+rows.length+' extra lessons and character practices.');
