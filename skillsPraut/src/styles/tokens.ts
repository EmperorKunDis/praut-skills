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
  /** Light pastel variant for logo on dark backgrounds. */
  logoTextLight: "linear-gradient(135deg, #9FBFFF 0%, #D6B0FF 100%)",
  brandPrimary: "linear-gradient(135deg, #8D2AF3 0%, #3B4EF0 100%)",
  brandWide: "linear-gradient(135deg, #BC7EFF 0%, #8D2AF3 50%, #3B4EF0 100%)",
  dark: "linear-gradient(145deg, #0a0e2e 0%, #141a52 100%)",
  card: "linear-gradient(145deg, #0f1440 0%, #141a52 100%)",
  topBarFade:
    "linear-gradient(180deg, rgba(6,8,24,0.92) 0%, rgba(6,8,24,0.6) 60%, transparent 100%)",
  cyberNeon:
    "linear-gradient(90deg, rgba(188,126,255,0.0) 0%, rgba(188,126,255,0.15) 50%, rgba(188,126,255,0.0) 100%)",
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
  /** LiquidGlassPanel inset from frame border. */
  glassInset: 28,
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
  deepPulse: "0 0 40px rgba(141,42,243,0.45), 0 0 80px rgba(80,111,251,0.2)",
  neon: "0 0 12px rgba(188,126,255,0.6), 0 0 24px rgba(80,111,251,0.4)",
} as const;

