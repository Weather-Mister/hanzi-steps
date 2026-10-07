import {normalizePinyin,type VocabularyLookupItem} from './vocabulary-lookup.ts';

export type ExamStudySourceWord={
 traditional:string;
 pinyin:string;
 meaning:string;
};

export type ExamStudySet={
 id:number;
 title:string;
 words:ExamStudySourceWord[];
};

/**
 * Exam Study is intentionally separate from curriculum/progress data.
 * Add each homework/exam list here as its own numbered set.
 * Exam Study never writes to curriculum progress, normal mastery, streaks,
 * studied-word counters, or the backend. The UI may keep only a per-list,
 * device-local weekly Mastered checklist so exam lists remain isolated.
 */
export const examStudySets:ExamStudySet[]=[
 {
  id:1,
  title:'Week 1',
  words:[
   {traditional:'您',pinyin:'nín',meaning:'you (formal and respectful)'},
   {traditional:'貴姓',pinyin:'guìxìng',meaning:'May I know your last name?'},
   {traditional:'姓',pinyin:'xìng',meaning:'surname; family name; last name'},
   {traditional:'李',pinyin:'Lǐ',meaning:'a common Chinese surname'},
   {traditional:'先生',pinyin:'xiānshēng / xiānsheng',meaning:'Mr.; Sir; gentleman; husband'},
   {traditional:'王',pinyin:'Wáng',meaning:'a common Chinese surname'},
   {traditional:'我',pinyin:'wǒ',meaning:'I; me'},
   {traditional:'叫',pinyin:'jiào',meaning:'to be called (by the name of); to call'},
   {traditional:'好',pinyin:'hǎo',meaning:'to be good; well'},
   {traditional:'是',pinyin:'shì',meaning:'to be (am, are, is)'},
   {traditional:'美國人',pinyin:'Měiguórén',meaning:'American'},
   {traditional:'美國',pinyin:'Měiguó',meaning:'U.S.A.; America'},
   {traditional:'國',pinyin:'guó',meaning:'country; nation'},
   {traditional:'人',pinyin:'rén',meaning:'person'},
   {traditional:'嗎',pinyin:'ma',meaning:'question particle'},
   {traditional:'不',pinyin:'bù / bú',meaning:'not'},
   {traditional:'英國',pinyin:'Yīngguó',meaning:'England; Britain'},
   {traditional:'你',pinyin:'nǐ',meaning:'you'},
   {traditional:'什麼',pinyin:'shénme',meaning:'what'},
  ],
 },
 {
  id:2,
  title:'Week 2',
  words:[
   {traditional:'名字',pinyin:'míngzi',meaning:'full name; first name; given name'},
   {traditional:'哪',pinyin:'nǎ / něi',meaning:'which'},
   {traditional:'呢',pinyin:'ne',meaning:'question particle'},
   {traditional:'臺灣',pinyin:'Táiwān',meaning:'Taiwan'},
   {traditional:'他',pinyin:'tā',meaning:'he; him; she; her'},
   {traditional:'中國',pinyin:'Zhōngguó',meaning:'China; Chinese'},
   {traditional:'她',pinyin:'tā',meaning:'she; her'},
   {traditional:'誰',pinyin:'shéi',meaning:'who; whom'},
   {traditional:'華人',pinyin:'Huárén',meaning:'Ethnic Chinese; overseas Chinese; citizen of Chinese origin'},
  ],
 },
 {
  id:3,
  title:'Week 3',
  words:[
   {traditional:'早',pinyin:'zǎo',meaning:'Good morning / to be early'},
   {traditional:'趙',pinyin:'Zhào',meaning:'a common Chinese surname'},
   {traditional:'小姐',pinyin:'xiǎojiě',meaning:'Miss'},
   {traditional:'張',pinyin:'Zhāng',meaning:'a common Chinese surname'},
   {traditional:'好久不見',pinyin:'hǎojiǔbújiàn',meaning:'Long time no see.'},
   {traditional:'好',pinyin:'hǎo',meaning:'very, quite, so'},
   {traditional:'久',pinyin:'jiǔ',meaning:'to be a long time'},
   {traditional:'見',pinyin:'jiàn',meaning:'to see, to meet'},
   {traditional:'啊',pinyin:'a',meaning:'a phrase final particle, indicating affirmation, exclamation, etc; an interrogative final particle, used when the answer is assumed.'},
   {traditional:'很',pinyin:'hěn',meaning:'very'},
   {traditional:'謝謝',pinyin:'xièxie',meaning:'to thank, to thank you'},
   {traditional:'也',pinyin:'yě',meaning:'also'},
   {traditional:'這',pinyin:'zhè / zhèi',meaning:'this'},
   {traditional:'太太',pinyin:'tàitai',meaning:'Mrs., wife'},
   {traditional:'你們',pinyin:'nǐmen',meaning:'you (plural)'},
   {traditional:'們',pinyin:'men',meaning:'used after pronouns 我, 你, 他 or certain nouns denoting a group of persons'},
   {traditional:'我們',pinyin:'wǒmen',meaning:'we, us'},
   {traditional:'他們',pinyin:'tāmen',meaning:'they, them'},
  ],
 },
 {
  id:4,
  title:'Week 4',
  words:[
   {traditional:'天氣',pinyin:'tiānqì / tiānci',meaning:'weather'},
   {traditional:'熱',pinyin:'rè',meaning:'to be hot'},
   {traditional:'忙',pinyin:'máng',meaning:'to be busy'},
   {traditional:'太',pinyin:'tài',meaning:'too'},
   {traditional:'去',pinyin:'qù / cyù',meaning:'to go'},
   {traditional:'上課',pinyin:'shàngkè',meaning:'to go to class; to attend class'},
   {traditional:'再見',pinyin:'zàijiàn',meaning:'Good-bye. (lit. See you again.)'},
   {traditional:'冷',pinyin:'lěng',meaning:'to be cold'},
  ],
 },
];

const hanziPattern=/[\u3400-\u9fff\uf900-\ufaff]/;

export function examStudyItems(set:ExamStudySet):VocabularyLookupItem[]{
 return set.words.map((word,index)=>{
  const normalizedSpacedPinyin=normalizePinyin(word.pinyin);
  return {
   id:`exam:${set.id}:${index}:${word.traditional}:${normalizedSpacedPinyin.replace(/\s/g,'')}`,
   traditional:word.traditional,
   pinyin:word.pinyin,
   normalizedPinyin:normalizedSpacedPinyin.replace(/\s/g,''),
   normalizedSpacedPinyin,
   meaning:word.meaning,
   characters:Array.from(word.traditional).filter(char=>hanziPattern.test(char)),
   lessonId:`exam-study-${set.id}`,
  };
 });
}
