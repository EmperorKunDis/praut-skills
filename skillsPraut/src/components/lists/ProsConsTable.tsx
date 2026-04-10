import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  pros: string[];
  cons: string[];
  style?: React.CSSProperties;
};

const Column: React.FC<{
  items: string[];
  title: string;
  color: string;
  icon: string;
}> = ({ items, title, color, icon }) => (
  <div
    style={{
      background: colors.navy[800],
      borderLeft: `4px solid ${color}`,
      borderRadius: 8,
      padding: 28,
      flex: 1,
      minWidth: 320,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
        marginBottom: 18,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 14,
          letterSpacing: 2,
          textTransform: "uppercase",
          color,
          fontWeight: fontWeight.bodyEmphasis,
        }}
      >
        {title}
      </span>
    </div>
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {items.map((it, i) => (
        <li
          key={i}
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.body,
            fontSize: 18,
            color: colors.purple[100],
            lineHeight: 1.4,
          }}
        >
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export const ProsConsTable: React.FC<Props> = ({ pros, cons, style }) => (
  <div style={{ display: "flex", gap: 24, ...style }}>
    <Column
      items={pros}
      title="Pro"
      color={colors.semantic.success}
      icon="thumbs-up"
    />
    <Column
      items={cons}
      title="Proti"
      color={colors.semantic.error}
      icon="thumbs-down"
    />
  </div>
);
