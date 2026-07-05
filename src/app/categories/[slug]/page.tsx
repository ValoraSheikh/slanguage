import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { TermCard } from "@/components/term-card";
import { Button } from "@/components/ui/button";
import { getCategoryWithTerms } from "@/lib/queries";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryWithTerms(slug);

  if (!data) return { title: "Category not found" };

  return {
    title: `${data.category.name} Slang | Slanguage`,
    description: `${data.category.name}: ${data.category.description} Browse ${data.category.count} slang terms curated on Slanguage.`,
    alternates: {
      canonical: `${getSiteUrl()}/categories/${slug}`,
    },
    openGraph: {
      title: `${data.category.name} Slang | Slanguage`,
      description: data.category.description,
      url: `${getSiteUrl()}/categories/${slug}`,
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCategoryWithTerms(slug);
  if (!data) notFound();

  const { category, terms } = data;
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container py-10">
      <Button asChild variant="outline" className="mb-7">
        <Link href="/categories">
          <ArrowLeft className="h-4 w-4" /> Back to categories
        </Link>
      </Button>

      <header className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div
          className={cn(
            "mb-6 flex h-16 w-16 items-center justify-center rounded-xl text-4xl",
            category.color,
          )}
        >
          {category.emoji}
        </div>
        <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
          {category.count} entries
        </p>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          {category.name}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {category.description}
        </p>
      </header>

      <section className="mt-10">
        {sorted.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((term) => (
              <TermCard key={term.slug} term={term} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </div>
  );
}
