'use client';
import {useMemo,useState} from 'react';
import {PenLine,Search,X} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {searchLearnedVocabulary,searchPracticeCharacters,uniquePracticeCharacters} from '@/lib/vocabulary-lookup';
import {strokeData} from './character-art';

export function PinyinSearch({
 open,onOpenChange,theme,onPracticeCharacter,completed,
}:{
 open:boolean;
 onOpenChange:(open:boolean)=>void;
 theme:string;
 onPracticeCharacter:(char:string)=>void;
 completed:Set<string>;
}){
 const [query,setQuery]=useState('');
 const matches=useMemo(()=>searchLearnedVocabulary(query,completed,81),[query,completed]);
 const results=matches.slice(0,80);
 const trimmed=query.trim();

 function practice(char:string){
  onOpenChange(false);
  onPracticeCharacter(char);
 }

 return <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent data-unit-theme={theme} className="pinyin-search-dialog">
   <div className="pinyin-search-heading">
    <DialogTitle>Find by pinyin</DialogTitle>
    <DialogDescription>Search vocabulary from lessons you have completed, with or without tones, spaces, or tone numbers. Use ü, v, or u: for ü. Results include all learned tones; practice opens regular character practice.</DialogDescription>
   </div>
   <div className="pinyin-search-box">
    <Search size={18}/>
    <input
     value={query}
     onChange={event=>setQuery(event.target.value)}
     placeholder="shi, xihuan, xi3huan1, lv…"
     autoFocus
     autoCapitalize="none"
     autoCorrect="off"
     spellCheck={false}
     aria-label="Search Hanzi Steps by pinyin"
    />
    {trimmed&&<button className="search-clear-button" aria-label="Clear pinyin search" onClick={()=>setQuery('')}><X size={16}/></button>}
   </div>
   <div className="pinyin-search-results" aria-live="polite">
    {!trimmed?<p className="search-empty">Start typing a pronunciation.</p>:
     results.length===0?<p className="search-empty">No Hanzi Steps vocabulary matches that pinyin.</p>:
     <>
      <p className="search-count">{matches.length>80?'Showing the first 80 matches — type more to narrow your search':results.length+' '+(results.length===1?'match':'matches')}</p>
      <div className="search-result-list">{results.map(item=>{
       const availableChars=uniquePracticeCharacters(item).filter(char=>Boolean(strokeData[char]));
       const chars=searchPracticeCharacters(item,completed).filter(char=>Boolean(strokeData[char]));
       return <article className="search-result-card" key={item.id}>
        <div className="search-result-copy">
         <div className="search-result-title">
          <strong lang="zh-Hant-TW">{item.traditional}</strong>
          <span className="pinyin">{item.pinyin}</span>
         </div>
         <p>{item.meaning}</p>
         {item.bookNumber&&item.unitNumber&&<small>Book {item.bookNumber} · Unit {item.unitNumber}</small>}
        </div>
        {chars.length>0?<div className="search-practice-actions" aria-label={'Practice characters in '+item.traditional}>
         {chars.map(char=><button
          className="secondary-button"
          key={char}
          onClick={()=>practice(char)}
          aria-label={'Open regular character practice for '+char}
         >
          <PenLine size={15}/>{chars.length===1?'Practice':<>Practice <span lang="zh-Hant-TW">{char}</span></>}
         </button>)}
        </div>:<span className="search-practice-unavailable">{availableChars.length?'Writing practice unlocks after its lesson':'Writing practice unavailable'}</span>}
       </article>;
      })}</div>
     </>}
   </div>
  </DialogContent>
 </Dialog>;
}
