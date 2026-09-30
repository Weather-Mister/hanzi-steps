import {createHash} from 'node:crypto';
import {readingCheckpoints} from '../lib/reading-checkpoints.ts';
import {readingContracts,resolveSentence} from '../lib/learning-materials.ts';
import {listeningItems,listeningSceneIds} from '../course/listening/items.ts';
import {characterSenseGates} from '../course/enrichment/character-sense-gates.ts';
import {characterMeanings} from '../lib/character-meanings.ts';
export const fingerprint=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
export function materialReviewPayloads(){
 return {
  readings:Object.fromEntries(readingCheckpoints.map(r=>[r.id,fingerprint({reading:r,contract:readingContracts[r.id]})])),
  listening:Object.fromEntries(listeningItems.map(item=>[item.id,fingerprint({item,source:resolveSentence(item.source)})])),
  scenes:listeningSceneIds,
  senses:Object.fromEntries(characterSenseGates.map(g=>[g.char+':'+g.sense,fingerprint({gate:g,sense:characterMeanings(g.char)[g.sense],source:resolveSentence(g.exampleRef)})])),
 };
}
