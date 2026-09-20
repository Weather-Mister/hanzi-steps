-- Schema snapshot of the deployed Hanzi Steps backend, 2026-09-19.
-- For a NEW, empty project only. Contains no learner records or private keys.
BEGIN;
CREATE SCHEMA hanzi_private;
REVOKE ALL ON SCHEMA hanzi_private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA hanzi_private TO authenticated;
CREATE TABLE hanzi_private.accounts (auth_user_id uuid NOT NULL, legacy_user_id text NOT NULL);
ALTER TABLE hanzi_private.accounts ADD CONSTRAINT accounts_legacy_user_id_check CHECK ((legacy_user_id ~ '^account-v1-[a-f0-9]{64}$'::text));
ALTER TABLE hanzi_private.accounts ADD CONSTRAINT accounts_pkey PRIMARY KEY (auth_user_id);
ALTER TABLE hanzi_private.accounts ADD CONSTRAINT accounts_legacy_user_id_key UNIQUE (legacy_user_id);
ALTER TABLE hanzi_private.accounts ADD CONSTRAINT accounts_auth_user_id_fkey FOREIGN KEY (auth_user_id) REFERENCES auth.users(id);
ALTER TABLE hanzi_private.accounts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON hanzi_private.accounts FROM PUBLIC, anon, authenticated;
CREATE TABLE hanzi_private.lesson_lengths (lesson_id text NOT NULL, steps integer NOT NULL);
ALTER TABLE hanzi_private.lesson_lengths ADD CONSTRAINT lesson_lengths_steps_check CHECK ((steps > 0));
ALTER TABLE hanzi_private.lesson_lengths ADD CONSTRAINT lesson_lengths_pkey PRIMARY KEY (lesson_id);
ALTER TABLE hanzi_private.lesson_lengths ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON hanzi_private.lesson_lengths FROM PUBLIC, anon, authenticated;
CREATE TABLE public.hanzi_sessions (id text NOT NULL, user_id text NOT NULL, lesson_id text NOT NULL, position integer NOT NULL, independent integer NOT NULL, assisted integer NOT NULL, complete boolean NOT NULL, updated_at bigint NOT NULL, completed_at bigint);
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_id_check CHECK ((id ~ '^[a-zA-Z0-9-]{20,80}$'::text));
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_user_id_check CHECK ((user_id ~ '^account-v1-[a-f0-9]{64}$'::text));
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_position_check CHECK (("position" >= 0));
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_independent_check CHECK ((independent >= 0));
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_assisted_check CHECK ((assisted >= 0));
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_check CHECK (((independent + assisted) <= "position"));
ALTER TABLE public.hanzi_sessions ADD CONSTRAINT hanzi_sessions_pkey PRIMARY KEY (id);
ALTER TABLE public.hanzi_sessions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.hanzi_sessions FROM PUBLIC, anon, authenticated;
CREATE INDEX hanzi_sessions_user_lesson ON public.hanzi_sessions USING btree (user_id, lesson_id, complete, updated_at DESC);
CREATE INDEX hanzi_sessions_user_completed ON public.hanzi_sessions USING btree (user_id, completed_at) WHERE complete;
CREATE OR REPLACE FUNCTION hanzi_private.current_account()
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select legacy_user_id from hanzi_private.accounts
  where auth.uid() is not null and auth_user_id = auth.uid()
$function$
;
CREATE OR REPLACE FUNCTION hanzi_private.claim_account()
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare caller uuid := auth.uid(); account_key text; verified_email text;
begin
  if caller is null then raise exception 'Sign in to connect your progress.' using errcode='28000'; end if;
  select legacy_user_id into account_key from hanzi_private.accounts where auth_user_id=caller;
  if account_key is not null then return account_key; end if;
  select lower(btrim(i.identity_data->>'email')) into verified_email
  from auth.identities i join auth.users u on u.id=i.user_id
  where i.user_id=caller and i.provider='google'
    and i.identity_data->>'email_verified'='true' and u.email_confirmed_at is not null
    and lower(btrim(u.email))=lower(btrim(i.identity_data->>'email'))
  order by i.created_at limit 1;
  if verified_email is null or verified_email='' then
    raise exception 'Sign in with your verified Google account to connect your progress.' using errcode='28000';
  end if;
  account_key := 'account-v1-' || encode(sha256(convert_to('hanzi-steps/progress/v1:' || verified_email,'UTF8')),'hex');
  insert into hanzi_private.accounts(auth_user_id,legacy_user_id) values(caller,account_key)
    on conflict(auth_user_id) do nothing;
  select legacy_user_id into account_key from hanzi_private.accounts where auth_user_id=caller;
  return account_key;
