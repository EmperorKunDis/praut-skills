// ============================================================
// HookCard.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  hook: string;
};

/**
 * First 3 seconds of a video — oversized hook text on top of the SpaceNebula
 * background (provided by PrautVideoFrame), with a subtle brand-wide gradient
 * overlay for extra punch.
 */
export const HookCard: React.FC<Props> = ({ hook }) => (
  <AbsoluteFill
    style={{
      background: "transparent",
      padding: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradients.brandWide,
        opacity: 0.2,
      }}
    />
    <h1
      style={{
        position: "relative",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 110,
        color: colors.purple[50],
        margin: 0,
        textAlign: "center",
        lineHeight: 1.05,
        maxWidth: 1500,
      }}
    >
      {hook}
    </h1>
  </AbsoluteFill>
);

// ============================================================
// ChapterCard.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";

type Props = {
  number: string;
  title: string;
  /** Override the overline label. Defaults to "KAPITOLA". */
  prefix?: string;
};

/**
 * Full-screen chapter intro: overline (default "KAPITOLA 01"), brand-blue
 * divider line, then large gradient title. Use `prefix` to customise the
 * overline label (e.g. "MÝTUS" for myth-busting episodes).
 */
export const ChapterCard: React.FC<Props> = ({
  number,
  title,
  prefix = "KAPITOLA",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const numberProgress = spring({ frame, fps, config: springs.smooth });
  const titleProgress = spring({
    frame: frame - 12,
    fps,
    config: springs.smooth,
  });
  const lineProgress = spring({
    frame: frame - 6,
    fps,
    config: springs.smooth,
  });

  return (
    <AbsoluteFill
      style={{
        background: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 24,
          color: colors.blue[400],
          opacity: numberProgress,
          letterSpacing: 4,
        }}
      >
        {prefix} {number}
      </div>
      <div
        style={{
          width: interpolate(lineProgress, [0, 1], [0, 200]),
          height: 2,
          background: colors.blue[400],
          marginTop: 16,
          marginBottom: 24,
        }}
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 72,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// IntroAnimation.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  channel,
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
  springs,
} from "../../styles/tokens";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";

type Props = {
  /** Override the bottom-line tagline. Defaults to first in `channel.taglines`. */
  tagline?: string;
};

/**
 * Praut intro: ~5s space fly-through into the brain mark.
 *
 * Timeline (frames @ 30fps):
 *   0–45   SpaceNebula with overdriven outer scale (1.6 → 1.0) + intensity dramatic
 *   30–75  BrainMark fade-in centered, scale 0.4 → 1.0 via springs.smooth
 *   60–90  "Martin Švanda" wordmark fade-in beneath the mark (logoText gradient)
 *   75–120 Tagline ("<P-word> Automatisation") fade-in beneath the name
 *
 * Pure code — no Logo Reveal.mp4 dependency.
 */
export const IntroAnimation: React.FC<Props> = ({
  tagline = channel.taglines[0],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Outer fly-through scale: starts overdriven (1.6×), settles to 1.0× by f=45
  const flyThrough = interpolate(frame, [0, 45], [1.6, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markProgress = spring({
    frame: frame - 30,
    fps,
    config: springs.smooth,
  });
  const wordmarkProgress = spring({
    frame: frame - 60,
    fps,
    config: springs.smooth,
  });
  const taglineProgress = spring({
    frame: frame - 75,
    fps,
    config: springs.smooth,
  });

  return (
    <AbsoluteFill style={{ background: colors.navy[950] }}>
      <SpiralGalaxy />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            opacity: markProgress,
            transform: `scale(${0.4 + markProgress * 0.6})`,
            filter: `drop-shadow(${glow.active})`,
          }}
        >
          <Img
            src={staticFile("logo/logopraut.svg")}
            alt="Praut brain mark"
            style={{ width: 320, height: 320, objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: 84,
            letterSpacing: 4,
            background: gradients.logoText,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: wordmarkProgress,
            transform: `translateY(${(1 - wordmarkProgress) * 24}px)`,
          }}
        >
          {channel.name}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 22,
            color: colors.purple[200],
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: taglineProgress,
            transform: `translateY(${(1 - taglineProgress) * 16}px)`,
          }}
        >
          {tagline}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================
// EndScreen.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { fonts, fontWeight, gradients } from "../../styles/tokens";
import { SubscribeButton } from "../cta/SubscribeButton";
import { NextVideoCard } from "../cta/NextVideoCard";
import { LikeAnimation } from "../cta/LikeAnimation";

type Props = {
  thanks?: string;
  /** Render an empty next-video frame placeholder. Defaults to true. */
  showNextFrame?: boolean;
};

/**
 * Standard outro slate — "Díky za sledování", subscribe button, animated like
 * and an empty next-video frame placeholder. The next-video card has no
 * content inside — title/thumbnail are added in YouTube editor.
 */
export const EndScreen: React.FC<Props> = ({
  thanks = "Díky za sledování",
  showNextFrame = true,
}) => (
  <AbsoluteFill
    style={{
      background: "transparent",
      padding: 80,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
    }}
  >
    <h1
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 72,
        background: gradients.logoText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        margin: 0,
        textAlign: "center",
      }}
    >
      {thanks}
    </h1>
    <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
      <SubscribeButton label="Odebírat" />
      <LikeAnimation size={80} />
    </div>
    {showNextFrame ? <NextVideoCard /> : null}
  </AbsoluteFill>
);

// ============================================================
// ChapterTransition.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, fontWeight, springs } from "../../styles/tokens";

type Props = {
  number: string;
  title: string;
};

/**
 * Quick chapter sting — small label slides in for 1.5s as a divider
 * between content sections.
 */
export const ChapterTransition: React.FC<Props> = ({ number, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: springs.smooth });

  return (
    <AbsoluteFill
      style={{
        background: "rgba(6,8,24,0.92)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        opacity: progress,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 18,
          color: colors.purple[300],
          letterSpacing: 3,
        }}
      >
        / {number} /
      </span>
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 36,
          color: colors.purple[50],
        }}
      >
        {title}
      </span>
    </AbsoluteFill>
  );
};

