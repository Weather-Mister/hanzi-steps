// Legacy exports; author curriculum in course/book1/unit08.ts.
import unit from '../course/book1/unit08.ts';
import {characters} from '../course/runtime.ts';
export const unitEightCharacterOrder = unit.unit.chars;
export const unitEightCharacters = Object.fromEntries(unit.unit.chars.map(c=>[c,characters[c]]));
export const unitEightGrammar = unit.grammarRules;
export const unitEightLessons = unit.lessons;
export const unitEightPhrases = unit.phrases;
export const unitEightRevisionStepIds = unit.revisionStepIds;
export const unitEightVocabulary = unit.newVocabulary;
