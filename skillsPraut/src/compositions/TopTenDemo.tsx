import React from "react";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { SlideRoot } from "../components/frame/SlideRoot";
import { TopTenCard } from "../components/lists/TopTenCard";

export const TopTenDemo: React.FC = () => (
  <PrautVideoFrame episodeNumber="05" episodeTitle="TOP 10 LLM modelů">
    <SlideRoot>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <TopTenCard
          rank={1}
          title="Claude Opus 4.6"
          description="Anthropic's flagship — nejlepší v reasoningu i kódu"
          isWinner
        />
        <TopTenCard
          rank={2}
          title="GPT-5"
          description="OpenAI's universal multimodal model"
        />
        <TopTenCard
          rank={3}
          title="Gemini 2.5 Pro"
          description="Google's million-token context window"
        />
      </div>
    </SlideRoot>
  </PrautVideoFrame>
);
