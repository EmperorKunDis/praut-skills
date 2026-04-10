import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Row = {
  model: string;
  scores: Array<{ benchmark: string; value: number; isBest?: boolean }>;
};

type Props = {
  rows: Row[];
  style?: React.CSSProperties;
};

/**
 * Tabular benchmark display (e.g. MMLU / HumanEval / GSM8K).
 * Highlights best score per cell.
 */
export const BenchmarkTable: React.FC<Props> = ({ rows, style }) => {
  const benchmarks = rows[0]?.scores.map((s) => s.benchmark) ?? [];

  return (
    <table
      style={{
        borderCollapse: "collapse",
        fontFamily: fonts.primary,
        color: colors.purple[100],
        ...style,
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: "left",
              padding: "12px 24px",
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[100],
              borderBottom: `1px solid ${withOpacity(colors.blue[400], 0.4)}`,
            }}
          >
            Model
          </th>
          {benchmarks.map((b, i) => (
            <th
              key={i}
              style={{
                padding: "12px 24px",
                fontFamily: fonts.mono,
                fontSize: 12,
                color: colors.purple[100],
                borderBottom: `1px solid ${withOpacity(colors.blue[400], 0.4)}`,
              }}
            >
              {b}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td
              style={{
                padding: "14px 24px",
                fontWeight: fontWeight.heading,
                fontSize: 18,
                color: colors.purple[50],
                borderBottom: `1px solid ${colors.navy[700]}`,
              }}
            >
              {row.model}
            </td>
            {row.scores.map((s, si) => (
              <td
                key={si}
                style={{
                  padding: "14px 24px",
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: s.isBest ? fontWeight.heading : fontWeight.body,
                  background: s.isBest ? gradients.brandPrimary : undefined,
                  WebkitBackgroundClip: s.isBest ? "text" : undefined,
                  WebkitTextFillColor: s.isBest ? "transparent" : undefined,
                  backgroundClip: s.isBest ? "text" : undefined,
                  color: s.isBest ? undefined : colors.purple[100],
                  borderBottom: `1px solid ${colors.navy[700]}`,
                }}
              >
                {s.value.toFixed(1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
