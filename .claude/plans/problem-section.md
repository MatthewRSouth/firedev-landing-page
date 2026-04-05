# ProblemSection Plan — FireDev

## Goal
Make the business owner feel understood. They read this and think "that's exactly my situation" — which sets up the process section as the answer.

---

## The 3 Pain Points

| # | Card Headline | Body Copy | Lucide Icon |
|---|---|---|---|
| 1 | **INVISIBLE ONLINE** | Customers search Google. If you're not there, they hire whoever is. It's that simple. | `Search` |
| 2 | **NO SITE, NO TRUST** | A Facebook page or "call for info" signals small-time. You're losing deals before the first conversation. | `ShieldOff` |
| 3 | **DIY COSTS MORE THAN YOU THINK** | Three weekends on Wix and it still doesn't look right. Your time is worth more than that. | `Clock` |

---

## Layout

```
[ eyebrow: "Sound familiar?" ]
[ HEADLINE: THESE ARE COSTING YOU CLIENTS ]

┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  [icon]        │  │  [icon]        │  │  [icon]        │
│                │  │                │  │                │
│  INVISIBLE     │  │  NO SITE,      │  │  DIY COSTS     │
│  ONLINE        │  │  NO TRUST      │  │  MORE THAN     │
│                │  │                │  │  YOU THINK     │
│  body copy...  │  │  body copy...  │  │  body copy...  │
└────────────────┘  └────────────────┘  └────────────────┘
```

- **Mobile**: 1 column, cards stack
- **Tablet (768px)**: 1 column — cards are tall enough to breathe
- **Desktop (1280px)**: 3-column grid, equal height

---

## Visual Design

**Section background**: `surface` (#161920) — one step lighter than the hero's `#0d0f14`. Color shift signals a new section without a hard divider.

**Cards**:
- Background: `#0d0f14` — inverted from the section, creates subtle depth
- Border: `#1e2330`, 1px
- Hover: card lifts `translateY(-4px)`, border shifts to neon blue at low opacity
- Padding: `p-8`
- Radius: `rounded-xl`

**Icon treatment**:
- Container: neon blue at 8% opacity (`bg-neon/[0.08]`), `rounded-lg`, `p-3`
- Icon: neon blue (`#38bdf8`), `w-6 h-6`
- Top of card, above headline

---

## Typography

| Element | Font | Size | Color |
|---|---|---|---|
| Eyebrow | DM Sans | 11px, uppercase, tracked | neon `#38bdf8` |
| Section headline | Bebas Neue | `clamp(2.5rem, 6vw, 5rem)` | foreground |
| Card headline | Bebas Neue | `1.75rem` (28px) | foreground |
| Card body | DM Sans | 15px | muted-foreground |

---

## Animation

Scroll-triggered via Framer Motion `whileInView` + `once: true`:

| Element | Delay |
|---|---|
| Eyebrow + headline | 0ms |
| Card 1 | 0ms |
| Card 2 | 120ms |
| Card 3 | 240ms |

- Each: `opacity 0→1` + `y 20→0`, duration `0.5s easeOut`
- Hover: `whileHover={{ y: -4 }}`, `duration: 0.2s` — skipped if `prefers-reduced-motion`
- Viewport threshold: `amount: 0.2`

---

## Spacing

```
Section:        bg-surface, py-24
Content:        max-w-6xl mx-auto px-4
Eyebrow → Headline:  mb-4
Headline → grid:     mt-16
Card gap:            gap-6
```

---

## Constraints

- No CTA in this section
- No numbered styling — cards are equal, not ranked
- No colour differences between cards
- Fire orange (`#f97316`) used nowhere — reserved for CTAs
