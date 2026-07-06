import type { TermStatus } from "@/types/slang";
import { getStatusLabel } from "@/lib/status";

const statusDotColors: Record<TermStatus, string> = {
  current: "bg-emerald-500",
  peaking: "bg-fuchsia-500",
  fading: "bg-amber-500",
  dated: "bg-slate-400",
  ironic: "bg-cyan-500",
};

export function StatusDot({ status }: { status: TermStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${statusDotColors[status]}`} />
      {getStatusLabel(status)}
    </span>
  );
}
