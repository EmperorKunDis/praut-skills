import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, glow, springs } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  size?: number;
  startFrame?: number;
};

/**
 * Pulsing thumbs-up — pops in with `springs.bouncy`, then breathes.
 */
export const LikeAnimation: React.FC<Props> = ({
  size = 96,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - startFrame,
    fps,
    config: springs.bouncy,
  });
  const pulse = 1 + Math.sin(frame * 0.12) * 0.05;

  return (
    <div
      style={{
        transform: `scale(${pop * pulse})`,
        display: "inline-block",
        filter: `drop-shadow(${glow.subtle})`,
      }}
    >
      <PhosphorIcon
        name="thumbs-up"
        size={size}
        color={colors.purple[600]}
      />
    </div>
  );
};
