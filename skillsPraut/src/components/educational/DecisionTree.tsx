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
