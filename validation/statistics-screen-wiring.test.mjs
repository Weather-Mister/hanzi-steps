import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));

test('statistics header action actually renders the controlled statistics dialog',async()=>{
 const source=await readFile(root+'components/learning-app.tsx','utf8');
 assert.match(source,/aria-label="Statistics"[^>]*onClick={()=>setStatsOpen(true)}/);
 assert.match(source,/<StatisticsScreen\s+open={statsOpen}\s+onOpenChange={setStatsOpen}/);
});
