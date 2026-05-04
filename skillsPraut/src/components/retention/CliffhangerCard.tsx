import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";
import { useEnterExit } from "../../hooks/useEnterExit";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  tease: string;
  icon?: string;
  style?: React.CSSProperties;
};

/**
 * "But what happens when..." anticipation card.
 * Uses warning-colored accent to signal upcoming revelation.
 */
export const CliffhangerCard: React.FC<Props> = ({
  tease,
  icon = "arrow-bend-right-down",
  style,
}) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.bouncy });
  return (
    <div
      style={{
        background: gradients.card,
        borderLeft: `4px solid ${colors.semantic.warning}`,
        borderRadius: 12,
        padding: "24px 36px",
        maxWidth: 1000,
        display: "flex",
        gap: 20,
        alignItems: "center",
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
        ...style,
      }}
    >
      <PhosphorIcon
        name={icon}
        size={36}
        color={colors.semantic.warning}
        glow="subtle"
      />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 28,
          color: colors.purple[50],
          lineHeight: 1.3,
        }}
      >
        {tease}
      </div>
    </div>
  );
};
