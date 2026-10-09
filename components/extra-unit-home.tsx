'use client';
import {Fragment} from 'react';
import {ArrowRight,Check,PenLine,Trophy} from 'lucide-react';
import {TabsContent} from './ui/tabs';
import type {Lesson,Session,Unit} from '../course/schema';
import {extraLessons,extraUnitComplete,extraUnits,wordsForExtraUnit} from '../course/extras/units';
import {ExtraPicture} from './extra-picture';
import {ExtraWordCard} from './extra-exercise';
import {ExtraCharacterLibrary} from './extra-character-library';
import '../app/extras.css';

export function ExtraUnitHome({unit,completed,sessions,loading,pinyin,onStart,onSelect,onNotes}:{unit:Unit;completed:Set<string>;sessions:Session[];loading:boolean;pinyin:boolean;onStart:(lesson:Lesson)=>void;onSelect:(id:string)=>void;onNotes:()=>void}){
 const words=wordsForExtraUnit(unit.id);
 const reference=unit.id==='extra-actions'?{button:'Actions & usage',eyebrow:'ACTIONS & USAGE',heading:'An action for each part of your day.',note:'These expressions describe actions. Use 我想 + action to say what you want to do. Some are verb–object expressions, so learn the complete word; they do not take a noun measure word.'}:unit.id==='extra-countries'?{button:'Countries & usage',eyebrow:'COUNTRIES & USAGE',heading:'A name, a flag, and a place to go.',note:'Use 去 + place name for a destination, and place name + 人 for nationality. Count the general noun 國家 with 個; specific country names do not need a measure word.'}:unit.id==='extra-colors'?{button:'Color reference',eyebrow:'COLORS & USAGE',heading:'A name for every color.',note:'Use color + 的 + noun to describe an object. Keep the object’s measure word when counting it; 種 counts kinds of color. Dark and light shades have their own cards.'}:{button:'Words & measure words',eyebrow:'WORDS & COUNTING',heading:'A word, a picture, a way to count it.',note:'一 = one, 兩 = two before a measure word, 三 = three. Put the number first, then the measure word, then the noun. Each card explains whether you are counting whole items, plants, bunches, pairs, or pieces.'};
 const lessons=extraLessons.filter(l=>l.unitId===unit.id);
 const done=lessons.filter(l=>completed.has(l.id)).length;
 const next=lessons.find(l=>!completed.has(l.id));
 return <>
  <TabsContent value="learn"><div className="unit-banner extra-unit-banner"><div><p className="eyebrow">OPTIONAL EXTRA · {unit.label.toUpperCase()}</p><h1>{unit.title}</h1><p>{unit.description}</p></div><ExtraPicture id={words[0].id}/></div>
   <nav className="extra-unit-switcher" aria-label="Choose an optional unit">{extraUnits.map(u=><button type="button" key={u.id} aria-pressed={unit.id===u.id} className={unit.id===u.id?'selected':''} onClick={()=>onSelect(u.id)}><ExtraPicture id={wordsForExtraUnit(u.id)[0].id}/><span><strong>{u.label}</strong><small>{extraUnitComplete(u,completed)?'Complete':'Always available'}</small></span></button>)}</nav>
   <div className="course-layout"><section className="lesson-path" aria-label={unit.label+' extra lessons'}><div className="path-intro"><h2>Your learning path</h2><span>{done} / {lessons.length} complete</span></div>
    {lessons.map((lesson,i)=>{const finished=completed.has(lesson.id),resume=sessions.some(s=>s.lessonId===lesson.id&&!s.complete);return <Fragment key={lesson.id}>{lesson.extraSection&&(i===0||lessons[i-1].extraSection!==lesson.extraSection)&&<h2 className="extra-section-heading">{lesson.extraSection}</h2>}<div className={'path-row '+(finished?'completed ':'')+(next?.id===lesson.id?'current':'')}><div className="path-track"><button type="button" className="path-node" disabled={loading} aria-label={(resume?'Resume:':finished?'Practice again:':'Start:')+' '+lesson.title} onClick={()=>onStart(lesson)}>{finished?<Check size={30}/>:lesson.review?<Trophy size={27}/>:<span>{i+1}</span>}</button></div><div className="path-copy"><p className="path-step">{lesson.review?'COLLECTION CHECK':'LESSON '+String(i+1).padStart(2,'0')}{finished&&<span>COMPLETE</span>}</p><h3>{lesson.title}</h3><p>{lesson.subtitle}</p><div className="lesson-meta"><span>Always unlocked</span><span>{lesson.minutes}</span></div><button type="button" className="primary-button start-button" disabled={loading} onClick={()=>onStart(lesson)}>{loading?'Loading progress…':resume?'Resume lesson':finished?'Practice again':'Start lesson'}<ArrowRight size={18}/></button></div></div></Fragment>;})}
    {extraUnitComplete(unit,completed)&&<p className="extra-complete-note" role="status"><Check size={18}/>All {lessons.length} lessons complete. Your collection is always here for another round.</p>}
   </section><aside className="course-sidebar"><section className="sidebar-card"><div className="card-heading"><h2>Your collection</h2><span>{words.length} words</span></div><div className="extra-collection-preview">{words.map(w=><div key={w.id}><ExtraPicture id={w.id}/><span lang="zh-Hant-TW">{w.text}</span></div>)}</div><button className="text-button" onClick={onNotes}>{reference.button}<ArrowRight size={16}/></button></section><section className="sidebar-card unit-goal"><PenLine size={23}/><p className="eyebrow">BY THE END OF THIS UNIT</p><h3 lang="zh-Hant-TW">{unit.goal.text}</h3>{pinyin&&<p className="pinyin">{unit.goal.pinyin}</p>}<p>{unit.goal.meaning}</p></section></aside></div>
  </TabsContent>
  <TabsContent value="characters"><ExtraCharacterLibrary unit={unit} sessions={sessions} pinyin={pinyin} onStart={onStart}/></TabsContent>
  <TabsContent value="notes"><div className="character-page-heading"><p className="eyebrow">OPTIONAL EXTRA · {reference.eyebrow}</p><h1>{reference.heading}</h1><p>{reference.note}</p></div><div className="extra-study-grid">{words.map(w=><ExtraWordCard key={w.id} word={w} pinyin={pinyin}/>)}</div></TabsContent>
 </>;
}
