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
