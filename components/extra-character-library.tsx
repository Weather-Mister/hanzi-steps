'use client';
import {useState} from 'react';
import {ArrowRight,Check,PenLine,Volume2} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from './ui/dialog';
import type {Character,Lesson,Session,Unit} from '../course/schema';
import {characters} from '../lib/curriculum';
import {extraLessons,extraPracticeLessons,extraWords} from '../course/extras/units';
import {extraCharacterInfo} from '../course/extras/character-info';
import strokes from '../course/extras/strokes.json';
import {strokeData,CharacterArt} from './character-art';
import {CharacterParts} from './character-parts';
import {WritingPad} from './writing-pad';
import {useSpeech} from '../lib/use-speech';
const supplement=strokes as Record<string,{strokes:string[];medians:number[][][]}>;
function recordFor(char:string):Character{
 if(characters[char])return characters[char];
 const info=extraCharacterInfo[char],geometry=supplement[char];
 const word=extraWords.find(word=>word.text.includes(char)||word.measure===char)!;
 return {hanzi:char,pinyin:info.pinyin,zhuyin:'',meaning:info.meaning,strokes:geometry.strokes.length,note:info.note,memory:info.note,parts:[{label:char,name:'Whole character',role:'Recognize the shape',description:info.note,strokes:geometry.strokes.map((_,i)=>i)}],layout:'whole',layoutLabel:'Character shape',example:{text:word.counted,pinyin:word.countedPinyin,meaning:word.meaning}};
}
export function ExtraCharacterLibrary({unit,sessions,pinyin,onStart}:{unit:Unit;sessions:Session[];pinyin:boolean;onStart:(lesson:Lesson)=>void}){
 const [detail,setDetail]=useState<string|null>(null);
 const [free,setFree]=useState(false),[round,setRound]=useState(0),[done,setDone]=useState(false);
 const {speak,playing,message}=useSpeech();
 const practiced=new Set(sessions.filter(session=>session.complete&&[...extraLessons,...extraPracticeLessons].find(l=>l.id===session.lessonId)?.steps.length===session.index).flatMap(session=>[...extraLessons,...extraPracticeLessons].find(l=>l.id===session.lessonId)!.steps.filter(s=>s.extra?.mode==='writing'&&s.extra.writeMode==='memory').map(s=>s.extra!.glyph!)));
 const character=detail?recordFor(detail):undefined;
 const geometry=detail?(strokeData[detail]||supplement[detail]):undefined;
 return <><div className="character-page-heading"><p className="eyebrow">OPTIONAL EXTRA · CHARACTER LIBRARY</p><h1>A closer look at each character.</h1><p>Explore the characters and measure words, or choose writing practice.</p></div><div className="character-library">{unit.chars.map(char=>{
 const character=recordFor(char);return <button key={char} className="library-card" onClick={()=>{setDetail(char);setFree(false);setDone(false)}}><div className="library-top"><span>{(strokeData[char]||supplement[char]).strokes.length} strokes</span>{practiced.has(char)&&<span className="learned-badge"><Check size={14}/>Practiced</span>}</div><CharacterArt char={char} characterData={supplement[char]}/>{pinyin&&<span className="pinyin">{character.pinyin}</span>}<h2>{character.meaning}</h2><span className="library-action">Explore character<ArrowRight size={17}/></span></button>;
 })}</div><Dialog open={!!detail} onOpenChange={open=>{if(!open)setDetail(null)}}><DialogContent data-unit-theme={unit.theme} className="character-dialog">{detail&&character&&<>
 <DialogTitle><span lang="zh-Hant-TW">{detail}</span> · {character.meaning}</DialogTitle><DialogDescription>{character.pinyin} · {geometry!.strokes.length} strokes</DialogDescription>
 {!free?<><CharacterParts key={detail} character={character} characterData={supplement[detail]}/><p>{extraCharacterInfo[detail].note}</p><button className="audio-button" disabled={playing} onClick={()=>void speak(detail)}><Volume2 size={17}/>Listen</button>{message&&<p role="status">{message}</p>}<details><summary>Watch stroke order</summary><WritingPad char={detail} mode="intro" characterData={supplement[detail]}/></details><div className="character-practice-split"><button className="primary-button character-tracked-practice" onClick={()=>{const lesson=extraPracticeLessons.find(l=>l.id==='extra-practice-'+detail)!;setDetail(null);onStart(lesson)}}>Practice this character<PenLine size={18}/></button><button className="character-free-practice" aria-label={'Start infinite unguided practice for '+detail} onClick={()=>{setFree(true);setDone(false);setRound(0)}}><span aria-hidden="true">∞</span></button></div></>:<><p>Write from memory. A missed stroke reveals just that stroke.</p><WritingPad key={detail+round} char={detail} characterData={supplement[detail]} mode="memory" strict revealStrokeAfterMisses={0} assistanceControls={false} onComplete={()=>setDone(true)}/>{done&&<button className="primary-button" onClick={()=>{setRound(n=>n+1);setDone(false)}}>Another round<ArrowRight size={18}/></button>}<button className="text-button" onClick={()=>setFree(false)}>Back to character</button></>}
 </>}</DialogContent></Dialog></>;
}
