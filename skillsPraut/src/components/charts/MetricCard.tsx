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
import { CountUpNumber } from "../typography/CountUpNumber";

type Props = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  deltaPositive?: boolean;
  style?: React.CSSProperties;
};

/**
 * Big metric card with animated count-up.
 */
export const MetricCard: React.FC<Props> = ({
  label,
  value,
  prefix,
  suffix,
  delta,
  deltaPositive = true,
  style,
}) => {
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px solid ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: frame.borderRadius * 3,
        padding: 40,
        boxShadow: glow.subtle,
        minWidth: 320,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: colors.purple[100],
          marginBottom: 16,
        }}
      >
        {label}
      </div>
      <CountUpNumber to={value} prefix={prefix} suffix={suffix} fontSize={72} />
      {delta ? (
        <div
          style={{
            marginTop: 12,
            fontFamily: fonts.mono,
            fontSize: 14,
            color: deltaPositive
              ? colors.semantic.success
              : colors.semantic.error,
            fontWeight: fontWeight.bodyEmphasis,
          }}
        >
          {deltaPositive ? "▲" : "▼"} {delta}
        </div>
      ) : null}
    </div>
  );
};
