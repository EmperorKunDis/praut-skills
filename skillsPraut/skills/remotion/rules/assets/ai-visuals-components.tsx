// ============================================================
// TransformerBlock.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  style?: React.CSSProperties;
};

/**
 * Diagram of a single transformer block: Multi-Head Attention + Add&Norm
 * + Feed Forward + Add&Norm.
 */
export const TransformerBlock: React.FC<Props> = ({ style }) => {
  const Box: React.FC<{ label: string; color: string; height?: number }> = ({
    label,
    color,
    height = 56,
  }) => (
    <div
      style={{
        background: gradients.card,
        border: `1.5px solid ${color}`,
        borderRadius: 8,
        padding: "0 24px",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.primary,
        fontWeight: fontWeight.bodyEmphasis,
        fontSize: 14,
        color: colors.purple[100],
      }}
    >
      {label}
    </div>
  );
  const Arrow: React.FC = () => (
    <div
      style={{
        width: 2,
        height: 24,
        background: colors.blue[400],
        margin: "0 auto",
      }}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: 320,
        border: `1px dashed ${withOpacity(colors.purple[600], 0.4)}`,
        borderRadius: 12,
        padding: 16,
        background: "rgba(15,20,64,0.4)",
        ...style,
      }}
    >
      <Box label="Input Embedding + Pos" color={colors.blue[400]} />
      <Arrow />
      <Box
        label="Multi-Head Attention"
        color={colors.purple[600]}
        height={64}
      />
      <Arrow />
      <Box label="Add & Norm" color={colors.blue[400]} />
      <Arrow />
      <Box label="Feed Forward" color={colors.purple[600]} height={64} />
      <Arrow />
      <Box label="Add & Norm" color={colors.blue[400]} />
    </div>
  );
};

// ============================================================
// AttentionMatrix.tsx
// ============================================================
import React from "react";
import { HeatmapGrid } from "../charts/HeatmapGrid";

type Props = {
  tokens: string[];
  weights: number[][]; // weights[query][key] in 0..1
  cellSize?: number;
  style?: React.CSSProperties;
};

/**
 * Attention weight matrix between tokens — wraps `<HeatmapGrid />` with
 * the same tokens on rows and cols.
 */
export const AttentionMatrix: React.FC<Props> = ({
  tokens,
  weights,
  cellSize = 56,
  style,
}) => (
  <HeatmapGrid
    rows={tokens}
    cols={tokens}
    values={weights}
    cellSize={cellSize}
    style={style}
  />
);

// ============================================================
// PromptResponse.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { useTypewriter } from "../../hooks/useTypewriter";

type Props = {
  prompt: string;
  response: string;
  style?: React.CSSProperties;
};

/**
 * Chat-style prompt + animated streaming response. Static prompt bubble,
 * typewriter response.
 */
export const PromptResponse: React.FC<Props> = ({
  prompt,
  response,
  style,
}) => {
  const typed = useTypewriter({ fullText: response, charFrames: 1 });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 800,
        ...style,
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          background: gradients.brandPrimary,
          color: colors.purple[50],
          padding: "14px 22px",
          borderRadius: 16,
          borderBottomRightRadius: 4,
          fontFamily: fonts.primary,
          fontSize: 18,
          fontWeight: fontWeight.body,
          maxWidth: "80%",
        }}
      >
        {prompt}
      </div>
      <div
        style={{
          alignSelf: "flex-start",
          background: colors.navy[800],
          border: `1px solid ${colors.blue[400]}33`,
          color: colors.purple[100],
          padding: "14px 22px",
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          fontFamily: fonts.primary,
          fontSize: 18,
          fontWeight: fontWeight.body,
          maxWidth: "80%",
          lineHeight: 1.5,
        }}
      >
        {typed}
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 18,
            background: colors.blue[400],
            marginLeft: 4,
            verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  );
};

// ============================================================
// MoEDiagram.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  expertCount?: number;
  activeExperts?: number[];
  style?: React.CSSProperties;
};

