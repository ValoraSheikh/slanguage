# Slanguage

A curated internet slang field guide for Gen Z slang, brainrot, and internet lingo.

This README is both the project README and an **agent handoff document**. If a new coding agent picks up this repo, they should read this file first.

---

## Quick context for agents

Project directory:

```bash
cd "/home/aman/Documents/Learnings and Projects/slang"
```

The product was originally named **Slanguary**, but the user changed the name to:

```txt
Slanguage
```

Public branding should say `Slanguage` everywhere.

The user disliked the first generic SaaS/AI-looking design and requested a full redesign using ideas from:

```txt
http://uselayouts.com/docs/installation
```

The new visual direction should feel like:

```txt
curated slang field guide + internet zine + polished dictionary
```

Avoid:

```txt
generic SaaS landing page
AI-gradient slop
brand-account cringe
uncurated Urban Dictionary chaos
```

Design should use:

- Light-first UI
- Warm paper background
- Hard black borders
- Bold uppercase editorial display type
- Zine/field-guide composition
- Strong card shadows like `7px 7px 0`
- uselayouts-inspired Motion/Hugeicons interactions

---

## Product concept

Slanguage is a searchable, curated dictionary for internet slang.

Each slang term should explain:

1. What it means
2. How people use it
3. Which category/vibe it belongs to
4. Whether it is still current or already cooked
5. Any safety/context warning if needed

Core product angle:

> Decode Gen Z slang, brainrot, and internet lingo without sounding like a brand account.

This is not intended to be Urban Dictionary-style chaos. It should be curated, readable, and fun.

---

## Stack

- Next.js 16 App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn-style local UI components
- uselayouts-inspired components using `motion/react`
- Hugeicons via `@hugeicons/react` and `@hugeicons/core-free-icons`
- MongoDB + Mongoose
- ESLint 9 flat config

Installed uselayouts-related dependencies:

```bash
npm install motion @hugeicons/react @hugeicons/core-free-icons
```

Core package file:

```txt
package.json
```

Package name is currently:

```json
"name": "slanguage"
```

---

## Scripts

Run commands from the project directory:

```bash
cd slang
```

Common commands:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run seed
```

---

## Environment

Use `.env.local`.

Required values:

```bash
MONGODB_URI="..."
ADMIN_PASSWORD="..."
ADMIN_COOKIE_SECRET="..."
```

Do **not** commit real environment values.

If using MongoDB Atlas, make sure your current IP address is allowed in:

```txt
MongoDB Atlas → Network Access → Add IP Address
```

before running:

```bash
npm run seed
```

---

## MongoDB status

The app has working Mongoose models and a seed script.

Public pages are designed to fall back to local starter data if MongoDB is unavailable, so the UI can still render during development.

Seeding previously failed because MongoDB Atlas rejected the local IP.

Known seed failure:

```txt
Could not connect to any servers in your MongoDB Atlas cluster.
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

Fix by allowlisting the current IP in MongoDB Atlas Network Access.

Then run:

```bash
npm run seed
```

Expected seed result:

```txt
9 categories
around 100 published terms
```

---

## Implemented routes

### Public routes

```txt
/
```

Homepage with:

- Editorial hero
- Morphing search
- Slanguage bento
- Word of the day
- Category grid
- Starter term grid
- Submit CTA

```txt
/terms
```

Searchable slang index.

```txt
/terms/[slug]
```

Individual term detail page.

```txt
/categories
```

Category/vibe index.

```txt
/categories/[slug]
```

Category detail page with terms in that category.

```txt
/submit
```

Anonymous moderated slang submission form.

```txt
/api/search
```

Search/autocomplete API.

```txt
/api/random
```

Redirects to a random term.

### Admin routes

```txt
/admin/login
```

Password-based admin login.

```txt
/admin/submissions
```

Moderation queue.

Admin auth is currently simple and MVP-level:

- `ADMIN_PASSWORD`
- signed cookie
- no user accounts yet

Admin cookie name:

```txt
slanguage_admin
```

---

## Implemented features

- Search/autocomplete
- Category browsing
- Individual SEO-friendly term pages
- Random term endpoint
- Word of the day
- Anonymous slang submissions with no email/account
- Admin approval queue
- Approve submissions
- Reject submissions
- Mark submissions as duplicate
- Edit submission into a published term before approval
- Starter terms fallback data
- MongoDB/Mongoose data layer
- Seed script for categories and starter terms
- Light-first redesigned visual system
- uselayouts-inspired Motion/Hugeicons components

---

## Data model files

Models live in:

```txt
src/models/Term.ts
src/models/Category.ts
src/models/Submission.ts
```

### `Term`

Published slang entries.

Important fields:

