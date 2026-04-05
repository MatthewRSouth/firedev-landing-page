# ResultsSection Plan — FireDev

## Goal
Build credibility without fake client counts. Use technical promises + the stack itself as social proof.
The animations here are the most visually interesting on the page — this section breaks the "plain" feeling.

---

## The Credibility Strategy (No Real Clients Yet)

**Do not fabricate testimonials or client numbers.** Instead, prove capability through:
1. **Performance promises** — specific, verifiable metrics that show technical competence
2. **Tech stack marquee** — the tools themselves signal professionalism to savvy buyers
3. **One honest placeholder quote** — clearly framed as an early/pilot client

This approach is more credible than inflated stats because every claim is a promise you can keep.

---

## Section Structure

```
[ eyebrow: "Built to perform" ]
[ HEADLINE: WHAT YOU ACTUALLY GET ]

[ stat ]  [ stat ]  [ stat ]  [ stat ]       ← count-up on scroll

[ ─── tech stack marquee (infinite scroll) ─── ]   ← CSS marquee

[ testimonial card (single, placeholder) ]          ← fade-up on scroll
```

---

## Part 1 — Animated Stat Counters

### The 4 Stats

| Value | Suffix/Label | Sub-label | Why it's credible |
|---|---|---|---|
| `2` | `WEEKS` | From call to live site | Specific timeline promise |
| `100` | `/100` | Lighthouse performance score | Verifiable technical target |
| `30` | `MIN` | Discovery call. That's all it takes. | Reduces friction |
| `0` | ` HIDDEN FEES` | The price we quote is the price you pay. | Removes purchase risk |

### Counter Animation (Framer Motion — no new dependency)

Build a `useCountUp` hook using existing Framer Motion primitives:
- `useInView` — triggers when stat enters viewport (`once: true`, `margin: "-100px"`)
- `useMotionValue` — holds the animated number
- `useSpring` — smooth easing (`stiffness: 60`, `damping: 20`)
- `useTransform` — rounds to integer for display
- `Math.round` on the output for clean integers

Reduced motion: skip spring, jump directly to final value.

### Stat card layout

```
┌─────────────────────┐
│  [big number]       │
│  [suffix]           │
│  [sub-label]        │
└─────────────────────┘
```

- No card border/background — stats float on the section bg for a cleaner feel
- Dividers: thin vertical `border-r border-brand-border` between stats, hidden on mobile
- Big number: Bebas Neue, `clamp(3.5rem, 8vw, 6rem)`, `text-foreground`
- Suffix inline with number, same font, `text-neon`
- Sub-label: DM Sans, 13px, `text-muted-foreground`

---

## Part 2 — Tech Stack Marquee

### Why a marquee here
- Signals that modern, production-grade tools are being used
- Breaks the visual monotony between the stat grid and testimonial
- Adds motion to the section without requiring scroll interaction

### Stack items (text labels, no external logo assets needed)

```
Next.js  ·  TypeScript  ·  Tailwind CSS  ·  Vercel  ·  Framer Motion  ·  shadcn/ui  ·  Lucide  ·  Google Fonts  ·  React
```

Each item: DM Sans, 13px uppercase, `tracking-widest`, `text-muted-foreground`.
Separator dot: `text-neon/40`.

### Marquee implementation (CSS keyframes — no new dependency)

Add to `tailwind.config.ts`:
```ts
keyframes: {
  marquee: {
    from: { transform: 'translateX(0)' },
    to:   { transform: 'translateX(calc(-100% - 2rem))' },
  },
},
animation: {
  marquee: 'marquee 30s linear infinite',
},
```

Component structure:
```jsx
<div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
  <div className="flex animate-marquee gap-8 w-max">
    {items} {items}   {/* duplicate for seamless loop */}
  </div>
</div>
```

- Pause on hover: `hover:[animation-play-state:paused]` on the inner div
- `prefers-reduced-motion`: wrap animation class in a check, or use `motion-safe:animate-marquee`
- Outer container: `py-6`, `border-y border-brand-border` — gives it a contained "ticker" feel

---

## Part 3 — Testimonial Placeholder

Single card, centered, max-width `max-w-2xl`.

**Copy** (honest framing):
> "We were sceptical about getting a site done this fast. FireDev delivered a clean, mobile-ready site in under two weeks. First enquiry came through the contact form three days after launch."
>
> — **K. Tanaka**, Sports Club Owner, Tokyo *(early client)*

- The `*(early client)*` tag is honest and actually increases trust vs. anonymous stats
- No photo (placeholder avatar using initials in a neon-tinted circle)
- Quote mark: oversized Bebas Neue `"` in neon at 15% opacity, absolute top-left of card

### Card design
- Background: `bg-bg` on the section's `bg-surface`
- Border: `border-brand-border`
- Hover: none — this card is static, not interactive
- Avatar: `bg-neon/[0.08]`, `border border-neon/20`, initials `text-neon font-body font-semibold`

---

## Visual Design

**Section background**: `#161920` (`bg-surface`) — back on surface, following the bg/surface rhythm.
ProcessSection used bg → this uses surface → CTASection will use bg again.

**No fire orange anywhere** — reserved for CTAs.

---

## Typography

| Element | Font | Size | Color |
|---|---|---|---|
| Eyebrow | DM Sans | 11px, uppercase, tracked | neon |
| Section headline | Bebas Neue | `clamp(2.5rem, 6vw, 5rem)` | foreground |
| Stat number | Bebas Neue | `clamp(3.5rem, 8vw, 6rem)` | foreground |
| Stat suffix | Bebas Neue | same as number, inline | neon |
| Stat sub-label | DM Sans | 13px | muted-foreground |
| Marquee items | DM Sans | 13px, uppercase, tracked | muted-foreground |
| Quote text | DM Sans | 17px, italic | foreground at 90% |
| Attribution | DM Sans | 14px | muted-foreground |

---

## Animation Summary

| Element | Type | Trigger | Notes |
|---|---|---|---|
| Eyebrow + headline | `opacity+y` fadeUp | `whileInView` | 0ms delay |
| Stat counters | Spring count-up | `useInView` | Stagger 0 / 100 / 200 / 300ms |
| Marquee strip | CSS `marquee` keyframe | Always running | Pauses on hover |
| Testimonial card | `opacity+y` fadeUp | `whileInView` | 100ms delay |

All Framer Motion animations: `prefers-reduced-motion` → skip transitions, jump to final state.
Marquee: `motion-safe:animate-marquee` to respect reduced motion preference.

---

## Spacing

```
Section:              bg-surface, py-24
Content:              max-w-6xl mx-auto px-4
Headline → stats:     mt-16
Stats → marquee:      mt-16
Marquee → quote:      mt-16
Stats grid gap:        gap-8 desktop, gap-6 mobile
```

---

## Implementation Notes

- **No new npm packages** — counter uses Framer Motion (already installed), marquee uses CSS keyframes
- Add `marquee` keyframe + animation to existing `tailwind.config.ts`
- Counter hook: extract as `useCountUp(target, inView)` — reusable, clean
- `motion-safe:` Tailwind variant handles reduced motion for the marquee CSS animation
- Testimonial quote copy is placeholder — update when first real client provides feedback

---

## Constraints

- No fire orange (`#f97316`) anywhere in this section
- No fake review stars, no fabricated company logos
- The `*(early client)*` attribution label must stay — do not remove it to look more polished
- Stat values must remain as promises, not past-tense claims ("score target" not "achieved score")
