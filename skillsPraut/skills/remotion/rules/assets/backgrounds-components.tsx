// ============================================================
// CircuitPattern.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, frame, withOpacity } from "../../styles/tokens";

/**
 * Subtle circuit-board pattern — thin paths and pads in low-opacity blue.
 * Procedurally drawn as SVG.
 */
export const CircuitPattern: React.FC = () => {
  const stroke = withOpacity(colors.blue[400], 0.18);
  const dot = withOpacity(colors.purple[300], 0.4);

  return (
    <AbsoluteFill style={{ background: frame.bg }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke={stroke} strokeWidth={1.5}>
          <path d="M0 200 L400 200 L450 250 L900 250 L950 200 L1920 200" />
          <path d="M0 600 L300 600 L350 550 L800 550 L850 600 L1920 600" />
          <path d="M0 880 L500 880 L550 830 L1100 830 L1150 880 L1920 880" />
          <path d="M200 0 L200 350 L250 400 L250 1080" />
          <path d="M1500 0 L1500 200 L1450 250 L1450 1080" />
          <path d="M960 0 L960 100 L1010 150 L1010 1080" />
        </g>
        <g fill={dot}>
          <circle cx={400} cy={200} r={4} />
          <circle cx={950} cy={200} r={4} />
          <circle cx={350} cy={550} r={4} />
          <circle cx={250} cy={400} r={4} />
          <circle cx={1450} cy={250} r={4} />
          <circle cx={1010} cy={150} r={4} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// ============================================================
// GradientMesh.tsx
// ============================================================
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../../styles/tokens";

/**
 * Subtle animated gradient mesh blending navy/purple/blue.
 * Used as a backdrop for hero / chapter slides.
 */
export const GradientMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame % 600) / 600;
  const offsetA = `${50 + Math.sin(t * Math.PI * 2) * 12}% ${50 + Math.cos(t * Math.PI * 2) * 8}%`;
  const offsetB = `${50 - Math.sin(t * Math.PI * 2) * 8}% ${50 - Math.cos(t * Math.PI * 2) * 12}%`;

  return (
    <AbsoluteFill
      style={{
        background: `
					radial-gradient(circle at ${offsetA}, ${colors.purple[800]}55 0%, transparent 55%),
					radial-gradient(circle at ${offsetB}, ${colors.blue[700]}55 0%, transparent 55%),
					${colors.navy[950]}
				`,
      }}
    />
  );
};

// ============================================================
// GridBackground.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, frame, withOpacity } from "../../styles/tokens";

type Props = {
  cellSize?: number;
};

/**
 * Tech grid background — thin blue lines on navy.
 */
export const GridBackground: React.FC<Props> = ({ cellSize = 80 }) => {
  const lineColor = withOpacity(colors.blue[400], 0.1);
  return (
    <AbsoluteFill
      style={{
        background: frame.bg,
        backgroundImage: `
					linear-gradient(${lineColor} 1px, transparent 1px),
					linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
				`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    />
  );
};

// ============================================================
// NavyBackground.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";

export const NavyBackground: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: frame.bg }} />
);

// ============================================================
// NoiseOverlay.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";

type Props = {
  opacity?: number;
};

/**
 * Subtle film grain overlay (SVG turbulence). Sit on top of any
 * background. Default opacity 0.03 — barely perceptible.
 */
export const NoiseOverlay: React.FC<Props> = ({ opacity = 0.03 }) => {
  const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
			<filter id="n">
				<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
			</filter>
			<rect width="100%" height="100%" filter="url(#n)" opacity="1"/>
		</svg>
	`;
  const dataUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: dataUrl,
        backgroundSize: "200px 200px",
        opacity,
        mixBlendMode: "overlay",
      }}
    />
  );
};

// ============================================================
// ParticleField.tsx
// ============================================================
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

// ============================================================
// ScanlineEffect.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, withOpacity } from "../../styles/tokens";

type Props = {
  gap?: number;
};

/**
 * CRT scanline overlay — alternating purple-tinted bands.
 */
export const ScanlineEffect: React.FC<Props> = ({ gap = 4 }) => {
  const line = withOpacity(colors.purple[100], 0.05);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg, ${line} 0px, ${line} 1px, transparent 1px, transparent ${gap}px)`,
      }}
    />
  );
};

