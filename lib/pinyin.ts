const toneMap:Record<string,string>={
 'ā':'a','á':'a','ǎ':'a','à':'a',
 'ē':'e','é':'e','ě':'e','è':'e','ê':'e',
 'ī':'i','í':'i','ǐ':'i','ì':'i',
 'ō':'o','ó':'o','ǒ':'o','ò':'o',
 'ū':'u','ú':'u','ǔ':'u','ù':'u',
 'ǖ':'v','ǘ':'v','ǚ':'v','ǜ':'v','ü':'v',
 'ń':'n','ň':'n','ǹ':'n','ḿ':'m',
};

export function normalizePinyin(value:string):string{
 return value
  .normalize('NFC')
  .trim()
  .toLowerCase()
  .replace(/u:/g,'v')
  .replace(/[āáǎàēéěèêīíǐìōóǒòūúǔùǖǘǚǜüńňǹḿ]/g,char=>toneMap[char]||char)
  .replace(/[0-5]/g,'')
  .replace(/[^a-zv]+/g,' ')
  .trim()
  .replace(/\s+/g,' ');
}

export const compactPinyin=(value:string)=>normalizePinyin(value).replace(/\s/g,'');

// Tolerant spelling recall, not tone assessment. Preserve Gauntlet semantics.
export function matchesPinyin(input:string,expected:string):boolean{
 const answer=compactPinyin(input);
 return answer.length>0&&answer===compactPinyin(expected);
}
