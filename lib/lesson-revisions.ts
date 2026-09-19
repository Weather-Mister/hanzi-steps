// Retired sequences keep their original checkpoint bounds. Never reinterpret an
// old index as a position in a different lesson or rewrite an existing session.
export const previousLessonLengths:Record<string,number>={
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
