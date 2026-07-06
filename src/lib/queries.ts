import { categories as starterCategories } from "@/data/categories";
import { starterTermDTOs } from "@/data/starter-terms";
import { connectToDatabase, hasDatabaseConfigured } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Term } from "@/models/Term";
import type { CategoryDTO, TermDTO } from "@/types/slang";

type CategoryWithCount = CategoryDTO & { count: number };

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toPlainId(value: unknown) {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "toString" in value) {
    return String(value);
  }
  return undefined;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown database error";
}

function serializeCategory(category: any): CategoryDTO {
  return {
    id: toPlainId(category._id),
    name: category.name,
    slug: category.slug,
    description: category.description,
    iconName: category.iconName,
  };
}

function serializeTerm(term: any): TermDTO {
  const populatedCategories = Array.isArray(term.categories)
    ? term.categories.filter(
        (category: any) =>
          category && typeof category === "object" && "slug" in category,
      )
    : [];

  const relatedTerms = Array.isArray(term.relatedTerms)
    ? term.relatedTerms
        .filter(
          (related: any) =>
            related && typeof related === "object" && "slug" in related,
        )
        .map((related: any) => ({
          term: related.term,
          slug: related.slug,
          shortDefinition: related.shortDefinition,
          status: related.status,
        }))
    : [];

  return {
    id: toPlainId(term._id),
    term: term.term,
    slug: term.slug,
    shortDefinition: term.shortDefinition,
    definition: term.definition,
    examples: term.examples ?? [],
    categories: populatedCategories.map(serializeCategory),
    categorySlugs: populatedCategories.map((category: any) => category.slug),
    status: term.status,
    relatedTerms,
    approvedAt: term.approvedAt?.toISOString?.(),
    lastReviewedAt: term.lastReviewedAt?.toISOString?.(),
    createdAt: term.createdAt?.toISOString?.(),
    updatedAt: term.updatedAt?.toISOString?.(),
  };
}

async function readTermsFromDatabase(
  filter: Record<string, unknown> = {},
  limit?: number,
) {
  await connectToDatabase();
  const query = Term.find({ isPublished: true, ...filter })
    .populate("categories")
    .populate({
      path: "relatedTerms",
      select: "term slug shortDefinition status",
    })
    .sort({ term: 1 });

  if (limit) query.limit(limit);

  const terms = await query.lean();
  return terms.map(serializeTerm);
}

export async function getAllTerms() {
  if (!hasDatabaseConfigured()) return starterTermDTOs;

  try {
    const terms = await readTermsFromDatabase();
    return terms.length ? terms : starterTermDTOs;
  } catch (error) {
    console.warn(`Falling back to starter terms: ${getErrorMessage(error)}`);
    return starterTermDTOs;
  }
}

export async function getFeaturedTerms(limit = 8) {
  const terms = await getAllTerms();
  const preferred = [
    "rizz",
    "delulu",
    "aura",
    "no-cap",
    "ate",
    "cooked",
    "brainrot",
    "situationship",
  ];
  const featured = preferred
    .map((slug) => terms.find((term) => term.slug === slug))
    .filter(Boolean) as TermDTO[];

  return [
    ...featured,
    ...terms.filter((term) => !preferred.includes(term.slug)),
  ].slice(0, limit);
}

export async function getTermBySlug(slug: string) {
  if (!hasDatabaseConfigured()) {
    return starterTermDTOs.find((term) => term.slug === slug) ?? null;
  }

  try {
    await connectToDatabase();
    const term = await Term.findOne({ slug, isPublished: true })
      .populate("categories")
      .populate({
        path: "relatedTerms",
        select: "term slug shortDefinition status",
      })
      .lean();

    return term
      ? serializeTerm(term)
      : (starterTermDTOs.find((fallback) => fallback.slug === slug) ?? null);
  } catch (error) {
    console.warn(
      `Falling back while reading term ${slug}: ${getErrorMessage(error)}`,
    );
    return starterTermDTOs.find((term) => term.slug === slug) ?? null;
  }
}

export async function searchTerms(query: string, limit = 20) {
  const normalized = query.trim();

  if (!normalized) {
    const terms = await getAllTerms();
    return terms.slice(0, limit);
  }

  if (!hasDatabaseConfigured()) {
    return searchStarterTerms(normalized, limit);
  }

  try {
    await connectToDatabase();
    const regex = new RegExp(escapeRegExp(normalized), "i");
    const matchingCategories = await Category.find({
      $or: [{ name: regex }, { slug: regex }],
    })
      .select("_id")
      .lean();
    const categoryIds = matchingCategories.map((category) => category._id);

    const terms = await Term.find({
      isPublished: true,
      $or: [
        { term: regex },
        { slug: regex },
        { shortDefinition: regex },
        { definition: regex },
        ...(categoryIds.length ? [{ categories: { $in: categoryIds } }] : []),
      ],
    })
      .populate("categories")
      .populate({
        path: "relatedTerms",
        select: "term slug shortDefinition status",
      })
      .limit(limit)
      .lean();

    const serialized = terms.map(serializeTerm);
    return serialized.length
      ? serialized
      : searchStarterTerms(normalized, limit);
  } catch (error) {
    console.warn(
      `Falling back while searching terms: ${getErrorMessage(error)}`,
    );
    return searchStarterTerms(normalized, limit);
  }
}

function searchStarterTerms(query: string, limit: number) {
  const lower = query.toLowerCase();
  return starterTermDTOs
    .filter((term) => {
      const haystack = [
        term.term,
        term.slug,
        term.shortDefinition,
        term.definition,
        ...term.categorySlugs,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(lower);
    })
    .slice(0, limit);
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  const terms = await getAllTerms();

  if (!hasDatabaseConfigured()) {
    return countCategories(starterCategories, terms);
  }

  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    const serialized = categories.map(serializeCategory);
    return countCategories(
      serialized.length ? serialized : starterCategories,
      terms,
    );
  } catch (error) {
    console.warn(
      `Falling back while reading categories: ${getErrorMessage(error)}`,
    );
    return countCategories(starterCategories, terms);
  }
}

function countCategories(categories: CategoryDTO[], terms: TermDTO[]) {
  return categories.map((category) => ({
    ...category,
    count: terms.filter((term) => term.categorySlugs.includes(category.slug))
      .length,
  }));
}

export async function getCategoryWithTerms(slug: string) {
  const categories = await getCategoriesWithCounts();
  const category = categories.find((item) => item.slug === slug) ?? null;
  if (!category) return null;

  const terms = (await getAllTerms()).filter((term) =>
    term.categorySlugs.includes(slug),
  );
  return { category, terms };
}

export async function getRandomTerm() {
  const terms = await getAllTerms();
  if (!terms.length) return null;
  return terms[Math.floor(Math.random() * terms.length)];
}

export async function getWordOfTheDay() {
  const terms = await getAllTerms();
  if (!terms.length) return null;

  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Number(new Date()) - Number(start);
  const day = Math.floor(diff / 86_400_000);
  return terms[day % terms.length];
}

export async function getRecentlyAdded(limit = 8) {
  const terms = await getAllTerms();
  return [...terms]
    .filter((t) => t.approvedAt)
    .sort((a, b) => new Date(b.approvedAt!).getTime() - new Date(a.approvedAt!).getTime())
    .slice(0, limit);
}
