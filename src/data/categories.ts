import type { CategoryDTO } from "@/types/slang";

export const categories: CategoryDTO[] = [
  {
    name: "Reactions & feelings",
    slug: "reactions-feelings",
    description: "Words for moods, reactions, shock, agreement, confusion, and emotional weather.",
    iconName: "MessageCircle",
  },
  {
    name: "Compliments & hype",
    slug: "compliments-hype",
    description: "Praise, admiration, flexes, wins, and ways to say someone absolutely ate.",
    iconName: "Flame",
  },
  {
    name: "Insults & roasts",
    slug: "insults-roasts",
    description: "Playful call-outs, cringe checks, and terms that can get spicy fast.",
    iconName: "Skull",
  },
  {
    name: "Dating & relationships",
    slug: "dating-relationships",
    description: "Talking stages, situationships, red flags, green flags, and romantic chaos.",
    iconName: "Heart",
  },
  {
    name: "Brainrot & memes",
    slug: "brainrot-memes",
    description: "TikTok lore, meme-speak, absurdist phrases, and words the timeline adopted.",
    iconName: "Brain",
  },
  {
    name: "Aesthetic & identity",
    slug: "aesthetic-identity",
    description: "Vibes, cores, fashion language, internet identities, and personal style labels.",
    iconName: "Sparkles",
  },
  {
    name: "Money & hustle",
    slug: "money-hustle",
    description: "Bag chasing, flexing, jobs, ambition, and internet money talk.",
    iconName: "Banknote",
  },
  {
    name: "Gaming & Discord",
    slug: "gaming-discord",
    description: "Gaming lobbies, Discord culture, streaming chat, and competitive internet slang.",
    iconName: "Gamepad2",
  },
  {
    name: "Acronyms & texting",
    slug: "acronyms-texting",
    description: "Text shorthand, acronyms, abbreviations, and replies that do a lot with two letters.",
    iconName: "FileText",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
