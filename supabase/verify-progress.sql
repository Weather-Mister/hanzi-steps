-- Transactional integration test: synthetic identities and checkpoints are
-- always rolled back. Run through a privileged SQL connection.
BEGIN;
CREATE TEMP TABLE hanzi_test_users AS
 SELECT gen_random_uuid() AS id, label, 'hanzi-migration-'||gen_random_uuid()||'@example.test' AS email
 FROM (VALUES ('owner'),('other'),('unverified')) names(label);
INSERT INTO auth.users(id,email,email_confirmed_at,raw_user_meta_data,raw_app_meta_data)
 SELECT id,email,now(),'{}'::jsonb,'{"provider":"google","providers":["google"]}'::jsonb FROM hanzi_test_users;
INSERT INTO auth.identities(user_id,provider_id,provider,identity_data)
 SELECT id,id::text,'google',jsonb_build_object('sub',id::text,'email',email,'email_verified',label<>'unverified') FROM hanzi_test_users;
SELECT set_config('hanzi.test.owner',(SELECT id::text FROM hanzi_test_users WHERE label='owner'),true);
SELECT set_config('hanzi.test.other',(SELECT id::text FROM hanzi_test_users WHERE label='other'),true);
SELECT set_config('hanzi.test.unverified',(SELECT id::text FROM hanzi_test_users WHERE label='unverified'),true);
SELECT set_config('hanzi.test.expected',(SELECT 'account-v1-'||encode(sha256(convert_to('hanzi-steps/progress/v1:'||email,'UTF8')),'hex') FROM hanzi_test_users WHERE label='owner'),true);
SELECT set_config('hanzi.test.length',(SELECT steps::text FROM hanzi_private.lesson_lengths WHERE lesson_id='hello'),true);
SET LOCAL ROLE authenticated;
DO $$
DECLARE account_key text; other_key text; checkpoint jsonb; result jsonb; before_day jsonb; rejected boolean; cid text:=gen_random_uuid()::text;
BEGIN
 PERFORM set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('hanzi.test.unverified'),'role','authenticated','user_metadata',jsonb_build_object('email_verified',true))::text,true);
 rejected:=false;
 BEGIN PERFORM public.hanzi_claim_account(); EXCEPTION WHEN SQLSTATE '28000' THEN rejected:=true; END;
 IF NOT rejected THEN RAISE EXCEPTION 'Unverified identity could claim progress'; END IF;
 PERFORM set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('hanzi.test.owner'),'role','authenticated')::text,true);
 account_key:=public.hanzi_claim_account();
 IF account_key<>current_setting('hanzi.test.expected') OR public.hanzi_claim_account()<>account_key THEN RAISE EXCEPTION 'Account mapping changed'; END IF;
 IF (SELECT count(*) FROM public.hanzi_sessions)<>0 THEN RAISE EXCEPTION 'New account can read existing users'; END IF;
 checkpoint:=jsonb_build_object('id',cid,'lessonId','hello','index',4,'independent',2,'assisted',1,'complete',false,'updatedAt',1788940800000);
 result:=public.hanzi_save_progress(checkpoint,account_key);
 IF result->>'saved'<>'true' THEN RAISE EXCEPTION 'Save unconfirmed'; END IF;
 checkpoint:=checkpoint||jsonb_build_object('index',current_setting('hanzi.test.length')::integer,'complete',true);
 result:=public.hanzi_save_progress(checkpoint,account_key); before_day:=result->'studyDays';
 IF before_day<>'["2026-09-09"]'::jsonb THEN RAISE EXCEPTION 'Completion date shifted: %',before_day; END IF;
 result:=public.hanzi_save_progress(checkpoint||jsonb_build_object('updatedAt',1789027200000),account_key);
 IF result->'studyDays'<>before_day THEN RAISE EXCEPTION 'Retry moved completion day'; END IF;
 PERFORM public.hanzi_save_progress(checkpoint||'{"index":4,"complete":false}'::jsonb,account_key);
 result:=public.hanzi_read_progress(account_key);
 IF result->'sessions'->0->>'complete'<>'true' THEN RAISE EXCEPTION 'Stale save undid completion'; END IF;
 rejected:=false;
 BEGIN PERFORM public.hanzi_save_progress(checkpoint||'{"index":1,"complete":true}'::jsonb,account_key); EXCEPTION WHEN SQLSTATE '22023' THEN rejected:=true; END;
 IF NOT rejected THEN RAISE EXCEPTION 'Invalid completion accepted'; END IF;
 PERFORM set_config('request.jwt.claims',jsonb_build_object('sub',current_setting('hanzi.test.other'),'role','authenticated')::text,true);
 other_key:=public.hanzi_claim_account();
 IF (SELECT count(*) FROM public.hanzi_sessions)<>0 THEN RAISE EXCEPTION 'Cross-account RLS failed'; END IF;
 rejected:=false;
 BEGIN PERFORM public.hanzi_read_progress(account_key); EXCEPTION WHEN SQLSTATE '28000' THEN rejected:=true; END;
 IF NOT rejected THEN RAISE EXCEPTION 'Cross-account read accepted'; END IF;
 rejected:=false;
 BEGIN PERFORM public.hanzi_save_progress(checkpoint,account_key); EXCEPTION WHEN SQLSTATE '28000' THEN rejected:=true; END;
 IF NOT rejected THEN RAISE EXCEPTION 'Stale-account write accepted'; END IF;
 rejected:=false;
 BEGIN PERFORM public.hanzi_save_progress(checkpoint,other_key); EXCEPTION WHEN unique_violation THEN rejected:=true; END;
 IF NOT rejected THEN RAISE EXCEPTION 'Another account overwrote checkpoint'; END IF;
 IF has_table_privilege(current_user,'public.hanzi_sessions','INSERT') OR has_table_privilege(current_user,'public.hanzi_sessions','UPDATE') THEN RAISE EXCEPTION 'Direct writes bypass validation'; END IF;
 IF has_function_privilege(current_user,'public.hanzi_widget_days(text)','EXECUTE') THEN RAISE EXCEPTION 'Raw widget history exposed'; END IF;
END $$;
RESET ROLE;
ROLLBACK;
SELECT 'PASS: verified identity, stable account mapping, RLS, saves, retries, historical dates, stale checkpoints, malformed checkpoints, cross-account reads/writes, widget permissions; all test data rolled back' AS verification;
