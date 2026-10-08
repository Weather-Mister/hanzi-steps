'use client';

import {useRef,useState} from 'react';
import {Check,ChevronsUpDown,Search} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle,DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {lessonAvailable,type Unit} from '@/lib/curriculum';
import {visualUnitTheme} from '@/lib/unit-theme';

const bookLabel=(id:string,number:number)=>id==='extras'?'Extras':`Book ${number}`;
const unitLabel=(u:Unit)=>`${u.id.startsWith('extra-')?'Extra':'Unit'} ${u.displayNumber??u.number}`;
type BookChoice={id:string;number:number;available:boolean;unitIds:string[]};

export function UnitPicker({unit,units,allUnits,books,bookId,bookNumber,completed,loading,onSelect}:{unit:Unit;units:Unit[];allUnits:Unit[];books:BookChoice[];bookId:string;bookNumber:number;completed:Set<string>;loading:boolean;onSelect:(id:string)=>void}){
 const [open,setOpen]=useState(false);
 const [query,setQuery]=useState('');
 const [pickerBookId,setPickerBookId]=useState(bookId);
 const selectedRow=useRef<HTMLButtonElement>(null);
 const search=useRef<HTMLInputElement>(null);
 const pickerBook=books.find(book=>book.id===pickerBookId)||books.find(book=>book.id===bookId);
 const pickerBookNumber=pickerBook?.number??bookNumber;
 const pickerUnits=pickerBook?allUnits.filter(u=>pickerBook.unitIds.includes(u.id)):units;
 const pickerThemeUnit=pickerUnits.find(u=>u.id===unit.id)||pickerUnits[0]||unit;
 const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 const shown=pickerUnits.filter(u=>{
  const text=`unit ${u.displayNumber??u.number} ${u.label} ${u.title} ${u.banner.text} ${u.banner.pinyin}`.toLocaleLowerCase();
  return terms.every(term=>text.includes(term));
 });
 function progress(u:Unit){
  if(loading)return 'Loading progress…';
  const count=u.lessonIds.filter(id=>completed.has(id)).length;
  if(count===u.lessonIds.length)return 'Completed';
  if(!lessonAvailable(u.lessonIds[0],completed))return 'Preview · lessons not unlocked yet';
  return `${count} / ${u.lessonIds.length} lessons complete`;
 }
 return <Dialog open={open} onOpenChange={value=>{setOpen(value);if(value){setQuery('');setPickerBookId(bookId);}}}>
  <DialogTrigger asChild>
   <button type="button" className="unit-picker-trigger" aria-label={`Change book or unit. Current: ${bookLabel(bookId,bookNumber)}, ${unitLabel(unit)}, ${unit.label}`}>
    <span className="unit-picker-number" aria-hidden="true">{String(unit.displayNumber??unit.number).padStart(2,'0')}</span>
    <span className="unit-picker-summary"><strong><span className="unit-picker-mobile-book">{bookLabel(bookId,bookNumber)} · </span>{unitLabel(unit)} · {unit.label}</strong><small>{progress(unit)}</small></span>
    <span className="unit-picker-change">Change<ChevronsUpDown size={18}/></span>
   </button>
  </DialogTrigger>
  <DialogContent data-unit-theme={visualUnitTheme(pickerThemeUnit,pickerBookNumber)} className="unit-picker-dialog" onOpenAutoFocus={event=>{
   event.preventDefault();
   // Open at the selected unit without raising the phone keyboard.
   if(selectedRow.current){selectedRow.current.focus({preventScroll:true});selectedRow.current.scrollIntoView({block:'nearest'});}
   else search.current?.focus();
  }}>
   <div className="unit-picker-heading"><DialogTitle>Choose a unit</DialogTitle><DialogDescription>{bookLabel(pickerBookId,pickerBookNumber)} · {pickerUnits.length} {pickerUnits.length===1?'unit':'units'}</DialogDescription><nav className="unit-picker-books-mobile" aria-label="Choose a book">{books.map(book=><button type="button" key={book.id} disabled={!book.available} aria-pressed={pickerBookId===book.id} className={pickerBookId===book.id?'selected':''} onClick={()=>{setPickerBookId(book.id);setQuery('');}}>{bookLabel(book.id,book.number)}</button>)}</nav></div>
   <div className="unit-picker-search"><Search size={19} aria-hidden="true"/><label htmlFor="unit-search" className="sr-only">Search units by number or topic</label><Input ref={search} id="unit-search" type="search" placeholder="Find a unit by number or topic…" value={query} onChange={event=>setQuery(event.target.value)} autoComplete="off" spellCheck={false} aria-controls="unit-picker-results"/></div>
   <nav id="unit-picker-results" className="unit-picker-results" aria-label={`${bookLabel(pickerBookId,pickerBookNumber)} units`}>
    {shown.map(u=><button ref={u.id===unit.id?selectedRow:undefined} type="button" key={u.id} data-unit-theme={visualUnitTheme(u,pickerBookNumber)} className="unit-picker-option" aria-pressed={u.id===unit.id} onClick={()=>{onSelect(u.id);setOpen(false);}}>
     <span className="unit-picker-number" aria-hidden="true">{String(u.displayNumber??u.number).padStart(2,'0')}</span>
     <span className="unit-picker-summary"><strong>{unitLabel(u)} · {u.label}</strong><small>{progress(u)}</small></span>
     {u.id===unit.id&&<Check size={20} aria-label="Current unit"/>}
    </button>)}
    {!shown.length&&<p className="unit-picker-empty" role="status">No units match “{query}”. Try a number or another topic.</p>}
   </nav>
   <span className="sr-only" role="status">{query?`${shown.length} matching units`:''}</span>
  </DialogContent>
 </Dialog>;
}

