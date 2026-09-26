-- Purge every backend record uniquely tied to the retired Book 2 prototype.
-- This mirrors Supabase migration 20260926173406, already applied to production.
--
-- Keep Book 1/shared lexical mastery intact. Only Book 2 lesson IDs, Book 2
-- vocabulary/phrase IDs, and characters that existed only in the retired
-- Book 2 prototype are removed.

begin;

delete from public.hanzi_sessions
where lesson_id ~ '^(b2-|b2u[0-9]+-|book-2)';

delete from hanzi_private.lesson_lengths
where lesson_id ~ '^(b2-|b2u[0-9]+-|book-2)';

delete from hanzi_private.mastered_vocab
where vocab_id like 'v1:b2%'
   or vocab_id like 'v1:book-2%';

delete from hanzi_private.practice_skill_state
where item_id like 'v1:b2%'
   or item_id like 'v1:book-2%'
   or item_id like 'phrase:b2%'
   or item_id like 'phrase:book-2%'
   or item_id in ('char:轉','char:銀','char:離','char:第','char:綠','char:燈');

delete from hanzi_private.practice_attempt_events
where item_id like 'v1:b2%'
   or item_id like 'v1:book-2%'
   or item_id like 'phrase:b2%'
   or item_id like 'phrase:book-2%'
   or item_id in ('char:轉','char:銀','char:離','char:第','char:綠','char:燈');

commit;
