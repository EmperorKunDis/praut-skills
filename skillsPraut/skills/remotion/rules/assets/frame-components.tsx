// ============================================================
// BrainMark.tsx
// ============================================================
import React from "react";
import { Img, staticFile } from "remotion";
import { glow as glowTokens } from "../../styles/tokens";

type Props = {
  /** Height in px. Width scales automatically (aspect ~1.19:1). Defaults to 48. */
  size?: number;
  /** Apply brand active glow as a CSS filter. */
  glow?: boolean;
  /** Optional inline styles merged on top. */
  style?: React.CSSProperties;
};

/**
 * Praut brain puzzle mark — isolated SVG `public/logo/brain-mark.svg`.
 * Native viewBox 108x91 -> wider than tall.
 * `size` controls HEIGHT; width auto-scales via aspect ratio.
 */
export const BrainMark: React.FC<Props> = ({
  size = 48,
  glow = false,
  style,
}) => {
  return (
    <Img
      src={staticFile("logo/logopraut.svg")}
      alt="Praut brain mark"
      style={{
        height: size,
        width: "auto",
        objectFit: "contain",
        filter: glow ? `drop-shadow(${glowTokens.active})` : undefined,
        ...style,
      }}
    />
  );
};

// ============================================================
// BrandLogo.tsx
// ============================================================
import React from "react";
import { fonts, fontWeight, gradients } from "../../styles/tokens";
import { BrainMark } from "./BrainMark";

type Variant = "full" | "mark" | "text";

type Props = {
  /** Visual size in px (height of the lockup). Defaults to 40. */
  size?: number;
  variant?: Variant;
  /** Apply active glow on the mark. */
  glow?: boolean;
  /** Strip the gradient and render text in a single brand-safe color. */
  monochrome?: boolean;
  style?: React.CSSProperties;
};

/**
 * Praut brand logo lockup. Combines `<BrainMark />` with the
 * "PRAUT" wordmark in the brand `logoText` gradient.
 *
 * variants:
 * - `full` -- mark + wordmark (default)
 * - `mark` -- mark only (square)
 * - `text` -- wordmark only (no mark)
 */
export const BrandLogo: React.FC<Props> = ({
  size = 40,
  variant = "full",
  glow = false,
  monochrome = false,
  style,
}) => {
  const wordmarkSize = Math.round(size * 0.62);
  const gap = Math.round(size * 0.32);

  const wordmark = (
    <span
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: wordmarkSize,
        letterSpacing: 2,
        lineHeight: 1,
        background: monochrome ? undefined : gradients.logoText,
        WebkitBackgroundClip: monochrome ? undefined : "text",
        WebkitTextFillColor: monochrome ? "#FAF5FF" : "transparent",
        backgroundClip: monochrome ? undefined : "text",
        color: monochrome ? "#FAF5FF" : undefined,
      }}
    >
      PRAUT
    </span>
  );

  if (variant === "mark") {
    return <BrainMark size={size} glow={glow} style={style} />;
  }
  if (variant === "text") {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", ...style }}>
        {wordmark}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        height: size,
        ...style,
      }}
    >
      <BrainMark size={size} glow={glow} />
      {wordmark}
    </div>
  );
};

// ============================================================
// ExplainerSlide.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";
import { WebcamPlaceholder } from "./WebcamPlaceholder";

type Props = {
  /** Visual material being explained -- sits in the top 60% of the slide. */
  topContent: React.ReactNode;
  /** Explanation text -- sits in the bottom 40%, padded for readability. */
  bottomText: React.ReactNode;
  /** Render the webcam placeholder bottom-right. Defaults to true. */
  includeWebcam?: boolean;
  /** Ratio of vertical space allocated to top content. Defaults to 0.6. */
  topRatio?: number;
};

/**
 * Standard explainer slide layout used by every Praut tutorial / explainer:
 *
 * - **Top section** (default 60% height): the visual material being explained
 *   -- chart, code, neural network, image, etc. Centered.
 * - **Bottom section** (default 40% height): explanation text. Padded so it
 *   never collides with the webcam slot.
 * - **Webcam placeholder** (default on): empty 280x160 bordered box anchored
 *   bottom-right where Martin's talking head will be composited in YouTube.
 *
 * Place inside `<PrautVideoFrame>` so the SpaceNebula background and TopBar
 * are present.
 */