end $function$
;
CREATE OR REPLACE FUNCTION public.hanzi_claim_account()
 RETURNS text
 LANGUAGE sql
 SET search_path TO ''
AS $function$ select hanzi_private.claim_account() $function$
;
CREATE OR REPLACE FUNCTION public.hanzi_read_progress(expected_account text)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SET search_path TO ''
AS $function$
declare account_key text := hanzi_private.current_account(); result jsonb;
begin
  if auth.uid() is null or account_key is null or expected_account is distinct from account_key then
    raise exception 'Sign in to load your progress.' using errcode='28000';
  end if;
  select jsonb_build_object(
    'sessions',coalesce((select jsonb_agg(jsonb_build_object(
      'id',id,'lessonId',lesson_id,'index',position,'independent',independent,
      'assisted',assisted,'complete',complete,'updatedAt',updated_at) order by updated_at desc)
      from (select distinct on (lesson_id,complete) * from public.hanzi_sessions
        where user_id=account_key order by lesson_id,complete,updated_at desc,id) s),'[]'::jsonb),
    'studyDays',coalesce((select jsonb_agg(study_day order by study_day) from (
      select distinct to_char(to_timestamp(coalesce(completed_at,updated_at)/1000.0) at time zone 'Asia/Taipei','YYYY-MM-DD') as study_day
      from public.hanzi_sessions where user_id=account_key and complete) d),'[]'::jsonb)
  ) into result;
  return result;
