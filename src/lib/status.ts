import type { TermStatus } from "@/types/slang";

export const TERM_STATUSES: { value: TermStatus; label: string; description: string }[] = [
  { value: "current", label: "Current", description: "Still actively used without much irony." },
  { value: "peaking", label: "Peaking", description: "Very popular right now." },
  { value: "fading", label: "Fading", description: "Still understood, but starting to feel overused." },
  { value: "dated", label: "Dated", description: "Sounds old unless used ironically." },
  { value: "ironic", label: "Ironic", description: "Mostly used jokingly or self-aware." },
];

export function getStatusLabel(status: TermStatus) {
  return TERM_STATUSES.find((item) => item.value === status)?.label ?? status;
}
