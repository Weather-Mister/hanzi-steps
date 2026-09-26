'use client';
import {Fragment,useEffect,useRef,useState,type ReactNode} from 'react';
import {ArrowRight,BookOpen,Check,CheckCircle2,ChevronRight,CloudCheck,CloudUpload,Flame,GraduationCap,Lightbulb,Lock,MapPin,Play,RotateCcw,Settings2,Sparkles,Swords,Volume2,X,PenLine,Shapes,Trophy,Pause,Search} from 'lucide-react';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Switch} from '@/components/ui/switch';
import {Progress} from '@/components/ui/progress';
import {Character,characterPracticeAvailable,characters,characterOrder,findLesson,GrammarRule,grammarRules,Lesson,lessonAvailable,lessons,phrases,Session,shuffled,Step,Unit,units,books,vocabulary,wordMeaning,unitLibraryCharacters,completedLessonIds,previousLessonLengths} from '@/lib/curriculum';
import {useProgress} from '@/lib/use-progress';
import {useSpeech} from '@/lib/use-speech';
import {CharacterArt} from './character-art';
import {WritingPad} from './writing-pad';
import {UnitPicker} from './unit-picker';
import {StreakCounter} from './streak-counter';
import {InteractionFeedback,useInteractionFeedback} from './interaction-feedback';
import {SmartPractice,type PracticeEntry} from './smart-practice';
import {MegaChallenge} from './mega-challenge';
import {ExamStudy} from './exam-study';
import {PinyinSearch} from './pinyin-search';
import {visualUnitTheme} from '@/lib/unit-theme';
import {adaptivePracticeItems,availableTaiwanMissions,learnedPracticeItems,makeRevengeRound,megaCheckpointCount,practiceAttemptForStep,taiwanMissions} from '@/lib/practice-engine';
import {usePracticeMastery} from '@/lib/use-practice-mastery';
import {useMegaMastery} from '@/lib/use-mega-mastery';
import {unitSourceReference} from '@/lib/unit-source-reference';

type Preferences={pinyin:boolean};
function CharacterParts({character,compact=false}:{character:Character;compact?:boolean}){
 const [selected,setSelected]=useState<number|null>(null);
 return <div className={`character-parts ${compact?'compact':''}`}><div className="parts-heading"><Shapes size={18}/><h3>Inside the character</h3><span>{character.layoutLabel||(character.layout==='whole'?'Whole shape':character.layout==='side'?'Left + right':'Top to bottom')}</span></div><div className="parts-explorer"><div className="parts-main"><CharacterArt char={character.hanzi} highlight={selected===null?undefined:character.parts[selected].strokes}/></div><div className="parts-list">{character.parts.map((part,i)=><button key={i} className={`part-card ${selected===i?'selected':''}`} onClick={()=>setSelected(selected===i?null:i)} aria-pressed={selected===i}><CharacterArt char={character.hanzi} only={part.strokes} className="component-thumbnail"/><span><span className="part-role">{part.role}</span><strong>{part.name}</strong></span><ChevronRight size={16}/></button>)}</div></div><p className="part-explanation">{selected===null?character.note:character.parts[selected].description}</p>{!compact&&<div className="memory-note"><Lightbulb size={19}/><div><strong>Remember {character.hanzi}</strong><p>{character.memory}</p></div></div>}</div>
}
function AudioButton({text,slow=false,className=''}:{text:string;slow?:boolean;className?:string}){const {speak,playing,message}=useSpeech();return <span className={`audio-control ${className}`} data-feedback="quiet"><button className="audio-button" aria-label={`Listen to ${text}`} disabled={playing} onClick={()=>void speak(text,slow)}><Volume2 size={19}/>{playing?'Playing…':slow?'Slow':'Listen'}</button>{message&&<span className="audio-message" role="status">{message}</span>}</span>}
function Phonetics({character,prefs}:{character:Character;prefs:Preferences}){return <>{prefs.pinyin&&<span className="pinyin">{character.pinyin}</span>}</>}

function GrammarCard({rule,prefs}:{rule:GrammarRule;prefs:Preferences}){
 return <article className="pattern-card"><div className="pattern-title"><Lightbulb size={20}/><h2>{rule.title}</h2></div><p className="pattern-formula">{rule.pattern}</p><p className="pattern-explanation">{rule.explanation}</p>{!!rule.words?.length&&<div className="pattern-words">{rule.words.map(text=>{const word=vocabulary.find(w=>w.text===text)!;return <div key={text}><strong lang="zh-Hant-TW">{word.text}</strong>{prefs.pinyin&&<span>{word.pinyin}</span>}<small>{word.meaning}</small></div>})}</div>}<div className="pattern-examples">{rule.examples.map(example=><div key={example.text}><div><p lang="zh-Hant-TW">{example.text}</p>{prefs.pinyin&&<span className="pattern-pinyin">{example.pinyin}</span>}<p className="pattern-translation">{example.meaning}</p></div><AudioButton text={example.text}/></div>)}</div><p className="pattern-remember"><strong>Keep in mind</strong>{rule.remember}</p></article>
}

function UnitNotes({unit,prefs,completed}:{unit:Unit;prefs:Preferences;completed:Set<string>}){
 const words=vocabulary.filter(w=>unit.lessonIds.includes(w.lessonId));
 return <div className="unit-notes"><div className="character-page-heading"><p className="eyebrow">UNIT {String(unit.displayNumber??unit.number).padStart(2,'0')} · WORDS & PATTERNS</p><h1>A little help, whenever you need it.</h1><p>{words.length} words and forms in this unit. Read the notes here, then try them in a lesson.</p></div><section className="vocabulary-section"><h2>Your word list</h2><div className="vocabulary-grid">{words.map(word=><article className="vocabulary-card" key={word.text}><div className="vocabulary-heading"><strong lang="zh-Hant-TW">{word.text}</strong>{completed.has(word.lessonId)&&<span className="learned-badge"><Check size={14}/>Practiced</span>}</div>{prefs.pinyin&&<p className="pinyin">{word.pinyin}</p>}<p>{word.meaning}</p>{word.note&&<small>{word.note}</small>}<AudioButton text={word.text}/></article>)}</div></section><section className="unit-patterns"><h2>How the words fit together</h2>{unit.grammarIds.length?unit.grammarIds.map(id=><GrammarCard key={id} rule={grammarRules[id]} prefs={prefs}/>):Object.entries(phrases).filter(([id])=>['hello','student','identity','question'].includes(id)).map(([id,phrase])=><article className="pattern-card" key={id}><h3 lang="zh-Hant-TW">{phrase.text}</h3>{prefs.pinyin&&<p className="pinyin">{phrase.pinyin}</p>}<p>{phrase.meaning}</p><p className="pattern-explanation">{phrase.note}</p><AudioButton text={phrase.text}/></article>)}</section><p className="frequency-note">Hanzi Steps follows <em>A Course in Contemporary Chinese</em>, teaching Taiwan Mandarin through structured vocabulary, grammar, characters, listening, culture, and cumulative review. Each unit is designed around the textbook’s actual learning goals, with frequency data used only as a secondary reference for everyday usefulness.</p></div>
}

