// ============================================================
// FlowchartNode.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  label: string;
  type?: "process" | "decision" | "start";
  style?: React.CSSProperties;
};

/**
 * Flowchart node — pill-shaped for start/end, rounded rect for process,
 * diamond shape for decision.
 */
export const FlowchartNode: React.FC<Props> = ({
  label,
  type = "process",
  style,
}) => {
  const base: React.CSSProperties = {
    background: gradients.card,
    border: `1px solid ${colors.blue[400]}`,
    fontFamily: fonts.primary,
    fontWeight: fontWeight.bodyEmphasis,
    fontSize: 16,
    color: colors.purple[50],
    padding: "14px 24px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 180,
    textAlign: "center",
    ...style,
  };

  if (type === "start") {
    return <div style={{ ...base, borderRadius: 999 }}>{label}</div>;
  }
  if (type === "decision") {
    return (
      <div
        style={{
          ...base,
          transform: "rotate(45deg)",
          width: 160,
          height: 160,
          padding: 0,
        }}
      >
        <div style={{ transform: "rotate(-45deg)" }}>{label}</div>
      </div>
    );
  }
  return <div style={{ ...base, borderRadius: 8 }}>{label}</div>;
};

// ============================================================
// BeforeAfterSlider.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, fontWeight, glow, timing } from "../../styles/tokens";

type Props = {
  before: React.ReactNode;
  after: React.ReactNode;
  width?: number;
  height?: number;
  startFrame?: number;
  style?: React.CSSProperties;
};

/**
 * Before/After comparison with an animated divider that sweeps from left
 * to right, revealing "after" beneath "before".
 */
export const BeforeAfterSlider: React.FC<Props> = ({
  before,
  after,
  width = 1200,
  height = 600,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame - startFrame, [0, timing.reveal], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 12,
        overflow: "hidden",
        border: `2px solid ${colors.blue[400]}`,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>{after}</div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${sweep}% 0 0)`,
        }}
      >
        {before}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${100 - sweep}%`,
          width: 3,
          background: colors.blue[400],
          boxShadow: glow.active,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[100],
          background: colors.navy[900],
          padding: "6px 12px",
          borderRadius: 4,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        PRED
      </div>
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[100],
          background: colors.navy[900],
          padding: "6px 12px",
          borderRadius: 4,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        PO
      </div>
    </div>
  );
};

// ============================================================
// MindMap.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";

type Branch = {
  label: string;
  angle: number; // radians
  distance?: number;
};

