import Link from "next/link";
import { MessageCircle, Shuffle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-lg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MessageCircle className="h-4 w-4" />
          </span>
          Slanguage
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/terms">Index</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/categories">Categories</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/api/random">
              <Shuffle className="h-3.5 w-3.5" /> Random
            </Link>
          </Button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2">
          <span className="md:hidden">
            <ThemeToggle />
          </span>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/submit">Submit slang</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
