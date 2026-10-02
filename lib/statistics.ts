import {learnedVocabulary} from './vocabulary-lookup.ts';
import {streakFromDays} from './streak.ts';
import type {PracticeMode,PracticeStateMap} from './practice-engine.ts';

export type MostPracticedWord={
 id:string;
 traditional:string;
 pinyin:string;
 meaning:string;
 attempts:number;
};

export type PracticeModeStat={
 mode:PracticeMode;
 label:string;
 attempts:number;
 correct:number;
 assisted:number;
 misses:number;
 cleanCorrect:number;
 cleanTracked:number;
};

const DAY=86_400_000;
const modeLabels:Record<PracticeMode,string>={
 recognition:'Recognition',
 recall:'Recall',
 pinyin:'Pinyin',
 input:'Typing',
 sentence:'Sentences',
 handwriting:'Handwriting',
 context:'Context',
};

function directPracticeRecord(itemId:string){
 return itemId.startsWith('v1:')||
  itemId.startsWith('phrase:')||
  itemId.startsWith('char:')||
  itemId.startsWith('unguided-writing:');
}

function dateIndex(day:string){
 const value=Date.parse(day+'T00:00:00Z');
 return Number.isFinite(value)?Math.floor(value/DAY):0;
}
function indexDay(index:number){return new Date(index*DAY).toISOString().slice(0,10)}
function compactDate(day:string){
 const date=new Date(day+'T00:00:00Z');
 return new Intl.DateTimeFormat('en',{month:'short',day:'numeric',timeZone:'UTC'}).format(date);
}

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
 const unguidedByCharacter=new Map<string,number>();
 const practiceModeMap=new Map<PracticeMode,PracticeModeStat>();
 let totalCorrect=0,totalAttempts=0,totalAssisted=0,totalMisses=0,totalCleanCorrect=0,totalCleanTracked=0;
 for(const row of Object.values(args.practiceStates)){
  attemptsByItem.set(row.itemId,(attemptsByItem.get(row.itemId)??0)+row.attempts);
  if(row.itemId.startsWith('unguided-writing:')){
   const char=row.itemId.slice('unguided-writing:'.length);
   unguidedByCharacter.set(char,(unguidedByCharacter.get(char)??0)+row.attempts);
  }
  if(!directPracticeRecord(row.itemId))continue;
  totalAttempts+=row.attempts;
  totalCorrect+=row.correct;
  totalAssisted+=row.assisted;
  totalMisses+=row.misses;
  totalCleanCorrect+=row.cleanCorrect??0;
  totalCleanTracked+=row.cleanTracked??0;
  const current=practiceModeMap.get(row.mode)??{
   mode:row.mode,label:modeLabels[row.mode],attempts:0,correct:0,assisted:0,misses:0,cleanCorrect:0,cleanTracked:0,
  };
  current.attempts+=row.attempts;
  current.correct+=row.correct;
  current.assisted+=row.assisted;
  current.misses+=row.misses;
  current.cleanCorrect+=row.cleanCorrect??0;
  current.cleanTracked+=row.cleanTracked??0;
  practiceModeMap.set(row.mode,current);
 }

 const topPracticedWords=learnedWords.map(word=>{
  const chars=Array.from(word.traditional);
  const unguidedRounds=chars.length===1?(unguidedByCharacter.get(chars[0])??0):0;
  return {
   id:word.id,traditional:word.traditional,pinyin:word.pinyin,meaning:word.meaning,
   attempts:(attemptsByItem.get(word.id)??0)+unguidedRounds,
   unguidedRounds,
  };
 }).filter(word=>word.attempts>0).sort((a,b)=>
  b.attempts-a.attempts||a.traditional.localeCompare(b.traditional,'zh-Hant')
 ).slice(0,5);
 const mostPracticedWord=topPracticedWords[0]??null;

 const streak=streakFromDays(args.studyDays,args.now??Date.now());
 const masteredWords=[...args.mastered].filter(id=>learnedWordIds.has(id)).length;
 const pinyinMasteredWords=[...args.reverseMastered].filter(id=>learnedWordIds.has(id)).length;
 const masteredRate=learnedWords.length?Math.round(masteredWords/learnedWords.length*100):0;
 const pinyinMasteredRate=learnedWords.length?Math.round(pinyinMasteredWords/learnedWords.length*100):0;
 const successRate=totalAttempts?Math.round(totalCorrect/totalAttempts*100):0;
 const strictAccuracy=totalCleanTracked?Math.round(totalCleanCorrect/totalCleanTracked*100):0;
 const strictCoverage=totalAttempts?Math.round(totalCleanTracked/totalAttempts*100):0;
 const assistedRate=totalAttempts?Math.round(totalAssisted/totalAttempts*100):0;

 const todayIndex=dateIndex(streak.today);
 const studySet=new Set(args.studyDays);
 const activityGrid=Array.from({length:84},(_,offset)=>{
  const index=todayIndex-83+offset;
  const date=indexDay(index);
  return {date,active:studySet.has(date),today:index===todayIndex};
 });
 const weekStart=todayIndex-((new Date(todayIndex*DAY).getUTCDay()+6)%7);
 const weeklyActivity=Array.from({length:12},(_,offset)=>{
  const start=weekStart-(11-offset)*7;
  const days=Array.from({length:7},(_,i)=>indexDay(start+i));
  return {
   start:days[0],
   label:compactDate(days[0]),
   activeDays:days.filter(day=>studySet.has(day)).length,
  };
 });

 const practiceByMode=[...practiceModeMap.values()].filter(row=>row.attempts>0)
  .sort((a,b)=>b.attempts-a.attempts||a.label.localeCompare(b.label));

 return {
  streak,
  learnedWords:learnedWords.length,
  masteredWords,
  pinyinMasteredWords,
  masteredRate,
  pinyinMasteredRate,
  learnedCharacters:args.learnedCharacters,
  completedUnits:args.completedUnits,
  studyDays:new Set(args.studyDays).size,
  totalPracticeAttempts:totalAttempts,
  totalCorrect,
  totalMisses,
  totalCleanCorrect,
  totalCleanTracked,
  successRate,
  strictAccuracy,
  strictCoverage,
  assistedRate,
  mostPracticedWord,
  topPracticedWords,
  practiceByMode,
  activityGrid,
  weeklyActivity,
 };
}
