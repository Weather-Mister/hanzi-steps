'use client';
import data from '@/lib/stroke-data.json';
export const strokeData=data as Record<string,{strokes:string[];medians:number[][][]}>;
export function CharacterArt({char,highlight,only,className=''}:{char:string;highlight?:number[];only?:number[];className?:string}){
 let viewBox='0 0 1024 1024';
 if(only?.length){const points=only.flatMap(i=>{const numbers=strokeData[char].strokes[i].match(/-?\d*\.?\d+/g)!.map(Number);return Array.from({length:numbers.length/2},(_,j)=>[numbers[j*2],900-numbers[j*2+1]])});const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);const x=Math.min(...xs)-35,y=Math.min(...ys)-35;viewBox=`${x} ${y} ${Math.max(...xs)-x+35} ${Math.max(...ys)-y+35}`}
 return <svg className={`character-art ${className}`} viewBox={viewBox} role="img" aria-label={only?'Character component':char}><g transform="translate(0,900) scale(1,-1)">{strokeData[char].strokes.map((d,i)=>only&&!only.includes(i)?null:<path key={i} d={d} fill={highlight?(highlight.includes(i)?'var(--unit-accent)':'#dfe5ef'):'currentColor'}/>)}</g></svg>
}
