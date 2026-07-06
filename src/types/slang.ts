export type TermStatus = "current" | "peaking" | "fading" | "dated" | "ironic";

export type SubmissionStatus = "pending" | "approved" | "rejected" | "duplicate";

export type CategoryDTO = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
};

export type StarterTerm = {
  term: string;
  slug: string;
  aliases?: string[];
  shortDefinition: string;
  definition: string;
  examples: string[];
  categorySlugs: string[];
  tags?: string[];
  status: TermStatus;
  safetyLabel?: string;
  usageNotes?: string;
  caution?: string;
  origin?: string;
  relatedSlugs?: string[];
};

export type TermDTO = {
  id?: string;
  term: string;
  slug: string;
  shortDefinition: string;
  definition: string;
  examples: string[];
  categories: CategoryDTO[];
  categorySlugs: string[];
  status: TermStatus;
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
  status: SubmissionStatus;
  reviewedAt?: string;
  reviewerNotes?: string;
  createdAt: string;
  updatedAt: string;
};
