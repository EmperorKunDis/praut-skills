import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type Props = {
  code: string;
  language?: string;
  style?: React.CSSProperties;
};

// Naive regex-based highlighter — keywords / strings / comments / numbers
// for Python / JS / TS / Bash. No external dependencies.
const KEYWORDS = new Set([
  "def",
  "class",
  "return",
  "if",
  "else",
  "elif",
  "for",
  "while",
  "in",
  "import",
  "from",
  "as",
  "try",
  "except",
  "finally",
  "raise",
  "with",
  "lambda",
  "yield",
  "async",
  "await",
  "function",
  "const",
  "let",
  "var",
  "new",
  "this",
  "export",
  "default",
  "public",
  "private",
  "static",
  "true",
  "false",
  "null",
  "None",
  "True",
  "False",
  "echo",
  "print",
]);

const tokenize = (line: string): React.ReactNode[] => {
  const out: React.ReactNode[] = [];
  const re =
    /(\/\/[^\n]*|#[^\n]*|"[^"]*"|'[^']*'|`[^`]*`|\b\d+(\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|.)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(line)) !== null) {
    const t = m[0];
    if (t.startsWith("//") || t.startsWith("#")) {
      out.push(
        <span key={i++} style={{ color: withOpacity(colors.purple[300], 0.6) }}>
          {t}
        </span>,
      );
    } else if (t.startsWith('"') || t.startsWith("'") || t.startsWith("`")) {
      out.push(
        <span key={i++} style={{ color: colors.semantic.success }}>
          {t}
        </span>,
      );
    } else if (/^\d/.test(t)) {
      out.push(
        <span key={i++} style={{ color: colors.blue[400] }}>
          {t}
        </span>,
      );
    } else if (KEYWORDS.has(t)) {
      out.push(
        <span key={i++} style={{ color: colors.purple[400], fontWeight: 600 }}>
          {t}
        </span>,
      );
    } else {
      out.push(<span key={i++}>{t}</span>);
    }
  }
  return out;
};

export const CodeBlock: React.FC<Props> = ({ code, language, style }) => {
  const lines = code.split("\n");
  return (
    <pre
      style={{
        background: colors.navy[900],
        border: `1px solid ${withOpacity(colors.blue[400], 0.25)}`,
        borderRadius: 8,
        padding: 24,
        fontFamily: fonts.mono,
        fontSize: 16,
        lineHeight: 1.6,
        color: colors.purple[100],
        margin: 0,
        overflow: "auto",
        ...style,
      }}
    >
      {language ? (
        <div
          style={{
            fontSize: 11,
            color: colors.purple[300],
            letterSpacing: 1,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {language}
        </div>
      ) : null}
      {lines.map((line, i) => (
        <div key={i}>{tokenize(line)}</div>
      ))}
    </pre>
  );
};
