import React from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { CodeBlock } from "./CodeBlock";

type Props = {
  code: string;
  charFrames?: number;
  language?: string;
  style?: React.CSSProperties;
};

/**
 * CodeBlock that types itself character-by-character.
 */
export const CodeTypewriter: React.FC<Props> = ({
  code,
  charFrames = 1,
  language,
  style,
}) => {
  const typed = useTypewriter({ fullText: code, charFrames });
  return <CodeBlock code={typed} language={language} style={style} />;
};