// Spring presets — unified rhythm across all videos
export const springs = {
  smooth: { damping: 200, stiffness: 100, mass: 0.8 },
  bouncy: { damping: 12, stiffness: 100, mass: 0.5 },
  snappy: { damping: 200, stiffness: 300, mass: 0.5 },
  gentle: { damping: 30, stiffness: 80, mass: 1.0 },
  heavy: { damping: 15, stiffness: 80, mass: 2.0 },
  wobbly: { damping: 8, stiffness: 120, mass: 0.5 },
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
  name: "Martin Švanda",
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

// ──────────────────────────────────────────────────────────
// Layout & Safe Zone
// ──────────────────────────────────────────────────────────

/** Ochranná zóna — 64 px od všech okrajů. Žádný text, grafika ani speaker. */
export const safeZone = {
  padding: 64,
} as const;

/** Master layouty — každý záběr MUSÍ použít jeden z těchto dvou. */
export const layouts = {
  /** Centrovaný obsah, max 80 % šířky. Pro plné grafy, titulní karty. */
  singleFocus: { maxWidth: "80%", align: "center" as const },
  /** Split screen: 35 % vlevo (text/speaker), 65 % vpravo (vizuál), gap 48 px. */
  splitScreen: { left: "35%", right: "65%", gap: 48 },
} as const;

// ──────────────────────────────────────────────────────────
// Navigační prvky (vždy na stejném místě)
// ──────────────────────────────────────────────────────────

export const nav = {
  /** Vlevo nahoře — navigační štítek (název kapitoly / zdroj dat). */
  chapterLabel: {
    font: fonts.mono,
    size: 14,
    color: "#BC7EFF",
    position: "top-left" as const,
  },
  /** Vpravo dole — číslování slidu (např. 04 / 28). */
  slideNumber: {
    font: fonts.mono,
    size: 14,
    color: "#BC7EFF",
    position: "bottom-right" as const,
  },
  /** Vlevo dole — floating info box (doplňující kontext ke grafu). */
  infoBox: {
    bg: "#0F1440",
    border: "1px solid rgba(141,42,243,0.18)",
    borderRadius: 12,
  },
} as const;

// ──────────────────────────────────────────────────────────
// Episode header (vpravo nahoře — vždy viditelný)
// ──────────────────────────────────────────────────────────

/**
 * Episode header — vpravo nahoře nonstop:
 *   řádek 1: "EP 01 / 10 Mýtů o AI"
 *   řádek 2: název aktuální kapitoly
 */
export const episodeHeader = {
  /** Formát prvního řádku. Nahradit {number} a {title}. */
  format: "EP {number} / {title}",
  /** Pod titulem epizody vždy název aktuální kapitoly. */
  chapterSubtitle: true,
  font: fonts.mono,
  size: 12,
  color: colors.purple[200],
  position: "top-right" as const,
} as const;

// ──────────────────────────────────────────────────────────
// Hierarchie obsahu
// ──────────────────────────────────────────────────────────

/**
 * Timing objevování: nadpis → body → footnote/definice.
 * Velikost: nadpis > body > footnote. NIKDY naopak.
 * DefOverlay musí být vizuálně MENŠÍ než hlavní sdělení.
 */
export const hierarchy = {
  /** Pořadí objevování na screenu. */
  order: ["heading", "body", "footnote"] as const,
  rules: {
    /** Nadpis musí mít min. tento font size. */
    headingMinSize: 28,
    /** Body text max. tento font size (nesmí být větší než heading). */
    bodyMaxSize: 23,
    /** Poznámky/definice max. tento font size. */
    footnoteMaxSize: 18,
    /** DefOverlay box max. šířka — nesmí soupeřit s hlavním sdělením. */
    defOverlayMaxWidth: "70%",
  },
} as const;

// ──────────────────────────────────────────────────────────
// Webcam / speaker
// ──────────────────────────────────────────────────────────

/** Webcam placeholder — čtvercový green screen, vpravo dole. */
export const webcam = {
  size: 240,
  shape: "square" as const,
  background: "#00FF00",
  position: "bottom-right" as const,
  inset: 48,
  /** Logo nesmí být v blízkosti webcam — narušuje kompozici. */
  noLogoNearby: true,
} as const;

// ──────────────────────────────────────────────────────────
// DefOverlay pravidla
// ──────────────────────────────────────────────────────────

/**
 * DefOverlay = malá doprovodná vysvětlivka termínu.
 * NESMÍ zakrývat hlavní obsah. Žádné ztmavení pozadí.
 * Pozice: nahoře uprostřed, 15 % padding vlevo/vpravo.
 */
export const defOverlay = {
  position: "top-center" as const,
  horizontalPadding: "15%",
  topOffset: 90,
  maxWidth: 1000,
  zIndex: 40,
  /** Žádné ztmavení screenu — definice je jen doprovodná. */
  noDarkening: true,
} as const;

// ──────────────────────────────────────────────────────────
// Screenshot & datová vizualizace
// ──────────────────────────────────────────────────────────

/**
 * Screenshoty NESMÍ být ploché obdélníky.
 * Povinné: zaoblené rohy + glow stín.
 * Grafy: mřížka nikdy bílá — použít fialový rgba.
 *
 * ⚠️ GRAFY MUSÍ BÝT VŽDY PLNĚ ČITELNÉ:
 *   - Žádná jiná komponenta (webcam, DefOverlay, text) nesmí překrývat graf
 *   - Osy, popisky a hodnoty musí být viditelné po celou dobu zobrazení
 *   - Pokud je na scéně graf, webcam a ostatní prvky se MUSÍ vyhnout jeho oblasti
 */
export const screenshot = {
  borderRadius: 12,
  glow: "0 0 40px rgba(141,42,243,0.15)",
  /** Mřížka a osy grafů — jemná fialová. */
  gridColor: "rgba(141,42,243,0.08)",
  gridColorStrong: "rgba(141,42,243,0.18)",
  /** Grafy nesmí být překryty žádnou jinou komponentou. */
  chartsMustBeFullyVisible: true,
} as const;

// ──────────────────────────────────────────────────────────
// Motion tokens
// ──────────────────────────────────────────────────────────

export const motion = {
  staggerDelay: 6,
  minTextDisplay: 45,
  minHeadingDisplay: 24,
  minChartDisplay: 60,
  maxFlashRate: 3,
  exitRatio: 0.5,
} as const;

// ──────────────────────────────────────────────────────────
// Accessibility tokens
// ──────────────────────────────────────────────────────────

export const accessibility = {
  captionSafeBottom: 162,
  minContrastBody: 4.5,
  minContrastCritical: 7.0,
  reducedMotionDuration: 1,
  maxFlashAreaPercent: 25,
} as const;

// ──────────────────────────────────────────────────────────
// Depth tokens (z-index layers & parallax scale)
// ──────────────────────────────────────────────────────────

export const depth = {
  foreground: 1.03,
  background: 0.97,
  layers: {
    galaxyBg: 0,
    glassPanel: 5,
    content: 10,
    overlay: 20,
    topBar: 30,
    defOverlay: 40,
    webcam: 50,
    modal: 60,
  },
} as const;

// ──────────────────────────────────────────────────────────
// Locale tokens (Czech register & UI labels)
// ──────────────────────────────────────────────────────────

export const locale = {
  defaultRegister: "tykan" as "tykan" | "vykan",
  labels: {
    subscribe: { tykan: "Odebrej", vykan: "Odebrejte" },
    like: { tykan: "Dej like", vykan: "Dejte like" },
    comment: { tykan: "Napiš do komentů", vykan: "Napište do komentářů" },
    thanks: { tykan: "Díky za sledování", vykan: "Děkujeme za sledování" },
    chapter: "Kapitola",
    myth: "Mýtus",
    fact: "Pravda",
    definition: "Definice",
    source: "Zdroj",
  },
} as const;

// ──────────────────────────────────────────────────────────
// Audio tokens (EBU R128 loudness targets)
// ──────────────────────────────────────────────────────────

export const audio = {
  targetLoudness: -23,
  loudnessTolerance: 1,
  truePeakMax: -1,
} as const;

// ──────────────────────────────────────────────────────────
// Type
// ──────────────────────────────────────────────────────────

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
  safeZone: typeof safeZone;
  layouts: typeof layouts;
  nav: typeof nav;
  episodeHeader: typeof episodeHeader;
  hierarchy: typeof hierarchy;
  webcam: typeof webcam;
  defOverlay: typeof defOverlay;
  screenshot: typeof screenshot;
  motion: typeof motion;
  accessibility: typeof accessibility;
  depth: typeof depth;
  locale: typeof locale;
  audio: typeof audio;
};

