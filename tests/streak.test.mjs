import {test} from 'node:test';
import assert from 'node:assert/strict';
import {completionTimestamp,streakFromDays,taipeiDay,validStudyDays} from '../lib/streak.ts';
const now=Date.parse('2026-09-10T08:00:00Z');

test('Taiwan study days roll over at 16:00 UTC, not the browser or server midnight',()=>{
 assert.equal(taipeiDay(Date.parse('2026-09-09T15:59:59.999Z')),'2026-09-09');
 assert.equal(taipeiDay(Date.parse('2026-09-09T16:00:00.000Z')),'2026-09-10');
 assert.equal(taipeiDay(Date.parse('2026-12-31T16:00:00.000Z')),'2027-01-01');
});
test('A first completion starts at one and repeated study on the same day does not increment',()=>{
 const empty=streakFromDays([],now);assert.equal(empty.current,0);assert.equal(empty.best,0);assert.equal(empty.practicedToday,false);
 const first=streakFromDays(['2026-09-10','2026-09-10'],now);assert.equal(first.current,1);assert.equal(first.best,1);assert.equal(first.practicedToday,true);
});
test('Yesterday preserves the streak until today ends, while a full missed day resets it',()=>{
 const days=['2026-09-07','2026-09-08','2026-09-09'];
 assert.equal(streakFromDays(days,now).current,3);
 assert.equal(streakFromDays(days,now).practicedToday,false);
 assert.equal(streakFromDays(days,Date.parse('2026-09-10T16:00:00Z')).current,0);
 const restarted=streakFromDays([...days,'2026-09-11'],Date.parse('2026-09-11T04:00:00Z'));
 assert.equal(restarted.current,1);assert.equal(restarted.best,3);
});
test('Consecutive days work across leap days, month boundaries, and years',()=>{
 assert.equal(streakFromDays(['2028-02-28','2028-02-29','2028-03-01'],Date.parse('2028-03-01T04:00:00Z')).current,3);
 assert.equal(streakFromDays(['2026-12-30','2026-12-31','2027-01-01'],Date.parse('2027-01-01T04:00:00Z')).current,3);
});
test('Week display is Monday to Sunday with distinct completed, today, and future states',()=>{
 const streak=streakFromDays(['2026-09-08','2026-09-10'],now);
 assert.equal(streak.week.length,7);
 assert.equal(streak.week[0].date,'2026-09-07');assert.equal(streak.week[6].date,'2026-09-13');
 assert.equal(streak.week.filter(d=>d.today).length,1);
 assert.equal(streak.week.find(d=>d.today).date,'2026-09-10');
 assert.equal(streak.week.filter(d=>d.done).length,2);assert.equal(streak.week.filter(d=>d.future).length,3);
});
test('Invalid, duplicated, unordered, and future dates cannot inflate a streak',()=>{
 const result=streakFromDays(['2026-09-10','2026-09-09','2026-09-09','invalid','2026-02-30','2026-09-11'],now);
 assert.equal(result.current,2);assert.equal(result.best,2);
 assert.ok(validStudyDays([]));assert.ok(validStudyDays(['2028-02-29']));
 for(const invalid of [null,{},[1],['2026-02-30'],['2026-1-1'],['not a date']])assert.ok(!validStudyDays(invalid));
});
test('Offline timestamps are preserved and invalid or future clocks are bounded',()=>{
 assert.equal(completionTimestamp(now-86_400_000,now),now-86_400_000);
 for(const invalid of [now+1000,Infinity,NaN,-1,0])assert.equal(completionTimestamp(invalid,now),now);
});
