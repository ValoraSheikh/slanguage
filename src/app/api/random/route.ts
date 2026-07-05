import { NextResponse } from "next/server";

import { getRandomTerm } from "@/lib/queries";

export async function GET(request: Request) {
  const term = await getRandomTerm();
  const url = new URL(request.url);
  url.pathname = term ? `/terms/${term.slug}` : "/terms";
  url.search = "";

  return NextResponse.redirect(url);
}
