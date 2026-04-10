// ============================================================
// GlassCard.tsx
// ============================================================
import React from "react";
import { colors, frame, withOpacity } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
};

/**
 * Glassmorphism card — semi-transparent navy with backdrop blur.
 */
export const GlassCard: React.FC<Props> = ({
  children,
  padding = 32,
  style,
}) => {
  return (
    <div
      style={{
        background: "rgba(15,20,64,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${withOpacity(colors.purple[600], 0.18)}`,
        borderRadius: frame.borderRadius * 3,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// PersonCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  name: string;
  role?: string;
  avatarSrc?: string;
  highlight?: string;
  style?: React.CSSProperties;
};

/**
 * Person card — avatar, name in gradient, role in mono, optional highlight chip.
 */
export const PersonCard: React.FC<Props> = ({
  name,
  role,
  avatarSrc,
  highlight,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 12,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 280,
        ...style,
      }}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={name}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${colors.blue[400]}`,
          }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: gradients.brandPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: 48,
            color: colors.purple[50],
          }}
        >
          {name.charAt(0)}
        </div>
      )}
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 22,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
        }}
      >
        {name}
      </div>
      {role ? (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          {role}
        </div>
      ) : null}
      {highlight ? (
        <span
          style={{
            background: colors.purple[800],
            color: colors.purple[100],
            fontFamily: fonts.primary,
            fontSize: 12,
            fontWeight: fontWeight.bodyEmphasis,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {highlight}
        </span>
      ) : null}
    </div>
  );
};

// ============================================================
// ErrorCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "✕ Chyba" callout — red border, X icon.
 */
export const ErrorCard: React.FC<Props> = ({
  title = "Chyba",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.semantic.error}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon name="x-circle" size={26} color={colors.semantic.error} />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.error,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// StatCard.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  frame,
  glow,
  gradients,
  withOpacity,
} from "../../styles/tokens";
import { PhosphorIcon, PhosphorWeight } from "../icons/PhosphorIcon";

type Props = {
  value: string;
  label: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: string;
  iconWeight?: PhosphorWeight;
  style?: React.CSSProperties;
};

/**
 * Single-stat card — big gradient number with descriptive label and optional
 * delta indicator + icon.
 */
export const StatCard: React.FC<Props> = ({
  value,
  label,
  delta,
  deltaPositive = true,
  icon,
  iconWeight = "fill",
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: frame.borderRadius * 3,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: glow.subtle,
        minWidth: 280,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        {icon ? (
          <PhosphorIcon
            name={icon}
            weight={iconWeight}
            size={24}
            color={colors.purple[400]}
          />
        ) : null}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 56,
          lineHeight: 1,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </div>
      {delta ? (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 14,
            color: deltaPositive
              ? colors.semantic.success
              : colors.semantic.error,
          }}
        >
          {deltaPositive ? "\u25B2" : "\u25BC"} {delta}
        </span>
      ) : null}
    </div>
  );
};

// ============================================================
// ComparisonCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  leftTitle: string;
  leftContent: React.ReactNode;
  rightTitle: string;
  rightContent: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * A vs B comparison card with a "VS" badge in the middle.
 */
export const ComparisonCard: React.FC<Props> = ({
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  style,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "stretch",
        gap: 0,
        background: colors.navy[800],
        borderRadius: 12,
        padding: 32,
        ...style,
      }}
    >
      <div style={{ padding: "0 32px" }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {leftTitle}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
          }}
        >
          {leftContent}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: gradients.brandPrimary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            color: colors.purple[50],
            fontSize: 18,
            letterSpacing: 1,
          }}
        >
          VS
        </div>
      </div>
      <div style={{ padding: "0 32px" }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.purple[300],
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {rightTitle}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
          }}
        >
          {rightContent}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// InfoCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "i Info" callout — blue border, info icon.
 */
export const InfoCard: React.FC<Props> = ({
  title = "Info",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.blue[400]}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon name="info" size={26} color={colors.blue[400]} />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.blue[400],
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// GlowCard.tsx
// ============================================================
import React from "react";
import {
  colors,
  frame,
  glow,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
};

/**
 * Standard branded card — gradient bg, purple border at 40% opacity, subtle glow.
 */
export const GlowCard: React.FC<Props> = ({
  children,
  padding = 32,
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: frame.borderRadius * 3,
        padding,
        boxShadow: glow.subtle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================================
// SuccessCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "OK" callout — green border, check icon.
 */
export const SuccessCard: React.FC<Props> = ({
  title = "Hotovo",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.semantic.success}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon
        name="check-circle"
        size={26}
        color={colors.semantic.success}
      />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.success,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// QuoteCard.tsx
// ============================================================
import React from "react";
import { AnimatedQuote } from "../typography/AnimatedQuote";

type Props = {
  quote: string;
  author?: string;
  role?: string;
  avatarSrc?: string;
  style?: React.CSSProperties;
};

/**
 * Card-shaped quote with avatar slot. Wraps `<AnimatedQuote />`.
 */
export const QuoteCard: React.FC<Props> = ({
  quote,
  author,
  role,
  avatarSrc,
  style,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32, ...style }}>
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={author ?? "avatar"}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : null}
      <AnimatedQuote quote={quote} author={author} role={role} />
    </div>
  );
};

// ============================================================
// WarningCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "Pozor" callout — yellow border, warning icon.
 */
export const WarningCard: React.FC<Props> = ({
  title = "Pozor",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.semantic.warning}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon name="warning" size={26} color={colors.semantic.warning} />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ToolCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  name: string;
  tagline?: string;
  logoSrc?: string;
  style?: React.CSSProperties;
};

/**
 * Tool / product card — logo, name and one-liner. For showcasing
 * Claude / GPT / etc. on the channel.
 */
export const ToolCard: React.FC<Props> = ({
  name,
  tagline,
  logoSrc,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 12,
        padding: 24,
        display: "flex",
        gap: 20,
        alignItems: "center",
        width: 380,
        ...style,
      }}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={name}
          style={{
            width: 64,
            height: 64,
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
      ) : (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: gradients.brandPrimary,
          }}
        />
      )}
      <div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 22,
            color: colors.purple[50],
          }}
        >
          {name}
        </div>
        {tagline ? (
          <div
            style={{
              fontFamily: fonts.primary,
              fontSize: 14,
              color: colors.purple[300],
              marginTop: 4,
            }}
          >
            {tagline}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// ============================================================
// TipCard.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "Tip" callout — yellow border-left, navy background.
 */
export const TipCard: React.FC<Props> = ({
  title = "Tip",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[800],
        borderLeft: `4px solid ${colors.semantic.warning}`,
        borderRadius: 8,
        padding: "24px 32px",
        display: "flex",
        gap: 16,
        maxWidth: 880,
        ...style,
      }}
    >
      <PhosphorIcon
        name="lightbulb"
        size={24}
        color={colors.semantic.warning}
      />
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 6,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
