'use client';
import {useEffect,useState} from 'react';
export function useSpeech(){
 const [message,setMessage]=useState('');const [playing,setPlaying]=useState(false);
 useEffect(()=>()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel()},[]);
 function stop(){if('speechSynthesis' in window)window.speechSynthesis.cancel();setPlaying(false)}
 function speak(text:string,slow=false):Promise<boolean>{
  setMessage('');if(!('speechSynthesis' in window)){setMessage('Audio is unavailable here. Use the pinyin to continue.');return Promise.resolve(false)}
  const synth=window.speechSynthesis;const voices=synth.getVoices();const voice=voices.find(v=>/^zh[-_](TW|Hant[-_]TW)$/i.test(v.lang))||voices.find(v=>/^zh[-_]Hant$/i.test(v.lang));
  if(!voice){setMessage('A Taiwanese Mandarin voice is not available on this device. You can continue with pinyin.');return Promise.resolve(false)}
  synth.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='zh-TW';utterance.voice=voice;utterance.rate=slow?.65:.85;
  return new Promise(resolve=>{let ended=false;const finish=(success:boolean)=>{if(ended)return;ended=true;clearTimeout(timer);setPlaying(false);if(!success)setMessage('Audio could not play. You can continue with pinyin.');resolve(success)};const timer=setTimeout(()=>{synth.cancel();finish(false)},15000);utterance.onstart=()=>setPlaying(true);utterance.onend=()=>finish(true);utterance.onerror=()=>finish(false);synth.speak(utterance)})
 }
 useEffect(()=>{if(!('speechSynthesis' in window))return;const warm=()=>window.speechSynthesis.getVoices();warm();window.speechSynthesis.addEventListener('voiceschanged',warm);return()=>window.speechSynthesis.removeEventListener('voiceschanged',warm)},[]);
 return {speak,stop,playing,message};
}
