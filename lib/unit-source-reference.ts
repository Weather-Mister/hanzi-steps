import type {Unit} from '../course/schema.ts';

const exactUnitSources:Record<string,string>={
 'unit-1':'A Course in Contemporary Chinese 1 · Lesson 1 · pp. 1–21.',
 'unit-2':'A Course in Contemporary Chinese 1 · Lesson 1 · pp. 1–21.',
 'unit-3':'A Course in Contemporary Chinese 1 · Lesson 1 · pp. 1–21.',
 'unit-4':'A Course in Contemporary Chinese 1 · Lesson 1 · pp. 1–21.',
 'unit-5':'A Course in Contemporary Chinese 1 · Lesson 1 · pp. 1–21.',
 'unit-6':'A Course in Contemporary Chinese 1 · Lesson 2 · pp. 23–41.',
 'unit-7':'A Course in Contemporary Chinese 1 · Lessons 2–3 · pp. 23–63.',
 'unit-8':'A Course in Contemporary Chinese 1 · Lesson 3 · pp. 43–63.',
 'unit-9':'A Course in Contemporary Chinese 1 · Lesson 3 · pp. 46, 48, 52–55, 59.',
 'unit-10':'A Course in Contemporary Chinese 1 · Lesson 3 · pp. 46, 48–49, 52–55, 59.',
 'unit-11':'A Course in Contemporary Chinese 1 · Lesson 4 · pp. 66–71.',
 'unit-12':'A Course in Contemporary Chinese 1 · Lesson 4 · pp. 66–67, 70–71, 80.',
 'unit-13':'A Course in Contemporary Chinese 1 · Lesson 4 · pp. 66–72, 77, 80.',
 'unit-14':'A Course in Contemporary Chinese 1 · Lesson 4 · pp. 68–76, 79.',
 'unit-15':'A Course in Contemporary Chinese 1 · Lessons 4–5 · pp. 77–78, 86–88.',
 'unit-16':'A Course in Contemporary Chinese 1 · Lesson 5 · pp. 89–95, 99.',
 'unit-17':'A Course in Contemporary Chinese 1 · Lessons 5–6 · pp. 86–88, 104–106.',
 'unit-18':'A Course in Contemporary Chinese 1 · Lesson 6 · pp. 104–112, 114–115.',
 'unit-19':'A Course in Contemporary Chinese 1 · Lessons 5–6 · pp. 95–96, 104–112, 114–115.',
 'unit-20':'A Course in Contemporary Chinese 1 · Lesson 6 · pp. 104–118.',
 'unit-21':'A Course in Contemporary Chinese 1 · Lessons 6–7 · pp. 116–118, 130–145.',
 'unit-22':'A Course in Contemporary Chinese 1 · Lesson 7 · pp. 135–145.',
 'unit-23':'A Course in Contemporary Chinese 1 · Lesson 7 · pp. 135–145.',
 'unit-24':'A Course in Contemporary Chinese 1 · Lesson 8 · pp. 160–174.',
 'unit-25':'A Course in Contemporary Chinese 1 · Lesson 8 · pp. 163–171.',
 'unit-26':'A Course in Contemporary Chinese 1 · Lessons 8–9 · pp. 164–165, 183–188.',
 'unit-27':'A Course in Contemporary Chinese 1 · Lesson 9 · pp. 183–192.',
 'unit-28':'A Course in Contemporary Chinese 1 · Lessons 8–9 · pp. 160–165, 182–190.',
 'unit-29':'A Course in Contemporary Chinese 1 · Lessons 9–10 · pp. 185–193, 202–204.',
 'unit-30':'A Course in Contemporary Chinese 1 · Lesson 10 · pp. 204, 207–210.',
 'unit-31':'A Course in Contemporary Chinese 1 · Lesson 10 · pp. 205–207, 210–213.',
 'book-2-unit-1':'A Course in Contemporary Chinese 2 · Lesson 1 · pp. 2–9.',
 'book-2-unit-2':'A Course in Contemporary Chinese 2 · Lesson 1 · pp. 3–5, 13–14.',
 'book-2-unit-3':'A Course in Contemporary Chinese 2 · Lesson 1 · pp. 2, 4–6.',
};

function compactLegacyReference(raw:string,bookNumber:number):string|null{
 const lessonNumbers=[...raw.matchAll(/Lessons?\s+(\d+)(?:\s*[–-]\s*(\d+))?/gi)].flatMap(match=>match[2]?[Number(match[1]),Number(match[2])]:[Number(match[1])]);
 const uniqueLessons=[...new Set(lessonNumbers.filter(Number.isFinite))];
 const pageGroups=[...raw.matchAll(/\bpp?\.\s*([0-9]+(?:[–-][0-9]+)?(?:\s*[,;]\s*[0-9]+(?:[–-][0-9]+)?)*)/gi)]
  .map(match=>match[1].replace(/\s*;\s*/g,', ').replace(/\s*,\s*/g,', ').trim())
  .filter(Boolean);
 if(!uniqueLessons.length||!pageGroups.length)return null;
 const lessonLabel=uniqueLessons.length===1?'Lesson '+uniqueLessons[0]:'Lessons '+uniqueLessons.join('–');
 return 'A Course in Contemporary Chinese '+bookNumber+' · '+lessonLabel+' · pp. '+pageGroups.join(', ')+'.';
}

export function unitSourceReference(unit:Unit,bookNumber:number):string|null{
 return exactUnitSources[unit.id]??(unit.bookReference?compactLegacyReference(unit.bookReference,bookNumber):null);
}
