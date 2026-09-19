// Fast gate for one newly registered unit. No historical per-unit test rewrites.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {loadCourse,ensureValid,root} from './course-io.mjs';
const course=await loadCourse();ensureValid(course);
const id=process.argv[2];const m=course.modules.find(m=>m.unit.id===id);
if(!m)throw Error('Usage: npm run course:test -- <stable-unit-id>');
const {findLesson,validSession,practiceLesson,lessonAvailable}=await import('../lib/curriculum.ts');
const before=course.modules.slice(0,course.modules.indexOf(m));const done=new Set(before.flatMap(m=>m.lessons.map(l=>l.id)));
for(const l of m.lessons){
 assert.deepEqual(findLesson(l.id)?.steps,l.steps);assert.ok(lessonAvailable(l.id,done),l.id);
 for(const index of [0,Math.floor(l.steps.length/2),l.steps.length])assert.ok(validSession({id:'550e8400-e29b-41d4-a716-446655440032',lessonId:l.id,index,independent:0,assisted:0,complete:index===l.steps.length,updatedAt:1}));
 done.add(l.id);
}
for(const ch of m.newCharacters){const l=practiceLesson(ch);for(const t of ['intro','trace','complete','memory'])assert.ok(l.steps.some(s=>s.type===t&&s.char===ch));}
console.log(`${id}: rendering references, navigation, checkpoints and handwriting practice passed.`);
const result=spawnSync(process.execPath,['--experimental-strip-types','--test','validation/validator.test.mjs','validation/lossless.test.mjs','tests/streak.test.mjs'],{cwd:root,stdio:'inherit'});process.exitCode=result.status??1;
