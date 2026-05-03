import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '../../../lib/supabase/auth';
import { createServerClient } from '../../../lib/supabase/server';
import { getSections, createSection, SectionSchema } from '../../../lib/queries/sections';

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
    ? (data as any[]).map(({ contents_dev, ...section }) => ({ ...section, contents: contents_dev }))
    : data;
  return NextResponse.json({ data: responseData });
}

export const POST = withAdmin(async (req) => {
  const parsed = SectionSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await createSection(supabase, parsed.data);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 201 });
});