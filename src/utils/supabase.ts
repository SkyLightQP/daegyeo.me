import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types/schema';

export const supabaseClient = createPagesBrowserClient<Database>();

export const useSupabase = () => {
  return useSupabaseClient<Database>();
};
