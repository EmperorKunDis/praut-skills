import React from "react";
import { TerminalWindow } from "./TerminalWindow";
import { CodeBlock } from "./CodeBlock";

type Props = {
  command: string;
  response?: string;
  title?: string;
  style?: React.CSSProperties;
};

export const CurlExample: React.FC<Props> = ({
  command,
  response,
  title,
  style,
}) => (
  <TerminalWindow title={title} style={style}>
    <CodeBlock code={command} language="bash" />
    {response ? (
      <div style={{ marginTop: 16 }}>
        <CodeBlock code={response} language="json" />
      </div>
    ) : null}
  </TerminalWindow>
);
