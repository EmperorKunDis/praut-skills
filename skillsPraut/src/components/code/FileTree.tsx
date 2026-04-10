import React from "react";
import { colors, fonts } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  active?: boolean;
  children?: FileNode[];
};

type Props = {
  nodes: FileNode[];
  style?: React.CSSProperties;
};

const Node: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => (
  <>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 8px",
        paddingLeft: 8 + depth * 20,
        background: node.active ? colors.navy[700] : "transparent",
        borderLeft: node.active
          ? `2px solid ${colors.blue[400]}`
          : "2px solid transparent",
        borderRadius: 4,
        fontFamily: fonts.mono,
        fontSize: 14,
        color: node.active ? colors.purple[50] : colors.purple[200],
      }}
    >
      <PhosphorIcon
        name={node.type === "folder" ? "folder" : "file"}
        weight={node.type === "folder" ? "fill" : "regular"}
        size={18}
        color={node.type === "folder" ? colors.purple[400] : colors.blue[400]}
      />
      {node.name}
    </div>
    {node.children?.map((child, i) => (
      <Node key={i} node={child} depth={depth + 1} />
    ))}
  </>
);

export const FileTree: React.FC<Props> = ({ nodes, style }) => (
  <div
    style={{
      background: colors.navy[800],
      borderRadius: 8,
      padding: 16,
      minWidth: 320,
      ...style,
    }}
  >
    {nodes.map((n, i) => (
      <Node key={i} node={n} depth={0} />
    ))}
  </div>
);
