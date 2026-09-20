-- Replace Google OAuth with the same lightweight username profile model used by the other study apps.
-- Usernames are intentionally not secrets: knowing a username is enough to open that profile.
begin;

create table if not exists hanzi_private.username_accounts (
  username text primary key,
  legacy_user_id text not null unique,
  created_at timestamptz not null default now(),
  constraint username_accounts_username_check check (username ~ '^[a-z0-9_]{2,32}$'),
  constraint username_accounts_legacy_user_id_check check (legacy_user_id ~ '^account-v1-[a-f0-9]{64}$')
);

alter table hanzi_private.username_accounts enable row level security;
revoke all on hanzi_private.username_accounts from public, anon, authenticated;

-- Preserve existing Google-linked progress. Each old account gets a username based
-- on the email local-part (lowercase, punctuation collapsed to underscores).
with raw as (
  select
    a.legacy_user_id,
    lower(coalesce(u.email, '')) as email,
    trim(both '_' from regexp_replace(
      lower(split_part(coalesce(u.email, ''), '@', 1)),
      '[^a-z0-9_]+', '_', 'g'
    )) as base_name
  from hanzi_private.accounts a
  join auth.users u on u.id = a.auth_user_id
  where u.email is not null and btrim(u.email) <> ''
),
prepared as (
  select
    legacy_user_id,
    email,
    case
      when length(base_name) between 2 and 32 then left(base_name, 24)
      else 'user_' || substr(md5(email), 1, 8)
    end as base_name
  from raw
),
named as (
  select
    legacy_user_id,
    case
      when count(*) over (partition by base_name) = 1
        then left(base_name, 32)
      else left(base_name, 25) || '_' || substr(md5(email), 1, 6)
    end as username
  from prepared
)
insert into hanzi_private.username_accounts(username, legacy_user_id)
select username, legacy_user_id
from named
where username ~ '^[a-z0-9_]{2,32}$'
on conflict do nothing;

create or replace function hanzi_private.username_account(p_username text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_username text := lower(btrim(p_username));
  account_key text;
begin
  if v_username is null or v_username !~ '^[a-z0-9_]{2,32}$' then
    raise exception 'invalid_username' using errcode = '22023';
  end if;

  select ua.legacy_user_id
    into account_key
  from hanzi_private.username_accounts ua
  where ua.username = v_username;

  if account_key is not null then
    return account_key;
  end if;

  account_key := 'account-v1-' || encode(
    sha256(convert_to('hanzi-steps/username/v1:' || v_username, 'UTF8')),
    'hex'
  );

  insert into hanzi_private.username_accounts(username, legacy_user_id)
  values (v_username, account_key)
  on conflict (username) do nothing;

  select ua.legacy_user_id
    into account_key
  from hanzi_private.username_accounts ua
  where ua.username = v_username;

  return account_key;
end
$$;

create or replace function hanzi_private.resolve_account(expected_account text)
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  account_key text;
begin
  if expected_account is null then
    return null;
  end if;

  select ua.legacy_user_id
    into account_key
  from hanzi_private.username_accounts ua
  where ua.legacy_user_id = expected_account;

  if account_key is not null then
    return account_key;
  end if;

  -- Keep the old authenticated path valid as a rollback/compatibility path.
  if auth.uid() is not null then
    select a.legacy_user_id
      into account_key
    from hanzi_private.accounts a
    where a.auth_user_id = auth.uid();

    if account_key = expected_account then
      return account_key;
    end if;
  end if;

  return null;
end
$$;

create or replace function public.hanzi_claim_username(p_username text)
returns text
language sql
security definer
set search_path = ''
as $$
  select hanzi_private.username_account(p_username)
$$;

create or replace function public.hanzi_read_progress(expected_account text)
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
    raise exception 'Sign in to load your progress.' using errcode = '28000';
  end if;

  select jsonb_build_object(
    'sessions', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id,
        'lessonId', lesson_id,
        'index', position,
        'independent', independent,
        'assisted', assisted,
        'complete', complete,
        'updatedAt', updated_at
      ) order by updated_at desc)
      from (
        select distinct on (lesson_id, complete) *
        from public.hanzi_sessions
        where user_id = account_key
        order by lesson_id, complete, updated_at desc, id
      ) s
    ), '[]'::jsonb),
    'studyDays', coalesce((
      select jsonb_agg(study_day order by study_day)
      from (
        select distinct to_char(
          to_timestamp(coalesce(completed_at, updated_at) / 1000.0)
            at time zone 'Asia/Taipei',
          'YYYY-MM-DD'
        ) as study_day
        from public.hanzi_sessions
        where user_id = account_key and complete
      ) d
    ), '[]'::jsonb)
  ) into result;

  return result;
end
$$;

