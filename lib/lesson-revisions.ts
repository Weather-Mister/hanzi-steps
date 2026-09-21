// Retired sequences keep their original checkpoint bounds. Never reinterpret an
// old index as a position in a different lesson or rewrite an existing session.
export const previousLessonLengths:Record<string,number>={
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

 'u7-numbers':19,'u7-describe':19,'u7-hobbies':23,'u7-activities':32,
 'u7-often':19,'u7-plans':20,'u7-review':20,
 'u8-time':28,'u8-opinions':20,'u8-together':20,'u8-dinner':25,
 'u8-possible':17,'u8-agree':15,'u8-review':21
};

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
