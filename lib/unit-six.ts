// Legacy exports; author curriculum in course/book1/unit06.ts.
import unit from '../course/book1/unit06.ts';
import {characters} from '../course/runtime.ts';
export const unitSixCharacterOrder = unit.unit.chars;
export const unitSixCharacters = Object.fromEntries(unit.unit.chars.map(c=>[c,characters[c]]));
export const unitSixGrammar = unit.grammarRules;
export const unitSixLessons = unit.lessons;
export const unitSixPhrases = unit.phrases;
export const unitSixVocabulary = unit.newVocabulary;
