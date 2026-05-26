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

export function getWindowDragWobble(_input: WindowDragWobbleInput): WindowDragWobble {
  return restingWindowWobble;
}
