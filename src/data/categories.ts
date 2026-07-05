import type { CategoryDTO } from "@/types/slang";

export const categories: CategoryDTO[] = [
  {
    name: "Reactions & feelings",
    slug: "reactions-feelings",
    description: "Words for moods, reactions, shock, agreement, confusion, and emotional weather.",
    emoji: "💬",
    color: "bg-sky-100 text-sky-900",
  },
  {
    name: "Compliments & hype",
    slug: "compliments-hype",
    description: "Praise, admiration, flexes, wins, and ways to say someone absolutely ate.",
    emoji: "🔥",
    color: "bg-orange-100 text-orange-900",
  },
  {
    name: "Insults & roasts",
    slug: "insults-roasts",
    description: "Playful call-outs, cringe checks, and terms that can get spicy fast.",
    emoji: "💀",
    color: "bg-rose-100 text-rose-900",
  },
  {
    name: "Dating & relationships",
    slug: "dating-relationships",
    description: "Talking stages, situationships, red flags, green flags, and romantic chaos.",
    emoji: "🚩",
    color: "bg-pink-100 text-pink-900",
  },
  {
    name: "Brainrot & memes",
    slug: "brainrot-memes",
    description: "TikTok lore, meme-speak, absurdist phrases, and words the timeline adopted.",
    emoji: "🧠",
    color: "bg-purple-100 text-purple-900",
  },
  {
    name: "Aesthetic & identity",
    slug: "aesthetic-identity",
    description: "Vibes, cores, fashion language, internet identities, and personal style labels.",
    emoji: "✨",
    color: "bg-amber-100 text-amber-900",
  },
  {
    name: "Money & hustle",
    slug: "money-hustle",
    description: "Bag chasing, flexing, jobs, ambition, and internet money talk.",
    emoji: "💸",
    color: "bg-lime-100 text-lime-900",
  },
  {
    name: "Gaming & Discord",
    slug: "gaming-discord",
    description: "Gaming lobbies, Discord culture, streaming chat, and competitive internet slang.",
    emoji: "🎮",
    color: "bg-indigo-100 text-indigo-900",
  },
  {
    name: "Acronyms & texting",
    slug: "acronyms-texting",
    description: "Text shorthand, acronyms, abbreviations, and replies that do a lot with two letters.",
    emoji: "📝",
    color: "bg-teal-100 text-teal-900",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
