import { NextResponse } from 'next/server';
import { withAdmin } from '@/lib/supabase/auth';
import { createServerClient } from '@/lib/supabase/server';
import { readJson } from '@/lib/http';
import { getContents, createContent, ContentSchema } from '@/lib/queries/contents';

export const GET = withAdmin(async () => {
  const supabase = await createServerClient();
  const { data, error } = await getContents(supabase);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  return NextResponse.json({ data });
});

export const POST = withAdmin(async (req) => {
  const body = await readJson(req);
  if (!body.ok) return body.response;
  const parsed = ContentSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await createContent(supabase, parsed.data);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 201 });
});
