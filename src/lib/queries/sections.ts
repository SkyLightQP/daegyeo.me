import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database.types';

export const SectionSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['ARTICLE', 'STACK', 'CONTENT']),
  priority: z.number().int().positive(),
});

export const ReorderSchema = z.array(z.object({ id: z.number().int(), priority: z.number().int().positive() })).min(1);

export type SectionInput = z.infer<typeof SectionSchema>;
export type ReorderInput = z.infer<typeof ReorderSchema>;

type DbClient = SupabaseClient<Database>;

export async function getSections(supabase: DbClient, includeContents = false) {
  const selectClause = includeContents ? '*, contents_dev(*)' : '*';
  return supabase.from('sections_dev').select(selectClause).order('priority');
}

export async function getSectionById(supabase: DbClient, id: number) {
  return supabase.from('sections_dev').select('*').eq('id', id).maybeSingle();
}

export async function createSection(supabase: DbClient, input: SectionInput) {
  const now = new Date().toISOString();
  return supabase
    .from('sections_dev')
    .insert({ ...input, created_at: now, updated_at: now })
    .select()
    .single();
}

export async function updateSection(supabase: DbClient, id: number, input: SectionInput) {
  const now = new Date().toISOString();
  return supabase
    .from('sections_dev')
    .update({ ...input, updated_at: now })
    .eq('id', id)
    .select()
    .maybeSingle();
}

export async function deleteSection(supabase: DbClient, id: number) {
  return supabase.from('sections_dev').delete().eq('id', id).select('id').maybeSingle();
}

export async function reorderSections(supabase: DbClient, items: ReorderInput) {
  const now = new Date().toISOString();
  const results = await Promise.all(
    items.map(({ id, priority }) => supabase.from('sections_dev').update({ priority, updated_at: now }).eq('id', id))
  );
  const error = results.find((r) => r.error)?.error ?? null;
  return { data: { updated: results.length }, error };
}