/**
 * Mixture of Experts routing diagram.
 * Active experts highlighted in brand purple.
 */
export const MoEDiagram: React.FC<Props> = ({
  expertCount = 8,
  activeExperts = [2, 5],
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 32,
      ...style,
    }}
  >
    <div
      style={{
        padding: "16px 32px",
        background: gradients.brandPrimary,
        borderRadius: 8,
        fontFamily: fonts.primary,
        fontWeight: fontWeight.heading,
        fontSize: 22,
        color: colors.purple[50],
      }}
    >
      Router
    </div>
    <svg width={600} height={120}>
      {Array.from({ length: expertCount }).map((_, i) => {
        const x = 50 + i * (500 / (expertCount - 1));
        const isActive = activeExperts.includes(i);
        return (
          <line
            key={i}
            x1={300}
            y1={0}
            x2={x}
            y2={100}
            stroke={
              isActive ? colors.purple[600] : withOpacity(colors.blue[400], 0.3)
            }
            strokeWidth={isActive ? 3 : 1}
          />
        );
      })}
    </svg>
    <div style={{ display: "flex", gap: 16 }}>
      {Array.from({ length: expertCount }).map((_, i) => {
        const isActive = activeExperts.includes(i);
        return (
          <div
            key={i}
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              background: isActive ? gradients.brandPrimary : colors.navy[800],
              border: `1px solid ${isActive ? colors.purple[600] : colors.blue[400]}66`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: fonts.mono,
              fontWeight: fontWeight.bodyEmphasis,
              fontSize: 14,
              color: colors.purple[50],
            }}
          >
            E{i + 1}
          </div>
        );
      })}
    </div>
  </div>
);

// ============================================================
// CostCalculator.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  model: string;
  inputTokens: number;
  outputTokens: number;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  style?: React.CSSProperties;
};

/**
 * Live LLM cost breakdown — input × inputPrice + output × outputPrice.
 * Renders both lines plus the total in brand gradient.
 */
export const CostCalculator: React.FC<Props> = ({
  model,
  inputTokens,
  outputTokens,
  inputPricePerMillion,
  outputPricePerMillion,
  style,
}) => {
  const inputCost = (inputTokens / 1_000_000) * inputPricePerMillion;
  const outputCost = (outputTokens / 1_000_000) * outputPricePerMillion;
  const total = inputCost + outputCost;

  const Row: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: fonts.mono,
        fontSize: 14,
        color: colors.purple[200],
        padding: "8px 0",
        borderBottom: `1px solid ${colors.navy[700]}`,
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div
      style={{
        background: gradients.card,
        borderRadius: 12,
        padding: 32,
        width: 480,
        border: `1px solid ${colors.purple[600]}55`,
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.heading,
          fontSize: 22,
          color: colors.purple[50],
          marginBottom: 16,
        }}
      >
        {model}
      </div>
      <Row
        label={`Input  (${inputTokens.toLocaleString("cs-CZ")} tok)`}
        value={`$${inputCost.toFixed(4)}`}
      />
      <Row
        label={`Output (${outputTokens.toLocaleString("cs-CZ")} tok)`}
        value={`$${outputCost.toFixed(4)}`}
      />
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.display,
          fontSize: 36,
          background: gradients.logoText,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "right",
        }}
      >
        ${total.toFixed(4)}
      </div>
    </div>
  );
};

// ============================================================
// TrainingLoss.tsx
// ============================================================
import React from "react";
import { AnimatedLineChart } from "../charts/AnimatedLineChart";

type Props = {
  epochs: number;
  finalLoss?: number;
  startLoss?: number;
  style?: React.CSSProperties;
};

/**
 * Wraps `<AnimatedLineChart />` with a synthetic training loss curve
 * (exponential decay).
 */
