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
