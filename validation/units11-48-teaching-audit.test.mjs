import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));

test('Unit 12 reading stays inside the taught number range before 百 is introduced',async()=>{
 const [u12,u13]=await Promise.all([
  readFile(root+'course/book1/unit12.ts','utf8'),
  readFile(root+'course/book1/unit13.ts','utf8'),
 ]);
 assert.ok(u12.includes('"id": "u12-challenge-reading-21"'));
 assert.ok(u12.includes('我要兩杯茶。一杯茶三十五塊。'));
 assert.ok(u12.includes('"answer": "七十塊"'));
 assert.ok(!u12.includes('一百零五塊'));
 assert.ok(u13.includes('"text": "百"'));
 assert.ok(u13.includes('"lessonId": "u13-hundreds"'));
});

test('Unit 14 no longer gives 上網 itself as the meaning-choice answer',async()=>{
 const u14=await readFile(root+'course/book1/unit14.ts','utf8');
 assert.ok(u14.includes('"id": "u14-can-15"'));
 assert.ok(u14.includes('"prompt": "What does 上網 mean here?"'));
 assert.ok(u14.includes('"answer": "go online"'));
 assert.ok(!u14.includes('"prompt": "Which activity does 上網 name?"'));
});

test('Lesson 14 source gloss for 紅葉 stays consistent across Units 43 and 44',async()=>{
 const [u43,u44]=await Promise.all([
  readFile(root+'course/book1/unit43.ts','utf8'),
  readFile(root+'course/book1/unit44.ts','utf8'),
 ]);
 assert.ok(u43.includes('red maple leaves'));
 assert.ok(!u43.includes('red autumn leaves'));
 assert.ok(!u43.includes('not only maple leaves'));
 assert.ok(u44.includes('red maple leaves'));
});

test('lesson order UI uses session-varying banks without changing authored answers',async()=>{
 const source=await readFile(root+'components/learning-app.tsx','utf8');
 assert.ok(source.includes('buildLessonOrderBank({'));
 assert.ok(source.includes("seed:sessionSeed+':'+step.id+':'+retry"));
 assert.ok(source.includes('sessionSeed={active.id}'));
 assert.ok(source.includes('alternatives:phrase!.acceptedTokenOrders'));
});
