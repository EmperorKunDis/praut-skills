import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { AnimatedBarChart } from "../components/charts/AnimatedBarChart";
import { DisplayHeading } from "../components/typography/DisplayHeading";

export const BarChartDemo: React.FC = () => (
  <PrautVideoFrame episodeNumber="01" episodeTitle="Růst počtu LLM modelů">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 48,
        alignItems: "center",
      }}
    >
      <DisplayHeading gradient>Růst počtu LLM modelů 2024</DisplayHeading>
      <AnimatedBarChart
        data={[
          { label: "Q1", value: 24 },
          { label: "Q2", value: 38 },
          { label: "Q3", value: 56 },
          { label: "Q4", value: 92, highlight: true },
        ]}
      />
    </AbsoluteFill>
  </PrautVideoFrame>
);
