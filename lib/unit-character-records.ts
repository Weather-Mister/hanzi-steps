// Retained compatibility subset; values live in course unit modules.
import {characters} from '../course/runtime.ts';
export const existingUnitCharacters = Object.fromEntries(["幾","房","相","末","打","足","泳","常","吧","今","明","早","玩","起","晚","飯","可"].map(c=>[c,characters[c]]));
