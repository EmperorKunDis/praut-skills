---
name: praut-frame-system
description: How to wrap Praut compositions in PrautVideoFrame, TopBar, SafeArea, Watermark
metadata:
  tags: praut, frame, layout, composition
---

# Praut Frame System

Every Praut video starts with `<PrautVideoFrame>` (or `<PrautShortFrame>` / `<PrautSquareFrame>`
for 9:16 / 1:1 formats). It provides the brand-correct outer chrome.

## Standard 16:9 frame

```tsx
import {PrautVideoFrame} from '@/components/frame/PrautVideoFrame';

<PrautVideoFrame
  episodeNumber="01"
  episodeTitle="Co je to LLM"
>
  {/* your slides */}
</PrautVideoFrame>
```

What it gives you:

- **1920×1080** safe area with `useScaleToFit` — works on any output size.
- Outer **1.5px `#506FFB` border** with `frame.borderRadius` 4.
- **TopBar** with brand lockup left, episode meta right (default: `EP 01 / Praut AI Channel`).
- **Watermark** (`bottom-right brain mark + PRAUT`, opacity 0.6).
- **SpiralGalaxy** canvas background (density-wave spiral, ~6000 stars) — rendered by default.
- Background `frame.bg` (#060818) behind the galaxy.

### Layer order

```
SpiralGalaxy → LiquidGlassPanel → children → TopBar → Watermark
```

The `<SpiralGalaxy>` component is the **default background** for all three frame
variants. Disable with `includeBackground={false}` if you need a plain navy bg
or a custom `<SpaceNebula>` instead.

### Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `episodeNumber` | `string?` | undefined | "01", "12", … |
| `episodeTitle` | `string?` | undefined | Optional subtitle in TopBar |
| `channelName` | `string?` | `"Praut AI Channel"` | Override channel label |
| `includeTopBar` | `boolean?` | `true` | Hide for raw frames |
| `includeWatermark` | `boolean?` | `true` | Hide for clean exports |
| `includeBackground` | `boolean?` | `true` | Render the SpiralGalaxy behind children |
| `frameless` | `boolean?` | `false` | Drop the brand border completely |
| `borderState` | `'active' \| 'passive'` | `'active'` | Active = full glow border, passive = 1px 25% opacity |

## Short (9:16) and Square (1:1) variants

```tsx
import {PrautShortFrame} from '@/components/frame/PrautShortFrame';
import {PrautSquareFrame} from '@/components/frame/PrautSquareFrame';

<PrautShortFrame episodeTitle="LLM nečte slova">
  {/* 1080×1920 content */}
</PrautShortFrame>

<PrautSquareFrame slideNumber={1} totalSlides={7}>
  {/* 1080×1080 content */}
</PrautSquareFrame>
```

## Layout helpers

- `<SafeArea>` — pure scale-to-fit wrapper (used internally by PrautVideoFrame)
- `<SlideRoot>` — content slide background (`colors.navy[900]`) with default padding
- `<SplitLayout left right ratio? gap?>` — 2-column split (default 50/50)
- `<TripleLayout first second third gap?>` — 3-column equal grid
- `<PiPLayout webcamSrc screenSrc>` — picture-in-picture for tutorials
- `<SpeakerScreenLayout speaker screen focus?>` — talking head + content slide

## TopBar metadata format

The right-side label is composed as `{episodePrefix} {episodeNumber} / {channelName}`,
e.g. `EP 01 / Praut AI Channel`. Override `channelName` per composition or globally
by editing `tokens.ts → channel.name`.

## When to break the rules

- For raw exports (no chrome): `<PrautVideoFrame frameless includeTopBar={false} includeWatermark={false}>`
- For passive slides where active glow would distract: `borderState="passive"`
- For chapter cards full-bleed: pass `<ChapterCard>` directly without `PrautVideoFrame`

## Episode numbers

Use a 2-digit zero-padded string: `"01"`, `"12"`, etc. The token `channel.episodePrefix`
defaults to `"EP"` — change there if you want `"S01E"` or another format.
