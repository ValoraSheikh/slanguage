import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CategoryDTO } from "@/types/slang";

export function CategoryCard({
  category,
  count,
}: {
  category: CategoryDTO;
  count?: number;
}) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <article className="h-full rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg text-2xl",
              category.color,
            )}
          >
            {category.emoji}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          {category.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        {typeof count === "number" ? (
          <p className="mt-4 inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {count} entries
          </p>
        ) : null}
      </article>
    </Link>
  );
}
