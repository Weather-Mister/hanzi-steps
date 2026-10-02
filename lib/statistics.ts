import {learnedVocabulary} from './vocabulary-lookup.ts';
import {streakFromDays} from './streak.ts';
import type {PracticeStateMap} from './practice-engine.ts';

export type MostPracticedWord={
 id:string;
 traditional:string;
 pinyin:string;
 meaning:string;
 attempts:number;
};

export function learningStatistics(args:{
 completed:Set<string>;
 studyDays:readonly string[];
 practiceStates:PracticeStateMap;
 mastered:Set<string>;
 reverseMastered:Set<string>;
 learnedCharacters:number;
 completedUnits:number;
 now?:number;
}){
 const learnedWords=learnedVocabulary(args.completed);
 const learnedWordIds=new Set(learnedWords.map(item=>item.id));
 const attemptsByItem=new Map<string,number>();
 for(const row of Object.values(args.practiceStates)){
  attemptsByItem.set(row.itemId,(attemptsByItem.get(row.itemId)??0)+row.attempts);
 }
 let mostPracticedWord:MostPracticedWord|null=null;
 for(const word of learnedWords){
  const attempts=attemptsByItem.get(word.id)??0;
  if(attempts<=0)continue;
  if(!mostPracticedWord||attempts>mostPracticedWord.attempts||
    (attempts===mostPracticedWord.attempts&&word.traditional.localeCompare(mostPracticedWord.traditional,'zh-Hant')<0)){
   mostPracticedWord={id:word.id,traditional:word.traditional,pinyin:word.pinyin,meaning:word.meaning,attempts};
  }
 }
 const streak=streakFromDays(args.studyDays,args.now??Date.now());
 const masteredWords=[...args.mastered].filter(id=>learnedWordIds.has(id)).length;
 const pinyinMasteredWords=[...args.reverseMastered].filter(id=>learnedWordIds.has(id)).length;
 const totalPracticeAttempts=Object.values(args.practiceStates).reduce((sum,row)=>sum+row.attempts,0);
 return {
  streak,
  learnedWords:learnedWords.length,
  masteredWords,
  pinyinMasteredWords,
  learnedCharacters:args.learnedCharacters,
  completedUnits:args.completedUnits,
  studyDays:new Set(args.studyDays).size,
  totalPracticeAttempts,
  mostPracticedWord,
 };
}
