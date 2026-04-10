import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  label: string;
  type?: "process" | "decision" | "start";
  style?: React.CSSProperties;
};

/**
 * Flowchart node — pill-shaped for start/end, rounded rect for process,
 * diamond shape for decision.
 */
export const FlowchartNode: React.FC<Props> = ({
  label,
  type = "process",
  style,
}) => {
  const base: React.CSSProperties = {
    background: gradients.card,
    border: `1px solid ${colors.blue[400]}`,
    fontFamily: fonts.primary,
    fontWeight: fontWeight.bodyEmphasis,
    fontSize: 16,
    color: colors.purple[50],
    padding: "14px 24px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 180,
    textAlign: "center",
    ...style,
  };

  if (type === "start") {
    return <div style={{ ...base, borderRadius: 999 }}>{label}</div>;
  }
  if (type === "decision") {
    return (
      <div
        style={{
          ...base,
          transform: "rotate(45deg)",
          width: 160,
          height: 160,
          padding: 0,
        }}
      >
        <div style={{ transform: "rotate(-45deg)" }}>{label}</div>
      </div>
    );
  }
  return <div style={{ ...base, borderRadius: 8 }}>{label}</div>;
};
