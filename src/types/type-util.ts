import { Database } from './schema';

export type SchemaType<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][`${T}`]['Row'];
