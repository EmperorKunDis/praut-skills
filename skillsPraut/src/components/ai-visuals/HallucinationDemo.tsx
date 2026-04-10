import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  prompt: string;
  correct: string;
  hallucinated: string;
  style?: React.CSSProperties;
};

/**
 * Side-by-side correct vs hallucinated LLM outputs for the same prompt.
 */
export const HallucinationDemo: React.FC<Props> = ({
  prompt,
  correct,
  hallucinated,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 1200,
      ...style,
    }}
  >
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 8,
        padding: 20,
        fontFamily: fonts.mono,
        fontSize: 16,
        color: colors.purple[100],
      }}
    >
      <span style={{ color: colors.purple[300] }}>Prompt: </span>
      {prompt}
    </div>
    <div style={{ display: "flex", gap: 24 }}>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.success}`,
          borderRadius: 8,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <PhosphorIcon
            name="check-circle"
            size={20}
            color={colors.semantic.success}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.semantic.success,
              letterSpacing: 1.5,
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            SPRÁVNĚ
          </span>
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
          {correct}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.error}`,
          borderRadius: 8,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <PhosphorIcon
            name="x-circle"
            size={20}
            color={colors.semantic.error}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.semantic.error,
              letterSpacing: 1.5,
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            HALUCINACE
          </span>
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
          {hallucinated}
        </div>
      </div>
    </div>
  </div>
);