create or replace function hanzi_private.save_progress(checkpoint jsonb, expected_account text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_key text := hanzi_private.resolve_account(expected_account);
  checkpoint_id text;
  lesson text;
  step_count integer;
  pos integer;
  own integer;
  helped integer;
  finished boolean;
  supplied_time numeric;
  completed_time bigint;
  now_ms bigint := floor(extract(epoch from clock_timestamp()) * 1000)::bigint;
  changed integer;
  days jsonb;
begin
  if account_key is null then
    raise exception 'Sign in to save your progress.' using errcode = '28000';
  end if;

  if jsonb_typeof(checkpoint) is distinct from 'object'
    or octet_length(checkpoint::text) > 8000 then
    raise exception 'Invalid lesson checkpoint.' using errcode = '22023';
  end if;

  if jsonb_typeof(checkpoint->'id') is distinct from 'string'
    or jsonb_typeof(checkpoint->'lessonId') is distinct from 'string'
    or jsonb_typeof(checkpoint->'index') is distinct from 'number'
    or jsonb_typeof(checkpoint->'independent') is distinct from 'number'
    or jsonb_typeof(checkpoint->'assisted') is distinct from 'number'
    or jsonb_typeof(checkpoint->'updatedAt') is distinct from 'number'
    or jsonb_typeof(checkpoint->'complete') is distinct from 'boolean' then
    raise exception 'Invalid lesson checkpoint.' using errcode = '22023';
  end if;

  checkpoint_id := checkpoint->>'id';
  lesson := checkpoint->>'lessonId';

  if checkpoint_id !~ '^[a-zA-Z0-9-]{20,80}$'
    or (checkpoint->>'index')::numeric <> trunc((checkpoint->>'index')::numeric)
    or (checkpoint->>'independent')::numeric <> trunc((checkpoint->>'independent')::numeric)
    or (checkpoint->>'assisted')::numeric <> trunc((checkpoint->>'assisted')::numeric) then
    raise exception 'Invalid lesson checkpoint.' using errcode = '22023';
  end if;

  pos := (checkpoint->>'index')::integer;
  own := (checkpoint->>'independent')::integer;
  helped := (checkpoint->>'assisted')::integer;
  finished := (checkpoint->>'complete')::boolean;
  supplied_time := (checkpoint->>'updatedAt')::numeric;

  select steps into step_count
  from hanzi_private.lesson_lengths
  where lesson_id = lesson;

  if step_count is null
    or pos < 0 or pos > step_count
    or own < 0 or helped < 0
    or own::bigint + helped::bigint > pos
    or finished is distinct from (pos = step_count) then
    raise exception 'Invalid lesson checkpoint.' using errcode = '22023';
  end if;

  completed_time := case
    when finished then case
      when supplied_time > 0 then floor(least(supplied_time, now_ms))::bigint
      else now_ms
    end
    else null
  end;

  insert into public.hanzi_sessions as existing(
    id, user_id, lesson_id, position, independent, assisted, complete, updated_at, completed_at
  )
  values(
    checkpoint_id, account_key, lesson, pos, own, helped, finished, now_ms, completed_time
  )
  on conflict(id) do update
    set position = excluded.position,
        independent = excluded.independent,
        assisted = excluded.assisted,
        complete = excluded.complete,
        updated_at = excluded.updated_at,
        completed_at = case
          when existing.complete then coalesce(existing.completed_at, existing.updated_at)
          when excluded.complete then excluded.completed_at
          else null
        end
  where existing.user_id = excluded.user_id
    and existing.lesson_id = excluded.lesson_id
    and excluded.position >= existing.position;

  get diagnostics changed = row_count;

  if changed = 0 and not exists(
    select 1
    from public.hanzi_sessions
    where id = checkpoint_id
      and user_id = account_key
      and lesson_id = lesson
      and position >= pos
  ) then
    raise exception 'This checkpoint could not be confirmed.' using errcode = '23505';
  end if;

  if finished then
    select coalesce(jsonb_agg(study_day order by study_day), '[]'::jsonb)
      into days
    from (
      select distinct to_char(
        to_timestamp(coalesce(completed_at, updated_at) / 1000.0)
          at time zone 'Asia/Taipei',
        'YYYY-MM-DD'
      ) as study_day
      from public.hanzi_sessions
      where user_id = account_key and complete
    ) d;

    return jsonb_build_object('saved', true, 'studyDays', days);
  end if;

  return jsonb_build_object('saved', true);
end
$$;

create or replace function public.hanzi_save_progress(checkpoint jsonb, expected_account text)
returns jsonb
language sql
security definer
set search_path = ''
as $$
  select hanzi_private.save_progress(checkpoint, expected_account)
$$;

revoke all on function public.hanzi_claim_username(text) from public, anon, authenticated;
grant execute on function public.hanzi_claim_username(text) to anon, authenticated, service_role;

revoke all on function public.hanzi_read_progress(text) from public, anon, authenticated;
grant execute on function public.hanzi_read_progress(text) to anon, authenticated, service_role;

revoke all on function public.hanzi_save_progress(jsonb, text) from public, anon, authenticated;
grant execute on function public.hanzi_save_progress(jsonb, text) to anon, authenticated, service_role;

commit;