type Props = {
  central: string;
  branches: Branch[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

export const MindMap: React.FC<Props> = ({
  central,
  branches,
  width = 1200,
  height = 700,
  style,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        ...style,
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {branches.map((b, i) => {
          const dist = b.distance ?? 280;
          const x = cx + Math.cos(b.angle) * dist;
          const y = cy + Math.sin(b.angle) * dist;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={colors.blue[400]}
              strokeWidth={2}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%, -50%)",
          background: gradients.brandPrimary,
          padding: "20px 32px",
          borderRadius: 999,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
          boxShadow: glow.cta,
        }}
      >
        {central}
      </div>
      {branches.map((b, i) => {
        const dist = b.distance ?? 280;
        const x = cx + Math.cos(b.angle) * dist;
        const y = cy + Math.sin(b.angle) * dist;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              background: colors.navy[800],
              border: `1px solid ${colors.blue[400]}66`,
              padding: "10px 18px",
              borderRadius: 8,
              fontFamily: fonts.primary,
              fontSize: 16,
              color: colors.purple[100],
              whiteSpace: "nowrap",
            }}
          >
            {b.label}
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// DefinitionBox.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  term: string;
  definition: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * "Co je to X?" definition box — gradient card, purple left border.
 */
export const DefinitionBox: React.FC<Props> = ({ term, definition, style }) => (
  <div
    style={{
      background: gradients.card,
      borderLeft: `4px solid ${colors.purple[600]}`,
      borderRadius: 12,
      padding: "36px 48px",
      maxWidth: 1200,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.purple[300],
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 12,
        fontWeight: fontWeight.bodyEmphasis,
      }}
    >
      Definice
    </div>
    <div
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.display,
        fontSize: 36,
        color: colors.purple[50],
        marginBottom: 16,
      }}
    >
      {term}
    </div>
    <div
      style={{
        fontFamily: fonts.primary,
        fontSize: 22,
        fontWeight: fontWeight.body,
        color: colors.purple[100],
        lineHeight: 1.5,
      }}
    >
      {definition}
    </div>
  </div>
);

// ============================================================
// ConceptMap.tsx
// ============================================================
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

// ============================================================
// HierarchyDiagram.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

export type HNode = {
  label: string;
  children?: HNode[];
};

type Props = {
  root: HNode;
  style?: React.CSSProperties;
};

const NodeView: React.FC<{ node: HNode; level: number }> = ({
  node,
  level,
}) => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <div
      style={{
        padding: "12px 24px",
        background: level === 0 ? gradients.brandPrimary : gradients.card,
        border: level === 0 ? "none" : `1px solid ${colors.blue[400]}66`,
        borderRadius: 8,
        fontFamily: fonts.primary,
        fontWeight: fontWeight.bodyEmphasis,
        fontSize: level === 0 ? 22 : 16,
        color: colors.purple[50],
        whiteSpace: "nowrap",
      }}
    >
      {node.label}
    </div>
    {node.children && node.children.length > 0 ? (
      <>
        <div
          style={{
            width: 1,
            height: 24,
            background: colors.blue[400],
          }}
        />
        <div style={{ display: "flex", gap: 32 }}>
          {node.children.map((c, i) => (
            <NodeView key={i} node={c} level={level + 1} />
          ))}
        </div>
      </>
    ) : null}
  </div>
);

export const HierarchyDiagram: React.FC<Props> = ({ root, style }) => (
  <div style={style}>
    <NodeView node={root} level={0} />
  </div>
);

// ============================================================
// DecisionTree.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
} from "../../styles/tokens";

export type TreeNode = {
  label: string;
  active?: boolean;
  yes?: TreeNode;
  no?: TreeNode;
};

type Props = {
  root: TreeNode;
  style?: React.CSSProperties;
};

const Node: React.FC<{ node: TreeNode }> = ({ node }) => {
  const isLeaf = !node.yes && !node.no;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          padding: "12px 20px",
          background: node.active ? gradients.brandPrimary : gradients.card,
          border: `1px solid ${node.active ? "transparent" : colors.blue[400]}`,
          borderRadius: isLeaf ? 999 : 8,
          boxShadow: node.active ? glow.cta : undefined,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.bodyEmphasis,
          fontSize: 16,
          color: colors.purple[50],
          minWidth: 160,
          textAlign: "center",
        }}
      >
        {node.label}
      </div>
      {(node.yes || node.no) && (
        <div style={{ display: "flex", gap: 64, marginTop: 32 }}>
          {node.yes && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: colors.semantic.success,
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                ANO
              </div>
              <Node node={node.yes} />
            </div>
          )}
          {node.no && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  color: colors.semantic.error,
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                NE
              </div>
              <Node node={node.no} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const DecisionTree: React.FC<Props> = ({ root, style }) => (
  <div style={style}>
    <Node node={root} />
  </div>
);

// ============================================================
// AnalogyVisual.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  left: { label: string; icon: string };
  right: { label: string; icon: string };
  relation?: string;
  style?: React.CSSProperties;
};

/**
 * Analogy visualization — "X is like Y" with icons and a "≈" symbol between.
 */
export const AnalogyVisual: React.FC<Props> = ({
  left,
  right,
  relation = "jako",
  style,
}) => {
  const Item: React.FC<{ label: string; icon: string }> = ({ label, icon }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: 32,
        background: gradients.card,
        borderRadius: 16,
        minWidth: 240,
      }}
    >
      <PhosphorIcon name={icon} size={96} color={colors.blue[400]} />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 24,
          color: colors.purple[50],
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        ...style,
      }}
    >
      <Item {...left} />
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 36,
          color: colors.blue[400],
        }}
      >
        {relation}
      </div>
      <Item {...right} />
    </div>
  );
};

// ============================================================
// FormulaDisplay.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  formula: string;
  caption?: string;
  style?: React.CSSProperties;
};

/**
 * Mathematical formula display. KaTeX is intentionally NOT a dependency —
 * pass the formula as a pre-formatted plain string for now.
 */
export const FormulaDisplay: React.FC<Props> = ({
  formula,
  caption,
  style,
}) => (
  <div
    style={{
      textAlign: "center",
      padding: "40px 60px",
      background: colors.navy[900],
      borderRadius: 12,
      border: `1px solid ${colors.purple[600]}33`,
      ...style,
    }}
  >
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 42,
        color: colors.purple[100],
        fontWeight: fontWeight.bodyEmphasis,
      }}
    >
      {formula}
    </div>
    {caption ? (
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.primary,
          fontSize: 14,
          color: colors.purple[300],
        }}
      >
        {caption}
      </div>
    ) : null}
  </div>
);
