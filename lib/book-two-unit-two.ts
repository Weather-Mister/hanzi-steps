// Legacy exports; author curriculum in course/book2/unit02.ts.
import unit from '../course/book2/unit02.ts';
import {characters} from '../course/runtime.ts';
export const bookTwoUnitTwoCharacterOrder = unit.unit.chars;
export const bookTwoUnitTwoCharacters = Object.fromEntries(unit.unit.chars.map(c=>[c,characters[c]]));
export const bookTwoUnitTwoGrammar = unit.grammarRules;
export const bookTwoUnitTwoLessons = unit.lessons;
export const bookTwoUnitTwoPhrases = unit.phrases;
export const bookTwoUnitTwoVocabulary = unit.newVocabulary;
