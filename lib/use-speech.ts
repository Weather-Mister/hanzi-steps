'use client';
import {useEffect,useRef,useState} from 'react';
/** Device TTS. Callers can request natural-rate listening without changing the
 * established lesson rate. Cancellation always settles the pending promise. */
export function useSpeech(){
 const [message,setMessage]=useState(''),[playing,setPlaying]=useState(false);
 const cancelRef=useRef<(()=>void)|null>(null);
 const mounted=useRef(true);
 function stop(){cancelRef.current?.();cancelRef.current=null;if('speechSynthesis' in window)window.speechSynthesis.cancel();if(mounted.current)setPlaying(false)}
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;stop()}},[]);
 function speak(text:string,slow=false,options?:{natural?:boolean}):Promise<boolean>{
  stop();setMessage('');
  if(!('speechSynthesis' in window)){setMessage('Audio is unavailable here. You can use the transcript without a listening score.');return Promise.resolve(false)}
  const synth=window.speechSynthesis,voices=synth.getVoices();
  const voice=voices.find(v=>/^zh[-_](TW|Hant[-_]TW)$/i.test(v.lang))||voices.find(v=>/^zh[-_]Hant$/i.test(v.lang));
  if(!voice){setMessage('A Taiwanese Mandarin voice is not available on this device. You can use the transcript without a listening score.');return Promise.resolve(false)}
  const utterance=new SpeechSynthesisUtterance(text);utterance.lang='zh-TW';utterance.voice=voice;utterance.rate=slow?.65:options?.natural?1:.85;
  setPlaying(true);
  return new Promise(resolve=>{
   let ended=false;
   const finish=(success:boolean,report=false)=>{
    if(ended)return;ended=true;clearTimeout(timer);cancelRef.current=null;
    if(mounted.current){setPlaying(false);if(report)setMessage('Audio could not play. Retry or use the transcript without a listening score.')}
    resolve(success);
   };
   const timer=setTimeout(()=>{finish(false,true);synth.cancel()},Math.max(15000,Math.min(180000,text.length*(slow?1000:650)+10000)));
   cancelRef.current=()=>finish(false);
   utterance.onend=()=>finish(true);utterance.onerror=()=>finish(false,true);
   try{synth.speak(utterance)}catch{finish(false,true)}
  });
 }
 useEffect(()=>{if(!('speechSynthesis' in window))return;const warm=()=>window.speechSynthesis.getVoices();warm();window.speechSynthesis.addEventListener('voiceschanged',warm);return()=>window.speechSynthesis.removeEventListener('voiceschanged',warm)},[]);
 return {speak,stop,playing,message};
}
