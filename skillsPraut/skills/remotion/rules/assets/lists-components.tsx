// ============================================================
// ChecklistAnimated.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Props = {
  items: string[];
  checked?: boolean[];
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Checklist that ticks each item one by one (uses stagger).
 * Pass `checked` to skip animation for items already checked.
 */
export const ChecklistAnimated: React.FC<Props> = ({
  items,
  checked,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.fast,
    startFrame,
  });

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const progress = stagger(i);
        const isChecked = checked ? checked[i] : progress > 0.5;
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              fontFamily: fonts.primary,
              fontWeight: fontWeight.body,
              fontSize: 22,
              color: isChecked ? colors.purple[100] : colors.purple[300],
            }}
          >
            <div
              style={{
                filter: isChecked ? `drop-shadow(${glow.subtle})` : undefined,
                opacity: progress,
                transform: `scale(${progress})`,
              }}
            >
              <PhosphorIcon
                name={isChecked ? "check-square" : "square"}
                weight={isChecked ? "fill" : "regular"}
                size={28}
                color={isChecked ? colors.semantic.success : colors.purple[300]}
              />
            </div>
            <span
              style={{
                textDecoration: isChecked ? "line-through" : undefined,
                textDecorationColor: colors.purple[400],
              }}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

// ============================================================
// NumberedList.tsx
// ============================================================
import React from "react";
import { interpolate } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  timing,
} from "../../styles/tokens";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Item = {
  title: string;
  description?: string;
};

type Props = {
  items: Item[];
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Animated numbered list — staggered slide-in with gradient numerals.
 */
export const NumberedList: React.FC<Props> = ({
  items,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.fast,
    startFrame,
  });

  return (
    <ol
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const progress = stagger(i);
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              opacity: progress,
              transform: `translateX(${interpolate(progress, [0, 1], [-32, 0])}px)`,
            }}
          >
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
                minWidth: 88,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 28,
                  color: colors.purple[50],
                }}
              >
                {item.title}
              </div>
              {item.description ? (
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 18,
                    color: colors.purple[200],
                    marginTop: 6,
                    fontWeight: fontWeight.body,
                  }}
                >
                  {item.description}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

// ============================================================
// StepByStep.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  timing,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Step = {
  title: string;
  description?: string;
  icon?: string;
};

