-- The scheduler expects these Vault entries to exist in each deployed project:
--   hanzi_push_project_url
--   hanzi_push_publishable_key
-- Both values are deployment configuration; no private VAPID key is stored here.
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron;

select cron.schedule(
  'hanzi-push-hourly',
  '15 * * * *',
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets where name='hanzi_push_project_url' order by created_at desc limit 1) || '/functions/v1/hanzi-push',
    headers := jsonb_build_object(
      'Content-Type','application/json',
      'apikey',(select decrypted_secret from vault.decrypted_secrets where name='hanzi_push_publishable_key' order by created_at desc limit 1),
      'Authorization','Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name='hanzi_push_publishable_key' order by created_at desc limit 1)
    ),
    body := jsonb_build_object('scheduledAt',now()),
    timeout_milliseconds := 20000
  ) as request_id;
  $$
);
