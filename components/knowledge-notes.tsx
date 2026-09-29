'use client';
import {useMemo} from 'react';
import {characters} from '@/lib/curriculum';
import {examplesForKnowledge,knowledgeForWord,knowledgeForPhrase,type KnowledgeConcept} from '@/lib/cumulative-knowledge';

export function KnowledgeNotes({word,phraseId,completed,concepts,showPinyin=true}:{word?:string;phraseId?:string;completed:Set<string>;concepts?:KnowledgeConcept[];showPinyin?:boolean}){
 const entries=useMemo(()=>concepts||(word?knowledgeForWord(word,completed):phraseId?knowledgeForPhrase(phraseId,completed):[]),[concepts,word,phraseId,completed]);
 if(!entries.length)return null;
 return <details className="knowledge-notes"><summary>{entries.every(c=>c.kind==='family')?'Related characters':'Connections you have learned'}</summary><div className="knowledge-note-list">{entries.map(c=><div className="knowledge-note" key={c.id}>
  <strong>{c.title}</strong><p>{c.explanation}</p>
  {c.kind==='family'?<div className="knowledge-family">{c.words.map(char=><span key={char}><b lang="zh-Hant-TW">{char}</b>{showPinyin&&<small>{characters[char].pinyin}</small>}<small>{characters[char].meaning}</small></span>)}</div>:examplesForKnowledge(c,completed).slice(0,2).map(example=><div className="knowledge-example" key={example.id}><span lang="zh-Hant-TW">{example.text}</span>{showPinyin&&<small className="pinyin">{example.pinyin}</small>}<small>{example.meaning}</small></div>)}
 </div>)}</div></details>;
}
