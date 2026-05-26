export type WindowAnimationSource = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowVacuumGeometry = {
  translateX: string;
  translateY: string;
  scaleX: string;
  scaleY: string;
};

const formatNumber = (value: number, precision = 3) => {
  const fixed = value.toFixed(precision);
  return fixed.replace(/\.?0+$/, "");
};

const formatPx = (value: number) => `${formatNumber(value, 2)}px`;

export function getWindowVacuumGeometry(
  source: WindowAnimationSource,
  windowRect: WindowAnimationSource,
): WindowVacuumGeometry {
  const sourceCenterX = source.x + source.width / 2;
  const sourceCenterY = source.y + source.height / 2;
  const windowCenterX = windowRect.x + windowRect.width / 2;
  const windowCenterY = windowRect.y + windowRect.height / 2;

  return {
    translateX: formatPx(sourceCenterX - windowCenterX),
    translateY: formatPx(sourceCenterY - windowCenterY),
    scaleX: formatNumber(Math.max(source.width / windowRect.width, 0.035)),
    scaleY: formatNumber(Math.max(source.height / windowRect.height, 0.035)),
  };
}
