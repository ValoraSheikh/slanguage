import Link from "next/link";

import { StatusDot } from "@/components/status-badge";
import type { TermDTO } from "@/types/slang";

export function TermRow({ term }: { term: TermDTO }) {
  return <TermRowInner term={term} />;
}

export function TermCard({ term }: { term: TermDTO }) {
  return <TermRowInner term={term} />;
}

function TermRowInner({ term }: { term: TermDTO }) {
  return (
    <Link
      href={`/terms/${term.slug}`}
      className="flex items-center gap-3 py-3 hover:bg-muted/50 transition-colors -mx-2 px-2"
    >
      <span className="text-sm font-semibold shrink-0">{term.term}</span>
      <span className="text-sm text-muted-foreground truncate min-w-0">
        {term.shortDefinition}
      </span>
      <span className="ml-auto shrink-0">
        <StatusDot status={term.status} />
      </span>
    </Link>
  );
}
