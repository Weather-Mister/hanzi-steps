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