function MatchExercise({chars,seed,onComplete,onMistake}:{chars:string[];seed:string;onComplete:()=>void;onMistake:()=>void}){
 const {feedback:feel}=useInteractionFeedback();
 const [left,setLeft]=useState<string|null>(null);const [right,setRight]=useState<string|null>(null);const [matched,setMatched]=useState<string[]>([]);const [wrong,setWrong]=useState(false);const [note,setNote]=useState('Choose a character and its meaning.');
 const rightOrder=shuffled(chars,seed+'meanings');
 function choose(char:string,side:'left'|'right'){if(matched.includes(char))return;let a=left,b=right;if(wrong){a=null;b=null;setLeft(null);setRight(null);setWrong(false)}if(side==='left'){a=char;setLeft(char)}else{b=char;setRight(char)}if(a&&b){if(a===b){const next=[...matched,a];setMatched(next);setLeft(null);setRight(null);setNote('Matched!');if(next.length===chars.length)onComplete();else feel('success')}else{feel('retry');setWrong(true);setNote('Those do not match. Pick a new pair.');onMistake()}}}
 return <div className="match-exercise"><div className="match-columns"><div>{chars.map(c=><button key={c} disabled={matched.includes(c)} className={`match-tile hanzi ${matched.includes(c)?'matched':''} ${left===c?(wrong?'wrong':'selected'):''}`} onClick={()=>choose(c,'left')} lang="zh-Hant-TW">{c}{matched.includes(c)&&<Check size={18}/>}</button>)}</div><div>{rightOrder.map(c=><button key={c} disabled={matched.includes(c)} className={`match-tile ${matched.includes(c)?'matched':''} ${right===c?(wrong?'wrong':'selected'):''}`} onClick={()=>choose(c,'right')}>{characters[c].meaning}{matched.includes(c)&&<Check size={18}/>}</button>)}</div></div><p className="exercise-note" aria-live="polite">{note}</p></div>
}
function Exercise({step,prefs,onAdvance,onAttempt}:{step:Step;prefs:Preferences;onAdvance:(assessed:boolean,assisted:boolean)=>void;onAttempt?:(step:Step,correct:boolean,assisted:boolean)=>void}){
 const {feedback:feel}=useInteractionFeedback();
 const [selected,setSelected]=useState('');const [picked,setPicked]=useState<number[]>([]);const [feedback,setFeedback]=useState<'good'|'wrong'|null>(null);const [explanation,setExplanation]=useState('');const [hadHelp,setHadHelp]=useState(false);const hadHelpRef=useRef(false);const [retry,setRetry]=useState(0);const [textCue,setTextCue]=useState(false);const [heard,setHeard]=useState(false);const [hint,setHint]=useState(false);const heading=useRef<HTMLHeadingElement>(null);const {speak,stop,playing,message}=useSpeech();
 const c=step.char?characters[step.char]:undefined;const phrase=step.phrase?phrases[step.phrase]:undefined;
 const introduction=step.type==='intro'||step.type==='phrase'||step.type==='grammar';const writing=step.type==='trace'||step.type==='complete'||step.type==='memory';
 const support=()=>{setHadHelp(true);hadHelpRef.current=true};
 function result(ok:boolean,text:string,assisted=false){const masteryAssisted=ok&&(assisted||hadHelpRef.current||step.type==='trace'||step.type==='complete');onAttempt?.(step,ok,masteryAssisted);if(assisted)support();if(!ok)support();feel(ok?'success':'retry');setFeedback(ok?'good':'wrong');setExplanation(text)}
 useEffect(()=>{heading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})},[step.id]);
 const prompts:Record<string,string>={intro:'Meet a new character',trace:'Trace the character',complete:'Finish the missing strokes',memory:'Write it from memory',parts:step.prompt||'Look inside the character',build:'Build the character',match:'Match the pairs',phrase:'Put it into words',grammar:'A useful pattern',order:'Build the translation',listen:step.prompt||(textCue?'Match the pinyin':'Which character do you hear?'),select:step.prompt||'Choose the character'};
 const choices=shuffled(step.options||[],step.id);const parts=c?.parts||[];const partOrder=shuffled(parts.map((_,i)=>i),step.id+'parts');const tokens=step.tokens||[];
 async function listen(slow=false){const ok=await speak(step.audioText||step.char!,slow);if(ok)setHeard(true);else{setTextCue(true);support()}}
 function check(){if(step.type==='build')result(picked.length===parts.length&&picked.every((v,i)=>v===i),`${c!.hanzi} is arranged ${c!.partOrderLabel||(c!.layout==='side'?'left to right':'from top to bottom')}: ${parts.map(p=>p.name).join(' + ')}.`);else if(step.type==='order')result(picked.map(i=>tokens[i]).join('')===phrase!.tokens.join(''),`${phrase!.text} ${phrase!.pinyin} — ${phrase!.meaning}${phrase!.grammarIds?.length?` ${phrase!.note}`:''}`);else result(selected===step.answer,step.explanation||'')}
 function proceed(){if(feedback==='wrong'){setFeedback(null);setSelected('');setPicked([]);setRetry(r=>r+1);return}stop();onAdvance(!introduction,hadHelpRef.current)}
 const ready=introduction||feedback==='good'||feedback==='wrong'||(step.type==='build'?picked.length===parts.length:step.type==='order'?picked.length>0:(step.type==='select'||step.type==='parts'||step.type==='listen')?!!selected:false);
 return <><section className="exercise-body"><div className="exercise-kind">{writing?<PenLine size={16}/>:step.type==='intro'||step.type==='parts'||step.type==='build'?<Shapes size={16}/>:step.type==='listen'?<Volume2 size={16}/>:<BookOpen size={16}/>}<span>{step.type==='memory'?'Independent writing':step.type==='trace'?'Guided writing':step.type==='complete'?'Fading the guide':introduction?'Learn':'Practice'}</span></div><h1 ref={heading} tabIndex={-1} className="exercise-prompt">{prompts[step.type]}</h1>
 {step.type==='intro'&&c&&<><div className="character-intro"><div><WritingPad char={c.hanzi} mode="intro"/></div><div className="character-definition"><span className="character-label">TRADITIONAL CHARACTER</span><h2 lang="zh-Hant-TW">{c.hanzi}</h2><Phonetics character={c} prefs={prefs}/><h3>{c.meaning}</h3><AudioButton text={c.audioText||c.hanzi}/><p>{c.note}</p></div></div><CharacterParts character={c}/></>}
 {writing&&c&&<><div className="writing-cue">{step.type!=='memory'&&<span lang="zh-Hant-TW">{c.hanzi}</span>}<div><strong>{c.pinyin}</strong><p>{c.meaning}</p></div><AudioButton text={c.audioText||c.hanzi}/></div><WritingPad char={c.hanzi} mode={step.type as 'trace'|'complete'|'memory'} onComplete={help=>result(true,step.type==='memory'?(help?'You finished with support. Another round will help it stick.':'You wrote the character from memory, in stroke order.'):'You completed every stroke in order.',help)}/></>}
 {(step.type==='select'||step.type==='parts'||step.type==='listen')&&<>{step.type==='parts'&&c&&<CharacterArt char={c.hanzi} className="question-character"/>}{step.type==='listen'&&<div className="listening-cue" data-feedback="quiet"><button className="listen-large" onClick={()=>void listen()} disabled={playing}><Volume2 size={32}/><span>{playing?'Playing…':'Play audio'}</span></button><button className="text-button" onClick={()=>void listen(true)} disabled={playing}>Play slowly</button>{(textCue||hint)&&<p className="pinyin-cue" lang={step.semanticAnswer?'zh-Hant-TW':undefined}>{step.semanticAnswer?step.audioText:c!.pinyin}</p>}{message&&<p className="exercise-note">{message}</p>}{!textCue&&!hint&&<button className="text-button" onClick={()=>{setTextCue(true);support()}}>{step.semanticAnswer?'Use text instead':'Use pinyin instead'}</button>}</div>}<div className={`choice-grid ${choices.some(x=>x.length>5)?'long-options':''}`}>{choices.map((option,i)=><button key={option} disabled={!!feedback||(step.type==='listen'&&!heard&&!textCue)} className={`choice ${selected===option?'selected':''} ${selected===option&&feedback?feedback==='good'?'correct':'wrong':''}`} onClick={()=>setSelected(option)} aria-pressed={selected===option}><span className="choice-key">{i+1}</span><span className={Array.from(option).length===1&&/[\u3400-\u9fff]/.test(option)?'choice-character hanzi':''} lang={/[\u3400-\u9fff]/.test(option)?'zh-Hant-TW':undefined}>{option}</span>{selected===option&&feedback==='good'&&<Check size={20}/>}</button>)}</div></>}
 {step.type==='build'&&c&&<><div className="build-cue"><span lang="zh-Hant-TW">{c.hanzi}</span><p>{c.pinyin} · {c.meaning}</p></div><p className="exercise-note">Tap the parts in order: {c.partOrderLabel||(c.layout==='side'?'left to right':'top to bottom')}.</p><div className={`component-slots ${c.layout}`} aria-label="Your component arrangement">{parts.map((_,slot)=><button key={slot} className={`component-slot ${picked[slot]!==undefined?'filled':''}`} disabled={!!feedback||picked[slot]===undefined} aria-label={`Position ${slot+1}${picked[slot]!==undefined?`: ${parts[picked[slot]].name}; remove`:': empty'}`} onClick={()=>setPicked(p=>p.filter((__,i)=>i!==slot))}>{picked[slot]!==undefined?<CharacterArt char={c.hanzi} only={parts[picked[slot]].strokes}/>:<span>{slot+1}</span>}</button>)}</div><div className="component-bank">{partOrder.map(i=><button key={i} className={`component-tile ${picked.includes(i)?'used':''}`} disabled={picked.includes(i)||!!feedback||picked.length===parts.length} onClick={()=>setPicked(p=>[...p,i])}><CharacterArt char={c.hanzi} only={parts[i].strokes}/><span>{parts[i].name}</span></button>)}</div></>}
 {step.type==='match'&&<MatchExercise key={retry} chars={step.chars!} seed={step.id} onComplete={()=>result(true,'Every character found its meaning.')} onMistake={support}/>}
 {step.type==='grammar'&&step.grammar&&<GrammarCard rule={grammarRules[step.grammar]} prefs={prefs}/>}
 {step.type==='phrase'&&phrase&&<><div className="phrase-card"><div className="phrase-text" lang="zh-Hant-TW">{phrase.text}</div>{prefs.pinyin&&<p className="phrase-pinyin">{phrase.pinyin}</p>}<h2>{phrase.meaning}</h2><AudioButton text={phrase.text}/></div><div className="grammar-note"><Lightbulb size={22}/><div><strong>{step.phrase==='hello'?'A note on pronunciation':'How the phrase works'}</strong><p>{phrase.note}</p></div></div><div className="phrase-tokens">{phrase.tokens.map((word,i)=><div key={i}><span lang="zh-Hant-TW">{word}</span><p>{wordMeaning(word)}</p></div>)}</div></>}
 {step.type==='order'&&phrase&&<><div className="translation-prompt"><BookOpen size={24}/><h2>{phrase.meaning}</h2></div><div className="word-answer" aria-label="Your answer">{picked.length?picked.map((i,position)=><button key={position} lang="zh-Hant-TW" className="word-tile" disabled={!!feedback} onClick={()=>setPicked(p=>p.filter((_,j)=>j!==position))}>{tokens[i]}</button>):<span>Tap the words below</span>}</div><div className="word-bank">{tokens.map((word,i)=><button key={i} lang="zh-Hant-TW" disabled={picked.includes(i)||!!feedback} className={`word-tile ${picked.includes(i)?'used':''}`} onClick={()=>setPicked(p=>[...p,i])}>{word}</button>)}</div><button className="text-button translation-hint" onClick={()=>{setHint(true);support()}}><Lightbulb size={16}/>Show a hint</button>{hint&&<p className="hint-copy">{phrase.pinyin}<br/>{phrase.note}</p>}</>}
 {!introduction&&!!(step.grammarIds||phrase?.grammarIds)?.length&&<details className="exercise-pattern-help" onToggle={event=>{if(event.currentTarget.open)support()}}><summary><Lightbulb size={16}/>Review the pattern</summary>{(step.grammarIds||phrase?.grammarIds)!.map(id=><GrammarCard key={id} rule={grammarRules[id]} prefs={prefs}/>)}</details>}
 </section><footer className={`exercise-footer ${feedback==='good'?'success':feedback==='wrong'?'error':''}`}><div className="feedback-area" aria-live="polite">{feedback?<><span className="feedback-icon">{feedback==='good'?<Check size={27}/>:<RotateCcw size={25}/>}</span><div><strong>{feedback==='good'?(hadHelp?'Good practice!':'Nicely done!'):'Let’s try that again'}</strong><p>{explanation}</p></div></>:<p>{introduction?(step.type==='intro'?'Take your time. Learn the shape and its parts.':'Notice the pattern. You will use it next.'):writing?'One stroke at a time. You have unlimited tries.':'Take your time. There is no timer.'}</p>}</div><button className="primary-button continue-button" disabled={!ready} onClick={introduction||feedback?proceed:check}>{feedback==='wrong'?'Try again':introduction||feedback==='good'?'Continue':'Check answer'}<ArrowRight size={19}/></button></footer></>
}

