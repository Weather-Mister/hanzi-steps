export type SentenceRef={kind:'phrase';id:string}|{kind:'reading-line';readingId:string;line:number};
export type ReadingContract={
 origin:{kind:'authored-supplement';note:string};
 segments:string[][];
 grammarIds:string[];
 contextualForms?:Record<string,{sourceWords:string[];note:string}>;
};
export type TokenStatus='learned'|'recent-target'|'support-only'|'contextual'|'forbidden-future'|'unclassified'|'punctuation';
export type ListeningItem={id:string;source:SentenceRef;modes:('meaning'|'pinyin')[];distractors:{text:string;rationale:string}[];reason:string};
