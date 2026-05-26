export type WindowDragWobbleInput = {
  deltaX: number;
  deltaY: number;
  elapsedMs: number;
};

export type WindowDragWobble = {
  rotate: string;
  translateX: string;
  translateY: string;
  scale: string;
};

export const restingWindowWobble: WindowDragWobble = {
  rotate: "0deg",
  translateX: "0px",
  translateY: "0px",
  scale: "1",
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const formatNumber = (value: number, precision: number) => {
  const fixed = value.toFixed(precision);
  return fixed.replace(/\.?0+$/, "");
};

const formatPx = (value: number) => `${formatNumber(value, 2)}px`;
const formatDeg = (value: number) => `${formatNumber(value, 2)}deg`;

export function getWindowDragWobble({ deltaX, deltaY, elapsedMs }: WindowDragWobbleInput): WindowDragWobble {
  if (deltaX === 0 && deltaY === 0) {
    return restingWindowWobble;
  }

  const frameMs = Math.max(16, elapsedMs);
  const velocityX = deltaX / frameMs;
  const velocityY = deltaY / frameMs;
  const movement = Math.hypot(velocityX, velocityY);

  return {
    rotate: formatDeg(clamp(velocityX * 0.7, -2.8, 2.8)),
    translateX: formatPx(clamp(velocityX * 0.4, -4.5, 4.5)),
    translateY: formatPx(clamp(velocityY * 0.47, -3.5, 3.5)),
    scale: formatNumber(1 + clamp(movement * 0.0006, 0, 0.006), 3),
  };
}
