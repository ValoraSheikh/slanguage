import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StatusDot } from "@/components/status-badge";
import { TermRow } from "@/components/term-card";
import { getAllTerms, getTermBySlug } from "@/lib/queries";
import { generateTermStructuredData } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = await getTermBySlug(slug);

  if (!term) {
    return { title: "Term not found" };
  }

  return {
    title: `${term.term} | Slanguage`,
    description: `${term.term}: ${term.shortDefinition}`,
    alternates: {
      canonical: `${getSiteUrl()}/terms/${term.slug}`,
    },
    openGraph: {
      title: `${term.term} | Slanguage`,
      description: term.shortDefinition,
      type: "article",
      url: `${getSiteUrl()}/terms/${term.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: term.term,
      description: term.shortDefinition,
    },
  };
}

export default async function TermDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = await getTermBySlug(slug);
  if (!term) notFound();

  const allTerms = await getAllTerms();
  const related = term.relatedTerms.length
    ? term.relatedTerms
        .map((relatedTerm) =>
          allTerms.find((item) => item.slug === relatedTerm.slug),
        )
        .filter(Boolean)
    : allTerms
        .filter(
          (item) =>
            item.slug !== term.slug &&
            item.categorySlugs.some((s) =>
              term.categorySlugs.includes(s),
            ),
        )
        .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateTermStructuredData(
              term,
              `${getSiteUrl()}/terms/${term.slug}`,
              getSiteUrl(),
            ),
          ),
        }}
      />
      <div className="container max-w-3xl py-10 space-y-8">
        <Link
          href="/terms"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Index
        </Link>

        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">
              {term.term}
            </h1>
            <StatusDot status={term.status} />
            <p className="text-xl font-medium leading-relaxed">
              {term.shortDefinition}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              {term.definition}
            </p>
          </header>

          {term.examples.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Examples
              </h3>
              <div className="space-y-2">
                {term.examples.map((example) => (
                  <blockquote
                    key={example}
                    className="border-l-2 pl-4 text-sm italic text-muted-foreground"
                  >
                    &ldquo;{example}&rdquo;
                  </blockquote>
                ))}
              </div>
            </section>
          )}
        </article>

        {related.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Related
            </h3>
            <div className="divide-y">
              {related.slice(0, 4).map((relatedTerm) => (
                <TermRow key={relatedTerm!.slug} term={relatedTerm!} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
