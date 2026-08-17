import { NextResponse } from 'next/server';
import { withAdmin } from '@/lib/supabase/auth';
import { createServerClient } from '@/lib/supabase/server';
import { reorderSections, ReorderSchema } from '@/lib/queries/sections';

export const PATCH = withAdmin(async (req) => {
  const parsed = ReorderSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await reorderSections(supabase, parsed.data);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  return NextResponse.json({ data });
});
