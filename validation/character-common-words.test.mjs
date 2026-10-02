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
 assert.ok(keys.length>=370,'expected a broad current-course audit, got '+keys.length+' characters');
 assert.ok(total>=1385,'expected a substantial common-word reference layer, got '+total+' entries');

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


test('the current course character audit leaves only the standalone interjection 喂 without a richer reference path',()=>{
 const courseChars=Object.keys(courseIndex.characters);
 const courseWords=Object.keys(courseIndex.vocabulary);
 const uncovered=courseChars.filter(char=>
  !supplementaryCharacterCommonWords[char]?.length&&
  !supplementaryCharacterMeanings[char]?.length&&
  !courseWords.some(word=>word!==char&&word.includes(char))
 );
 assert.deepEqual(uncovered,['喂']);
 assert.ok(courseChars.length>=486);
});


test('published Book 2 Lesson 1 characters all have useful curated reference sets',()=>{
 const lesson1Units=new Set(['book-2-unit-1','book-2-unit-2','book-2-unit-3','book-2-unit-4']);
 const chars=Object.entries(courseIndex.characters).filter(([,row])=>lesson1Units.has(row[3])).map(([char])=>char);
 assert.equal(chars.length,21);
 for(const char of chars){
  const items=characterCommonWords(char);
  assert.ok(items.length>=3,char+': expected at least three curated common references');
 }
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
 expectWords('上',['上班','上課','上車']);
 expectWords('不',['不要','不知道','不用']);
 expectWords('行',['不行','旅行','銀行']);
 expectWords('為',['為什麼','因為','認為']);
 expectWords('吐',['吐司','嘔吐']);
 expectWords('健',['健康','健身','健保']);
 expectWords('禮',['禮物','禮貌','禮拜']);
 expectWords('她',['她們','她的']);
 expectWords('得',['覺得','得到','得意']);
 expectWords('了',['太好了','怎麼了','了解']);
 expectWords('麼',['什麼','怎麼','這麼','那麼']);
 expectWords('百',['百分之','百貨公司']);
 expectWords('棟',['一棟房子','這棟大樓']);
 expectWords('迷',['迷路','球迷','迷人']);
 expectWords('轉',['轉車','轉彎','右轉','左轉']);
 expectWords('郵',['郵局','郵件','郵票','郵差']);
 expectWords('著',['看著','睡著','著名']);
 expectWords('筆',['鉛筆','筆記','原子筆']);
 expectWords('巷',['巷子','巷口','巷弄']);
 expectWords('車',['機車']);
 expectWords('便',['便當']);
 expectWords('票',['發票']);
});


test('the same reference word never disagrees across different character cards',()=>{
 const seen=new Map();
 for(const [char,items] of Object.entries(supplementaryCharacterCommonWords)){
  for(const item of items){
   const signature=item.pinyin+' || '+item.meaning;
   const prior=seen.get(item.text);
   if(prior)assert.equal(signature,prior.signature,item.text+': '+char+' disagrees with '+prior.char);
   else seen.set(item.text,{signature,char});
  }
 }
});

test('Taiwan-standard reference readings keep verified contrasts and neutral tones straight',()=>{
 const get=(char,text)=>characterCommonWords(char).find(item=>item.text===text);
 assert.deepEqual(get('好','好好'),{text:'好好',pinyin:'hǎohǎo',meaning:'properly; carefully; well'});
 assert.deepEqual(get('生','先生'),{text:'先生',pinyin:'xiānshēng',meaning:'Mr.; husband'});
 assert.deepEqual(get('人','人家'),{text:'人家',pinyin:'rénjia',meaning:'other people; someone else'});
 assert.deepEqual(get('笑','笑話'),{text:'笑話',pinyin:'xiàohuà',meaning:'joke'});
 assert.deepEqual(get('頭','頭髮'),{text:'頭髮',pinyin:'tóufǎ',meaning:'hair'});
 assert.equal(get('太','太太').pinyin,'tàitai');
 assert.equal(get('試','試試').pinyin,'shìshi');
 assert.equal(get('吐','吐司').pinyin,'tǔsī');
 assert.equal(get('湯','湯匙').pinyin,'tāngchí');
 assert.equal(get('便','便宜').pinyin,'piányí');
 assert.equal(get('便','便利').pinyin,'biànlì');
 assert.equal(get('為','為什麼').pinyin,'wèishénme');
 assert.equal(get('為','認為').pinyin,'rènwéi');
 assert.equal(get('行','銀行').pinyin,'yínháng');
 assert.equal(get('行','旅行').pinyin,'lǚxíng');
 assert.equal(get('吐','嘔吐').pinyin,'ǒutù');
 assert.equal(get('什','什錦').pinyin,'shíjǐn');
 assert.equal(get('得','得到').pinyin,'dédào');
 assert.equal(get('得','得意').pinyin,'déyì');
 assert.equal(get('了','了解').pinyin,'liǎojiě');
 assert.equal(get('轉','轉車').pinyin,'zhuǎnchē');
 assert.equal(get('著','看著').pinyin,'kànzhe');
 assert.equal(get('著','睡著').pinyin,'shuìzháo');
 assert.equal(get('著','著名').pinyin,'zhùmíng');
 assert.equal(get('背','背包').pinyin,'bēibāo');
 assert.equal(get('背','背後').pinyin,'bèihòu');
 assert.equal(get('便','便當').pinyin,'biàndāng');
 assert.equal(get('筆','原子筆').pinyin,'yuánzǐbǐ');
});

test('future course words can be previewed as reference without becoming duplicate curriculum records',()=>{
 const taitai=canonicalByText.get('太太');
 assert.ok(taitai,'太太 should remain a canonical course word');
 assert.ok(characterCommonWords('太').some(item=>item.text==='太太'));
 assert.equal(vocabulary.filter(word=>word.text==='太太').length,1,'太太 must still have exactly one canonical vocabulary owner');
});
