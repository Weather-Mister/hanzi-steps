import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('search headings cannot force supplementary meanings to overflow',()=>{
 const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
 assert.doesNotMatch(css,/\.search-result-card strong\s*\{/,'large search-title style must not target every nested strong');
 assert.match(css,/\.search-result-title>strong\s*\{[^}]*font-size:1\.55rem/);
 assert.match(css,/\.character-sense-heading strong\s*\{[^}]*font-size:inherit/);
 assert.match(css,/\.character-sense-heading strong\s*\{[^}]*white-space:normal/);
 assert.match(css,/\.character-meanings\s*\{[^}]*max-width:100%/);
 assert.match(css,/\.character-meanings\s*\{[^}]*box-sizing:border-box/);
});

test('character detail starts with parts and collapsed supplementary meanings',()=>{
 const source=readFileSync(new URL('../components/learning-app.tsx',import.meta.url),'utf8');
 const detail=source.slice(source.indexOf('className="character-dialog"'));
 assert.ok(detail.indexOf('<CharacterParts key={detail}')<detail.indexOf('<CharacterMeanings key={`meanings-${detail}`}'));
 assert.match(detail,/<CharacterMeanings key=\{`meanings-\$\{detail\}`\} hanzi=\{detail\} showPinyin=\{prefs\.pinyin\} completed=\{completed\}\/>/);
});
