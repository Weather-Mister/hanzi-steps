-- Exact clean-attempt counters for strict live statistics (2026-10-02).
begin;

alter table hanzi_private.practice_skill_state
  add column if not exists clean_correct integer not null default 0,
  add column if not exists clean_tracked integer not null default 0;

with event_rollup as (
  select
    user_id,
    item_id,
    mode,
    count(*)::integer as tracked,
    count(*) filter (where correct and not assisted)::integer as clean
  from hanzi_private.practice_attempt_events
  group by user_id,item_id,mode
)
update hanzi_private.practice_skill_state s
set clean_tracked = least(s.attempts,e.tracked),
    clean_correct = least(e.clean,least(s.attempts,e.tracked))
from event_rollup e
where s.user_id=e.user_id
  and s.item_id=e.item_id
  and s.mode=e.mode;

alter table hanzi_private.practice_skill_state
  drop constraint if exists practice_skill_state_clean_counts_check;

alter table hanzi_private.practice_skill_state
  add constraint practice_skill_state_clean_counts_check check (
    clean_correct >= 0
    and clean_tracked >= 0
    and clean_correct <= clean_tracked
    and clean_tracked <= attempts
  );

create or replace function public.hanzi_read_practice_state(expected_account text)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  account_key text := hanzi_private.resolve_account(expected_account);
  result jsonb;
begin
  if account_key is null then
    raise exception 'Sign in to load practice history.' using errcode = '28000';
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
    'itemId', item_id,
    'mode', mode,
    'attempts', attempts,
    'correct', correct,
    'assisted', assisted,
    'misses', misses,
    'cleanCorrect', clean_correct,
    'cleanTracked', clean_tracked,
    'streak', streak,
    'strength', strength,
    'lastSeen', last_seen,
    'nextReview', next_review
  ) order by last_seen desc, item_id, mode), '[]'::jsonb)
  into result
  from hanzi_private.practice_skill_state
  where user_id = account_key;

  return result;
end
$$;

create or replace function public.hanzi_record_practice_attempt(
  expected_account text,
  p_attempt_id text,
  p_item_id text,
  p_mode text,
  p_correct boolean,
  p_assisted boolean,
  p_session_kind text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_key text := hanzi_private.resolve_account(expected_account);
  old_strength double precision;
  old_streak integer;
  new_strength double precision;
  new_streak integer;
  now_ms bigint := floor(extract(epoch from clock_timestamp()) * 1000)::bigint;
  interval_ms bigint;
  inserted integer;
  result jsonb;
  prior hanzi_private.practice_attempt_events%rowtype;
begin
  if account_key is null then
    raise exception 'Sign in to save practice history.' using errcode = '28000';
  end if;

  if p_attempt_id is null
    or p_attempt_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    or p_item_id is null or length(p_item_id) not between 1 and 1024
    or p_mode is null or p_mode not in ('recognition','recall','pinyin','input','sentence','handwriting','context')
    or p_correct is null or p_assisted is null
    or p_session_kind is null or p_session_kind not in ('lesson','daily','revenge','mega','taiwan') then
    raise exception 'Invalid practice attempt.' using errcode = '22023';
  end if;

  insert into hanzi_private.practice_attempt_events(
    user_id, attempt_id, item_id, mode, correct, assisted, session_kind
  )
  values(account_key,p_attempt_id,p_item_id,p_mode,p_correct,p_assisted,p_session_kind)
  on conflict(user_id,attempt_id) do nothing;
  get diagnostics inserted = row_count;

  if inserted = 0 then
    select * into prior
    from hanzi_private.practice_attempt_events
    where user_id=account_key and attempt_id=p_attempt_id;

    if prior.item_id is distinct from p_item_id
      or prior.mode is distinct from p_mode
      or prior.correct is distinct from p_correct
      or prior.assisted is distinct from p_assisted
      or prior.session_kind is distinct from p_session_kind then
      raise exception 'Attempt identifier was reused with different data.' using errcode = '22023';
    end if;

    select jsonb_build_object(
      'itemId', item_id,
      'mode', mode,
      'attempts', attempts,
      'correct', correct,
      'assisted', assisted,
      'misses', misses,
      'cleanCorrect', clean_correct,
      'cleanTracked', clean_tracked,
      'streak', streak,
      'strength', strength,
      'lastSeen', last_seen,
      'nextReview', next_review
    ) into result
    from hanzi_private.practice_skill_state
    where user_id=account_key and item_id=p_item_id and mode=p_mode;

    return result;
  end if;

  insert into hanzi_private.practice_skill_state(user_id,item_id,mode)
  values(account_key,p_item_id,p_mode)
  on conflict(user_id,item_id,mode) do nothing;

  select strength, streak
  into old_strength, old_streak
  from hanzi_private.practice_skill_state
  where user_id=account_key and item_id=p_item_id and mode=p_mode
  for update;

  new_streak := case when p_correct and not p_assisted then old_streak + 1 else 0 end;

  if p_correct and not p_assisted then
    new_strength := least(1.0, old_strength + 0.16 + least(new_streak,5) * 0.02);
  elsif p_correct then
    new_strength := greatest(0.05, old_strength * 0.9);
  else
    new_strength := greatest(0.0, old_strength * 0.55);
  end if;

  interval_ms := case
    when new_strength < 0.2 then 600000
    when new_strength < 0.4 then 86400000
    when new_strength < 0.65 then 259200000
    when new_strength < 0.82 then 604800000
    else 1209600000
  end;

  update hanzi_private.practice_skill_state
  set attempts = attempts + 1,
      correct = correct + case when p_correct then 1 else 0 end,
      assisted = assisted + case when p_assisted then 1 else 0 end,
      misses = misses + case when not p_correct then 1 else 0 end,
      clean_correct = clean_correct + case when p_correct and not p_assisted then 1 else 0 end,
      clean_tracked = clean_tracked + 1,
      streak = new_streak,
      strength = new_strength,
      last_seen = now_ms,
      next_review = now_ms + interval_ms
  where user_id=account_key and item_id=p_item_id and mode=p_mode
  returning jsonb_build_object(
    'itemId', item_id,
    'mode', mode,
    'attempts', attempts,
    'correct', correct,
    'assisted', assisted,
    'misses', misses,
    'cleanCorrect', clean_correct,
    'cleanTracked', clean_tracked,
    'streak', streak,
    'strength', strength,
    'lastSeen', last_seen,
    'nextReview', next_review
  ) into result;

  return result;
end
$$;

revoke all on function public.hanzi_read_practice_state(text) from public, anon, authenticated;
grant execute on function public.hanzi_read_practice_state(text) to anon, authenticated, service_role;

revoke all on function public.hanzi_record_practice_attempt(text,text,text,text,boolean,boolean,text) from public, anon, authenticated;
grant execute on function public.hanzi_record_practice_attempt(text,text,text,text,boolean,boolean,text) to anon, authenticated, service_role;

commit;
