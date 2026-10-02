import {characterMeanings} from '../lib/character-meanings';
import {characterCommonWords} from '../lib/character-common-words';
import {learnedWordsForCharacter} from '../lib/character-intelligence';
import {wordOwners} from '../lib/curriculum-relations';
import {books,units,vocabulary} from '../course/runtime';

const vocabularyByText=new Map(vocabulary.map(word=>[word.text,word]));

/** Optional reference: these uses never replace the course's primary meaning or progression. */
export function CharacterMeanings({hanzi,completed,showPinyin=true,expanded=false,primaryMeaning}:{hanzi:string;completed?:Set<string>;showPinyin?:boolean;expanded?:boolean;primaryMeaning?:string}){
 const learned=(completed?learnedWordsForCharacter(hanzi,completed):[]).filter(word=>word.text!==hanzi);
 const learnedTexts=new Set(learned.map(word=>word.text));
 const curatedCommon=characterCommonWords(hanzi);
 const fallbackCourse=curatedCommon.length?[]:vocabulary
  .filter(word=>word.text!==hanzi&&word.text.includes(hanzi))
  .slice(0,5)
  .map(word=>({text:word.text,pinyin:word.pinyin,meaning:word.meaning}));
 const common=[...curatedCommon,...fallbackCourse].filter((word,index,all)=>
  !learnedTexts.has(word.text)&&all.findIndex(item=>item.text===word.text)===index
 );
 const senses=characterMeanings(hanzi);
 if(!learned.length&&!common.length&&!senses.length)return null;
 return <details className="character-meanings" open={expanded||undefined}>
  <summary>More about <span lang="zh-Hant-TW">{hanzi}</span></summary>
  {primaryMeaning&&<p className="character-sense-translation"><strong>Primary character meaning:</strong> {primaryMeaning}</p>}
  <p className="character-meanings-hint">Reference only. Common words here do not count as learned or enter practice automatically. Read each word as a whole because a character's role can shift with context.</p>

  {!!learned.length&&<section className="character-reference-section">
   <h4>Uses you've learned</h4>
   <ul>
    {learned.map(word=>{
     const unit=units.find(u=>u.id===wordOwners.get(word.text)),book=books.find(b=>b.unitIds.includes(unit?.id||''));
     return <li className="character-sense-learned" key={'learned:'+word.lessonId+word.text}>
      <div className="character-sense-heading"><span className="character-sense-badge">Learned</span>{showPinyin&&<span className="pinyin">{word.pinyin}</span>}<strong>{word.meaning}</strong></div>
      <p className="character-sense-example" lang="zh-Hant-TW">{word.text}</p>
      {unit&&<p className="character-sense-translation">Book {book?.number} · Unit {unit.displayNumber??unit.number}</p>}
     </li>;
    })}
   </ul>
  </section>}

  {!!common.length&&<section className="character-reference-section">
   <h4>Common words & expressions</h4>
   <ul>
    {common.map(word=>{
     const courseWord=vocabularyByText.get(word.text);
     const unit=courseWord?units.find(u=>u.id===wordOwners.get(courseWord.text)):undefined;
     const book=unit?books.find(b=>b.unitIds.includes(unit.id)):undefined;
     return <li className="character-common-word" key={'common:'+word.text}>
      <div className="character-sense-heading">
       <span className={courseWord?'character-course-badge':'character-reference-badge'}>{courseWord?'Course word':'Extra reference'}</span>
       {showPinyin&&<span className="pinyin">{word.pinyin}</span>}
       <strong>{word.meaning}</strong>
      </div>
      <p className="character-sense-example" lang="zh-Hant-TW">{word.text}</p>
      {courseWord&&unit&&<p className="character-sense-translation">Book {book?.number} · Unit {unit.displayNumber??unit.number}</p>}
     </li>;
    })}
   </ul>
  </section>}

  {!!senses.length&&<section className="character-reference-section">
   <h4>Other meanings & uses</h4>
   <ul>
    {senses.map((sense,index)=><li key={'sense:'+index}>
     <div className="character-sense-heading">{showPinyin&&<span className="pinyin">{sense.pinyin}</span>}<strong>{sense.meaning}</strong></div>
     <p className="character-sense-example" lang="zh-Hant-TW">{sense.example.text}</p>
     {showPinyin&&<p className="character-sense-pinyin">{sense.example.pinyin}</p>}
     <p className="character-sense-translation">{sense.example.meaning}</p>
    </li>)}
   </ul>
  </section>}
 </details>;
}
