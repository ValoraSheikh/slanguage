import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { getCategoryIcon } from "@/lib/icons";
import type { CategoryDTO } from "@/types/slang";

export function CategoryRow({
  category,
  count,
}: {
  category: CategoryDTO;
  count?: number;
}) {
  return <CategoryRowInner category={category} count={count} />;
}

export function CategoryCard({
  category,
  count,
}: {
  category: CategoryDTO;
  count?: number;
}) {
  return <CategoryRowInner category={category} count={count} />;
}

function CategoryRowInner({
  category,
  count,
}: {
  category: CategoryDTO;
  count?: number;
}) {
  const Icon: LucideIcon = getCategoryIcon(category.iconName);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex items-center gap-3 py-3 hover:bg-muted/50 transition-colors -mx-2 px-2"
    >
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-sm font-medium">{category.name}</span>
      {typeof count === "number" && (
        <span className="text-xs text-muted-foreground ml-auto tabular-nums">
          {count}
        </span>
      )}
    </Link>
  );
}
