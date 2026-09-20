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
