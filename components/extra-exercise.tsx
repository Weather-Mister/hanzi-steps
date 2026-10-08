'use client';
import {useEffect,useRef,useState} from 'react';
import {Check,Lightbulb,Volume2} from 'lucide-react';
import type {Step} from '../course/schema';
import {shuffled} from '../lib/curriculum';
import {extraAnswer,extraChoices,extraWord,extraWords,type ExtraWord} from '../course/extras/units';
import {useSpeech} from '../lib/use-speech';
import {useInteractionFeedback} from './interaction-feedback';
import {ExtraPicture} from './extra-picture';
import {WritingPad} from './writing-pad';
import '../app/extras.css';

export function ExtraWordCard({word,pinyin=true,writing=false}:{word:ExtraWord;pinyin?:boolean;writing?:boolean}){
 const {speak,playing,message}=useSpeech();
 const [showWriting,setShowWriting]=useState(false);
 return <article className="extra-word-card"><ExtraPicture id={word.id}/><div><h2 lang="zh-Hant-TW">{word.text}</h2>{pinyin&&<p className="pinyin">{word.pinyin}</p>}<h3>{word.meaning}</h3><button className="audio-button" disabled={playing} onClick={()=>void speak(word.text)} aria-label={'Listen to '+word.text}><Volume2 size={17}/>{playing?'Playing…':'Listen'}</button>{message&&<p role="status">{message}</p>}<p className="extra-counted"><strong lang="zh-Hant-TW">{word.counted}</strong>{pinyin&&<span>{word.countedPinyin}</span>}</p><p className="extra-measure-label"><strong lang="zh-Hant-TW">{word.measure}</strong>{pinyin&&<> · {word.measurePinyin}</>} · measure word</p><p>{word.note}</p><ul className="extra-glyph-notes">{word.glyphNotes.map(note=><li key={note}>{note}</li>)}</ul>{writing&&<details className="extra-writing" onToggle={event=>setShowWriting(event.currentTarget.open)}><summary>Explore the strokes</summary><p>Optional writing practice. Choose a character to study its stroke order.</p>{showWriting&&<ExtraWriting word={word}/>}</details>}</div></article>;
}
function ExtraWriting({word}:{word:ExtraWord}){
 const glyphs=Array.from(word.text).filter(c=>/[\u3400-\u9fff]/.test(c));
 const [char,setChar]=useState(glyphs[0]);
 return <><div className="extra-glyph-buttons">{glyphs.map(c=><button type="button" key={c} aria-pressed={char===c} onClick={()=>setChar(c)} lang="zh-Hant-TW">{c}</button>)}</div><WritingPad key={char} char={char} mode="intro"/></>;
}
export function ExtraExercise({step,sessionSeed,pinyin=true,onAdvance}:{step:Step;sessionSeed:string;pinyin?:boolean;onAdvance:(assessed:boolean,assisted:boolean)=>void}){
 const activity=step.extra!;
 const word=extraWord(activity.wordId||'');
 const bank=(activity.wordIds||[]).map(id=>extraWord(id)!);
 const mode=activity.mode;
 const [selected,setSelected]=useState('');
 const [feedback,setFeedback]=useState<'good'|'wrong'|null>(null);
 const [helped,setHelped]=useState(false);
 const [showSupport,setShowSupport]=useState(false);
 const [heard,setHeard]=useState(false);
 const [textFallback,setTextFallback]=useState(false);
 const [left,setLeft]=useState(''),[right,setRight]=useState('');
 const [matched,setMatched]=useState<string[]>([]);
 const [mismatch,setMismatch]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 const {speak,stop,playing,message}=useSpeech();
 const {feedback:feel}=useInteractionFeedback();
 const learn=mode==='learn';
 const matching=mode==='match'||mode==='measure-match';
 const pictureAnswers=mode==='picture'||mode==='listen-picture';
 const options=shuffled(extraChoices(step),sessionSeed+':'+step.id);
 const matchOrder=shuffled(bank.map(w=>w.id),sessionSeed+step.id+':pictures');
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})},[step.id]);
 async function listen(slow=false){const ok=await speak(word!.text,slow);if(ok)setHeard(true);else{setTextFallback(true);setHelped(true)}}
 function result(ok:boolean){if(!ok)setHelped(true);setFeedback(ok?'good':'wrong');feel(ok?'success':'retry')}
 function match(id:string,side:'left'|'right'){
  let a=mismatch?'':left,b=mismatch?'':right;
  if(side==='left')a=id;else b=id;
  setLeft(a);setRight(b);setMismatch(false);
  if(a&&b){
   if(a===b){const next=[...matched,a];setMatched(next);setLeft('');setRight('');if(next.length===bank.length)result(true);else feel('success');}
   else{setHelped(true);setMismatch(true);feel('retry');}
  }
 }
 const titles={
  learn:word?'Meet '+word.meaning:'Meet the collection',
  picture:'Find the picture for this word',
  word:'Which word names this picture?',
  'listen-picture':'Listen, then find it',
  match:'Match the words with their pictures',
  'measure-match':'Match each noun with its counting word',
  measure:'Choose the measure word for this group',
  character:'Recognize a character inside the word',
  count:'Choose the label for what you see',
 };
 const explanation=word?(mode==='measure'?word.counted+' · '+word.countedPinyin+'. '+word.note:mode==='character'?activity.glyph+' appears in '+word.text+' ('+word.pinyin+'), '+word.meaning+'.':mode==='count'?extraAnswer(step)+' — '+activity.count+(word.measure==='雙'?' pairs of ':word.measure==='串'?' bunches of ':' ')+word.meaning+'.':word.text+' ('+word.pinyin+') — '+word.meaning+'.'):'Every word found its picture.';
 const ready=learn||feedback!==null||(!matching&&selected!==''&&(mode!=='listen-picture'||heard||textFallback));
 function proceed(){if(learn){stop();onAdvance(false,false)}else if(feedback==='good'){stop();onAdvance(true,helped)}else if(feedback==='wrong'){setFeedback(null);setSelected('')}else result(selected===extraAnswer(step))}
 return <><section className="exercise-body extra-exercise" data-extra-step={step.id}><div className="exercise-kind"><Lightbulb size={16}/><span>{learn?'Learn':'Practice'} · Optional extra</span></div><h1 ref={heading} tabIndex={-1} className="exercise-prompt">{titles[mode]}</h1>
  {learn&&(word?<ExtraWordCard word={word} pinyin={pinyin} writing/>:<><p className="extra-collection-note">Read these words and their counting phrases before practicing. 一 means one, 兩 means two before a measure word, and 三 means three: number → measure word → noun. The pictures show whole fruits, a bunch of grapes, and pairs of shoes or socks. Other counting words can be natural in other contexts.</p><div className="extra-study-grid">{bank.map(w=><ExtraWordCard key={w.id} word={w} pinyin={pinyin}/>)}</div></>)}
  {(mode==='word'||mode==='measure'||mode==='character')&&word&&<div className="extra-target"><ExtraPicture id={word.id}/>{mode==='measure'?<div><p lang="zh-Hant-TW">一 __ {word.text}</p><small>{word.measure==='雙'?'Count one pair (two individual items).':word.measure==='串'?'Count one bunch of grapes.':word.id==='skirt'?'Use the long-garment counting word taught here.':'Count one whole '+word.meaning+'.'}</small></div>:mode==='character'?<p>Find the first Chinese character in the word for <strong>{word.meaning}</strong>.</p>:null}</div>}
  {mode==='picture'&&<div className="extra-word-cue" lang="zh-Hant-TW">{word!.text}</div>}
  {mode==='listen-picture'&&<div className="listening-cue" data-feedback="quiet"><button className="listen-large" disabled={playing||!!feedback} onClick={()=>void listen()} aria-label="Play the word"><Volume2 size={30}/><span>{playing?'Playing…':'Play audio'}</span></button><button className="text-button" disabled={playing||!!feedback} onClick={()=>void listen(true)}>Play slowly</button>{!textFallback&&!feedback&&<button className="text-button" onClick={()=>{setTextFallback(true);setHelped(true)}}>Use text instead</button>}{textFallback&&<p className="pinyin-cue">{word!.text} · {word!.pinyin}</p>}{message&&<p role="status">{message}</p>}</div>}
  {mode==='count'&&word&&<><p className="extra-collection-note">{word.measure==='雙'?'Each picture is one pair. Count the pairs.':word.measure==='串'?'Each picture is one bunch. Count the bunches.':'Count the whole items.'}</p><div className="extra-count-pictures">{Array.from({length:activity.count!},(_,i)=><ExtraPicture key={i} id={word.id}/>)}</div></>}
  {!learn&&!matching&&<div className={'choice-grid extra-choice-grid '+(pictureAnswers?'extra-picture-grid':'')}>{options.map((value,index)=><button type="button" key={value} data-extra-choice={value} disabled={!!feedback||(mode==='listen-picture'&&!heard&&!textFallback)} className={'choice extra-choice '+(selected===value?'selected ':'')+(selected===value&&feedback?(feedback==='good'?'correct':'wrong'):'')} aria-pressed={selected===value} onClick={()=>setSelected(value)}><span className="choice-key">{index+1}</span>{pictureAnswers?<ExtraPicture id={value}/>:<span lang="zh-Hant-TW" className="extra-choice-word">{mode==='word'?extraWord(value)!.text:value}</span>}{selected===value&&feedback==='good'&&<Check size={18}/>}</button>)}</div>}
  {matching&&<><p className="extra-collection-note">{mode==='measure-match'?'Use the counting contexts on your cards: whole garments, pairs, whole fruits, or a bunch. Each counting word is used once in this set.':'Choose a word and the picture that names it.'}</p><div className="extra-match match-columns"><div>{bank.map(w=><button type="button" key={w.id} data-extra-match-side="left" data-extra-word={w.id} disabled={matched.includes(w.id)||!!feedback} className={'match-tile hanzi '+(matched.includes(w.id)?'matched':'')+' '+(left===w.id?(mismatch?'wrong':'selected'):'')} onClick={()=>match(w.id,'left')} aria-pressed={left===w.id} lang="zh-Hant-TW">{w.text}{matched.includes(w.id)&&<Check size={18}/>}</button>)}</div><div>{matchOrder.map(id=><button type="button" key={id} data-extra-match-side="right" data-extra-word={id} disabled={matched.includes(id)||!!feedback} className={'match-tile extra-match-picture '+(matched.includes(id)?'matched':'')+' '+(right===id?(mismatch?'wrong':'selected'):'')} onClick={()=>match(id,'right')} aria-pressed={right===id}>{mode==='measure-match'?<span className="extra-choice-word" lang="zh-Hant-TW">{extraWord(id)!.measure}</span>:<ExtraPicture id={id}/>} {matched.includes(id)&&<Check size={18}/>}</button>)}</div></div></>}
  {mismatch&&<p className="exercise-note" role="status">Those do not match. Choose a new pair.</p>}
  {!learn&&!feedback&&<><button className="text-button" onClick={()=>{setShowSupport(v=>!v);setHelped(true)}}>{showSupport?'Hide study cards':'Review the study cards'}</button>{showSupport&&<div className="extra-study-grid">{(bank.length?bank:word?[word]:extraWords).map(w=><ExtraWordCard key={w.id} word={w} pinyin={pinyin}/>)}</div>}</>}
 </section><footer className={'exercise-footer '+(feedback==='good'?'positive':feedback==='wrong'?'negative':'')}><div role="status">{feedback&&<><strong>{feedback==='good'?'You got it.':'Try once more.'}</strong><p>{feedback==='good'?explanation:'Review the study cards if you need a reminder.'}</p></>}</div><button className="primary-button continue-button" disabled={!ready} onClick={proceed}>{learn||feedback==='good'?'Continue':feedback==='wrong'?'Try again':'Check answer'}</button></footer></>;
}
