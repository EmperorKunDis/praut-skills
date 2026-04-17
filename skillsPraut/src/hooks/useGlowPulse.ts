import { useCurrentFrame } from "remotion";

type GlowPulseConfig = {
  baseIntensity?: number;
  peakIntensity?: number;
  pulseFrames?: number;
  startFrame?: number;
};

export const useGlowPulse = (opts: GlowPulseConfig = {}): number => {
  const frame = useCurrentFrame();
  const {
    baseIntensity = 0.3,
    peakIntensity = 0.8,
    pulseFrames = 60,
    startFrame = 0,
  } = opts;
  const phase = ((frame - startFrame) % pulseFrames) / pulseFrames;
  const sinValue = Math.sin(phase * 2 * Math.PI);
  const normalized = (sinValue + 1) / 2;
  return baseIntensity + (peakIntensity - baseIntensity) * normalized;
};
