import type { TermDTO } from "@/types/slang";

export function generateTermStructuredData(term: TermDTO, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.shortDefinition,
    termCode: term.slug,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Slanguage — Gen Z Slang Field Guide",
      url: "https://slanguage.local",
    },
    url,
    ...(term.aliases.length
      ? { alternateName: term.aliases }
      : {}),
    ...(term.categorySlugs.length
      ? { about: term.categorySlugs.map((s) => ({ "@type": "Thing", name: s })) }
      : {}),
  };
}

export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Slanguage",
    description:
      "A curated internet slang field guide with definitions, examples, vibe checks, and moderated submissions.",
    url: "https://slanguage.local",
  };
}
