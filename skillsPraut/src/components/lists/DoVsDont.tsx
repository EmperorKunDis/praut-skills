import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";
import { useEnterExit } from "../../hooks/useEnterExit";

type Props = {
  dos: string[];
  donts: string[];
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
            fontSize: 18,
            color: colors.purple[100],
            fontWeight: fontWeight.body,
          }}
        >
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export const DoVsDont: React.FC<Props> = ({ dos, donts, style }) => {
  const pLeft = useEnterExit({ delay: 0 });
  const pRight = useEnterExit({ delay: 8 });

  return (
    <div style={{ display: "flex", gap: 24, ...style }}>
      <div
        style={{
          flex: 1,
          opacity: pLeft,
          transform: `translateX(${(1 - pLeft) * -30}px)`,
        }}
      >
        <Column
          items={dos}
          title="Dělej"
          color={colors.semantic.success}
          icon="check"
        />
      </div>
      <div
        style={{
          flex: 1,
          opacity: pRight,
          transform: `translateX(${(1 - pRight) * 30}px)`,
        }}
      >
        <Column
          items={donts}
          title="Nedělej"
          color={colors.semantic.error}
          icon="x"
        />
      </div>
    </div>
  );
};
