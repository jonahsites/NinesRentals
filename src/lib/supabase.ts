import { createClient } from '@supabase/supabase-js';

// Fallback to the credentials provided by the user if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://svytyfdtxiyozqmuergc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_zQrMkuBHAJn4BZkWIXQ4tQ_26fnMwD8';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials missing in environment. Using fallback provided in code.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
  return data;
};
