// ============================================================
// RoundedScreenshot.tsx
// ============================================================
import React from "react";
import { Img } from "remotion";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  src: string;
  alt?: string;
  width?: number | string;
  style?: React.CSSProperties;
};

/**
 * Screenshot wrapper — large rounded corners, brand border + active glow.
 */
export const RoundedScreenshot: React.FC<Props> = ({
  src,
  alt = "",
  width = "100%",
  style,
}) => (
  <div
    style={{
      width,
      borderRadius: frame.borderRadius * 4,
      overflow: "hidden",
      border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
      boxShadow: glow.active,
      ...style,
    }}
  >
    <Img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
  </div>
);

// ============================================================
// LogoCloud.tsx
// ============================================================
import React from "react";
import { Img } from "remotion";
import { colors, fonts } from "../../styles/tokens";

type Logo = {
  src?: string;
  label?: string;
};

type Props = {
  logos: Logo[];
  columns?: number;
  style?: React.CSSProperties;
};

/**
 * Tiled grid of partner / tool logos at 60% opacity.
 * Falls back to text labels when no `src` is provided.
 */
export const LogoCloud: React.FC<Props> = ({ logos, columns = 4, style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 32,
      alignItems: "center",
      justifyItems: "center",
      ...style,
    }}
  >
    {logos.map((logo, i) =>
      logo.src ? (
        <Img
          key={i}
          src={logo.src}
          alt={logo.label ?? `logo-${i}`}
          style={{
            maxWidth: 160,
            maxHeight: 80,
            objectFit: "contain",
            opacity: 0.6,
          }}
        />
      ) : (
        <span
          key={i}
          style={{
            fontFamily: fonts.primary,
            fontWeight: 700,
            fontSize: 22,
            color: colors.purple[200],
            opacity: 0.6,
          }}
        >
          {logo.label}
        </span>
      ),
    )}
  </div>
);

// ============================================================
// VideoEmbed.tsx
// ============================================================
import React from "react";
import { OffthreadVideo } from "remotion";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  src: string;
  startFrom?: number;
  endAt?: number;
  width?: number | string;
  style?: React.CSSProperties;
};

/**
 * Embedded video with branded frame.
 */
export const VideoEmbed: React.FC<Props> = ({
  src,
  startFrom,
  endAt,
  width = "100%",
  style,
}) => (
  <div
    style={{
      width,
      borderRadius: frame.borderRadius * 3,
      overflow: "hidden",
      border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
      boxShadow: glow.active,
      ...style,
    }}
  >
    <OffthreadVideo src={src} startFrom={startFrom} endAt={endAt} />
  </div>
);

// ============================================================
// AnimatedIcon.tsx
// ============================================================
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springs } from "../../styles/tokens";
import {
  PhosphorGlow,
  PhosphorIcon,
  PhosphorWeight,
} from "../icons/PhosphorIcon";

type Props = {
  name: string;
  size?: number;
  color?: string;
  weight?: PhosphorWeight;
  glow?: PhosphorGlow;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * `<PhosphorIcon />` with a built-in pop-in spring animation. Convenience
 * wrapper for "icon appears" moments.
 */
export const AnimatedIcon: React.FC<Props> = ({
  name,
  size = 48,
  color = colors.blue[400],
  weight = "fill",
  glow = "subtle",
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.bouncy,
  });

  return (
    <div
      style={{
        display: "inline-block",
        transform: `scale(${progress})`,
        opacity: progress,
        ...style,
      }}
    >
      <PhosphorIcon
        name={name}
        size={size}
        color={color}
        weight={weight}
        glow={glow}
      />
    </div>
  );
};

// ============================================================
// BrowserMockup.tsx
// ============================================================
import React from "react";
import { colors, fonts } from "../../styles/tokens";

type Props = {
  url?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Browser window chrome — three traffic-light dots, URL bar, content slot.
 */
export const BrowserMockup: React.FC<Props> = ({
  url = "https://praut.cz",
  children,
  style,
}) => {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: colors.navy[800],
        boxShadow: "0 0 0 1px rgba(80,111,251,0.25)",
        ...style,
      }}
    >
      <div
        style={{
          height: 44,
          background: colors.navy[700],
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FF5F56",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FFBD2E",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#27C93F",
          }}
        />
        <div
          style={{
            flex: 1,
            margin: "0 16px",
            background: colors.navy[800],
            borderRadius: 999,
            padding: "6px 16px",
            fontFamily: fonts.mono,
            fontSize: 13,
            color: colors.purple[300],
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {url}
        </div>
      </div>
      <div style={{ padding: 0, background: colors.navy[900] }}>{children}</div>
    </div>
  );
};

// ============================================================
// ProcessedImage.tsx
// ============================================================
import React from "react";
import { Img } from "remotion";
import { colors, frame, glow, withOpacity } from "../../styles/tokens";

type Props = {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
};

/**
 * Brand image treatment — rounded corners, blue border, glow,
 * and a subtle bottom-fade overlay so the image doesn't feel "stuck".
 */
export const ProcessedImage: React.FC<Props> = ({
  src,
  alt = "",
  width = "100%",
  height = "auto",
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width,
        height,
        borderRadius: frame.borderRadius * 2,
        overflow: "hidden",
        border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
        boxShadow: glow.active,
        ...style,
      }}
    >
      <Img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent, ${withOpacity(frame.bg, 0.6)})`,
        }}
      />
    </div>
  );
};

// ============================================================
// AvatarCircle.tsx
// ============================================================
import React from "react";
import { Img } from "remotion";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  src?: string;
  name?: string;
  size?: number;
  style?: React.CSSProperties;
};

/**
 * Circular avatar with brand-blue border. Falls back to a gradient
 * monogram if no image is supplied.
 */
export const AvatarCircle: React.FC<Props> = ({
  src,
  name,
  size = 96,
  style,
}) => {
  const initial = name?.charAt(0).toUpperCase() ?? "?";
  return src ? (
    <Img
      src={src}
      alt={name ?? "avatar"}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid ${colors.blue[400]}`,
        ...style,
      }}
    />
  ) : (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: gradients.brandPrimary,
        border: `2px solid ${colors.blue[400]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: size * 0.4,
        color: colors.purple[50],
        ...style,
      }}
    >
      {initial}
    </div>
  );
};

// ============================================================
// PhoneMockup.tsx
// ============================================================
import React from "react";
import { colors, frame as frameTokens } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * Generic phone (iPhone-style) frame mockup. Children render in the screen slot.
 */
export const PhoneMockup: React.FC<Props> = ({ children, style }) => (
  <div
    style={{
      width: 360,
      height: 740,
      borderRadius: 48,
      background: colors.navy[700],
      padding: 14,
      boxShadow: "0 0 0 2px #506FFB44",
      ...style,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 36,
        background: frameTokens.bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 28,
          background: colors.navy[950],
          borderRadius: 999,
          zIndex: 10,
        }}
      />
      {children}
    </div>
  </div>
);

// ============================================================
// MacBookMockup.tsx
// ============================================================
import React from "react";
import { colors } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * MacBook mockup — laptop body with screen slot for content.
 */
export const MacBookMockup: React.FC<Props> = ({ children, style }) => (
  <div style={{ display: "inline-block", ...style }}>
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 0 0 2px #506FFB44",
      }}
    >
      <div
        style={{
          width: 960,
          height: 600,
          borderRadius: 8,
          background: colors.navy[950],
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
    <div
      style={{
        width: 1080,
        height: 18,
        background: colors.navy[700],
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginLeft: -44,
        marginTop: -2,
      }}
    />
  </div>
);
