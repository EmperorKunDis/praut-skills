import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, frame as frameTokens } from "../../styles/tokens";

type Props = {
  count?: number;
  startFrame?: number;
};

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 4321 + salt * 11) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Radial particle burst from the center — purple/blue mix.
 */
export const ParticleBurst: React.FC<Props> = ({
  count = 60,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame() - startFrame;
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        angle: seeded(i, 1) * Math.PI * 2,
        speed: 4 + seeded(i, 2) * 8,
        color: seeded(i, 3) > 0.5 ? colors.purple[300] : colors.blue[400],
        size: 2 + seeded(i, 4) * 4,
      })),
    [count],
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: frameTokens.width,
          height: frameTokens.height,
        }}
      >
        {particles.map((p, i) => {
          const dist = frame * p.speed;
          const x = Math.cos(p.angle) * dist;
          const y = Math.sin(p.angle) * dist;
          const opacity = Math.max(0, 1 - frame / 60);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.color,
                transform: `translate(${x}px, ${y}px)`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
