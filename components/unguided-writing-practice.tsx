'use client';
import {useEffect,useRef,useState} from 'react';
import {ArrowRight,Infinity as InfinityIcon,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {characters} from '@/lib/curriculum';
import {WritingPad} from './writing-pad';

export function UnguidedWritingPractice({
 char,
 open,
 onOpenChange,
 theme,
 completedRounds,
 onPracticeComplete,
}:{char:string|null;open:boolean;onOpenChange:(open:boolean)=>void;theme:string;completedRounds:number;onPracticeComplete:(assisted:boolean)=>void}){
 const [round,setRound]=useState(1);
 const [complete,setComplete]=useState(false);
 const [assisted,setAssisted]=useState(false);
 const countedRound=useRef(0);

 useEffect(()=>{
  if(!open)return;
  setRound(completedRounds+1);
  setComplete(false);
  setAssisted(false);
  countedRound.current=0;
 },[open,char]);

 if(!char||!characters[char])return null;
 function finishRound(withHelp:boolean){
  if(countedRound.current===round)return;
  countedRound.current=round;
  setAssisted(withHelp);
  setComplete(true);
  onPracticeComplete(withHelp);
 }
 function continueRound(){
  setComplete(false);
  setAssisted(false);
  setRound(value=>value+1);
 }
 return <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent data-unit-theme={theme} className="unguided-writing-dialog">
   <div className="unguided-writing-heading">
    <span className="unguided-writing-icon"><InfinityIcon size={22}/></span>
    <div>
     <DialogTitle>Unguided practice</DialogTitle>
     <DialogDescription>Round {round} · write the selected character from memory.</DialogDescription>
    </div>
   </div>
   <p className="unguided-writing-note">The answer stays hidden while you write. A missed stroke reveals only that stroke, then the same round continues. Nothing here changes your course progress.</p>
   <WritingPad
    key={char+':free:'+round}
    char={char}
    mode="memory"
    strict
    revealStrokeAfterMisses={0}
    assistanceControls={false}
    onComplete={finishRound}
   />
   {complete&&<div className="unguided-writing-result" role="status">
    <div><strong>{assisted?'Round complete with stroke help.':'Round complete.'}</strong><span>{assisted?'The corrected stroke was shown; keep repeating until it feels automatic.':'Clean attempt. Continue whenever you are ready.'}</span></div>
    <button className="primary-button" onClick={continueRound}>Continue <ArrowRight size={18}/></button>
   </div>}
   <button className="secondary-button unguided-writing-quit" onClick={()=>onOpenChange(false)}><X size={17}/>Quit practice</button>
  </DialogContent>
 </Dialog>;
}
