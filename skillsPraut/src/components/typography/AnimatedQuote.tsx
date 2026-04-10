import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  quote: string;
  author?: string;
  role?: string;
  style?: React.CSSProperties;
};

/**
 * Branded quote card with oversized purple quote-mark, italic body and
 * gradient author line.
 */
export const AnimatedQuote: React.FC<Props> = ({
  quote,
  author,
  role,
  style,
}) => {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 1100,
        padding: "64px 80px",
        background: gradients.card,
        borderLeft: `4px solid ${colors.purple[600]}`,
        borderRadius: 12,
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: -16,
          left: 24,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 120,
          color: colors.purple[400],
          lineHeight: 1,
        }}
      >
        “
      </span>
      <p
        style={{
          fontFamily: fonts.primary,
          fontStyle: "italic",
          fontSize: 32,
          fontWeight: fontWeight.body,
          color: colors.purple[100],
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {quote}
      </p>
      {(author || role) && (
        <div style={{ marginTop: 32 }}>
          {author && (
            <span
              style={{
                fontFamily: fonts.primary,
                fontWeight: fontWeight.heading,
                fontSize: 22,
                background: gradients.logoText,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {author}
            </span>
          )}
          {role && (
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 14,
                color: colors.purple[300],
                marginLeft: 12,
              }}
            >
              {role}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
