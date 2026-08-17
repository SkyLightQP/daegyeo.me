import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

export const ContentSchema = z.object({
  title: z.string(),
  subtitle: z.string().min(1),
  description: z.string(),
  date_range: z.string(),
  section_id: z.number().int().positive(),
  priority: z.number().int().positive(),
  is_hidden: z.boolean().optional().default(false),
});

export const ReorderSchema = z.array(z.object({ id: z.number().int(), priority: z.number().int().positive() })).min(1);

export type ContentInput = z.infer<typeof ContentSchema>;
export type ReorderInput = z.infer<typeof ReorderSchema>;

type DbClient = SupabaseClient<Database>;

export async function getContents(supabase: DbClient) {
  return supabase.from('contents').select('*').order('priority');
}

export async function getPublicContents(supabase: DbClient) {
  return supabase.from('contents').select('*').eq('is_hidden', false).order('priority');
}

export async function getContentById(supabase: DbClient, id: number) {
  return supabase.from('contents').select('*').eq('id', id).maybeSingle();
}

export async function createContent(supabase: DbClient, input: ContentInput) {
  const now = new Date().toISOString();
  return supabase
    .from('contents')
    .insert({ ...input, created_at: now, updated_at: now })
    .select()
    .single();
}

export async function updateContent(supabase: DbClient, id: number, input: ContentInput) {
  const now = new Date().toISOString();
  return supabase
    .from('contents')
    .update({ ...input, updated_at: now })
    .eq('id', id)
    .select()
    .maybeSingle();
}

export async function deleteContent(supabase: DbClient, id: number) {
  return supabase.from('contents').delete().eq('id', id).select('id').maybeSingle();
}

export async function reorderContents(supabase: DbClient, items: ReorderInput) {
  const now = new Date().toISOString();
  const results = await Promise.all(
    items.map(({ id, priority }) => supabase.from('contents').update({ priority, updated_at: now }).eq('id', id))
  );
  const error = results.find((r) => r.error)?.error ?? null;
  return { data: { updated: results.length }, error };
}
