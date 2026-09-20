import {createClient} from '@supabase/supabase-js';

// Public project configuration; authorization is enforced by Postgres/RLS.
export const supabase=createClient(
 'https://evckshjtzikuusnkdnjn.supabase.co',
 'sb_publishable_Wbt6j8h6LXjm_hQ7hyQEzg_5t7eWHfL',
 {auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}},
);
