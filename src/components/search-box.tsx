"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Album02Icon,
  ArrowRight02Icon,
  Search01Icon,
  SparklesIcon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons";

import { StatusBadge } from "@/components/status-badge";
import type { TermDTO } from "@/types/slang";

type PlaceholderConfig = {
  id: number;
  placeholder: string;
  icon: typeof Search01Icon;
  hint: string;
};

const placeholderOptions: PlaceholderConfig[] = [
  {
    id: 1,
    placeholder: "Search slang, meanings, acronyms...",
    icon: Search01Icon,
    hint: "Try rizz, delulu, brainrot, or any word you heard and panicked.",
  },
  {
    id: 2,
    placeholder: "Decode rizz, delulu, iykyk...",
    icon: SparklesIcon,
    hint: "Type what you think it means — we'll find the match.",
  },
  {
    id: 3,
    placeholder: "Find dating, meme, Discord slang...",
    icon: Album02Icon,
    hint: "Search by meaning if you only remember the vibe.",
  },
  {
    id: 4,
    placeholder: "Check if a word is already cooked...",
    icon: SparklesIcon,
    hint: "Type a word to see if it's current, fading, or already dead.",
  },
];

function AnimatedPlaceholder({ text }: { text: string }) {
  const letters = text.split("");
  return (
    <motion.span className="inline-flex overflow-hidden">
      {letters.map((letter, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={{ opacity: 0, rotateX: "80deg", y: 8, filter: "blur(3px)" }}
          exit={{ opacity: 0, rotateX: "-80deg", filter: "blur(3px)", y: -8 }}
          animate={{ opacity: 1, rotateX: "0deg", y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.015 * index,
            type: "spring",
            damping: 16,
            stiffness: 240,
            mass: 1.2,
          }}
          style={{ willChange: "transform" }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function SearchBox({
  defaultValue = "",
  large = false,
}: {
  defaultValue?: string;
  large?: boolean;
}) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState(defaultValue);
  const [results, setResults] = useState<TermDTO[]>([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentConfig = placeholderOptions[activeIndex];

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    const timeout = window.setTimeout(async () => {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(trimmed)}&limit=8`,
      );
      if (!response.ok) return;
      const data = (await response.json()) as { results: TermDTO[] };
      setResults(data.results);
      setOpen(true);
    }, 160);

    return () => window.clearTimeout(timeout);
  }, [query]);

  function submitSearch() {
    const trimmed = query.trim();
    router.push(
      trimmed ? `/terms?query=${encodeURIComponent(trimmed)}` : "/terms",
    );
    setOpen(false);
    setFocused(false);
  }

  const suggestions = query.trim().length >= 2 ? results : [];
  const IconComponent = currentConfig.icon;

  return (
    <div ref={wrapperRef} className="relative w-full not-prose">
      <motion.div
        layout
        transition={{ type: "spring", damping: 24, stiffness: 300, mass: 0.9 }}
        className={`bg-background w-full flex items-center rounded-2xl px-1 py-1 ring-1 transition-all duration-300 ${
          focused
            ? "ring-2 ring-primary/20 shadow-lg shadow-primary/5"
            : "ring-border hover:ring-border/80 hover:shadow-sm"
        }`}
      >
        <motion.button
          type="button"
          aria-label="Change search mode"
          onClick={() =>
            setActiveIndex((prev) => (prev + 1) % placeholderOptions.length)
          }
          whileTap={{ scale: 0.9 }}
          className="bg-muted p-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors overflow-hidden cursor-pointer shrink-0"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentConfig.id}
              exit={{ filter: "blur(5px)", opacity: 0 }}
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.35 }}
              className="flex items-center justify-center gap-1"
            >
              <HugeiconsIcon
                icon={IconComponent}
                className="w-5 h-5 text-foreground"
              />
            </motion.div>
          </AnimatePresence>
          <HugeiconsIcon
            icon={UnfoldMoreIcon}
            className="w-3 h-3 text-muted-foreground"
          />
        </motion.button>

        <div className="flex-1 relative min-w-0">
          {!query ? (
            <div className="absolute left-0 top-0 w-full h-full flex items-center pointer-events-none pl-2 bg-transparent overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentConfig.id}
                  className={
                    large
                      ? "text-base md:text-lg text-muted-foreground/60"
                      : "text-sm text-muted-foreground/60"
                  }
                >
                  <AnimatedPlaceholder text={currentConfig.placeholder} />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              setFocused(true);
              if (suggestions.length) setOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") submitSearch();
              if (event.key === "Escape") {
                setOpen(false);
                setFocused(false);
                inputRef.current?.blur();
              }
            }}
            className={`w-full border-0 bg-transparent shadow-none outline-none pl-2 ${
              !query ? "caret-transparent" : ""
            } ${large ? "h-14 text-base md:text-lg" : "h-10 text-sm"}`}
          />
        </div>

        <button
          type="button"
          onClick={submitSearch}
          className="bg-foreground text-background py-2 px-4 rounded-xl flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform hover:bg-foreground/90"
        >
          <HugeiconsIcon icon={ArrowRight02Icon} className="h-4 w-4" />
        </button>
      </motion.div>

      <AnimatePresence>
        {focused && !query ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-2 px-1 text-xs text-muted-foreground/70"
          >
            {currentConfig.hint}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {open && suggestions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          className="absolute left-0 right-0 top-full z-40 mt-3 overflow-hidden rounded-xl border bg-card shadow-xl"
        >
          {suggestions.map((term) => (
            <Link
              key={term.slug}
              href={`/terms/${term.slug}`}
              onClick={() => {
                setOpen(false);
                setFocused(false);
              }}
              className="flex items-center justify-between gap-4 border-b border-border/50 p-4 last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-semibold tracking-tight">{term.term}</p>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                  {term.shortDefinition}
                </p>
              </div>
              <StatusBadge status={term.status} />
            </Link>
          ))}
        </motion.div>
      ) : null}
    </div>
  );
}
