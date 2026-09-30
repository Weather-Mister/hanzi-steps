const SIMPLE_TIME_TOKENS=new Set([
 '今天','明天','昨天','後天','前天','現在','最近',
 '早上','上午','中午','下午','晚上','週末','周末',
 '每天','天天','每週','每周','今年','明年','去年','前年','後年',
]);

const NON_TOPIC_STARTERS=new Set([
 '都','也','常','不','沒','沒有','很','真','太','再','又','還','就','才','先','一起',
 '去','來','想','要','會','能','可以','應該','最好','請','別','把','被','跟','和',
]);

const NUMBER='〇零一二三四五六七八九十百千兩0-9';

export function isTimeToken(token:string):boolean{
 const text=token.replace(/[，。！？、,.!?]/g,'');
 if(SIMPLE_TIME_TOKENS.has(text))return true;
 if(/^(?:今天|明天|昨天|後天|前天)?(?:早上|上午|中午|下午|晚上)$/.test(text))return true;
 if(/^(?:每天|天天)(?:早上|上午|中午|下午|晚上)?$/.test(text))return true;
 if(/^(?:星期|禮拜|週|周)[一二三四五六日天](?:早上|上午|中午|下午|晚上)?$/.test(text))return true;
 if(new RegExp(`^[${NUMBER}]+點(?:半|[${NUMBER}]+分)?$`).test(text))return true;
 if(new RegExp(`^[${NUMBER}]+(?:年|月|號|日)$`).test(text))return true;
 return false;
}

function sameTokens(a:string[],b:string[]):boolean{
 return a.length===b.length&&a.every((token,index)=>token===b[index]);
}

function leadingTimeCount(tokens:string[],start=0):number{
 let count=0;
 while(start+count<tokens.length&&isTimeToken(tokens[start+count]))count++;
 return count;
}

function canBeTopicOrSubject(token:string|undefined):boolean{
 return !!token&&!isTimeToken(token)&&!NON_TOPIC_STARTERS.has(token);
}

/**
 * Sentence builders should not mark a natural Mandarin time-topic variant wrong.
 * We only relax one thing: a contiguous time phrase may swap between sentence-initial
 * position and around the first subject/topic token. A multi-part time phrase may also
 * straddle that topic (明天我早上…), while the time parts keep their original order.\n * Everything else must stay identical.
 */
export function isOrderAnswerAccepted(
 answerTokens:string[],
 canonicalTokens:string[],
 options:{strict?:boolean}={},
):boolean{
 if(sameTokens(answerTokens,canonicalTokens))return true;
 if(options.strict||answerTokens.length!==canonicalTokens.length)return false;

 const leading=leadingTimeCount(canonicalTokens);
 if(leading>0&&leading<canonicalTokens.length&&canBeTopicOrSubject(canonicalTokens[leading])){
  const time=canonicalTokens.slice(0,leading);
  const topic=canonicalTokens[leading];
  const rest=canonicalTokens.slice(leading+1);
  for(let boundary=0;boundary<=time.length;boundary++){
   const alternative=[...time.slice(0,boundary),topic,...time.slice(boundary),...rest];
   if(sameTokens(answerTokens,alternative))return true;
  }
 }

 if(canBeTopicOrSubject(canonicalTokens[0])){
  const afterSubject=leadingTimeCount(canonicalTokens,1);
  if(afterSubject>0){
   const time=canonicalTokens.slice(1,1+afterSubject);
   const topic=canonicalTokens[0];
   const rest=canonicalTokens.slice(1+afterSubject);
   for(let boundary=0;boundary<=time.length;boundary++){
    const alternative=[...time.slice(0,boundary),topic,...time.slice(boundary),...rest];
    if(sameTokens(answerTokens,alternative))return true;
   }
  }
 }

 return false;
}
