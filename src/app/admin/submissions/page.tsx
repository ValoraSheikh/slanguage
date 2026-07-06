import type { Metadata } from "next";
import { LogOut } from "lucide-react";

import { SubmissionApprovalCard } from "@/components/submission-approval-card";
import {
  approveSubmissionAction,
  logoutAction,
  markDuplicateAction,
  rejectSubmissionAction,
} from "@/lib/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getSubmissionsByStatus } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Admin Submissions",
};

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    approved?: string;
    rejected?: string;
    duplicate?: string;
    error?: string;
  }>;
}) {
  await requireAdmin();
  const resolvedSearchParams = await searchParams;
  const submissions = await getSubmissionsByStatus("pending");

  return (
    <div className="container max-w-3xl py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Submissions</h1>
          <p className="text-sm text-muted-foreground">
            {submissions.length} pending
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-3 w-3" /> Logout
          </button>
        </form>
      </div>

      {resolvedSearchParams?.approved && (
        <p className="text-sm">Approved and published.</p>
      )}
      {resolvedSearchParams?.rejected && (
        <p className="text-sm">Submission rejected.</p>
      )}
      {resolvedSearchParams?.duplicate && (
        <p className="text-sm">Submission marked duplicate.</p>
      )}
      {resolvedSearchParams?.error && (
        <p className="text-sm text-destructive">
          Missing required approval fields.
        </p>
      )}

      {submissions.length ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <SubmissionApprovalCard
              key={submission.id}
              submission={submission}
              approveAction={approveSubmissionAction}
              rejectAction={rejectSubmissionAction}
              duplicateAction={markDuplicateAction}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
          Queue is empty.
        </p>
      )}
    </div>
  );
}
