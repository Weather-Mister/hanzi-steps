import {learnedCharacterMeanings} from '../lib/character-intelligence';

/** Optional reference: these senses never replace the course's primary meaning. */
export function CharacterMeanings({hanzi,showPinyin=true,expanded=false,primaryMeaning,completed}:{hanzi:string;showPinyin?:boolean;expanded?:boolean;primaryMeaning?:string;completed:Set<string>}){
 const senses=learnedCharacterMeanings(hanzi,completed);
 if(!senses.length)return null;
 return <details className="character-meanings" open={expanded||undefined}>
  <summary>Other common meanings of <span lang="zh-Hant-TW">{hanzi}</span></summary>
  {primaryMeaning&&<p className="character-sense-translation"><strong>Primary character meaning:</strong> {primaryMeaning}</p>}
  <p className="character-meanings-hint">Uses connected to lessons you have completed · The original meaning stays primary. Read each example as a whole; a character's meaning can change with the word.</p>
  <ul>{senses.map((sense,index)=><li key={index}>
   <div className="character-sense-heading">{showPinyin&&<span className="pinyin">{sense.pinyin}</span>}<strong>{sense.meaning}</strong></div>
   <p className="character-sense-example" lang="zh-Hant-TW">{sense.example.text}</p>
   {showPinyin&&<p className="character-sense-pinyin">{sense.example.pinyin}</p>}
   <p className="character-sense-translation">{sense.example.meaning}</p>
  </li>)}</ul>
 </details>;
}
