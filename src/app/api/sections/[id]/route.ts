import { NextResponse } from 'next/server';
import { withAdmin } from '@/lib/supabase/auth';
import { createServerClient } from '@/lib/supabase/server';
import { deleteSection, getSectionById, SectionSchema, updateSection } from '@/lib/queries/sections';

type Params = { params: Promise<{ id: string }> };

function parseId(id: string) {
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) return null;
  return numId;
}

export const GET = withAdmin<Params>(async (_req, { params }) => {
  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await getSectionById(supabase, numId);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  return NextResponse.json({ data });
});

export const PUT = withAdmin<Params>(async (req, { params }) => {
  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const parsed = SectionSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await updateSection(supabase, numId, parsed.data);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  return NextResponse.json({ data });
});

export const DELETE = withAdmin<Params>(async (_req, { params }) => {
  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const supabase = await createServerClient();
  const { data, error } = await deleteSection(supabase, numId);
  if (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  return new NextResponse(null, { status: 204 });
});
