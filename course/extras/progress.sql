-- Register optional lessons in the existing checkpoint validator.
-- This adds curriculum metadata only. It does not rewrite learner state,
-- relax validation, change RPC permissions, or change first-teaching ownership.
insert into hanzi_private.lesson_lengths (lesson_id, steps) values
  ('extra-clothing-learn-1', 11),
  ('extra-clothing-learn-2', 8),
  ('extra-clothing-learn-3', 8),
  ('extra-clothing-images', 9),
  ('extra-clothing-measures', 20),
  ('extra-clothing-listening', 11),
  ('extra-clothing-review', 21),
  ('extra-fruits-learn-1', 11),
  ('extra-fruits-learn-2', 8),
  ('extra-fruits-learn-3', 8),
  ('extra-fruits-images', 9),
  ('extra-fruits-measures', 20),
  ('extra-fruits-listening', 11),
  ('extra-fruits-review', 21)
on conflict (lesson_id) do update set steps=excluded.steps;
