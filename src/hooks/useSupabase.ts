import { createClient } from '@supabase/supabase-js';
import { useMemo } from 'react';

const useSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? '';
  return useMemo(() => createClient(supabaseUrl, supabaseKey), [supabaseUrl, supabaseKey]);
};

export default useSupabase;
