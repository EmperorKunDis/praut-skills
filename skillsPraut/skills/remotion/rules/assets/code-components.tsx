// ============================================================
// EditorWindow.tsx
// ============================================================
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

// ============================================================
// CommandLine.tsx
// ============================================================
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, fonts } from "../../styles/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";

type Props = {
  command: string;
  prompt?: string;
  style?: React.CSSProperties;
};

/**
 * Single-line CLI prompt with typewriter command + blinking blue cursor.
 */
export const CommandLine: React.FC<Props> = ({
  command,
  prompt = "$",
  style,
}) => {
  const frame = useCurrentFrame();
  const typed = useTypewriter({ fullText: command });
  const cursorOpacity = interpolate(frame % 30, [0, 15, 30], [1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: fonts.mono,
        fontSize: 22,
        color: colors.purple[100],
        display: "flex",
        alignItems: "center",
        gap: 12,
        ...style,
      }}
    >
      <span style={{ color: colors.semantic.success, fontWeight: 700 }}>
        {prompt}
      </span>
      <span>{typed}</span>
      <span
        style={{
          display: "inline-block",
          width: 10,
          height: 22,
          background: colors.blue[400],
          opacity: cursorOpacity,
        }}
      />
    </div>
  );
};

// ============================================================
// FileTree.tsx
// ============================================================
import React from "react";
import { colors, fonts } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  active?: boolean;
  children?: FileNode[];
};

type Props = {
  nodes: FileNode[];
  style?: React.CSSProperties;
};

const Node: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => (
  <>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 8px",
        paddingLeft: 8 + depth * 20,
        background: node.active ? colors.navy[700] : "transparent",
        borderLeft: node.active
          ? `2px solid ${colors.blue[400]}`
          : "2px solid transparent",
        borderRadius: 4,
        fontFamily: fonts.mono,
        fontSize: 14,
        color: node.active ? colors.purple[50] : colors.purple[200],
      }}
    >
      <PhosphorIcon
        name={node.type === "folder" ? "folder" : "file"}
        weight={node.type === "folder" ? "fill" : "regular"}
        size={18}
        color={node.type === "folder" ? colors.purple[400] : colors.blue[400]}
      />
      {node.name}
    </div>
    {node.children?.map((child, i) => (
      <Node key={i} node={child} depth={depth + 1} />
    ))}
  </>
);

export const FileTree: React.FC<Props> = ({ nodes, style }) => (
  <div
    style={{
      background: colors.navy[800],
      borderRadius: 8,
      padding: 16,
      minWidth: 320,
      ...style,
    }}
  >
    {nodes.map((n, i) => (
      <Node key={i} node={n} depth={0} />
    ))}
  </div>
);

// ============================================================
// JSONViewer.tsx
// ============================================================
import React from "react";
import { colors, fonts } from "../../styles/tokens";

type Props = {
  data: unknown;
  style?: React.CSSProperties;
};

