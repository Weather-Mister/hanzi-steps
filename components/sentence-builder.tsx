'use client';

// Shared by ordinary order steps and production's final help level.
export function SentenceBuilder({tokens,order,picked,disabled,onPick,onRemove}:{tokens:string[];order:number[];picked:number[];disabled:boolean;onPick:(index:number)=>void;onRemove:(position:number)=>void}){
 return <><div className="word-answer" aria-label="Your answer">{picked.length?picked.map((index,position)=><button key={position} lang="zh-Hant-TW" className="word-tile" disabled={disabled} onClick={()=>onRemove(position)}>{tokens[index]}</button>):<span>Tap the words below</span>}</div><div className="word-bank">{order.map(index=><button key={index} lang="zh-Hant-TW" disabled={picked.includes(index)||disabled} className={`word-tile ${picked.includes(index)?'used':''}`} onClick={()=>onPick(index)}>{tokens[index]}</button>)}</div></>;
}
