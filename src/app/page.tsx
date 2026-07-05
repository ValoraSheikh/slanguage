import Link from "next/link";
import { ArrowRight, Dice5, Send } from "lucide-react";

import { CategoryCard } from "@/components/category-card";
import { SearchBox } from "@/components/search-box";
import { SlanguageBento } from "@/components/slanguage-bento";
import { StatusBadge } from "@/components/status-badge";
import { TermCard } from "@/components/term-card";
import { Button } from "@/components/ui/button";
import {
  getAllTerms,
  getCategoriesWithCounts,
  getFeaturedTerms,
  getRecentlyAdded,
  getWordOfTheDay,
} from "@/lib/queries";

export default async function HomePage() {
  const [allTerms, featuredTerms, categories, wordOfTheDay, recentTerms] =
    await Promise.all([
      getAllTerms(),
      getFeaturedTerms(8),
      getCategoriesWithCounts(),
      getWordOfTheDay(),
      getRecentlyAdded(8),
    ]);

  return (
    <div>
      <section className="container grid gap-10 py-16 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Not Urban Dictionary
          </div>
          <h1 className="max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Internet slang, decoded without the brand-account cringe.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Slanguage is a curated field guide for words your feed keeps saying:
            definition, example, category, and whether it&apos;s still alive or
            already cooked.
          </p>
          <div className="mt-8 max-w-3xl">
            <SearchBox large />
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {featuredTerms.slice(0, 7).map((term) => (
              <Link
                key={term.slug}
                href={`/terms/${term.slug}`}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                {term.term}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/terms">Open the index</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/api/random">
                <Dice5 className="h-4 w-4" /> Random entry
              </Link>
            </Button>
          </div>
        </div>

        <SlanguageBento
          termCount={allTerms.length}
          categoryCount={categories.length}
          featuredTerms={featuredTerms}
        />
      </section>

      {wordOfTheDay ? (
        <section className="container py-8">
          <div className="grid gap-5 rounded-2xl bg-foreground p-6 text-background shadow-xl md:grid-cols-[0.75fr_1.25fr_auto] md:items-center md:p-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary/80">
                word of the day
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                {wordOfTheDay.term}
              </h2>
            </div>
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <StatusBadge status={wordOfTheDay.status} />
              </div>
              <p className="max-w-3xl text-lg leading-8 text-background/75">
                {wordOfTheDay.shortDefinition}
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link href={`/terms/${wordOfTheDay.slug}`}>
                Read <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}

      <section className="container py-12">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-3">
              browse by vibe
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Categories with actual context
            </h2>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/categories">
              All categories <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              count={category.count}
            />
          ))}
        </div>
      </section>

      {recentTerms.length ? (
        <section className="container py-12">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
                🆕 recently added
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Fresh entries from the glossary
              </h2>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/terms">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentTerms.slice(0, 4).map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container py-12">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-3">
              starter pack
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Common terms, cleanly explained
            </h2>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/terms">Full index</Link>
          </Button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTerms.map((term) => (
            <TermCard key={term.slug} term={term} />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-6 rounded-2xl bg-muted/50 p-7 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              moderation queue
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Found new slang?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Submit it anonymously. We review the definition, examples,
              category, and safety label before publishing.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/submit">
              <Send className="h-4 w-4" /> Submit slang
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