export const ExplainerSlide: React.FC<Props> = ({
  topContent,
  bottomText,
  includeWebcam = true,
  topRatio = 0.6,
}) => {
  const topHeight = `${topRatio * 100}%`;
  const bottomHeight = `${(1 - topRatio) * 100}%`;
  const webcamWidth = 280;
  const webcamRightInset = 48;

  return (
    <AbsoluteFill style={{ paddingTop: frame.topBarHeight }}>
      <div
        style={{
          position: "absolute",
          top: frame.topBarHeight,
          left: 0,
          right: 0,
          height: topHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
        }}
      >
        {topContent}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: bottomHeight,
          padding: "32px 80px 80px 80px",
          // Reserve right gutter so text never overlaps webcam slot.
          paddingRight: includeWebcam
            ? webcamWidth + webcamRightInset + 64
            : 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {bottomText}
      </div>
      {includeWebcam ? <WebcamPlaceholder /> : null}
    </AbsoluteFill>
  );
};

// ============================================================
// LiquidGlassPanel.tsx
// ============================================================
import React from "react";
import { colors, glow, withOpacity } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  /** Blur radius in px. Defaults to 20. */
  blur?: number;
  /** Background opacity 0..1. Defaults to 0.65. */
  bgOpacity?: number;
  /** Border radius. Defaults to 20. */
  borderRadius?: number;
  /** Show a subtle brand border. Defaults to true. */
  showBorder?: boolean;
  /** Apply subtle glow on the border. Defaults to true. */
  showGlow?: boolean;
  /** Inset from the parent edges. Defaults to 28. */
  inset?: number;
  style?: React.CSSProperties;
};

/**
 * Glassmorphism overlay panel.
 *
 * Renders an absolutely positioned frosted-glass rectangle over the
 * SpiralGalaxy background. Children (charts, text, cards) sit inside
 * and are fully readable. The galaxy shows through the blur.
 *
 * Used automatically by `<PrautVideoFrame>` to wrap all content.
 * Can also be used standalone for partial-glass effects.
 */
