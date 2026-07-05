# Slanguage

The curated field guide for internet slang. Definitions, examples, vibe checks, and whether a word is still alive or already cooked — without the brand-account cringe.

---

## What is this?

Slanguage is a searchable, moderated dictionary for Gen Z slang, brainrot, TikTok phrases, Discord lingo, and whatever new word your group chat won't stop using. Every entry gets:

- A plain-English definition
- Natural example sentences
- A category and vibe label
- A currentness check (current, peaking, fading, dated, or ironic)
- A safety label when context matters

Anonymous submissions are welcome. Nothing publishes without review.

---

## Why not just use Urban Dictionary?

Urban Dictionary is chaos. Slanguage is curated — edited definitions, consistent formatting, actual quality control, and zero ads. It's a reference tool, not a content farm.

---

## Getting started

### Prerequisites

- Node.js 22+
- MongoDB (optional — the app runs on starter data without it)

### Setup

```bash
git clone <repo-url> slanguage
cd slanguage
npm install
```

Create a `.env.local` file:

```bash
MONGODB_URI="mongodb+srv://..."  # optional, app works without it
ADMIN_PASSWORD="your-password"
ADMIN_COOKIE_SECRET="a-long-random-string"
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

### Seed the database

If you have MongoDB configured:

```bash
npm run seed
```

This creates 9 categories and around 119 starter terms. Without MongoDB, the app falls back to the same data from local files — everything still works.

---

## How it works

### For visitors

- **Browse** the index at `/terms` — searchable, sortable, with real-time autocomplete
- **Dive into a word** at `/terms/rizz` — full definition, examples, vibe check, related terms
- **Explore categories** at `/categories` — dating, brainrot, hype, roasts, gaming, and more
- **Submit slang** at `/submit` — anonymous, no account, goes straight to moderation
- **Random entry** at `/api/random` — for when you want to learn something new

### For admins

- **Log in** at `/admin/login` with the admin password
- **Review submissions** at `/admin/submissions` — edit, approve, reject, or mark as duplicate
- Approved terms publish instantly to the public index

---

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS** with shadcn-style UI primitives
- **Motion** (formerly Framer Motion) for animations
- **Hugeicons** for icons
- **MongoDB + Mongoose** (optional, with starter data fallback)
- **Geist Sans + Geist Mono** (same fonts as uselayouts.com)

---

## Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed MongoDB with categories and terms |

---

## Project structure

```
src/
  app/            # Next.js App Router pages
    api/          # Search and random endpoint
    admin/        # Login and submissions queue
    categories/   # Category index and detail
    terms/        # Term index and detail
    submit/       # Submission form
  components/
    ui/           # shadcn-style primitives (button, card, input, etc.)
    search-box.tsx        # Morphing search with animated placeholder
    slanguage-bento.tsx   # Interactive bento card on homepage
    term-card.tsx         # Term preview card
    category-card.tsx     # Category preview card
    submission-approval-card.tsx  # Admin review card with accordion
    submit-status-button.tsx      # Animated submit button
    status-badge.tsx      # Currentness and safety badges
    site-header.tsx       # Top navigation
    site-footer.tsx       # Footer
    theme-provider.tsx    # next-themes provider
    theme-toggle.tsx      # Light/dark toggle
  data/
    categories.ts         # 9 category definitions
    starter-terms.ts      # ~119 starter slang terms
  lib/
    queries.ts            # Database + fallback query functions
    actions.ts            # Server actions (submit, approve, reject, auth)
    admin-auth.ts         # Cookie-based admin authentication
    mongodb.ts            # MongoDB connection with caching
    slugify.ts            # URL slug generation
    status.ts             # Status and safety label definitions
    structured-data.ts    # JSON-LD structured data helpers
    submissions.ts        # Submission query helpers
    utils.ts              # Tailwind class merging
  models/
    Term.ts               # Mongoose term schema
    Category.ts           # Mongoose category schema
    Submission.ts         # Mongoose submission schema
  types/
    slang.ts              # Shared TypeScript types
scripts/
  seed.ts                 # Database seed script
```

---

## Data model

### Term statuses

| Status | Meaning |
|--------|---------|
| `current` | Still actively used |
| `peaking` | Very popular right now |
| `fading` | Still understood, starting to feel overused |
| `dated` | Sounds old unless used knowingly |
| `ironic` | Mostly used jokingly or self-aware |

### Safety labels

| Label | Meaning |
|-------|---------|
| `clean` | Safe in most casual contexts |
| `mild` | Lightly edgy or context-dependent |
| `rude` | Could insult or dismiss someone |
| `sensitive` | Needs extra care and context |

---

## Admin auth

Admin authentication uses a signed cookie — no user accounts, no database tables.

- Set `ADMIN_PASSWORD` and `ADMIN_COOKIE_SECRET` in `.env.local`
- Login at `/admin/login` with the password
- The cookie (`slanguage_admin`) is HMAC-signed and expires in 7 days
- Logout clears the cookie

---

## MongoDB fallback

Every public page has a built-in fallback chain:

1. Try MongoDB (if `MONGODB_URI` is configured)
2. If MongoDB fails or returns nothing → use starter data from `src/data/starter-terms.ts`

This means you can develop the entire frontend without a database. The admin features (submissions, approval) do require MongoDB.

---

## SEO

- **Structured data**: JSON-LD `DefinedTerm` on every term page, `WebSite` in the layout
- **Sitemap**: Dynamically generated at `/sitemap.xml` with all terms, categories, and static routes
- **Robots.txt**: Generated at `/robots.txt`, disallows `/admin/` and `/api/`
- **Canonical URLs**: Set on all term and category pages
- **Open Graph + Twitter cards**: Rich social share previews with descriptions
- **Meta descriptions**: Unique, descriptive, keyword-rich on every page

---

## Design

The interface follows a clean, refined aesthetic — not generic SaaS, not neobrutalism, not AI-gradient slop. Think polished reference tool with subtle motion.

- Light-first with a full dark mode toggle
- Geist Sans for body, Geist Mono for code
- Forest green primary palette (not purple — that's AI-default territory)
- Subtle borders (`border-border/40`), soft shadows, rounded corners
- Motion-powered interactions: morphing search, animated placeholders, spring-based tab switching
- Inspired by uselayouts component patterns

---

## Known gaps

- No analytics or search tracking
- No spam protection on the submission form (honeypot, rate limiting, or CAPTCHA)
- No mobile bottom navigation menu
- No fuzzy search or typo tolerance
- No OG image generation for term pages
- `metadataBase` is set to a placeholder URL — update before production

---

## License
MIT
