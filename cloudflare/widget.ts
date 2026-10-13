import {streakFromDays,taipeiDay} from '../lib/streak';
import courseIndex from '../course/index.json';
import courseManifest from '../course/manifest.json';
const themeColors:Record<string,{accent:string,onAccent:string}> = {
  blue:{accent:'#456f9f',onAccent:'#ffffff'},
  teal:{accent:'#477f7a',onAccent:'#ffffff'},
  plum:{accent:'#705b80',onAccent:'#ffffff'},
  amber:{accent:'#b45d24',onAccent:'#ffffff'},
  rose:{accent:'#a94a67',onAccent:'#ffffff'},
  indigo:{accent:'#58658e',onAccent:'#ffffff'},
  cyan:{accent:'#477f8a',onAccent:'#ffffff'},
  orange:{accent:'#b55a1a',onAccent:'#ffffff'},
  emerald:{accent:'#4a7a5b',onAccent:'#ffffff'},
  violet:{accent:'#745a89',onAccent:'#ffffff'},
  coral:{accent:'#b95443',onAccent:'#ffffff'},
  sky:{accent:'#4a789c',onAccent:'#ffffff'},
  gold:{accent:'#b45d24',onAccent:'#ffffff'},
  magenta:{accent:'#8d3e6c',onAccent:'#ffffff'},
  forest:{accent:'#647a38',onAccent:'#ffffff'},
  cherry:{accent:'#b33d45',onAccent:'#ffffff'},
};

const unitVisualThemes=[
  'blue','teal','plum','amber','rose','indigo','cyan','orange',
  'emerald','violet','coral','sky','gold','magenta','forest','cherry',
] as const;

function visualUnitTheme(bookNumber:number,unitNumber:number){
  const bookOffset=Math.max(0,bookNumber-1)*8;
  const index=(Math.max(1,unitNumber)-1+bookOffset)%unitVisualThemes.length;
  return unitVisualThemes[index];
}

type SessionRow={
  id:string;
  lesson_id:string;
  position:number;
  complete:boolean;
  updated_at:number;
  completed_at:number|null;
};

type CourseIndex={
  order:[string,string,number][];
  unitReviews:Record<string,string>;
  characters:Record<string,[string,string,string,string,string]>;
};

type Manifest={
  books:Array<{
    id:string;
    number:number;
    units:Array<{id:string;order:number;title:string;path:string}>;
  }>;
};

function manifestUnit(manifest:Manifest,unitId:string){
  for(const book of manifest.books){
    const unit=book.units.find(item=>item.id===unitId);
    if(unit)return {book,unit};
  }
  return null;
}

function earliestOpenUnit(index:CourseIndex,completedLessons:Set<string>){
  const open=index.order.findIndex(([,unitId])=>{
    const reviewLessonId=index.unitReviews[unitId];
    return !reviewLessonId||!completedLessons.has(reviewLessonId);
  });
  const order=open>=0?open:Math.max(0,index.order.length-1);
  return {order,unitId:index.order[order]?.[1]||'unit-1'};
}

function characterCandidates(index:CourseIndex,from:number){
  const result:Array<{character:string;pinyin:string;meaning:string;bookId:string;unitId:string;lessonId:string;orderIndex:number}>=[];
  const orderLookup=new Map(index.order.map((row,i)=>[row[1],i]));
  for(const [character,row] of Object.entries(index.characters)){
    const [pinyin,meaning,bookId,unitId,lessonId]=row;
    const orderIndex=orderLookup.get(unitId);
    if(orderIndex===undefined||orderIndex<from)continue;
    result.push({character,pinyin,meaning,bookId,unitId,lessonId,orderIndex});
  }
  result.sort((a,b)=>a.orderIndex-b.orderIndex);
  return result;
}


export async function widgetData(db:D1Database,account:string,username:string|null=null){
 const rows=(await db.prepare('SELECT id,lesson_id,position,complete,updated_at,completed_at FROM hanzi_sessions WHERE user_id=? ORDER BY updated_at').bind(account).all<SessionRow>()).results;
    const now=Date.now();
    const completed=rows.filter(row=>row.complete);
    const studyDays=[...new Set(completed.map(row=>taipeiDay(row.completed_at??row.updated_at)))];
    const streakData=streakFromDays(studyDays,now);
    const todayCount=completed.filter(row=>taipeiDay(row.completed_at??row.updated_at)===streakData.today).length;
    const todayGoal=10;
    const todayProgress=Math.min(todayGoal,todayCount);

    const index=courseIndex as unknown as CourseIndex;
    const manifest=courseManifest as Manifest;
    const completedLessons=new Set(completed.map(row=>row.lesson_id));

    const {order:currentOrder,unitId:currentUnitId}=earliestOpenUnit(index,completedLessons);

    const currentMeta=manifestUnit(manifest,currentUnitId);
    if(!currentMeta)throw new Error('Current unit unavailable');
    const currentTheme=visualUnitTheme(currentMeta.book.number,currentMeta.unit.order);
    const palette=themeColors[currentTheme]||themeColors.blue;

    const learned=new Set<string>();
    for(const [character,row] of Object.entries(index.characters)){
      const lessonId=row[4];
      if(completedLessons.has(lessonId)||completedLessons.has(`practice-${character}`))learned.add(character);
    }

    const candidates=characterCandidates(index,currentOrder);
    const upcomingCandidates=candidates.filter(item=>!learned.has(item.character)).slice(0,2);
    if(!upcomingCandidates.length&&candidates[0])upcomingCandidates.push(candidates[0]);

    const nextCharacters=upcomingCandidates.map(next=>{
      const nextOrder=index.order[next.orderIndex];
      const nextBook=manifest.books.find(book=>book.id===next.bookId);
      return {
        character:next.character,
        pinyin:next.pinyin,
        meaning:next.meaning,
        book:(nextBook?.number??Number(next.bookId.replace(/\D/g,'')))||1,
        unit:nextOrder?.[2]??1,
        unitId:next.unitId,
      };
    });
    const nextCharacter=nextCharacters[0]||null;

    return {
      version:2,
      username:username||null,
      current:streakData.current,
      streak:streakData.current,
      practicedToday:streakData.practicedToday,
      day:streakData.today,
      todayProgress,
      todayGoal,
      todayComplete:todayProgress>=todayGoal,
      book:currentMeta.book.number,
      unit:index.order[currentOrder]?.[2]??currentMeta.unit.order,
      unitId:currentUnitId,
      unitTitle:currentMeta.unit.title,
      unitTheme:currentTheme,
      unitColor:palette.accent,
      unitTextColor:palette.onAccent,
      nextCharacter,
      nextCharacters,
      capturedAt:new Date(now).toISOString(),
    };
}
