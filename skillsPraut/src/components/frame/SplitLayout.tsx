import React from "react";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  /** Ratio of left/right column widths. e.g. 0.5 = 50/50, 0.66 = 2/1. */
  ratio?: number;
  gap?: number;
};

/**
 * Two-column layout for "text + visual" slides.
 * Default 50/50 split with a 64px gap.
 */
export const SplitLayout: React.FC<Props> = ({
  left,
  right,
  ratio = 0.5,
  gap = 64,
}) => {
  const leftPercent = `${ratio * 100}%`;
  const rightPercent = `${(1 - ratio) * 100}%`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        gap,
        alignItems: "center",
      }}
    >
      <div style={{ flexBasis: leftPercent, flexGrow: 0, flexShrink: 0 }}>
        {left}
      </div>
      <div style={{ flexBasis: rightPercent, flexGrow: 0, flexShrink: 0 }}>
        {right}
      </div>
    </div>
  );
};
