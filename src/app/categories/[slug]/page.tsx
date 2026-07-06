import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LucideIcon } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { TermRow } from "@/components/term-card";
import { getCategoryWithTerms } from "@/lib/queries";
import { getCategoryIcon } from "@/lib/icons";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryWithTerms(slug);

  if (!data) return { title: "Category not found" };

  return {
    title: `${data.category.name} | Slanguage`,
    description: data.category.description,
    alternates: {
      canonical: `${getSiteUrl()}/categories/${slug}`,
    },
    openGraph: {
      title: `${data.category.name} | Slanguage`,
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
  const Icon: LucideIcon = getCategoryIcon(category.iconName);

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3 w-3" /> Categories
      </Link>

      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {category.name}
        </h1>
      </div>

      <p className="text-xs text-muted-foreground">{sorted.length} entries</p>

      {sorted.length ? (
        <div className="divide-y">
          {sorted.map((term) => (
            <TermRow key={term.slug} term={term} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