export const TrainingLoss: React.FC<Props> = ({
  epochs,
  finalLoss = 0.1,
  startLoss = 2.5,
  style,
}) => {
  const data = Array.from({ length: epochs }).map((_, i) => {
    const t = i / (epochs - 1);
    const loss = finalLoss + (startLoss - finalLoss) * Math.exp(-t * 4);
    return { label: `${i + 1}`, value: loss };
  });
  return <AnimatedLineChart data={data} style={style} />;
};

// ============================================================
// ContextWindow.tsx
// ============================================================
import React from "react";
import { colors, fonts, withOpacity } from "../../styles/tokens";

type Props = {
  tokens: string[];
  windowStart: number;
  windowSize: number;
  style?: React.CSSProperties;
};

/**
 * Visualizes a sliding context window over a token sequence.
 * Tokens inside the window are highlighted in brand purple.
 */
export const ContextWindow: React.FC<Props> = ({
  tokens,
  windowStart,
  windowSize,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      fontFamily: fonts.mono,
      fontSize: 14,
      ...style,
    }}
  >
    {tokens.map((tok, i) => {
      const inWindow = i >= windowStart && i < windowStart + windowSize;
      return (
        <span
          key={i}
          style={{
            background: inWindow
              ? withOpacity(colors.purple[600], 0.4)
              : colors.navy[800],
            color: inWindow ? colors.purple[50] : colors.purple[300],
            padding: "4px 8px",
            borderRadius: 4,
            border: inWindow
              ? `1px solid ${colors.purple[400]}`
              : `1px solid ${colors.navy[700]}`,
          }}
        >
          {tok}
        </span>
      );
    })}
  </div>
);

// ============================================================
// ToolCallVisual.tsx
// ============================================================
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

// ============================================================
// TokenizerView.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  seriesColors,
  withOpacity,
} from "../../styles/tokens";

type Props = {
  tokens: string[];
  style?: React.CSSProperties;
};

/**
 * Visualizes tokenization — each token rendered as a colored chip.
 * Cycles through brand series colors.
 */
export const TokenizerView: React.FC<Props> = ({ tokens, style }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      fontFamily: fonts.mono,
      fontSize: 22,
      ...style,
    }}
  >
    {tokens.map((tok, i) => {
      const color = seriesColors[i % seriesColors.length];
      return (
        <span
          key={i}
          style={{
            background: withOpacity(color, 0.2),
            border: `1px solid ${withOpacity(color, 0.6)}`,
            color: colors.purple[100],
            padding: "6px 12px",
            borderRadius: 6,
            fontWeight: fontWeight.bodyEmphasis,
            whiteSpace: "pre",
          }}
        >
          {tok}
        </span>
      );
    })}
  </div>
);

// ============================================================
// DiffusionSteps.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";

type Props = {
  steps?: number;
  style?: React.CSSProperties;
};

/**
 * Visual representation of diffusion denoising steps. Each step is a square
 * with progressively less noise (uses opacity gradients).
 */
export const DiffusionSteps: React.FC<Props> = ({ steps = 6, style }) => (
  <div
    style={{
      display: "flex",
      gap: 16,
      alignItems: "center",
      ...style,
    }}
  >
    {Array.from({ length: steps }).map((_, i) => {
      const noise = 1 - i / (steps - 1);
      return (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              border: `1px solid ${colors.blue[400]}66`,
              background: `repeating-conic-gradient(${colors.purple[600]}${Math.round(
                noise * 255,
              )
                .toString(16)
                .padStart(2, "0")} 0% 25%, ${colors.navy[800]} 0% 50%)`,
              backgroundSize: `${4 + i * 4}px ${4 + i * 4}px`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[300],
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            t={steps - i}
          </span>
        </div>
      );
    })}
  </div>
);

// ============================================================
// HallucinationDemo.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight } from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  prompt: string;
  correct: string;
  hallucinated: string;
  style?: React.CSSProperties;
};

/**
 * Side-by-side correct vs hallucinated LLM outputs for the same prompt.
 */
