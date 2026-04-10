---
name: praut-icons
description: How to use Phosphor icons (1530 icons × 6 weights) via the PhosphorIcon wrapper
metadata:
  tags: praut, icons, phosphor
---

# Praut Icons — Phosphor

Praut uses the [Phosphor icon family](https://phosphoricons.com) loaded as web fonts.
All 6 weights are pre-loaded by `src/components/icons/loadPhosphorFont.ts` (called from
`Root.tsx`). You access them through the brand wrapper:

```tsx
import {PhosphorIcon} from '@/components/icons/PhosphorIcon';
import {colors} from '@/styles/tokens';

<PhosphorIcon
  name="rocket-launch"
  size={48}
  color={colors.purple[600]}
  weight="fill"
  glow="cta"
/>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `PhosphorIconName \| string` | required | e.g. `"brain"`, `"rocket-launch"` |
| `size` | `number?` | `24` | px |
| `color` | `string?` | `colors.purple[300]` | Use a brand token |
| `weight` | `'regular' \| 'bold' \| 'fill' \| 'light' \| 'thin' \| 'duotone'` | `'regular'` | |
| `glow` | `'none' \| 'subtle' \| 'active' \| 'cta'` | `'none'` | drop-shadow filter |
| `ariaLabel` | `string?` | name | Accessibility |
| `style` | `React.CSSProperties?` | — | Merged on top |

If `name` is unknown the component renders `null` and warns in dev — there are 1530
known icons in `src/components/icons/phosphor-glyphs.json`.

## Recommended icons for Praut AI Channel

| Topic | Icon name | Weight |
|---|---|---|
| LLM / AI core | `brain` | fill / duotone |
| Prompt / chat | `chat-circle-text` | fill |
| Code | `code` | bold |
| Speed / power | `lightning` | fill |
| Launch / release | `rocket-launch` | duotone |
| Robot / agent | `robot` | fill |
| Network | `share-network`, `graph` | bold |
| Database | `database` | fill |
| Files / docs | `files`, `file-text` | regular |
| Lightbulb / tip | `lightbulb`, `lightbulb-filament` | fill |
| Warning | `warning` | fill |
| Success | `check`, `check-circle` | fill |
| Error | `x`, `x-circle` | fill |
| Info | `info` | fill |
| Subscribe / play | `play-circle`, `bell` | fill |
| Like | `thumbs-up`, `thumbs-down` | fill |
| Share | `share`, `share-fat` | fill |
| Eye / observe | `eye` | fill |
| Gear / config | `gear`, `gear-six` | fill |
| Cube / module | `cube`, `cubes` | duotone |
| Cloud | `cloud` | fill |
| Shield / security | `shield`, `shield-check` | fill |

## Color guidelines

- Default: `colors.purple[300]` — secondary UI
- Important / decoration: `colors.purple[400]` (icons only — never as text)
- CTA / highlight: `colors.purple[600]`
- Frame / border: `colors.blue[400]`
- Status: `colors.semantic.success / warning / error / info`

## Glow guidelines

- `glow="active"` for live UI elements (brand-blue)
- `glow="cta"` for call-to-action icons (brand-purple)
- `glow="subtle"` for resting decoration
- `glow="none"` (default) when icon sits in dense layout

## Where to find names

Browse [phosphoricons.com](https://phosphoricons.com), or look in
`src/components/icons/phosphor-glyphs.json` (auto-generated from
`phosphor-icons/Fonts/regular/style.css`).

If you need to regenerate the mapping after a Phosphor update:

```bash
cd skillsPraut
node scripts/extract-phosphor-glyphs.mjs
```
