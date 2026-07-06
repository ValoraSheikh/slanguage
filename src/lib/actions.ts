"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { categories } from "@/data/categories";
import {
  clearAdminCookie,
  requireAdmin,
  setAdminCookie,
} from "@/lib/admin-auth";
import { connectToDatabase } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import { Category } from "@/models/Category";
import { Submission } from "@/models/Submission";
import { Term } from "@/models/Term";
import type { TermStatus } from "@/types/slang";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function ensureCategory(slug: string) {
  const fallback =
    categories.find((category) => category.slug === slug) ?? categories[0];
  return Category.findOneAndUpdate(
    { slug: fallback.slug },
    {
      name: fallback.name,
      slug: fallback.slug,
      description: fallback.description,
      iconName: fallback.iconName,
    },
    { upsert: true, new: true },
  );
}

export async function createSubmissionAction(formData: FormData) {
  const term = getString(formData, "term");
  const suggestedDefinition = getString(formData, "suggestedDefinition");
  const suggestedCategorySlug = getString(formData, "suggestedCategorySlug");

  if (!term || !suggestedDefinition || !suggestedCategorySlug) {
    redirect("/submit?error=missing");
  }

  try {
    await connectToDatabase();
    await Submission.create({
      term,
      suggestedDefinition,
      suggestedExamples: splitLines(getString(formData, "suggestedExamples")),
      suggestedCategorySlug,
      status: "pending",
    });
  } catch (error) {
    console.error("Could not create submission:", error);
    redirect("/submit?error=database");
  }

  revalidatePath("/admin/submissions");
  redirect("/submit?submitted=1");
}

export async function loginAction(formData: FormData) {
  const password = getString(formData, "password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    redirect("/admin/login?error=1");
  }

  await setAdminCookie();
  redirect("/admin/submissions");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function approveSubmissionAction(formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const submissionId = getString(formData, "submissionId");
  const term = getString(formData, "term");
  const slug = slugify(getString(formData, "slug") || term);
  const shortDefinition = getString(formData, "shortDefinition");
  const definition = getString(formData, "definition");
  const categorySlug = getString(formData, "categorySlug");
  const status = (getString(formData, "status") || "current") as TermStatus;

  if (
    !submissionId ||
    !term ||
    !slug ||
    !shortDefinition ||
    !definition ||
    !categorySlug
  ) {
    redirect("/admin/submissions?error=missing");
  }

  const category = await ensureCategory(categorySlug);

  await Term.findOneAndUpdate(
    { slug },
    {
      term,
      slug,
      shortDefinition,
      definition,
      examples: splitLines(getString(formData, "examples")),
      categories: [category._id],
      status,
      isPublished: true,
      approvedAt: new Date(),
      lastReviewedAt: new Date(),
    },
    { upsert: true, new: true },
  );

  await Submission.findByIdAndUpdate(submissionId, {
    status: "approved",
    reviewedAt: new Date(),
    reviewerNotes: getString(formData, "reviewerNotes") || undefined,
  });

  revalidatePath("/");
  revalidatePath("/terms");
  revalidatePath(`/terms/${slug}`);
  revalidatePath("/categories");
  revalidatePath(`/categories/${categorySlug}`);
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?approved=1");
}

export async function rejectSubmissionAction(formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const submissionId = getString(formData, "submissionId");
  await Submission.findByIdAndUpdate(submissionId, {
    status: "rejected",
    reviewedAt: new Date(),
    reviewerNotes: getString(formData, "reviewerNotes") || undefined,
  });

  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?rejected=1");
}

export async function markDuplicateAction(formData: FormData) {
  await requireAdmin();
  await connectToDatabase();

  const submissionId = getString(formData, "submissionId");
  await Submission.findByIdAndUpdate(submissionId, {
    status: "duplicate",
    reviewedAt: new Date(),
    reviewerNotes: getString(formData, "reviewerNotes") || undefined,
  });

  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?duplicate=1");
}
