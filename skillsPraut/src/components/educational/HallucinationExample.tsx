import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  springs,
  typeScale,
  withOpacity,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

const STEP_FRAMES = [0, 30, 70] as const;

export const HallucinationExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress = spring({
    frame: Math.max(0, frame - exitStart),
    fps,
    config: springs.smooth,
  });
  const globalOpacity = 1 - exitProgress;

  const titleProgress = spring({ frame, fps, config: springs.snappy });

  const makeCardProgress = (stepFrame: number) =>
    spring({
      frame: Math.max(0, frame - stepFrame),
      fps,
      config: springs.bouncy,
    });

  const s0 = makeCardProgress(STEP_FRAMES[0]);
  const s1 = makeCardProgress(STEP_FRAMES[1]);
  const s2 = makeCardProgress(STEP_FRAMES[2]);

  const cardStyle = (
    progress: number,
    bg: string,
    borderColor: string,
    extraGlow?: string,
  ): React.CSSProperties => ({
    opacity: progress * globalOpacity,
    transform: `scale(${interpolate(progress, [0, 1], [0.88, 1])})`,
    background: bg,
    border: `1.5px solid ${borderColor}`,
    borderRadius: 16,
    padding: "28px 36px",
    marginBottom: 24,
    boxShadow: extraGlow,
    transition: "none",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        padding: "0 200px",
        boxSizing: "border-box",
        opacity: globalOpacity,
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [-20, 0])}px)`,
          marginBottom: 44,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: typeScale.h2.size,
            fontWeight: fontWeight.heading,
            color: colors.purple[50],
          }}
        >
          Příklad halucinace — vymyšlený český zákon
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 1200 }}>
        {/* Step 1 — User prompt */}
        <div
          style={cardStyle(
            s0,
            colors.navy[800],
            withOpacity(colors.blue[400], 0.5),
          )}
        >
          <div
            style={{
              fontSize: 13,
              fontFamily: fonts.mono,
              color: colors.purple[300],
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 12,
            }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <PhosphorIcon
                name="user"
                size={13}
                color={colors.purple[300]}
                weight="bold"
              />{" "}
              Uživatelský dotaz
            </span>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: fontWeight.bodyEmphasis,
              color: colors.purple[50],
              lineHeight: 1.5,
            }}
          >
            „Jaký zákon upravuje práci z domova v ČR? (§ přesně)"
          </div>
        </div>

        {/* Step 2 — AI hallucination response */}
        <div
          style={cardStyle(
            s1,
            withOpacity(colors.semantic.error, 0.07),
            withOpacity(colors.semantic.error, 0.55),
            glow.neon,
          )}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontFamily: fonts.mono,
                color: colors.purple[300],
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <PhosphorIcon
                  name="robot"
                  size={13}
                  color={colors.purple[300]}
                  weight="bold"
                />{" "}
                Odpověď AI
              </span>
            </div>
            <div
              style={{
                background: withOpacity(colors.semantic.error, 0.15),
                border: `1px solid ${withOpacity(colors.semantic.error, 0.6)}`,
                borderRadius: 6,
                padding: "3px 12px",
                fontSize: 12,
                fontFamily: fonts.mono,
                fontWeight: fontWeight.heading,
                color: colors.semantic.error,
                letterSpacing: 0.8,
              }}
            >
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <PhosphorIcon
                  name="seal-warning"
                  size={13}
                  color={colors.semantic.error}
                  weight="fill"
                />{" "}
                HALUCINACE — tento paragraf NEEXISTUJE
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: fontWeight.body,
              color: colors.purple[100],
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            „§ 317a zákoníku práce č. 262/2006 Sb. stanoví, že zaměstnavatel
            musí zaměstnanci poskytovat vybavení pro práci z domova a hradit
            náklady na internetové připojení ve výši minimálně 500 Kč
            měsíčně..."
          </div>
        </div>

        {/* Step 3 — Reality check */}
        <div
          style={cardStyle(
            s2,
            withOpacity(colors.semantic.success, 0.06),
            withOpacity(colors.semantic.success, 0.45),
          )}
        >
          <div
            style={{
              fontSize: 13,
              fontFamily: fonts.mono,
              color: colors.purple[300],
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 12,
            }}
          >
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <PhosphorIcon
                name="check-circle"
                size={13}
                color={colors.semantic.success}
                weight="fill"
              />{" "}
              Realita
            </span>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: fontWeight.bodyEmphasis,
              color: colors.semantic.success,
              marginBottom: 10,
              lineHeight: 1.5,
            }}
          >
            Reálný zákon: § 317 zákoníku práce — skutečně existuje, ale znění je
            jiné
          </div>
          <div
            style={{
              fontSize: typeScale.small.size,
              fontFamily: fonts.mono,
              color: colors.purple[300],
              lineHeight: 1.6,
            }}
          >
            MIT 2025: Při halucinaci AI používá jistější jazyk o 34 % — tón
            klame víc než obsah
          </div>
        </div>
      </div>
    </div>
  );
};
