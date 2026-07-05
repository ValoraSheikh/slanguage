import type { Metadata } from "next";
import { Inbox, LogOut, ScrollText } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    <div className="container py-10">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-20 lg:w-80">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <ScrollText className="h-6 w-6 text-muted-foreground" />
            </div>

            <p className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-3">
              moderation queue
            </p>
            <h1 className="text-3xl font-bold tracking-tight">
              Pending slang
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Edit before approving. Nothing from users publishes automatically.
            </p>

            <div className="mt-5 rounded-lg bg-muted/50 px-4 py-3">
              <p className="text-sm font-medium text-muted-foreground">
                {submissions.length} submission{submissions.length !== 1 ? "s" : ""} in queue
              </p>
            </div>

            <form action={logoutAction} className="mt-4">
              <Button type="submit" variant="outline" className="w-full">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </form>
          </div>
        </aside>

        <div>
          {resolvedSearchParams?.approved ? (
            <div className="mb-5 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              Approved and published. Vibe check passed.
            </div>
          ) : null}
          {resolvedSearchParams?.rejected ? (
            <div className="mb-5 rounded-lg bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 border border-amber-200">
              Submission rejected.
            </div>
          ) : null}
          {resolvedSearchParams?.duplicate ? (
            <div className="mb-5 rounded-lg bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800 border border-sky-200">
              Submission marked duplicate.
            </div>
          ) : null}
          {resolvedSearchParams?.error ? (
            <div className="mb-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive border border-destructive/30">
              Missing required approval fields.
            </div>
          ) : null}

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
            <div className="rounded-xl border bg-card px-6 py-16 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                <Inbox className="h-7 w-7 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                Queue is empty
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                No pending slang. The internet is quiet for once.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
