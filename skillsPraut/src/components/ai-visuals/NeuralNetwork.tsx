import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, glow, springs } from "../../styles/tokens";

type Props = {
  layers: number[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Animated feedforward neural network — neurons activate layer by layer
 * with `springs.snappy`, synapses fade in over time.
 */
export const NeuralNetwork: React.FC<Props> = ({
  layers,
  width = 1200,
  height = 600,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layerSpacing = width / (layers.length + 1);

  return (
    <svg width={width} height={height} style={style}>
      {layers.slice(0, -1).map((count, layerIdx) => {
        const nextCount = layers[layerIdx + 1];
        const x1 = layerSpacing * (layerIdx + 1);
        const x2 = layerSpacing * (layerIdx + 2);
        const ySpacing1 = height / (count + 1);
        const ySpacing2 = height / (nextCount + 1);

        return Array.from({ length: count }).flatMap((_, i) =>
          Array.from({ length: nextCount }).map((__, j) => {
            const localFrame = frame - layerIdx * 8;
            const opacity = interpolate(localFrame, [0, 30], [0, 0.4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <line
                key={`${layerIdx}-${i}-${j}`}
                x1={x1}
                y1={ySpacing1 * (i + 1)}
                x2={x2}
                y2={ySpacing2 * (j + 1)}
                stroke={colors.blue[400]}
                strokeWidth={1}
                opacity={opacity}
              />
            );
          }),
        );
      })}

      {layers.map((count, layerIdx) => {
        const x = layerSpacing * (layerIdx + 1);
        const ySpacing = height / (count + 1);
        return Array.from({ length: count }).map((_, i) => {
          const localFrame = frame - layerIdx * 8 - i * 2;
          const activation = spring({
            frame: localFrame,
            fps,
            config: springs.snappy,
          });
          return (
            <circle
              key={`n-${layerIdx}-${i}`}
              cx={x}
              cy={ySpacing * (i + 1)}
              r={18}
              fill={colors.navy[700]}
              stroke={colors.purple[600]}
              strokeWidth={2 * activation}
              filter={
                activation > 0.5 ? `drop-shadow(${glow.subtle})` : undefined
              }
            />
          );
        });
      })}
    </svg>
  );
};
