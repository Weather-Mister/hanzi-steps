import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {lessons,characterOrder,practiceLesson} from '../lib/curriculum.ts';

const root=fileURLToPath(new URL('../',import.meta.url));

async function declaredLessonLengths(){
  const migrationDir=path.join(root,'supabase','migrations');
  const files=[
    path.join(root,'supabase','schema.sql'),
    ...(await readdir(migrationDir))
      .filter(file=>file.endsWith('.sql'))
      .sort()
      .map(file=>path.join(migrationDir,file)),
  ];
  const lengths=new Map();

  for(const file of files){
    const sql=await readFile(file,'utf8');
    for(const match of sql.matchAll(/\(\s*'((?:''|[^'])+)'\s*,\s*(\d+)\s*\)/g)){
      lengths.set(match[1].replaceAll("''","'"),Number(match[2]));
    }
  }
  return lengths;
}

test('Supabase progress whitelist covers every current lesson and handwriting lesson',async()=>{
  const lengths=await declaredLessonLengths();

  for(const lesson of lessons){
    assert.equal(
      lengths.get(lesson.id),
      lesson.steps.length,
      `Supabase lesson_lengths is missing or stale for ${lesson.id}`,
    );
  }

  for(const char of characterOrder){
    const practice=practiceLesson(char);
    assert.equal(
      lengths.get(practice.id),
      practice.steps.length,
      `Supabase lesson_lengths is missing or stale for ${practice.id}`,
    );
  }
});