// ============================================================
// SpaceNebula.tsx
// ============================================================
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
 * - **Camera breath**: outer container scales 1 +/- breath * sin(2pi t / loop).
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
        // Phase offset 0..2pi. Period must divide loopFrames so the star
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

// ============================================================
// SpiralGalaxy.tsx
// ============================================================
import React, { useEffect, useMemo, useRef } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// ---------------------------------------------------------
// SpiralGalaxy — canvas density-wave galaxy background
// ~6000 stars, brand blue/purple palette, deterministic.
// ---------------------------------------------------------

const ARMS = 5;
const PITCH = 0.32;
const ARM_SPREAD = 0.32;
const FIELD_RATIO = 0.22; // slightly more field stars -> fill corners
const ORBIT_SPEED = 0.00001;
const PATTERN_OMEGA = 0.000002;
const TILT = 1.05;
const ROLL = -0.6;
const cosT = Math.cos(TILT);
const sinT = Math.sin(TILT);
const cosR = Math.cos(ROLL);
const sinR = Math.sin(ROLL);
const A_MIN = 4;
const A_MAX = 16000; // larger -> fills corners of 1920px frame

// Better deterministic hash — avoids grid artifacts from sin-based PRNG
const hash = (i: number, salt: number): number => {
  let h = (i * 2654435761 + salt * 40503) ^ 0xdeadbeef;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  h = (h ^ (h >>> 16)) >>> 0;
  return h / 0xffffffff;
};

type Particle = {
  a: number;
  b: number;
  theta0: number;
  z: number;
  r: number;
  g: number;
  bl: number;
  size: number;
  alpha: number;
  om: number;
};

type Cloud = Particle & { hue: number };

function makeDiskParticles(count: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const a = A_MIN + Math.pow(hash(i, 1), 1.7) * (A_MAX - A_MIN);
    let theta: number;
    if (hash(i, 2) < FIELD_RATIO) {
      theta = hash(i, 3) * Math.PI * 2;
    } else {
      const arm = Math.floor(hash(i, 4) * ARMS);
      const armPhase = (arm / ARMS) * Math.PI * 2;
      const armAngle = Math.log(a / A_MIN) / PITCH;
      const jitter = (hash(i, 5) + hash(i, 6) + hash(i, 7) - 1.5) * ARM_SPREAD;
      theta = armAngle + armPhase + jitter;
    }
    const z =
      (hash(i, 8) - 0.5) * Math.max(4, 40 - a * 0.002) +
      Math.sin(theta + 0.7) * (a / A_MAX) * 50;
    const t = (a - A_MIN) / (A_MAX - A_MIN);
    const m = hash(i, 9);
    let r: number, g: number, bl: number;
    if (t < 0.18) {
      r = (200 + m * 55) | 0;
      g = (210 + m * 45) | 0;
      bl = 255;
    } else if (t < 0.5) {
      r = (80 + m * 40) | 0;
      g = (111 + m * 30) | 0;
      bl = 251;
    } else {
      r = (100 + m * 41) | 0;
      g = (42 + m * 40) | 0;
      bl = 243;
    }
    const size = (1 - t * 0.55) * (1.0 + hash(i, 10) * 2.2);
    const alpha = (1 - t * 0.5) * (0.08 + hash(i, 11) * 0.12);
    const ecc = 0.05 + hash(i, 12) * 0.65;
    out.push({
      a,
      b: a * (1 - ecc),
      theta0: theta,
      z,
      r,
      g,
      bl,
      size,
      alpha,
      om: 0.4 + hash(i, 13) * 1.2,
    });
  }
  return out;
}

