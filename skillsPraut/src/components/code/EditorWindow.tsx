import React from "react";
import { colors, fonts } from "../../styles/tokens";
import { CodeBlock } from "./CodeBlock";

type Tab = {
  name: string;
  code: string;
  language?: string;
};

type Props = {
  tabs: Tab[];
  activeIndex?: number;
  style?: React.CSSProperties;
};

/**
 * VS Code-like editor window with tabs and a code area.
 */
export const EditorWindow: React.FC<Props> = ({
  tabs,
  activeIndex = 0,
  style,
}) => {
  const active = tabs[activeIndex];

  return (
    <div
      style={{
        background: colors.navy[900],
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${colors.blue[400]}33`,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          background: colors.navy[800],
          borderBottom: `1px solid ${colors.navy[700]}`,
        }}
      >
        {tabs.map((tab, i) => (
          <div
            key={i}
            style={{
              padding: "10px 20px",
              fontFamily: fonts.mono,
              fontSize: 13,
              color: i === activeIndex ? colors.purple[50] : colors.purple[300],
              background: i === activeIndex ? colors.navy[900] : "transparent",
              borderTop:
                i === activeIndex
                  ? `2px solid ${colors.blue[400]}`
                  : "2px solid transparent",
            }}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <CodeBlock
        code={active.code}
        language={active.language}
        style={{ borderRadius: 0, border: "none" }}
      />
    </div>
  );
};
