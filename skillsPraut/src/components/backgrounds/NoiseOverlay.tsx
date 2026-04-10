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
