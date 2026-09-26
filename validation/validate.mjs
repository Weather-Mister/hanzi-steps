// Pure structural validation. No network, textbook analysis or content repair.
export const han = text => [...text].filter(c => /\p{Script=Han}/u.test(c));
const generic = /^\s*remember the shape(?:[.!:\s]|$)|follow the highlighted groups in order|keep the whole character balanced inside the square|practice all \d+ strokes of .+ in the displayed Traditional stroke order before writing it from memory|is introduced here through .+: /i;
const object = x => !!x && typeof x === 'object' && !Array.isArray(x);
const text = x => typeof x === 'string' && x.trim().length > 0;
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const types = new Set(['intro','trace','complete','memory','select','parts','build','match','phrase','order','listen','grammar']);

export function validateCourse(manifest, modules, geometry = {}) {
 const errors = [], seen = {book:new Set(),unit:new Set(),lesson:new Set(),activity:new Set(),phrase:new Set(),grammar:new Set(),word:new Map(),character:new Map(),concept:new Set()}, memories=new Map();
 const fail = (at,message) => errors.push(`${at}: ${message}`);
 const required = (record,keys,at) => {for(const k of keys) if(!text(record?.[k])) fail(at,`missing/invalid ${k}`);};
 const strings = (value,at,{empty=true,unique=true}={}) => {
  if(!Array.isArray(value)||value.some(v=>!text(v))||(!empty&&!value.length)){fail(at,'expected an array of nonempty strings');return false;}
  if(unique&&new Set(value).size!==value.length)fail(at,'duplicate declaration/reference');return true;
 };
 const unique = (set,id,at,kind) => {if(set.has(id))fail(at,`duplicate ${kind} ID ${id}`);set.add(id);};
 const triple = (v,at) => required(v,['text','pinyin','meaning'],at);
 const choice = (q,at) => {required(q,['prompt','answer','explanation'],at);if(strings(q.options,`${at} options`,{empty:false})&&(!q.options.includes(q.answer)||q.options.length<2))fail(at,'no valid correct answer in options');};
 if(!object(manifest)||manifest.schemaVersion!==1||!Array.isArray(manifest.books))return ['manifest: malformed schemaVersion/books'];
 if(!Array.isArray(modules))return ['course: malformed modules'];
 const entries=[];
 for(const [bi,book]of manifest.books.entries()){
  const at=`Book ${book?.number??bi+1}`;required(book,['id','title'],at);unique(seen.book,book?.id,at,'book');
  if(book?.number!==bi+1||typeof book.available!=='boolean'||!Array.isArray(book.units)){fail(at,'invalid book ordering/availability/units');continue;}
  if(book.available!==(book.units.length>0))fail(at,'available must match implemented units');
  for(const [ui,e]of book.units.entries()){
   required(e,['id','title','path'],at);unique(seen.unit,e?.id,at,'unit');
   if(e?.order!==ui+1)fail(at,`invalid unit ordering at ${e?.id}`);
   if(typeof e?.path!=='string'||!/^course\/book[1-9]\d*\/unit\d{2,}\.ts$/.test(e.path))fail(at,`invalid module path ${e?.path}`);
   entries.push({book,e});
  }
 }
 if(entries.length!==modules.length)fail('manifest','registered unit count differs from loaded modules');
 const paths=entries.map(({e})=>e.path);if(new Set(paths).size!==paths.length)fail('manifest','duplicate module path');
 const priorChars={},priorRules={},priorPhrases={};
 for(const [i,m]of modules.entries()){
  const registration=entries[i];if(!registration){fail('course','unregistered module');continue;}
  const {book,e}=registration,at=`Book ${book.number} / Unit ${e.order} (${e.id})`;
  if(!object(m)||m.schemaVersion!==1||!object(m.unit)){fail(at,'malformed unit data/schemaVersion');continue;}
  try {
  const u=m.unit;
  if(m.bookId!==book.id||m.order!==e.order||u.id!==e.id||u.title!==e.title||(u.displayNumber??u.number)!==e.order)fail(at,'module identity/title/order disagrees with manifest');
  required(u,['id','label','title','description','theme'],at);
  if(!['blue','teal','plum','amber','rose','cyan','indigo','orange'].includes(u.theme))fail(at,'invalid theme');
  if(!Number.isInteger(u.number)||u.number<1)fail(at,'invalid legacy unit number');
  required(u.banner,['text','pinyin'],`${at} banner`);triple(u.goal,`${at} goal`);
  for(const k of ['lessons','newVocabulary','reviewVocabulary','newCharacters','reviewCharacters','grammarIntroductions','reviewGrammar','revisionStepIds'])if(!Array.isArray(m[k]))fail(at,`missing/malformed ${k}`);
  for(const k of ['characters','grammarRules','phrases'])if(!object(m[k]))fail(at,`missing/malformed ${k}`);
  if(['lessons','newVocabulary','reviewVocabulary','newCharacters','reviewCharacters','grammarIntroductions','reviewGrammar','revisionStepIds'].some(k=>!Array.isArray(m[k]))||['characters','grammarRules','phrases'].some(k=>!object(m[k])))continue;
  for(const k of ['newCharacters','reviewCharacters','reviewVocabulary','reviewGrammar','revisionStepIds'])strings(m[k],`${at} ${k}`);
  for(const k of ['chars','lessonIds','grammarIds'])strings(u[k],`${at} ${k}`);
  if(!Array.isArray(u.chars)||!Array.isArray(u.lessonIds)||!Array.isArray(u.grammarIds))continue;
  if(!m.lessons.length||!same(u.lessonIds,m.lessons.map(l=>l?.id)))fail(at,'missing referenced lessons or lesson order mismatch');
  if(!m.lessons.some(l=>l.id===m.reviewLessonId))fail(at,'missing reviewLessonId');
  if(!same(Object.keys(m.grammarRules),u.grammarIds))fail(at,'grammarIds must match unit grammar records in order');
  const localLessons=new Map(m.lessons.map(l=>[l?.id,l]));
  for(const word of m.newVocabulary){
   const wa=`${at} vocabulary ${word?.text??'?'}`;triple(word,wa);required(word,['lessonId'],wa);
   if(!text(word?.text)||!han(word.text).length)fail(wa,'Chinese vocabulary must contain Han characters');
   if(typeof word?.core!=='boolean')fail(wa,'missing/invalid core');
   if(!localLessons.has(word?.lessonId))fail(wa,`missing referenced lesson ${word?.lessonId}`);
   if(seen.word.has(word?.text))fail(wa,`duplicate first-teaching declaration; already taught in ${seen.word.get(word.text)}`);
   // Earlier formal declarations only. A record merely existing elsewhere is insufficient.
   if(text(word?.text))for(const ch of new Set(han(word.text)))if(!seen.character.has(ch)&&!m.newCharacters.includes(ch))fail(wa,`missing first-time character ${ch}`);
   seen.word.set(word?.text,at);
  }
  for(const w of m.reviewVocabulary)if(!seen.word.has(w)||m.newVocabulary.some(n=>n.text===w))fail(at,`REVIEW vocabulary ${w} has no earlier formal teaching`);
  const allChars={...priorChars,...m.characters},allRules={...priorRules,...m.grammarRules},allPhrases={...priorPhrases,...m.phrases};
  if(!same(Object.keys(m.characters),m.newCharacters))fail(at,'character records must match NEW character declarations in card order');
  for(const ch of m.newCharacters){
   const ca=`${at} character ${ch}`,c=m.characters[ch];
   if(!text(ch)||[...ch].length!==1||han(ch).length!==1)fail(ca,'expected one Han character');
   if(seen.character.has(ch))fail(ca,`duplicate first-teaching declaration; already taught in ${seen.character.get(ch)}`);
   if(!object(c)){fail(ca,'missing character teaching entry');continue;}
   required(c,['hanzi','pinyin','zhuyin','meaning','note','memory','layout'],ca);triple(c.example,`${ca} example`);
   if(c.hanzi!==ch)fail(ca,'character key does not match hanzi');
   if(!['side','stack','whole'].includes(c.layout))fail(ca,'invalid layout');
   if(!Number.isInteger(c.strokes)||c.strokes<1)fail(ca,'invalid stroke count');
   for(const f of ['note','memory'])if(!text(c[f])||generic.test(c[f]))fail(ca,`missing character-specific ${f} explanation`);
   if(memories.has(c.memory)&&memories.get(c.memory)!==ch)fail(ca,`reuses character explanation for ${memories.get(c.memory)}`);memories.set(c.memory,ch);
   if(!Array.isArray(c.parts)||!c.parts.length){fail(ca,'missing character-specific parts');continue;}
   for(const p of c.parts){required(p,['label','name','role','description'],ca);if(generic.test(p.description))fail(ca,'generic component explanation');if(!Array.isArray(p.strokes)||p.strokes.some(s=>!Number.isInteger(s)||s<0||s>=c.strokes))fail(ca,'invalid component stroke indexes');}
   if(!same(c.parts.flatMap(p=>p.strokes||[]).sort((a,b)=>a-b),Array.from({length:c.strokes},(_,i)=>i)))fail(ca,'incomplete/duplicate component strokes');
   if(c.partQuestion)choice(c.partQuestion,`${ca} part question`);
   const g=geometry[ch];
   if(!g||!Array.isArray(g.strokes)||!Array.isArray(g.medians)||g.strokes.length!==c.strokes||g.medians.length!==c.strokes||g.strokes.some(p=>!text(p))||g.medians.some(line=>!Array.isArray(line)||line.length<2||line.some(p=>!Array.isArray(p)||p.length!==2||p.some(n=>!Number.isFinite(n)))))fail(ca,'missing/malformed handwriting geometry');
  }
  for(const ch of m.reviewCharacters)if(!seen.character.has(ch))fail(at,`REVIEW character ${ch} has no earlier formal teaching`);
  if(!same(m.reviewCharacters,u.chars.filter(ch=>seen.character.has(ch))))fail(at,'reviewCharacters must identify previously taught guided targets');
  for(const ch of u.chars)if(!allChars[ch])fail(at,`missing guided character ${ch}`);
  for(const [id,g]of Object.entries(m.grammarRules)){
   unique(seen.grammar,id,at,'grammar');required(g,['id','title','pattern','explanation','remember'],`${at} grammar ${id}`);
   if(g.id!==id)fail(at,`grammar key/id mismatch ${id}`);
   if(!Array.isArray(g.examples)||!g.examples.length)fail(at,`grammar ${id} missing examples`);else for(const ex of g.examples)triple(ex,`${at} grammar ${id} example`);
   if(g.words)strings(g.words,`${at} grammar ${id} words`);
  }
  for(const [id,p]of Object.entries(m.phrases)){
   unique(seen.phrase,id,at,'phrase');triple(p,`${at} phrase ${id}`);if(typeof p.note!=='string')fail(at,`phrase ${id} missing note field (empty is allowed)`);strings(p.tokens,`${at} phrase ${id} tokens`,{empty:false,unique:false});
   if(p.grammarIds){strings(p.grammarIds,`${at} phrase ${id} grammarIds`);for(const g of p.grammarIds)if(!allRules[g])fail(at,`phrase ${id} references missing grammar ${g}`);}
  }
  const localSteps=new Map();
  for(const l of m.lessons){
   const la=`${at} lesson ${l?.id??'?'}`;
   if(!object(l)){fail(la,'malformed lesson');continue;}
   required(l,['id','title','subtitle','minutes'],la);unique(seen.lesson,l.id,la,'lesson');strings(l.chars,`${la} chars`);
   if(l.unitId&&l.unitId!==u.id)fail(la,'wrong unitId');
   if(l.review!==undefined&&l.review!==(l.id===m.reviewLessonId))fail(la,'review flag disagrees with reviewLessonId');
   for(const ch of l.chars||[])if(!allChars[ch])fail(la,`missing character reference ${ch}`);
   if(!Array.isArray(l.steps)||!l.steps.length){fail(la,'missing steps');continue;}
   for(const s of l.steps){
    const sa=`${la} activity ${s?.id??'?'}`;if(!object(s)){fail(sa,'malformed activity');continue;}
    required(s,['id','type'],sa);unique(seen.activity,s.id,sa,'activity');localSteps.set(s.id,{l,s});
    if(!types.has(s.type))fail(sa,`unknown activity type ${s.type}`);
    if(s.char&&!allChars[s.char])fail(sa,`missing character reference ${s.char}`);
    if(['intro','trace','complete','memory','build','parts','listen'].includes(s.type)&&!allChars[s.char])fail(sa,'missing required character');
    if(['select','listen','parts'].includes(s.type))choice({...allChars[s.char]?.partQuestion,...s,prompt:s.prompt||(s.type==='listen'?'Listen':undefined)},sa);
    if(s.semanticAnswer!==undefined&&(s.type!=='listen'||s.semanticAnswer!==true))fail(sa,'semanticAnswer is only valid as true on listening exercises');
    if(s.audioText!==undefined){
     if(s.type!=='listen'||!text(s.audioText))fail(sa,'audioText requires a listening exercise and nonempty text');
     else if(!s.semanticAnswer&&(!Array.isArray(s.options)||!s.audioText.includes(s.answer)||s.options.filter(o=>s.audioText.includes(o)).length!==1))fail(sa,'contextual audio must contain only one answer option unless semanticAnswer is true');
    }
    if(s.type==='match'){
     if(strings(s.chars,`${sa} chars`,{empty:false})&&s.chars.length<2)fail(sa,'match requires at least two characters');
     for(const ch of s.chars||[])if(!allChars[ch])fail(sa,`missing match answer character ${ch}`);
    }
    if(s.phrase&&!allPhrases[s.phrase])fail(sa,`missing phrase reference ${s.phrase}`);
    if(['phrase','order'].includes(s.type)&&!allPhrases[s.phrase])fail(sa,'missing required phrase');
    if(s.type==='order'&&allPhrases[s.phrase]){
     if(strings(s.tokens,`${sa} tokens`,{empty:false,unique:false})){
      const bank=[...s.tokens];for(const token of allPhrases[s.phrase].tokens||[]){const j=bank.indexOf(token);if(j<0)fail(sa,`no valid correct answer; bank missing ${token}`);else bank.splice(j,1);}
     }
    }
    if(s.grammar&&!allRules[s.grammar])fail(sa,`missing grammar reference ${s.grammar}`);
    if(s.type==='grammar'&&!allRules[s.grammar])fail(sa,'missing required grammar');
    if(s.grammarIds){strings(s.grammarIds,`${sa} grammarIds`);for(const g of s.grammarIds)if(!allRules[g])fail(sa,`missing grammar reference ${g}`);}
   }
  }
  for(const intro of m.grammarIntroductions){
   const ga=`${at} grammar introduction ${intro?.id??'?'}`;required(intro,['id','kind','ref','lessonId','stepId'],ga);unique(seen.concept,intro.id,ga,'first-teaching');
   const loc=localSteps.get(intro.stepId);
   if(!loc||loc.l.id!==intro.lessonId)fail(ga,'broken teaching lesson/activity reference');
   if(intro.kind==='rule'){
    if(!m.grammarRules[intro.ref]||intro.id!==intro.ref||loc?.s.type!=='grammar'||loc?.s.grammar!==intro.ref)fail(ga,'invalid formal rule teaching');
   }else if(intro.kind==='phrase-note'){
    if(!text(m.phrases[intro.ref]?.note)||loc?.s.type!=='phrase'||loc?.s.phrase!==intro.ref)fail(ga,'invalid formal phrase-note teaching');
   }else fail(ga,'unknown introduction kind');
  }
  for(const id of Object.keys(m.grammarRules))if(!m.grammarIntroductions.some(g=>g.kind==='rule'&&g.ref===id))fail(at,`grammar ${id} missing formal teaching declaration`);
  for(const id of m.reviewGrammar)if(!priorRules[id])fail(at,`REVIEW grammar ${id} has no earlier formal teaching`);
  for(const id of m.revisionStepIds)if(!localSteps.has(id))fail(at,`missing revision activity reference ${id}`);
  m.newCharacters.forEach(ch=>{if(!seen.character.has(ch))seen.character.set(ch,at)});
  Object.assign(priorChars,m.characters);Object.assign(priorRules,m.grammarRules);Object.assign(priorPhrases,m.phrases);
  } catch(error) { fail(at,`malformed unit data: ${error.message}`); }
 }
 return errors;
}
