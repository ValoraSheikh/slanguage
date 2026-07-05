import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({ query }: { query?: string }) {
  return (
    <div className="rounded-xl border bg-card px-6 py-14 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
        <SearchX className="h-7 w-7 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold tracking-tight">
        No entry found
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
        {query
          ? `"${query}" is either missing, too new, or too cursed. Submit it for review.`
          : "Nothing here yet."}
      </p>
      <Button asChild className="mt-5">
        <Link href="/submit">Submit slang</Link>
      </Button>
    </div>
  );
}
