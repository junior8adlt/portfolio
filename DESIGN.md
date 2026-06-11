# DESIGN.md — Alberto O. Portfolio

## Concept

**"Live forensic terminal."** Opening the site is opening a case file inside a phosphor CRT terminal session. Not hacker cosplay: the restraint of a real engineer's tooling — dense, labeled, indexed — with one theatrical moment (the boot sequence) and quiet craft everywhere else.

Theme scene: a hiring manager opens the link at their desk at 9pm after reading the CV. Dark is forced by the phosphor-CRT metaphor, which is the brand itself.

## Color (OKLCH, committed strategy)

Dark surface drenched in near-black with a green undertone; phosphor green carries identity (type accents, rules, focus). Amber for annotations/warnings, red strictly for "incident" data points.

```css
--ink:        oklch(0.16 0.006 150);  /* page bg, green-tinted near-black (#0a0d0b zone) */
--ink-raise:  oklch(0.20 0.008 150);  /* raised surfaces, table stripes */
--ink-line:   oklch(0.32 0.012 150);  /* hairline borders */
--phosphor:   oklch(0.82 0.21 148);   /* primary accent, CRT green */
--phosphor-dim: oklch(0.60 0.12 148); /* secondary green, large fills */
--paper:      oklch(0.90 0.012 130);  /* primary text, warm off-white */
--paper-dim:  oklch(0.66 0.015 140);  /* muted text */
--amber:      oklch(0.80 0.14 85);    /* annotations, "examiner notes" */
--alarm:      oklch(0.66 0.19 27);    /* incident/red data points only */
```

Rules: never #000/#fff. Green at full chroma only in small doses (labels, cursor, focus rings, key numbers). Body text is `--paper`, NOT green — green body text is the cosplay trap. Contrast: paper on ink ≥ 12:1, phosphor on ink ≥ 8:1, paper-dim ≥ 4.5:1.

## Typography

- **IBM Plex Mono** — UI voice: nav, labels, indexes, metadata, headings. Terminal register, tabular numbers for data.
- **Newsreader** (serif, incl. italic) — long-form case-study prose and "examiner annotations" (italic, amber). The mono/serif collision = machine output vs. human analysis, the core visual idea.

Scale (1.333 ratio-ish): 12 label-mono / 14 meta / 16–17 body serif / 20 / 28 / 38 / 56 display. Body line-height 1.65, max width 68ch. Headings mono, uppercase, letter-spacing 0.08em at small sizes only.

## Layout

- Full-bleed dark; content in a max-w-5xl column with generous asymmetric whitespace.
- **No card grids.** Projects render as a ledger: indexed rows (`[001]`, `[002]`) with hairline separators, status tags, and one keyline metric. Hover = row raises + scanline sweep.
- Case studies use a labeled-section skeleton: `── SITUATION ──`, `── EVIDENCE ──` mono rules; serif prose; evidence as numbered exhibits.
- Sticky minimal header: name as `alberto@ochoa:~$`, nav links, ⌘K hint.
- Footer = terminal status bar (uptime, location, links).

## Motion

CSS-first. One orchestrated moment: home boot sequence (staggered line reveals, 40–80ms stagger, steps() typing on the last line, blinking block cursor). Elsewhere: micro only — scramble/decode on nav hover, scanline sweep on row hover, 150–250ms ease-out-quart transitions. `prefers-reduced-motion`: boot collapses to instant reveal, scramble disabled. Never animate layout properties.

## Texture

- Subtle scanline overlay (2–3% opacity repeating gradient) + faint noise on the page, fixed, pointer-events-none.
- Phosphor glow: tiny text-shadow on accent elements only (0 0 8px at ~30%).
- No glassmorphism, no gradient text, no side-stripe borders, no hero-metric template.

## Components vocabulary

- `<SectionRule>` mono labeled divider `── LABEL ──────`
- `<Ledger>` indexed project rows
- `<Exhibit>` numbered evidence item (metric + caption)
- `<Stamp>` status tag, 1px border, uppercase mono (`PRODUCTION`, `MVP`, `NDA`)
- `<Annotation>` amber italic serif examiner note
- Command palette (⌘K / ctrl+K): navigation + external links, custom lightweight.

## Accessibility & performance

Focus rings = 2px phosphor outline, always visible. All interactive ≥44px touch. Semantic headings h1→h3 sequential. Reduced-motion respected globally. Fonts via next/font (swap), zero layout shift. JS budget: home < 100kb gz; effects in CSS, palette and scramble are the only client components.
