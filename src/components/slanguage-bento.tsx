"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  Fire02Icon,
  Folder02Icon,
  Message01Icon,
  Search01Icon,
  Tick01Icon,
  BarChartIcon,
} from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";
import type { TermDTO } from "@/types/slang";

type BentoProps = {
  termCount: number;
  categoryCount: number;
  featuredTerms: TermDTO[];
};

type TabConfig = {
  id: "index" | "search" | "status" | "queue";
  label: string;
  icon: typeof DashboardSquare01Icon;
  header: string;
  description: string;
  badge?: string;
};

const TABS: TabConfig[] = [
  {
    id: "index",
    label: "Index",
    icon: DashboardSquare01Icon,
    header: "Curated slang index",
    description:
      "Edited definitions with examples and vibe checks.",
  },
  {
    id: "search",
    label: "Search",
    icon: Search01Icon,
    header: "Meaning-first lookup",
    description:
      "Find by term, alias, tag, category, or definition.",
  },
  {
    id: "status",
    label: "Vibe",
    icon: Fire02Icon,
    header: "Currentness labels",
    description:
      "Current, peaking, fading, dated, or ironic.",
    badge: "5",
  },
  {
    id: "queue",
    label: "Queue",
    icon: Message01Icon,
    header: "Moderated submissions",
    description:
      "Users submit, nothing publishes until review.",
  },
];

export function SlanguageBento({
  termCount,
  categoryCount,
  featuredTerms,
}: BentoProps) {
  const [activeTab, setActiveTab] = useState<TabConfig>(TABS[0]);

  const content = useMemo(() => {
    switch (activeTab.id) {
      case "index":
        return (
          <IndexPanel termCount={termCount} categoryCount={categoryCount} />
        );
      case "search":
        return <SearchPanel featuredTerms={featuredTerms} />;
      case "status":
        return <StatusPanel />;
      case "queue":
        return <QueuePanel />;
    }
  }, [activeTab.id, categoryCount, featuredTerms, termCount]);

  return (
    <div className="w-full antialiased not-prose">
      <div className="group relative w-full max-w-xl overflow-hidden rounded-3xl sm:rounded-4xl border bg-card shadow-2xl shadow-primary/5 transition-all duration-500 hover:shadow-primary/10 hover:-translate-y-1">
        <div className="p-4 sm:p-6 space-y-1.5 z-10 relative">
          <h2 className="text-xs text-muted-foreground uppercase tracking-wider">
            Slanguage OS
          </h2>
          <p className="text-lg sm:text-2xl text-foreground font-medium leading-snug max-w-[480px]">
            A dictionary with a moderation room attached.
          </p>
        </div>

        <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden rounded-2xl sm:rounded-[2rem]">
          <div className="absolute top-16 left-16 w-full h-full bg-muted rounded-3xl border border-border/50 opacity-80" />
          <div className="absolute top-8 left-24 w-full h-full bg-background rounded-tl-3xl shadow-xl flex flex-col overflow-hidden ring-1 ring-border">
            <div className="px-5 py-4 rounded-tl-3xl border-b border-border/70 flex items-center relative backdrop-blur-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground/50 uppercase tracking-wider">
                  Field guide
                </span>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-36 border-r border-border/30 p-2 flex flex-col gap-1 pt-6 bg-muted/5">
                <LayoutGroup>
                  {TABS.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "relative flex items-center gap-1.5 p-2 rounded-xl text-xs transition-colors cursor-pointer",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <HugeiconsIcon
                          icon={tab.icon}
                          size={14}
                          className="z-20 shrink-0 relative"
                        />
                        <span className="truncate z-20 relative font-medium">
                          {tab.label}
                        </span>
                        {tab.badge && (
                          <span
                            className={cn(
                              "ml-auto text-[8px] leading-none py-0.5 px-1 rounded-md tabular-nums transition-all z-20 relative",
                              isActive
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "bg-muted text-muted-foreground border border-transparent",
                            )}
                          >
                            {tab.badge}
                          </span>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="bento-sidebar-pill"
                            className="absolute left-0 w-[2px] h-4 rounded-full bg-primary z-30 border border-primary/20"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="bento-bg-indicator"
                            className="absolute inset-0 rounded-lg bg-muted border border-border/40"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </LayoutGroup>
              </div>

              <div className="flex-1 bg-background p-5 pt-6 flex flex-col gap-4 overflow-hidden relative">
                <header className="flex flex-col gap-0.5">
                  <h3 className="text-xs font-semibold text-foreground tracking-tight line-clamp-1 uppercase opacity-60">
                    {activeTab.header}
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-normal leading-tight line-clamp-1">
                    {activeTab.description}
                  </p>
                </header>

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1"
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndexPanel({
  termCount,
  categoryCount,
}: {
  termCount: number;
  categoryCount: number;
}) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="relative p-3.5 rounded-xl border border-border/40 bg-gradient-to-br from-background to-muted/20 overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium text-muted-foreground">
              Library stats
            </span>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="text-xl font-medium tracking-tight text-foreground">
                {termCount}
              </span>
              <span className="text-[9px] text-muted-foreground block">terms</span>
            </div>
            <div>
              <span className="text-xl font-medium tracking-tight text-foreground">
                {categoryCount}
              </span>
              <span className="text-[9px] text-muted-foreground block">categories</span>
            </div>
          </div>
        </div>
        <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12">
          <HugeiconsIcon icon={BarChartIcon} size={64} />
        </div>
      </div>
      <div className="mt-auto p-3 rounded-xl bg-muted/20 border border-border/30">
        <span className="text-[9px] text-muted-foreground font-medium">
          Editorial rule: plain meaning first. No auto-published submissions.
        </span>
      </div>
    </div>
  );
}

function SearchPanel({ featuredTerms }: { featuredTerms: TermDTO[] }) {
  return (
    <div className="flex flex-col gap-2 h-full">
      {featuredTerms.slice(0, 5).map((term, index) => (
        <motion.div
          key={term.slug}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03 }}
          className="flex items-center justify-between p-2.5 rounded-lg border border-border/40 bg-background/50 hover:bg-muted/30 transition-colors"
        >
          <span className="text-[11px] font-semibold text-foreground">
            {term.term}
          </span>
          <span className="max-w-[100px] truncate text-[9px] text-muted-foreground">
            {term.shortDefinition}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function StatusPanel() {
  return (
    <div className="flex flex-col gap-2 h-full">
      {["Current", "Peaking", "Fading", "Dated", "Ironic"].map(
        (label, index) => (
          <div
            key={label}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-background/50"
          >
            <span
              className={cn(
                "h-3 w-3 rounded-full border",
                [
                  "bg-emerald-400 border-emerald-500",
                  "bg-fuchsia-400 border-fuchsia-500",
                  "bg-amber-400 border-amber-500",
                  "bg-slate-400 border-slate-500",
                  "bg-cyan-400 border-cyan-500",
                ][index],
              )}
            />
            <span className="text-[11px] font-medium text-foreground">
              {label}
            </span>
          </div>
        ),
      )}
    </div>
  );
}

function QueuePanel() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
        <HugeiconsIcon icon={Tick01Icon} size={14} />
      </div>
      <p className="text-[11px] font-semibold text-foreground">
        Submit → review → publish
      </p>
      <p className="text-[9px] text-muted-foreground leading-relaxed">
        Anonymous submissions are welcome. Public glossary stays curated.
      </p>
    </div>
  );
}
