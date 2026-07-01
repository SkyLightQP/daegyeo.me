import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withAdmin } from '@/lib/supabase/auth';
import { createServerClient } from '@/lib/supabase/server';
import { getSections, createSection, SectionSchema } from '@/lib/queries/sections';
import type { Database } from '@/types/database.types';

type ContentRow = Database['public']['Tables']['contents_dev']['Row'];
type SectionWithContents = Database['public']['Tables']['sections_dev']['Row'] & { contents_dev: ContentRow[] };

export async function GET(req: NextRequest) {
  const supabase = await createServerClient();
  const include = req.nextUrl.searchParams.get('include');
  const includeContents = include === 'contents';
  const { data, error } = await getSections(supabase, includeContents);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  const responseData = includeContents
    ? (data as unknown as SectionWithContents[]).map(({ contents_dev, ...section }) => ({
        ...section,
        contents: contents_dev,
      }))
    : data;
  return NextResponse.json({ data: responseData });
}

export const POST = withAdmin(async (req) => {
  const parsed = SectionSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: z.flattenError(parsed.error).fieldErrors }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await createSection(supabase, parsed.data);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 201 });
});
