import assert from 'node:assert/strict';
import fs from 'node:fs';
import {books,units} from '../../lib/curriculum.ts';

export function unitsInBook(bookId){
 const book=books.find(b=>b.id===bookId);
 assert.ok(book,bookId);
 return book.unitIds.map(id=>{
  const unit=units.find(u=>u.id===id);
  assert.ok(unit,id);
  return unit;
 });
}

export function assertUnitPalettes(){
 const css=fs.readFileSync(new URL('../../app/globals.css',import.meta.url),'utf8');
 for(const book of books){
  const group=unitsInBook(book.id);
  // The eight-colour palette cycles as a book grows; it is not a unit ID.
  assert.equal(new Set(group.slice(0,8).map(u=>u.theme)).size,Math.min(8,group.length),book.id);
  for(const [i,unit] of group.entries()){
   assert.ok(css.includes(`[data-unit-theme="${unit.theme}"]`),`${unit.id}: missing palette`);
   if(i)assert.notEqual(unit.theme,group[i-1].theme,`${unit.id}: adjacent units need distinct themes`);
  }
 }
}
