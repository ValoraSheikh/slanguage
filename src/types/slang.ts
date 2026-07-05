export type TermStatus = "current" | "peaking" | "fading" | "dated" | "ironic";

export type SafetyLabel = "clean" | "mild" | "rude" | "sensitive";

export type SubmissionStatus = "pending" | "approved" | "rejected" | "duplicate";

export type CategoryDTO = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  emoji: string;
  color: string;
};

export type StarterTerm = {
  term: string;
  slug: string;
  aliases?: string[];
  shortDefinition: string;
  definition: string;
  examples: string[];
  categorySlugs: string[];
  tags: string[];
  status: TermStatus;
  safetyLabel: SafetyLabel;
  usageNotes?: string;
  caution?: string;
  origin?: string;
  relatedSlugs?: string[];
};

export type TermDTO = {
  id?: string;
  term: string;
  slug: string;
  aliases: string[];
  shortDefinition: string;
  definition: string;
  examples: string[];
  categories: CategoryDTO[];
  categorySlugs: string[];
  tags: string[];
  status: TermStatus;
  safetyLabel: SafetyLabel;
  usageNotes?: string;
  caution?: string;
  origin?: string;
  relatedTerms: Pick<TermDTO, "term" | "slug" | "shortDefinition" | "status">[];
  approvedAt?: string;
  lastReviewedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SubmissionDTO = {
  id: string;
  term: string;
  suggestedDefinition: string;
  suggestedExamples: string[];
  suggestedCategorySlug: string;
  suggestedTags: string[];
  suggestedStatus?: TermStatus;
  sourceContext?: string;
  notes?: string;
  status: SubmissionStatus;
  reviewedAt?: string;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
};
