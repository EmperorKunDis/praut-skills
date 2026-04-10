import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, withOpacity } from "../../styles/tokens";

type Props = {
  startFrame?: number;
  durationFrames?: number;
  rings?: number;
};

/**
 * Concentric expanding rings from the center.
 */
export const RippleEffect: React.FC<Props> = ({
  startFrame = 0,
  durationFrames = 60,
  rings = 4,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {Array.from({ length: rings }).map((_, i) => {
        const offset = i * (durationFrames / rings);
        const r = local - offset;
        const size = interpolate(r, [0, durationFrames], [40, 1200], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const opacity = interpolate(
          r,
          [0, durationFrames * 0.4, durationFrames],
          [0.6, 0.3, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `2px solid ${withOpacity(colors.blue[400], 1)}`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
