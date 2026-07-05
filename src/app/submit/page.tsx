import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import { SubmitStatusButton } from "@/components/submit-status-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/categories";
import { createSubmissionAction } from "@/lib/actions";
import { TERM_STATUSES } from "@/lib/status";

export const metadata: Metadata = {
  title: "Submit Slang",
  description: "Submit a slang term to Slanguage for review.",
};

export default async function SubmitPage({
  searchParams,
}: {
  searchParams?: Promise<{ submitted?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const submitted = resolved?.submitted === "1";
  const error = resolved?.error;

  return (
    <div className="container grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <aside className="lg:sticky lg:top-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" /> moderated
        </div>
        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Submit slang
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          No account. No email. No instant publishing. Send the term and we&apos;ll
          clean it up before it hits the index.
        </p>

        <div className="mt-8 rounded-xl border bg-muted/30 p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">
            Approval flow
          </h2>
          <ol className="mt-4 space-y-3 text-sm font-medium">
            <li>01 — Submit anonymously</li>
            <li>02 — Admin edits context</li>
            <li>03 — Approve, reject, or mark duplicate</li>
            <li>04 — Published as an entry</li>
          </ol>
        </div>
      </aside>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl">
            Register a new entry
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {submitted ? (
            <div className="mb-6 rounded-lg border bg-muted/50 p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">
                    Bet. Your slang is in the approval queue.
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    If it passes the vibe check, it&apos;ll show up after admin review.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-medium text-destructive">
              {error === "missing"
                ? "Please fill the required fields."
                : "Could not submit right now. Check MongoDB config and try again."}
            </div>
          ) : null}

          <form action={createSubmissionAction} className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="term">Term *</Label>
              <Input
                id="term"
                name="term"
                placeholder="rizz, delulu, aura..."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="suggestedDefinition">Definition *</Label>
              <Textarea
                id="suggestedDefinition"
                name="suggestedDefinition"
                placeholder="Explain it like someone saw it in a group chat and panicked."
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="suggestedExamples">Example sentences</Label>
              <Textarea
                id="suggestedExamples"
                name="suggestedExamples"
                placeholder={'One example per line\n"That outfit ate."'}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="suggestedCategorySlug">Category *</Label>
                <select
                  id="suggestedCategorySlug"
                  name="suggestedCategorySlug"
                  required
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick a vibe
                  </option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.emoji} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="suggestedStatus">How current is it?</Label>
                <select
                  id="suggestedStatus"
                  name="suggestedStatus"
                  className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="current"
                >
                  {TERM_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="suggestedTags">Tags</Label>
              <Input
                id="suggestedTags"
                name="suggestedTags"
                placeholder="dating, TikTok, meme"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sourceContext">Where did you see it?</Label>
              <Input
                id="sourceContext"
                name="sourceContext"
                placeholder="TikTok, Discord, school, X, group chat..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Extra context</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any origin, warning, or usage notes we should know?"
              />
            </div>

            <SubmitStatusButton
              idleText="Submit for approval"
              pendingText="Sending"
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
