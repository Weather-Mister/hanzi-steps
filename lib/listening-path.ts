import {listeningItems,listeningSceneIds} from '../course/listening/items.ts';
import {characters,units,books} from '../course/runtime.ts';
import {shuffled} from './curriculum.ts';
import {resolveSentence,sentenceAvailable} from './learning-materials.ts';
import {matchesPinyin} from './pinyin.ts';
import type {ListeningItem} from '../course/materials/schema.ts';
import type {PracticeQuestion,PracticeStateMap} from './practice-engine.ts';
export {listeningItems,listeningSceneIds};
export type ListeningTask={item:ListeningItem;mode:'meaning'|'pinyin'};
export const listeningItemId=(item:ListeningItem)=>'listening:'+resolveSentence(item.source)!.id;
export function eligibleListening(completed:Set<string>){return listeningItems.filter(item=>sentenceAvailable(item.source,completed))}
export function listeningOptions(item:ListeningItem,seed:string){
 const s=resolveSentence(item.source)!;
 return shuffled([{text:s.meaning,correct:true,rationale:item.reason},...item.distractors.map(d=>({...d,correct:false}))],seed);
}
export const listeningPinyinCorrect=(task:ListeningTask,value:string)=>matchesPinyin(value,resolveSentence(task.item.source)!.pinyin);
export function listeningQuestion(item:ListeningItem,mode:'meaning'|'pinyin',id:string):PracticeQuestion{
 const s=resolveSentence(item.source)!,unit=units.find(u=>u.id===s.unitId),book=books.find(b=>b.unitIds.includes(s.unitId));
 return {id,item:{id:listeningItemId(item),kind:'phrase',traditional:s.text,pinyin:s.pinyin,meaning:s.meaning,characters:Array.from(s.text).filter(c=>Boolean(characters[c])),lessonId:s.lessonId,unitId:s.unitId,unitNumber:unit?.displayNumber??unit?.number,bookId:book?.id,bookNumber:book?.number},mode:mode==='meaning'?'recognition':'pinyin',sessionKind:'daily',listening:{item,mode}};
}
/** At most one due listening task; never removes a cumulative connection task. */
export function interleaveListening(queue:PracticeQuestion[],completed:Set<string>,states:PracticeStateMap,seed:string,enabled:boolean,now=Date.now()):PracticeQuestion[]{
 if(!enabled||!queue.length)return queue;
 const eligible=shuffled(eligibleListening(completed).filter(item=>{const row=states[listeningItemId(item)+'::recognition'];return !row||row.nextReview<=now}),seed).sort((a,b)=>(states[listeningItemId(a)+'::recognition']?.nextReview||0)-(states[listeningItemId(b)+'::recognition']?.nextReview||0));
 if(!eligible.length)return queue;
 const index=queue.findLastIndex(q=>!q.knowledge&&!q.listening);if(index<0)return queue;
 const next=queue.slice();next[index]=listeningQuestion(eligible[0],'meaning',seed+':listening');return next;
}
