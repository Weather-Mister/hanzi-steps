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
