import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, frame as frameTokens } from "../../styles/tokens";

type Intensity = "subtle" | "medium" | "dramatic";

type Props = {
  /** Visual strength of the nebula clouds and star count. */
  intensity?: Intensity;
  /** Loop length in frames. Defaults to 600 (20s @ 30fps). */
  loopFrames?: number;
  /** Multiplier for outer "fly-through" zoom. Use > 1 for IntroAnimation. */
  flyThrough?: number;
};

const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 9311 + salt * 47) * 43758.5453;
  return x - Math.floor(x);
};

const INTENSITY_MAP: Record<
  Intensity,
  {
    stars: number;
    cloudOpacity: number;
    breath: number;
    starMaxOpacity: number;
  }
> = {
  subtle: { stars: 50, cloudOpacity: 0.18, breath: 0.015, starMaxOpacity: 0.6 },
  medium: {
    stars: 80,
    cloudOpacity: 0.32,
    breath: 0.025,
    starMaxOpacity: 0.85,
  },
  dramatic: {
    stars: 150,
    cloudOpacity: 0.52,
    breath: 0.05,
    starMaxOpacity: 1.0,
  },
};

/**
 * Loopable space nebula background.
 *
 * - **Stars**: deterministic seeded positions, each twinkling via per-star sin
 *   wave whose period evenly divides `loopFrames` so they return to the exact
 *   starting state.
 * - **Nebula clouds**: two large blurred radial gradients (cool blue left,
 *   warm orange-red right) drift on sin curves over `loopFrames`.
 * - **Camera breath**: outer container scales 1 ± breath × sin(2π t / loop).
 *
 * The whole composition seamlessly loops every `loopFrames` frames — no cuts.
 *
 * Use `flyThrough > 1` for the IntroAnimation overdriven zoom effect.
 */
export const SpaceNebula: React.FC<Props> = ({
  intensity = "medium",
  loopFrames = 600,
  flyThrough = 1,
}) => {
  const frame = useCurrentFrame();
  const cfg = INTENSITY_MAP[intensity];
  const t = (frame % loopFrames) / loopFrames; // 0..1 normalized loop position
  const tau = 2 * Math.PI;

  // Camera breath — symmetric around 1.0 so loop seam is invisible.
  const breath = 1 + cfg.breath * Math.sin(tau * t);
  const scale = breath * flyThrough;

  // Cloud drift offsets — sin waves return to start at t=1.
  const blueDriftX = 50 + Math.sin(tau * t) * 6;
  const blueDriftY = 50 + Math.cos(tau * t) * 4;
  const warmDriftX = 50 + Math.sin(tau * t + Math.PI / 2) * 5;
  const warmDriftY = 50 + Math.cos(tau * t + Math.PI / 2) * 6;

  const stars = useMemo(
    () =>
      Array.from({ length: cfg.stars }).map((_, i) => ({
        x: seeded(i, 1) * frameTokens.width,
        y: seeded(i, 2) * frameTokens.height,
        size: 1 + seeded(i, 3) * 2.4,
        // Phase offset 0..2π. Period must divide loopFrames so the star
        // returns to its starting state at the loop seam — choose period
        // such that loopFrames is a multiple. Using loopFrames / cycles
        // where cycles is an integer per-star derived from seed.
        cycles: 1 + Math.floor(seeded(i, 4) * 5),
        phase: seeded(i, 5) * tau,
      })),
    [cfg.stars, tau],
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.navy[950],
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Blue cool nebula cloud — left */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 55% 45% at ${blueDriftX - 25}% ${blueDriftY}%,
							rgba(80,111,251,${cfg.cloudOpacity}) 0%,
							rgba(59,78,240,${cfg.cloudOpacity * 0.6}) 28%,
							transparent 65%)`,
            filter: "blur(40px)",
          }}
        />
        {/* Purple-violet middle cloud */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 45% 40% at ${50 + Math.sin(tau * t + 1.2) * 4}% ${50 - Math.cos(tau * t + 1.2) * 6}%,
							rgba(141,42,243,${cfg.cloudOpacity * 0.7}) 0%,
							rgba(85,23,140,${cfg.cloudOpacity * 0.4}) 30%,
							transparent 70%)`,
            filter: "blur(50px)",
          }}
        />
        {/* Warm orange-red emission nebula — right */}
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 50% 42% at ${warmDriftX + 28}% ${warmDriftY}%,
							rgba(255,108,52,${cfg.cloudOpacity * 0.85}) 0%,
							rgba(220,42,68,${cfg.cloudOpacity * 0.55}) 30%,
							transparent 68%)`,
            filter: "blur(45px)",
            mixBlendMode: "screen",
          }}
        />
        {/* Stars */}
        {stars.map((s, i) => {
          // Star period chosen so loopFrames % period == 0
          const period = loopFrames / s.cycles;
          const angle = (frame / period) * tau + s.phase;
          const opacity =
            0.15 + (cfg.starMaxOpacity - 0.15) * (0.5 + 0.5 * Math.sin(angle));
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
                background: "#FFFFFF",
                opacity,
                boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,${opacity * 0.6})`,
              }}
            />
          );
        })}
        {/* Subtle vignette so corners stay readable */}
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(6,8,24,0.65) 100%)",
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
