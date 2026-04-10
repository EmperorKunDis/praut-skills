// ============================================================
// loadPhosphorFont.ts
// ============================================================
// Side-effect module: load all 6 Phosphor icon font weights so PhosphorIcon can render.
// Imported once from Root.tsx (top-level) so the fonts are available before any frame renders.

import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

type Variant = {
  family: string;
  url: string;
};

const variants: Variant[] = [
  {
    family: "Phosphor",
    url: staticFile("fonts/phosphor/regular/Phosphor.woff2"),
  },
  {
    family: "Phosphor-Bold",
    url: staticFile("fonts/phosphor/bold/Phosphor-Bold.woff2"),
  },
  {
    family: "Phosphor-Fill",
    url: staticFile("fonts/phosphor/fill/Phosphor-Fill.woff2"),
  },
  {
    family: "Phosphor-Light",
    url: staticFile("fonts/phosphor/light/Phosphor-Light.woff2"),
  },
  {
    family: "Phosphor-Thin",
    url: staticFile("fonts/phosphor/thin/Phosphor-Thin.woff2"),
  },
  {
    family: "Phosphor-Duotone",
    url: staticFile("fonts/phosphor/duotone/Phosphor-Duotone.woff2"),
  },
];

for (const v of variants) {
  loadFont({
    family: v.family,
    url: v.url,
    format: "woff2",
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.warn(`[PhosphorIcon] Failed to load font "${v.family}":`, err);
  });
}

export const PHOSPHOR_FONT_FAMILIES = variants.map((v) => v.family);

// ============================================================
// PhosphorIcon.tsx
// ============================================================
import React from "react";
import { colors, glow as glowTokens } from "../../styles/tokens";
import phosphorGlyphsJson from "./phosphor-glyphs.json";

const phosphorGlyphs = phosphorGlyphsJson as Record<string, string>;

export type PhosphorWeight =
  | "regular"
  | "bold"
  | "fill"
  | "light"
  | "thin"
  | "duotone";

export type PhosphorGlow = "none" | "subtle" | "active" | "cta";

/**
 * Type alias of all known Phosphor icon names — derived from the generated
 * `phosphor-glyphs.json` so it stays in sync with whatever `extract-phosphor-glyphs`
 * produced. Use as `<PhosphorIcon name="rocket-launch" />`.
 */
export type PhosphorIconName = keyof typeof phosphorGlyphsJson;

const FAMILY_BY_WEIGHT: Record<PhosphorWeight, string> = {
  regular: "Phosphor",
  bold: "Phosphor-Bold",
  fill: "Phosphor-Fill",
  light: "Phosphor-Light",
  thin: "Phosphor-Thin",
  duotone: "Phosphor-Duotone",
};

type Props = {
  /** Phosphor icon name (e.g. "rocket-launch", "brain", "code"). */
  name: PhosphorIconName | string;
  /** Pixel size of the icon. Defaults to 24. */
  size?: number;
  /** Color of the glyph. Defaults to brand `colors.blue[400]`. */
  color?: string;
  /** Phosphor weight variant. Defaults to `regular`. */
  weight?: PhosphorWeight;
  /** Brand glow effect applied via CSS `filter: drop-shadow(...)`. */
  glow?: PhosphorGlow;
  /** Additional inline styles merged on top of defaults. */
  style?: React.CSSProperties;
  /** Accessible label. Defaults to the icon name. */
  ariaLabel?: string;
};

/**
 * Render a Phosphor icon as a glyph from the Phosphor webfont.
 *
 * Usage:
 *   <PhosphorIcon name="rocket-launch" size={48} color={colors.purple[600]} glow="cta" />
 *
 * Notes:
 * - Loads the woff2 font via `loadPhosphorFont.ts` (must be imported at app root).
 * - Renders nothing (and warns in dev) if the icon name is unknown.
 * - All weight variants share the same unicode glyph mapping.
 */
export const PhosphorIcon: React.FC<Props> = ({
  name,
  size = 24,
  color = colors.blue[400],
  weight = "bold",
  glow = "none",
  style,
  ariaLabel,
}) => {
  const glyph = phosphorGlyphs[name];
  if (!glyph) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(`[PhosphorIcon] Unknown icon name: "${name}"`);
    }
    return null;
  }

  const fontFamily = FAMILY_BY_WEIGHT[weight];
  const filter =
    glow === "none"
      ? undefined
      : `drop-shadow(${
          glow === "active"
            ? glowTokens.active
            : glow === "cta"
              ? glowTokens.cta
              : glowTokens.subtle
        })`;

  return (
    <span
      role="img"
      aria-label={ariaLabel ?? name}
      style={{
        fontFamily,
        fontSize: size,
        lineHeight: 1,
        color,
        display: "inline-block",
        filter,
        ...style,
      }}
    >
      {glyph}
    </span>
  );
};
