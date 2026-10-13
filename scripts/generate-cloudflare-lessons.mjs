import {writeFileSync} from 'node:fs';
import {lessons,characters,findLesson,historicalLessonLengthsFor,previousLessonLengths,additionalPreviousLessonLengths} from '../lib/curriculum.ts';
import {extraLessons,extraPracticeLessons} from '../course/extras/units.ts';
const ids=new Set([...lessons.map(row=>row.id),...extraLessons.map(row=>row.id),...extraPracticeLessons.map(row=>row.id),...Object.keys(characters).map(char=>'practice-'+char),...Object.keys(previousLessonLengths),...Object.keys(additionalPreviousLessonLengths)]);
const quote=value=>"'"+value.replace(/'/g,"''")+"'";
const sql=[`-- Generated checkpoint bounds. Run after snapshot import and for curriculum updates.
-- Append reviewed old bounds rather than rewriting existing learner checkpoints.`];
for(const id of [...ids].sort()){
 const current=findLesson(id)?.steps.length,old=historicalLessonLengthsFor(id),steps=current??old.at(-1);
 if(!steps)continue;
 sql.push(`INSERT INTO lesson_lengths(lesson_id,steps,historical_steps) VALUES(${quote(id)},${steps},${quote(JSON.stringify(old))})
 ON CONFLICT(lesson_id) DO UPDATE SET historical_steps=(SELECT json_group_array(value) FROM (SELECT DISTINCT value FROM json_each(lesson_lengths.historical_steps) UNION SELECT value FROM json_each(excluded.historical_steps) UNION SELECT lesson_lengths.steps WHERE lesson_lengths.steps<>excluded.steps)),steps=excluded.steps;`);
}
writeFileSync('cloudflare/lesson-lengths.sql',sql.join('\n')+'\n');
console.log('Generated '+(sql.length-1)+' current and historical checkpoint bounds.');
