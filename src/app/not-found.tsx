import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          That slang entry doesn&apos;t exist yet. Try searching or submitting it.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Browse index <ArrowLeft className="h-4 w-4" />
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium shadow-sm hover:bg-muted"
          >
            Submit slang
          </Link>
        </div>
      </div>
    </div>
  );
}