end $function$
;
CREATE OR REPLACE FUNCTION hanzi_private.save_progress(checkpoint jsonb, expected_account text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  account_key text := hanzi_private.current_account();
  checkpoint_id text; lesson text; step_count integer; pos integer; own integer; helped integer;
  finished boolean; supplied_time numeric; completed_time bigint;
  now_ms bigint := floor(extract(epoch from clock_timestamp())*1000)::bigint;
  changed integer; days jsonb;
begin
  if auth.uid() is null or account_key is null or expected_account is distinct from account_key then
    raise exception 'Sign in to save your progress.' using errcode='28000';
  end if;
  if jsonb_typeof(checkpoint) is distinct from 'object' or octet_length(checkpoint::text)>8000 then
    raise exception 'Invalid lesson checkpoint.' using errcode='22023';
  end if;
  if jsonb_typeof(checkpoint->'id') is distinct from 'string'
    or jsonb_typeof(checkpoint->'lessonId') is distinct from 'string'
    or jsonb_typeof(checkpoint->'index') is distinct from 'number'
    or jsonb_typeof(checkpoint->'independent') is distinct from 'number'
    or jsonb_typeof(checkpoint->'assisted') is distinct from 'number'
    or jsonb_typeof(checkpoint->'updatedAt') is distinct from 'number'
    or jsonb_typeof(checkpoint->'complete') is distinct from 'boolean' then
    raise exception 'Invalid lesson checkpoint.' using errcode='22023';
  end if;
  checkpoint_id := checkpoint->>'id'; lesson := checkpoint->>'lessonId';
  if checkpoint_id !~ '^[a-zA-Z0-9-]{20,80}$'
    or (checkpoint->>'index')::numeric <> trunc((checkpoint->>'index')::numeric)
    or (checkpoint->>'independent')::numeric <> trunc((checkpoint->>'independent')::numeric)
    or (checkpoint->>'assisted')::numeric <> trunc((checkpoint->>'assisted')::numeric) then
    raise exception 'Invalid lesson checkpoint.' using errcode='22023';
  end if;
  pos := (checkpoint->>'index')::integer; own := (checkpoint->>'independent')::integer;
  helped := (checkpoint->>'assisted')::integer; finished := (checkpoint->>'complete')::boolean;
  supplied_time := (checkpoint->>'updatedAt')::numeric;
  select steps into step_count from hanzi_private.lesson_lengths where lesson_id=lesson;
  if step_count is null or pos<0 or pos>step_count or own<0 or helped<0
    or own::bigint+helped::bigint>pos or finished is distinct from (pos=step_count) then
    raise exception 'Invalid lesson checkpoint.' using errcode='22023';
  end if;
  completed_time := case when finished then case when supplied_time>0 then floor(least(supplied_time,now_ms))::bigint else now_ms end else null end;
  insert into public.hanzi_sessions as existing(id,user_id,lesson_id,position,independent,assisted,complete,updated_at,completed_at)
  values(checkpoint_id,account_key,lesson,pos,own,helped,finished,now_ms,completed_time)
  on conflict(id) do update set position=excluded.position, independent=excluded.independent,
    assisted=excluded.assisted, complete=excluded.complete, updated_at=excluded.updated_at,
    completed_at=case when existing.complete then coalesce(existing.completed_at,existing.updated_at)
      when excluded.complete then excluded.completed_at else null end
  where existing.user_id=excluded.user_id and existing.lesson_id=excluded.lesson_id and excluded.position>=existing.position;
  get diagnostics changed = row_count;
  if changed=0 and not exists(select 1 from public.hanzi_sessions
    where id=checkpoint_id and user_id=account_key and lesson_id=lesson and position>=pos) then
    raise exception 'This checkpoint could not be confirmed.' using errcode='23505';
  end if;
  if finished then
    select coalesce(jsonb_agg(study_day order by study_day),'[]'::jsonb) into days from (
      select distinct to_char(to_timestamp(coalesce(completed_at,updated_at)/1000.0) at time zone 'Asia/Taipei','YYYY-MM-DD') as study_day
      from public.hanzi_sessions where user_id=account_key and complete) d;
    return jsonb_build_object('saved',true,'studyDays',days);
  end if;
  return jsonb_build_object('saved',true);
end $function$
;
CREATE OR REPLACE FUNCTION public.hanzi_save_progress(checkpoint jsonb, expected_account text)
 RETURNS jsonb
 LANGUAGE sql
 SET search_path TO ''
AS $function$ select hanzi_private.save_progress(checkpoint,expected_account) $function$
;
CREATE OR REPLACE FUNCTION public.hanzi_widget_days(account_key text)
 RETURNS jsonb
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  select coalesce(jsonb_agg(study_day order by study_day),'[]'::jsonb) from (
    select distinct to_char(to_timestamp(coalesce(completed_at,updated_at)/1000.0) at time zone 'Asia/Taipei','YYYY-MM-DD') as study_day
    from public.hanzi_sessions where user_id=account_key and complete) d
$function$
;
GRANT SELECT ON public.hanzi_sessions TO authenticated;
GRANT ALL ON public.hanzi_sessions TO service_role;
CREATE POLICY hanzi_read_own ON public.hanzi_sessions FOR SELECT TO authenticated USING (user_id=(SELECT hanzi_private.current_account()));
CREATE POLICY no_client_access ON hanzi_private.accounts TO authenticated USING(false) WITH CHECK(false);
CREATE POLICY no_client_access ON hanzi_private.lesson_lengths TO authenticated USING(false) WITH CHECK(false);
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA hanzi_private FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION hanzi_private.current_account(),hanzi_private.claim_account(),hanzi_private.save_progress(jsonb,text) TO authenticated;
REVOKE ALL ON FUNCTION public.hanzi_claim_account() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hanzi_claim_account() TO authenticated,service_role;
REVOKE ALL ON FUNCTION public.hanzi_read_progress(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hanzi_read_progress(text) TO authenticated,service_role;
REVOKE ALL ON FUNCTION public.hanzi_save_progress(jsonb,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hanzi_save_progress(jsonb,text) TO authenticated,service_role;
REVOKE ALL ON FUNCTION public.hanzi_widget_days(text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.hanzi_widget_days(text) TO service_role;
INSERT INTO hanzi_private.lesson_lengths(lesson_id,steps) VALUES
('u7-numbers',19),
('u7-describe',19),
('u7-hobbies',23),
('u7-activities',32),
('u7-often',19),
('u7-plans',20),
('u7-review',20),
('u8-time',28),
('u8-opinions',20),
('u8-together',20),
('u8-dinner',25),
('u8-possible',17),
('u8-agree',15),
('u8-review',21),
('hello',17),
('identity',14),
('student',16),
('question',10),
('review',11),
('u2-people',14),
('u2-together',15),
('u2-not',10),
('u2-mine',10),
('u2-count',21),
('u2-have',17),
('u2-review',13),
('u3-point',15),
('u3-what',21),
('u3-books',16),
('u3-size',21),
('u3-here',16),
('u3-all',10),
('u3-review',14),
('u4-go',21),
('u4-read',16),
('u4-language',21),
('u4-speak',16),
('u4-want',19),
('u4-can',12),
('u4-review',14),
('u5-drinks',16),
('u5-please',11),
('u5-likes',16),
('u5-coffee',18),
('u5-follow-up',11),
('u5-thanks',11),
('u5-review',14),
('u6-family',23),
('u6-siblings',21),
('u6-who',11),
('u6-photos',22),
('u6-whose',8),
('u6-close-family',7),
('u6-review',11),
('u7-v2-numbers',22),
('u7-v2-describe',21),
('u7-v2-hobbies',19),
('u7-v2-activities',18),
('u7-v2-often',15),
('u7-v2-plans',13),
('u7-v2-review',14),
('u8-v2-time',19),
('u8-v2-opinions',21),
('u8-v2-together',12),
('u8-v2-invite',20),
('u8-v2-possible',15),
('u8-v2-agree',9),
('u8-v2-review',15),
('u9-music',17),
('u9-exercise',19),
('u9-basketball',20),
('u9-soccer',19),
('u9-choices',18),
('u9-preferences',13),
('u9-review',16),
('u10-another-group',15),
('u10-shared-habits',16),
('u10-not-have-either',14),
('u10-none',16),
('u10-not-all',16),
('u10-common-ground',13),
('u10-challenge',15),
('u11-cups',14),
('u11-hot',14),
('u11-size',18),
('u11-takeout',18),
('u11-here',19),
('u11-order',13),
('u11-challenge',16),
('u12-two-four',20),
('u12-five-seven',19),
('u12-eight-tens',26),
('u12-prices',19),
('u12-how-much',18),
('u12-total',17),
('u12-challenge',20),
('u13-ask',17),
('u13-buns',18),
('u13-help',24),
('u13-hundreds',20),
('u13-thousands',20),
('u13-sell',16),
('u13-challenge',11),
('u14-phones',22),
('u14-new-old',18),
('u14-prices',24),
('u14-which-kind',17),
('u14-too-why',25),
('u14-can',16),
('u14-challenge',12),
('u15-noodles',23),
('u15-soup',19),
('u15-shops',19),
('u15-favorite',14),
('u15-order',21),
('u15-about-prices',11),
('u15-challenge',12),
('u16-restaurant',26),
('u16-spicy',20),
('u16-cook',24),
('u16-desserts',19),
('u16-how-well',16),
('u16-teach',15),
('u16-challenge',15),
('u17-dumplings',13),
('u17-tofu',22),
('u17-quantity',14),
('u17-know',19),
('u17-react',10),
('u17-recommend',14),
('u17-review',15),
('u18-school',19),
('u18-landscape',19),
('u18-scenery',24),
('u18-inside-outside',25),
('u18-library',22),
('u18-study',18),
('u18-review',19),
('u19-visit',24),
('u19-meet',17),
('u19-distance',22),
('u19-nearby',16),
('u19-shopping',24),
('u19-meal',12),
('u19-review',14),
('u20-dorm',26),
('u20-up-down',18),
('u20-buildings',16),
('u20-front-back',23),
('u20-classroom',30),
('u20-welcome',23),
('u20-review',17),
('b2-ask',20),
('b2-destination',16),
('b2-from-toward',16),
('b2-straight',16),
('b2-turn',21),
('b2-intersection',16),
('b2-review',13),
('b2u2-bank',18),
('b2u2-store',18),
('b2u2-nearby',18),
('b2u2-near-far',14),
('b2u2-distance',14),
('b2u2-distance-question',12),
('b2u2-review',14),
('b2u3-next',13),
('b2u3-ordinal',19),
('b2u3-lights',24),
('b2u3-pass',14),
('b2u3-then',15),
('b2u3-route',12),
('b2u3-review',15),
('practice-你',7),
('practice-好',7),
('practice-我',5),
('practice-是',7),
('practice-學',7),
('practice-生',5),
('practice-嗎',7),
('practice-喝',6),
('practice-茶',6),
('practice-請',6),
('practice-喜',6),
('practice-歡',6),
('practice-咖',6),
('practice-啡',6),
('practice-呢',6),
('practice-謝',6),
('practice-他',6),
('practice-她',6),
('practice-們',6),
('practice-也',5),
('practice-不',5),
('practice-的',6),
('practice-一',5),
('practice-個',6),
('practice-人',5),
('practice-有',6),
('practice-沒',6),
('practice-這',6),
('practice-那',6),
('practice-什',6),
('practice-麼',6),
('practice-書',6),
('practice-本',5),
('practice-兩',5),
('practice-很',6),
('practice-大',5),
('practice-小',5),
('practice-在',6),
('practice-裡',6),
('practice-都',6),
('practice-去',6),
('practice-來',5),
('practice-哪',6),
('practice-看',6),
('practice-和',6),
('practice-中',5),
('practice-文',5),
('practice-英',6),
('practice-說',6),
('practice-聽',6),
('practice-想',6),
('practice-要',6),
('practice-會',6),
('practice-家',6),
('practice-爸',6),
('practice-媽',6),
('practice-哥',6),
('practice-姐',6),
('practice-妹',6),
('practice-誰',6),
('practice-照',6),
('practice-片',5),
('practice-張',6),
('practice-幾',6),
('practice-房',6),
('practice-相',6),
('practice-末',5),
('practice-打',6),
('practice-足',6),
('practice-泳',6),
('practice-常',6),
('practice-吧',6),
('practice-今',6),
('practice-明',6),
('practice-玩',6),
('practice-起',6),
('practice-可',5),
('practice-老',6),
('practice-師',6),
('practice-電',6),
('practice-影',6),
('practice-週',6),
('practice-做',6),
('practice-游',6),
('practice-天',5),
('practice-覺',6),
('practice-得',6),
('practice-怎',6),
('practice-樣',6),
('practice-啊',6),
('practice-以',5),
('practice-問',6),
('practice-走',6),
('practice-到',6),
('practice-從',6),
('practice-往',6),
('practice-前',6),
('practice-直',6),
('practice-左',6),
('practice-右',6),
('practice-轉',6),
('practice-路',6),
('practice-口',5),
('practice-銀',6),
('practice-行',6),
('practice-超',6),
('practice-商',6),
('practice-附',6),
('practice-近',6),
('practice-遠',6),
('practice-離',6),
('practice-兄',6),
('practice-弟',6),
('practice-漂',6),
('practice-亮',6),
('practice-子',5),
('practice-籃',6),
('practice-球',6),
('practice-踢',6),
('practice-還',6),
('practice-音',6),
('practice-樂',6),
('practice-運',5),
('practice-動',6),
('practice-網',6),
('practice-早',6),
('practice-上',5),
('practice-晚',6),
('practice-吃',6),
('practice-飯',6),
('practice-菜',6),
('practice-越',6),
('practice-南',6),
('practice-杯',6),
('practice-熱',6),
('practice-買',6),
('practice-外',6),
('practice-帶',6),
('practice-內',5),
('practice-用',5),
('practice-二',6),
('practice-三',6),
('practice-四',5),
('practice-五',5),
('practice-六',6),
('practice-七',5),
('practice-八',5),
('practice-九',5),
('practice-十',5),
('practice-錢',6),
('practice-塊',6),
('practice-多',6),
('practice-少',5),
('practice-共',6),
('practice-闆',5),
('practice-包',5),
('practice-幫',6),
('practice-微',6),
('practice-波',6),
('practice-百',6),
('practice-零',6),
('practice-千',5),
('practice-萬',6),
('practice-賣',6),
('practice-手',5),
('practice-機',6),
('practice-支',6),
('practice-新',6),
('practice-舊',6),
('practice-貴',6),
('practice-便',6),
('practice-宜',6),
('practice-種',6),
('practice-太',5),
('practice-了',5),
('practice-為',5),
('practice-能',6),
('practice-牛',5),
('practice-肉',5),
('practice-麵',6),
('practice-湯',6),
('practice-真',6),
('practice-名',6),
('practice-店',5),
('practice-最',6),
('practice-點',6),
('practice-碗',6),
('practice-昨',6),
('practice-餐',6),
('practice-廳',5),
('practice-辣',6),
('practice-怕',6),
('practice-所',6),
('practice-自',5),
('practice-己',5),
('practice-甜',6),
('practice-錯',6),
('practice-教',6),
('practice-籠',6),
('practice-臭',6),
('practice-豆',6),
('practice-腐',6),
('practice-知',6),
('practice-道',6),
('practice-定',6),
('practice-校',6),
('practice-現',6),
('practice-山',5),
('practice-海',6),
('practice-風',5),
('practice-景',6),
('practice-美',6),
('practice-地',6),
('practice-方',5),
('practice-面',5),
('practice-圖',5),
('practice-館',6),
('practice-課',6),
('practice-朋',6),
('practice-友',6),
('practice-找',6),
('practice-東',5),
('practice-西',5),
('practice-宿',6),
('practice-舍',6),
('practice-樓',6),
('practice-下',6),
('practice-棟',6),
('practice-後',6),
('practice-旁',6),
('practice-邊',6),
('practice-室',6),
('practice-池',6),
('practice-迎',6),
('practice-第',6),
('practice-紅',6),
('practice-綠',6),
('practice-燈',6),
('practice-過',6),
('practice-再',6);
COMMIT;



-- Username-only account migration (2026-09-20).
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
