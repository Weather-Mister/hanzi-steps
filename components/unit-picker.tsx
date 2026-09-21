'use client';

import {useRef,useState} from 'react';
import {Check,ChevronsUpDown,Search} from 'lucide-react';
import {Dialog,DialogContent,DialogDescription,DialogTitle,DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {lessonAvailable,type Unit} from '@/lib/curriculum';
import {visualUnitTheme} from '@/lib/unit-theme';

export function UnitPicker({unit,units,bookNumber,completed,loading,onSelect}:{unit:Unit;units:Unit[];bookNumber:number;completed:Set<string>;loading:boolean;onSelect:(id:string)=>void}){
 const [open,setOpen]=useState(false);
 const [query,setQuery]=useState('');
 const selectedRow=useRef<HTMLButtonElement>(null);
 const search=useRef<HTMLInputElement>(null);
 const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 const shown=units.filter(u=>{
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
 return <Dialog open={open} onOpenChange={value=>{setOpen(value);if(value)setQuery('');}}>
  <DialogTrigger asChild>
   <button type="button" className="unit-picker-trigger" aria-label={`Change unit. Current: Unit ${unit.displayNumber??unit.number}, ${unit.label}`}>
    <span className="unit-picker-number" aria-hidden="true">{String(unit.displayNumber??unit.number).padStart(2,'0')}</span>
    <span className="unit-picker-summary"><strong>Unit {unit.displayNumber??unit.number} · {unit.label}</strong><small>{progress(unit)}</small></span>
    <span className="unit-picker-change">Change<ChevronsUpDown size={18}/></span>
   </button>
  </DialogTrigger>
  <DialogContent data-unit-theme={visualUnitTheme(unit,bookNumber)} className="unit-picker-dialog" onOpenAutoFocus={event=>{
   event.preventDefault();
   // Open at the selected unit without raising the phone keyboard.
   if(selectedRow.current){selectedRow.current.focus({preventScroll:true});selectedRow.current.scrollIntoView({block:'nearest'});}
   else search.current?.focus();
  }}>
   <div className="unit-picker-heading"><DialogTitle>Choose a unit</DialogTitle><DialogDescription>Book {bookNumber} · {units.length} {units.length===1?'unit':'units'}</DialogDescription></div>
   <div className="unit-picker-search"><Search size={19} aria-hidden="true"/><label htmlFor="unit-search" className="sr-only">Search units by number or topic</label><Input ref={search} id="unit-search" type="search" placeholder="Find a unit by number or topic…" value={query} onChange={event=>setQuery(event.target.value)} autoComplete="off" spellCheck={false} aria-controls="unit-picker-results"/></div>
   <nav id="unit-picker-results" className="unit-picker-results" aria-label={`Book ${bookNumber} units`}>
    {shown.map(u=><button ref={u.id===unit.id?selectedRow:undefined} type="button" key={u.id} data-unit-theme={visualUnitTheme(u,bookNumber)} className="unit-picker-option" aria-pressed={u.id===unit.id} onClick={()=>{onSelect(u.id);setOpen(false);}}>
     <span className="unit-picker-number" aria-hidden="true">{String(u.displayNumber??u.number).padStart(2,'0')}</span>
     <span className="unit-picker-summary"><strong>Unit {u.displayNumber??u.number} · {u.label}</strong><small>{progress(u)}</small></span>
     {u.id===unit.id&&<Check size={20} aria-label="Current unit"/>}
    </button>)}
    {!shown.length&&<p className="unit-picker-empty" role="status">No units match “{query}”. Try a number or another topic.</p>}
   </nav>
   <span className="sr-only" role="status">{query?`${shown.length} matching units`:''}</span>
  </DialogContent>
 </Dialog>;
}
