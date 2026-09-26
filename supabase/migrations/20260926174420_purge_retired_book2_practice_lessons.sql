-- Remove standalone handwriting lesson rows for characters that existed only
-- in the retired Book 2 prototype. Shared characters that are still taught in
-- Book 1 are intentionally preserved.

begin;

delete from public.hanzi_sessions
where lesson_id in ('practice-轉','practice-銀','practice-離','practice-第','practice-綠','practice-燈');

delete from hanzi_private.lesson_lengths
where lesson_id in ('practice-轉','practice-銀','practice-離','practice-第','practice-綠','practice-燈');

commit;
