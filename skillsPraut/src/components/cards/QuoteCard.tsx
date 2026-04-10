import React from "react";
import { AnimatedQuote } from "../typography/AnimatedQuote";

type Props = {
  quote: string;
  author?: string;
  role?: string;
  avatarSrc?: string;
  style?: React.CSSProperties;
};

/**
 * Card-shaped quote with avatar slot. Wraps `<AnimatedQuote />`.
 */
export const QuoteCard: React.FC<Props> = ({
  quote,
  author,
  role,
  avatarSrc,
  style,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 32, ...style }}>
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={author ?? "avatar"}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : null}
      <AnimatedQuote quote={quote} author={author} role={role} />
    </div>
  );
};
