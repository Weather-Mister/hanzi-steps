import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('unguided handwriting keeps the target answer out of the header',()=>{
 const source=readFileSync(new URL('../components/unguided-writing-practice.tsx',import.meta.url),'utf8');
 assert.match(source,/<DialogTitle>Unguided practice<\/DialogTitle>/);
 assert.match(source,/Round \{round\} · write the selected character from memory\./);
 assert.doesNotMatch(source,/<DialogTitle>[^<]*\{char\}/);
 assert.doesNotMatch(source,/<DialogDescription>[^<]*character\.pinyin/);
 assert.match(source,/The answer stays hidden while you write\./);
});

test('practice hub visually separates Reading and Listening from drills',()=>{
 const source=readFileSync(new URL('../components/smart-practice.tsx',import.meta.url),'utf8');
 const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
 const links=source.indexOf('smart-hub-grid learning-path-links');
 const divider=source.indexOf('<hr className="smart-practice-divider"/>');
 const drills=source.indexOf('{preparing?');
 assert.ok(links>=0&&divider>links&&drills>divider,'divider must sit between learning paths and practice drills');
 assert.match(css,/\.smart-practice-divider\s*\{[^}]*border-top:1\.5px solid/s);
});
