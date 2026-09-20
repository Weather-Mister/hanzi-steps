import {createClient} from '@supabase/supabase-js';

// Public project configuration. Hanzi Steps uses its own lightweight username
// profiles; Supabase OAuth/session storage is intentionally disabled.
export const supabase=createClient(
 'https://evckshjtzikuusnkdnjn.supabase.co',
 'sb_publishable_Wbt6j8h6LXjm_hQ7hyQEzg_5t7eWHfL',
 {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}},
);
