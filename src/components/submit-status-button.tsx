"use client";

import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
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
      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-60 disabled:pointer-events-none"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={pendingText}
              initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
              transition={{ duration: 0.2 }}
            >
              {pendingText}
            </motion.span>
          </AnimatePresence>
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={idleText}
              initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
              transition={{ duration: 0.2 }}
            >
              {idleText}
            </motion.span>
          </AnimatePresence>
        </>
      )}
    </button>
  );
}
