begin;

create table if not exists hanzi_private.practice_skill_state (
  user_id text not null,
  item_id text not null,
  mode text not null,
  attempts integer not null default 0,
  correct integer not null default 0,
  assisted integer not null default 0,
  misses integer not null default 0,
  streak integer not null default 0,
  strength double precision not null default 0,
  last_seen bigint not null default 0,
  next_review bigint not null default 0,
  primary key (user_id, item_id, mode),
  constraint practice_skill_state_user_id_check check (user_id ~ '^account-v1-[a-f0-9]{64}$'),
  constraint practice_skill_state_item_id_check check (length(item_id) between 1 and 1024),
  constraint practice_skill_state_mode_check check (mode in ('recognition','recall','pinyin','input','sentence','handwriting','context')),
  constraint practice_skill_state_counts_check check (
    attempts >= 0 and correct >= 0 and assisted >= 0 and misses >= 0 and streak >= 0
    and correct <= attempts and assisted <= attempts and misses <= attempts
  ),
  constraint practice_skill_state_strength_check check (strength between 0 and 1),
  constraint practice_skill_state_time_check check (last_seen >= 0 and next_review >= 0)
);

alter table hanzi_private.practice_skill_state enable row level security;
revoke all on hanzi_private.practice_skill_state from public, anon, authenticated;

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
  result jsonb;
begin
  if account_key is null then
    raise exception 'Sign in to save practice history.' using errcode = '28000';
  end if;

  if p_item_id is null or length(p_item_id) not between 1 and 1024
    or p_mode is null or p_mode not in ('recognition','recall','pinyin','input','sentence','handwriting','context')
    or p_correct is null or p_assisted is null
    or p_session_kind is null or p_session_kind not in ('lesson','daily','revenge','mega','taiwan') then
    raise exception 'Invalid practice attempt.' using errcode = '22023';
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
      misses = misses + case when (not p_correct) or p_assisted then 1 else 0 end,
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

revoke all on function public.hanzi_record_practice_attempt(text,text,text,boolean,boolean,text) from public, anon, authenticated;
grant execute on function public.hanzi_record_practice_attempt(text,text,text,boolean,boolean,text) to anon, authenticated, service_role;

commit;
