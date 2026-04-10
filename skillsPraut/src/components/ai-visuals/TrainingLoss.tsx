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
