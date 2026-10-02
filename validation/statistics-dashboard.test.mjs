import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));

test('statistics screen keeps its visual dashboard sections',async()=>{
 const [source,css]=await Promise.all([
  readFile(root+'components/statistics-screen.tsx','utf8'),
  readFile(root+'app/globals.css','utf8'),
 ]);
 for(const marker of [
  'statistics-heatmap',
  'statistics-rings',
  'statistics-mode-bars',
  'statistics-word-bars',
  'statistics-milestones',
 ])assert.ok(source.includes(marker),marker+' is missing from the statistics screen');
 assert.ok(css.includes('.statistics-dashboard-grid'));
 assert.ok(css.includes('.statistics-ring-value'));
});
