import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { SubmitStatusButton } from "@/components/submit-status-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/categories";
import { createSubmissionAction } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Submit",
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
    <div className="container max-w-2xl py-10 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Submit</h1>
      <p className="text-sm text-muted-foreground">
        Anonymous. Moderated. No instant publishing.
      </p>

      {submitted ? (
        <div className="flex gap-3 border p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-muted-foreground" />
          <p className="text-sm">
            Submitted for review. If it passes, it&apos;ll show up in the index.
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive">
          {error === "missing"
            ? "Please fill the required fields."
            : "Could not submit. Check the database connection."}
        </p>
      ) : null}

      <form action={createSubmissionAction} className="space-y-4">
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
            placeholder="Explain what it means."
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="suggestedExamples">Examples</Label>
          <Textarea
            id="suggestedExamples"
            name="suggestedExamples"
            placeholder={'One example per line\n"That outfit ate."'}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="suggestedCategorySlug">Category *</Label>
          <select
            id="suggestedCategorySlug"
            name="suggestedCategorySlug"
            required
            className="h-10 border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            defaultValue=""
          >
            <option value="" disabled>
              Pick a category
            </option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <SubmitStatusButton
          idleText="Submit"
          pendingText="Sending"
        />
      </form>
    </div>
  );
}
