import {characterMeanings} from '../lib/character-meanings';
import {learnedWordsForCharacter} from '../lib/character-intelligence';
import {wordOwners} from '../lib/curriculum-relations';
import {books,units} from '../course/runtime';

/** Optional reference: these senses never replace the course's primary meaning. */
export function CharacterMeanings({hanzi,completed,showPinyin=true,expanded=false,primaryMeaning}:{hanzi:string;completed?:Set<string>;showPinyin?:boolean;expanded?:boolean;primaryMeaning?:string}){
 const learned=completed?learnedWordsForCharacter(hanzi,completed):[];
 const senses=characterMeanings(hanzi);
 if(!learned.length&&!senses.length)return null;
 return <details className="character-meanings" open={expanded||undefined}>
  <summary>Other common meanings of <span lang="zh-Hant-TW">{hanzi}</span></summary>
  {primaryMeaning&&<p className="character-sense-translation"><strong>Primary character meaning:</strong> {primaryMeaning}</p>}
  <p className="character-meanings-hint">Previously learned uses appear first. The original character meaning stays primary; read each word or example as a whole because a character's meaning can shift with context.</p>
  <ul>
   {learned.map(word=>{
    const unit=units.find(u=>u.id===wordOwners.get(word.text)),book=books.find(b=>b.unitIds.includes(unit?.id||''));
    return <li className="character-sense-learned" key={'learned:'+word.lessonId+word.text}>
     <div className="character-sense-heading"><span className="character-sense-badge">Previously learned</span>{showPinyin&&<span className="pinyin">{word.pinyin}</span>}<strong>{word.meaning}</strong></div>
     <p className="character-sense-example" lang="zh-Hant-TW">{word.text}</p>
     {unit&&<p className="character-sense-translation">Book {book?.number} · Unit {unit.displayNumber??unit.number}</p>}
    </li>;
   })}
   {senses.map((sense,index)=><li key={'sense:'+index}>
    <div className="character-sense-heading">{showPinyin&&<span className="pinyin">{sense.pinyin}</span>}<strong>{sense.meaning}</strong></div>
    <p className="character-sense-example" lang="zh-Hant-TW">{sense.example.text}</p>
    {showPinyin&&<p className="character-sense-pinyin">{sense.example.pinyin}</p>}
    <p className="character-sense-translation">{sense.example.meaning}</p>
   </li>)}
  </ul>
 </details>;
}
