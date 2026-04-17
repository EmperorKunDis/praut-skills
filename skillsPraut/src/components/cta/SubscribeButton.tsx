import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
  springs,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useEnterExit } from "../../hooks/useEnterExit";

type Props = {
  label?: string;
  icon?: string;
  hover?: boolean;
  style?: React.CSSProperties;
};

/**
 * Brand CTA pill button — purple-to-blue gradient + cta glow.
 * `hover=true` swaps to the brighter `glow.ctaHover`.
 */
export const SubscribeButton: React.FC<Props> = ({
  label = "Subscribe",
  icon = "play-circle",
  hover = false,
  style,
}) => {
  const p = useEnterExit({ delay: 0, enterConfig: springs.bouncy });

  return (
    <button
      type="button"
      style={{
        background: gradients.brandPrimary,
        color: colors.purple[50],
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize: 22,
        padding: "18px 36px",
        border: "none",
        borderRadius: 999,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        boxShadow: hover ? glow.ctaHover : glow.cta,
        cursor: "pointer",
        opacity: p,
        transform: `scale(${0.7 + p * 0.3})`,
        ...style,
      }}
    >
      <PhosphorIcon name={icon} size={26} color={colors.purple[50]} />
      {label}
    </button>
  );
};