// ──────────────────────────────────────────────────────────
// WCAG kontrasty (referenční tabulka)
// ──────────────────────────────────────────────────────────
//
// | Barva textu  | Na pozadí  | Kontrast | WCAG    |
// |------------- |----------- |--------- |-------- |
// | #FAF5FF      | #060818    | 18.2:1   | AAA ✅  |
// | #E4CFFF      | #060818    | 13.4:1   | AAA ✅  |
// | #D6B0FF      | #060818    |  9.1:1   | AAA ✅  |
// | #9FBFFF      | #060818    |  8.2:1   | AAA ✅  |
// | #506FFB      | #060818    |  4.8:1   | AA ⚠️  |
// | #FAF5FF      | #0a0e2e    | 16.8:1   | AAA ✅  |
// | #FAF5FF      | #0f1440    | 14.5:1   | AAA ✅  |
//
// ⚠️ #506FFB pro text: splňuje AA jen na 18px+ bold nebo 24px+ regular.
//    Pro menší text použít #9FBFFF nebo #E4CFFF.

// ──────────────────────────────────────────────────────────
// Zakázané kombinace (NIKDY nepoužívat)
// ──────────────────────────────────────────────────────────
//
// ❌ #000000 jako pozadí — používat Navy škálu
// ❌ #FFFFFF jako text — používat #FAF5FF
// ❌ Purple jako background area — purple je ACCENT only (10 %)
// ❌ fontWeight < 500 na dark mode
// ❌ drop shadows na dark mode — používat glow.*
// ❌ #BC7EFF jako main text (kontrast nedostatečný)
// ❌ Logo přilepené k okrajům nebo přes jiné prvky
// ❌ Nezpracované fotky (musí mít borderRadius + glow)
// ❌ Více než 2 akcentní barvy současně
// ❌ Volný layout — MUSÍ se použít layouts.singleFocus nebo layouts.splitScreen
// ❌ Text/grafika v ochranné zóně (safeZone.padding = 64 px od okrajů)
// ❌ DefOverlay větší než hlavní sdělení
// ❌ Heading menší fontem než body text pod ním
// ❌ Duplicitní definice (např. SaaS) — jen první výskyt
// ❌ Překrytí grafu jakoukoli komponentou — graf musí být VŽDY plně čitelný
// ❌ Webcam/DefOverlay/text přes osy, popisky nebo hodnoty grafu
