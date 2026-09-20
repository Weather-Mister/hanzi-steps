'use client';
import {useMemo,useState} from 'react';
import {Search} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {searchVocabulary} from '@/lib/vocabulary-lookup';

export function PinyinSearch({open,onOpenChange,theme}:{open:boolean;onOpenChange:(open:boolean)=>void;theme:string}){
 const [query,setQuery]=useState('');
 const results=useMemo(()=>searchVocabulary(query),[query]);
 const trimmed=query.trim();
 return <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent data-unit-theme={theme} className="pinyin-search-dialog">
   <DialogTitle>Find by pinyin</DialogTitle>
   <DialogDescription>Type pinyin with or without tone marks. Search never changes your progress.</DialogDescription>
   <label className="pinyin-search-box">
    <Search size={18}/>
    <input
     value={query}
     onChange={event=>setQuery(event.target.value)}
     placeholder="shi, xihuan, xi3huan1, lv…"
     autoCapitalize="none"
     autoCorrect="off"
     spellCheck={false}
     aria-label="Search Hanzi Steps by pinyin"
    />
   </label>
   <div className="pinyin-search-results" aria-live="polite">
    {!trimmed?<p className="search-empty">Start typing a pronunciation.</p>:
     results.length===0?<p className="search-empty">No Hanzi Steps vocabulary matches that pinyin.</p>:
     <>
      <p className="search-count">{results.length===80?'Showing the first 80 matches':results.length+' '+(results.length===1?'match':'matches')}</p>
      <div className="search-result-list">{results.map(item=><article className="search-result-card" key={item.id}>
       <div>
        <strong lang="zh-Hant-TW">{item.traditional}</strong>
        <span className="pinyin">{item.pinyin}</span>
       </div>
       <p>{item.meaning}</p>
       {item.bookNumber&&item.unitNumber&&<small>Book {item.bookNumber} · Unit {item.unitNumber}</small>}
      </article>)}</div>
     </>}
   </div>
  </DialogContent>
 </Dialog>;
}
