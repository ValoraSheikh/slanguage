"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Send } from "lucide-react";

export function SubmitStatusButton({
  idleText = "Submit for review",
  pendingText = "Sending",
}: {
  idleText?: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-60 disabled:pointer-events-none"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingText}...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          {idleText}
        </>
      )}
    </button>
  );
}
