import React from "react";
import { MetricCard } from "./MetricCard";

type Item = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  deltaPositive?: boolean;
};

type Props = {
  items: Item[];
  columns?: number;
  style?: React.CSSProperties;
};

export const KPIGrid: React.FC<Props> = ({ items, columns = 3, style }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 24,
      ...style,
    }}
  >
    {items.map((item, i) => (
      <MetricCard key={i} {...item} />
    ))}
  </div>
);
