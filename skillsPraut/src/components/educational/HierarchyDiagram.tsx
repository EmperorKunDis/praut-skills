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