const renderValue = (value: unknown, indent: number): React.ReactNode => {
  const pad = "  ".repeat(indent);
  if (value === null) {
    return <span style={{ color: colors.purple[400] }}>null</span>;
  }
  if (typeof value === "string") {
    return (
      <span style={{ color: colors.semantic.success }}>{`"${value}"`}</span>
    );
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <span style={{ color: colors.blue[400] }}>{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    return (
      <>
        <span style={{ color: colors.purple[200] }}>[</span>
        {"\n"}
        {value.map((v, i) => (
          <span key={i}>
            {pad}
            {"  "}
            {renderValue(v, indent + 1)}
            {i < value.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}
        <span style={{ color: colors.purple[200] }}>]</span>
      </>
    );
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <>
        <span style={{ color: colors.purple[200] }}>{"{"}</span>
        {"\n"}
        {entries.map(([k, v], i) => (
          <span key={k}>
            {pad}
            {"  "}
            <span style={{ color: colors.purple[400] }}>{`"${k}"`}</span>
            <span style={{ color: colors.purple[300] }}>: </span>
            {renderValue(v, indent + 1)}
            {i < entries.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {pad}
        <span style={{ color: colors.purple[200] }}>{"}"}</span>
      </>
    );
  }
  return null;
};

export const JSONViewer: React.FC<Props> = ({ data, style }) => (
  <pre
    style={{
      fontFamily: fonts.mono,
      fontSize: 16,
      background: colors.navy[900],
      padding: 24,
      borderRadius: 8,
      color: colors.purple[100],
      margin: 0,
      lineHeight: 1.6,
      whiteSpace: "pre",
      ...style,
    }}
  >
    {renderValue(data, 0)}
  </pre>
);

// ============================================================
// CodeTypewriter.tsx
// ============================================================
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

// ============================================================
// CodeDiff.tsx
// ============================================================
import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type DiffLine = {
  type: "add" | "remove" | "context";
  text: string;
};

type Props = {
  lines: DiffLine[];
  style?: React.CSSProperties;
};

export const CodeDiff: React.FC<Props> = ({ lines, style }) => {
  return (
    <pre
      style={{
        background: colors.navy[900],
        border: `1px solid ${withOpacity(colors.blue[400], 0.25)}`,
        borderRadius: 8,
        padding: 0,
        fontFamily: fonts.mono,
        fontSize: 16,
        lineHeight: 1.7,
        color: colors.purple[100],
        margin: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {lines.map((line, i) => {
        const isAdd = line.type === "add";
        const isRemove = line.type === "remove";
        const bg = isAdd
          ? "rgba(52,211,153,0.1)"
          : isRemove
            ? "rgba(248,113,113,0.1)"
            : "transparent";
        const borderColor = isAdd
          ? colors.semantic.success
          : isRemove
            ? colors.semantic.error
            : "transparent";
        const prefix = isAdd ? "+" : isRemove ? "−" : " ";
        return (
          <div
            key={i}
            style={{
              background: bg,
              borderLeft: `3px solid ${borderColor}`,
              padding: "0 24px",
              display: "flex",
              gap: 12,
            }}
          >
            <span
              style={{
                color: isAdd
                  ? colors.semantic.success
                  : isRemove
                    ? colors.semantic.error
                    : colors.purple[300],
                width: 14,
                textAlign: "center",
              }}
            >
              {prefix}
            </span>
            <span>{line.text}</span>
          </div>
        );
      })}
    </pre>
  );
};

// ============================================================
// TerminalWindow.tsx
// ============================================================
import React from "react";
import { colors, fonts, frame, withOpacity } from "../../styles/tokens";

type Props = {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * macOS-style terminal window — three traffic-light dots, title bar,
 * mono content area on `colors.navy[950]`.
 */
export const TerminalWindow: React.FC<Props> = ({
  title = "praut@macbook ~ %",
  children,
  style,
}) => {
  return (
    <div
      style={{
        background: colors.navy[950],
        borderRadius: frame.borderRadius * 3,
        border: `1px solid ${withOpacity(colors.blue[400], 0.25)}`,
        overflow: "hidden",
        fontFamily: fonts.mono,
        ...style,
      }}
    >
      <div
        style={{
          height: 36,
          background: colors.navy[800],
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FF5F56",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#FFBD2E",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#27C93F",
          }}
        />
        <span
          style={{
            marginLeft: 16,
            fontSize: 12,
            color: colors.purple[300],
            fontFamily: fonts.mono,
          }}
        >
          {title}
        </span>
      </div>
      <div
        style={{
          padding: 24,
          color: colors.purple[100],
          fontSize: 18,
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================
// APIRequest.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { CodeBlock } from "./CodeBlock";

type Props = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  requestBody?: string;
  responseBody?: string;
  style?: React.CSSProperties;
};

const methodColor: Record<Props["method"], string> = {
  GET: colors.semantic.success,
  POST: colors.blue[400],
  PUT: colors.semantic.warning,
  DELETE: colors.semantic.error,
  PATCH: colors.purple[400],
};

export const APIRequest: React.FC<Props> = ({
  method,
  url,
  requestBody,
  responseBody,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        background: colors.navy[900],
        borderRadius: 8,
        border: `1px solid ${methodColor[method]}66`,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontWeight: fontWeight.heading,
          color: methodColor[method],
          fontSize: 14,
          letterSpacing: 1.5,
        }}
      >
        {method}
      </span>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 16,
          color: colors.purple[100],
        }}
      >
        {url}
      </span>
    </div>
    {requestBody ? <CodeBlock code={requestBody} language="json" /> : null}
    {responseBody ? (
      <div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.semantic.success,
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >
          200 OK
        </div>
        <CodeBlock code={responseBody} language="json" />
      </div>
    ) : null}
  </div>
);

// ============================================================
// CurlExample.tsx
// ============================================================
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

// ============================================================
// CodeBlock.tsx
// ============================================================
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
