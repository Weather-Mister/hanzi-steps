import assert from 'node:assert/strict';
import test from 'node:test';
import {compactPinyin,normalizePinyin,searchVocabulary} from '../lib/vocabulary-lookup.ts';

test('pinyin normalization accepts tones, numbers, spacing, case, and v for ü',()=>{
 assert.equal(normalizePinyin('  XǏ HuĀN  '),'xi huan');
 assert.equal(compactPinyin('xi3huan1'),'xihuan');
 assert.equal(compactPinyin('xǐhuān'),'xihuan');
 assert.equal(compactPinyin('LǛ'),'lv');
 assert.equal(compactPinyin('lv'),'lv');
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
