import type { Metadata } from "next";

import { EmptyState } from "@/components/empty-state";
import { SearchBox } from "@/components/search-box";
import { TermCard } from "@/components/term-card";
import { getAllTerms, searchTerms } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Slang Index",
  description:
    "Search and browse curated Gen Z slang, TikTok slang, brainrot, and internet lingo.",
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
    <div className="container py-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            A-Z field guide
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            The slang index
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Browse the terms, acronyms, phrases, and brainrot artifacts. Search
            by meaning if you only know the vibe.
          </p>
        </div>
        <SearchBox defaultValue={query} large />
      </div>

      <div className="mt-12">
        <div className="mb-6 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-end md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            {query ? `Results for "${query}"` : "All entries"}
          </h2>
          <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground w-fit">
            {sorted.length} entries
          </p>
        </div>

        {sorted.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        ) : (
          <EmptyState query={query} />
        )}
      </div>
    </div>
  );
}
