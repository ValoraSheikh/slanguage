import type { TermDTO } from "@/types/slang";

export function generateTermStructuredData(
  term: TermDTO,
  termUrl: string,
  siteUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.shortDefinition,
    termCode: term.slug,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Slanguage",
      url: siteUrl,
    },
    url: termUrl,
    ...(term.categorySlugs.length
      ? { about: term.categorySlugs.map((s) => ({ "@type": "Thing", name: s })) }
      : {}),
  };
}

export function generateWebSiteStructuredData(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Slanguage",
    description:
      "A curated reference for internet slang with definitions, examples, and moderated submissions.",
    url: siteUrl,
  };
}
