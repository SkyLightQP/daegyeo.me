import { NextRequest, NextResponse } from 'next/server';

type JsonResult = { ok: true; data: unknown } | { ok: false; response: NextResponse };

export async function readJson(req: NextRequest): Promise<JsonResult> {
  try {
    return { ok: true, data: await req.json() };
  } catch {
    return { ok: false, response: NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) };
  }
}
