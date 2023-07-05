import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../types/schema';

// eslint-disable-next-line import/prefer-default-export
export const supabaseClient = createPagesBrowserClient<Database>();
