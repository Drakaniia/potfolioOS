import { describe, expect, test } from "bun:test";
import { getWindowDragWobble } from "./window-wobble";

describe("getWindowDragWobble", () => {
  test("leans gently in the drag direction", () => {
    const wobble = getWindowDragWobble({
      deltaX: 18,
      deltaY: 4,
      elapsedMs: 16,
    });

    expect(Number.parseFloat(wobble.rotate)).toBeGreaterThan(0);
    expect(Number.parseFloat(wobble.rotate)).toBeLessThanOrEqual(2.8);
    expect(Number.parseFloat(wobble.translateX)).toBeGreaterThan(0);
    expect(Number.parseFloat(wobble.scale)).toBeGreaterThan(1);
  });

  test("keeps fast movement within a soft limit", () => {
    const wobble = getWindowDragWobble({
      deltaX: 180,
      deltaY: -120,
      elapsedMs: 8,
    });

    expect(wobble.rotate).toBe("2.8deg");
    expect(wobble.translateX).toBe("4.5px");
    expect(wobble.translateY).toBe("-3.5px");
    expect(wobble.scale).toBe("1.006");
  });

  test("settles without residual transform", () => {
    const wobble = getWindowDragWobble({
      deltaX: 0,
      deltaY: 0,
      elapsedMs: 16,
    });

    expect(wobble).toEqual({
      rotate: "0deg",
      translateX: "0px",
      translateY: "0px",
      scale: "1",
    });
  });
});
