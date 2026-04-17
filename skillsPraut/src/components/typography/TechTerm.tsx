import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  term: string;
  descriptor?: string;
  pronunciation?: string;
  display?: "inline" | "block";
  style?: React.CSSProperties;
};

export const TechTerm: React.FC<Props> = ({
  term,
  descriptor,
  pronunciation,
  display = "inline",
  style,
}) => {
  const Tag = display === "block" ? "div" : "span";
  return (
    <Tag
      style={{
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        color: colors.blue[400],
        ...style,
      }}
    >
      {descriptor && (
        <span
          style={{
            fontWeight: fontWeight.body,
            color: colors.purple[200],
            marginRight: 6,
          }}
        >
          {descriptor}
        </span>
      )}
      {term}
      {pronunciation && (
        <sup
          style={{
            fontFamily: fonts.mono,
            fontSize: "0.6em",
            color: colors.purple[300],
            marginLeft: 4,
          }}
        >
          {pronunciation}
        </sup>
      )}
    </Tag>
  );
};
