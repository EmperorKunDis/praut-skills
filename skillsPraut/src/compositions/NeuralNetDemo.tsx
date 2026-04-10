import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { NeuralNetwork } from "../components/ai-visuals/NeuralNetwork";
import { DisplayHeading } from "../components/typography/DisplayHeading";

export const NeuralNetDemo: React.FC = () => (
  <PrautVideoFrame episodeNumber="02" episodeTitle="Neural Network">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 48,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DisplayHeading gradient>Neural Network [4, 6, 6, 2]</DisplayHeading>
      <NeuralNetwork layers={[4, 6, 6, 2]} />
    </AbsoluteFill>
  </PrautVideoFrame>
);
