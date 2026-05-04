import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type EvidenceType = "stat" | "quote" | "visual" | "study";

const typeConfig: Record<EvidenceType, { icon: string; borderColor: string }> =
  {
    stat: { icon: "chart-bar", borderColor: colors.blue[400] },
    quote: { icon: "quotes", borderColor: colors.purple[600] },
    visual: { icon: "eye", borderColor: colors.purple[400] },
    study: { icon: "book-open", borderColor: colors.semantic.success },
  };

type Evidence = {
  type: EvidenceType;
  content: string;
  source?: string;
  enterDelay: number;
};

type Props = {
  claim: string;
  evidence: Evidence[];
  style?: React.CSSProperties;
};

/**
 * Claim + stacked evidence items with type-based styling.
 * Each evidence card has its own icon, border color and staggered entrance.
 */
export const EvidenceCascade: React.FC<Props> = ({
  claim,
  evidence,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const claimIn = spring({ frame, fps, config: springs.snappy });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1200,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 32,
          color: colors.purple[50],
          opacity: claimIn,
          transform: `translateX(${(1 - claimIn) * -20}px)`,
          marginBottom: 8,
        }}
      >
        {claim}
      </div>
      {evidence.map((ev, i) => {
        const p = spring({
          frame: frame - 12 - ev.enterDelay,
          fps,
          config: springs.snappy,
        });
        const cfg = typeConfig[ev.type];
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
              background: gradients.card,
              borderLeft: `4px solid ${cfg.borderColor}`,
              borderRadius: 8,
              padding: "16px 24px",
              opacity: p,
              transform: `translateX(${(1 - p) * -24}px)`,
            }}
          >
            <PhosphorIcon name={cfg.icon} size={24} color={cfg.borderColor} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: fonts.primary,
                  fontSize: 20,
                  fontWeight: fontWeight.body,
                  color: colors.purple[100],
                  lineHeight: 1.4,
                }}
              >
                {ev.content}
              </div>
              {ev.source && (
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    color: colors.purple[300],
                    marginTop: 4,
                  }}
                >
                  {ev.source}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
