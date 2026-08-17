import { Database } from '@/types/database.types';

export type SchemaType<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][`${T}`]['Row'];
