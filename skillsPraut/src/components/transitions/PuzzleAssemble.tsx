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
