import { createClient } from '@supabase/supabase-js';

// Expect env vars in a Vite app: define them in .env.local
// VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
// VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