// ============================================================
// SectionDivider.tsx
// ============================================================
import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type Props = {
  number?: string;
  style?: React.CSSProperties;
};

export const SectionDivider: React.FC<Props> = ({ number, style }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      width: "100%",
      ...style,
    }}
  >
    <div
      style={{
        flex: 1,
        height: 1,
        background: withOpacity(colors.blue[400], 0.5),
      }}
    />
    {number ? (
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.blue[400],
          letterSpacing: 2,
        }}
      >
        {number}
      </span>
    ) : null}
    <div
      style={{
        flex: 1,
        height: 1,
        background: withOpacity(colors.blue[400], 0.5),
      }}
    />
  </div>
);

// ============================================================
// ProgressBar.tsx
// ============================================================
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, glow, gradients } from "../../styles/tokens";

type Props = {
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Auto-progress bar driven by composition timeline.
 * Track navy[700], fill brand-primary gradient with subtle glow.
 */
export const ProgressBar: React.FC<Props> = ({ height = 4, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const percent = Math.min(1, frame / Math.max(1, durationInFrames));

  return (
    <div
      style={{
        width: "100%",
        height,
        background: colors.navy[700],
        ...style,
      }}
    >
      <div
        style={{
          width: `${percent * 100}%`,
          height: "100%",
          background: gradients.brandPrimary,
          boxShadow: glow.subtle,
        }}
      />
    </div>
  );
};

// ============================================================
// TableOfContents.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Item = {
  number: string;
  title: string;
};

type Props = {
  items: Item[];
  activeIndex?: number;
  style?: React.CSSProperties;
};

export const TableOfContents: React.FC<Props> = ({
  items,
  activeIndex = 0,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style,
    }}
  >
    {items.map((item, i) => {
      const isActive = i === activeIndex;
      return (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            padding: "12px 24px",
            borderLeft: `3px solid ${
              isActive ? colors.blue[400] : colors.navy[700]
            }`,
            background: isActive ? "rgba(80,111,251,0.08)" : "transparent",
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: isActive ? colors.blue[400] : colors.purple[300],
              letterSpacing: 1.5,
            }}
          >
            {item.number}
          </span>
          <span
            style={{
              fontFamily: fonts.primary,
              fontWeight: isActive ? fontWeight.heading : fontWeight.body,
              fontSize: 22,
              background: isActive ? gradients.logoText : undefined,
              WebkitBackgroundClip: isActive ? "text" : undefined,
              WebkitTextFillColor: isActive ? "transparent" : undefined,
              backgroundClip: isActive ? "text" : undefined,
              color: isActive ? undefined : colors.purple[200],
            }}
          >
            {item.title}
          </span>
        </div>
      );
    })}
  </div>
);
