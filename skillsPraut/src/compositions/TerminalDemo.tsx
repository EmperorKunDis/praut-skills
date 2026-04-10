import React from "react";
import { AbsoluteFill } from "remotion";
import { PrautVideoFrame } from "../components/frame/PrautVideoFrame";
import { TerminalWindow } from "../components/code/TerminalWindow";
import { CodeTypewriter } from "../components/code/CodeTypewriter";

const SAMPLE_CODE = `def hello_praut():
    # Martin Švanda demo
    name = "Praut s.r.o."
    print(f"Vítej, {name}!")
    return True

hello_praut()`;

export const TerminalDemo: React.FC = () => (
  <PrautVideoFrame episodeNumber="04" episodeTitle="Code & Terminal">
    <AbsoluteFill
      style={{
        padding: 100,
        paddingTop: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TerminalWindow title="praut@macbook ~ %" style={{ width: 900 }}>
        <CodeTypewriter code={SAMPLE_CODE} language="python" />
      </TerminalWindow>
    </AbsoluteFill>
  </PrautVideoFrame>
);
