-- Run after the production compatibility migration. Disposable username and
-- sessions are all rolled back; no existing learner data is inspected/changed.
begin;
do $$
declare
  account_key text := public.hanzi_claim_username('prodtest_' || substr(replace(gen_random_uuid()::text,'-',''),1,20));
  other_key text := public.hanzi_claim_username('prodother_' || substr(replace(gen_random_uuid()::text,'-',''),1,20));
  checkpoint jsonb;
  cid text := gen_random_uuid()::text;
  partial_id text := gen_random_uuid()::text;
  lesson record;
  prior integer;
  initial_time bigint;
  rejected boolean;
begin
  for lesson in select lesson_id,steps,historical_steps from hanzi_private.lesson_lengths loop
    checkpoint := jsonb_build_object('id',gen_random_uuid()::text,'lessonId',lesson.lesson_id,
      'index',lesson.steps,'independent',0,'assisted',1,'complete',true,'updatedAt',1);
    perform public.hanzi_save_progress(checkpoint,account_key);
    foreach prior in array lesson.historical_steps loop
      perform public.hanzi_save_progress(checkpoint || jsonb_build_object('id',gen_random_uuid()::text,'index',prior),account_key);
      if prior < lesson.steps then
        perform public.hanzi_save_progress(checkpoint || jsonb_build_object('id',gen_random_uuid()::text,'index',prior,'complete',false),account_key);
      end if;
    end loop;
  end loop;

  checkpoint := jsonb_build_object('id',cid,'lessonId','u11-challenge','index',16,
    'independent',0,'assisted',1,'complete',true,'updatedAt',1788940800000);
  perform public.hanzi_save_progress(checkpoint,account_key);
  select completed_at into initial_time from public.hanzi_sessions where id=cid;
  perform public.hanzi_save_progress(checkpoint || '{"updatedAt":1789027200000}',account_key);
  perform public.hanzi_save_progress(checkpoint || '{"complete":false}',account_key);
  if not exists(select 1 from public.hanzi_sessions where id=cid and complete and position=16 and completed_at=initial_time) then
    raise exception 'Replay downgraded a historic completion or moved its study day';
  end if;
  perform public.hanzi_save_progress(checkpoint || '{"index":17}',account_key);
  if not exists(select 1 from public.hanzi_sessions where id=cid and complete and position=17 and completed_at=initial_time) then
    raise exception 'New completion failed or rewrote original completion time';
  end if;

  perform public.hanzi_save_progress(checkpoint || jsonb_build_object('id',partial_id,'complete',false),account_key);
  perform public.hanzi_save_progress(checkpoint || jsonb_build_object('id',partial_id,'index',17),account_key);
  if not exists(select 1 from public.hanzi_sessions where id=partial_id and complete and position=17) then
    raise exception 'Unfinished historic boundary could not finish the new tail';
  end if;

  -- Same-ID partial upload after a historic completion cannot reopen the record,
  -- including an intermediate index in a longer tail.
  select lesson_id,steps,historical_steps into lesson from hanzi_private.lesson_lengths
    where lesson_id='u12-challenge';
  checkpoint := jsonb_build_object('id',gen_random_uuid()::text,'lessonId',lesson.lesson_id,'index',20,
    'independent',0,'assisted',0,'complete',true,'updatedAt',1);
  perform public.hanzi_save_progress(checkpoint,account_key);
  perform public.hanzi_save_progress(checkpoint || '{"index":21,"complete":false}',account_key);
  if not exists(select 1 from public.hanzi_sessions where id=checkpoint->>'id' and complete and position=20) then
    raise exception 'Old completion reopened';
  end if;

  foreach prior in array ARRAY[-1,0,15,18] loop
    rejected:=false;
    begin
      perform public.hanzi_save_progress(checkpoint || jsonb_build_object('id',gen_random_uuid()::text,'lessonId','u11-challenge','index',prior,'complete',true),account_key);
    exception when sqlstate '22023' then rejected:=true;
    end;
    if not rejected then raise exception 'Unreviewed completion accepted: %',prior; end if;
  end loop;
  rejected:=false;
  begin perform public.hanzi_save_progress(checkpoint || '{"lessonId":"u11-challenge","index":17,"complete":false}',account_key);
  exception when sqlstate '22023' then rejected:=true; end;
  if not rejected then raise exception 'Unfinished current end accepted'; end if;
  rejected:=false;
  begin perform public.hanzi_save_progress(checkpoint || jsonb_build_object('id',cid,'lessonId','u11-challenge','index',17),other_key);
  exception when unique_violation then rejected:=true; end;
  if not rejected then raise exception 'Checkpoint changed ownership'; end if;
  rejected:=false;
  begin perform public.hanzi_save_progress(checkpoint,'unknown-account');
  exception when sqlstate '28000' then rejected:=true; end;
  if not rejected then raise exception 'Unresolved account accepted'; end if;

  if has_table_privilege('anon','hanzi_private.lesson_lengths','SELECT')
    or has_table_privilege('authenticated','hanzi_private.lesson_lengths','UPDATE') then
    raise exception 'Curriculum metadata exposed to clients';
  end if;
end $$;
rollback;
select 'PASS: current and historic completions, offline tails, retries, stable dates/ownership, exact bounds; synthetic records rolled back' as verification;
