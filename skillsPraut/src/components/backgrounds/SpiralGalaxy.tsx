import React, { useEffect, useMemo, useRef } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

// ─────────────────────────────────────────────────────────
// SpiralGalaxy — canvas density-wave galaxy background
// ~6000 stars, brand blue/purple palette, deterministic.
// ─────────────────────────────────────────────────────────

const ARMS = 5;
const PITCH = 0.32;
const ARM_SPREAD = 0.32;
const FIELD_RATIO = 0.22; // slightly more field stars → fill corners
const ORBIT_SPEED = 0.00001;
const PATTERN_OMEGA = 0.000002;
const TILT = 1.05;
const ROLL = -0.6;
const cosT = Math.cos(TILT);
const sinT = Math.sin(TILT);
const cosR = Math.cos(ROLL);
const sinR = Math.sin(ROLL);
const A_MIN = 4;
const A_MAX = 16000; // larger → fills corners of 1920px frame

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
