// src/styles/tokens.ts
// Praut Visual Book v3.0 — single source of truth.
// Every component MUST import brand values from here.
// NEVER hardcode hex colors, fonts, shadows, springs or magic numbers elsewhere.

export const colors = {
  // Navy backgrounds (60% rule)
  navy: {
    950: "#060818", // video frame bg — DARKEST
    900: "#0a0e2e", // slide content bg
    800: "#0f1440", // card base
    700: "#141a52", // card highlighted
    600: "#1a2266",
    500: "#222c85",
  },
  // Blue accent — borders, logo mark, links
  blue: {
    400: "#506FFB", // PRIMARY frame border + logo mark
    500: "#3B4EF0",
    700: "#283487",
    900: "#181E4E",
  },
  // Purple accent (10% rule) — CTA, glow, decoration
  purple: {
    50: "#FAF5FF", // headings
    100: "#F2E7FF",
    200: "#E4CFFF", // body text
    300: "#D6B0FF", // icons, secondary text
    400: "#BC7EFF", // decoration only (NEVER as text)
    600: "#8D2AF3", // MAIN CTA
    700: "#7520CC",
    800: "#55178C",
  },
  // Semantic state colors
  semantic: {
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
    info: "#506FFB",
  },
  // Logo gradient (for text via background-clip)
  logoText: "linear-gradient(135deg, #506FFB 0%, #8D2AF3 100%)",
} as const;

export const gradients = {
  logoText: "linear-gradient(135deg, #506FFB 0%, #8D2AF3 100%)",
  brandPrimary: "linear-gradient(135deg, #8D2AF3 0%, #3B4EF0 100%)",
  brandWide: "linear-gradient(135deg, #BC7EFF 0%, #8D2AF3 50%, #3B4EF0 100%)",
  dark: "linear-gradient(145deg, #0a0e2e 0%, #141a52 100%)",
  card: "linear-gradient(145deg, #0f1440 0%, #141a52 100%)",
  topBarFade:
    "linear-gradient(180deg, rgba(6,8,24,0.92) 0%, rgba(6,8,24,0.6) 60%, transparent 100%)",
} as const;

export const fonts = {
  primary: '"Montserrat", sans-serif',
  mono: '"IBM Plex Mono", monospace',
} as const;

// NEVER use weight < 500 on dark mode
export const fontWeight = {
  body: 500,
  bodyEmphasis: 600,
  heading: 700,
  display: 800,
} as const;

export const typeScale = {
  display: { size: 48, font: fonts.primary, weight: 800, color: "#FAF5FF" },
  h1: { size: 36, font: fonts.primary, weight: 700, color: "#FAF5FF" },
  h2: { size: 28, font: fonts.primary, weight: 700, color: "#FAF5FF" },
  h3: { size: 22, font: fonts.primary, weight: 600, color: "#E4CFFF" },
  body: { size: 18, font: fonts.primary, weight: 500, color: "#E4CFFF" },
  small: { size: 14, font: fonts.primary, weight: 500, color: "#D6B0FF" },
  caption: { size: 12, font: fonts.mono, weight: 400, color: "#D6B0FF" },
  episode: { size: 12, font: fonts.mono, weight: 400, color: "#E4CFFF" },
} as const;

export const frame = {
  width: 1920,
  height: 1080,
  topBarHeight: 72,
  sidePadding: 14,
  bottomPadding: 14,
  borderWidth: 1.5,
  borderColor: "#506FFB",
  borderRadius: 4,
  bg: "#060818",
} as const;

// Short (9:16) and Square (1:1) frame variants
export const frameShort = {
  width: 1080,
  height: 1920,
  topBarHeight: 80,
  sidePadding: 18,
  bottomPadding: 18,
  borderWidth: 2,
  borderColor: "#506FFB",
  borderRadius: 8,
  bg: "#060818",
} as const;

export const frameSquare = {
  width: 1080,
  height: 1080,
  topBarHeight: 64,
  sidePadding: 16,
  bottomPadding: 16,
  borderWidth: 2,
  borderColor: "#506FFB",
  borderRadius: 8,
  bg: "#060818",
} as const;

// NEVER drop-shadows on dark mode — only glow
export const glow = {
  active: "0 0 18px rgba(80,111,251,0.3), 0 0 4px rgba(80,111,251,0.12)",
  cta: "0 4px 24px rgba(141,42,243,0.5)",
  ctaHover: "0 6px 32px rgba(141,42,243,0.65)",
  subtle: "0 2px 16px rgba(141,42,243,0.3)",
  card: "0 0 0 1px rgba(141,42,243,0.18)",
} as const;

// Spring presets — unified rhythm across all videos
export const springs = {
  smooth: { damping: 200, stiffness: 100, mass: 0.8 },
  bouncy: { damping: 12, stiffness: 100, mass: 0.5 },
  snappy: { damping: 200, stiffness: 300, mass: 0.5 },
  gentle: { damping: 30, stiffness: 80, mass: 1.0 },
} as const;

// Standard timing (frames @ 30fps)
export const timing = {
  instant: 6, // 0.2s
  fast: 12, // 0.4s
  medium: 24, // 0.8s
  slow: 45, // 1.5s
  reveal: 60, // 2.0s
} as const;

// Channel metadata defaults — TopBar right-side text
export const channel = {
  name: "Martin Svanda",
  episodePrefix: "EP",
  taglines: [
    "Progressive Automatisation",
    "Prime Automatisation",
    "Private Automatisation",
    "Precise Automatisation",
    "Practical Automatisation",
    "Predictive Automatisation",
    "Process Automatisation",
    "Professional Automatisation",
    "Productive Automatisation",
  ],
} as const;

/**
 * Deterministically pick a tagline based on episode number.
 * Same episode → same tagline across renders. Default falls back to
 * "Progressive Automatisation" when no number is supplied.
 */
export const pickTagline = (episodeNumber?: string): string => {
  const seed = episodeNumber ?? "00";
  const hash = [...seed].reduce((s, c) => s + c.charCodeAt(0), 0);
  return channel.taglines[hash % channel.taglines.length];
};

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────

/**
 * Append alpha (0..1) to a 6-digit hex color.
 * Returns "#RRGGBBAA". Falls back to original hex if input is invalid.
 *
 * @example withOpacity('#506FFB', 0.4) // '#506FFB66'
 */
export const withOpacity = (hex: string, alpha: number): string => {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return hex + a;
};

/**
 * Cyclic series colors for charts (4 series max recommendation).
 * Strong blue + strong purple only — no faded pinks.
 */
export const seriesColors = [
  colors.purple[600],
  colors.blue[400],
  colors.blue[500],
  colors.purple[700],
] as const;

export type Tokens = {
  colors: typeof colors;
  gradients: typeof gradients;
  fonts: typeof fonts;
  fontWeight: typeof fontWeight;
  typeScale: typeof typeScale;
  frame: typeof frame;
  glow: typeof glow;
  springs: typeof springs;
  timing: typeof timing;
};
