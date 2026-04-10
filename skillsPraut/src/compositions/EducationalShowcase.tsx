import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { DefinitionBox } from "../components/educational/DefinitionBox";
import { FormulaDisplay } from "../components/educational/FormulaDisplay";
import { AnalogyVisual } from "../components/educational/AnalogyVisual";

export const EducationalShowcase: React.FC = () => (
  <PrautVideoFrame episodeNumber="00" episodeTitle="Educational Patterns">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        flexDirection: "column",
        gap: 32,
        alignItems: "center",
      }}
    >
      <DefinitionBox
        term="Transformer"
        definition="Architektura neuronové sítě postavená na self-attention. Základ všech moderních LLM."
      />
      <FormulaDisplay
        formula="Attention(Q, K, V) = softmax(QKᵀ/√d) · V"
        caption="Scaled dot-product attention"
      />
      <AnalogyVisual
        left={{ label: "Mozek", icon: "brain" }}
        right={{ label: "CPU", icon: "cpu" }}
        relation="je jako"
      />
    </AbsoluteFill>
  </PrautVideoFrame>
);
