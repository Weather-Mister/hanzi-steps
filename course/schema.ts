// Existing runtime types are preserved verbatim.
export type Part = { label:string; name:string; role:string; description:string; strokes:number[] };
export type Character = { audioText?:string; layoutLabel?:string; partOrderLabel?:string; hanzi:string; pinyin:string; zhuyin:string; meaning:string; strokes:number; note:string; memory:string; parts:Part[]; layout:'side'|'stack'|'whole'; example:{text:string;pinyin:string;meaning:string}; partQuestion?:{prompt:string;options:string[];answer:string;explanation:string} };
export type Phrase={text:string;pinyin:string;meaning:string;note:string;tokens:string[];grammarIds?:string[]};
export type Step = {id:string;audioText?:string;semanticAnswer?:boolean;type:'intro'|'trace'|'complete'|'memory'|'select'|'parts'|'build'|'match'|'phrase'|'order'|'listen'|'grammar'|'visual';char?:string;prompt?:string;options?:string[];answer?:string;explanation?:string;phrase?:string;chars?:string[];tokens?:string[];grammar?:string;grammarIds?:string[];visualRole?:string;visualInstruction?:string;visualClosing?:string;visualSuggestions?:string[];visualSource?:string};
export type Lesson={id:string;title:string;subtitle:string;chars:string[];minutes:string;steps:Step[];unitId?:string;review?:boolean};
export type GrammarRule={id:string;title:string;pattern:string;explanation:string;examples:{text:string;pinyin:string;meaning:string}[];remember:string;words?:string[]};
export type VocabularyWord={text:string;pinyin:string;meaning:string;lessonId:string;core:boolean;note?:string};
export type Unit={id:string;number:number;displayNumber?:number;theme:'blue'|'teal'|'plum'|'amber'|'rose'|'cyan'|'indigo'|'orange';bookReference?:string;label:string;title:string;description:string;chars:string[];lessonIds:string[];banner:{text:string;pinyin:string};goal:{text:string;pinyin:string;meaning:string};grammarIds:string[]};
export type Session={id:string;lessonId:string;index:number;independent:number;assisted:number;complete:boolean;updatedAt:number};

export type GrammarIntroduction = {id:string;kind:'rule'|'phrase-note';ref:string;lessonId:string;stepId:string};
export type UnitData = {
 schemaVersion:1; bookId:string; order:number; unit:Unit; reviewLessonId:string;
 lessons:Lesson[]; newVocabulary:VocabularyWord[]; reviewVocabulary:string[];
 newCharacters:string[]; reviewCharacters:string[]; characters:Record<string,Character>;
 grammarRules:Record<string,GrammarRule>; grammarIntroductions:GrammarIntroduction[]; reviewGrammar:string[];
 phrases:Record<string,Phrase>; revisionStepIds:string[];
};
export type Manifest = {schemaVersion:1;books:{id:string;number:number;title:string;available:boolean;units:{id:string;order:number;title:string;path:string}[]}[]};
