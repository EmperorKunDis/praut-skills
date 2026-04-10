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
