// Legacy exports; author curriculum in course/book1/unit07.ts.
import unit from '../course/book1/unit07.ts';
import {characters} from '../course/runtime.ts';
export const unitSevenCharacterOrder = unit.unit.chars;
export const unitSevenCharacters = Object.fromEntries(unit.unit.chars.map(c=>[c,characters[c]]));
export const unitSevenGrammar = unit.grammarRules;
export const unitSevenLessons = unit.lessons;
export const unitSevenPhrases = unit.phrases;
export const unitSevenRevisionStepIds = unit.revisionStepIds;
export const unitSevenVocabulary = unit.newVocabulary;
