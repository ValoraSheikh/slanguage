import Link from "next/link";

import { CategoryRow } from "@/components/category-card";
import { HomeStats } from "@/components/home-stats";
import { SearchBox } from "@/components/search-box";
import {
  getAllTerms,
  getCategoriesWithCounts,
  getFeaturedTerms,
} from "@/lib/queries";

export default async function HomePage() {
  const [allTerms, categories, featuredTerms] = await Promise.all([
    getAllTerms(),
    getCategoriesWithCounts(),
    getFeaturedTerms(8),
  ]);

  return (
    <div className="container max-w-3xl py-16 space-y-12">
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Internet slang, decoded.
        </h1>
        <p className="text-sm text-muted-foreground max-w-lg">
          A curated reference for Gen Z slang, brainrot, and internet lingo.
        </p>

        <SearchBox large />

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {featuredTerms.slice(0, 7).map((term, i) => (
            <span key={term.slug}>
              {i > 0 && <span className="text-muted-foreground/40">·</span>}
              {" "}
              <Link
                href={`/terms/${term.slug}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {term.term}
              </Link>
            </span>
          ))}
          <span>
            <span className="text-muted-foreground/40">·</span>{" "}
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              all
            </Link>
          </span>
        </div>
      </section>

      <HomeStats termCount={allTerms.length} categoryCount={categories.length} />

      <section className="space-y-1">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Categories
        </h2>
        <div className="divide-y">
          {categories.map((category) => (
            <CategoryRow
              key={category.slug}
              category={category}
              count={category.count}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
