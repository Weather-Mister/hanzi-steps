import {streakFromDays,taipeiDay} from './streak.ts';

const headers={
  'Content-Type':'application/json',
  'Cache-Control':'no-store',
  'X-Content-Type-Options':'nosniff',
};

const GITHUB_RAW='https://raw.githubusercontent.com/Weather-Mister/hanzi-steps/main/';
const INDEX_URL=GITHUB_RAW+'course/index.json';
const MANIFEST_URL=GITHUB_RAW+'course/manifest.json';

const themeColors:Record<string,{accent:string,onAccent:string}> = {
  blue:{accent:'#245ee8',onAccent:'#e6edff'},
  teal:{accent:'#087f79',onAccent:'#e2f8f0'},
  plum:{accent:'#8052b8',onAccent:'#f3ebff'},
  amber:{accent:'#9c6200',onAccent:'#fff1cd'},
  rose:{accent:'#b32e59',onAccent:'#fff0f4'},
  cyan:{accent:'#087c91',onAccent:'#effcff'},
  indigo:{accent:'#4d54b8',onAccent:'#ffffff'},
  orange:{accent:'#ac480e',onAccent:'#ffffff'},
};

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
  characters:Record<string,[string,string,string,string,string]>;
};

type Manifest={
  books:Array<{
    id:string;
    number:number;
    units:Array<{id:string;order:number;title:string;path:string}>;
  }>;
};

let courseCache:{at:number;index:CourseIndex;manifest:Manifest}|null=null;
const themeCache=new Map<string,{theme:string;reviewLessonId:string}>();

