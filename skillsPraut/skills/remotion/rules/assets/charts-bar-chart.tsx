// Praut-branded reference: animated bar chart.
// Mirrors the production component at src/components/charts/AnimatedBarChart.tsx
// but kept here as a self-contained reference snippet for the skill rule.
//
// All visual values come from src/styles/tokens.ts — never hardcode hex codes.

import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  frame as frameTokens,
  glow,
  seriesColors,
  springs,
} from "../../../../src/styles/tokens";

// Ideal composition size: 1920×1080
const TITLE = "Růst počtu LLM modelů 2024";

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ textAlign: "center", marginBottom: 40 }}>
    <div
      style={{
        color: colors.purple[50],
        fontFamily: fonts.primary,
        fontSize: 48,
        fontWeight: fontWeight.heading,
      }}
    >
      {children}
    </div>
  </div>
);

const YAxis: React.FC<{ steps: number[]; height: number }> = ({
  steps,
  height,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height,
      paddingRight: 16,
    }}
  >
    {steps
      .slice()
      .reverse()
      .map((step) => (
        <div
          key={step}
          style={{
            color: colors.purple[300],
            fontFamily: fonts.mono,
            fontSize: 18,
            textAlign: "right",
          }}
        >
          {step.toLocaleString("cs-CZ")}
        </div>
      ))}
  </div>
);

const Bar: React.FC<{
  height: number;
  progress: number;
  highlight: boolean;
  index: number;
}> = ({ height, progress, highlight, index }) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    }}
  >
    <div
      style={{
        width: "100%",
        height,
        backgroundColor: highlight
          ? colors.purple[600]
          : seriesColors[index % seriesColors.length],
        borderRadius: "8px 8px 0 0",
        opacity: progress,
        filter: highlight ? `drop-shadow(${glow.cta})` : undefined,
      }}
    />
  </div>
);

const XAxis: React.FC<{
  children: React.ReactNode;
  labels: string[];
  height: number;
}> = ({ children, labels, height }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 16,
        height,
        borderLeft: `2px solid ${colors.navy[700]}`,
        borderBottom: `2px solid ${colors.navy[700]}`,
        paddingLeft: 16,
      }}
    >
      {children}
    </div>
    <div style={{ display: "flex", gap: 16, paddingLeft: 16, marginTop: 12 }}>
      {labels.map((label) => (
        <div
          key={label}
          style={{
            flex: 1,
            textAlign: "center",
            color: colors.purple[300],
            fontFamily: fonts.mono,
            fontSize: 18,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  </div>
);

export const MyAnimation = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const data = [
    { quarter: "Q1", count: 24 },
    { quarter: "Q2", count: 38 },
    { quarter: "Q3", count: 56 },
    { quarter: "Q4", count: 92, highlight: true },
  ];

  const minCount = 0;
  const maxCount = 100;
  const range = maxCount - minCount;
  const chartHeight = height - 280;
  const yAxisSteps = [0, 25, 50, 75, 100];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: frameTokens.bg,
        padding: 60,
        display: "flex",
        flexDirection: "column",
        fontFamily: fonts.primary,
      }}
    >
      <Title>{TITLE}</Title>
      <div style={{ display: "flex", flex: 1 }}>
        <YAxis steps={yAxisSteps} height={chartHeight} />
        <XAxis height={chartHeight} labels={data.map((d) => d.quarter)}>
          {data.map((item, i) => {
            const progress = spring({
              frame: frame - i * 6,
              fps,
              config: springs.smooth,
            });
            const barHeight =
              ((item.count - minCount) / range) * chartHeight * progress;
            return (
              <Bar
                key={item.quarter}
                height={barHeight}
                progress={progress}
                highlight={Boolean(item.highlight)}
                index={i}
              />
            );
          })}
        </XAxis>
      </div>
    </AbsoluteFill>
  );
};
