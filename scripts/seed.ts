import { config } from "dotenv";
import mongoose from "mongoose";

config({ path: ".env.local" });
config({ path: ".env" });

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is required. Add it to .env.local or .env before running npm run seed.",
    );
  }

  const { categories } = await import("@/data/categories");
  const { starterTerms } = await import("@/data/starter-terms");
  const { connectToDatabase } = await import("@/lib/mongodb");
  const { Category } = await import("@/models/Category");
  const { Term } = await import("@/models/Term");

  await connectToDatabase();
  console.log("Connected to MongoDB");

  for (const category of categories) {
    await Category.findOneAndUpdate({ slug: category.slug }, category, {
      upsert: true,
      new: true,
    });
  }

  const categoryDocs = await Category.find({}).lean();
  const categoryBySlug = new Map(
    categoryDocs.map((category) => [category.slug, category._id]),
  );

  for (const term of starterTerms) {
    const categoryIds = term.categorySlugs
      .map((slug) => categoryBySlug.get(slug))
      .filter(Boolean);

    await Term.findOneAndUpdate(
      { slug: term.slug },
      {
        term: term.term,
        slug: term.slug,
        shortDefinition: term.shortDefinition,
        definition: term.definition,
        examples: term.examples,
        categories: categoryIds,
        status: term.status,
        isPublished: true,
        approvedAt: new Date(),
        lastReviewedAt: new Date(),
      },
      { upsert: true, new: true },
    );
  }

  const termDocs = await Term.find({}).select("_id slug").lean();
  const termBySlug = new Map(termDocs.map((term) => [term.slug, term._id]));

  for (const term of starterTerms) {
    const relatedTermIds = (term.relatedSlugs ?? [])
      .map((slug) => termBySlug.get(slug))
      .filter(Boolean);

    await Term.findOneAndUpdate(
      { slug: term.slug },
      { relatedTerms: relatedTermIds },
    );
  }

  const categoryCount = await Category.countDocuments();
  const termCount = await Term.countDocuments({ isPublished: true });

  console.log(
    `Seed complete: ${categoryCount} categories, ${termCount} published terms`,
  );
}

seed()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
