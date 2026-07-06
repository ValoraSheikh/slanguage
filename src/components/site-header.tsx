import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-12 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Slanguage
        </Link>

        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Index
          </Link>
          <Link href="/categories" className="hover:text-foreground transition-colors">
            Categories
          </Link>
          <Link href="/submit" className="hover:text-foreground transition-colors">
            Submit
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
