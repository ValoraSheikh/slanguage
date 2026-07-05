import { NextResponse } from "next/server";

import { searchTerms } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const limit = Number(searchParams.get("limit") ?? 10);
  const results = await searchTerms(query, Number.isFinite(limit) ? limit : 10);

  return NextResponse.json({ results });
}