export const LiquidGlassPanel: React.FC<Props> = ({
  children,
  blur = 20,
  bgOpacity = 0.65,
  borderRadius = 20,
  showBorder = true,
  showGlow = true,
  inset = 28,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: inset,
        left: inset,
        right: inset,
        bottom: inset,
        borderRadius,
        background: `rgba(6, 8, 24, ${bgOpacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: showBorder
          ? `1px solid ${withOpacity(colors.blue[400], 0.25)}`
          : undefined,
        boxShadow: showGlow ? glow.card : undefined,
        overflow: "hidden",
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// PiPLayout.tsx
// ============================================================
import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  webcamSrc: React.ReactNode;
  screenSrc: React.ReactNode;
  /** Webcam width as a fraction of full width. Defaults to 0.18. */
  webcamRatio?: number;
};

/**
 * Picture-in-picture layout: full-bleed screen content with a webcam
 * thumbnail in the bottom-left corner.
 */
export const PiPLayout: React.FC<Props> = ({
  webcamSrc,
  screenSrc,
  webcamRatio = 0.18,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {screenSrc}
      </div>
      <div
        style={{
          position: "absolute",
          left: frame.sidePadding * 4,
          bottom: frame.sidePadding * 4,
          width: `${webcamRatio * 100}%`,
          aspectRatio: "16 / 9",
          border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
          borderRadius: frame.borderRadius * 2,
          overflow: "hidden",
          boxShadow: glow.active,
        }}
      >
        {webcamSrc}
      </div>
    </div>
  );
};

// ============================================================
// PrautShortFrame.tsx
// ============================================================
import React from "react";
import { frameShort, withOpacity } from "../../styles/tokens";
import { SafeArea } from "./SafeArea";
import { WatermarkPraut } from "./WatermarkPraut";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";

type Props = {
  episodeTitle?: string;
  includeWatermark?: boolean;
  frameless?: boolean;
  /** Render the SpaceNebula background. Defaults to true. */
  includeBackground?: boolean;
  children: React.ReactNode;
};

/**
 * 9:16 (1080x1920) brand frame for YouTube Shorts / Reels / TikTok.
 * Lighter chrome -- no top bar, just brand watermark.
 */
export const PrautShortFrame: React.FC<Props> = ({
  episodeTitle: _episodeTitle,
  includeWatermark = true,
  frameless = false,
  includeBackground = true,
  children,
}) => {
  const border = frameless
    ? undefined
    : `${frameShort.borderWidth}px solid ${withOpacity(
        frameShort.borderColor,
        0.7,
      )}`;

  return (
    <SafeArea
      referenceWidth={frameShort.width}
      referenceHeight={frameShort.height}
    >
      <div
        style={{
          position: "absolute",
          inset: frameShort.sidePadding,
          border,
          borderRadius: frameShort.borderRadius,
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {includeBackground ? <SpiralGalaxy /> : null}
        {children}
        {includeWatermark ? <WatermarkPraut /> : null}
      </div>
    </SafeArea>
  );
};

// ============================================================
// PrautSquareFrame.tsx
// ============================================================
import React from "react";
import { frameSquare, fonts, colors, withOpacity } from "../../styles/tokens";
import { SafeArea } from "./SafeArea";
import { WatermarkPraut } from "./WatermarkPraut";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";

type Props = {
  slideNumber?: number;
  totalSlides?: number;
  includeWatermark?: boolean;
  frameless?: boolean;
  /** Render the SpaceNebula background. Defaults to true. */
  includeBackground?: boolean;
  children: React.ReactNode;
};

/**
 * 1:1 (1080x1080) brand frame for LinkedIn carousel exports.
 * Optionally shows a "1 / 7" slide indicator in the top-right corner.
 */
export const PrautSquareFrame: React.FC<Props> = ({
  slideNumber,
  totalSlides,
  includeWatermark = true,
  frameless = false,
  includeBackground = true,
  children,
}) => {
  const border = frameless
    ? undefined
    : `${frameSquare.borderWidth}px solid ${withOpacity(
        frameSquare.borderColor,
        0.7,
      )}`;

  return (
    <SafeArea
      referenceWidth={frameSquare.width}
      referenceHeight={frameSquare.height}
    >
      <div
        style={{
          position: "absolute",
          inset: frameSquare.sidePadding,
          border,
          borderRadius: frameSquare.borderRadius,
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {includeBackground ? <SpiralGalaxy /> : null}
        {children}
        {slideNumber && totalSlides ? (
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              fontFamily: fonts.mono,
              fontSize: 14,
              color: colors.purple[200],
              letterSpacing: 2,
              zIndex: 50,
            }}
          >
            {slideNumber} / {totalSlides}
          </div>
        ) : null}
        {includeWatermark ? <WatermarkPraut /> : null}
      </div>
    </SafeArea>
  );
};

// ============================================================
// PrautVideoFrame.tsx
// ============================================================
import React from "react";
import { frame as frameTokens, withOpacity } from "../../styles/tokens";
import { SafeArea } from "./SafeArea";
import { TopBar } from "./TopBar";
import { WatermarkPraut } from "./WatermarkPraut";
import { SpiralGalaxy } from "../backgrounds/SpiralGalaxy";
import { LiquidGlassPanel } from "./LiquidGlassPanel";

type Props = {
  episodeNumber?: string;
  /** @deprecated kept for back-compat; TopBar now uses pickTagline instead */
  episodeTitle?: string;
  channelName?: string;
  /** Override the bottom-line tagline in the TopBar. */
  tagline?: string;
  includeTopBar?: boolean;
  includeWatermark?: boolean;
  /** Render content without the outer brand border (for raw exports). */
  frameless?: boolean;
  /** Strength of the brand border: 'active' (1.5px solid) or 'passive' (1px 25%). */
  borderState?: "active" | "passive";
  /** Render the SpiralGalaxy background behind children. Defaults to true. */
  includeBackground?: boolean;
  /** Wrap children in a LiquidGlass panel over the galaxy. Defaults to true. */
  includeGlass?: boolean;
  children: React.ReactNode;
};

/**
 * Master 1920x1080 brand frame. Wraps every Praut composition.
 *
 * Layering (back to front):
 *   1. SpiralGalaxy canvas background (density-wave spiral)
 *   2. LiquidGlassPanel (frosted glass overlay -- backdrop-blur 20px)
 *   3. Children (charts, text, cards -- rendered inside the glass)
 *   4. TopBar (brand mark left, Martin Svanda + tagline right)
 *   5. WatermarkPraut (bottom-right)
 */
export const PrautVideoFrame: React.FC<Props> = ({
  episodeNumber,
  channelName,
  tagline,
  includeTopBar = true,
  includeWatermark = false,
  frameless = false,
  borderState = "active",
  includeBackground = true,
  includeGlass = true,
  children,
}) => {
  const border = frameless
    ? undefined
    : borderState === "active"
      ? `${frameTokens.borderWidth}px solid ${frameTokens.borderColor}`
      : `1px solid ${withOpacity(frameTokens.borderColor, 0.25)}`;

  return (
    <SafeArea>
      <div
        style={{
          position: "absolute",
          inset: frameTokens.sidePadding,
          border,
          borderRadius: frameTokens.borderRadius,
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {includeBackground ? <SpiralGalaxy /> : null}
        {includeGlass ? (
          <LiquidGlassPanel>
            {includeTopBar ? (
              <TopBar
                episodeNumber={episodeNumber}
                channelName={channelName}
                tagline={tagline}
              />
            ) : null}
            {children}
          </LiquidGlassPanel>
        ) : (
          <>
            {includeTopBar ? (
              <TopBar
                episodeNumber={episodeNumber}
                channelName={channelName}
                tagline={tagline}
              />
            ) : null}
            {children}
          </>
        )}
        {includeWatermark ? <WatermarkPraut /> : null}
      </div>
    </SafeArea>
  );
};

// ============================================================
// SafeArea.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";
import { useScaleToFit } from "../../hooks/useScaleToFit";

type Props = {
  children: React.ReactNode;
  /** Reference width (defaults to brand 1920). */
  referenceWidth?: number;
  /** Reference height (defaults to brand 1080). */
  referenceHeight?: number;
};

/**
 * Renders children inside a fixed reference frame (defaults to 1920x1080)
 * and scales the whole thing to fit the actual composition dimensions.
 *
 * Use this so authors can compose at native brand resolution and still
 * render to arbitrary sizes (1280x720, 4K, etc.) without layout breakage.
 */
export const SafeArea: React.FC<Props> = ({
  children,
  referenceWidth = frame.width,
  referenceHeight = frame.height,
}) => {
  const scale = useScaleToFit(referenceWidth, referenceHeight);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: frame.bg,
      }}
    >
      <div
        style={{
          width: referenceWidth,
          height: referenceHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "relative",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// SlideRoot.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, frame } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  padding?: number;
  background?: string;
};

/**
 * Standard slide background for content sections inside PrautVideoFrame.
 * Defaults: navy[900] background, generous padding accounting for top bar.
 */
export const SlideRoot: React.FC<Props> = ({
  children,
  padding = 80,
  background = colors.navy[900],
}) => {
  return (
    <AbsoluteFill
      style={{
        background,
        padding,
        paddingTop: padding + frame.topBarHeight,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// ============================================================
// SpeakerScreenLayout.tsx
// ============================================================
import React from "react";

type Props = {
  speaker: React.ReactNode;
  screen: React.ReactNode;
  focus?: "speaker" | "screen";
  gap?: number;
};

/**
 * Speaker + screen split. When `focus="speaker"` the speaker takes ~66%,
 * when `focus="screen"` the screen takes ~66%. Defaults to screen-focused.
 */
export const SpeakerScreenLayout: React.FC<Props> = ({
  speaker,
  screen,
  focus = "screen",
  gap = 48,
}) => {
  const speakerFlex = focus === "speaker" ? 0.66 : 0.34;
  const screenFlex = 1 - speakerFlex;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap,
        alignItems: "stretch",
      }}
    >
      <div style={{ flex: speakerFlex, display: "flex", alignItems: "center" }}>
        {speaker}
      </div>
      <div style={{ flex: screenFlex, display: "flex", alignItems: "center" }}>
        {screen}
      </div>
    </div>
  );
};

// ============================================================
// SplitLayout.tsx
// ============================================================
import React from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Ratio of left/right column widths. e.g. 0.5 = 50/50, 0.66 = 2/1. */
  ratio?: number;
  gap?: number;
};

/**
 * Two-column layout for "text + visual" slides.
 * Default 50/50 split with a 64px gap.
 */
export const SplitLayout: React.FC<Props> = ({
  left,
  right,
  ratio = 0.5,
  gap = 64,
}) => {
  const leftPercent = `${ratio * 100}%`;
  const rightPercent = `${(1 - ratio) * 100}%`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap,
        alignItems: "center",
      }}
    >
      <div style={{ flexBasis: leftPercent, flexGrow: 0, flexShrink: 0 }}>
        {left}
      </div>
      <div style={{ flexBasis: rightPercent, flexGrow: 0, flexShrink: 0 }}>
        {right}
      </div>
    </div>
  );
};

// ============================================================
// TopBar.tsx
// ============================================================
import React from "react";
import {
  channel,
  colors,
  fonts,
  fontWeight,
  pickTagline,
  typeScale,
} from "../../styles/tokens";
import { BrandLogo } from "./BrandLogo";

type Props = {
  episodeNumber?: string;
  channelName?: string;
  tagline?: string;
};

/**
 * TopBar -- positioned inside the glass panel's top area.
 *
 * Layout: logo left, two-line text right, both vertically centered.
 * Padding is measured from the GLASS border (not the frame border),
 * so content sits comfortably inside the frosted panel.
 */
export const TopBar: React.FC<Props> = ({
  episodeNumber,
  channelName = channel.name,
  tagline,
}) => {
  const rightLabel = episodeNumber
    ? `${channel.episodePrefix} ${episodeNumber} / ${channelName}`
    : channelName;
  const subline = tagline ?? pickTagline(episodeNumber);

  // Glass panel: inset=28 from frame border, borderRadius=20.
  // TopBar sits INSIDE the glass, so padding = distance from glass inner edge.
  const innerPad = 24;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: `${innerPad}px ${innerPad}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 50,
      }}
    >
      <BrandLogo size={36} variant="mark" glow />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: typeScale.episode.size,
            color: typeScale.episode.color,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {rightLabel}
        </span>
        <span
          style={{
            fontFamily: fonts.primary,
            fontSize: typeScale.small.size,
            fontWeight: fontWeight.body,
            color: colors.purple[200],
            letterSpacing: 0.5,
          }}
        >
          {subline}
        </span>
      </div>
    </div>
  );
};

