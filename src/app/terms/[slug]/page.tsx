import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Quote, Sparkles } from "lucide-react";

import { SafetyBadge, StatusBadge } from "@/components/status-badge";
import { TermCard } from "@/components/term-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllTerms, getTermBySlug } from "@/lib/queries";
import { getStatusLabel } from "@/lib/status";
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
    return { title: "Slang term not found" };
  }

  return {
    title: `What does "${term.term}" mean? | Slanguage`,
    description: `${term.term} meaning: ${term.shortDefinition}. Read the full definition, examples, and vibe check on Slanguage.`,
    alternates: {
      canonical: `${getSiteUrl()}/terms/${term.slug}`,
    },
    openGraph: {
      title: `What does "${term.term}" mean? | Slanguage`,
      description: term.shortDefinition,
      type: "article",
      url: `${getSiteUrl()}/terms/${term.slug}`,
      images: [
        {
          url: `${getSiteUrl()}/api/og?slug=${term.slug}`,
          width: 1200,
          height: 630,
          alt: `${term.term} — ${term.shortDefinition}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `What does "${term.term}" mean?`,
      description: term.shortDefinition,
      images: [`${getSiteUrl()}/api/og?slug=${term.slug}`],
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
      <div className="container py-10">
      <Button asChild variant="outline" className="mb-7">
        <Link href="/terms">
          <ArrowLeft className="h-4 w-4" /> Back to index
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <article className="space-y-8">
          <header className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm md:p-10">
            <div className="absolute right-6 top-6 hidden rounded-lg bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground md:block">
              entry / {term.status}
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              <StatusBadge status={term.status} />
              <SafetyBadge label={term.safetyLabel} />
              {term.categories.map((category) => (
                <Link key={category.slug} href={`/categories/${category.slug}`}>
                  <Badge variant="outline" className="hover:bg-muted">
                    {category.emoji} {category.name}
                  </Badge>
                </Link>
              ))}
            </div>

            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              definition
            </p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-7xl">
              {term.term}
            </h1>
            {term.aliases.length ? (
              <p className="mt-4 inline-flex rounded-full bg-muted px-4 py-1.5 text-xs font-medium">
                Also: {term.aliases.join(", ")}
              </p>
            ) : null}

            <p className="mt-8 max-w-3xl text-2xl font-semibold leading-relaxed tracking-tight">
              {term.shortDefinition}
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
              {term.definition}
            </p>

            {term.tags.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {term.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <Quote className="h-5 w-5 text-primary" /> Examples
              </h2>
              <div className="mt-5 space-y-4">
                {term.examples.length ? (
                  term.examples.map((example) => (
                    <blockquote
                      key={example}
                      className="rounded-lg border bg-muted/50 p-4 text-sm font-medium italic leading-relaxed"
                    >
                      &ldquo;{example}&rdquo;
                    </blockquote>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No examples yet. Submit one if you&apos;ve got good lore.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-xl border bg-muted/30 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <Sparkles className="h-5 w-5" /> Vibe check
              </h2>
              <div className="mt-5 space-y-5 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">
                    {getStatusLabel(term.status)}:
                  </span>{" "}
                  {term.status === "current" &&
                    "Still actively used without much irony."}
                  {term.status === "peaking" &&
                    "Very popular right now."}
                  {term.status === "fading" &&
                    "Still understood, but starting to feel overused."}
                  {term.status === "dated" &&
                    "Sounds older unless used knowingly or ironically."}
                  {term.status === "ironic" &&
                    "Mostly used jokingly, exaggerated, or self-aware."}
                </p>
                {term.usageNotes ? <p>{term.usageNotes}</p> : null}
                {term.caution ? (
                  <div className="rounded-lg border bg-card p-4">
                    <p className="font-semibold">Usage caution</p>
                    <p className="mt-1">{term.caution}</p>
                  </div>
                ) : null}
                {term.origin ? (
                  <div>
                    <p className="font-semibold">Origin / context</p>
                    <p className="mt-1">{term.origin}</p>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-20">
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight">
              Quick facts
            </h2>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4 border-b pb-3">
                <span className="font-medium text-muted-foreground">
                  Status
                </span>
                <StatusBadge status={term.status} />
              </div>
              <div className="flex items-center justify-between gap-4 border-b pb-3">
                <span className="font-medium text-muted-foreground">
                  Safety
                </span>
                <SafetyBadge label={term.safetyLabel} />
              </div>
              <div>
                <span className="font-medium text-muted-foreground">
                  Categories
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {term.categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categories/${category.slug}`}
                    >
                      <Badge variant="outline" className="hover:bg-muted">
                        {category.emoji} {category.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl bg-foreground p-6 text-background shadow-sm">
            <h2 className="text-lg font-bold tracking-tight">
              Missing context?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/75">
              Submit a new term, edit, or example. It goes through moderation
              before it touches the index.
            </p>
            <Button asChild variant="secondary" className="mt-5">
              <Link href="/submit">Submit slang</Link>
            </Button>
          </section>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-3 border-b pb-5 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              Related entries
            </h2>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/terms">
                More terms <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.slice(0, 4).map((relatedTerm) => (
              <TermCard key={relatedTerm!.slug} term={relatedTerm!} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
    </>
  );
}