export const HallucinationDemo: React.FC<Props> = ({
  prompt,
  correct,
  hallucinated,
  style,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 1200,
      ...style,
    }}
  >
    <div
      style={{
        background: colors.navy[800],
        borderRadius: 8,
        padding: 20,
        fontFamily: fonts.mono,
        fontSize: 16,
        color: colors.purple[100],
      }}
    >
      <span style={{ color: colors.purple[300] }}>Prompt: </span>
      {prompt}
    </div>
    <div style={{ display: "flex", gap: 24 }}>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.success}`,
          borderRadius: 8,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <PhosphorIcon
            name="check-circle"
            size={20}
            color={colors.semantic.success}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.semantic.success,
              letterSpacing: 1.5,
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            SPRÁVNĚ
          </span>
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {correct}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: colors.navy[800],
          borderLeft: `4px solid ${colors.semantic.error}`,
          borderRadius: 8,
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <PhosphorIcon
            name="x-circle"
            size={20}
            color={colors.semantic.error}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.semantic.error,
              letterSpacing: 1.5,
              fontWeight: fontWeight.bodyEmphasis,
            }}
          >
            HALUCINACE
          </span>
        </div>
        <div
          style={{
            fontFamily: fonts.primary,
            fontSize: 18,
            fontWeight: fontWeight.body,
            color: colors.purple[100],
            lineHeight: 1.5,
          }}
        >
          {hallucinated}
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// ModelArchitecture.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Layer = {
  name: string;
  output?: string;
};

type Props = {
  layers: Layer[];
  style?: React.CSSProperties;
};

/**
 * Generic encoder/decoder model architecture box diagram. Each layer is a
 * row with a name and optional output shape.
 */
export const ModelArchitecture: React.FC<Props> = ({ layers, style }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: 480,
      ...style,
    }}
  >
    {layers.map((layer, i) => (
      <div
        key={i}
        style={{
          background: gradients.card,
          border: `1px solid ${colors.blue[400]}55`,
          borderRadius: 8,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: fonts.primary,
            fontWeight: fontWeight.bodyEmphasis,
            fontSize: 18,
            color: colors.purple[50],
          }}
        >
          {layer.name}
        </span>
        {layer.output ? (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: colors.purple[300],
            }}
          >
            {layer.output}
          </span>
        ) : null}
      </div>
    ))}
  </div>
);

// ============================================================
// ParameterCounter.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";
import { CountUpNumber } from "../typography/CountUpNumber";

type Props = {
  models: Array<{ name: string; params: number; unit?: "B" | "M" | "T" }>;
  style?: React.CSSProperties;
};

/**
 * Comparison of model parameter counts (e.g. 7B vs 70B vs 405B).
 * Each model gets a card with animated count-up.
 */
export const ParameterCounter: React.FC<Props> = ({ models, style }) => (
  <div
    style={{
      display: "flex",
      gap: 24,
      alignItems: "flex-end",
      ...style,
    }}
  >
    {models.map((m, i) => (
      <div
        key={i}
        style={{
          background: gradients.card,
          border: `1px solid ${colors.purple[600]}55`,
          borderRadius: 12,
          padding: 32,
          textAlign: "center",
          minWidth: 240,
        }}
      >
        <CountUpNumber to={m.params} suffix={m.unit ?? "B"} fontSize={64} />
        <div
          style={{
            marginTop: 12,
            fontFamily: fonts.primary,
            fontWeight: fontWeight.heading,
            fontSize: 20,
            color: colors.purple[100],
          }}
        >
          {m.name}
        </div>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            color: colors.purple[300],
            letterSpacing: 1,
            marginTop: 4,
          }}
        >
          parameters
        </div>
      </div>
    ))}
  </div>
);

// ============================================================
// TemperatureSlider.tsx
// ============================================================
import React from "react";
import { colors, fonts, fontWeight, gradients } from "../../styles/tokens";

type Props = {
  value: number; // 0..1
  style?: React.CSSProperties;
};

/**
 * Visual slider explaining LLM temperature parameter.
 * 0 = deterministic, 1 = creative.
 */
export const TemperatureSlider: React.FC<Props> = ({ value, style }) => {
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div style={{ maxWidth: 720, ...style }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: fonts.mono,
          fontSize: 12,
          color: colors.purple[300],
          marginBottom: 8,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        <span>Deterministický</span>
        <span style={{ color: colors.purple[100] }}>
          Temperature: {clamped.toFixed(2)}
        </span>
        <span>Kreativní</span>
      </div>
      <div
        style={{
          height: 12,
          borderRadius: 6,
          background: gradients.brandWide,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -6,
            left: `${clamped * 100}%`,
            transform: "translateX(-50%)",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: colors.purple[50],
            border: `3px solid ${colors.purple[600]}`,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: fonts.primary,
          fontWeight: fontWeight.body,
          fontSize: 16,
          color: colors.purple[200],
          textAlign: "center",
        }}
      >
        {clamped < 0.3
          ? "Stejný vstup → vždy stejný výstup"
          : clamped > 0.7
            ? "Vysoká variabilita, riziko halucinací"
            : "Vyvážený poměr přesnosti a kreativity"}
      </div>
    </div>
  );
};

// ============================================================
// EmbeddingSpace.tsx
// ============================================================
import React from "react";
import { ScatterPlot } from "../charts/ScatterPlot";

type Embedding = {
  label: string;
  x: number;
  y: number;
  highlight?: boolean;
};

type Props = {
  embeddings: Embedding[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

/**
 * 2D embedding scatter — wraps `<ScatterPlot />` with the classic
 * king/queen/man/woman demo style.
 */
export const EmbeddingSpace: React.FC<Props> = ({
  embeddings,
  width = 1100,
  height = 600,
  style,
}) => (
  <ScatterPlot
    points={embeddings}
    width={width}
    height={height}
    xLabel="dim 1"
    yLabel="dim 2"
    style={style}
  />
);

// ============================================================
// RAGPipeline.tsx
// ============================================================
import React from "react";
import {
  colors,
  fonts,
  fontWeight,
  gradients,
  glow,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  style?: React.CSSProperties;
};

/**
 * RAG pipeline: Query → Vector DB → Context → LLM → Answer.
 * Each step has a distinct icon color so the flow reads naturally:
 *   user (light) → db (blue) → context (blue) → LLM (purple, highlighted) → answer (green)
 */
export const RAGPipeline: React.FC<Props> = ({ style }) => {
  const Step: React.FC<{
    icon: string;
    label: string;
    iconColor: string;
    highlight?: boolean;
  }> = ({ icon, label, iconColor, highlight }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: highlight ? gradients.brandPrimary : gradients.card,
        border: highlight ? "none" : `1px solid ${colors.blue[400]}66`,
        borderRadius: 12,
        padding: 24,
        minWidth: 160,
        boxShadow: highlight ? glow.cta : undefined,
      }}
    >
      <PhosphorIcon name={icon} weight="bold" size={56} color={iconColor} />
      <span
        style={{
          fontFamily: fonts.primary,
          fontWeight: fontWeight.bodyEmphasis,
          fontSize: 16,
          color: colors.purple[50],
        }}
      >
        {label}
      </span>
    </div>
  );

  const Arrow: React.FC = () => (
    <PhosphorIcon
      name="arrow-right"
      weight="bold"
      size={32}
      color={colors.purple[200]}
    />
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        ...style,
      }}
    >
      <Step icon="user" label="Query" iconColor="#60A5FA" />
      <Arrow />
      <Step icon="database" label="Vector DB" iconColor="#A78BFA" />
      <Arrow />
      <Step icon="files" label="Context" iconColor="#34D399" />
      <Arrow />
      <Step icon="brain" label="LLM" iconColor="#FBBF24" highlight />
      <Arrow />
      <Step icon="chat-circle-text" label="Answer" iconColor="#60A5FA" />
    </div>
  );
};

// ============================================================
// NeuralNetwork.tsx
// ============================================================
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, glow, springs } from "../../styles/tokens";

type Props = {
  layers: number[];
  width?: number;
  height?: number;
  style?: React.CSSProperties;
};

/**
 * Animated feedforward neural network — neurons activate layer by layer
 * with `springs.snappy`, synapses fade in over time.
 */
export const NeuralNetwork: React.FC<Props> = ({
  layers,
  width = 1200,
  height = 600,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layerSpacing = width / (layers.length + 1);

  return (
    <svg width={width} height={height} style={style}>
      {layers.slice(0, -1).map((count, layerIdx) => {
        const nextCount = layers[layerIdx + 1];
        const x1 = layerSpacing * (layerIdx + 1);
        const x2 = layerSpacing * (layerIdx + 2);
        const ySpacing1 = height / (count + 1);
        const ySpacing2 = height / (nextCount + 1);

        return Array.from({ length: count }).flatMap((_, i) =>
          Array.from({ length: nextCount }).map((__, j) => {
            const localFrame = frame - layerIdx * 8;
            const opacity = interpolate(localFrame, [0, 30], [0, 0.4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <line
                key={`${layerIdx}-${i}-${j}`}
                x1={x1}
                y1={ySpacing1 * (i + 1)}
                x2={x2}
                y2={ySpacing2 * (j + 1)}
                stroke={colors.blue[400]}
                strokeWidth={1}
                opacity={opacity}
              />
            );
          }),
        );
      })}

      {layers.map((count, layerIdx) => {
        const x = layerSpacing * (layerIdx + 1);
        const ySpacing = height / (count + 1);
        return Array.from({ length: count }).map((_, i) => {
          const localFrame = frame - layerIdx * 8 - i * 2;
          const activation = spring({
            frame: localFrame,
            fps,
            config: springs.snappy,
          });
          return (
            <circle
              key={`n-${layerIdx}-${i}`}
              cx={x}
              cy={ySpacing * (i + 1)}
              r={18}
              fill={colors.navy[700]}
              stroke={colors.purple[600]}
              strokeWidth={2 * activation}
              filter={
                activation > 0.5 ? `drop-shadow(${glow.subtle})` : undefined
              }
            />
          );
        });
      })}
    </svg>
  );
};

// ============================================================
// AgentLoop.tsx
// ============================================================
import React from "react";
import { useCurrentFrame } from "remotion";
import {
  colors,
  fonts,
  fontWeight,
  glow,
  gradients,
} from "../../styles/tokens";
import { PhosphorIcon } from "../icons/PhosphorIcon";

type Props = {
  style?: React.CSSProperties;
};

const STEPS = [
  { label: "Think", icon: "brain" },
  { label: "Act", icon: "play-circle" },
  { label: "Observe", icon: "eye" },
];

/**
 * Animated Think → Act → Observe agent loop. Active step rotates over time.
 */
export const AgentLoop: React.FC<Props> = ({ style }) => {
  const frame = useCurrentFrame();
  const activeStep = Math.floor((frame / 30) % STEPS.length);

  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        ...style,
      }}
    >
      {STEPS.map((step, i) => {
        const isActive = i === activeStep;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                background: isActive ? gradients.brandPrimary : gradients.card,
                border: `2px solid ${
                  isActive ? "transparent" : colors.blue[400]
                }`,
                borderRadius: 12,
                padding: "20px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                boxShadow: isActive ? glow.cta : undefined,
                minWidth: 160,
              }}
            >
              <PhosphorIcon
                name={step.icon}
                size={36}
                color={isActive ? colors.purple[50] : colors.purple[400]}
              />
              <span
                style={{
                  fontFamily: fonts.primary,
                  fontWeight: fontWeight.heading,
                  fontSize: 20,
                  color: colors.purple[50],
                }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <PhosphorIcon
                name="arrow-right"
                weight="bold"
                size={32}
                color={colors.blue[400]}
              />
            ) : (
              <PhosphorIcon
                name="arrows-clockwise"
                weight="bold"
                size={32}
                color={colors.blue[400]}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
