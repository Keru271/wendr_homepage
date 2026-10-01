# Kinetic Typography Design System — OmniStore CMS

> High-energy dark brutalist poster aesthetic, typography-as-architecture, continuous marquees, hard hover color floods.

**Theme:** Dark Brutalist  
**Primary Accent:** `#DFE104` (Acid Yellow / Neon Lime)  
**Base Canvas:** `#09090B` (Zinc Jet Black)  
**Border Radius:** `0px` (Strict Brutalist Sharp Geometry)  

---

## 1. Design Philosophy

1. **Typography as Architecture**: Letterforms are not merely labels; they define the structure, rhythm, and visual hierarchy of the page. Display headings utilize uppercase **Space Grotesk** with tight tracking (`-0.04em`) and massive viewport scaling (`clamp(3.2rem, 11vw, 13rem)`).
2. **Tactile Brutalist Physics**: No blurred dropshadows or soft rounded pills. Structural elements are delimited by crisp `2px solid #3F3F46` zinc borders and hairline grid dividers.
3. **Hard Color Inversions**: Interactive cards and buttons invert instantly on hover — flooding backgrounds with Acid Yellow (`#DFE104`) and flipping text to deep black (`#000000`).
4. **Kinetic Motion & Velocity**: GPU-accelerated continuous infinite marquees with raw edge-to-edge overflow, live simulated sales tickers, and interactive real-time API response sandboxes.
5. **Atmospheric Texture**: Subtle SVG fractal noise overlay (`feTurbulence`) for physical poster grain without performance overhead.

---

## 2. Color Palette & Tokens

| Role | Color Name | Hex Code | Token | Usage Description |
|---|---|---|---|---|
| **Canvas** | Zinc Black | `#09090B` | `--bg` | Deepest background layer and default page canvas |
| **Foreground** | Pure Off-White | `#FAFAFA` | `--fg` | High-contrast display headlines and primary text |
| **Card Surface** | Surface Zinc | `#121215` | `--card-bg` | Background for interactive feature cards and panels |
| **Muted Surface** | Slate Zinc | `#27272A` | `--muted` | Sub-panels, code header bars, pill backgrounds |
| **Muted Text** | Ash Gray | `#A1A1AA` | `--muted-fg` | Secondary descriptions, timestamps, metadata |
| **Brand Accent** | Acid Yellow | `#DFE104` | `--accent` | Key buttons, active states, badge highlights, hover flood |
| **Accent Text** | Deep Black | `#000000` | `--accent-fg` | High-contrast text rendered on top of `--accent` |
| **Borders** | Zinc Border | `#3F3F46` | `--border` | 2px solid structural frame borders |
| **Subtle Borders** | Hairline Border | `#27272A` | `--border-subtle` | Grid lines and nested module dividers |

---

## 3. Typography Hierarchy

### Space Grotesk (`--font-display`)
- **Usage**: Display headlines, Section headers, Card numbers (`01`-`06`), Navigation brand lockup, CTA buttons.
- **Letter Spacing**: `-0.04em` (tight tracking for maximum visual punch).
- **Text Transform**: `uppercase`.
- **Scales**:
  - `Hero Display`: `clamp(3.2rem, 11vw, 13rem)` · Line height: `0.85`
  - `Section Display`: `clamp(2.4rem, 7vw, 6.5rem)` · Line height: `0.90`
  - `Card Display`: `clamp(1.4rem, 3.5vw, 2.75rem)` · Line height: `0.95`
  - `Massive Number`: `clamp(5rem, 14vw, 11rem)` · Line height: `0.8`

### Inter (`--font-sans`)
- **Usage**: Body copy, feature bullet points, FAQ answers, developer explanations.
- **Letter Spacing**: `-0.01em` to normal.
- **Line Height**: `1.6` to `1.7` for optimal reading flow.

### Roboto Mono (`--font-mono`)
- **Usage**: API endpoint URLs, code snippets, cURL requests, JSON response payloads, live sales terminal counters.

---

## 4. Geometry & Elevation

- **Border Radius**: `0px` (`--radius: 0px`). No rounded corners on buttons, cards, modals, or inputs.
- **Border Weight**: `2px solid var(--border)` for primary boundaries; `1px solid var(--border-subtle)` for internal dividers.
- **Shadows**: `none`. Depth is conveyed strictly through high contrast, hard borders, and acid-yellow flood states.

---

## 5. Kinetic Motion & Animations

1. **Infinite Continuous Marquee**:
   - Hardware-accelerated CSS `transform: translate3d(-50%, 0, 0)`.
   - Continuous looping at variable velocities (`20s` to `35s` linear).
   - Pauses cleanly on `:hover` for accessibility and readability.
   - Raw overflow without artificial mask gradients.
2. **Hard Color Inversion Hover Effect**:
   - `transition: background 250ms ease, color 250ms ease, border-color 250ms ease`.
   - Feature cards transition to background `#DFE104`, text `#000000`, border `#DFE104`, and card numbers to `rgba(0,0,0,0.15)`.
3. **Live Sales Ticker**:
   - Dynamic simulation stream inserting purchase items every 3.8 seconds with smooth row insertion.
4. **Interactive API Sandbox**:
   - Real-time tab switching and custom endpoint query simulation with instantaneous syntax-highlighted JSON rendering.

---

## 6. Accessibility & Compliance

- **Contrast Ratios**:
  - `#FAFAFA` on `#09090B`: **19.8:1** (Exceeds WCAG AAA).
  - `#000000` on `#DFE104`: **17.2:1** (Exceeds WCAG AAA).
  - `#A1A1AA` on `#09090B`: **7.4:1** (Exceeds WCAG AAA).
- **Reduced Motion**:
  - Respects `@media (prefers-reduced-motion: reduce)`.
  - Disables marquee animations and snappy transitions for sensitive users.
- **Semantic Structure**:
  - Single `<h1>` display heading, landmark `<nav>`, `<main>`, `<section>`, `<aside>`, and `<footer>` elements.
