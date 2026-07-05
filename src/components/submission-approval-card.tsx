"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, CopyX, X } from "lucide-react";

import { categories } from "@/data/categories";
import { slugify } from "@/lib/slugify";
import { SAFETY_LABELS, TERM_STATUSES } from "@/lib/status";
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)", scale: 0.97 }}
      transition={{ type: "spring", damping: 24, stiffness: 280, mass: 0.9 }}
      className="overflow-hidden rounded-xl border bg-card shadow-sm"
    >
      <div className="divide-y divide-border">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors sm:px-6 sm:py-5",
            submitting ? "pointer-events-none opacity-60" : "",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <span className="text-lg font-bold">
              {submission.term.charAt(0)}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="truncate text-xl font-semibold tracking-tight">
                {submission.term}
              </h3>
              <span className="hidden shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary sm:inline-block">
                Pending
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {submission.suggestedDefinition}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-muted px-2.5 py-0.5 font-medium text-muted-foreground">
                {category.emoji} {category.name}
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

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
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
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                        className="h-10 rounded-lg border border-input bg-background px-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="grid gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Category *
                      </span>
                      <select
                        name="categorySlug"
                        defaultValue={defaultCategory}
                        required
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.emoji} {c.name}
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
                        defaultValue={submission.suggestedStatus ?? "current"}
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {TERM_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Safety
                      </span>
                      <select
                        name="safetyLabel"
                        defaultValue="clean"
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {SAFETY_LABELS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Tags (comma separated)
                      </span>
                      <input
                        name="tags"
                        defaultValue={submission.suggestedTags.join(", ")}
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Aliases
                      </span>
                      <input
                        name="aliases"
                        placeholder="comma, separated"
                        className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Usage notes
                      </span>
                      <textarea
                        name="usageNotes"
                        defaultValue={submission.notes ?? submission.sourceContext ?? ""}
                        rows={2}
                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Origin / context
                      </span>
                      <textarea
                        name="origin"
                        defaultValue={submission.sourceContext ?? ""}
                        rows={2}
                        className="rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Caution / warning
                    </span>
                    <textarea
                      name="caution"
                      placeholder="Optional warning or context note"
                      rows={1}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>

                  <label className="grid gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Reviewer notes (internal)
                    </span>
                    <input
                      name="reviewerNotes"
                      placeholder="Optional internal note"
                      className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3 border-t px-5 py-4 sm:px-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:pointer-events-none disabled:opacity-60"
                  >
                    <Check className="h-4 w-4" />
                    Approve &amp; publish
                  </button>

                  <form action={rejectAction}>
                    <input type="hidden" name="submissionId" value={submission.id} />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90 transition-colors disabled:pointer-events-none disabled:opacity-60"
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
                      className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted transition-colors disabled:pointer-events-none disabled:opacity-60"
                    >
                      <CopyX className="h-4 w-4" />
                      Mark duplicate
                    </button>
                  </form>
                </div>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
