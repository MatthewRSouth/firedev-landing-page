# CLAUDE.md — FireDev Landing Page

## Project Identity

**Company**: FireDev  
**Product**: Agency landing page — single goal: book discovery calls from business owners who need a new website.  
**Owner**: Matthew (kindergarten teacher → freelance web dev → engineering career)  
**Market**: Japanese small businesses (clinics, sports clubs, local service providers) + English-speaking clients in Japan  
**Tone**: Confident, warm, no fluff. "We build it fast. We build it right. You get calls."

---

## Business Goal

One conversion action per page: **Book a Free Discovery Call via Google Meet**.  
No competing CTAs. No portfolio carousels that distract. No service menus.  
Every section exists to reduce doubt and push toward that single button.

### Booking Flow
- **Tool**: Calendly (free tier) → Google Calendar connected → Google Meet auto-generated per booking
- **Client experience**: Click CTA → Calendly page → pick time → receive Google Meet link by email. Zero friction.
- **CTA copy**: "Book a Free Call" or "無料相談を予約する" (Japanese)
- **CTA link**: `https://calendly.com/YOUR_HANDLE` ← replace before launch
- **Setup checklist**:
  - [ ] Create Calendly account at calendly.com
  - [ ] Connect Google Calendar under Integrations
  - [ ] Set event location to "Google Meet"
  - [ ] Set meeting duration to 30 minutes
  - [ ] Copy your Calendly link → paste into `lib/constants.ts` as `BOOKING_URL`

---

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + 21st.dev React/Tailwind components
- **Icons**: Lucide React — verify every icon name exists before importing
- **Fonts**: Google Fonts via `next/font` — see Design System below
- **Animation**: Framer Motion (verify version is current before use)
- **Deployment**: Vercel free tier

---

## MCP Tools & Design Intelligence

These tools are globally installed and available in every Claude Code session. Use them in the order below for each new section or page.

### 1. UI/UX Pro Max Skill — Layout & Design Decisions
**When**: Before writing any component code.  
**How**: Run `uipro` to activate Senior Designer mode.  
**Use for**: Section hierarchy, spacing decisions, visual weight, mobile layout strategy, typography pairing.  
**Rule**: If a layout decision feels arbitrary, consult UI/UX Pro Max first.

### 2. Stitch MCP — Design-to-Code Prototyping
**When**: Wireframing a new section or iterating on layout before committing to full code.  
**How**: Installed via `claude mcp add stitch npx @_davideast/stitch-mcp --scope user`  
**Use for**: Rapid layout mocks, bridging design intent to component structure, validating visual hierarchy before full build.  
**Prompt pattern**:
```
Use Stitch to mock the layout for [SectionName].
FireDev dark theme, fire orange CTAs, neon blue accents.
Show desktop and mobile breakpoints.
```

### 3. Nano Banana 2 MCP — Hero Images & Brand Assets
**When**: Any section needing a background image, hero visual, or brand graphic.  
**How**: Installed via `claude mcp add nano-banana npx nano-banana-2-mcp --scope user` (Gemini API key configured)  
**Use for**: Hero backgrounds, section textures, social preview images, any visual that needs to feel custom not stock.  
**Standard FireDev image prompt**:
```
Hero background for a web development agency called FireDev.
Dark tech aesthetic, deep navy/charcoal (#0d0f14) background.
Subtle fire-to-neon-blue gradient light source from bottom-left.
Abstract code/circuit elements. NOT photorealistic.
Clean enough for white text overlay. No faces, no people.
```
**Variation prompts**:
```
/* Process section background */
Abstract circuit board texture, very dark, low contrast, #0d0f14 base.
Faint neon blue (#38bdf8) trace lines. Suitable as a subtle section bg.

/* CTA section background */
Fire gradient: deep charcoal center bleeding into orange ember glow at edges.
High energy, dark enough for white text, no literal flame imagery.
```

