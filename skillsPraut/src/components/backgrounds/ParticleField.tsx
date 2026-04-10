import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, frame as frameTokens } from "../../styles/tokens";

type Props = {
  count?: number;
  speed?: number;
  color?: string;
};

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 9999 + salt * 31) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Slowly drifting blue particles. Uses deterministic hash so playback is
 * stable across renders.
 */
export const ParticleField: React.FC<Props> = ({
  count = 50,
  speed = 0.4,
  color = colors.blue[400],
}) => {
  const frame = useCurrentFrame();
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        baseX: seeded(i, 1) * frameTokens.width,
        baseY: seeded(i, 2) * frameTokens.height,
        size: 1 + seeded(i, 3) * 3,
        phase: seeded(i, 4) * Math.PI * 2,
      })),
    [count],
  );

  return (
    <AbsoluteFill style={{ background: frameTokens.bg }}>
      {particles.map((p, i) => {
        const yDrift = (Math.sin(frame * 0.01 * speed + p.phase) * 30) | 0;
        const xDrift = (Math.cos(frame * 0.012 * speed + p.phase) * 20) | 0;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.baseX + xDrift,
              top: p.baseY + yDrift,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: color,
              opacity: 0.3,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
