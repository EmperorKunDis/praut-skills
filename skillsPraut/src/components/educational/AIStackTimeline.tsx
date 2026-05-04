import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  springs,
  withOpacity,
} from "../../styles/tokens";

// Cost collapse visual — 2022 vs 2025 side-by-side comparison.
// Both boxes scale in with spring; animated arrow draws between them.
// Bottom stat fades in last.

export const AIStackTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left box (2022) — appears first
  const leftProgress = spring({
    frame: frame - 10,
    fps,
    config: springs.snappy,
  });
  const leftOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right box (2025) — appears after left
  const rightProgress = spring({
    frame: frame - 28,
    fps,
    config: springs.snappy,
  });
  const rightOpacity = interpolate(frame, [28, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow draws left→right after boxes appear
  const arrowReveal = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom stat
  const bottomOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit — fade + shrink in last 20 frames
  const exitStart = durationInFrames - 20;
  const exitOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const exitScale = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0.97],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Arrow SVG total width
  const ARROW_W = 160;
  const arrowDrawn = arrowReveal * ARROW_W;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        boxSizing: "border-box",
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleOpacity) * -12}px)`,
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 30,
            color: colors.purple[50],
          }}
        >
          Cenový kolaps AI — od custom k SaaS
        </div>
      </div>

      {/* Main comparison row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          width: "100%",
          maxWidth: 1200,
        }}
      >
        {/* LEFT BOX — 2022 */}
        <div
          style={{
            flex: 1,
            background: colors.navy[800],
            border: `2px solid ${withOpacity(colors.semantic.warning, 0.7)}`,
            borderRadius: 20,
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: `0 0 40px ${withOpacity(colors.semantic.warning, 0.12)}`,
            transform: `scale(${leftProgress}) translateX(${(1 - leftProgress) * -40}px)`,
            opacity: leftOpacity,
          }}
        >
          {/* Year badge */}
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              fontWeight: fontWeight.bodyEmphasis,
              color: colors.semantic.warning,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 20,
              background: withOpacity(colors.semantic.warning, 0.12),
              padding: "6px 18px",
              borderRadius: 99,
              border: `1px solid ${withOpacity(colors.semantic.warning, 0.4)}`,
            }}
          >
            2022
          </div>

          {/* Price */}
          <div
            style={{
              fontFamily: fonts.primary,
              fontWeight: fontWeight.display,
              fontSize: 68,
              lineHeight: 1,
              color: colors.purple[50],
              letterSpacing: -2,
              textShadow: `0 0 30px ${withOpacity(colors.semantic.warning, 0.4)}`,
              marginBottom: 20,
            }}
          >
            $100 000
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: fonts.primary,
              fontWeight: fontWeight.body,
              fontSize: 16,
              color: colors.purple[300],
              lineHeight: 1.5,
              maxWidth: 320,
            }}
          >
            Custom AI řešení — data science team, GPU infrastruktura, vývoj
          </div>
        </div>

        {/* ANIMATED ARROW */}
        <div
          style={{
            flexShrink: 0,
            width: ARROW_W,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg
            width={ARROW_W}
            height={48}
            viewBox={`0 0 ${ARROW_W} 48`}
            style={{ overflow: "visible" }}
          >
            {/* Arrow line */}
            <line
              x1={8}
              y1={24}
              x2={8 + arrowDrawn * 0.82}
              y2={24}
              stroke={colors.blue[400]}
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Arrowhead — only show once line is mostly drawn */}
            {arrowReveal > 0.7 && (
              <path
                d={`M ${8 + arrowDrawn * 0.82} 24 L ${8 + arrowDrawn * 0.82 - 14} 16 M ${8 + arrowDrawn * 0.82} 24 L ${8 + arrowDrawn * 0.82 - 14} 32`}
                stroke={colors.blue[400]}
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                opacity={interpolate(arrowReveal, [0.7, 1], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}
              />
            )}
          </svg>
        </div>

        {/* RIGHT BOX — 2025 */}
        <div
          style={{
            flex: 1,
            background: colors.navy[800],
            border: `2px solid ${withOpacity(colors.semantic.success, 0.7)}`,
            borderRadius: 20,
            padding: "48px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: `0 0 40px ${withOpacity(colors.semantic.success, 0.12)}`,
            transform: `scale(${rightProgress}) translateX(${(1 - rightProgress) * 40}px)`,
            opacity: rightOpacity,
          }}
        >
          {/* Year badge */}
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 13,
              fontWeight: fontWeight.bodyEmphasis,
              color: colors.semantic.success,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 20,
              background: withOpacity(colors.semantic.success, 0.12),
              padding: "6px 18px",
              borderRadius: 99,
              border: `1px solid ${withOpacity(colors.semantic.success, 0.4)}`,
            }}
          >
            2025
          </div>

          {/* Price */}
          <div
            style={{
              fontFamily: fonts.primary,
              fontWeight: fontWeight.display,
              fontSize: 68,
              lineHeight: 1,
              color: colors.purple[50],
              letterSpacing: -2,
              textShadow: `0 0 30px ${withOpacity(colors.semantic.success, 0.45)}`,
              marginBottom: 20,
            }}
          >
            $200 /měsíc
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: fonts.primary,
              fontWeight: fontWeight.body,
              fontSize: 16,
              color: colors.purple[300],
              lineHeight: 1.5,
              maxWidth: 320,
            }}
          >
            Stejná funkcionalita jako SaaS předplatné — bez devů
          </div>
        </div>
      </div>

      {/* Bottom stat */}
      <div
        style={{
          marginTop: 48,
          opacity: bottomOpacity,
          transform: `translateY(${(1 - bottomOpacity) * 10}px)`,
          background: withOpacity(colors.navy[700], 0.8),
          border: `1px solid ${withOpacity(colors.blue[400], 0.3)}`,
          borderRadius: 12,
          padding: "16px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.bodyEmphasis,
            fontSize: 20,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          Stejné řešení za zlomek ceny →{" "}
          <span
            style={{
              color: colors.semantic.success,
              textShadow: `0 0 12px ${withOpacity(colors.semantic.success, 0.5)}`,
            }}
          >
            SMB AI stack od 1 000 Kč/měsíc
          </span>
        </div>
      </div>
    </div>
  );
};
