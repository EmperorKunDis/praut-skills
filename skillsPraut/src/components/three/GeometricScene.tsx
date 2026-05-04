// src/components/three/GeometricScene.tsx
// Praut branded Three.js geometric animation.
// All animations are driven by useCurrentFrame() — no useFrame() allowed.

import React, { useRef } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { colors, springs } from "../../styles/tokens";

// ─── Torus Knot (center hero) ────────────────────────────────────────────────

const TorusKnot: React.FC<{ frame: number }> = ({ frame }) => {
  const rotX = frame * 0.008;
  const rotY = frame * 0.015;
  const rotZ = frame * 0.005;

  const scale = spring({
    frame,
    fps: 30,
    config: springs.smooth,
  });

  return (
    <mesh rotation={[rotX, rotY, rotZ]} scale={[scale, scale, scale]}>
      <torusKnotGeometry args={[1.4, 0.42, 180, 24, 2, 3]} />
      <meshStandardMaterial
        color={colors.blue[400]}
        emissive={colors.blue[500]}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.85}
      />
    </mesh>
  );
};

// ─── Wireframe Icosahedron ────────────────────────────────────────────────────

const WireIcosahedron: React.FC<{
  frame: number;
  offset: number;
  position: [number, number, number];
}> = ({ frame, offset, position }) => {
  const rot = (frame + offset) * 0.02;

  const appearProgress = spring({
    frame: Math.max(0, frame - offset),
    fps: 30,
    config: springs.gentle,
  });

  return (
    <mesh
      position={position}
      rotation={[rot * 0.7, rot, rot * 0.4]}
      scale={[appearProgress, appearProgress, appearProgress]}
    >
      <icosahedronGeometry args={[0.7, 1]} />
      <meshStandardMaterial
        color={colors.purple[400]}
        emissive={colors.purple[600]}
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  );
};

// ─── Orbiting Sphere ─────────────────────────────────────────────────────────

const OrbitingSphere: React.FC<{
  frame: number;
  radius: number;
  speed: number;
  phaseOffset: number;
  size: number;
  color: string;
  emissive: string;
}> = ({ frame, radius, speed, phaseOffset, size, color, emissive }) => {
  const angle = (frame * speed + phaseOffset) * (Math.PI / 180);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = Math.sin(angle * 0.5) * 0.8;

  const selfRot = frame * 0.04;

  return (
    <mesh position={[x, y, z]} rotation={[selfRot, selfRot * 0.7, 0]}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.7}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

// ─── Floating Ring ────────────────────────────────────────────────────────────

const FloatingRing: React.FC<{ frame: number }> = ({ frame }) => {
  const rotX = Math.PI / 2 + frame * 0.006;
  const rotY = frame * 0.012;

  const scaleProgress = spring({
    frame,
    fps: 30,
    config: springs.smooth,
    delay: 10,
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <mesh
      rotation={[rotX, rotY, 0]}
      scale={[scaleProgress * 2.2, scaleProgress * 2.2, scaleProgress * 2.2]}
    >
      <torusGeometry args={[1, 0.04, 16, 120]} />
      <meshStandardMaterial
        color={colors.blue[400]}
        emissive={colors.blue[400]}
        emissiveIntensity={0.8}
        transparent
        opacity={opacity}
        roughness={0.0}
        metalness={1.0}
      />
    </mesh>
  );
};

// ─── Particle Field (small dots) ──────────────────────────────────────────────

const PARTICLE_COUNT = 80;
const particlePositions = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const seed1 = Math.sin(i * 127.1) * 43758.5453;
  const seed2 = Math.sin(i * 311.7) * 43758.5453;
  const seed3 = Math.sin(i * 74.3) * 43758.5453;
  return [
    (seed1 - Math.floor(seed1) - 0.5) * 14,
    (seed2 - Math.floor(seed2) - 0.5) * 8,
    (seed3 - Math.floor(seed3) - 0.5) * 10 - 3,
  ] as [number, number, number];
});

const ParticleField: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <>
      {particlePositions.map((pos, i) => {
        const floatY = Math.sin((frame + i * 20) * 0.03) * 0.15;
        const opacity = interpolate(frame, [i * 0.3, i * 0.3 + 15], [0, 0.7], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const isBlue = i % 3 !== 0;
        return (
          <mesh key={i} position={[pos[0], pos[1] + floatY, pos[2]]}>
            <sphereGeometry args={[0.04 + (i % 3) * 0.02, 6, 6]} />
            <meshStandardMaterial
              color={isBlue ? colors.blue[400] : colors.purple[400]}
              emissive={isBlue ? colors.blue[400] : colors.purple[600]}
              emissiveIntensity={1.2}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </>
  );
};

// ─── Main exported component ──────────────────────────────────────────────────

export const GeometricScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Slow camera drift
  const camX = Math.sin(frame * 0.008) * 1.2;
  const camY = Math.cos(frame * 0.006) * 0.6;

  return (
    <ThreeCanvas width={width} height={height}>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight
        position={[0, 0, 6]}
        intensity={2.5}
        color={colors.blue[400]}
      />
      <pointLight
        position={[-4, 3, 2]}
        intensity={1.8}
        color={colors.purple[600]}
      />
      <pointLight
        position={[4, -2, 3]}
        intensity={1.2}
        color={colors.purple[400]}
      />

      {/* Camera group — drift effect */}
      <group position={[camX, camY, 0]}>
        {/* Hero torus knot */}
        <TorusKnot frame={frame} />

        {/* Floating ring around hero */}
        <FloatingRing frame={frame} />

        {/* Orbiting octahedra */}
        <OrbitingSphere
          frame={frame}
          radius={3.2}
          speed={1.2}
          phaseOffset={0}
          size={0.28}
          color={colors.purple[600]}
          emissive={colors.purple[700]}
        />
        <OrbitingSphere
          frame={frame}
          radius={3.2}
          speed={1.2}
          phaseOffset={120}
          size={0.22}
          color={colors.blue[400]}
          emissive={colors.blue[500]}
        />
        <OrbitingSphere
          frame={frame}
          radius={3.2}
          speed={1.2}
          phaseOffset={240}
          size={0.25}
          color={colors.purple[400]}
          emissive={colors.purple[600]}
        />

        {/* Outer slower orbit */}
        <OrbitingSphere
          frame={frame}
          radius={4.8}
          speed={0.7}
          phaseOffset={60}
          size={0.18}
          color={colors.blue[500]}
          emissive={colors.blue[400]}
        />
        <OrbitingSphere
          frame={frame}
          radius={4.8}
          speed={0.7}
          phaseOffset={200}
          size={0.15}
          color={colors.purple[300]}
          emissive={colors.purple[600]}
        />

        {/* Wireframe icosahedra at corners */}
        <WireIcosahedron frame={frame} offset={0} position={[-4.5, 2, -2]} />
        <WireIcosahedron frame={frame} offset={8} position={[4.2, -1.8, -2]} />
        <WireIcosahedron
          frame={frame}
          offset={15}
          position={[-3.8, -2.2, -1]}
        />
        <WireIcosahedron frame={frame} offset={5} position={[3.5, 2.5, -3]} />

        {/* Ambient particles */}
        <ParticleField frame={frame} />
      </group>
    </ThreeCanvas>
  );
};
