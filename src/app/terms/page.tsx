import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { SearchBox } from "@/components/search-box";
import { TermRow } from "@/components/term-card";
import { getAllTerms, searchTerms } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Index",
  description: "Browse curated Gen Z slang, internet lingo, and brainrot.",
};

export default async function TermsPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const resolved = await searchParams;
  const query = resolved?.query?.trim() ?? "";
  const terms = query ? await searchTerms(query, 100) : await getAllTerms();
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Index</h1>
        <SearchBox defaultValue={query} />
      </div>

      <p className="text-xs text-muted-foreground">{sorted.length} entries</p>

      {sorted.length ? (
        <div className="divide-y">
          {sorted.map((term) => (
            <TermRow key={term.slug} term={term} />
          ))}
        </div>
      ) : (
        <EmptyState query={query} />
      )}
    </div>
  );
}
