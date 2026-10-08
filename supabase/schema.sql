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


-- Mega Challenge mastered vocabulary persistence (2026-09-20).
begin;

create table if not exists hanzi_private.mastered_vocab (
  user_id text not null,
  vocab_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, vocab_id),
  constraint mastered_vocab_user_id_check check (user_id ~ '^account-v1-[a-f0-9]{64}$'),
  constraint mastered_vocab_vocab_id_check check (length(vocab_id) between 1 and 1024)
);

alter table hanzi_private.mastered_vocab enable row level security;
revoke all on hanzi_private.mastered_vocab from public, anon, authenticated;

create or replace function public.hanzi_read_mastered(expected_account text)
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
    raise exception 'Sign in to load mastered words.' using errcode = '28000';
  end if;

  select coalesce(jsonb_agg(vocab_id order by created_at, vocab_id), '[]'::jsonb)
    into result
  from hanzi_private.mastered_vocab
  where user_id = account_key;

  return result;
end
$$;

create or replace function public.hanzi_set_mastered(
  expected_account text,
  p_vocab_id text,
  p_mastered boolean
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  account_key text := hanzi_private.resolve_account(expected_account);
begin
  if account_key is null then
    raise exception 'Sign in to save mastered words.' using errcode = '28000';
  end if;

  if p_vocab_id is null or length(p_vocab_id) not between 1 and 1024 or p_mastered is null then
    raise exception 'Invalid mastered word.' using errcode = '22023';
  end if;

  if p_mastered then
    insert into hanzi_private.mastered_vocab(user_id,vocab_id)
    values(account_key,p_vocab_id)
    on conflict(user_id,vocab_id) do nothing;
  else
    delete from hanzi_private.mastered_vocab
    where user_id=account_key and vocab_id=p_vocab_id;
  end if;

  return jsonb_build_object('saved',true);
end
$$;

revoke all on function public.hanzi_read_mastered(text) from public, anon, authenticated;
grant execute on function public.hanzi_read_mastered(text) to anon, authenticated, service_role;

revoke all on function public.hanzi_set_mastered(text,text,boolean) from public, anon, authenticated;
grant execute on function public.hanzi_set_mastered(text,text,boolean) to anon, authenticated, service_role;

commit;



-- Shared adaptive practice mastery persistence (2026-09-22).
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



-- Retry-safe adaptive practice attempts (2026-09-22).
begin;

create table if not exists hanzi_private.practice_attempt_events (
  user_id text not null,
  attempt_id text not null,
  item_id text not null,
  mode text not null,
  correct boolean not null,
  assisted boolean not null,
  session_kind text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, attempt_id),
  constraint practice_attempt_events_user_id_check check (user_id ~ '^account-v1-[a-f0-9]{64}$'),
  constraint practice_attempt_events_attempt_id_check check (attempt_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'),
  constraint practice_attempt_events_item_id_check check (length(item_id) between 1 and 1024),
  constraint practice_attempt_events_mode_check check (mode in ('recognition','recall','pinyin','input','sentence','handwriting','context')),
  constraint practice_attempt_events_session_check check (session_kind in ('lesson','daily','revenge','mega','taiwan'))
);

alter table hanzi_private.practice_attempt_events enable row level security;
revoke all on hanzi_private.practice_attempt_events from public, anon, authenticated;

drop function if exists public.hanzi_record_practice_attempt(text,text,text,boolean,boolean,text);

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

revoke all on function public.hanzi_record_practice_attempt(text,text,text,text,boolean,boolean,text) from public, anon, authenticated;
grant execute on function public.hanzi_record_practice_attempt(text,text,text,text,boolean,boolean,text) to anon, authenticated, service_role;

commit;



-- Assisted practice is tracked separately from actual misses (2026-09-22).
begin;

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

revoke all on function public.hanzi_record_practice_attempt(text,text,text,text,boolean,boolean,text) from public, anon, authenticated;
grant execute on function public.hanzi_record_practice_attempt(text,text,text,text,boolean,boolean,text) to anon, authenticated, service_role;

commit;



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

-- Controlled production lesson bounds and historical offline-save compatibility.
-- Append-only lesson extensions must accept queued completions at reviewed old bounds.
-- Curriculum metadata only; no learner records are rewritten. Existing accounts/RPC permissions remain intact.
begin;

alter table hanzi_private.lesson_lengths
  add column if not exists historical_steps integer[] not null default '{}';

insert into hanzi_private.lesson_lengths as existing (lesson_id, steps, historical_steps) values
  ('b2u1-l4-lesson', 10, ARRAY[8]::integer[]),
  ('b2u1-l6-lesson', 8, ARRAY[6]::integer[]),
  ('b2u1-l7-lesson', 28, ARRAY[27]::integer[]),
  ('b2u2-l4-lesson', 19, ARRAY[17]::integer[]),
  ('b2u2-l6-lesson', 17, ARRAY[15]::integer[]),
  ('b2u2-l7-lesson', 40, ARRAY[39]::integer[]),
  ('b2u3-l3-lesson', 15, ARRAY[13]::integer[]),
  ('b2u3-l6-lesson', 8, ARRAY[6]::integer[]),
  ('b2u3-l7-lesson', 28, ARRAY[27]::integer[]),
  ('b2u4-l2-lesson', 10, ARRAY[8]::integer[]),
  ('b2u4-l3-lesson', 15, ARRAY[13]::integer[]),
  ('b2u4-l6-lesson', 10, ARRAY[8]::integer[]),
  ('b2u4-l7-lesson', 42, ARRAY[40]::integer[]),
  ('u21-soften', 13, ARRAY[10]::integer[]),
  ('u21-karaoke', 22, ARRAY[22]::integer[]),
  ('u21-clock', 12, ARRAY[11]::integer[]),
  ('u21-time-place', 23, ARRAY[23]::integer[]),
  ('u21-from-to', 20, ARRAY[19]::integer[]),
  ('u21-conversation', 28, ARRAY[27]::integer[]),
  ('u21-review', 21, ARRAY[18,20]::integer[]),
  ('u22-afternoon', 13, ARRAY[13]::integer[]),
  ('u22-half', 22, ARRAY[22]::integer[]),
  ('u22-start-end', 30, ARRAY[30]::integer[]),
  ('u22-progressive', 16, ARRAY[15]::integer[]),
  ('u22-routine', 26, ARRAY[24]::integer[]),
  ('u22-calligraphy', 15, ARRAY[14]::integer[]),
  ('u22-review', 21, ARRAY[18,20]::integer[]),
  ('u23-method', 9, ARRAY[6]::integer[]),
  ('u23-do', 18, ARRAY[17]::integer[]),
  ('u23-play', 26, ARRAY[21]::integer[]),
  ('u23-contrast', 7, ARRAY[6]::integer[]),
  ('u23-order', 9, ARRAY[6]::integer[]),
  ('u23-transfer', 15, ARRAY[10,14]::integer[]),
  ('u23-review', 20, ARRAY[10,19]::integer[]),
  ('u24-frame', 21, ARRAY[21]::integer[]),
  ('u24-price', 11, ARRAY[10]::integer[]),
  ('u24-distance', 7, ARRAY[7]::integer[]),
  ('u24-degree', 27, ARRAY[22]::integer[]),
  ('u24-negation', 23, ARRAY[22]::integer[]),
  ('u24-questions', 27, ARRAY[21,26]::integer[]),
  ('u24-review', 20, ARRAY[10,19]::integer[]),
  ('u25-transport', 23, ARRAY[20]::integer[]),
  ('u25-rides', 31, ARRAY[26]::integer[]),
  ('u25-visit', 21, ARRAY[20]::integer[]),
  ('u25-compare', 8, ARRAY[5]::integer[]),
  ('u25-negative', 8, ARRAY[6]::integer[]),
  ('u25-choices', 8, ARRAY[5,7]::integer[]),
  ('u25-review', 20, ARRAY[9,19]::integer[]),
  ('u12-challenge', 22, ARRAY[20,21]::integer[]),
  ('u18-review', 21, ARRAY[19,20]::integer[]),
  ('u30-review', 24, ARRAY[22,23]::integer[]),
  ('u36-review', 29, ARRAY[27,28]::integer[]),
  ('u42-review', 27, ARRAY[25,26]::integer[]),
  ('u48-review', 59, ARRAY[58]::integer[]),
  ('u28-film', 16, ARRAY[5,16]::integer[]),
  ('u28-years-days', 21, ARRAY[14,21]::integer[]),
  ('u28-hours', 19, ARRAY[13,19]::integer[]),
  ('u28-object', 13, ARRAY[5,13]::integer[]),
  ('u28-negation', 12, ARRAY[5,12]::integer[]),
  ('u28-separable', 9, ARRAY[6,8]::integer[]),
  ('u28-review', 23, ARRAY[20,22]::integer[]),
  ('u29-date', 27, ARRAY[16,27]::integer[]),
  ('u29-hai', 17, ARRAY[5,17]::integer[]),
  ('u29-maokong', 16, ARRAY[9,16]::integer[]),
  ('u29-condition', 17, ARRAY[10,17]::integer[]),
  ('u29-negative', 6, ARRAY[4,6]::integer[]),
  ('u29-integrate', 9, ARRAY[6,8]::integer[]),
  ('u29-review', 23, ARRAY[20,22]::integer[]),
  ('u7-numbers', 19, ARRAY[19]::integer[]),
  ('u7-describe', 19, ARRAY[19]::integer[]),
  ('u7-hobbies', 23, ARRAY[23]::integer[]),
  ('u7-activities', 32, ARRAY[32]::integer[]),
  ('u7-often', 19, ARRAY[19]::integer[]),
  ('u7-plans', 20, ARRAY[20]::integer[]),
  ('u7-review', 20, ARRAY[20]::integer[]),
  ('u8-time', 28, ARRAY[28]::integer[]),
  ('u8-opinions', 20, ARRAY[20]::integer[]),
  ('u8-together', 20, ARRAY[20]::integer[]),
  ('u8-dinner', 25, ARRAY[25]::integer[]),
  ('u8-possible', 17, ARRAY[17]::integer[]),
  ('u8-agree', 15, ARRAY[15]::integer[]),
  ('u8-review', 21, ARRAY[21]::integer[]),
  ('hello', 17, ARRAY[]::integer[]),
  ('identity', 14, ARRAY[]::integer[]),
  ('student', 16, ARRAY[]::integer[]),
  ('question', 10, ARRAY[]::integer[]),
  ('review', 11, ARRAY[]::integer[]),
  ('u2-people', 14, ARRAY[]::integer[]),
  ('u2-together', 15, ARRAY[]::integer[]),
  ('u2-not', 10, ARRAY[]::integer[]),
  ('u2-mine', 10, ARRAY[]::integer[]),
  ('u2-count', 21, ARRAY[]::integer[]),
  ('u2-have', 17, ARRAY[]::integer[]),
  ('u2-review', 13, ARRAY[]::integer[]),
  ('u3-point', 15, ARRAY[]::integer[]),
  ('u3-what', 21, ARRAY[]::integer[]),
  ('u3-books', 16, ARRAY[]::integer[]),
  ('u3-size', 21, ARRAY[]::integer[]),
  ('u3-here', 16, ARRAY[]::integer[]),
  ('u3-all', 10, ARRAY[]::integer[]),
  ('u3-review', 14, ARRAY[]::integer[]),
  ('u4-go', 21, ARRAY[]::integer[]),
  ('u4-read', 16, ARRAY[]::integer[]),
  ('u4-language', 21, ARRAY[]::integer[]),
  ('u4-speak', 16, ARRAY[]::integer[]),
  ('u4-want', 19, ARRAY[]::integer[]),
  ('u4-can', 12, ARRAY[]::integer[]),
  ('u4-review', 14, ARRAY[]::integer[]),
  ('u5-drinks', 16, ARRAY[]::integer[]),
  ('u5-please', 11, ARRAY[]::integer[]),
  ('u5-likes', 16, ARRAY[]::integer[]),
  ('u5-coffee', 18, ARRAY[]::integer[]),
  ('u5-follow-up', 11, ARRAY[]::integer[]),
  ('u5-thanks', 11, ARRAY[]::integer[]),
  ('u5-review', 14, ARRAY[]::integer[]),
  ('u6-family', 23, ARRAY[]::integer[]),
  ('u6-siblings', 21, ARRAY[]::integer[]),
  ('u6-who', 11, ARRAY[]::integer[]),
  ('u6-photos', 22, ARRAY[]::integer[]),
  ('u6-whose', 8, ARRAY[]::integer[]),
  ('u6-close-family', 7, ARRAY[]::integer[]),
  ('u6-review', 11, ARRAY[]::integer[]),
  ('u7-v2-numbers', 22, ARRAY[]::integer[]),
  ('u7-v2-describe', 21, ARRAY[]::integer[]),
  ('u7-v2-hobbies', 19, ARRAY[]::integer[]),
  ('u7-v2-activities', 18, ARRAY[]::integer[]),
  ('u7-v2-often', 15, ARRAY[]::integer[]),
  ('u7-v2-plans', 13, ARRAY[]::integer[]),
  ('u7-v2-review', 14, ARRAY[]::integer[]),
  ('u8-v2-time', 19, ARRAY[]::integer[]),
  ('u8-v2-opinions', 21, ARRAY[]::integer[]),
  ('u8-v2-together', 12, ARRAY[]::integer[]),
  ('u8-v2-invite', 20, ARRAY[]::integer[]),
  ('u8-v2-possible', 15, ARRAY[]::integer[]),
  ('u8-v2-agree', 9, ARRAY[]::integer[]),
  ('u8-v2-review', 16, ARRAY[15]::integer[]),
  ('u9-music', 17, ARRAY[]::integer[]),
  ('u9-exercise', 19, ARRAY[]::integer[]),
  ('u9-basketball', 20, ARRAY[]::integer[]),
  ('u9-soccer', 19, ARRAY[]::integer[]),
  ('u9-choices', 18, ARRAY[]::integer[]),
  ('u9-preferences', 13, ARRAY[]::integer[]),
  ('u9-review', 17, ARRAY[16]::integer[]),
  ('u10-another-group', 15, ARRAY[]::integer[]),
  ('u10-shared-habits', 16, ARRAY[]::integer[]),
  ('u10-not-have-either', 14, ARRAY[]::integer[]),
  ('u10-none', 16, ARRAY[]::integer[]),
  ('u10-not-all', 16, ARRAY[]::integer[]),
  ('u10-common-ground', 13, ARRAY[]::integer[]),
  ('u10-challenge', 16, ARRAY[15]::integer[]),
  ('u11-cups', 14, ARRAY[]::integer[]),
  ('u11-hot', 14, ARRAY[]::integer[]),
  ('u11-size', 18, ARRAY[]::integer[]),
  ('u11-takeout', 18, ARRAY[]::integer[]),
  ('u11-here', 19, ARRAY[]::integer[]),
  ('u11-order', 13, ARRAY[]::integer[]),
  ('u11-challenge', 17, ARRAY[16]::integer[]),
  ('u12-two-four', 20, ARRAY[]::integer[]),
  ('u12-five-seven', 19, ARRAY[]::integer[]),
  ('u12-eight-tens', 26, ARRAY[]::integer[]),
  ('u12-prices', 19, ARRAY[]::integer[]),
  ('u12-how-much', 18, ARRAY[]::integer[]),
  ('u12-total', 17, ARRAY[]::integer[]),
  ('u13-ask', 17, ARRAY[]::integer[]),
  ('u13-buns', 18, ARRAY[]::integer[]),
  ('u13-help', 24, ARRAY[]::integer[]),
  ('u13-hundreds', 20, ARRAY[]::integer[]),
  ('u13-thousands', 20, ARRAY[]::integer[]),
  ('u13-sell', 16, ARRAY[]::integer[]),
  ('u13-challenge', 12, ARRAY[11]::integer[]),
  ('u14-phones', 22, ARRAY[]::integer[]),
  ('u14-new-old', 18, ARRAY[]::integer[]),
  ('u14-prices', 24, ARRAY[]::integer[]),
  ('u14-which-kind', 17, ARRAY[]::integer[]),
  ('u14-too-why', 25, ARRAY[]::integer[]),
  ('u14-can', 16, ARRAY[]::integer[]),
  ('u14-challenge', 13, ARRAY[12]::integer[]),
  ('u15-noodles', 23, ARRAY[]::integer[]),
  ('u15-soup', 19, ARRAY[]::integer[]),
  ('u15-shops', 19, ARRAY[]::integer[]),
  ('u15-favorite', 14, ARRAY[]::integer[]),
  ('u15-order', 21, ARRAY[]::integer[]),
  ('u15-about-prices', 11, ARRAY[]::integer[]),
  ('u15-challenge', 13, ARRAY[12]::integer[]),
  ('u16-restaurant', 26, ARRAY[]::integer[]),
  ('u16-spicy', 20, ARRAY[]::integer[]),
  ('u16-cook', 24, ARRAY[]::integer[]),
  ('u16-desserts', 19, ARRAY[]::integer[]),
  ('u16-how-well', 16, ARRAY[]::integer[]),
  ('u16-teach', 15, ARRAY[]::integer[]),
  ('u16-challenge', 16, ARRAY[15]::integer[]),
  ('u17-dumplings', 13, ARRAY[]::integer[]),
  ('u17-tofu', 22, ARRAY[]::integer[]),
  ('u17-quantity', 14, ARRAY[]::integer[]),
  ('u17-know', 19, ARRAY[]::integer[]),
  ('u17-react', 10, ARRAY[]::integer[]),
  ('u17-recommend', 14, ARRAY[]::integer[]),
  ('u17-review', 16, ARRAY[15]::integer[]),
  ('u18-school', 19, ARRAY[]::integer[]),
  ('u18-landscape', 19, ARRAY[]::integer[]),
  ('u18-scenery', 24, ARRAY[]::integer[]),
  ('u18-inside-outside', 25, ARRAY[]::integer[]),
  ('u18-library', 22, ARRAY[]::integer[]),
  ('u18-study', 18, ARRAY[]::integer[]),
  ('u19-visit', 24, ARRAY[]::integer[]),
  ('u19-meet', 17, ARRAY[]::integer[]),
  ('u19-distance', 22, ARRAY[]::integer[]),
  ('u19-nearby', 16, ARRAY[]::integer[]),
  ('u19-shopping', 24, ARRAY[]::integer[]),
  ('u19-meal', 12, ARRAY[]::integer[]),
  ('u19-review', 15, ARRAY[14]::integer[]),
  ('u20-dorm', 26, ARRAY[]::integer[]),
  ('u20-up-down', 18, ARRAY[]::integer[]),
  ('u20-buildings', 16, ARRAY[]::integer[]),
  ('u20-front-back', 23, ARRAY[]::integer[]),
  ('u20-classroom', 30, ARRAY[]::integer[]),
  ('u20-welcome', 23, ARRAY[]::integer[]),
  ('u20-review', 18, ARRAY[17]::integer[]),
  ('u26-tail', 21, ARRAY[]::integer[]),
  ('u26-break', 25, ARRAY[]::integer[]),
  ('u26-return', 20, ARRAY[]::integer[]),
  ('u26-plan', 15, ARRAY[]::integer[]),
  ('u26-home', 16, ARRAY[]::integer[]),
  ('u26-when', 11, ARRAY[]::integer[]),
  ('u26-review', 21, ARRAY[20]::integer[]),
  ('u27-duration', 12, ARRAY[]::integer[]),
  ('u27-when', 7, ARRAY[]::integer[]),
  ('u27-sometimes', 5, ARRAY[]::integer[]),
  ('u27-suggest', 27, ARRAY[]::integer[]),
  ('u27-places', 25, ARRAY[]::integer[]),
  ('u27-decide', 18, ARRAY[17]::integer[]),
  ('u27-review', 23, ARRAY[22]::integer[]),
  ('u30-fruit', 13, ARRAY[]::integer[]),
  ('u30-guess', 6, ARRAY[]::integer[]),
  ('u30-try', 8, ARRAY[]::integer[]),
  ('u30-taste', 6, ARRAY[]::integer[]),
  ('u30-photo', 19, ARRAY[]::integer[]),
  ('u30-clothes', 16, ARRAY[15]::integer[]),
  ('u31-hotel', 10, ARRAY[]::integer[]),
  ('u31-people', 20, ARRAY[]::integer[]),
  ('u31-photos', 12, ARRAY[]::integer[]),
  ('u31-change', 22, ARRAY[]::integer[]),
  ('u31-toward', 9, ARRAY[]::integer[]),
  ('u31-because', 11, ARRAY[10]::integer[]),
  ('u31-review', 23, ARRAY[22]::integer[]),
  ('u32-rent', 18, ARRAY[]::integer[]),
  ('u32-rooms', 18, ARRAY[]::integer[]),
  ('u32-sides', 22, ARRAY[]::integer[]),
  ('u32-nearby', 18, ARRAY[]::integer[]),
  ('u32-come', 18, ARRAY[]::integer[]),
  ('u32-quick', 6, ARRAY[5]::integer[]),
  ('u32-review', 23, ARRAY[22]::integer[]),
  ('u33-call', 14, ARRAY[]::integer[]),
  ('u33-settled', 24, ARRAY[]::integer[]),
  ('u33-heater', 13, ARRAY[]::integer[]),
  ('u33-install', 25, ARRAY[]::integer[]),
  ('u33-exists', 19, ARRAY[]::integer[]),
  ('u33-will-omit', 9, ARRAY[8]::integer[]),
  ('u33-review', 23, ARRAY[22]::integer[]),
  ('u34-plan', 19, ARRAY[]::integer[]),
  ('u34-sequence', 14, ARRAY[]::integer[]),
  ('u34-center', 14, ARRAY[]::integer[]),
  ('u34-need', 9, ARRAY[]::integer[]),
  ('u34-money', 19, ARRAY[]::integer[]),
  ('u34-grades', 13, ARRAY[]::integer[]),
  ('u34-review', 23, ARRAY[22]::integer[]),
  ('u35-tuition', 19, ARRAY[]::integer[]),
  ('u35-focus', 15, ARRAY[]::integer[]),
  ('u35-decision', 5, ARRAY[]::integer[]),
  ('u35-future', 19, ARRAY[]::integer[]),
  ('u35-workstudy', 9, ARRAY[]::integer[]),
  ('u35-cheer', 18, ARRAY[17]::integer[]),
  ('u35-review', 28, ARRAY[27]::integer[]),
  ('u36-work', 15, ARRAY[]::integer[]),
  ('u36-business', 7, ARRAY[]::integer[]),
  ('u36-after', 8, ARRAY[]::integer[]),
  ('u36-job', 12, ARRAY[]::integer[]),
  ('u36-try', 9, ARRAY[]::integer[]),
  ('u36-hard', 9, ARRAY[8]::integer[]),
  ('u37-phone', 8, ARRAY[]::integer[]),
  ('u37-birthday', 7, ARRAY[]::integer[]),
  ('u37-return', 6, ARRAY[]::integer[]),
  ('u37-forget', 11, ARRAY[]::integer[]),
  ('u37-remember', 10, ARRAY[]::integer[]),
  ('u37-of-course', 18, ARRAY[]::integer[]),
  ('u37-review', 20, ARRAY[19]::integer[]),
  ('u38-exchange', 14, ARRAY[]::integer[]),
  ('u38-enthusiastic', 10, ARRAY[]::integer[]),
  ('u38-polite', 15, ARRAY[]::integer[]),
  ('u38-celebrate', 4, ARRAY[]::integer[]),
  ('u38-as-soon', 9, ARRAY[]::integer[]),
  ('u38-meet', 16, ARRAY[]::integer[]),
  ('u38-review', 21, ARRAY[20]::integer[]),
  ('u39-gift', 14, ARRAY[]::integer[]),
  ('u39-this-year', 6, ARRAY[]::integer[]),
  ('u39-ordered', 10, ARRAY[]::integer[]),
  ('u39-food', 20, ARRAY[]::integer[]),
  ('u39-a-little', 5, ARRAY[]::integer[]),
  ('u39-negation', 9, ARRAY[8]::integer[]),
  ('u39-review', 22, ARRAY[21]::integer[]),
  ('u40-everything', 8, ARRAY[]::integer[]),
  ('u40-nothing', 6, ARRAY[]::integer[]),
  ('u40-tradition', 14, ARRAY[]::integer[]),
  ('u40-most-young', 14, ARRAY[]::integer[]),
  ('u40-more-less', 7, ARRAY[]::integer[]),
  ('u40-customs', 7, ARRAY[6]::integer[]),
  ('u40-review', 21, ARRAY[20]::integer[]),
  ('u41-cake', 9, ARRAY[]::integer[]),
  ('u41-confirm', 6, ARRAY[]::integer[]),
  ('u41-same', 6, ARRAY[]::integer[]),
  ('u41-different', 6, ARRAY[]::integer[]),
  ('u41-wishes', 17, ARRAY[]::integer[]),
  ('u41-capstone', 8, ARRAY[]::integer[]),
  ('u41-review', 23, ARRAY[22]::integer[]),
  ('u42-weather', 13, ARRAY[]::integer[]),
  ('u42-snow', 18, ARRAY[]::integer[]),
  ('u42-spring-winter', 18, ARRAY[]::integer[]),
  ('u42-summer-autumn', 17, ARRAY[]::integer[]),
  ('u42-rain', 14, ARRAY[]::integer[]),
  ('u42-seasons', 12, ARRAY[11]::integer[]),
  ('u43-finished-duration', 17, ARRAY[]::integer[]),
  ('u43-duration-now', 14, ARRAY[]::integer[]),
  ('u43-new-year', 23, ARRAY[]::integer[]),
  ('u43-stopping', 10, ARRAY[]::integer[]),
  ('u43-return-plan', 12, ARRAY[11]::integer[]),
  ('u43-next-year', 14, ARRAY[13]::integer[]),
  ('u43-review', 29, ARRAY[28]::integer[]),
  ('u44-umbrella', 12, ARRAY[]::integer[]),
  ('u44-typhoon', 16, ARRAY[]::integer[]),
  ('u44-wet', 23, ARRAY[]::integer[]),
  ('u44-news', 16, ARRAY[]::integer[]),
  ('u44-even-more', 16, ARRAY[]::integer[]),
  ('u44-not-as', 15, ARRAY[]::integer[]),
  ('u44-review', 42, ARRAY[41]::integer[]),
  ('u45-doctor', 12, ARRAY[]::integer[]),
  ('u45-runny-nose', 25, ARRAY[]::integer[]),
  ('u45-head-appetite', 23, ARRAY[]::integer[]),
  ('u45-throat', 33, ARRAY[32]::integer[]),
  ('u45-sick-fever', 20, ARRAY[]::integer[]),
  ('u45-how-long', 10, ARRAY[9]::integer[]),
  ('u45-review', 32, ARRAY[]::integer[]),
  ('u46-cold', 18, ARRAY[]::integer[]),
  ('u46-nonspecific', 9, ARRAY[]::integer[]),
  ('u46-medicine', 29, ARRAY[]::integer[]),
  ('u46-ba', 17, ARRAY[]::integer[]),
  ('u46-recover', 28, ARRAY[]::integer[]),
  ('u46-doctor-visit', 23, ARRAY[22]::integer[]),
  ('u46-review', 35, ARRAY[34]::integer[]),
  ('u47-whats-wrong', 14, ARRAY[]::integer[]),
  ('u47-stomach', 23, ARRAY[]::integer[]),
  ('u47-vle-jiu', 11, ARRAY[]::integer[]),
  ('u47-accompany', 15, ARRAY[]::integer[]),
  ('u47-health-center', 40, ARRAY[]::integer[]),
  ('u47-refuse-help', 11, ARRAY[10]::integer[]),
  ('u47-review', 35, ARRAY[34]::integer[]),
  ('u48-advice', 33, ARRAY[]::integer[]),
  ('u48-a-little', 12, ARRAY[11]::integer[]),
  ('u48-action-compare', 16, ARRAY[]::integer[]),
  ('u48-degree-compare', 15, ARRAY[]::integer[]),
  ('u48-separable', 12, ARRAY[11]::integer[]),
  ('u48-prescription', 10, ARRAY[9]::integer[]),
  ('b2u1-l1-lesson', 12, ARRAY[]::integer[]),
  ('b2u1-l2-lesson', 8, ARRAY[]::integer[]),
  ('b2u1-l3-lesson', 8, ARRAY[]::integer[]),
  ('b2u1-l5-lesson', 13, ARRAY[]::integer[]),
  ('b2u2-l1-lesson', 15, ARRAY[]::integer[]),
  ('b2u2-l2-lesson', 20, ARRAY[]::integer[]),
  ('b2u2-l3-lesson', 8, ARRAY[]::integer[]),
  ('b2u2-l5-lesson', 18, ARRAY[]::integer[]),
  ('b2u3-l1-lesson', 5, ARRAY[]::integer[]),
  ('b2u3-l2-lesson', 6, ARRAY[]::integer[]),
  ('b2u3-l4-lesson', 11, ARRAY[]::integer[]),
  ('b2u3-l5-lesson', 13, ARRAY[]::integer[]),
  ('b2u4-l1-lesson', 10, ARRAY[]::integer[]),
  ('b2u4-l4-lesson', 18, ARRAY[]::integer[]),
  ('b2u4-l5-lesson', 20, ARRAY[]::integer[])
on conflict (lesson_id) do update
set steps = excluded.steps,
    historical_steps = ARRAY(
      select distinct n
      from unnest(existing.historical_steps || excluded.historical_steps ||
        case when existing.steps <> excluded.steps then ARRAY[existing.steps] else '{}'::integer[] end) n
      where n > 0 and n <= excluded.steps
      order by n
    );

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
  completion_counts integer[];
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

  select steps, historical_steps into step_count, completion_counts
  from hanzi_private.lesson_lengths
  where lesson_id = lesson;

  if step_count is null
    or pos < 0 or pos > step_count
    or own < 0 or helped < 0
    or own::bigint + helped::bigint > pos
    or (finished and not (pos = step_count or pos = any(completion_counts)))
    or (not finished and pos >= step_count) then
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
    and excluded.position >= existing.position
    and (not existing.complete or excluded.complete);

  get diagnostics changed = row_count;

  if changed = 0 and not exists(
    select 1
    from public.hanzi_sessions
    where id = checkpoint_id
      and user_id = account_key
      and lesson_id = lesson
      and (position >= pos or complete)
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

commit;


-- Register always-available optional worksheets without changing canonical introductions.
-- Preserve existing lesson positions and all reviewed historical completion bounds.
insert into hanzi_private.lesson_lengths as existing (lesson_id, steps, historical_steps) values
  ('extra-clothing-learn-1', 38, ARRAY[11]::integer[]),
  ('extra-clothing-learn-2', 28, ARRAY[8]::integer[]),
  ('extra-clothing-learn-3', 22, ARRAY[8]::integer[]),
  ('extra-clothing-images', 18, ARRAY[9]::integer[]),
  ('extra-clothing-measures', 38, ARRAY[20]::integer[]),
  ('extra-clothing-listening', 20, ARRAY[11]::integer[]),
  ('extra-clothing-review', 30, ARRAY[21]::integer[]),
  ('extra-clothing-word-tshirt', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-shirt', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-jacket', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-sweater', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-trousers', 21, ARRAY[]::integer[]),
  ('extra-clothing-word-skirt', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-dress', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-shoes', 21, ARRAY[]::integer[]),
  ('extra-clothing-word-socks', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-hat', 21, ARRAY[]::integer[]),
  ('extra-clothing-word-shorts', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-jeans', 21, ARRAY[]::integer[]),
  ('extra-clothing-word-sneakers', 21, ARRAY[]::integer[]),
  ('extra-clothing-word-raincoat', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-swimsuit', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-scarf', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-gloves', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-belt', 18, ARRAY[]::integer[]),
  ('extra-clothing-word-glasses', 21, ARRAY[]::integer[]),
  ('extra-clothing-word-backpack', 21, ARRAY[]::integer[]),
  ('extra-clothing-wearing', 18, ARRAY[]::integer[]),
  ('extra-clothing-single-pair', 19, ARRAY[]::integer[]),
  ('extra-clothing-have-want', 12, ARRAY[]::integer[]),
  ('extra-clothing-names', 12, ARRAY[]::integer[]),
  ('extra-clothing-full-review', 64, ARRAY[]::integer[]),
  ('extra-fruits-learn-1', 41, ARRAY[11]::integer[]),
  ('extra-fruits-learn-2', 28, ARRAY[8]::integer[]),
  ('extra-fruits-learn-3', 22, ARRAY[8]::integer[]),
  ('extra-fruits-images', 18, ARRAY[9]::integer[]),
  ('extra-fruits-measures', 38, ARRAY[20]::integer[]),
  ('extra-fruits-listening', 20, ARRAY[11]::integer[]),
  ('extra-fruits-review', 30, ARRAY[21]::integer[]),
  ('extra-fruits-word-apple', 21, ARRAY[]::integer[]),
  ('extra-fruits-word-banana', 21, ARRAY[]::integer[]),
  ('extra-fruits-word-orange', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-grapes', 21, ARRAY[]::integer[]),
  ('extra-fruits-word-watermelon', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-pineapple', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-mango', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-strawberry', 21, ARRAY[]::integer[]),
  ('extra-fruits-word-pear', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-papaya', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-guava', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-dragonfruit', 21, ARRAY[]::integer[]),
  ('extra-fruits-word-kiwi', 21, ARRAY[]::integer[]),
  ('extra-fruits-word-sweetorange', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-lemon', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-peach', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-plum', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-cherry', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-lychee', 18, ARRAY[]::integer[]),
  ('extra-fruits-word-pomelo', 18, ARRAY[]::integer[]),
  ('extra-fruits-whole-bunch', 13, ARRAY[]::integer[]),
  ('extra-fruits-pieces-boxes', 18, ARRAY[]::integer[]),
  ('extra-fruits-market-weight', 13, ARRAY[]::integer[]),
  ('extra-fruits-names-preferences', 14, ARRAY[]::integer[]),
  ('extra-fruits-full-review', 64, ARRAY[]::integer[]),
  ('extra-colors-word-color-red', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-orange', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-yellow', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-green', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-blue', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-purple', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-pink', 19, ARRAY[]::integer[]),
  ('extra-colors-word-color-brown', 19, ARRAY[]::integer[]),
  ('extra-colors-word-color-black', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-white', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-gray', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-gold', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-silver', 16, ARRAY[]::integer[]),
  ('extra-colors-word-color-darkblue', 19, ARRAY[]::integer[]),
  ('extra-colors-word-color-lightblue', 19, ARRAY[]::integer[]),
  ('extra-colors-word-color-word', 17, ARRAY[]::integer[]),
  ('extra-colors-ask', 12, ARRAY[]::integer[]),
  ('extra-colors-describe', 12, ARRAY[]::integer[]),
  ('extra-colors-shades', 14, ARRAY[]::integer[]),
  ('extra-colors-kinds', 15, ARRAY[]::integer[]),
  ('extra-colors-full-review', 52, ARRAY[]::integer[]),
  ('extra-practice-恤', 4, ARRAY[]::integer[]),
  ('extra-practice-件', 4, ARRAY[]::integer[]),
  ('extra-practice-襯', 4, ARRAY[]::integer[]),
  ('extra-practice-衫', 4, ARRAY[]::integer[]),
  ('extra-practice-外', 4, ARRAY[]::integer[]),
  ('extra-practice-套', 4, ARRAY[]::integer[]),
  ('extra-practice-毛', 4, ARRAY[]::integer[]),
  ('extra-practice-衣', 4, ARRAY[]::integer[]),
  ('extra-practice-褲', 4, ARRAY[]::integer[]),
  ('extra-practice-子', 4, ARRAY[]::integer[]),
  ('extra-practice-條', 4, ARRAY[]::integer[]),
  ('extra-practice-裙', 4, ARRAY[]::integer[]),
  ('extra-practice-洋', 4, ARRAY[]::integer[]),
  ('extra-practice-裝', 4, ARRAY[]::integer[]),
  ('extra-practice-鞋', 4, ARRAY[]::integer[]),
  ('extra-practice-雙', 4, ARRAY[]::integer[]),
  ('extra-practice-襪', 4, ARRAY[]::integer[]),
  ('extra-practice-帽', 4, ARRAY[]::integer[]),
  ('extra-practice-頂', 4, ARRAY[]::integer[]),
  ('extra-practice-短', 4, ARRAY[]::integer[]),
  ('extra-practice-牛', 4, ARRAY[]::integer[]),
  ('extra-practice-仔', 4, ARRAY[]::integer[]),
  ('extra-practice-運', 4, ARRAY[]::integer[]),
  ('extra-practice-動', 4, ARRAY[]::integer[]),
  ('extra-practice-雨', 4, ARRAY[]::integer[]),
  ('extra-practice-泳', 4, ARRAY[]::integer[]),
  ('extra-practice-圍', 4, ARRAY[]::integer[]),
  ('extra-practice-巾', 4, ARRAY[]::integer[]),
  ('extra-practice-手', 4, ARRAY[]::integer[]),
  ('extra-practice-皮', 4, ARRAY[]::integer[]),
  ('extra-practice-帶', 4, ARRAY[]::integer[]),
  ('extra-practice-眼', 4, ARRAY[]::integer[]),
  ('extra-practice-鏡', 4, ARRAY[]::integer[]),
  ('extra-practice-副', 4, ARRAY[]::integer[]),
  ('extra-practice-背', 4, ARRAY[]::integer[]),
  ('extra-practice-包', 4, ARRAY[]::integer[]),
  ('extra-practice-個', 4, ARRAY[]::integer[]),
  ('extra-practice-穿', 4, ARRAY[]::integer[]),
  ('extra-practice-戴', 4, ARRAY[]::integer[]),
  ('extra-practice-隻', 4, ARRAY[]::integer[]),
  ('extra-practice-蘋', 4, ARRAY[]::integer[]),
  ('extra-practice-果', 4, ARRAY[]::integer[]),
  ('extra-practice-香', 4, ARRAY[]::integer[]),
  ('extra-practice-蕉', 4, ARRAY[]::integer[]),
  ('extra-practice-根', 4, ARRAY[]::integer[]),
  ('extra-practice-橘', 4, ARRAY[]::integer[]),
  ('extra-practice-葡', 4, ARRAY[]::integer[]),
  ('extra-practice-萄', 4, ARRAY[]::integer[]),
  ('extra-practice-串', 4, ARRAY[]::integer[]),
  ('extra-practice-西', 4, ARRAY[]::integer[]),
  ('extra-practice-瓜', 4, ARRAY[]::integer[]),
  ('extra-practice-鳳', 4, ARRAY[]::integer[]),
  ('extra-practice-梨', 4, ARRAY[]::integer[]),
  ('extra-practice-芒', 4, ARRAY[]::integer[]),
  ('extra-practice-草', 4, ARRAY[]::integer[]),
  ('extra-practice-莓', 4, ARRAY[]::integer[]),
  ('extra-practice-顆', 4, ARRAY[]::integer[]),
  ('extra-practice-木', 4, ARRAY[]::integer[]),
  ('extra-practice-芭', 4, ARRAY[]::integer[]),
  ('extra-practice-樂', 4, ARRAY[]::integer[]),
  ('extra-practice-火', 4, ARRAY[]::integer[]),
  ('extra-practice-龍', 4, ARRAY[]::integer[]),
  ('extra-practice-奇', 4, ARRAY[]::integer[]),
  ('extra-practice-異', 4, ARRAY[]::integer[]),
  ('extra-practice-柳', 4, ARRAY[]::integer[]),
  ('extra-practice-橙', 4, ARRAY[]::integer[]),
  ('extra-practice-檸', 4, ARRAY[]::integer[]),
  ('extra-practice-檬', 4, ARRAY[]::integer[]),
  ('extra-practice-桃', 4, ARRAY[]::integer[]),
  ('extra-practice-李', 4, ARRAY[]::integer[]),
  ('extra-practice-櫻', 4, ARRAY[]::integer[]),
  ('extra-practice-荔', 4, ARRAY[]::integer[]),
  ('extra-practice-枝', 4, ARRAY[]::integer[]),
  ('extra-practice-柚', 4, ARRAY[]::integer[]),
  ('extra-practice-片', 4, ARRAY[]::integer[]),
  ('extra-practice-塊', 4, ARRAY[]::integer[]),
  ('extra-practice-盒', 4, ARRAY[]::integer[]),
  ('extra-practice-公', 4, ARRAY[]::integer[]),
  ('extra-practice-斤', 4, ARRAY[]::integer[]),
  ('extra-practice-紅', 4, ARRAY[]::integer[]),
  ('extra-practice-色', 4, ARRAY[]::integer[]),
  ('extra-practice-黃', 4, ARRAY[]::integer[]),
  ('extra-practice-綠', 4, ARRAY[]::integer[]),
  ('extra-practice-藍', 4, ARRAY[]::integer[]),
  ('extra-practice-紫', 4, ARRAY[]::integer[]),
  ('extra-practice-粉', 4, ARRAY[]::integer[]),
  ('extra-practice-咖', 4, ARRAY[]::integer[]),
  ('extra-practice-啡', 4, ARRAY[]::integer[]),
  ('extra-practice-黑', 4, ARRAY[]::integer[]),
  ('extra-practice-白', 4, ARRAY[]::integer[]),
  ('extra-practice-灰', 4, ARRAY[]::integer[]),
  ('extra-practice-金', 4, ARRAY[]::integer[]),
  ('extra-practice-銀', 4, ARRAY[]::integer[]),
  ('extra-practice-深', 4, ARRAY[]::integer[]),
  ('extra-practice-淺', 4, ARRAY[]::integer[]),
  ('extra-practice-顏', 4, ARRAY[]::integer[]),
  ('extra-practice-種', 4, ARRAY[]::integer[])
on conflict (lesson_id) do update
set steps=excluded.steps,
 historical_steps=ARRAY(select distinct n from unnest(existing.historical_steps || excluded.historical_steps || case when existing.steps <> excluded.steps then ARRAY[existing.steps] else '{}'::integer[] end) n where n > 0 and n <= excluded.steps order by n);
