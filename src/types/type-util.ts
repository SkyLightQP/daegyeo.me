import { Database } from './database.types';

export type SchemaType<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][`${T}`]['Row'];
