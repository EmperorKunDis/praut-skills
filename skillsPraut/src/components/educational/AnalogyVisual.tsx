import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  left: { label: string; icon: string };
  right: { label: string; icon: string };
  relation?: string;
  style?: React.CSSProperties;
};

/**
 * Analogy visualization — "X is like Y" with icons and a "≈" symbol between.
 */
export const AnalogyVisual: React.FC<Props> = ({
  left,
  right,
  relation = "jako",
  style,
}) => {
  const Item: React.FC<{ label: string; icon: string }> = ({ label, icon }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 32,
        background: gradients.card,
        borderRadius: 16,
        minWidth: 240,
      }}
    >
      <PhosphorIcon
        name={icon}
        size={96}
        color={colors.blue[400]}
      />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        ...style,
      }}
    >
      <Item {...left} />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 36,
          color: colors.blue[400],
        }}
      >
        {relation}
      </div>
      <Item {...right} />
    </div>
  );
};
