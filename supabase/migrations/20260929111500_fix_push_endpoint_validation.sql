begin;

alter table public.hanzi_push_subscriptions
  drop constraint if exists hanzi_push_endpoint_check;

alter table public.hanzi_push_subscriptions
  add constraint hanzi_push_endpoint_check
  check (
    endpoint like 'https://%'
    and char_length(endpoint) between 20 and 2048
  );

create or replace function public.hanzi_push_upsert(
  expected_account text,
  push_subscription jsonb,
  push_preferences jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_key text := hanzi_private.resolve_account(expected_account);
  v_endpoint text;
  v_p256dh text;
  v_auth text;
  v_streak boolean;
  v_encouragement boolean;
  v_sentence boolean;
begin
  if account_key is null then
    raise exception 'Sign in to manage notifications.' using errcode = '28000';
  end if;

  if jsonb_typeof(push_subscription) is distinct from 'object'
    or jsonb_typeof(push_preferences) is distinct from 'object'
    or octet_length(push_subscription::text) > 6000
    or octet_length(push_preferences::text) > 1000 then
    raise exception 'Invalid notification settings.' using errcode = '22023';
  end if;

  v_endpoint := push_subscription->>'endpoint';
  v_p256dh := push_subscription#>>'{keys,p256dh}';
  v_auth := push_subscription#>>'{keys,auth}';

  if v_endpoint is null
    or left(v_endpoint, 8) <> 'https://'
    or char_length(v_endpoint) not between 20 and 2048
    or v_p256dh is null or v_p256dh !~ '^[A-Za-z0-9_-]{40,200}$'
    or v_auth is null or v_auth !~ '^[A-Za-z0-9_-]{10,100}$' then
    raise exception 'Invalid push subscription.' using errcode = '22023';
  end if;

  if jsonb_typeof(push_preferences->'streakReminders') is distinct from 'boolean'
    or jsonb_typeof(push_preferences->'encouragement') is distinct from 'boolean'
    or jsonb_typeof(push_preferences->'sentenceChecks') is distinct from 'boolean' then
    raise exception 'Invalid notification preferences.' using errcode = '22023';
  end if;

  v_streak := (push_preferences->>'streakReminders')::boolean;
  v_encouragement := (push_preferences->>'encouragement')::boolean;
  v_sentence := (push_preferences->>'sentenceChecks')::boolean;

  insert into public.hanzi_push_subscriptions as existing(
    endpoint, user_id, p256dh, auth, enabled,
    streak_reminders, encouragement, sentence_checks, updated_at, failure_count
  )
  values(
    v_endpoint, account_key, v_p256dh, v_auth, true,
    v_streak, v_encouragement, v_sentence, now(), 0
  )
  on conflict(endpoint) do update
    set user_id = excluded.user_id,
        p256dh = excluded.p256dh,
        auth = excluded.auth,
        enabled = true,
        streak_reminders = excluded.streak_reminders,
        encouragement = excluded.encouragement,
        sentence_checks = excluded.sentence_checks,
        updated_at = now(),
        failure_count = 0;

  return jsonb_build_object(
    'enabled', true,
    'streakReminders', v_streak,
    'encouragement', v_encouragement,
    'sentenceChecks', v_sentence
  );
end
$$;

revoke all on function public.hanzi_push_upsert(text,jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.hanzi_push_upsert(text,jsonb,jsonb) to anon, authenticated, service_role;

commit;