```ts
term
slug
aliases
shortDefinition
definition
examples
categories
tags
status
safetyLabel
usageNotes
caution
origin
relatedTerms
isPublished
approvedAt
lastReviewedAt
createdAt
updatedAt
```

Term status values:

```ts
"current" | "peaking" | "fading" | "dated" | "ironic"
```

Safety labels:

```ts
"clean" | "mild" | "rude" | "sensitive"
```

### `Category`

Category/vibe groups.

Important fields:

```ts
name
slug
description
emoji
color
createdAt
updatedAt
```

### `Submission`

Anonymous user-submitted slang waiting for review.

Important fields:

```ts
term
suggestedDefinition
suggestedExamples
suggestedCategorySlug
suggestedTags
suggestedStatus
sourceContext
notes
status
reviewedAt
reviewerNotes
createdAt
updatedAt
```

Submission status values:

```ts
"pending" | "approved" | "rejected" | "duplicate"
```

---

## Starter data

Starter data files:

```txt
src/data/categories.ts
src/data/starter-terms.ts
```

### Categories

`src/data/categories.ts` contains 9 MVP categories:

1. Reactions & feelings
2. Compliments & hype
3. Insults & roasts
4. Dating & relationships
5. Brainrot & memes
6. Aesthetic & identity
7. Money & hustle
8. Gaming & Discord
9. Acronyms & texting

### Terms

`src/data/starter-terms.ts` contains around 100 starter slang terms.

This file is used for:

- Seed data
- No-database fallback data
- Local development if MongoDB is unavailable

Review this file later for:

- Accuracy
- Tone
- Currentness labels
- Safety labels
- Natural example sentences
- Category assignments

---

## uselayouts redesign notes

Docs inspected:

```txt
http://uselayouts.com/docs/installation
```

uselayouts is copy-paste based, similar to shadcn.

Relevant uselayouts components used as inspiration:

- Morphing Input
- Bento Card
- Status Button
- Stacked List
- Smooth Dropdown
- Discover Button

The project does not necessarily copy these components exactly. Instead, the current redesign adapts their interaction ideas into project-specific components.

### Implemented/adapted components

```txt
src/components/search-box.tsx
```

Morphing/animated search input using:

- `motion/react`
- `@hugeicons/react`
- `@hugeicons/core-free-icons`

Inspired by uselayouts `Morphing Input`.

```txt
src/components/slanguage-bento.tsx
```

Homepage bento panel inspired by uselayouts `Bento Card`.

Shows:

- Curated index
- Search behavior
- Currentness labels
- Moderation queue

```txt
src/components/submit-status-button.tsx
```

Animated submit button inspired by uselayouts `Status Button`.

Used on:

```txt
src/app/submit/page.tsx
```

---

## Redesigned files

### Global/design files

```txt
src/app/globals.css
tailwind.config.ts
```

The visual system changed from generic gradient SaaS to:

- Warm paper background
- Dark ink foreground
- Orange primary
- Neon/lime accent
- Black borders
- Printed grid background
- Hard card shadows

Utility classes added in `globals.css`:

```css
.paper-panel
.ink-panel
.label-tape
.marker-underline
.noise-card
.sparkle-gradient
```

### UI primitives

```txt
src/components/ui/button.tsx
src/components/ui/card.tsx
src/components/ui/input.tsx
src/components/ui/textarea.tsx
src/components/ui/badge.tsx
```

These now use harder borders and less generic shadcn styling.

### Shared components

```txt
src/components/site-header.tsx
src/components/site-footer.tsx
src/components/term-card.tsx
src/components/category-card.tsx
src/components/empty-state.tsx
src/components/search-box.tsx
src/components/slanguage-bento.tsx
src/components/submit-status-button.tsx
```

### Pages

```txt
src/app/page.tsx
src/app/terms/page.tsx
src/app/terms/[slug]/page.tsx
src/app/categories/page.tsx
src/app/categories/[slug]/page.tsx
src/app/submit/page.tsx
src/app/not-found.tsx
src/app/admin/login/page.tsx
```

`/admin/submissions` is functional, but it has not been fully redesigned yet.

---

## Current validation status

`npm run lint` passed after the redesign changes.

`npm run build` currently fails at:

```txt
src/components/slanguage-bento.tsx
```

Current known error:

```txt
Property 'badge' does not exist on type ...
```

Cause:

`tabs` is declared as a const array, but not every object has a `badge` field. TypeScript sees a union where some variants do not have `badge`, so this line fails:

```tsx
{tab.badge ? (... ) : null}
```

Recommended fix:

```ts
type TabConfig = {
  id: "index" | "search" | "status" | "queue";
  label: string;
  icon: any;
  header: string;
  description: string;
  badge?: string;
};

const tabs: TabConfig[] = [
  // ...
];

const [activeTab, setActiveTab] = useState<TabConfig>(tabs[0]);
```