function makeBulgeParticles(count: number): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const si = i + 50000; // offset to avoid hash collision with disk
    const a = A_MIN + Math.pow(hash(si, 1), 3.5) * 900;
    const ecc = 0.05 + hash(si, 2) * 0.15;
    const theta = hash(si, 3) * Math.PI * 2;
    const z = (hash(si, 4) - 0.5) * 26;
    const m = hash(si, 5);
    out.push({
      a,
      b: a * (1 - ecc),
      theta0: theta,
      z,
      r: (180 + m * 55) | 0,
      g: (200 + m * 55) | 0,
      bl: 255,
      size: 0.7 + hash(si, 6) * 1.2,
      alpha: 0.08 + hash(si, 7) * 0.1,
      om: 0.5 + hash(si, 8) * 1.2,
    });
  }
  return out;
}

function makeClouds(count: number): Cloud[] {
  const out: Cloud[] = [];
  for (let i = 0; i < count; i++) {
    const si = i + 100000;
    const a = A_MIN + Math.pow(hash(si, 1), 1.4) * (A_MAX - A_MIN);
    let theta: number;
    if (hash(si, 2) < 0.25) {
      theta = hash(si, 3) * Math.PI * 2;
    } else {
      const arm = Math.floor(hash(si, 4) * ARMS);
      const armPhase = (arm / ARMS) * Math.PI * 2;
      const armAngle = Math.log(Math.max(a, 8) / A_MIN) / PITCH;
      const jitter = (hash(si, 5) + hash(si, 6) + hash(si, 7) - 1.5) * 0.45;
      theta = armAngle + armPhase + jitter;
    }
    const ecc = 0.18 + hash(si, 8) * 0.18;
    const z = (hash(si, 9) - 0.5) * 24;
    const t = (a - A_MIN) / (A_MAX - A_MIN);
    const sizeBase = 60 + Math.sin(t * Math.PI) * 120 + hash(si, 10) * 120;
    out.push({
      a,
      b: a * (1 - ecc),
      theta0: theta,
      z,
      r: 0,
      g: 0,
      bl: 0,
      size: sizeBase,
      alpha: 0,
      om: 0.2 + hash(si, 11) * 0.8,
      hue: hash(si, 12),
    });
  }
  return out;
}

function cloudColor(hue: number, alpha: number): string {
  if (hue < 0.35) return `rgba(80,111,251,${alpha})`;
  if (hue < 0.65) return `rgba(141,42,243,${alpha})`;
  if (hue < 0.85) return `rgba(117,32,204,${alpha})`;
  return `rgba(40,52,135,${alpha})`;
}

function project(
  theta: number,
  a: number,
  b: number,
  z: number,
  PA: number,
  CX: number,
  CY: number,
) {
  const lx = a * Math.cos(theta);
  const ly = b * Math.sin(theta);
  const cP = Math.cos(PA);
  const sP = Math.sin(PA);
  const gx = lx * cP - ly * sP;
  const gy = lx * sP + ly * cP;
  const ty = gy * cosT + z * sinT;
  const dz = -gy * sinT + z * cosT;
  const rx = gx * cosR - ty * sinR;
  const ry = gx * sinR + ty * cosR;
  return { x: CX + rx, y: CY + ry, depth: dz };
}

type Props = {
  style?: React.CSSProperties;
};

