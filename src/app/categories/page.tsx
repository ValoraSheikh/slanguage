import type { Metadata } from "next";

import { CategoryCard } from "@/components/category-card";
import { getCategoriesWithCounts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Slang Categories",
  description:
    "Browse Gen Z and internet slang by category and vibe.",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="container py-12">
      <div className="grid gap-6 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr] md:items-end md:p-8">
        <div>
          <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            browse by vibe
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Slang categories
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Categories make the chaos legible: dating, brainrot, hype, roasts,
          acronyms, aesthetics, gaming, and money talk.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            count={category.count}
          />
        ))}
      </div>
    </div>
  );
}