Alternative fix:

```tsx
{"badge" in tab && tab.badge ? (...) : null}
```

The explicit `TabConfig` type is preferred.

After fixing, run:

```bash
npm run lint
npm run build
```

There may be additional TypeScript errors after this because the build stopped at the first issue.

---

## Known remaining work

### 1. Fix current build error

Fix the `tab.badge` TypeScript issue in:

```txt
src/components/slanguage-bento.tsx
```

Then run:

```bash
npm run lint
npm run build
```

### 2. Verify Hugeicons imports

After fixing the current build error, there may be additional icon import/type errors.

Files to watch:

```txt
src/components/search-box.tsx
src/components/slanguage-bento.tsx
src/components/submit-status-button.tsx
```

If an icon import fails, replace it with a confirmed available icon from `@hugeicons/core-free-icons`.

Icons currently known/used from docs or current code include:

```ts
Search01Icon
SparklesIcon
Album02Icon
ArrowRight02Icon
UnfoldMoreIcon
DashboardSquare01Icon
Fire02Icon
Message01Icon
Folder02Icon
BarChartIcon
Tick01Icon
Tick02Icon
```

### 3. Seed MongoDB

After Atlas Network Access is fixed:

```bash
npm run seed
```

### 4. Redesign admin submissions page

File:

```txt
src/app/admin/submissions/page.tsx
```

It works functionally but still needs visual polish in the new Slanguage style.

Suggested improvements:

- Stronger editorial layout
- Cleaner pending submission cards
- Better separation between user submission preview and approval editor
- More compact approve/reject/duplicate controls
- Hard-border zine styling consistent with public pages

### 5. Mobile QA

Check all pages on small screens:

```txt
/
/terms
/terms/rizz
/categories
/categories/brainrot-memes
/submit
/admin/login
/admin/submissions
```

Watch for:

- Large headings overflowing
- Bento card width/height issues
- Search suggestions width
- Header nav hiding correctly
- Submit form spacing
- Term cards becoming too tall

### 6. Add mobile bottom menu later

uselayouts has a `Bottom Menu` component that could fit mobile navigation.

Possible nav items:

```txt
Home
Index
Vibes
Random
Submit
```

### 7. Add submission spam protection

Current submissions are anonymous and require no email, as requested.

Before public launch, consider:

- Honeypot field
- Rate limiting
- Cloudflare Turnstile
- IP throttling
- Basic abuse logging

### 8. Improve search later

Current search supports basic matching across terms, aliases, tags, categories, and definitions.

Future improvements:

- Typo tolerance
- Fuzzy matching
- MongoDB Atlas Search
- Popular searches
- No-result search tracking

### 9. Production SEO polish

Future SEO work:

- `sitemap.xml`
- `robots.txt`
- Real production `metadataBase`
- Term-specific OG images/share cards
- Structured data for dictionary entries
- Better canonical URLs

### 10. Analytics

Not implemented yet.

Potential analytics:

- Most searched terms
- Searches with no results
- Most viewed term pages
- Repeated submitted terms
- Category popularity

### 11. Content review

Review:

```txt
src/data/starter-terms.ts
```

for:

- Accuracy
- Tone
- Currentness
- Safety labels
- Example quality
- Category assignments

---

## Immediate next step

From project directory:

```bash
cd slang
```

Fix:

```txt
src/components/slanguage-bento.tsx
```

Then run:

```bash
npm run lint
npm run build
```

---

## Suggested prompt for the next coding agent

```txt
You are working on the Slanguage project in /home/aman/Documents/Learnings and Projects/slang.

It is a Next.js 16 + TypeScript + Tailwind + MongoDB/Mongoose app for a curated Gen Z/internet slang field guide. The product was renamed from Slanguary to Slanguage. The user disliked the original generic AI/SaaS design and wants a polished internet field guide/zine style using uselayouts-inspired Motion/Hugeicons components.

Do not revert the redesign. Continue the hard-border, paper-background, bold editorial style.

Current state:
- npm run lint passed.
- npm run build fails in src/components/slanguage-bento.tsx because tab.badge is accessed without an explicit optional badge type.
- Fix that first by adding a TabConfig type with badge?: string.
- Then rerun npm run lint and npm run build.
- MongoDB seed fails until Atlas Network Access allows the current IP.
- Public pages are redesigned; /admin/submissions still needs visual polish.
```

---

## Design principle

Slanguage should feel like:

```txt
curated slang field guide + internet zine + polished dictionary
```

Avoid:

```txt
generic SaaS landing page
AI-gradient slop
brand-account cringe
uncurated Urban Dictionary chaos
```
