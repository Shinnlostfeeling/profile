export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface RevealStyleConfig {
  durationMs: number;
  delayMs: number;
  distancePx: number;
  easing: string;
}

export const MOTION_CONFIG = {
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  fastMs: 220,
  baseMs: 520,
  slowMs: 720,
  staggerStepMs: 80,
  defaultDistancePx: 22,
  observerThreshold: 0.14,
  observerRootMargin: "0px 0px -40px 0px",
} as const;

export function getStaggerDelay(index: number, baseDelayMs = 0, stepMs = MOTION_CONFIG.staggerStepMs): number {
  return baseDelayMs + Math.max(0, index) * stepMs;
}

export function getDirectionOffset(
  direction: RevealDirection,
  distancePx: number,
): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: distancePx };
    case "down":
      return { x: 0, y: -distancePx };
    case "left":
      return { x: distancePx, y: 0 };
    case "right":
      return { x: -distancePx, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}