// ============================================================
// AnimatedQuote.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  quote: string;
  author?: string;
  role?: string;
  style?: React.CSSProperties;
};

/**
 * Branded quote card with oversized purple quote-mark, italic body and
 * gradient author line.
 */
export const AnimatedQuote: React.FC<Props> = ({
  quote,
  author,
  role,
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 1100,
        padding: "64px 80px",
        background: gradients.card,
        borderLeft: `4px solid ${colors.purple[600]}`,
        borderRadius: 12,
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: -16,
          left: 24,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 120,
          color: colors.purple[400],
          lineHeight: 1,
        }}
      >
        "
      </span>
      <p
        style={{
          fontFamily: fonts.primary,
          fontStyle: "italic",
          fontSize: 32,
          fontWeight: fontWeight.body,
          color: colors.purple[100],
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {quote}
      </p>
      {(author || role) && (
        <div style={{ marginTop: 32 }}>
          {author && (
            <span
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 22,
                background: gradients.logoText,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {author}
            </span>
          )}
          {role && (
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                color: colors.purple[300],
                marginLeft: 12,
              }}
            >
              {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================
// BodyText.tsx
// ============================================================
import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Standard 18px Montserrat 500 body copy.
 * NEVER reduce the weight below 500 — minimum on dark mode.
 */
export const BodyText: React.FC<Props> = ({ children, style }) => (
  <p
    style={{
      fontFamily: typeScale.body.font,
      fontSize: typeScale.body.size,
      fontWeight: typeScale.body.weight,
      color: typeScale.body.color,
      lineHeight: 1.55,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </p>
);

// ============================================================
// CountUpNumber.tsx
// ============================================================
import React from "react";
import { fonts, fontWeight, gradients } from "../../styles/tokens";
import { useCountUp } from "../../hooks/useCountUp";

type Props = {
  from?: number;
  to: number;
  startFrame?: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  gradient?: boolean;
  formatter?: (n: number) => string;
  style?: React.CSSProperties;
};

const defaultFormatter = (n: number) => Math.round(n).toLocaleString("cs-CZ");

/**
 * Animated count-up number. Uses `springs.smooth` via `useCountUp`.
 */
export const CountUpNumber: React.FC<Props> = ({
  from = 0,
  to,
  startFrame = 0,
  suffix = "",
  prefix = "",
  fontSize = 96,
  gradient = true,
  formatter = defaultFormatter,
  style,
}) => {
  const value = useCountUp({ from, to, startFrame });

  return (
    <span
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        lineHeight: 1,
        background: gradient ? gradients.logoText : undefined,
        WebkitBackgroundClip: gradient ? "text" : undefined,
        WebkitTextFillColor: gradient ? "transparent" : "#FAF5FF",
        backgroundClip: gradient ? "text" : undefined,
        ...style,
      }}
    >
      {prefix}
      {formatter(value)}
      {suffix}
    </span>
  );
};

// ============================================================
// DisplayHeading.tsx
// ============================================================
import React from "react";
import { gradients, typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  gradient?: boolean;
  style?: React.CSSProperties;
};

/**
 * 48px Montserrat 800 — top of the typography hierarchy.
 * When `gradient` is true, paints the text with `gradients.logoText`.
 */
export const DisplayHeading: React.FC<Props> = ({
  children,
  gradient = false,
  style,
}) => {
  return (
    <h1
      style={{
        fontFamily: typeScale.display.font,
        fontSize: typeScale.display.size,
        fontWeight: typeScale.display.weight,
        lineHeight: 1.05,
        margin: 0,
        color: gradient ? undefined : typeScale.display.color,
        background: gradient ? gradients.logoText : undefined,
        WebkitBackgroundClip: gradient ? "text" : undefined,
        WebkitTextFillColor: gradient ? "transparent" : undefined,
        backgroundClip: gradient ? "text" : undefined,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

// ============================================================
// GlitchText.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  fontSize?: number;
  intensity?: number;
  style?: React.CSSProperties;
};

/**
 * Glitch effect — RGB split with red, brand blue and brand purple offsets.
 * Intensity is in pixels of channel offset; oscillates over time.
 */
export const GlitchText: React.FC<Props> = ({
  children,
  fontSize = 96,
  intensity = 4,
  style,
}) => {
  const frame = useCurrentFrame();
  const offset = interpolate(
    Math.sin(frame * 0.6),
    [-1, 1],
    [-intensity, intensity],
  );

  const baseStyle: React.CSSProperties = {
    fontFamily: fonts.primary,
    fontWeight: fontWeight.display,
    fontSize,
    lineHeight: 1,
    position: "absolute",
    top: 0,
    left: 0,
  };

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "fit-content",
        ...style,
      }}
    >
      <span
        style={{
          ...baseStyle,
          color: "#F87171", // red channel
          transform: `translate(${offset}px, ${offset / 2}px)`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...baseStyle,
          color: colors.blue[400],
          transform: `translate(${-offset}px, ${-offset / 2}px)`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...baseStyle,
          color: colors.purple[600],
          transform: `translate(${offset / 2}px, ${-offset}px)`,
          mixBlendMode: "screen",
        }}
      >
        {children}
      </span>
      <span
        style={{
          ...baseStyle,
          position: "relative",
          color: colors.purple[50],
          opacity: interpolate(frame, [0, timing.fast], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {children}
      </span>
    </div>
  );
};

// ============================================================
// GradientText.tsx
// ============================================================
import React from "react";
import { gradients } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  gradient?: keyof typeof gradients;
  style?: React.CSSProperties;
};

/**
 * Render any text with a brand gradient applied via background-clip.
 * Defaults to `gradients.logoText` (#506FFB → #8D2AF3).
 */
export const GradientText: React.FC<Props> = ({
  children,
  gradient = "logoText",
  style,
}) => (
  <span
    style={{
      background: gradients[gradient],
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}
  >
    {children}
  </span>
);

// ============================================================
// H1.tsx
// ============================================================
import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const H1: React.FC<Props> = ({ children, style }) => (
  <h1
    style={{
      fontFamily: typeScale.h1.font,
      fontSize: typeScale.h1.size,
      fontWeight: typeScale.h1.weight,
      color: typeScale.h1.color,
      lineHeight: 1.15,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h1>
);

// ============================================================
// H2.tsx
// ============================================================
import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const H2: React.FC<Props> = ({ children, style }) => (
  <h2
    style={{
      fontFamily: typeScale.h2.font,
      fontSize: typeScale.h2.size,
      fontWeight: typeScale.h2.weight,
      color: typeScale.h2.color,
      lineHeight: 1.2,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h2>
);

// ============================================================
// H3.tsx
// ============================================================
import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const H3: React.FC<Props> = ({ children, style }) => (
  <h3
    style={{
      fontFamily: typeScale.h3.font,
      fontSize: typeScale.h3.size,
      fontWeight: typeScale.h3.weight,
      color: typeScale.h3.color,
      lineHeight: 1.3,
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h3>
);

// ============================================================
// HighlightedText.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";

type Props = {
  /** Plain text broken into chunks; chunks marked with `highlight` get the brand purple background. */
  parts: Array<string | { text: string; highlight: true }>;
  fontSize?: number;
  color?: string;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Inline-highlighted text. Each highlight chunk paints a purple background
 * pill that animates in from 0% to 100% width with a `glow.subtle` aura.
 */
export const HighlightedText: React.FC<Props> = ({
  parts,
  fontSize = 56,
  color = colors.purple[50],
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame - startFrame, [0, timing.medium], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        color,
        lineHeight: 1.25,
        ...style,
      }}
    >
      {parts.map((part, i) => {
        if (typeof part === "string") {
          return <span key={i}>{part}</span>;
        }
        return (
          <span
            key={i}
            style={{
              position: "relative",
              display: "inline-block",
              padding: "0 0.18em",
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: "0.05em 0",
                width: `${grow}%`,
                background: colors.purple[600],
                borderRadius: 6,
                boxShadow: glow.subtle,
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>{part.text}</span>
          </span>
        );
      })}
    </div>
  );
};

// ============================================================
// KeyTakeaway.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
};

/**
 * Big "Key takeaway" callout — gradient card with warning border.
 */
export const KeyTakeaway: React.FC<Props> = ({
  children,
  label = "Key takeaway",
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${colors.semantic.warning}66`,
        borderLeft: `6px solid ${colors.semantic.warning}`,
        borderRadius: 12,
        padding: "40px 56px",
        maxWidth: 1100,
        boxShadow: glow.subtle,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <PhosphorIcon
          name="lightbulb-filament"
          size={28}
          color={colors.semantic.warning}
        />
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 14,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
          }}
        >
          {label}
        </span>
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 28,
          fontWeight: fontWeight.heading,
          color: colors.purple[50],
          lineHeight: 1.4,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================
// LineReveal.tsx
// ============================================================
import React from "react";
import { interpolate } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Props = {
  lines: string[];
  fontSize?: number;
  color?: string;
  staggerFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Reveals each line of text with a staggered slide-up + fade.
 */
export const LineReveal: React.FC<Props> = ({
  lines,
  fontSize = 36,
  color = colors.purple[100],
  staggerFrames = timing.medium / 2,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({ staggerFrames, startFrame });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.4em",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize,
        color,
        lineHeight: 1.3,
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const progress = stagger(i);
        return (
          <div
            key={`${i}-${line}`}
            style={{
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px)`,
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// MonoLabel.tsx
// ============================================================
import React from "react";
import { typeScale } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  uppercase?: boolean;
  style?: React.CSSProperties;
};

/**
 * Caption-sized IBM Plex Mono label for technical / tagging text.
 */
export const MonoLabel: React.FC<Props> = ({
  children,
  uppercase = true,
  style,
}) => (
  <span
    style={{
      fontFamily: typeScale.caption.font,
      fontSize: typeScale.caption.size,
      fontWeight: typeScale.caption.weight,
      color: typeScale.caption.color,
      letterSpacing: 1.5,
      textTransform: uppercase ? "uppercase" : undefined,
      ...style,
    }}
  >
    {children}
  </span>
);

// ============================================================
// ScrambleText.tsx
// ============================================================
import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight } from "../../styles/tokens";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  revealFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Hacker-style scramble: each character cycles through random glyphs
 * before settling on the final value. Settles left-to-right.
 */
export const ScrambleText: React.FC<Props> = ({
  text,
  fontSize = 64,
  color = colors.purple[50],
  revealFrames = 36,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame() - startFrame;
  const chars = text.split("");
  const perCharFrames = Math.max(1, revealFrames / chars.length);

  const display = chars
    .map((char, i) => {
      const settled = frame >= (i + 1) * perCharFrames;
      if (settled) return char;
      if (frame < i * perCharFrames) return " ";
      // scrambling phase — pick a deterministic random glyph each frame
      const idx = (frame * 7 + i * 13) % SCRAMBLE_CHARS.length;
      return SCRAMBLE_CHARS[idx];
    })
    .join("");

  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontWeight: fontWeight.bodyEmphasis,
        fontSize,
        color,
        letterSpacing: 1,
        whiteSpace: "pre",
        ...style,
      }}
    >
      {display}
    </span>
  );
};

// ============================================================
// TypewriterText.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";

type Props = {
  fullText: string;
  pauseAfter?: string;
  pauseSeconds?: number;
  charFrames?: number;
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  cursorBlinkFrames?: number;
  style?: React.CSSProperties;
};

/**
 * Brand typewriter — types `fullText` character by character with a
 * blinking brand-blue cursor. Optional pause after a substring marker.
 *
 * Defaults: Montserrat 800 (display), purple[50], cursor blue[400].
 */
export const TypewriterText: React.FC<Props> = ({
  fullText,
  pauseAfter,
  pauseSeconds = 1,
  charFrames = 2,
  fontSize = 72,
  color = colors.purple[50],
  cursorColor = colors.blue[400],
  cursorBlinkFrames = 16,
  style,
}) => {
  const frame = useCurrentFrame();
  const typed = useTypewriter({
    fullText,
    pauseAfter,
    charFrames,
    pauseSeconds,
  });

  const cursorOpacity = interpolate(
    frame % cursorBlinkFrames,
    [0, cursorBlinkFrames / 2, cursorBlinkFrames],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        color,
        lineHeight: 1.15,
        ...style,
      }}
    >
      <span>{typed}</span>
      <span
        style={{
          display: "inline-block",
          width: "0.55em",
          height: "0.95em",
          background: cursorColor,
          marginLeft: 4,
          verticalAlign: "middle",
          opacity: cursorOpacity,
        }}
      />
    </div>
  );
};

// ============================================================
// WordReveal.tsx
// ============================================================
import React from "react";
import { interpolate } from "remotion";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  staggerFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Reveals each word of `text` with a staggered fade + slide-up.
 */
export const WordReveal: React.FC<Props> = ({
  text,
  fontSize = 56,
  color = colors.purple[50],
  staggerFrames = timing.fast / 2,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({ staggerFrames, startFrame });
  const words = text.split(/\s+/);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.35em",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize,
        color,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {words.map((word, i) => {
        const progress = stagger(i);
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${interpolate(progress, [0, 1], [16, 0])}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
