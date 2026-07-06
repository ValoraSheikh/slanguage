import {
  Banknote,
  Brain,
  FileText,
  Flame,
  Gamepad2,
  Heart,
  MessageCircle,
  Skull,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Banknote,
  Brain,
  FileText,
  Flame,
  Gamepad2,
  Heart,
  MessageCircle,
  Skull,
  Sparkles,
};

export function getCategoryIcon(iconName: string): LucideIcon {
  return iconMap[iconName] ?? MessageCircle;
}
