import {learnedWordsForCharacter} from '../lib/character-intelligence';
import {wordOwners} from '../lib/curriculum-relations';
import {books,units} from '../course/runtime';
export function CharacterWords({hanzi,completed,showPinyin=true}:{hanzi:string;completed:Set<string>;showPinyin?:boolean}){
 const words=learnedWordsForCharacter(hanzi,completed);
 if(!words.length)return null;
 return <details className="character-words"><summary>Seen in learned words <span>· {words.length}</span></summary><ul>{words.map(word=>{
  const unit=units.find(u=>u.id===wordOwners.get(word.text)),book=books.find(b=>b.unitIds.includes(unit?.id||''));
  return <li key={word.lessonId+word.text}><strong lang="zh-Hant-TW">{word.text}</strong>{showPinyin&&<span className="pinyin">{word.pinyin}</span>}<span>{word.meaning}</span>{unit&&<small>Book {book?.number} · Unit {unit.displayNumber??unit.number}</small>}</li>;
 })}</ul></details>;
}
