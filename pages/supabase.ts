import {createClient} from '@supabase/supabase-js';

// Public project configuration; authorization is enforced by Postgres/RLS.
export const supabase=createClient(
 'https://fhianwwomgonfueqbcwx.supabase.co',
 'sb_publishable_5sfW6m9za5KK7EwbBmEVqQ_F_WBw8Nu',
 {auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}},
);
