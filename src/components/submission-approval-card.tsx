"use client";

import { useState } from "react";
import { Check, ChevronDown, CopyX, X } from "lucide-react";

import { categories } from "@/data/categories";
import { slugify } from "@/lib/slugify";
import { TERM_STATUSES } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { SubmissionDTO } from "@/types/slang";

function shortDefinitionFromSubmission(submission: SubmissionDTO) {
  const firstSentence = submission.suggestedDefinition
    .split(/[.!?]/)[0]
    ?.trim();
  const value = firstSentence || submission.suggestedDefinition;
  return value.length > 140 ? `${value.slice(0, 137)}...` : value;
}

export function SubmissionApprovalCard({
  submission,
  approveAction,
  rejectAction,
  duplicateAction,
}: {
  submission: SubmissionDTO;
  approveAction: (formData: FormData) => Promise<void>;
  rejectAction: (formData: FormData) => Promise<void>;
  duplicateAction: (formData: FormData) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const generatedSlug = slugify(submission.term);
  const defaultCategory = categories.find(
    (category) => category.slug === submission.suggestedCategorySlug,
  )
    ? submission.suggestedCategorySlug
    : categories[0].slug;
  const category = categories.find((c) => c.slug === defaultCategory) ?? categories[0];

  return (
    <div className="border">
      <div className="divide-y divide-border">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors sm:px-6 sm:py-5",
            submitting ? "pointer-events-none opacity-60" : "",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-muted">
            <span className="text-lg font-bold">
              {submission.term.charAt(0)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="truncate text-lg font-semibold tracking-tight">
                {submission.term}
              </h3>
              <span className="hidden shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium sm:inline-block">
                Pending
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {submission.suggestedDefinition}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium text-muted-foreground">
                {category.name}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {new Date(submission.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform shrink-0",
              expanded ? "rotate-180" : "",
            )}
          />
        </button>

        {expanded && (
          <div>
            <form action={approveAction} onSubmit={() => setSubmitting(true)}>
              <div className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                <input type="hidden" name="submissionId" value={submission.id} />

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Term *
                    </span>
                    <input
                      name="term"
                      defaultValue={submission.term}
                      required
                      className="h-10 border border-input bg-background px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Slug *
                    </span>
                    <input
                      name="slug"
                      defaultValue={generatedSlug}
                      required
                      className="h-10 border border-input bg-background px-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                </div>

                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    Short definition *
                  </span>
                  <input
                    name="shortDefinition"
                    defaultValue={shortDefinitionFromSubmission(submission)}
                    required
                    className="h-10 border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    Full definition *
                  </span>
                  <textarea
                    name="definition"
                    defaultValue={submission.suggestedDefinition}
                    required
                    rows={3}
                    className="border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>

                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    Examples (one per line)
                  </span>
                  <textarea
                    name="examples"
                    defaultValue={submission.suggestedExamples.join("\n")}
                    rows={2}
                    className="border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Category *
                    </span>
                    <select
                      name="categorySlug"
                      defaultValue={defaultCategory}
                      required
                      className="h-10 border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Status
                    </span>
                    <select
                      name="status"
                      defaultValue="current"
                      className="h-10 border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {TERM_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    Reviewer notes (internal)
                  </span>
                  <input
                    name="reviewerNotes"
                    placeholder="Optional internal note"
                    className="h-10 border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 border-t px-5 py-4 sm:px-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors disabled:pointer-events-none disabled:opacity-60"
                >
                  <Check className="h-4 w-4" />
                  Approve &amp; publish
                </button>

                <form action={rejectAction}>
                  <input type="hidden" name="submissionId" value={submission.id} />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:pointer-events-none disabled:opacity-60"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </button>
                </form>

                <form action={duplicateAction}>
                  <input type="hidden" name="submissionId" value={submission.id} />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:pointer-events-none disabled:opacity-60"
                  >
                    <CopyX className="h-4 w-4" />
                    Mark duplicate
                  </button>
                </form>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
