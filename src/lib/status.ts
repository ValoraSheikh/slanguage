import type { SafetyLabel, TermStatus } from "@/types/slang";

export const TERM_STATUSES: { value: TermStatus; label: string; description: string }[] = [
  { value: "current", label: "Current", description: "Still actively used without much irony." },
  { value: "peaking", label: "Peaking", description: "Very popular right now." },
  { value: "fading", label: "Fading", description: "Still understood, but starting to feel overused." },
  { value: "dated", label: "Dated", description: "Sounds old unless used ironically." },
  { value: "ironic", label: "Ironic", description: "Mostly used jokingly or self-aware." },
];

export const SAFETY_LABELS: { value: SafetyLabel; label: string; description: string }[] = [
  { value: "clean", label: "Clean", description: "Safe in most casual contexts." },
  { value: "mild", label: "Mild", description: "Lightly edgy or context-dependent." },
  { value: "rude", label: "Can sound rude", description: "Could insult or dismiss someone." },
  { value: "sensitive", label: "Sensitive context", description: "Needs extra care and moderation." },
];

export function getStatusLabel(status: TermStatus) {
  return TERM_STATUSES.find((item) => item.value === status)?.label ?? status;
}

export function getSafetyLabel(label: SafetyLabel) {
  return SAFETY_LABELS.find((item) => item.value === label)?.label ?? label;
}
