// Retired sequences keep their original checkpoint bounds. Never reinterpret an
// old index as a position in a different lesson or rewrite an existing session.
export const previousLessonLengths:Record<string,number>={
 // Book 2 self-containment repair appends practice without moving old checkpoints.
 'b2u1-l4-lesson':8,
 'b2u1-l6-lesson':6,
 'b2u1-l7-lesson':27,
 'b2u2-l4-lesson':17,
 'b2u2-l6-lesson':15,
 'b2u2-l7-lesson':39,
 'b2u3-l3-lesson':13,
 'b2u3-l6-lesson':6,
 'b2u3-l7-lesson':27,
 'b2u4-l2-lesson':8,
 'b2u4-l3-lesson':13,
 'b2u4-l6-lesson':8,
 'b2u4-l7-lesson':40,
 // Units 21–25 were extended by appending practice; their existing completed
 // checkpoints keep credit at the old lengths. Partial indexes still refer to the same steps.
 'u21-soften':10,
 'u21-karaoke':22,
 'u21-clock':11,
 'u21-time-place':23,
 'u21-from-to':19,
 'u21-conversation':27,
 'u21-review':18,
 'u22-afternoon':13,
 'u22-half':22,
 'u22-start-end':30,
 'u22-progressive':15,
 'u22-routine':24,
 'u22-calligraphy':14,
 'u22-review':18,
 'u23-method':6,
 'u23-do':17,
 'u23-play':21,
 'u23-contrast':6,
 'u23-order':6,
 'u23-transfer':10,
 'u23-review':10,
 'u24-frame':21,
 'u24-price':10,
 'u24-distance':7,
 'u24-degree':22,
 'u24-negation':22,
 'u24-questions':21,
 'u24-review':10,
 'u25-transport':20,
 'u25-rides':26,
 'u25-visit':20,
 'u25-compare':5,
 'u25-negative':6,
 'u25-choices':5,
 'u25-review':9,

 // Reading-expansion review checks were appended without moving any existing step.
 // Keep already-completed reviews valid at their previously published bounds.
 'u12-challenge':20,
 'u18-review':19,
 'u30-review':22,
 'u36-review':27,
 'u42-review':25,
 'u48-review':58,

 // Units 28–29 were rebalanced after publication by appending source-backed content.
 // Preserve every previously valid completion bound and all partial step positions.
 'u28-film':5,
 'u28-years-days':14,
 'u28-hours':13,
 'u28-object':5,
 'u28-negation':5,
 'u28-separable':6,
 'u28-review':20,
 'u29-date':16,
 'u29-hai':5,
 'u29-maokong':9,
 'u29-condition':10,
 'u29-negative':4,
 'u29-integrate':6,
 'u29-review':20,

 'u7-numbers':19,'u7-describe':19,'u7-hobbies':23,'u7-activities':32,
 'u7-often':19,'u7-plans':20,'u7-review':20,
 'u8-time':28,'u8-opinions':20,'u8-together':20,'u8-dinner':25,
 'u8-possible':17,'u8-agree':15,'u8-review':21
};

/**
 * Additional historical completion bounds for lessons that have already been
 * extended more than once. Keep previousLessonLengths for compatibility with
 * older callers; add later published completion lengths here instead of
 * overwriting the first historical bound.
 */
export const additionalPreviousLessonLengths:Record<string,number[]>={
 // Controlled production extends tails; keep the exact published completion bounds.
 'u8-v2-review':[15],
 'u9-review':[16],
 'u10-challenge':[15],
 'u11-challenge':[16],
 'u12-challenge':[21],
 'u13-challenge':[11],
 'u14-challenge':[12],
 'u15-challenge':[12],
 'u16-challenge':[15],
 'u17-review':[15],
 'u18-review':[20],
 'u19-review':[14],
 'u20-review':[17],
 'u21-review':[20],
 'u22-review':[20],
 'u23-transfer':[14],
 'u23-review':[19],
 'u24-questions':[26],
 'u25-choices':[7],
 'u25-review':[19],
 'u26-review':[20],
 'u27-decide':[17],
 'u27-review':[22],
 'u30-clothes':[15],
 'u30-review':[23],
 'u31-because':[10],
 'u31-review':[22],
 'u32-quick':[5],
 'u32-review':[22],
 'u33-will-omit':[8],
 'u33-review':[22],
 'u34-review':[22],
 'u35-cheer':[17],
 'u35-review':[27],
 'u36-hard':[8],
 'u36-review':[28],
 'u37-review':[19],
 'u38-review':[20],
 'u39-negation':[8],
 'u39-review':[21],
 'u40-customs':[6],
 'u40-review':[20],
 'u41-review':[22],
 'u42-seasons':[11],
 'u42-review':[26],
 'u43-return-plan':[11],
 'u43-next-year':[13],
 'u43-review':[28],
 'u44-review':[41],
 'u45-throat':[32],
 'u45-how-long':[9],
 'u46-doctor-visit':[22],
 'u46-review':[34],
 'u47-refuse-help':[10],
 'u47-review':[34],
 'u48-a-little':[11],
 'u48-separable':[11],
 'u48-prescription':[9],
 'u24-review':[19],
 'u28-film':[16],
 'u28-years-days':[21],
 'u28-hours':[19],
 'u28-object':[13],
 'u28-negation':[12],
 'u28-separable':[8],
 'u28-review':[22],
 'u29-date':[27],
 'u29-hai':[17],
 'u29-maokong':[16],
 'u29-condition':[17],
 'u29-negative':[6],
 'u29-integrate':[8],
 'u29-review':[22]
};

export function historicalLessonLengthsFor(lessonId:string):number[]{
 const values:number[]=[];
 if(Object.hasOwn(previousLessonLengths,lessonId))values.push(previousLessonLengths[lessonId]);
 if(Object.hasOwn(additionalPreviousLessonLengths,lessonId))values.push(...additionalPreviousLessonLengths[lessonId]);
 return [...new Set(values)].sort((a,b)=>a-b);
}

// Credit completed content when all of a revised lesson's source lessons were
// finished. Completing the previous unit review also retains unit completion.
export const revisedLessonPrerequisites:Record<string,string[]>={
 'u7-v2-numbers':['u7-numbers','u7-describe'],
 'u7-v2-describe':['u7-hobbies','u7-activities'],
 'u7-v2-hobbies':['u7-hobbies'],
 'u7-v2-activities':['u7-activities'],
 'u7-v2-often':['u7-often'],
 'u7-v2-plans':['u7-plans'],
 'u7-v2-review':['u7-review'],
 'u8-v2-time':['u8-time'],
 'u8-v2-opinions':['u8-opinions'],
 'u8-v2-together':['u8-together'],
 'u8-v2-invite':['u8-together'],
 'u8-v2-possible':['u8-possible'],
 'u8-v2-agree':['u8-agree'],
 'u8-v2-review':['u8-review']
};

export function completedLessonIds(ids:Iterable<string>):Set<string>{
 const completed=new Set(ids);
 for(const [current,required] of Object.entries(revisedLessonPrerequisites)){
  const priorReview=`${current.split('-')[0]}-review`;
  if(completed.has(priorReview)||required.every(id=>completed.has(id)))completed.add(current);
 }
 return completed;
}