export const SpiralGalaxy: React.FC<Props> = ({ style }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { disk, bulge, clouds } = useMemo(() => {
    return {
      disk: makeDiskParticles(4200),
      bulge: makeBulgeParticles(1500),
      clouds: makeClouds(300),
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const timeMs = (frame / fps) * 1000;
    const CX = width / 2;
    const CY = height / 2;
    const PA = timeMs * PATTERN_OMEGA;
    const dTheta = timeMs * ORBIT_SPEED;

    // Background — subtle radial gradient so corners never feel dead
    ctx.globalCompositeOperation = "source-over";
    const bgG = ctx.createRadialGradient(
      CX,
      CY,
      0,
      CX,
      CY,
      Math.max(width, height) * 0.75,
    );
    bgG.addColorStop(0, "#050714");
    bgG.addColorStop(1, "#02010a");
    ctx.fillStyle = bgG;
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "lighter";

    // Halo — extended to cover full frame diagonals
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(ROLL);
    ctx.scale(1, cosT);
    ctx.rotate(PA * 0.4);
    const haloR = Math.max(width, height) * 1.2;
    const haloG = ctx.createRadialGradient(0, 0, 0, 0, 0, haloR);
    haloG.addColorStop(0, "rgba(80,111,251,0.06)");
    haloG.addColorStop(0.3, "rgba(60,50,180,0.03)");
    haloG.addColorStop(0.6, "rgba(40,52,135,0.015)");
    haloG.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = haloG;
    ctx.fillRect(-width * 2, -height * 2, width * 4, height * 4);
    ctx.restore();

    // Clouds — behind
    for (const c of clouds) {
      const theta = c.theta0 + dTheta * c.om;
      const pr = project(theta, c.a, c.b, c.z, PA, CX, CY);
      const g = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, c.size);
      g.addColorStop(0, cloudColor(c.hue, 0.006));
      g.addColorStop(0.4, cloudColor(c.hue, 0.003));
      g.addColorStop(1, cloudColor(c.hue, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, c.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw star
    // Sub-pixel smooth — arc() with float coords for anti-aliased motion
    const drawStar = (p: Particle, pr: { x: number; y: number }) => {
      const a = Math.min(1, p.alpha * 3.5);
      if (a < 0.003) return;
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.bl},${a})`;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, p.size * 0.6, 0, 6.2832);
      ctx.fill();
    };

    // Back-pass (depth < 0)
    const allStars = [...disk, ...bulge];
    for (const p of allStars) {
      const theta = p.theta0 + dTheta * p.om;
      const pr = project(theta, p.a, p.b, p.z, PA, CX, CY);
      if (pr.depth < 0) drawStar(p, pr);
    }

    // Core glow
    const coreR = Math.min(width, height) * 0.28;
    const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, coreR);
    cg.addColorStop(0, "rgba(80,111,251,0.10)");
    cg.addColorStop(0.12, "rgba(80,111,251,0.06)");
    cg.addColorStop(0.35, "rgba(141,42,243,0.035)");
    cg.addColorStop(0.7, "rgba(85,23,140,0.018)");
    cg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = cg;
    ctx.fillRect(0, 0, width, height);

    // Front-pass (depth >= 0)
    for (const p of allStars) {
      const theta = p.theta0 + dTheta * p.om;
      const pr = project(theta, p.a, p.b, p.z, PA, CX, CY);
      if (pr.depth >= 0) drawStar(p, pr);
    }

    // Clouds — overlay
    for (const c of clouds) {
      const theta = c.theta0 + dTheta * c.om;
      const pr = project(theta, c.a, c.b, c.z, PA, CX, CY);
      const g = ctx.createRadialGradient(pr.x, pr.y, 0, pr.x, pr.y, c.size);
      g.addColorStop(0, cloudColor(c.hue, 0.014));
      g.addColorStop(0.4, cloudColor(c.hue, 0.006));
      g.addColorStop(1, cloudColor(c.hue, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, c.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
  }, [frame, fps, width, height, disk, bulge, clouds]);

  return (
    <AbsoluteFill style={style}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%" }}
      />
    </AbsoluteFill>
  );
};

// ============================================================
// StarField.tsx
// ============================================================
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

// ============================================================
// VignetteOverlay.tsx
// ============================================================
import React from "react";
import { AbsoluteFill } from "remotion";
import { frame } from "../../styles/tokens";

type Props = {
  strength?: number;
};

/**
 * Radial vignette that darkens the corners towards `frame.bg`.
 */
export const VignetteOverlay: React.FC<Props> = ({ strength = 0.7 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse at center, transparent 40%, ${frame.bg} ${100 * strength}%)`,
    }}
  />
);
