---
name: praut-logos
description: Praut brand logos, brain mark, BrandLogo lockup and Watermark usage
metadata:
  tags: praut, brand, logo, watermark
---

# Praut Logos

## Logo files in `public/logo/`

| File | Use |
|---|---|
| `praut.svg` (3.3 KB) | Compact brand mark, default for inline usage |
| `logopraut.svg` (11 KB) | **Used by `<BrainMark />`** — detailed puzzle mark |
| `praut-logo.png` (174 KB) | Raster fallback, medium size |
| `praut-large.png` (319 KB) | Hi-res raster |
| `icon-zapisovatel-256.png` | Product icon — Zápisovatel (256×256) |
| `icon-zapisovatel-1024.png` | Product icon — Zápisovatel hi-res |

Reference them with Remotion's `staticFile()`:

```tsx
import {Img, staticFile} from 'remotion';

<Img src={staticFile('logo/praut.svg')} alt="Praut" />
```

## `<BrainMark />` — the puzzle mark

```tsx
import {BrainMark} from '@/components/frame/BrainMark';

<BrainMark size={64} glow />
```

Renders the canonical Praut brain puzzle mark from `logopraut.svg`. Use this
anywhere you need just the mark without the wordmark.

For an animated assembling version of the mark, use `<PuzzleAssemble />` from
`@/components/transitions/PuzzleAssemble` instead — it draws the 4 puzzle tiles
in pure code so they're animatable and color-correct from tokens.

## `<BrandLogo />` — the lockup

```tsx
import {BrandLogo} from '@/components/frame/BrandLogo';

<BrandLogo size={48} variant="full" />
<BrandLogo size={48} variant="mark" />   // mark only
<BrandLogo size={48} variant="text" />   // wordmark only
<BrandLogo size={48} monochrome />        // single color, no gradient
```

The full lockup is `BrainMark + "PRAUT"` text in the brand `logoText` gradient
(`#506FFB → #8D2AF3`). Used automatically by `<TopBar>`.

## `<WatermarkPraut />`

```tsx
import {WatermarkPraut} from '@/components/frame/WatermarkPraut';

<WatermarkPraut position="bottom-right" opacity={0.6} />
```

Discreet brain-mark + "PRAUT" caption anchored to a corner. Already included
by `<PrautVideoFrame>` — only render directly if you need a custom position.

## Safe zone

Around any logo lockup keep at least **1× the width of the brain mark** as
clear space. The brand mark must never touch other UI elements.

## Color treatment

- **Default**: gradient (`gradients.logoText`) on the wordmark.
- **Monochrome**: pass `monochrome` prop → renders in `colors.purple[50]`.
- **Mark color**: always brand blue `colors.blue[400]` with the layered
  opacities defined in `<PuzzleAssemble>` (100/70/45/25%).

## What NOT to do

- Don't render the wordmark in any color other than the brand gradient or `purple[50]`.
- Don't stretch or rotate the lockup.
- Don't put the lockup on a background lighter than `colors.navy[700]`.
- Don't load `img/logo .svg` (3.7 MB original) — too heavy. Use `praut.svg` or
  `logopraut.svg` instead.
- Don't crop the safe zone.
