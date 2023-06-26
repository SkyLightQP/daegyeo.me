import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import { Database } from '../types/schema';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const useSupabase = () => {
  return useMemo(() => createClient<Database>(supabaseUrl, supabaseKey), []);
};

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey);

export default useSupabase;