type Props = {
  steps: Step[];
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Horizontal step list with arrows. Each step staggers in.
 */
export const StepByStep: React.FC<Props> = ({
  steps,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.medium,
    startFrame,
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "stretch",
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const progress = stagger(i);
        return (
          <React.Fragment key={i}>
            <div
              style={{
                flex: 1,
                background: colors.navy[800],
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                opacity: progress,
                transform: `translateY(${(1 - progress) * 16}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontWeight: fontWeight.display,
                    fontSize: 28,
                    background: gradients.logoText,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {i + 1}
                </div>
                {step.icon ? (
                  <PhosphorIcon
                    name={step.icon}
                    size={24}
                    color={colors.purple[400]}
                  />
                ) : null}
              </div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 22,
                  color: colors.purple[50],
                }}
              >
                {step.title}
              </div>
              {step.description ? (
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 14,
                    color: colors.purple[200],
                  }}
                >
                  {step.description}
                </div>
              ) : null}
            </div>
            {i < steps.length - 1 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  opacity: progress,
                }}
              >
                <PhosphorIcon
                  name="caret-right"
                  weight="bold"
                  size={28}
                  color={colors.blue[400]}
                />
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ============================================================
// FeatureList.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, timing } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useStaggeredAnimation } from "../../hooks/useStaggeredAnimation";

type Item = {
  title: string;
  description?: string;
  icon?: string;
};

type Props = {
  items: Item[];
  startFrame?: number;
  style?: React.CSSProperties;
};

export const FeatureList: React.FC<Props> = ({
  items,
  startFrame = 0,
  style,
}) => {
  const stagger = useStaggeredAnimation({
    staggerFrames: timing.fast,
    startFrame,
  });

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const progress = stagger(i);
        return (
          <li
            key={i}
            style={{
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              opacity: progress,
              transform: `translateX(${(1 - progress) * 24}px)`,
            }}
          >
            <PhosphorIcon
              name={item.icon ?? "check"}
              size={32}
              color={colors.purple[600]}
            />
            <div>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 24,
                  color: colors.purple[50],
                }}
              >
                {item.title}
              </div>
              {item.description ? (
                <div
                  style={{
                    fontFamily: fonts.primary,
                    fontSize: 16,
                    color: colors.purple[200],
                    marginTop: 4,
                  }}
                >
                  {item.description}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// ============================================================
// DoVsDont.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  dos: string[];
  donts: string[];
  style?: React.CSSProperties;
};

const Column: React.FC<{
  items: string[];
  title: string;
  color: string;
  icon: string;
}> = ({ items, title, color, icon }) => (
  <div
    style={{
      background: colors.navy[800],
      borderLeft: `4px solid ${color}`,
      borderRadius: 8,
      padding: 28,
      flex: 1,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: 18,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 14,
          letterSpacing: 2,
          textTransform: "uppercase",
          color,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        {title}
      </span>
    </div>
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            color: colors.purple[100],
            fontWeight: fontWeight.body,
          }}
        >
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export const DoVsDont: React.FC<Props> = ({ dos, donts, style }) => (
  <div style={{ display: "flex", gap: 24, ...style }}>
    <Column
      items={dos}
      title="Dělej"
      color={colors.semantic.success}
      icon="check"
    />
    <Column
      items={donts}
      title="Nedělej"
      color={colors.semantic.error}
      icon="x"
    />
  </div>
);

// ============================================================
// TopTenReveal.tsx
// ============================================================
import React from "react";
import { Sequence } from "remotion";
import { timing } from "../../styles/tokens";
import { TopTenCard } from "./TopTenCard";

type Item = {
  title: string;
  description?: string;
};

type Props = {
  items: Item[]; // 10 items, index 0 = #10, index 9 = #1
  revealFrames?: number;
};

/**
 * Counts down from #10 to #1, revealing one card per `revealFrames` frames.
 * Final card is highlighted as the winner.
 */
export const TopTenReveal: React.FC<Props> = ({
  items,
  revealFrames = timing.slow,
}) => {
  const total = items.length;
  return (
    <>
      {items.map((item, i) => {
        const rank = total - i;
        const isWinner = rank === 1;
        return (
          <Sequence
            key={i}
            from={i * revealFrames}
            durationInFrames={revealFrames * (total - i)}
          >
            <TopTenCard
              rank={rank}
              title={item.title}
              description={item.description}
              isWinner={isWinner}
            />
          </Sequence>
        );
      })}
    </>
  );
};

// ============================================================
// TopTenCard.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  frame,
  glow,
  gradients,
} from "../../styles/tokens";

type Props = {
  rank: number;
  title: string;
  description?: string;
  isWinner?: boolean;
  style?: React.CSSProperties;
};

/**
 * Single TopTen card. Winner (#1) gets the brand gradient + cta glow.
 */
export const TopTenCard: React.FC<Props> = ({
  rank,
  title,
  description,
  isWinner = false,
  style,
}) => (
  <div
    style={{
      background: isWinner ? gradients.brandPrimary : colors.navy[800],
      border: isWinner ? "none" : `1.5px solid ${colors.blue[400]}`,
      borderRadius: frame.borderRadius * 4,
      padding: 32,
      display: "flex",
      alignItems: "center",
      gap: 32,
      boxShadow: isWinner ? glow.cta : undefined,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 96,
        background: isWinner ? "#FAF5FF" : gradients.logoText,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        minWidth: 140,
        textAlign: "center",
        lineHeight: 1,
      }}
    >
      #{rank}
    </div>
    <div>
      <h3
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 36,
          color: "#FAF5FF",
          margin: 0,
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.body,
            fontSize: 18,
            color: colors.purple[200],
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  </div>
);

// ============================================================
// ProsConsTable.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  pros: string[];
  cons: string[];
  style?: React.CSSProperties;
};

const Column: React.FC<{
  items: string[];
  title: string;
  color: string;
  icon: string;
}> = ({ items, title, color, icon }) => (
  <div
    style={{
      background: colors.navy[800],
      borderLeft: `4px solid ${color}`,
      borderRadius: 8,
      padding: 28,
      flex: 1,
      minWidth: 320,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: 18,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 14,
          letterSpacing: 2,
          textTransform: "uppercase",
          color,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        {title}
      </span>
    </div>
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.body,
            fontSize: 18,
            color: colors.purple[100],
            lineHeight: 1.4,
          }}
        >
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export const ProsConsTable: React.FC<Props> = ({ pros, cons, style }) => (
  <div style={{ display: "flex", gap: 24, ...style }}>
    <Column
      items={pros}
      title="Pro"
      color={colors.semantic.success}
      icon="thumbs-up"
    />
    <Column
      items={cons}
      title="Proti"
      color={colors.semantic.error}
      icon="thumbs-down"
    />
  </div>
);

// ============================================================
// MythVsFact.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  myth: string;
  fact: string;
  style?: React.CSSProperties;
};

/**
 * Side-by-side "Mytus" vs "Pravda" cards with semantic borders.
 */
export const MythVsFact: React.FC<Props> = ({ myth, fact, style }) => {
  return (
    <div style={{ display: "flex", gap: 24, ...style }}>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.warning}`,
          borderRadius: 8,
          padding: "24px 32px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.warning,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 12,
          }}
        >
          Mytus
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 22,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.4,
          }}
        >
          {myth}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.success}`,
          borderRadius: 8,
          padding: "24px 32px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 12,
            color: colors.semantic.success,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: fontWeight.bodyEmphasis,
            marginBottom: 12,
          }}
        >
          Pravda
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 22,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.4,
          }}
        >
          {fact}
        </div>
      </div>
    </div>
  );
};
