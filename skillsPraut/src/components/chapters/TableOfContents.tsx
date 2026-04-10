import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Item = {
  number: string;
  title: string;
};

type Props = {
  items: Item[];
  activeIndex?: number;
  style?: React.CSSProperties;
};

export const TableOfContents: React.FC<Props> = ({
  items,
  activeIndex = 0,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style,
    }}
  >
    {items.map((item, i) => {
      const isActive = i === activeIndex;
      return (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            padding: "12px 24px",
            borderLeft: `3px solid ${
              isActive ? colors.blue[400] : colors.navy[700]
            }`,
            background: isActive ? "rgba(80,111,251,0.08)" : "transparent",
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              color: isActive ? colors.blue[400] : colors.purple[300],
              letterSpacing: 1.5,
            }}
          >
            {item.number}
          </span>
          <span
            style={{
              fontFamily: fonts.primary,
              fontWeight: isActive ? fontWeight.heading : fontWeight.body,
              fontSize: 22,
              background: isActive ? gradients.logoText : undefined,
              WebkitBackgroundClip: isActive ? "text" : undefined,
              WebkitTextFillColor: isActive ? "transparent" : undefined,
              backgroundClip: isActive ? "text" : undefined,
              color: isActive ? undefined : colors.purple[200],
            }}
          >
            {item.title}
          </span>
        </div>
      );
    })}
  </div>
);
