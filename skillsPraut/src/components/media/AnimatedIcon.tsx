import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, springs } from "../../styles/tokens";
import {
  PhosphorGlow,
  PhosphorIcon,
  PhosphorWeight,
} from "../icons/PhosphorIcon";

type Props = {
  name: string;
  size?: number;
  color?: string;
  weight?: PhosphorWeight;
  glow?: PhosphorGlow;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * `<PhosphorIcon />` with a built-in pop-in spring animation. Convenience
 * wrapper for "icon appears" moments.
 */
export const AnimatedIcon: React.FC<Props> = ({
  name,
  size = 48,
  color = colors.blue[400],
  weight = "fill",
  glow = "subtle",
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.bouncy,
  });

  return (
    <div
      style={{
        display: "inline-block",
        transform: `scale(${progress})`,
        opacity: progress,
        ...style,
      }}
    >
      <PhosphorIcon
        name={name}
        size={size}
        color={color}
        weight={weight}
        glow={glow}
      />
    </div>
  );
};