### 4. 21st.dev — Production React/Tailwind Components
**When**: Building cards, navbars, CTAs, pricing tables, testimonial blocks.  
**How**: Browse [21st.dev](https://21st.dev), copy the component, paste into the Claude session with:
```
Adapt this 21st.dev component to the FireDev design system.
Replace all colors with FireDev tokens. Swap any emojis for Lucide icons.
Maintain the layout structure, restyle everything else.
```
**Best sources on 21st.dev for this project**: pricing cards, feature grids, hero CTAs, step/process components.

---

## Design System

### Brand Assets
- **Logo**: `FireDevInstagramIcon.png` — dark background app icon, fire + `</>` code symbol, orange/blue neon glow
- **Primary palette derived from logo**:
  ```
  --color-bg:         #0d0f14   /* near-black, matches logo bg */
  --color-surface:    #161920   /* card / section bg */
  --color-border:     #1e2330
  --color-fire:       #f97316   /* orange-500, fire accent */
  --color-neon:       #38bdf8   /* sky-400, neon blue accent */
  --color-text:       #f1f5f9   /* slate-100 */
  --color-muted:      #64748b   /* slate-500 */
  --color-cta:        #f97316   /* CTA buttons = fire orange only */
  ```

### Typography
- **Display / Hero**: `Bebas Neue` — bold, condensed, high-impact headlines
- **Body / UI**: `DM Sans` — clean, readable, slightly warm
- **Japanese copy**: `Noto Sans JP` — weight 400/700
- Rule: never mix more than 2 of these on a single component

### Spacing
- Section padding: `py-24` desktop, `py-16` mobile
- Max content width: `max-w-6xl mx-auto`
- Card padding: `p-8`

### No-Emojis Rule
**Hard rule**: zero emojis anywhere in UI. Use Lucide React icons only.

### CTA Color Discipline
Fire orange (`--color-fire`) is reserved for primary CTA buttons and key accent highlights only. Do not scatter it decoratively.

---

## Page Structure

Build in this order. Each section = one file in `components/sections/`.

1. **`HeroSection`** — Headline + sub + single CTA button. Logo mark visible. Fire/neon aesthetic. No carousel.
2. **`ProblemSection`** — 3 pain points of business owners without a good site. Icon + short copy cards.
3. **`ProcessSection`** — 3-step: Discovery → Build → Launch. Numbered, clean.
4. **`ResultsSection`** — Social proof. Placeholder until real clients exist: "Pilot client results here." or a before/after mockup.
5. **`PricingSection`** — Transparent anchor: starts from ¥99,000. No confusion. Single tier shown.
6. **`CTASection`** — Full-width, fire gradient background. One button. Strong headline.
7. **`FooterSection`** — Minimal. Contact + LINE link + 個人事業主 disclaimer if needed.

---

## Code Standards

- All components in TypeScript with explicit prop types
- No `any` — use proper interfaces
- Error boundaries on data-fetching components
- Mobile-first: test at 375px and 1280px (Playwright screenshots before sign-off)
- No `console.log` in committed code

---

## Claude Code Workflow

### Tool sequence — use this order every session

```
Step 1 → uipro          (UI/UX Pro Max: layout + design decisions)
Step 2 → Stitch MCP     (mock the layout before writing component code)
Step 3 → Nano Banana 2  (generate any needed images/backgrounds)
Step 4 → 21st.dev       (grab a base component if applicable, paste + adapt)
Step 5 → Build          (write the final TypeScript component)
Step 6 → Playwright     (screenshot at 375px and 1280px, sign off)
```

### Session start prompt (paste this first every time)
```
Read CLAUDE.md fully before writing any code.
Activate UI/UX Pro Max Skill for all layout decisions.
Use Stitch MCP to mock before building.
Use Nano Banana 2 for any image assets.
Use 21st.dev component patterns for cards, CTAs, and nav.
```

### Standard section build prompt
```
Build [SectionName] following the FireDev design system in CLAUDE.md.
Step 1: Use UI/UX Pro Max to confirm layout approach.
Step 2: Use Stitch to mock the layout first.
Step 3: If this section needs a background image, use Nano Banana 2.
Step 4: Check 21st.dev for a base component to adapt.
Step 5: Build the final TypeScript component.
Dark background (#0d0f14), Bebas Neue headlines, DM Sans body.
CTA buttons: fire orange (#f97316) only. Icons: Lucide React only.
Verify all Lucide icon names exist before importing.
Mobile-first. Playwright screenshot at 375px before done.
```

---

## Testing

### Playwright Setup
```bash
npm install -D playwright && npx playwright install chromium
```

### Pre-launch checklist — run before every deploy
Claude Code prompt:
```
Run Playwright tests on the FireDev landing page.
Check these items and report pass/fail for each:
1. Page loads at localhost:3000 with no console errors
2. All section anchor links scroll to the correct section
3. CTA button href points to the BOOKING_URL in constants.ts (not a placeholder)
4. Logo image loads (no broken img)
5. Screenshot at 375px viewport — check text is not clipped, CTA is visible
6. Screenshot at 1280px viewport — check layout is not broken
```

### Manual checks (do these yourself before every client demo)
- Open Chrome DevTools → toggle device toolbar → set to 375px
- Scroll through every section — nothing overflows, text is readable
- Tap the CTA button — confirm Calendly opens correctly
- Set viewport to 1280px — repeat scroll check

---

## What This Page Is NOT

- Not a portfolio site (no project gallery)
- Not a full agency site (no team page, no about page)
- Not an ecommerce site
- Not bilingual on launch — Japanese version is V2

---

## Current Status

- [ ] Next.js project initialized
- [ ] Design system tokens set in `tailwind.config.ts`
- [ ] HeroSection built
- [ ] All 7 sections complete
- [ ] Mobile 375px verified
- [ ] Deployed to Vercel

---

## Key Files

```
firedev-landing/
├── CLAUDE.md                    ← this file
├── public/
│   └── logo.png                 ← FireDevInstagramIcon
├── app/
│   └── page.tsx                 ← imports all sections
├── components/
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ProblemSection.tsx
│       ├── ProcessSection.tsx
│       ├── ResultsSection.tsx
│       ├── PricingSection.tsx
│       ├── CTASection.tsx
│       └── FooterSection.tsx
└── lib/
    └── constants.ts             ← copy strings, pricing, BOOKING_URL, contact links
```
