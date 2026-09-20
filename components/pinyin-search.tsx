'use client';
import {useMemo,useState} from 'react';
import {Check,PenLine,Search} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle} from '@/components/ui/dialog';
import {searchVocabulary,type VocabularyLookupItem} from '@/lib/vocabulary-lookup';
import {strokeData} from './character-art';
import {WritingPad} from './writing-pad';

const canPractice=(item:VocabularyLookupItem)=>
 item.characters.length>0&&item.characters.every(char=>Boolean(strokeData[char]));

export function PinyinSearch({open,onOpenChange,theme}:{open:boolean;onOpenChange:(open:boolean)=>void;theme:string}){
 const [query,setQuery]=useState('');
 const [practiceItem,setPracticeItem]=useState<VocabularyLookupItem|null>(null);
 const [practiceCharIndex,setPracticeCharIndex]=useState(0);
 const [practiceComplete,setPracticeComplete]=useState(false);
 const [practiceRound,setPracticeRound]=useState(0);
 const results=useMemo(()=>searchVocabulary(query),[query]);
 const trimmed=query.trim();
 const practiceChar=practiceItem?.characters[practiceCharIndex];

 function startPractice(item:VocabularyLookupItem){
  if(!canPractice(item))return;
  setPracticeItem(item);
  setPracticeCharIndex(0);
  setPracticeComplete(false);
  setPracticeRound(round=>round+1);
 }

 function finishCharacter(){
  if(!practiceItem)return;
  if(practiceCharIndex+1<practiceItem.characters.length){
   setPracticeCharIndex(index=>index+1);
   return;
  }
  setPracticeComplete(true);
 }

 function restartPractice(){
  setPracticeCharIndex(0);
  setPracticeComplete(false);
  setPracticeRound(round=>round+1);
 }

 return <>
  <Dialog open={open} onOpenChange={onOpenChange}>
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
        <button
         className="secondary-button"
         disabled={!canPractice(item)}
         onClick={()=>startPractice(item)}
         aria-label={'Practice writing '+item.traditional}
        >
         <PenLine size={15}/>Practice
        </button>
       </article>)}</div>
      </>}
    </div>
   </DialogContent>
  </Dialog>

  <Dialog open={!!practiceItem} onOpenChange={nextOpen=>{if(!nextOpen)setPracticeItem(null)}}>
   <DialogContent data-unit-theme={theme} className="mega-challenge-dialog">
    {practiceItem&&<>
     <div className="mega-title-row">
      <div>
       <DialogTitle>Practice <span lang="zh-Hant-TW">{practiceItem.traditional}</span></DialogTitle>
       <DialogDescription>Guided handwriting practice. This does not change lesson progress.</DialogDescription>
      </div>
      <PenLine size={28}/>
     </div>

     {practiceComplete?<section className="mega-complete">
      <Check size={42}/>
      <h3>Practice complete</h3>
      <p><span lang="zh-Hant-TW">{practiceItem.traditional}</span> · {practiceItem.pinyin} · {practiceItem.meaning}</p>
      <div className="mega-confirm-actions">
       <button className="secondary-button" onClick={()=>setPracticeItem(null)}>Back to results</button>
       <button className="primary-button" onClick={restartPractice}>Practice again</button>
      </div>
     </section>:practiceChar?<section className="mega-practice">
      <div className="mega-prompt">
       <p className="pinyin">{practiceItem.pinyin}</p>
       <h2>{practiceItem.meaning}</h2>
       <p>Character {practiceCharIndex+1} of {practiceItem.characters.length} · <span lang="zh-Hant-TW">{practiceChar}</span></p>
      </div>
      <WritingPad
       key={practiceItem.id+':'+practiceRound+':'+practiceCharIndex}
       char={practiceChar}
       mode="trace"
       onComplete={()=>finishCharacter()}
      />
     </section>:null}
    </>}
   </DialogContent>
  </Dialog>
 </>;
}
