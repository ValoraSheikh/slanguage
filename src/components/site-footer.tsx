import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-lg font-semibold tracking-tight">Slanguage</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A curated slang field guide for people who understand the internet
            until one new word ruins the group chat.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            href="/terms"
          >
            Index
          </Link>
          <Link
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            href="/submit"
          >
            Submit
          </Link>
        </div>
      </div>
    </footer>
  );
}
