import type { Metadata } from "next";

import { CategoryRow } from "@/components/category-card";
import { getCategoriesWithCounts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse slang by category.",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
      <div className="divide-y">
        {categories.map((category) => (
          <CategoryRow
            key={category.slug}
            category={category}
            count={category.count}
          />
        ))}
      </div>
    </div>
  );
}
