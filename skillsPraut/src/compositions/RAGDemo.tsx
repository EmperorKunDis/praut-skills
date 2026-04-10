import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { RAGPipeline } from "../components/ai-visuals/RAGPipeline";
import { DisplayHeading } from "../components/typography/DisplayHeading";

export const RAGDemo: React.FC = () => (
  <PrautVideoFrame episodeNumber="03" episodeTitle="RAG Pipeline">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 64,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DisplayHeading gradient>
        RAG: Retrieval-Augmented Generation
      </DisplayHeading>
      <RAGPipeline />
    </AbsoluteFill>
  </PrautVideoFrame>
);
