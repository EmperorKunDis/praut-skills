import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Layer = {
  name: string;
  output?: string;
};

type Props = {
  layers: Layer[];
  style?: React.CSSProperties;
};

/**
 * Generic encoder/decoder model architecture box diagram. Each layer is a
 * row with a name and optional output shape.
 */
export const ModelArchitecture: React.FC<Props> = ({ layers, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: 480,
      ...style,
    }}
  >
    {layers.map((layer, i) => (
      <div
        key={i}
        style={{
          background: gradients.card,
          border: `1px solid ${colors.blue[400]}55`,
          borderRadius: 8,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.bodyEmphasis,
            fontSize: 18,
            color: colors.purple[50],
          }}
        >
          {layer.name}
        </span>
        {layer.output ? (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[300],
            }}
          >
            {layer.output}
          </span>
        ) : null}
      </div>
    ))}
  </div>
);
