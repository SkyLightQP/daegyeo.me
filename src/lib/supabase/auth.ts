import { type NextRequest, NextResponse } from 'next/server';
import { type User } from '@supabase/supabase-js';
import { createServerClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

export function withAdmin<C = unknown>(handler: (req: NextRequest, ctx: C, user: User) => Promise<NextResponse>) {
  return async (req: NextRequest, ctx: C): Promise<NextResponse> => {
    const user = await requireAdmin();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return handler(req, ctx, user);
  };
}
