// ============================================================
// EndScreenGrid.tsx
// ============================================================
import React from "react";
import { NextVideoCard } from "./NextVideoCard";

type Props = {
  /** Number of empty next-video frames to render. Defaults to 4 (2x2 grid). */
  count?: number;
  style?: React.CSSProperties;
};

/**
 * 2x2 grid of empty next-video frame placeholders. Martin composites the
 * actual YouTube cards on top in the editor.
 */
export const EndScreenGrid: React.FC<Props> = ({ count = 4, style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 32,
      ...style,
    }}
  >
    {Array.from({ length: count }).map((_, i) => (
      <NextVideoCard key={i} />
    ))}
  </div>
);

// ============================================================
// ShareCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

const PLATFORMS = [
  { name: "X", icon: "x-logo" as const },
  { name: "LinkedIn", icon: "linkedin-logo" as const },
  { name: "Facebook", icon: "facebook-logo" as const },
  { name: "Discord", icon: "discord-logo" as const },
];

type Props = {
  style?: React.CSSProperties;
};

/**
 * Quick "Share" card with branded social platform pill buttons.
 */
export const ShareCard: React.FC<Props> = ({ style }) => (
  <div
    style={{
      background: gradients.card,
      borderRadius: 16,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize: 20,
        color: colors.purple[50],
      }}
    >
      Sdílej video
    </div>
    <div style={{ display: "flex", gap: 12 }}>
      {PLATFORMS.map((p) => (
        <div
          key={p.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 999,
            background: colors.navy[800],
            border: `1px solid ${colors.blue[400]}66`,
            fontFamily: fonts.primary,
            fontSize: 14,
            color: colors.purple[100],
            fontWeight: fontWeight.body,
          }}
        >
          <PhosphorIcon name={p.icon} size={20} color={colors.blue[400]} />
          {p.name}
        </div>
      ))}
    </div>
  </div>
);

// ============================================================
// NewsletterCTA.tsx
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
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  style?: React.CSSProperties;
};

export const NewsletterCTA: React.FC<Props> = ({
  title = "Praut Newsletter",
  description = "Každý týden nejdůležitější novinky ze světa AI — bez voli.",
  placeholder = "tvoje@email.cz",
  buttonLabel = "Přihlásit",
  style,
}) => (
  <div
    style={{
      background: gradients.card,
      border: `1px solid ${colors.purple[600]}55`,
      borderRadius: 16,
      padding: 32,
      maxWidth: 720,
      boxShadow: glow.subtle,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <PhosphorIcon
        name="envelope-simple"
        size={28}
        color={colors.purple[400]}
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 26,
          color: colors.purple[50],
        }}
      >
        {title}
      </div>
    </div>
    <p
      style={{
        fontFamily: fonts.primary,
        fontSize: 16,
        color: colors.purple[200],
        marginTop: 0,
        marginBottom: 24,
      }}
    >
      {description}
    </p>
    <div style={{ display: "flex", gap: 12 }}>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          border: `1px solid ${colors.blue[400]}66`,
          borderRadius: 999,
          padding: "14px 20px",
          fontFamily: fonts.mono,
          fontSize: 16,
          color: colors.purple[300],
        }}
      >
        {placeholder}
      </div>
      <button
        type="button"
        style={{
          background: gradients.brandPrimary,
          color: colors.purple[50],
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 16,
          padding: "14px 32px",
          border: "none",
          borderRadius: 999,
          boxShadow: glow.cta,
          cursor: "pointer",
        }}
      >
        {buttonLabel}
      </button>
    </div>
  </div>
);

// ============================================================
// SubscribeButton.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  label?: string;
  icon?: string;
  hover?: boolean;
  style?: React.CSSProperties;
};

/**
 * Brand CTA pill button — purple-to-blue gradient + cta glow.
 * `hover=true` swaps to the brighter `glow.ctaHover`.
 */
export const SubscribeButton: React.FC<Props> = ({
  label = "Subscribe",
  icon = "play-circle",
  hover = false,
  style,
}) => {
  return (
    <button
      type="button"
      style={{
        background: gradients.brandPrimary,
        color: colors.purple[50],
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize: 22,
        padding: "18px 36px",
        border: "none",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        boxShadow: hover ? glow.ctaHover : glow.cta,
        cursor: "pointer",
        ...style,
      }}
    >
      <PhosphorIcon name={icon} size={26} color={colors.purple[50]} />
      {label}
    </button>
  );
};

