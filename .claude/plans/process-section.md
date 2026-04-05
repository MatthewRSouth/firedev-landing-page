# ProcessSection Plan — FireDev

## Goal
Make the path from "I need a website" to "my site is live" feel short and inevitable.
Every line should reduce the reader's perceived risk and effort.

---

## The 3 Steps

| # | Card Headline | Body Copy | Lucide Icon |
|---|---|---|---|
| 1 | **BOOK A CALL** | 30 minutes over Google Meet. We learn your goals, walk you through the process, and agree on a scope. | `CalendarCheck` |
| 2 | **WE BUILD** | Fast, mobile-first, designed to convert. You see updates as the build comes together. No surprises. | `Code2` |
| 3 | **YOU LAUNCH** | Site goes live. You get the keys. We handle any post-launch tweaks at no extra charge. | `Rocket` |

---

## Layout

```
[ eyebrow: "Simple by design" ]
[ HEADLINE: HOW IT WORKS ]

  ┌──────────────────────────────────────────────────────────────┐
  │  [01]           [02]           [03]                          │
  │  [icon]  ────  [icon]  ────  [icon]                          │
  │                                                              │
  │  BOOK A CALL   WE BUILD      YOU LAUNCH                      │
  │  body copy     body copy     body copy                       │
  └──────────────────────────────────────────────────────────────┘
```

- **Mobile (< 768px)**: 1 column, steps stack vertically, connector hidden
- **Tablet (768px)**: 1 column — same as mobile
- **Desktop (1280px)**: 3-column grid, equal height, horizontal connector between icons

---

## Visual Design

**Section background**: `#0d0f14` (`bg-bg`) — alternates back from ProblemSection's surface,
establishing a bg → surface → bg → surface rhythm across the page.

**Step number treatment** (key differentiator from ProblemSection cards):
- Large Bebas Neue numeral (`01`, `02`, `03`) rendered behind the icon as a decorative anchor
- Size: `text-[6rem]` (96px), color: `text-foreground/[0.04]` (near-invisible, just texture)
- Positioned `absolute top-0 right-4` inside the card, so it bleeds into the corner
- This gives the section a "numbered steps" feel without making the number the primary read

**Icon treatment** (consistent with ProblemSection):
- Container: `bg-neon/[0.08]`, `rounded-lg`, `p-3`
- Icon: `text-neon`, `w-6 h-6`
- Positioned above the headline, after the decorative number

**Step card**:
- Background: `#161920` (`bg-surface`) — inverted vs section bg, same depth trick as ProblemSection
- Border: `#1e2330` (`border-brand-border`), 1px
- Hover: `translateY(-4px)`, border → `neon/30`
- Padding: `p-8`
- Radius: `rounded-xl`
- Position: `relative overflow-hidden` (to clip the decorative number)

**Connector** (desktop only):
- A horizontal line between the icon containers of each step
- Implementation: `absolute` pseudo-line via a `div` positioned in the grid gap
- Style: `border-t border-dashed border-neon/20`
- Spans from center of icon 1 to center of icon 3
- Hidden on mobile (`hidden md:block`)

---

## Typography

| Element | Font | Size | Color |
|---|---|---|---|
| Eyebrow | DM Sans | 11px, uppercase, tracked | neon `#38bdf8` |
| Section headline | Bebas Neue | `clamp(2.5rem, 6vw, 5rem)` | foreground |
| Decorative number | Bebas Neue | `6rem` | foreground at 4% opacity |
| Card headline | Bebas Neue | `1.75rem` (28px) | foreground |
| Card body | DM Sans | 15px | muted-foreground |

---

## Animation

Scroll-triggered via Framer Motion `whileInView` + `once: true`:

| Element | Delay |
|---|---|
| Eyebrow + headline | 0ms |
| Step 1 | 0ms |
| Step 2 | 120ms |
| Step 3 | 240ms |
| Connector line | 300ms, width 0→100% |

- Each card: `opacity 0→1` + `y 20→0`, duration `0.5s easeOut`
- Hover: `whileHover={{ y: -4 }}`, `duration: 0.2s` — skipped if `prefers-reduced-motion`
- Connector: animates `scaleX 0→1`, `transform-origin: left`, skipped if `prefers-reduced-motion`
- Viewport threshold: `amount: 0.2`

---

## Spacing

```
Section:               bg-bg, py-24
Content:               max-w-6xl mx-auto px-4
Eyebrow → Headline:    mb-4
Headline → grid:       mt-16
Card gap:              gap-6
Card inner:            p-8, relative overflow-hidden
```

---

## Constraints

- No CTA in this section — the CTA section handles that
- No fire orange — reserved for CTAs
- Step numbers are texture only, not primary navigation
- Connector line must be desktop-only and purely decorative (no `aria` role needed)
- Icon set must match: `CalendarCheck`, `Code2`, `Rocket` — verify all exist in lucide-react before import
