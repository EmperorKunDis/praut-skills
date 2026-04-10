import React from "react";
import { Sequence } from "remotion";
import { timing } from "../../styles/tokens";
import { TopTenCard } from "./TopTenCard";

type Item = {
  title: string;
  description?: string;
};

type Props = {
  items: Item[]; // 10 items, index 0 = #10, index 9 = #1
  revealFrames?: number;
};

/**
 * Counts down from #10 to #1, revealing one card per `revealFrames` frames.
 * Final card is highlighted as the winner.
 */
export const TopTenReveal: React.FC<Props> = ({
  items,
  revealFrames = timing.slow,
}) => {
  const total = items.length;
  return (
    <>
      {items.map((item, i) => {
        const rank = total - i;
        const isWinner = rank === 1;
        return (
          <Sequence
            key={i}
            from={i * revealFrames}
            durationInFrames={revealFrames * (total - i)}
          >
            <TopTenCard
              rank={rank}
              title={item.title}
              description={item.description}
              isWinner={isWinner}
            />
          </Sequence>
        );
      })}
    </>
  );
};
