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

type Version = {
  version: number;
  prompt: string;
  quality: number;
  qualityColor: string;
  startFrame: number;
};

const VERSIONS: Version[] = [
  {
    version: 1,
    prompt: "Napiš email.",
    quality: 20,
    qualityColor: colors.semantic.error,
    startFrame: 0,
  },
  {
    version: 2,
    prompt: "Napiš prodejní email pro IT firmu o nové službě.",
    quality: 60,
    qualityColor: colors.semantic.warning,
    startFrame: 40,
  },
  {
    version: 3,
    prompt:
      "Jsi B2B copywriter. Napiš cold email (150 slov) pro IT manažera. Naše služba: AI automatizace fakturace. Přínos: -3 hod/týden. CTA: 15min demo call.",
    quality: 95,
    qualityColor: colors.semantic.success,
    startFrame: 80,
  },
];

export const PromptIterationSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = durationInFrames - 20;
  const exitProgress =
    frame >= exitStart
      ? spring({ frame: frame - exitStart, fps, config: springs.smooth })
      : 0;

  const titleProgress = spring({ frame, fps, config: springs.smooth });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.navy[950],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        fontFamily: fonts.primary,
        opacity: interpolate(exitProgress, [0, 1], [1, 0]),
      }}
    >
      <div
        style={{
          fontSize: typeScale.h2.size,
          fontWeight: fontWeight.display,
          color: colors.purple[50],
          textAlign: "center",
          marginBottom: 56,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [24, 0])}px)`,
        }}
      >
        Iterace promptu — každé kolo zlepšuje výsledek
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 0,
          alignItems: "stretch",
          width: "100%",
          maxWidth: 1400,
        }}
      >
        {VERSIONS.map((v, i) => {
          const localFrame = frame - v.startFrame;
          const progress = spring({
            frame: localFrame,
            fps,
            config: springs.bouncy,
          });
          const visible = localFrame > 0 ? progress : 0;

          const barProgress =
            localFrame > 10
              ? spring({
                  frame: localFrame - 10,
                  fps,
                  config: springs.smooth,
                })
              : 0;

          return (
            <React.Fragment key={v.version}>
              <div
                style={{
                  flex: 1,
                  background: colors.navy[800],
                  border: `1.5px solid ${withOpacity(v.qualityColor, 0.4)}`,
                  borderRadius: 16,
                  padding: "28px 28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  opacity: visible,
                  transform: `translateY(${interpolate(visible, [0, 1], [40, 0])}px) scale(${interpolate(visible, [0, 1], [0.92, 1])})`,
                  boxShadow:
                    v.version === 3
                      ? glow.active
                      : `0 0 0 1px ${withOpacity(v.qualityColor, 0.1)}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      fontWeight: fontWeight.bodyEmphasis,
                      color: colors.navy[800],
                      background: v.qualityColor,
                      borderRadius: 20,
                      padding: "4px 12px",
                    }}
                  >
                    V{v.version}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 13,
                      fontWeight: fontWeight.bodyEmphasis,
                      color: v.qualityColor,
                    }}
                  >
                    Verze {v.version}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 16,
                    fontWeight: fontWeight.body,
                    color: colors.purple[200],
                    lineHeight: 1.65,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {v.prompt}
                </p>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
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
                        fontSize: 13,
                        fontFamily: fonts.mono,
                        color: colors.purple[300],
                      }}
                    >
                      Kvalita výstupu
                    </span>
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: fontWeight.display,
                        color: v.qualityColor,
                      }}
                    >
                      {v.quality} %
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 8,
                      background: withOpacity(v.qualityColor, 0.15),
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${v.quality * barProgress}%`,
                        background: v.qualityColor,
                        borderRadius: 4,
                        transition: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {i < VERSIONS.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    opacity: visible,
                  }}
                >
                  <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
                    <path
                      d="M4 16 H26 M20 10 L28 16 L20 22"
                      stroke={colors.blue[400]}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
