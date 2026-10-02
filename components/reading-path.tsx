'use client';
import {BookOpen} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {books,units} from '@/course/runtime';
import {readingAvailable,readingCheckpoints,type ReadingCheckpoint} from '@/lib/reading-checkpoints';
import {ReadingStage} from './reading-checkpoint';
export function ReadingPath({open,onOpenChange,completed,userKey,theme,onRead}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;userKey:string;theme:string;onRead:(reading:ReadingCheckpoint)=>void}){
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="learning-path-dialog" data-unit-theme={theme}><DialogTitle><BookOpen size={22}/> Reading Path</DialogTitle><DialogDescription>Read a little further each time. These optional checkpoints recycle your course vocabulary and grammar. Each checkpoint unlocks at the end of its unit.</DialogDescription>
 {books.filter(book=>book.available).map(book=><section className="learning-path-group" key={book.id}><h2>Book {book.number}</h2>{book.unitIds.map(unitId=>{const items=readingCheckpoints.filter(r=>r.unitId===unitId);if(!items.length)return null;const unit=units.find(u=>u.id===unitId),number=unit?.displayNumber??unit?.number;return <div className="reading-set-group" key={unitId}><h3>Unit {number} · {items.length>1?'Reading set':'Bonus reading'}</h3>{items.map(r=><ReadingStage key={userKey+r.id} reading={r} available={readingAvailable(r,completed)} userKey={userKey} onStart={()=>{onOpenChange(false);onRead(r)}}/>)}</div>})}</section>)}
 </DialogContent></Dialog>;
}
