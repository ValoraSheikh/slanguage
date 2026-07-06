import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container max-w-3xl py-16 text-center space-y-4">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <p className="text-sm text-muted-foreground">
        That page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Home
      </Link>
    </div>
  );
}