async function jsonFetch<T>(url:string,init?:RequestInit):Promise<T>{
  const response=await fetch(url,{...init,signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new Error(`Request failed: ${response.status}`);
  return await response.json() as T;
}

async function courseData(){
  const now=Date.now();
  if(courseCache&&now-courseCache.at<300000)return courseCache;
  const [index,manifest]=await Promise.all([
    jsonFetch<CourseIndex>(INDEX_URL),
    jsonFetch<Manifest>(MANIFEST_URL),
  ]);
  if(!Array.isArray(index.order)||!index.characters||!Array.isArray(manifest.books))
    throw new Error('Invalid curriculum data');
  courseCache={at:now,index,manifest};
  return courseCache;
}

function unitFromLesson(lessonId:string):string|null{
  if(['hello','identity','student','question','review'].includes(lessonId))return 'unit-1';
  const bookOne=/^u(\d+)-/.exec(lessonId);
  if(bookOne)return `unit-${Number(bookOne[1])}`;
  const bookTwo=/^b2u(\d+)-/.exec(lessonId);
  if(bookTwo)return `book-2-unit-${Number(bookTwo[1])}`;
  if(/^b2-/.test(lessonId))return 'book-2-unit-1';
  return null;
}

function manifestUnit(manifest:Manifest,unitId:string){
  for(const book of manifest.books){
    const unit=book.units.find(item=>item.id===unitId);
    if(unit)return {book,unit};
  }
  return null;
}

async function unitDetails(manifest:Manifest,unitId:string){
  const cached=themeCache.get(unitId);
  if(cached)return cached;
  const found=manifestUnit(manifest,unitId);
  if(!found)throw new Error('Unknown unit');
  const source=await fetch(GITHUB_RAW+found.unit.path,{signal:AbortSignal.timeout(10000)});
  if(!source.ok)throw new Error('Unit metadata unavailable');
  const text=await source.text();
  const theme=(text.match(/["']?theme["']?\s*:\s*["']([^"']+)["']/)||[])[1]||'blue';
  const reviewLessonId=(text.match(/["']?reviewLessonId["']?\s*:\s*["']([^"']+)["']/)||[])[1]||'';
  const value={theme,reviewLessonId};
  themeCache.set(unitId,value);
  return value;
}

function accountFromRpc(value:unknown):string{
  if(typeof value!=='string'||!/^account-v1-[a-f0-9]{64}$/.test(value))
    throw new Error('Invalid account mapping');
  return value;
}

function unitOrderIndex(index:CourseIndex,unitId:string){
  return index.order.findIndex(([,id])=>id===unitId);
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

Deno.serve(async(request:Request)=>{
  const reply=(data:unknown,status=200)=>new Response(JSON.stringify(data),{status,headers});
  if(request.method!=='GET')return reply({error:'Method not allowed.'},405);

  const requestUrl=new URL(request.url);
  const username=(requestUrl.searchParams.get('username')||'').trim().toLowerCase();
  const suppliedAccount=requestUrl.searchParams.get('account')||'';

  if(!username&&!suppliedAccount)return reply({error:'Username is required.'},400);
  if(username&&!/^[a-z0-9_]{2,32}$/.test(username))return reply({error:'Invalid username.'},400);
  if(!username&&!/^account-v1-[a-f0-9]{64}$/.test(suppliedAccount))
    return reply({error:'Invalid account identifier.'},400);

  try{
    const url=Deno.env.get('SUPABASE_URL');
    const key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if(!url||!key)throw new Error('Missing server configuration');

    let account=suppliedAccount;
    if(username){
      const claim=await jsonFetch<unknown>(`${url}/rest/v1/rpc/hanzi_claim_username`,{
        method:'POST',
        headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},
        body:JSON.stringify({p_username:username}),
      });
      account=accountFromRpc(claim);
    }

    const rows=await jsonFetch<SessionRow[]>(
      `${url}/rest/v1/hanzi_sessions?user_id=eq.${encodeURIComponent(account)}&select=id,lesson_id,position,complete,updated_at,completed_at&order=updated_at.asc`,
      {headers:{apikey:key,Authorization:`Bearer ${key}`}},
    );

    const now=Date.now();
    const completed=rows.filter(row=>row.complete);
    const studyDays=[...new Set(completed.map(row=>taipeiDay(row.completed_at??row.updated_at)))];
    const streakData=streakFromDays(studyDays,now);
    const todayCount=completed.filter(row=>taipeiDay(row.completed_at??row.updated_at)===streakData.today).length;
    const todayGoal=10;
    const todayProgress=Math.min(todayGoal,todayCount);

    const {index,manifest}=await courseData();
    const completedLessons=new Set(completed.map(row=>row.lesson_id));

    const latestCourse=[...rows]
      .filter(row=>!row.lesson_id.startsWith('practice-')&&unitFromLesson(row.lesson_id))
      .sort((a,b)=>b.updated_at-a.updated_at)[0];

    let currentUnitId=latestCourse?unitFromLesson(latestCourse.lesson_id):index.order[0]?.[1]||'unit-1';
    if(!currentUnitId)currentUnitId='unit-1';

    let currentOrder=unitOrderIndex(index,currentUnitId);
    if(currentOrder<0){currentOrder=0;currentUnitId=index.order[0]?.[1]||'unit-1';}

    const initialDetails=await unitDetails(manifest,currentUnitId);
    if(initialDetails.reviewLessonId&&completedLessons.has(initialDetails.reviewLessonId)&&currentOrder+1<index.order.length){
      currentOrder++;
      currentUnitId=index.order[currentOrder][1];
    }

    const currentMeta=manifestUnit(manifest,currentUnitId);
    if(!currentMeta)throw new Error('Current unit unavailable');
    const currentDetails=await unitDetails(manifest,currentUnitId);
    const palette=themeColors[currentDetails.theme]||themeColors.blue;

    const learned=new Set<string>();
    for(const [character,row] of Object.entries(index.characters)){
      const lessonId=row[4];
      if(completedLessons.has(lessonId)||completedLessons.has(`practice-${character}`))learned.add(character);
    }

    const candidates=characterCandidates(index,currentOrder);
    const next=candidates.find(item=>!learned.has(item.character))||candidates[0]||null;
    let nextCharacter=null;
    if(next){
      const nextOrder=index.order[next.orderIndex];
      const nextBook=manifest.books.find(book=>book.id===next.bookId);
      nextCharacter={
        character:next.character,
        pinyin:next.pinyin,
        meaning:next.meaning,
        book:(nextBook?.number??Number(next.bookId.replace(/\D/g,'')))||1,
        unit:nextOrder?.[2]??1,
        unitId:next.unitId,
      };
    }

    return reply({
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
      unitTheme:currentDetails.theme,
      unitColor:palette.accent,
      unitTextColor:palette.onAccent,
      nextCharacter,
      capturedAt:new Date(now).toISOString(),
    });
  }catch{
    return reply({error:'Hanzi widget data is temporarily unavailable.'},503);
  }
});
