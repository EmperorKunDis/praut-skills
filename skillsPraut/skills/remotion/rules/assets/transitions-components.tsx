// ============================================================
// PuzzleAssemble.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, fonts, fontWeight, glow, springs } from "../../styles/tokens";

type Props = {
  size?: number;
  startFrame?: number;
};

/**
 * Praut signature transition: 4 puzzle tiles slide into place forming the
 * brain mark, with a "CX" badge appearing in the center on completion.
 *
 * Tiles use `#506FFB` at decreasing opacity (100/70/45/25%) per brand.
 * No external SVG assets — pure code so it's animatable and brand-correct.
 */
export const PuzzleAssemble: React.FC<Props> = ({
  size = 320,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tileSize = size / 2;
  const stagger = 6;

  const tile = (dx: number, dy: number, opacity: number, index: number) => {
    const progress = spring({
      frame: frame - startFrame - index * stagger,
      fps,
      config: springs.smooth,
    });
    const distance = (1 - progress) * tileSize * 1.6;
    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: dx > 0 ? size / 2 : 0,
          top: dy > 0 ? size / 2 : 0,
          width: tileSize,
          height: tileSize,
          background: colors.blue[400],
          opacity: opacity * progress,
          transform: `translate(${dx * distance}px, ${dy * distance}px)`,
          borderRadius: 4,
          boxShadow: `inset 0 0 0 1px ${colors.navy[950]}`,
        }}
      />
    );
  };

  const cxProgress = spring({
    frame: frame - startFrame - stagger * 4,
    fps,
    config: springs.bouncy,
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        {tile(-1, -1, 1, 0)}
        {tile(1, -1, 0.7, 1)}
        {tile(-1, 1, 0.45, 2)}
        {tile(1, 1, 0.25, 3)}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: fonts.primary,
            fontWeight: fontWeight.display,
            fontSize: size * 0.18,
            color: colors.purple[50],
            opacity: cxProgress,
            transform: `scale(${cxProgress})`,
            filter: `drop-shadow(${glow.subtle})`,
          }}
        >
          CX
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// WipeTransition.tsx
// ============================================================
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
};

/**
 * Wipe transition — purple gradient mask sweeps across, revealing children.
 */
export const WipeTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.medium,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          clipPath: `inset(0 ${100 - progress - 5}% 0 ${progress}%)`,
          background: colors.purple[600],
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};

// ============================================================
// GlitchTransition.tsx
// ============================================================
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
};

/**
 * RGB-split glitch — three offset color channels for `durationFrames` frames.
 */
export const GlitchTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.fast,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const t = Math.max(0, Math.min(1, local / durationFrames));
  const intensity = (1 - t) * 8;
  const wobble = Math.sin(local * 1.7) * intensity;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${wobble}px)`,
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 0 ${colors.semantic.error})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateX(${-wobble}px)`,
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 0 ${colors.blue[400]})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translateY(${wobble * 0.5}px)`,
          mixBlendMode: "screen",
          filter: `drop-shadow(0 0 0 ${colors.purple[600]})`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================
// ZoomTransition.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springs, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
  direction?: "in" | "out";
};

/**
 * Scale-zoom transition using `springs.smooth`.
 */
export const ZoomTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.medium,
  direction = "in",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.smooth,
    durationInFrames: durationFrames,
  });
  const scale =
    direction === "in" ? 0.8 + progress * 0.2 : 1 + (1 - progress) * 0.2;

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})`, opacity: progress }}>
      {children}
    </AbsoluteFill>
  );
};

// ============================================================
// MorphTransition.tsx
// ============================================================
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { timing } from "../../styles/tokens";

type Props = {
  from: React.ReactNode;
  to: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
};

/**
 * Cross-fade morph between two children using opacity + blur transition.
 */
export const MorphTransition: React.FC<Props> = ({
  from,
  to,
  startFrame = 0,
  durationFrames = timing.medium,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame - startFrame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: 1 - progress,
          filter: `blur(${progress * 8}px)`,
        }}
      >
        {from}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: progress,
          filter: `blur(${(1 - progress) * 8}px)`,
        }}
      >
        {to}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ============================================================
// SlideTransition.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { frame as frameTokens, springs, timing } from "../../styles/tokens";

type Direction = "left" | "right" | "up" | "down";

type Props = {
  children: React.ReactNode;
  from?: Direction;
  startFrame?: number;
  durationFrames?: number;
};

const offsets: Record<Direction, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1],
};

/**
 * Slide transition using `springs.snappy` over `timing.fast`.
 */
export const SlideTransition: React.FC<Props> = ({
  children,
  from = "right",
  startFrame = 0,
  durationFrames = timing.fast,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.snappy,
    durationInFrames: durationFrames,
  });
  const [dx, dy] = offsets[from];
  const x = dx * frameTokens.width * (1 - progress);
  const y = dy * frameTokens.height * (1 - progress);

  return (
    <AbsoluteFill style={{ transform: `translate(${x}px, ${y}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

// ============================================================
// FadeTransition.tsx
// ============================================================
import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { springs, timing } from "../../styles/tokens";

type Props = {
  children: React.ReactNode;
  startFrame?: number;
  durationFrames?: number;
  direction?: "in" | "out";
};

/**
 * Fade in/out wrapper using `springs.smooth` over `timing.medium`.
 */
export const FadeTransition: React.FC<Props> = ({
  children,
  startFrame = 0,
  durationFrames = timing.medium,
  direction = "in",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: springs.smooth,
    durationInFrames: durationFrames,
  });
  const opacity = direction === "in" ? progress : 1 - progress;

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

// ============================================================
// ParticleBurst.tsx
// ============================================================
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

// ============================================================
// RippleEffect.tsx
// ============================================================
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
