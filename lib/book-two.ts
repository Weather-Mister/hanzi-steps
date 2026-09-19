// Legacy exports; author curriculum in course/book2/unit01.ts.
import unit from '../course/book2/unit01.ts';
import {characters} from '../course/runtime.ts';
export const bookTwoCharacterOrder = unit.unit.chars;
export const bookTwoCharacters = Object.fromEntries(unit.unit.chars.map(c=>[c,characters[c]]));
export const bookTwoGrammar = unit.grammarRules;
export const bookTwoPhrases = unit.phrases;
export const bookTwoVocabulary = unit.newVocabulary;
