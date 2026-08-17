import { createServerClient } from '@/lib/supabase/server';
import { getSections } from '@/lib/queries/sections';
import { getContents } from '@/lib/queries/contents';
import type { ContentData, SectionData } from '@/types/content';

export async function getContentData() {
  const supabase = await createServerClient();
  const [sectionsResult, contentsResult] = await Promise.all([getSections(supabase), getContents(supabase)]);

  if (sectionsResult.error) console.error(sectionsResult.error);
  if (contentsResult.error) console.error(contentsResult.error);

  return {
    sections: (sectionsResult.data ?? []) as unknown as SectionData[],
    contents: (contentsResult.data ?? []) as ContentData[],
  };
}
