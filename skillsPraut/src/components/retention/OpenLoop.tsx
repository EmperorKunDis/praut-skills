import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";

type Props = {
  tease: string;
  promiseLabel?: string;
  style?: React.CSSProperties;
};

export const OpenLoop: React.FC<Props> = ({
  tease,
  promiseLabel = "POZDEJI V TOMTO VIDEU",
  style,
}) => {
  const p = useEnterExit({ delay: 0 });
  return (
    <div
      style={{
        background: gradients.card,
        border: `1px dashed ${colors.purple[600]}`,
        borderRadius: 12,
        padding: "24px 32px",
        maxWidth: 900,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.purple[300],
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 8,
          fontWeight: fontWeight.body,
        }}
      >
        {promiseLabel}
      </div>
      <div
        style={{
          fontFamily: fonts.primary,
          fontSize: 22,
          fontWeight: fontWeight.body,
          color: colors.purple[100],
          fontStyle: "italic",
          lineHeight: 1.4,
        }}
      >
        {tease}
      </div>
    </div>
  );
};
