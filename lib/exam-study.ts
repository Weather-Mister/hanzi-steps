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