// ============================================================
// TripleLayout.tsx
// ============================================================
import React from "react";

type Props = {
  first: React.ReactNode;
  second: React.ReactNode;
  third: React.ReactNode;
  gap?: number;
};

/**
 * Three-column layout for Pred / Po / Rozdil style comparisons.
 */
export const TripleLayout: React.FC<Props> = ({
  first,
  second,
  third,
  gap = 48,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap,
        alignItems: "center",
      }}
    >
      <div>{first}</div>
      <div>{second}</div>
      <div>{third}</div>
    </div>
  );
};

// ============================================================
// WatermarkPraut.tsx
// ============================================================
import React from "react";
import { fonts, frame, fontWeight, colors } from "../../styles/tokens";
import { BrainMark } from "./BrainMark";

type Position = "bottom-right" | "bottom-left" | "top-right" | "top-left";

type Props = {
  position?: Position;
  opacity?: number;
};

/**
 * Discreet brand watermark anchored to a corner.
 * Default placement: bottom-right at 60% opacity.
 */
export const WatermarkPraut: React.FC<Props> = ({
  position = "bottom-right",
  opacity = 0.6,
}) => {
  const isBottom = position.startsWith("bottom");
  const isRight = position.endsWith("right");

  return (
    <div
      style={{
        position: "absolute",
        [isBottom ? "bottom" : "top"]: frame.sidePadding * 2,
        [isRight ? "right" : "left"]: frame.sidePadding * 2,
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity,
        zIndex: 40,
      }}
    >
      <BrainMark size={20} />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 12,
          letterSpacing: 2,
          color: colors.purple[100],
        }}
      >
        PRAUT
      </span>
    </div>
  );
};

// ============================================================
// WebcamPlaceholder.tsx
// ============================================================
import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  /** Width in px. Defaults to 280. */
  width?: number;
  /** Height in px. Defaults to 160. */
  height?: number;
  /** Inset from the right edge in px. Defaults to 48. */
  rightInset?: number;
  /** Inset from the bottom edge in px. Defaults to 48. */
  bottomInset?: number;
  style?: React.CSSProperties;
};

/**
 * Empty bordered rectangle anchored bottom-right of its containing slide.
 *
 * Reserves space for a webcam talking-head feed that the user composites in
 * during YouTube editing. The placeholder itself renders nothing inside --
 * brand-blue 1.5px border + active glow only, transparent interior so the
 * SpaceNebula and slide content read through.
 */
export const WebcamPlaceholder: React.FC<Props> = ({
  width = 280,
  height = 160,
  rightInset = 48,
  bottomInset = 48,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        right: rightInset,
        bottom: bottomInset,
        width,
        height,
        border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
        borderRadius: 12,
        background: "transparent",
        boxShadow: glow.active,
        zIndex: 30,
        ...style,
      }}
    />
  );
};
