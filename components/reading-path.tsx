'use client';
import {BookOpen} from 'lucide-react';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {books} from '@/course/runtime';
import {readingAvailable,readingCheckpoints,type ReadingCheckpoint} from '@/lib/reading-checkpoints';
import {ReadingStage} from './reading-checkpoint';
export function ReadingPath({open,onOpenChange,completed,userKey,theme,onRead}:{open:boolean;onOpenChange:(open:boolean)=>void;completed:Set<string>;userKey:string;theme:string;onRead:(reading:ReadingCheckpoint)=>void}){
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="learning-path-dialog" data-unit-theme={theme}><DialogTitle><BookOpen size={22}/> Reading Path</DialogTitle><DialogDescription>Read a little further each time. These optional checkpoints recycle your course vocabulary and grammar. Finish the earlier teaching lessons and the checkpoint unit challenge to unlock.</DialogDescription>
 {books.filter(book=>book.available).map(book=><section className="learning-path-group" key={book.id}><h2>Book {book.number}</h2>{readingCheckpoints.filter(r=>book.unitIds.includes(r.unitId)).map(r=><ReadingStage key={userKey+r.id} reading={r} available={readingAvailable(r,completed)} completed={completed} userKey={userKey} onStart={()=>{onOpenChange(false);onRead(r)}}/>)}</section>)}
 </DialogContent></Dialog>;
}