type BonusStageKind='daily'|'revenge'|'mixed'|'mega'|'taiwan';
function BonusStage({kind,onStart}:{kind:BonusStageKind;onStart:()=>void}){
 const meta={
  daily:{label:'BONUS STAGE',title:'Daily 10',subtitle:'A quick adaptive mix from what you have been learning.',icon:Flame},
  revenge:{label:'REVENGE STAGE',title:'Revenge Round',subtitle:'One weak spot is back. Beat it a few different ways.',icon:Swords},
  mixed:{label:'POWER CHECK',title:'Mixed Mastery',subtitle:'A surprise four-unit checkpoint with sentence clozes, contextual recall, typing, and memory writing.',icon:Sparkles},
  mega:{label:'HANDWRITING BOSS',title:'Mega Challenge',subtitle:'A longer handwriting run when you feel like going for it.',icon:Trophy},
  taiwan:{label:'TAIWAN DETOUR',title:'Taiwan Mode',subtitle:'Use what you know in a short real-life situation.',icon:MapPin},
 }[kind];
 const Icon=meta.icon;
 return <div className={`path-row bonus-stage bonus-${kind}`}>
  <div className="path-track"><button className="path-node bonus-stage-node" onClick={onStart} aria-label={`Play optional bonus stage: ${meta.title}`}><Icon size={27}/></button></div>
  <div className="path-copy bonus-stage-card">
   <p className="path-step">{meta.label}<span>OPTIONAL</span></p>
   <h3>{meta.title}</h3><p>{meta.subtitle}</p>
   <button className="bonus-stage-action" onClick={onStart}>Play bonus stage<ArrowRight size={16}/></button>
  </div>
 </div>;
}

