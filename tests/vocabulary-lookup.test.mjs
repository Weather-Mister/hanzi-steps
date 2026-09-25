import assert from 'node:assert/strict';
import test from 'node:test';
import {compactPinyin,normalizePinyin,searchPracticeCharacters,searchVocabulary,uniquePracticeCharacters,vocabularyLookup} from '../lib/vocabulary-lookup.ts';

test('pinyin normalization accepts tones, numbers, spacing, case, and v for ü',()=>{
 assert.equal(normalizePinyin('  XǏ HuĀN  '),'xi huan');
 assert.equal(compactPinyin('xi3huan1'),'xihuan');
 assert.equal(compactPinyin('xǐhuān'),'xihuan');
 assert.equal(compactPinyin('LǛ'),'lv');
 assert.equal(compactPinyin('lv'),'lv');
 assert.equal(compactPinyin('LU:4'),'lv');
 assert.equal(compactPinyin('lü'.normalize('NFD')),'lv');
 assert.equal(compactPinyin('peng2you0'),'pengyou');
 assert.equal(compactPinyin("Xi’an"),'xian');
});

test('practice actions deduplicate repeated glyphs without changing word recall',()=>{
 const item={characters:['你','你','好']};
 assert.deepEqual(uniquePracticeCharacters(item),['你','好']);
 assert.deepEqual(item.characters,['你','你','好']);
});

test('empty or non-pinyin queries do not return the whole dictionary',()=>{
 for(const query of ['', '  ', '12345', '你好', '?!'])assert.deepEqual(searchVocabulary(query),[]);
});

test('exact pronunciation matches precede partial matches and limits are honored',()=>{
 const results=searchVocabulary('shi',1000);
 const firstPartial=results.findIndex(item=>item.normalizedPinyin!=='shi');
 assert.ok(firstPartial>0);
 assert.ok(results.slice(firstPartial).every(item=>item.normalizedPinyin!=='shi'));
 assert.equal(searchVocabulary('shi',2).length,2);
});

test('full-word pinyin forms resolve to the same Hanzi Steps vocabulary item',()=>{
 const queries=['xihuan','xi huan','xǐhuān','xi3huan1'];
 const ids=queries.map(query=>searchVocabulary(query).find(item=>item.traditional==='喜歡')?.id);
 assert.ok(ids.every(Boolean));
 assert.equal(new Set(ids).size,1);
});

test('search returns all curriculum matches instead of choosing a tone',()=>{
 const results=searchVocabulary('shi');
 assert.ok(results.length>0);
 assert.ok(results.every(item=>item.normalizedPinyin.includes('shi')));
});


test('canonical lookup does not emit duplicate vocabulary results',()=>{
 const results=searchVocabulary('shi');
 assert.equal(new Set(results.map(item=>item.id)).size,results.length);
});


test('canonical vocabulary keys are unique and stable-position based',()=>{
 assert.equal(new Set(vocabularyLookup.map(item=>item.id)).size,vocabularyLookup.length);
 assert.ok(vocabularyLookup.every(item=>item.id.startsWith('v1:'+item.lessonId+':')));
});


test('pinyin search keeps future vocabulary visible but gates writing practice by first character lesson',()=>{
 const future=searchVocabulary('leng',100).find(item=>item.traditional==='冷');
 assert.ok(future,'Unit 42 冷 must remain globally searchable');
 assert.deepEqual(searchPracticeCharacters(future,new Set()),[]);
 assert.deepEqual(searchPracticeCharacters(future,new Set(['u42-weather'])),['冷']);

 const typhoon=searchVocabulary('taifeng',100).find(item=>item.traditional==='颱風');
 assert.ok(typhoon,'Unit 44 颱風 must remain globally searchable');
 assert.ok(searchPracticeCharacters(typhoon,new Set()).length===0);
 assert.ok(searchPracticeCharacters(typhoon,new Set(['u44-typhoon'])).includes('颱'));
});
