import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {characters,vocabulary} from '../course/runtime.ts';
import {characterCommonWords,supplementaryCharacterCommonWords} from '../lib/character-common-words.ts';
import {supplementaryCharacterMeanings} from '../lib/character-meanings.ts';

const canonicalByText=new Map(vocabulary.map(word=>[word.text,word]));
const courseIndex=JSON.parse(readFileSync(new URL('../course/index.json',import.meta.url),'utf8'));

test('common-word references are valid, curated, and progression-neutral',()=>{
 const keys=Object.keys(supplementaryCharacterCommonWords);
 const total=Object.values(supplementaryCharacterCommonWords).reduce((sum,items)=>sum+items.length,0);
 assert.ok(keys.length>=130,'expected a broad Book 1 audit, got '+keys.length+' characters');
 assert.ok(total>=550,'expected a substantial common-word reference layer, got '+total+' entries');

 for(const [char,items] of Object.entries(supplementaryCharacterCommonWords)){
  assert.ok(characters[char],'Unknown character card: '+char);
  assert.ok(items.length,char+': empty common-word list');
  const seen=new Set();
  for(const item of items){
   assert.deepEqual(Object.keys(item).sort(),['meaning','pinyin','text'],char+'/'+item.text+': progression metadata must not live in reference data');
   for(const value of Object.values(item)) assert.ok(value.trim(),char+'/'+item.text+': empty field');
   assert.notEqual(item.text,char,char+': common-word reference must add context beyond the single character');
   assert.ok(item.text.includes(char),char+'/'+item.text+': reference must contain the character');
   assert.ok(!seen.has(item.text),char+': duplicate common word '+item.text);
   seen.add(item.text);

   const canonical=canonicalByText.get(item.text);
   if(canonical){
    assert.equal(item.pinyin,canonical.pinyin,char+'/'+item.text+': course-word pinyin drift');
    assert.equal(item.meaning,canonical.meaning,char+'/'+item.text+': course-word meaning drift');
   }
  }
 }
 assert.deepEqual(characterCommonWords('龘'),[]);
});


test('the Book 1 character audit leaves only genuinely atomic cards without a richer reference path',()=>{
 const book1Chars=Object.entries(courseIndex.characters).filter(([,row])=>row[2]==='book-1').map(([char])=>char);
 const courseWords=Object.keys(courseIndex.vocabulary);
 const intentionallyAtomic=new Set(['她','很','三','四','五','六','七','八','九','百','千','棟','喂']);
 const uncovered=book1Chars.filter(char=>
  !supplementaryCharacterCommonWords[char]?.length&&
  !supplementaryCharacterMeanings[char]?.length&&
  !courseWords.some(word=>word!==char&&word.includes(char))
 );
 assert.deepEqual(uncovered.sort(),[...intentionallyAtomic].sort());
 assert.equal(book1Chars.length,465);
});

test('high-value Taiwan Mandarin references include the intended everyday examples',()=>{
 const expectWords=(char,words)=>{
  const actual=new Set(characterCommonWords(char).map(item=>item.text));
  for(const word of words)assert.ok(actual.has(word),char+': missing '+word);
 };
 expectWords('太',['太太','太陽','太空','不太']);
 expectWords('電',['電話','電視','電腦','電梯','停電']);
 expectWords('車',['公車','計程車','腳踏車']);
 expectWords('氣',['天氣','冷氣','空氣']);
 expectWords('飯',['飯店','白飯']);
 expectWords('高',['高鐵','高中']);
});

test('future course words can be previewed as reference without becoming duplicate curriculum records',()=>{
 const taitai=canonicalByText.get('太太');
 assert.ok(taitai,'太太 should remain a canonical course word');
 assert.ok(characterCommonWords('太').some(item=>item.text==='太太'));
 assert.equal(vocabulary.filter(word=>word.text==='太太').length,1,'太太 must still have exactly one canonical vocabulary owner');
});
