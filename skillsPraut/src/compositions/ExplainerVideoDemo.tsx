import React from "react";
import { ExplainerTemplate } from "../templates/ExplainerTemplate";
import { TokenizerView } from "../components/ai-visuals/TokenizerView";

export const ExplainerVideoDemo: React.FC = () => (
  <ExplainerTemplate
    episodeNumber="01"
    episodeTitle="Co je to tokenizace"
    hook="Proč LLM nečte slova, ale tokeny?"
    term="Tokenizace"
    definition="Proces převodu textu na nejmenší jednotky, kterým model rozumí. Token může být celé slovo, část slova, znak, nebo i mezery."
    example={
      <TokenizerView
        tokens={[
          "Praut ",
          "je ",
          "AI ",
          "channel ",
          "o ",
          "umělé ",
          "inteligenci",
          ".",
        ]}
      />
    }
    takeaway="LLM vidí tokeny, ne písmena. Proto se mu těžko počítají písmena ve slovech."
    nextVideoTitle="Embedding space — co dělá vektorová matematika"
  />
);
