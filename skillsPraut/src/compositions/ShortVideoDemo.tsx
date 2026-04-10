import React from "react";
import { ShortTemplate } from "../templates/ShortTemplate";

export const ShortVideoDemo: React.FC = () => (
  <ShortTemplate
    hook="LLM nečte slova."
    punchline="Vidí tokeny — kousky textu, které někdy nejsou ani celé slovo. Proto neumí spočítat 'r' v 'strawberry'."
    cta="Sleduj Praut AI"
  />
);