function chooseBonusStage(seed:string,ready:Record<BonusStageKind,boolean>):BonusStageKind|null{
 const weighted:BonusStageKind[]=(['daily','daily','revenge','mixed','taiwan','mega'] as BonusStageKind[]).filter(kind=>ready[kind]);
 if(!weighted.length)return null;
 let hash=2166136261;
 for(let i=0;i<seed.length;i++){hash^=seed.charCodeAt(i);hash=Math.imul(hash,16777619)}
 return weighted[(hash>>>0)%weighted.length]??null;
}

type AppProps={userKey:string;accountPanel:ReactNode;signInPanel:ReactNode};
export function LearningApp({userKey,accountPanel,signInPanel}:AppProps){
 return <InteractionFeedback><LearningExperience userKey={userKey} accountPanel={accountPanel} signInPanel={signInPanel}/></InteractionFeedback>;
}
function LearningExperience({userKey,accountPanel,signInPanel}:AppProps){
 const {preferences:feedbackPrefs,updatePreferences:updateFeedbackPrefs,soundAvailable,reducedMotion,feedback:feel,stopFeedback}=useInteractionFeedback();
 const {sessions,loading,loadError,saveError,saveState:writeState,needsSignIn,save,retrySave:retryWrite,reload,studyDays}=useProgress(userKey);const practiceMastery=usePracticeMastery(userKey);const megaMastery=useMegaMastery(userKey);const saveState=needsSignIn?'error':loading?'saving':loadError?'error':writeState;const retrySave=()=>needsSignIn?setSettings(true):loadError?reload():retryWrite();const [active,setActive]=useState<Session|null>(null);const [tab,setTab]=useState('learn');const [settings,setSettings]=useState(false);const [practiceOpen,setPracticeOpen]=useState(false);const [practiceStart,setPracticeStart]=useState<PracticeEntry>('hub');const [megaOpen,setMegaOpen]=useState(false);const [examStudyOpen,setExamStudyOpen]=useState(false);const [searchOpen,setSearchOpen]=useState(false);const [exitOpen,setExitOpen]=useState(false);const [detail,setDetail]=useState<string|null>(null);const [prefs,setPrefs]=useState<Preferences>({pinyin:true});
 const [bookId,setBookId]=useState('book-1');const book=books.find(b=>b.id===bookId)||books[0];
 const [unitId,setUnitId]=useState('unit-1');const unitChosen=useRef(false);
 useEffect(()=>{try{const p=JSON.parse(localStorage.getItem('hanzi-steps-preferences')||'null');if(p&&typeof p.pinyin==='boolean')setPrefs({pinyin:p.pinyin})}catch{}},[]);
 function updatePrefs(next:Preferences){setPrefs(next);try{localStorage.setItem('hanzi-steps-preferences',JSON.stringify(next))}catch{}}
 const completed=completedLessonIds(sessions.filter(s=>s.complete&&!s.lessonId.startsWith('practice-')).map(s=>s.lessonId));
 const bookUnits=units.filter(u=>book.unitIds.includes(u.id));
 const unit=bookUnits.find(u=>u.id===unitId)||bookUnits[0]||units[0];
 const sourceReference=unitSourceReference(unit,book.number);
 const nextUnit=bookUnits[bookUnits.findIndex(u=>u.id===unit.id)+1];
 const finishedBookUnits=bookUnits.filter(u=>completed.has(u.lessonIds[u.lessonIds.length-1])).length;
 const unitLessons=lessons.filter(l=>l.unitId===unit.id);
 const learned=characterOrder.filter(c=>lessons.some(l=>!l.review&&l.chars.includes(c)&&completed.has(l.id)));
 const unitCharacters=unitLibraryCharacters(unit);
 const practicedCharacters=new Set([...learned,...sessions.filter(s=>s.complete&&s.lessonId.startsWith('practice-')).map(s=>s.lessonId.slice(9))]);
 const unitLearned=unitCharacters.filter(c=>practicedCharacters.has(c));
 const unitCompleted=unitLessons.filter(l=>completed.has(l.id)).length;
 const nextLesson=unitLessons.find(l=>!completed.has(l.id))||unitLessons[unitLessons.length-1];
 const practiceItems=adaptivePracticeItems(learnedPracticeItems(completed),megaMastery.mastered);
 const revengeReady=makeRevengeRound(practiceItems,practiceMastery.states,'path-preview').length>0;
 const mixedReady=megaCheckpointCount(completed)>0;
 const taiwanReady=availableTaiwanMissions(completed).some(mission=>mission.unlocked);
 const completedUnitsTotal=units.filter(candidate=>completed.has(candidate.lessonIds[candidate.lessonIds.length-1])).length;
 const bonusReady:Record<BonusStageKind,boolean>={
  daily:practiceItems.length>=3,
  revenge:revengeReady,
  mixed:mixedReady,
  mega:completedUnitsTotal>=2&&practiceItems.length>=8,
  taiwan:taiwanReady,
 };
 // Bonus stages should feel discovered rather than scheduled. The pick is
 // pseudo-random per user + unit, so it stays stable while the page rerenders.
 // Daily 10 gets a little extra weight; Revenge and Mixed Mastery have equal
 // chances whenever each is ready.
 const bonusKind=chooseBonusStage(userKey+':'+unit.id,bonusReady);
 const bonusAfterIndex=Math.max(0,Math.min(unitLessons.length-2,Math.floor((unitLessons.length-1)/2)));
 const bonusVisible=Boolean(bonusKind&&completed.has(unitLessons[bonusAfterIndex]?.id));
 const current=active?findLesson(active.lessonId):undefined;
 const currentUnit=units.find(u=>u.id===current?.unitId)||(current?.id.startsWith('practice-')?units.find(u=>unitLibraryCharacters(u).includes(current.chars[0])):undefined)||unit;
 const currentBook=books.find(b=>b.unitIds.includes(currentUnit.id));
 const currentTheme=visualUnitTheme(currentUnit,currentBook?.number??1);
 const followingUnit=units.find(u=>u.id===currentBook?.unitIds[(currentBook?.unitIds.indexOf(currentUnit.id)??-1)+1]);
 const currentMission=taiwanMissions.find(mission=>mission.unlockUnitId===currentUnit.id);
 useEffect(()=>{if(loading||unitChosen.current)return;unitChosen.current=true;const done=completedLessonIds(sessions.filter(s=>s.complete).map(s=>s.lessonId));const next=lessons.find(l=>!done.has(l.id));setUnitId(next?.unitId||units[units.length-1].id);setBookId(books.find(b=>b.unitIds.includes(next?.unitId||units[units.length-1].id))?.id||'book-1')},[loading,sessions]);
 function chooseUnit(id:string){setBookId(books.find(b=>b.unitIds.includes(id))?.id||'book-1');unitChosen.current=true;setUnitId(id)}
 function start(lesson:Lesson){if(loading)return;if(lesson.id.startsWith('practice-')){const char=lesson.id.slice(9);if(!characterPracticeAvailable(char,completed))return}else if(!lessonAvailable(lesson.id,completed))return;const checkpoint=sessions.find(s=>s.lessonId===lesson.id&&!s.complete);const s=checkpoint||{id:crypto.randomUUID(),lessonId:lesson.id,index:0,independent:0,assisted:0,complete:false,updatedAt:Date.now()};setDetail(null);setActive(s);if(!checkpoint)save(s);window.scrollTo({top:0,behavior:'instant'})}
 function advance(assessed:boolean,assisted:boolean){if(!active||!current)return;const next={...active,index:active.index+1,independent:active.independent+Number(assessed&&!assisted),assisted:active.assisted+Number(assessed&&assisted),complete:active.index+1===current.steps.length,updatedAt:Date.now()};setActive(next);save(next);if(next.complete)feel('complete')}
 function home(){if('speechSynthesis' in window)window.speechSynthesis.cancel();setActive(null);setExitOpen(false);window.scrollTo({top:0,behavior:'instant'})}
 function practiceFromSearch(char:string){const lesson=findLesson(`practice-${char}`);if(!lesson)return;setSearchOpen(false);start(lesson)}
 function recordLessonAttempt(step:Step,correct:boolean,assisted:boolean){const target=practiceAttemptForStep(step);if(!target)return;void practiceMastery.record({...target,correct,assisted,sessionKind:'lesson'})}
 function openBonusStage(kind:BonusStageKind){
  if(kind==='mega'){setMegaOpen(true);return}
  const entry:PracticeEntry=kind==='mixed'?'mixed':kind;
  setPracticeStart(entry);setPracticeOpen(true);
 }
 const saveLabel=needsSignIn?'Sign in to save':loading?'Loading progress…':loadError?'Retry loading':saveState==='error'?'Retry saving':saveState==='saving'?'Saving progress…':'Progress saved';
 return <div data-unit-theme={currentTheme} className={active?'learning-app in-lesson':'learning-app'} onClick={event=>{const control=event.target instanceof Element?event.target.closest('button,summary,[role=button]'):null;if(control&&!control.matches(':disabled,[aria-disabled=true],[data-disabled]')){if(control.closest('[data-feedback=quiet]'))stopFeedback();else feel('tap')}}}><header className="topbar"><button className="brand" aria-label="Hanzi Steps home" onClick={()=>active&&!active.complete?setExitOpen(true):home()}><span className="brand-mark" lang="zh-Hant-TW">字</span><span>hanzi<span className="brand-light">steps</span><small>TRADITIONAL CHINESE</small></span></button><div className="header-tools"><StreakCounter studyDays={studyDays} sessions={sessions} loading={loading} loadError={loadError} needsSignIn={needsSignIn} saveState={saveState} onRetry={reload}/><span className="course-label">Taiwanese Mandarin</span><span className="learned-count" aria-label={`${learned.length} of ${characterOrder.length} characters practiced`} title="Characters practiced"><PenLine size={19}/><strong>{learned.length}</strong><span>/ {characterOrder.length}</span></span><button className="practice-header-button" aria-label="Practice" title="Practice" onClick={()=>{setPracticeStart('hub');setPracticeOpen(true)}}><Sparkles size={19}/><span>Practice</span></button><button className="icon-button" aria-label="Search by pinyin" title="Search by pinyin" onClick={()=>setSearchOpen(true)}><Search size={20}/></button><button className="icon-button" aria-label="Learning settings" title="Learning settings" onClick={()=>setSettings(true)}><Settings2 size={21}/></button></div></header>
 {active&&needsSignIn&&<div className="lesson-account-notice">{signInPanel}</div>}
 {!active ? <main className="home-main">
  {needsSignIn&&signInPanel}
  <Tabs value={tab} onValueChange={setTab}>
   <div className="course-workspace">
    <aside className="course-navigation">
     <div className="course-navigation-heading"><span>COURSE</span><strong>Taiwanese Mandarin</strong></div>
     <section className="course-navigation-section">
      <p className="course-navigation-label">Book</p>
      <nav className="book-switcher" aria-label="Choose a book">{books.map(b=><button key={b.id} aria-pressed={bookId===b.id} className={bookId===b.id?'selected':''} onClick={()=>setBookId(b.id)}><BookOpen size={19}/><span><strong>Book {b.number}</strong><small>{b.available?`${b.unitIds.length} ${b.unitIds.length===1?'unit':'units'}`:'Coming later'}</small></span></button>)}</nav>
     </section>
     {book.available&&<section className="course-navigation-section">
      <p className="course-navigation-label">Unit</p>
      <UnitPicker unit={unit} units={bookUnits} bookNumber={book.number} completed={completed} loading={loading} onSelect={chooseUnit}/>
      <div className="course-milestone"><div><span>Book {book.number} progress</span><strong>{finishedBookUnits}<small> / {book.unitIds.length}</small></strong></div><Progress value={finishedBookUnits/book.unitIds.length*100} aria-label={`Available Book ${book.number} units completed`}/></div>
     </section>}
     {book.available&&<section className="course-navigation-section course-navigation-tabs"><TabsList className="main-tabs"><TabsTrigger value="learn"><BookOpen size={18}/>Learn</TabsTrigger><TabsTrigger value="characters"><PenLine size={18}/>Characters</TabsTrigger><TabsTrigger value="notes"><Lightbulb size={18}/>Notes</TabsTrigger></TabsList></section>}
    </aside>
    <div className="course-content">
     {book.available ? <>
     <TabsContent value="learn">
      <div className="unit-banner mobile-unit-banner"><div><p className="eyebrow">UNIT {String(unit.displayNumber??unit.number).padStart(2,'0')} <span>·</span> {unit.label.toUpperCase()}</p><h1>{unit.title}</h1><p>{unit.description}</p></div><div className="banner-characters" lang="zh-Hant-TW" aria-hidden="true">{unit.banner.text}<span>{unit.banner.pinyin}</span></div></div>
      {sourceReference&&<p className="unit-source-footer mobile-source-footer">{sourceReference}</p>}
      {unit.number>1&&!lessonAvailable(unit.lessonIds[0],completed)&&<div className="unit-prerequisite"><Lock size={17}/><p>Finish the Unit {unit.number-1} review to start these lessons. You can explore the characters and notes now.</p><button className="text-button" onClick={()=>chooseUnit(units[unit.number-2].id)}>Go to Unit {unit.number-1}<ArrowRight size={16}/></button></div>}
      {sessions.some(s=>!s.complete&&Object.hasOwn(previousLessonLengths,s.lessonId)&&s.lessonId.startsWith(unit.id==='unit-7'?'u7-':unit.id==='unit-8'?'u8-':'none-'))&&<p className="book-reference">This unit now has shorter lessons. Completed work is kept; unfinished lessons restart with the new sequence.</p>}
      <div className="course-layout"><section className="lesson-path" aria-label={`Unit ${unit.displayNumber??unit.number} lessons`}>
       <div className="path-intro"><h2>Your learning path</h2><span>{unitCompleted} / {unitLessons.length} complete</span></div>
       {unitLessons.map((lesson,i)=>{
        const done=completed.has(lesson.id),available=lessonAvailable(lesson.id,completed);
        const resume=sessions.some(s=>s.lessonId===lesson.id&&!s.complete),next=lesson.id===nextLesson.id&&available;
        return <Fragment key={lesson.id}><div className={`path-row ${done?'completed':''} ${next?'current':''} ${available?'':'locked'}`}>
         <div className="path-track"><button className="path-node" disabled={!available||loading} aria-label={`${done?'Practice again:':available?'Start:':'Locked:'} ${lesson.title}`} onClick={()=>start(lesson)}>{done?<Check size={32}/>:!available?<Lock size={25}/>:lesson.review?<Trophy size={29}/>:<span lang="zh-Hant-TW">{lesson.chars[0]}</span>}</button></div>
         <div className="path-copy"><p className="path-step">{lesson.review?'UNIT CHALLENGE':`LESSON ${String(i+1).padStart(2,'0')}`} {done&&<span>COMPLETE</span>}</p><h3>{lesson.title}</h3><p>{lesson.subtitle}</p><div className="lesson-meta"><span lang="zh-Hant-TW">{lesson.chars.join(' · ')}</span><span>{lesson.minutes}</span></div>{next&&<button className="primary-button start-button" disabled={loading} onClick={()=>start(lesson)}>{loading?'Loading progress…':done?'Practice the unit':resume?'Resume lesson':'Start lesson'}<ArrowRight size={18}/></button>}</div>
        </div>{bonusVisible&&i===bonusAfterIndex&&bonusKind&&<BonusStage kind={bonusKind} onStart={()=>openBonusStage(bonusKind)}/>}</Fragment>
       })}
       {nextUnit&&completed.has(unit.lessonIds[unit.lessonIds.length-1])&&<button className="primary-button next-unit-button" onClick={()=>chooseUnit(nextUnit.id)}>Continue to Unit {nextUnit.displayNumber??nextUnit.number}<ArrowRight size={19}/></button>}
      </section><aside className="course-sidebar">
       <section className="unit-overview-card"><div className="unit-overview-heading"><div><p className="eyebrow">UNIT {String(unit.displayNumber??unit.number).padStart(2,'0')} · {unit.label.toUpperCase()}</p><h1>{unit.title}</h1></div><div className="unit-overview-characters" lang="zh-Hant-TW" aria-hidden="true">{unit.banner.text}<span>{unit.banner.pinyin}</span></div></div><p className="unit-overview-description">{unit.description}</p></section>
       {sourceReference&&<p className="unit-source-footer desktop-source-footer">{sourceReference}</p>}
       <section className="sidebar-card"><div className="card-heading"><h2>This unit’s characters</h2><span>{unitLearned.length}/{unitCharacters.length}</span></div><Progress className="unit-progress" value={unitCharacters.length?unitLearned.length/unitCharacters.length*100:0} aria-label="Unit characters practiced"/><div className="character-mini-grid">{unitCharacters.map(c=><button key={c} className={practicedCharacters.has(c)?'learned':''} onClick={()=>setDetail(c)} aria-label={`Explore ${c}, ${characters[c].meaning}`}><span lang="zh-Hant-TW">{c}</span>{prefs.pinyin&&<small>{characters[c].pinyin}</small>}{practicedCharacters.has(c)&&<Check size={13}/>}</button>)}</div><p>Tap any character to explore its parts.</p></section>
       <section className="sidebar-card unit-goal"><GraduationCap size={25}/><p className="eyebrow">BY THE END OF THIS UNIT</p><h3 lang="zh-Hant-TW">{unit.goal.text}</h3>{prefs.pinyin&&<p className="pinyin">{unit.goal.pinyin}</p>}<p>{unit.goal.meaning}</p><button className="text-button" onClick={()=>setTab('notes')}><Lightbulb size={16}/>Words & patterns</button></section>
       <section className="practice-method"><span><PenLine size={19}/>Trace</span><ChevronRight size={16}/><span><Shapes size={19}/>Complete</span><ChevronRight size={16}/><span><BookOpen size={19}/>Recall</span></section>
      </aside></div>
     </TabsContent>
     <TabsContent value="characters"><div className="character-page-heading"><p className="eyebrow">UNIT {String(unit.displayNumber??unit.number).padStart(2,'0')} · CHARACTER LIBRARY</p><h1>A closer look at each character.</h1><p>New characters from this unit’s words. Explore their parts or choose writing practice. Characters taught earlier stay in their original unit.</p></div><div className="character-library">{unitCharacters.map(c=><button key={c} className="library-card" onClick={()=>setDetail(c)}><div className="library-top"><span>{characters[c].strokes} {characters[c].strokes===1?'stroke':'strokes'}</span>{practicedCharacters.has(c)&&<span className="learned-badge"><Check size={14}/>Practiced</span>}</div><CharacterArt char={c}/><Phonetics character={characters[c]} prefs={prefs}/><h2>{characters[c].meaning}</h2><span className="library-action">Explore character<ArrowRight size={17}/></span></button>)}</div></TabsContent>
     <TabsContent value="notes"><UnitNotes unit={unit} prefs={prefs} completed={completed}/></TabsContent>
     </> : <section className="book-placeholder"><BookOpen size={38}/><p className="eyebrow">BOOK {book.number}</p><h1>We’ll get here.</h1><p>Book {book.number} units are coming later. For now, keep building your Mandarin in Book 1.</p><button className="primary-button" onClick={()=>setBookId('book-1')}>Back to Book 1<ArrowRight size={18}/></button></section>}
    </div>
   </div>
  </Tabs>
  {!needsSignIn&&(loadError||saveError)&&<div className="storage-notice" role="status"><p>{loadError||saveError}</p><button className="text-button" onClick={()=>void retrySave()}>Try again</button></div>}
  <div className="home-footer"><span>One unit at a time. As many tries as you need.</span><button className={`sync-state ${saveState}`} onClick={()=>saveState==='error'?void retrySave():undefined} disabled={saveState!=='error'}>{saveState==='saved'?<CloudCheck size={16}/>:<CloudUpload size={16}/>}{saveLabel}</button></div>
 </main> : active.complete&&current ? <main className="completion-main">
  <div className="completion-medal">{current.review?<Trophy size={54}/>:<Check size={58}/>}</div><p className="eyebrow">{current.review?`UNIT ${String(currentUnit.number).padStart(2,'0')} COMPLETE`:current.id.startsWith('practice-')?'PRACTICE COMPLETE':'LESSON COMPLETE'}</p><h1>{current.review?(currentUnit.number===1?'Your first conversation starts here.':'More words. More ways to connect.'):'One step closer.'}</h1><p>You practiced {current.chars.length===1?'one character':`${current.chars.length} characters`} through shapes, strokes, and meaning.</p>
  <div className="completion-characters" lang="zh-Hant-TW">{current.chars.map(c=><button key={c} onClick={()=>setDetail(c)}>{c}</button>)}</div><div className="completion-stats"><div><strong>{active.independent}</strong><span>Without retries or hints</span></div><div><strong>{active.assisted}</strong><span>With learning support</span></div></div><p className="completion-note">Guided tracing is practice. Writing from memory is a separate step.</p>{!needsSignIn&&saveState==='error'&&<p className="storage-notice" role="status">{saveError||loadError}</p>}
  {current.review&&<div className="final-phrase"><p lang="zh-Hant-TW">{currentUnit.goal.text}</p><span>{currentUnit.goal.meaning}</span><AudioButton text={currentUnit.goal.text}/></div>}{current.review&&currentMission&&<button className="secondary-button taiwan-unlock-button" onClick={()=>{setPracticeStart('taiwan');setPracticeOpen(true)}}><MapPin size={18}/><span><strong>Taiwan mission ready</strong><small>{currentMission.stamp} {currentMission.title}</small></span><ArrowRight size={18}/></button>}
  <button className="primary-button" onClick={()=>{if(current.review&&followingUnit)chooseUnit(followingUnit.id);home()}}>{current.review&&followingUnit?`Continue to Unit ${followingUnit.displayNumber??followingUnit.number}`:'Back to the unit'}<ArrowRight size={19}/></button><button className={`sync-state ${saveState}`} disabled={saveState!=='error'} onClick={()=>void retrySave()}>{saveState==='saved'?<CloudCheck size={16}/>:<CloudUpload size={16}/>}{saveLabel}</button>
 </main> : current ? <main className="lesson-main">
  <div className="lesson-topline"><button className="icon-button" aria-label="Pause this lesson" onClick={()=>setExitOpen(true)}><X size={23}/></button><div><div className="lesson-progress-label"><span>{current.title}</span><span>{active.index+1} / {current.steps.length}</span></div><Progress className="lesson-progress" value={active.index/current.steps.length*100} aria-label="Lesson progress"/></div><button className={`sync-indicator ${saveState}`} disabled={saveState!=='error'} onClick={()=>void retrySave()} aria-label={saveLabel}>{saveState==='saved'?<CloudCheck size={19}/>:<CloudUpload size={19}/>}</button></div>{!needsSignIn&&saveState==='error'&&<div className="save-inline" role="status">{saveError||loadError||'Your progress has not synced yet.'} <button onClick={()=>void retrySave()}>Try again</button></div>}<Exercise key={`${active.id}-${active.index}`} step={current.steps[active.index]} prefs={prefs} onAdvance={advance} onAttempt={recordLessonAttempt}/>
 </main> : null}
 <SmartPractice key={userKey} open={practiceOpen} onOpenChange={setPracticeOpen} completed={completed} theme={currentTheme} mastery={practiceMastery} megaMastery={megaMastery} startMode={practiceStart} onOpenMegaChallenge={()=>setMegaOpen(true)} onOpenExamStudy={()=>setExamStudyOpen(true)}/>
 <MegaChallenge key={'legacy-mega-'+userKey} open={megaOpen} onOpenChange={setMegaOpen} completed={completed} theme={currentTheme} mastery={megaMastery}/>
 <ExamStudy open={examStudyOpen} onOpenChange={setExamStudyOpen} theme={currentTheme}/>
 <PinyinSearch open={searchOpen} onOpenChange={setSearchOpen} theme={currentTheme} onPracticeCharacter={practiceFromSearch} completed={completed}/>
 <Dialog open={settings} onOpenChange={setSettings}><DialogContent data-unit-theme={currentTheme} className="settings-dialog"><DialogTitle>Make it your practice</DialogTitle><DialogDescription>Choose your pronunciation guide and how your practice feels.</DialogDescription>{needsSignIn?signInPanel:accountPanel}<div className="preference-row"><label htmlFor="pinyin-switch"><strong>Pinyin</strong><span>nǐ hǎo</span></label><Switch id="pinyin-switch" checked={prefs.pinyin} onCheckedChange={v=>updatePrefs({...prefs,pinyin:v})}/></div><p className="settings-note">Writing from memory hides the character. Sound exercises keep pronunciation hidden until you ask for a hint.</p><div className="feedback-settings"><h3>Little moments of feedback</h3><div className="preference-row"><label htmlFor="animation-switch"><strong>Animations</strong><span>{reducedMotion?'Your device’s Reduce Motion setting is on.':'Small pops, bounces, and celebrations.'}</span></label><Switch id="animation-switch" checked={feedbackPrefs.animations} onCheckedChange={v=>updateFeedbackPrefs({...feedbackPrefs,animations:v})}/></div><div className="preference-row"><label htmlFor="sound-switch"><strong>Sound effects</strong><span>{soundAvailable?'Soft blips for choices and answers.':'Sound effects aren’t available in this browser.'}</span></label><Switch id="sound-switch" checked={soundAvailable&&feedbackPrefs.sounds} disabled={!soundAvailable} onCheckedChange={v=>{updateFeedbackPrefs({...feedbackPrefs,sounds:v});if(v)feel('tap')}}/></div>{soundAvailable&&<button className="text-button" disabled={!feedbackPrefs.sounds} onClick={()=>feel('success')}>Try the sounds</button>}</div><div className="settings-app-actions"><div><h3>App</h3><p>Reload Hanzi Steps if the installed PWA feels stale or does not pick up a recent update.</p></div><button className="secondary-button settings-reload-button" onClick={()=>window.location.reload()}><RotateCcw size={18}/>Reload app</button></div><div className="source-notes"><h3>About these lessons</h3><p>Original beginner lessons. Audio uses an available Taiwanese Mandarin voice on your device; pinyin is available when audio cannot play.</p><p>Handwriting: <a href="https://hanziwriter.org" target="_blank" rel="noreferrer">Hanzi Writer</a>. Taiwan stroke forms: <a href="https://github.com/parsimonhi/animCJK" target="_blank" rel="noreferrer">AnimCJK</a>. <a href="./credits.txt" target="_blank">Sources and licenses</a>.</p></div></DialogContent></Dialog>
 <Dialog open={exitOpen} onOpenChange={setExitOpen}><DialogContent data-unit-theme={currentTheme} className="pause-dialog"><Pause size={30}/><DialogTitle>Take a break?</DialogTitle><DialogDescription>{needsSignIn?'Your completed exercises are kept on this device when browser storage is available. Sign in to sync them to your account.':saveState==='saved'?'Completed exercises are saved. You can resume at this exercise when you return.':'Your latest exercises are waiting to sync. Keep this tab open until you see Progress saved.'}</DialogDescription>{!needsSignIn&&saveState==='error'&&<p className="storage-notice">Your latest progress is waiting to sync. Keep this tab available or return on this device to retry.</p>}<button className="primary-button" onClick={()=>setExitOpen(false)}>Keep learning</button><button className="secondary-button" onClick={home}>Back to the unit</button></DialogContent></Dialog>
 <Dialog open={!!detail} onOpenChange={v=>!v&&setDetail(null)}><DialogContent data-unit-theme={currentTheme} className="character-dialog">{detail&&<><DialogTitle><span lang="zh-Hant-TW">{detail}</span> · {characters[detail].meaning}</DialogTitle><DialogDescription>{characters[detail].pinyin} · {characters[detail].strokes} strokes</DialogDescription><CharacterParts key={detail} character={characters[detail]}/><AudioButton text={characters[detail].audioText||detail}/><button className="primary-button" disabled={!characterPracticeAvailable(detail,completed)} aria-disabled={!characterPracticeAvailable(detail,completed)} onClick={()=>{const lesson=findLesson(`practice-${detail}`);if(lesson)start(lesson)}}>{characterPracticeAvailable(detail,completed)?'Practice this character':'Practice unlocks after its lesson'}<PenLine size={18}/></button></>}</DialogContent></Dialog>
 </div>
}
