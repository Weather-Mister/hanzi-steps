import {characterMeanings,type CharacterSense} from './character-meanings.ts';
import {characterSenseGates} from '../course/enrichment/character-sense-gates.ts';
import {resolveSentence,sentenceAvailable} from './learning-materials.ts';
export {learnedWordsForCharacter} from './curriculum-relations.ts';
export function learnedCharacterMeanings(char:string,completed:Set<string>):CharacterSense[]{
 return characterSenseGates.filter(g=>g.char===char&&sentenceAvailable(g.exampleRef,completed)).flatMap(g=>{
  const sense=characterMeanings(char)[g.sense],example=resolveSentence(g.exampleRef);
  return sense&&example?[{...sense,example:{text:example.text,pinyin:example.pinyin,meaning:example.meaning}}]:[];
 });
}
