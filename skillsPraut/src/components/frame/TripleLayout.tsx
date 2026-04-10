import React from "react";

type Props = {
  first: React.ReactNode;
  second: React.ReactNode;
  third: React.ReactNode;
  gap?: number;
};

/**
 * Three-column layout for Před / Po / Rozdíl style comparisons.
 */
export const TripleLayout: React.FC<Props> = ({
  first,
  second,
  third,
  gap = 48,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap,
        alignItems: "center",
      }}
    >
      <div>{first}</div>
      <div>{second}</div>
      <div>{third}</div>
    </div>
  );
};
