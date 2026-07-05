import { Badge } from "@/components/ui/badge";
import { getSafetyLabel, getStatusLabel } from "@/lib/status";
import type { SafetyLabel, TermStatus } from "@/types/slang";

const statusColors: Record<TermStatus, string> = {
  current: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
  peaking: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 hover:bg-fuchsia-100",
  fading: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
  dated: "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100",
  ironic: "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-100",
};

export function StatusBadge({ status }: { status: TermStatus }) {
  return (
    <Badge variant="outline" className={statusColors[status]}>
      {getStatusLabel(status)}
    </Badge>
  );
}

export function SafetyBadge({ label }: { label: SafetyLabel }) {
  if (label === "clean") {
    return <Badge variant="outline">{getSafetyLabel(label)}</Badge>;
  }
  if (label === "mild") {
    return <Badge variant="secondary">{getSafetyLabel(label)}</Badge>;
  }
  return (
    <Badge variant="destructive">{getSafetyLabel(label)}</Badge>
  );
}
