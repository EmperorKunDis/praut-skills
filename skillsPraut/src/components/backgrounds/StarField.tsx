import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, frame as frameTokens } from "../../styles/tokens";

type Props = {
  count?: number;
};

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 7777 + salt * 19) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Twinkling star field — pinprick highlights for atmospheric depth.
 */
export const StarField: React.FC<Props> = ({ count = 80 }) => {
  const frame = useCurrentFrame();
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        x: seeded(i, 1) * frameTokens.width,
        y: seeded(i, 2) * frameTokens.height,
        size: 1 + seeded(i, 3) * 2,
        blinkOffset: seeded(i, 4) * 60,
      })),
    [count],
  );

  return (
    <AbsoluteFill style={{ background: frameTokens.bg }}>
      {stars.map((s, i) => {
        const blink =
          0.2 + 0.4 * (0.5 + 0.5 * Math.sin((frame + s.blinkOffset) * 0.05));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: colors.purple[100],
              opacity: blink,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
