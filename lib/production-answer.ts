// Deliberately narrower than other practice normalizers: never fold characters,
// numerals, word order, synonyms, or grammar. Even NFC folds some Han glyphs.
export function normalizeProductionAnswer(value:string):string{
 return value.replace(/[\s\u3000，。！？、,.!?；;：:「」『』“”‘’"'（）()]/gu,'');
}
export function productionAnswerCorrect(answer:string,canonical:string,acceptedAnswers:readonly string[]):boolean{
 const normalized=normalizeProductionAnswer(answer);
 return normalized.length>0&&[canonical,...acceptedAnswers].some(candidate=>normalizeProductionAnswer(candidate)===normalized);
}
