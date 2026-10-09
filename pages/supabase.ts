import {createClient} from '@supabase/supabase-js';

// Public project configuration. Hanzi Steps uses its own lightweight username
// profiles; Supabase OAuth/session storage is intentionally disabled.
export const SUPABASE_URL='https://evckshjtzikuusnkdnjn.supabase.co';
export const SUPABASE_PUBLIC_KEY='sb_publishable_Wbt6j8h6LXjm_hQ7hyQEzg_5t7eWHfL';

export const supabase=createClient(
 SUPABASE_URL,
 SUPABASE_PUBLIC_KEY,
 {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}},
);
