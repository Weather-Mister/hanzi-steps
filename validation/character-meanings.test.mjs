import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {characters,lessons,vocabulary} from '../course/runtime.ts';
import {courseModules} from '../course/registry.generated.ts';
import {characterMeanings,supplementaryCharacterMeanings} from '../lib/character-meanings.ts';

const legacy=JSON.parse(readFileSync(new URL('../course/legacy/characters.json',import.meta.url),'utf8'));

test('supplements leave every authored primary card and assessed curriculum intact',()=>{
 const authored=Object.assign({},...courseModules.map(m=>m.characters),legacy);
 assert.deepEqual(characters,authored);
 assert.deepEqual(vocabulary,courseModules.flatMap(m=>m.newVocabulary));
 assert.deepEqual(lessons.flatMap(l=>l.steps),courseModules.flatMap(m=>m.lessons.flatMap(l=>l.steps)));
 assert.equal(characters['了'].meaning,'ending in 太…了');
 assert.equal(characters['上'].meaning,'final syllable in 早上 and 晚上');
});

test('every supplement belongs to an existing card and has a translated, pronounced example',()=>{
 assert.ok(Object.keys(supplementaryCharacterMeanings).length>=240);
 for(const [char,senses] of Object.entries(supplementaryCharacterMeanings)){
  assert.ok(characters[char],`Unknown card: ${char}`);
  assert.ok(senses.length);
  const keys=new Set();
  for(const sense of senses){
   for(const value of [sense.pinyin,sense.meaning,...Object.values(sense.example)]) assert.ok(value.trim(),`${char}: empty field`);
   assert.ok(sense.example.text.includes(char),`${char}: example must show this glyph`);
   assert.notEqual(sense.meaning,characters[char].meaning,`${char}: duplicate primary gloss`);
   const key=sense.pinyin+'|'+sense.meaning;
   assert.ok(!keys.has(key),`${char}: duplicate sense`);keys.add(key);
  }
 }
 assert.deepEqual(characterMeanings('龘'),[]);
});

test('high-impact grammar and changed readings are explained separately',()=>{
 for(const [char,readings] of Object.entries({'了':['le','liǎo'],'得':['de','dé','děi'],'還':['hái','huán'],'樂':['lè'],'著':['zháo','zhuó','zhù'],'背':['bèi'],'為':['wèi','wéi']})){
  for(const reading of readings)assert.ok(characterMeanings(char).some(s=>s.pinyin===reading),`${char}: ${reading}`);
 }
 for(const meaning of ['on; above','go up; board','attend','previous'])assert.ok(characterMeanings('上').some(s=>s.meaning.includes(meaning)));
 assert.ok(characterMeanings('了').some(s=>s.meaning.includes('not a general past-tense')));
 // Simplified mergers must not leak into these Traditional cards.
 assert.ok(!characterMeanings('只').some(s=>s.pinyin==='zhī'));
 assert.ok(!characterMeanings('發').some(s=>s.meaning.includes('hair')));
 assert.ok(!characterMeanings('乾').some(s=>s.pinyin==='gàn'));
});


test('character references keep learned, common, and supplementary uses separate',()=>{
 const component=readFileSync(new URL('../components/character-meanings.tsx',import.meta.url),'utf8');
 const app=readFileSync(new URL('../components/learning-app.tsx',import.meta.url),'utf8');
 const search=readFileSync(new URL('../components/pinyin-search.tsx',import.meta.url),'utf8');
 assert.match(component,/learnedWordsForCharacter\(hanzi,completed\)/);
 assert.match(component,/const curatedCommon=characterCommonWords\(hanzi\);/);
 assert.match(component,/const senses=characterMeanings\(hanzi\);/);
 assert.doesNotMatch(component,/characterMeanings\(hanzi\)\.filter/,'learner progress must not hide supplementary senses');
 assert.ok(component.indexOf('Uses you\'ve learned')<component.indexOf('Common words & expressions'));
 assert.ok(component.indexOf('Common words & expressions')<component.indexOf('Other meanings & uses'));
 assert.match(component,/Course word/);
 assert.match(component,/Extra reference/);
 assert.match(component,/Reference only/);
 assert.match(app,/completed=\{completed\} showPinyin=\{prefs\.pinyin\}/);
 assert.match(search,/<CharacterMeanings[^>]*completed=\{completed\}/);
});