// ============================================================
// BellNotification.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  size?: number;
  badgeCount?: number;
};

/**
 * Notification bell with a pulsing red badge counter.
 * Bell wobbles slightly to draw the eye.
 */
export const BellNotification: React.FC<Props> = ({
  size = 80,
  badgeCount = 1,
}) => {
  const frame = useCurrentFrame();
  const wobble = interpolate(Math.sin(frame * 0.25), [-1, 1], [-12, 12]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        style={{
          transform: `rotate(${wobble}deg)`,
          transformOrigin: "top center",
        }}
      >
        <PhosphorIcon name="bell" size={size} color={colors.semantic.info} />
      </div>
      {badgeCount > 0 ? (
        <div
          style={{
            position: "absolute",
            top: -4,
            right: -8,
            minWidth: 28,
            height: 28,
            borderRadius: 14,
            background: colors.semantic.error,
            color: colors.purple[50],
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
          }}
        >
          {badgeCount}
        </div>
      ) : null}
    </div>
  );
};

// ============================================================
// DiscordCTA.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  memberCount?: number | string;
  style?: React.CSSProperties;
};

export const DiscordCTA: React.FC<Props> = ({ memberCount, style }) => (
  <div
    style={{
      background: gradients.card,
      borderRadius: 16,
      padding: "32px 40px",
      display: "flex",
      gap: 24,
      alignItems: "center",
      boxShadow: glow.subtle,
      maxWidth: 640,
      border: `1px solid ${colors.blue[400]}55`,
      ...style,
    }}
  >
    <PhosphorIcon name="discord-logo" size={64} color={colors.blue[400]} />
    <div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
        }}
      >
        Praut komunita na Discordu
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 14,
          color: colors.purple[300],
          marginTop: 6,
        }}
      >
        {memberCount
          ? `${memberCount} členů — debata o AI a sdílení zkušeností`
          : "Debata o AI a sdílení zkušeností"}
      </div>
    </div>
  </div>
);

// ============================================================
// NextVideoCard.tsx
// ============================================================
import React from "react";
import { colors, frame, glow } from "../../styles/tokens";

type Props = {
  /** Frame width in px. Defaults to 480. */
  width?: number;
  /** Frame height in px. Defaults to 270 (16:9 of 480). */
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Empty next-video frame placeholder.
 *
 * Just a brand-blue rounded rectangle with active glow — no thumbnail, no
 * title, no "Příště" label. Martin composites the actual YouTube end-screen
 * thumbnail and clickable card on top during editing.
 */
export const NextVideoCard: React.FC<Props> = ({
  width = 480,
  height = 270,
  style,
}) => (
  <div
    style={{
      width,
      height,
      border: `${frame.borderWidth}px solid ${colors.blue[400]}`,
      borderRadius: 12,
      background: "transparent",
      boxShadow: glow.active,
      ...style,
    }}
  />
);

// ============================================================
// CommentPrompt.tsx
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
  prompt?: string;
  style?: React.CSSProperties;
};

export const CommentPrompt: React.FC<Props> = ({
  prompt = "Napiš mi do komentáře, jaké video chceš vidět příště.",
  style,
}) => (
  <div
    style={{
      background: gradients.card,
      border: `1px solid ${colors.purple[600]}66`,
      borderRadius: 16,
      padding: "28px 36px",
      display: "flex",
      gap: 20,
      alignItems: "center",
      boxShadow: glow.subtle,
      maxWidth: 720,
      ...style,
    }}
  >
    <PhosphorIcon
      name="chat-circle-text"
      size={40}
      color={colors.purple[400]}
    />
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.body,
        fontSize: 20,
        color: colors.purple[100],
        lineHeight: 1.4,
      }}
    >
      {prompt}
    </div>
  </div>
);

// ============================================================
// LikeAnimation.tsx
// ============================================================
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, glow, springs } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  size?: number;
  startFrame?: number;
};

/**
 * Pulsing thumbs-up — pops in with `springs.bouncy`, then breathes.
 */
export const LikeAnimation: React.FC<Props> = ({
  size = 96,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: springs.bouncy,
  });
  const pulse = 1 + Math.sin(frame * 0.12) * 0.05;

  return (
    <div
      style={{
        transform: `scale(${pop * pulse})`,
        display: "inline-block",
        filter: `drop-shadow(${glow.subtle})`,
      }}
    >
      <PhosphorIcon name="thumbs-up" size={size} color={colors.purple[600]} />
    </div>
  );
};
