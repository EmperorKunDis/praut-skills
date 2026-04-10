import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Concept = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type Link = {
  from: string;
  to: string;
  label?: string;
};

type Props = {
  concepts: Concept[];
  links: Link[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Concept map — labeled boxes connected by lines. Positions are passed
 * directly so authors can lay them out manually.
 */
export const ConceptMap: React.FC<Props> = ({
  concepts,
  links,
  width = 1200,
  height = 700,
  style,
}) => {
  const conceptById = Object.fromEntries(concepts.map((c) => [c.id, c]));
  return (
    <div style={{ position: "relative", width, height, ...style }}>
      <svg
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        width={width}
        height={height}
      >
        {links.map((link, i) => {
          const from = conceptById[link.from];
          const to = conceptById[link.to];
          if (!from || !to) return null;
          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={colors.blue[400]}
                strokeWidth={2}
                strokeDasharray="6 6"
              />
              {link.label ? (
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 8}
                  textAnchor="middle"
                  fontFamily={fonts.mono}
                  fontSize={12}
                  fill={colors.purple[300]}
                >
                  {link.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      {concepts.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            transform: "translate(-50%, -50%)",
            background: gradients.card,
            border: `1px solid ${colors.blue[400]}66`,
            borderRadius: 8,
            padding: "10px 18px",
            fontFamily: fonts.primary,
            fontWeight: fontWeight.bodyEmphasis,
            fontSize: 16,
            color: colors.purple[50],
            whiteSpace: "nowrap",
          }}
        >
          {c.label}
        </div>
      ))}
    </div>
  );
};
