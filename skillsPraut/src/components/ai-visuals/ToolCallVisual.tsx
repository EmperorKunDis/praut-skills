import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { CodeBlock } from "../code/CodeBlock";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  functionName: string;
  args: Record<string, unknown>;
  result?: string;
  style?: React.CSSProperties;
};

/**
 * LLM tool call visualization — function name, args object, and a result block.
 */
export const ToolCallVisual: React.FC<Props> = ({
  functionName,
  args,
  result,
  style,
}) => (
  <div
    style={{
      background: gradients.card,
      borderRadius: 12,
      padding: 28,
      border: `1px solid ${colors.purple[600]}55`,
      maxWidth: 720,
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <PhosphorIcon
        name="lightning"
        size={28}
        color={colors.semantic.warning}
      />
      <span
        style={{
          fontFamily: fonts.mono,
          fontWeight: fontWeight.bodyEmphasis,
          fontSize: 18,
          color: colors.purple[50],
        }}
      >
        {functionName}()
      </span>
    </div>
    <CodeBlock code={JSON.stringify(args, null, 2)} language="json" />
    {result ? (
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.semantic.success,
            letterSpacing: 1.5,
            marginBottom: 8,
          }}
        >
          RESULT
        </div>
        <CodeBlock code={result} />
      </div>
    ) : null}
  </div>
);
