---
name: praut-brand-tokens
description: Single source of truth for Praut visual design — colors, gradients, fonts, springs, timing, glows
metadata:
  tags: praut, brand, tokens, design-system
---

# Praut Brand Tokens

The whole visual identity is contained in **`src/styles/tokens.ts`**. Never hardcode hex
codes, font names, magic spring configs or shadows anywhere else.

Import what you need:

```ts
import {
  colors,
  gradients,
  fonts,
  fontWeight,
  typeScale,
  frame,
  glow,
  springs,
  timing,
  withOpacity,
  seriesColors,
} from '@/styles/tokens';
```

## Colors

| Group | Levels | Use |
|---|---|---|
| `colors.navy` | 950, 900, 800, 700, 600, 500 | All backgrounds (60% rule). 950 = darkest video bg. |
| `colors.blue` | 400, 500, 700, 900 | Borders, links, frame chrome. **400 is THE primary accent.** |
| `colors.purple` | 50, 100, 200, 300, 400, 600, 700, 800 | Text (50–300), decoration (400), CTA (600). |
| `colors.semantic` | success, warning, error, info | State indicators only. |

## Gradients

| Token | Use |
|---|---|
| `gradients.logoText` | Brand wordmark, hero text via background-clip |
| `gradients.brandPrimary` | CTA buttons, winner cards |
| `gradients.brandWide` | Decorative overlays, hook backgrounds |
| `gradients.dark` | Panel backgrounds |
| `gradients.card` | Standard card background |
| `gradients.topBarFade` | TopBar overlay |

## Fonts

- `fonts.primary` = `"Montserrat", sans-serif` — all body and headings
- `fonts.mono` = `"IBM Plex Mono", monospace` — labels, code, technical text

**Never use `Inter`, `Arial`, or generic `sans-serif`.**
Load via `@remotion/google-fonts` with `latin-ext` subset (Czech diacritics).

## Type scale

Each entry has `{size, font, weight, color}`:
- `display` 48px / 800
- `h1` 36px / 700
- `h2` 28px / 700
- `h3` 22px / 600
- `body` 18px / 500 (**minimum** for dark mode)
- `small` 14px / 500
- `caption` 12px / mono / 400

## Frame

- `frame.width` 1920, `frame.height` 1080, `frame.bg` `#060818`
- `frame.borderColor` `#506FFB`, `frame.borderWidth` 1.5
- 9:16 → `frameShort`, 1:1 → `frameSquare`

## Glows (use INSTEAD of box-shadow)

- `glow.active` — frame border, active UI
- `glow.cta` / `glow.ctaHover` — CTA buttons
- `glow.subtle` — cards, gentle highlights
- `glow.card` — card outline glow

## Springs

- `springs.smooth` — fades, chapter reveals
- `springs.bouncy` — playful pops (likes, badges)
- `springs.snappy` — UI elements, neuron activation
- `springs.gentle` — slow heavy moves

## Timing (frames @ 30fps)

- `instant` 6 / `fast` 12 / `medium` 24 / `slow` 45 / `reveal` 60

## Five universal rules

### 1. Background from navy palette only

```tsx
// ❌ WRONG
<div style={{background: '#1a1a1a'}} />
// ✅ CORRECT
<div style={{background: colors.navy[800]}} />
```

### 2. Text weight ≥ 500, color from purple

```tsx
// ❌ WRONG
<p style={{color: '#fff', fontWeight: 400}}>Text</p>
// ✅ CORRECT
<p style={{color: colors.purple[200], fontWeight: 500, fontFamily: fonts.primary}}>Text</p>
```

### 3. Accent only blue-400 or purple-600

```tsx
border: `${frame.borderWidth}px solid ${frame.borderColor}` // 1.5px #506FFB
background: gradients.brandPrimary // CTA
```

### 4. Glow instead of box-shadow

```tsx
// ❌ WRONG
boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
// ✅ CORRECT
boxShadow: glow.active
```

### 5. Springs and timing only

```tsx
// ❌ WRONG
spring({frame, fps, config: {damping: 14, stiffness: 67}})
// ✅ CORRECT
spring({frame, fps, config: springs.smooth})
```

## Conversion checklist (8 steps)

When converting any generic Remotion component to Praut brand:

1. Import everything from `tokens.ts`. Nothing else.
2. Find every hex literal (`#`) — replace with a token.
3. Find every `fontFamily` — replace with `fonts.primary` or `fonts.mono`.
4. Find every `fontWeight` — never < 500. If 400, raise to 500.
5. Find every `boxShadow` — replace with a `glow` token.
6. Find `background: '#000'`, `'#fff'`, `'gray'` — remove, use `colors.navy.X`.
7. Find any `spring({..., config: {...}})` — replace config with a `springs` preset.
8. Test in Remotion Studio on `colors.navy[950]` — if anything disappears, contrast is broken.

## Helpers

- `withOpacity(hex, alpha)` → `'#506FFB66'` (RGBA hex8 string)
- `seriesColors` → `[purple-600, blue-400, purple-300, blue-500]` for chart series
