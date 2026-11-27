# Direct Solar Services — Design System

**Mood:** Editorial, Cinematic, Grounded
**Reference:** Apple Energy pages meets Linear's restraint

**Motion Tier:** Tier 2 (Storytelling) — scroll-scrub pinned hero on home, scroll reveals elsewhere, Lenis smooth scroll. No 3D, no horizontal scroll.

---

## Colors (CSS Custom Properties)

```css
:root {
  --bg:           #080D0B;
  --bg-secondary: #10251B;
  --surface:      #142A1F;
  --accent:       #B8F36B;
  --accent-hover: #A8E35B;
  --text:         #F5F7F2;
  --text-muted:   #A4ADA5;
  --border:       rgba(184, 243, 107, 0.12);
  --border-glass: rgba(255, 255, 255, 0.08);
  --glass-bg:     rgba(8, 13, 11, 0.6);
  --glass-bg-light: rgba(255, 255, 255, 0.04);
  --overlay:      rgba(8, 13, 11, 0.85);
}
```

**One accent only:** `#B8F36B`. No second accent.

---

## Typography

**Display:** Manrope (variable, 600–800 weight)
**Body:** Manrope (400 weight)

| Token         | Size    | Weight | Line-height | Letter-spacing |
|---------------|---------|--------|-------------|----------------|
| --text-hero   | clamp(2.5rem, 6vw, 5rem) | 800 | 1.0 | -0.03em |
| --text-h1     | clamp(2rem, 4vw, 3.5rem)  | 700 | 1.1 | -0.02em |
| --text-h2     | clamp(1.5rem, 3vw, 2.25rem) | 700 | 1.15 | -0.015em |
| --text-h3     | 1.25rem | 600 | 1.3 | 0 |
| --text-body   | 1rem    | 400 | 1.6 | 0 |
| --text-small  | 0.875rem | 400 | 1.5 | 0.01em |
| --text-eyebrow| 0.75rem | 600 | 1.0 | 0.15em |

Eyebrow text: uppercase, accent color, wide tracking.

---

## Spacing Scale

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px

## Radius

`--radius: 12px` — used on cards, form inputs, buttons.
`--radius-sm: 8px` — small elements, pills.
`--radius-full: 9999px` — chatbot FAB only.

---

## Glassmorphism Rules

Apply glass to:
- Sticky navbar (on scroll)
- Service/benefit cards
- Quote form container
- Chatbot window

**Glass recipe:**
```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-glass);
  /* subtle top highlight */
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
}
```

Do NOT apply glass to: body/section backgrounds, text blocks, large areas.

---

## Components

### Button — Primary
```
bg: var(--accent) | color: var(--bg) | font-weight: 600
padding: 14px 32px | border-radius: var(--radius)
hover: var(--accent-hover), translateY(-1px), shadow
focus-visible: 2px solid var(--accent), 2px offset
disabled: opacity 0.4, no pointer
transition: all var(--dur-fast) var(--ease-out)
```

### Button — Secondary (outline)
```
bg: transparent | border: 1px solid var(--border)
color: var(--text) | same sizing
hover: border-color var(--accent), color var(--accent)
```

### Card (glass)
```
glass recipe + padding: 32px
hover: border-color var(--accent) at 0.2 opacity, translateY(-2px)
max nesting: section > card (never card > card)
```

### Nav (sticky glass)
```
top: 0 | glass recipe on scroll (transparent at top)
height: 72px | z-index: 1000
logo left, links center, CTA right
mobile: hamburger → slide-out menu
```

### Form inputs
```
bg: rgba(255,255,255,0.05) | border: 1px solid var(--border-glass)
color: var(--text) | padding: 14px 16px | radius: var(--radius)
focus: border-color var(--accent), glow shadow
label: var(--text-muted), above input
error: red-400 border + message below
```

### Footer
```
bg: var(--bg) | border-top: 1px solid var(--border-glass)
4-column grid on desktop, stacked mobile
```

---

## Motion Tokens

```css
:root {
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-inout: cubic-bezier(0.76, 0, 0.24, 1);
  --dur-fast:   150ms;
  --dur-base:   400ms;
  --dur-slow:   800ms;
}
```

Reveal travel: max 40px translateY. Trigger once. Stagger: 60–80ms.

---

## Do-Not List
- No teal/purple gradient mashup
- No card-inside-card nesting
- No blinking/pulsing dots or fake live badges
- No identical paired CTAs
- No icon-feature-grid as section 2
- No floating particles or decorative parallax
- No invented stats, reviews, certifications, or project counts
- No stock photography watermarks
- Max ONE scroll-scrub/pinned section (the hero)
