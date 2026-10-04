import {streakFromDays,taipeiDay} from './streak.ts';

const headers={
  'Content-Type':'application/json',
  'Cache-Control':'no-store',
  'X-Content-Type-Options':'nosniff',
};

const GITHUB_RAW='https://raw.githubusercontent.com/Weather-Mister/hanzi-steps/main/';
const INDEX_URL=GITHUB_RAW+'course/index.json';
const MANIFEST_URL=GITHUB_RAW+'course/manifest.json';

const themeColors:Record<string,{accent:string,onAccent:string,ink:string}> = {
  blue:{accent:'#456f9f',onAccent:'#ffffff',ink:'#345477'},
  teal:{accent:'#477f7a',onAccent:'#ffffff',ink:'#365f5c'},
  plum:{accent:'#705b80',onAccent:'#ffffff',ink:'#574664'},
  amber:{accent:'#d7ae34',onAccent:'#463600',ink:'#624c0f'},
  rose:{accent:'#a94a67',onAccent:'#ffffff',ink:'#7f384d'},
  indigo:{accent:'#58658e',onAccent:'#ffffff',ink:'#434c6c'},
  cyan:{accent:'#3d7b86',onAccent:'#ffffff',ink:'#315f68'},
  orange:{accent:'#e08a3c',onAccent:'#402400',ink:'#6b3f19'},
  emerald:{accent:'#4a7a5b',onAccent:'#ffffff',ink:'#385c45'},
  violet:{accent:'#745a89',onAccent:'#ffffff',ink:'#594568'},
  coral:{accent:'#b95443',onAccent:'#ffffff',ink:'#8b4034'},
  sky:{accent:'#4a789c',onAccent:'#ffffff',ink:'#385b76'},
  gold:{accent:'#b45d24',onAccent:'#ffffff',ink:'#8d481c'},
  magenta:{accent:'#8d3e6c',onAccent:'#ffffff',ink:'#6a3052'},
  forest:{accent:'#647a38',onAccent:'#ffffff',ink:'#4c5d2b'},
  cherry:{accent:'#b33d45',onAccent:'#ffffff',ink:'#872f35'},
  mint:{accent:'#75b39f',onAccent:'#17352f',ink:'#315f50'},
  cobalt:{accent:'#4564a6',onAccent:'#ffffff',ink:'#354f86'},
  lilac:{accent:'#82699c',onAccent:'#ffffff',ink:'#654f79'},
  raspberry:{accent:'#ad416f',onAccent:'#ffffff',ink:'#823154'},
  lime:{accent:'#9ab74a',onAccent:'#243008',ink:'#46591d'},
  scarlet:{accent:'#c34e40',onAccent:'#ffffff',ink:'#92392f'},
  periwinkle:{accent:'#5f70a2',onAccent:'#ffffff',ink:'#49577e'},
  seafoam:{accent:'#78aaa3',onAccent:'#102d2a',ink:'#335e5a'},
}

const unitVisualThemes=[
  'blue','teal','plum','amber','rose','indigo','cyan','orange',
  'emerald','violet','coral','sky','gold','magenta','forest','cherry',
  'mint','cobalt','lilac','raspberry','lime','scarlet','periwinkle','seafoam',
] as const;

function visualUnitTheme(bookNumber:number,unitNumber:number){
  const bookOffset=Math.max(0,bookNumber-1)*8;
  const index=(Math.max(1,unitNumber)-1+bookOffset)%unitVisualThemes.length;
  return unitVisualThemes[index];
}

const authoredThemeCache=new Map<string,string>();
async function authoredUnitTheme(path:string){
  const cached=authoredThemeCache.get(path);
  if(cached)return cached;
  const response=await fetch(GITHUB_RAW+path,{signal:AbortSignal.timeout(10000)});
  if(!response.ok)return null;
  const source=await response.text();
  const match=source.match(/["']theme["']\s*:\s*["']([a-z]+)["']/i);
  const theme=match?.[1]?.toLowerCase()||'';
  if(theme&&theme in themeColors){
    authoredThemeCache.set(path,theme);
    return theme;
  }
  return null;
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

let courseCache:{at:number;index:CourseIndex;manifest:Manifest}|null=null;

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
  if(!Array.isArray(index.order)||!index.unitReviews||!index.characters||!Array.isArray(manifest.books))
    throw new Error('Invalid curriculum data');
  courseCache={at:now,index,manifest};
  return courseCache;
}

function manifestUnit(manifest:Manifest,unitId:string){
  for(const book of manifest.books){
    const unit=book.units.find(item=>item.id===unitId);
    if(unit)return {book,unit};
  }
  return null;
}

function accountFromRpc(value:unknown):string{
  if(typeof value!=='string'||!/^account-v1-[a-f0-9]{64}$/.test(value))
    throw new Error('Invalid account mapping');
  return value;
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

    const {order:currentOrder,unitId:currentUnitId}=earliestOpenUnit(index,completedLessons);

    const currentMeta=manifestUnit(manifest,currentUnitId);
    if(!currentMeta)throw new Error('Current unit unavailable');
    const currentTheme=(await authoredUnitTheme(currentMeta.unit.path))
      || visualUnitTheme(currentMeta.book.number,currentMeta.unit.order);
    const palette=themeColors[currentTheme]||themeColors.blue;

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
      unitTheme:currentTheme,
      unitColor:palette.accent,
      unitTextColor:palette.onAccent,
      unitInkColor:palette.ink,
      nextCharacter,
      capturedAt:new Date(now).toISOString(),
    });
  }catch{
    return reply({error:'Hanzi widget data is temporarily unavailable.'},503);
  }
});
