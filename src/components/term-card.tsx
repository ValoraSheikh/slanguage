import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SafetyBadge, StatusBadge } from "@/components/status-badge";
import type { TermDTO } from "@/types/slang";

export function TermCard({ term }: { term: TermDTO }) {
  return (
    <Link href={`/terms/${term.slug}`} className="group block h-full">
      <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
        <div className="mb-4 flex items-start justify-between gap-3 pb-4 border-b">
          <div>
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              entry
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">
              {term.term}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {term.shortDefinition}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge status={term.status} />
          <SafetyBadge label={term.safetyLabel} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t">
          {term.categories.slice(0, 2).map((category) => (
            <span
              key={category.slug}
              className="rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-medium"
            >
              {category.emoji} {category.name}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
