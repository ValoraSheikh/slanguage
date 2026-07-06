"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { StatusDot } from "@/components/status-badge";
import type { TermDTO } from "@/types/slang";

export function SearchBox({
  defaultValue = "",
  large = false,
}: {
  defaultValue?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<TermDTO[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timeout = window.setTimeout(async () => {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}&limit=8`,
      );
      if (!response.ok) return;
      const data = (await response.json()) as { results: TermDTO[] };
      setResults(data.results);
      setOpen(data.results.length > 0);
    }, 160);

    return () => window.clearTimeout(timeout);
  }, [query]);

  function submitSearch() {
    const trimmed = query.trim();
    router.push(
      trimmed ? `/terms?query=${encodeURIComponent(trimmed)}` : "/terms",
    );
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex items-center border-b">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submitSearch();
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder="Search slang..."
          className={`w-full border-0 bg-transparent px-3 outline-none placeholder:text-muted-foreground ${
            large ? "h-12 text-base" : "h-10 text-sm"
          }`}
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 border bg-background">
          {results.map((term) => (
            <Link
              key={term.slug}
              href={`/terms/${term.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-4 border-b px-4 py-3 last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{term.term}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {term.shortDefinition}
                </p>
              </div>
              <StatusDot status={term.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
