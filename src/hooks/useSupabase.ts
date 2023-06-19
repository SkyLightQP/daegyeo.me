import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';
import { Database } from '../types/schema';

const useSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? '';
  return useMemo(() => createClient<Database>(supabaseUrl, supabaseKey), [supabaseUrl, supabaseKey]);
};

export default useSupabase;
