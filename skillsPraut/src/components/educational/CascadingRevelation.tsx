import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  springs,
} from "../../styles/tokens";

type Layer = {
  fact: string;
  icon?: string;
  enterFrame: number;
};

type Props = {
  layers: Layer[];
  style?: React.CSSProperties;
};

/**
 * Kurzgesagt "zoom-out" pattern — facts build from specific to broad.
 * Each layer appears with a spring animation at its `enterFrame`,
 * with decreasing font size to convey widening scope.
 */
export const CascadingRevelation: React.FC<Props> = ({ layers, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maxSize = 28;
  const sizeStep = 4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 1200,
        ...style,
      }}
    >
      {layers.map((layer, i) => {
        const p = spring({
          frame: frame - layer.enterFrame,
          fps,
          config: springs.snappy,
        });
        const fontSize = Math.max(16, maxSize - i * sizeStep);
        const borderColors = [
          colors.blue[400],
          colors.purple[600],
          colors.purple[700],
          colors.blue[500],
        ];
        return (
          <div
            key={i}
            style={{
              background: gradients.card,
              borderLeft: `4px solid ${borderColors[i % borderColors.length]}`,
              borderRadius: 12,
              padding: "20px 28px",
              opacity: p,
              transform: `translateY(${(1 - p) * 20}px) scale(${0.95 + p * 0.05})`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize,
                color: colors.purple[50],
                lineHeight: 1.3,
              }}
            >
              {layer.fact}
            </div>
          </div>
        );
      })}
    </div>
  );
};
