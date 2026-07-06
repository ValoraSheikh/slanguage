import { connectToDatabase } from "@/lib/mongodb";
import { Submission } from "@/models/Submission";
import type { SubmissionDTO } from "@/types/slang";

function serializeSubmission(submission: any): SubmissionDTO {
  return {
    id: String(submission._id),
    term: submission.term,
    suggestedDefinition: submission.suggestedDefinition,
    suggestedExamples: submission.suggestedExamples ?? [],
    suggestedCategorySlug: submission.suggestedCategorySlug,
    status: submission.status,
    reviewedAt: submission.reviewedAt?.toISOString?.(),
    reviewerNotes: submission.reviewerNotes,
    createdAt: submission.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: submission.updatedAt?.toISOString?.() ?? new Date().toISOString(),
  };
}

export async function getSubmissionsByStatus(status = "pending") {
  await connectToDatabase();
  const submissions = await Submission.find({ status }).sort({ createdAt: -1 }).lean();
  return submissions.map(serializeSubmission);
}
