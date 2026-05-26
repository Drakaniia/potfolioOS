"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { getWindowDragWobble, restingWindowWobble, type WindowDragWobble } from "@/lib/window-wobble";
import { getWindowVacuumGeometry, type WindowAnimationSource } from "@/lib/window-transition";
import type { OpenWindow } from "@/store/window-store";
import { useWindowStore } from "@/store/window-store";

type MacOSWindowProps = {
  windowState: OpenWindow;
  children: ReactNode;
};

type WindowWobbleStyle = CSSProperties & {
  "--window-wobble-rotate": string;
  "--window-wobble-x": string;
  "--window-wobble-y": string;
  "--window-wobble-scale": string;
  "--window-vacuum-x": string;
  "--window-vacuum-y": string;
  "--window-vacuum-scale-x": string;
  "--window-vacuum-scale-y": string;
};

const WINDOW_MANAGER_TOP_OFFSET = 28;

const rectToAnimationSource = (rect: DOMRect): WindowAnimationSource => ({
  x: rect.left,
  y: rect.top,
  width: rect.width,
  height: rect.height,
});

const getDockAnimationSource = (app: OpenWindow["app"]): WindowAnimationSource | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const dockIcon = document.querySelector<HTMLElement>(`[data-dock-app="${app}"]`);
  const rect = dockIcon?.getBoundingClientRect();

  return rect ? rectToAnimationSource(rect) : undefined;
};

const getFallbackDockSource = (): WindowAnimationSource | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const size = 56;

  return {
    x: window.innerWidth / 2 - size / 2,
    y: window.innerHeight - 72,
    width: size,
    height: size,
  };
};

const useViewportSize = () => {
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return viewport;
};

export function MacOSWindow({ windowState, children }: MacOSWindowProps) {
  const viewport = useViewportSize();
  const dragSampleTimeRef = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [windowWobble, setWindowWobble] = useState<WindowDragWobble>(restingWindowWobble);
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
  } = useWindowStore();

  const titlebarClassName = useMemo(
    () => `macos-window-titlebar-${windowState.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
    [windowState.id],
  );

  const maximizedSize = {
    width: Math.max(320, viewport.width - 16),
    height: Math.max(280, viewport.height - 124),
  };

  const position = windowState.maximized ? { x: 8, y: 8 } : windowState.position;
  const size = windowState.maximized ? maximizedSize : windowState.size;
  const transitionPhase = windowState.transitionState?.phase;
  const activeAnimationSource = transitionPhase
    ? getDockAnimationSource(windowState.app) ?? windowState.animationSource ?? getFallbackDockSource()
    : windowState.animationSource;
  const windowViewportRect = {
    x: position.x,
    y: WINDOW_MANAGER_TOP_OFFSET + position.y,
    width: size.width,
    height: size.height,
  };
  const vacuumGeometry = activeAnimationSource
    ? getWindowVacuumGeometry(activeAnimationSource, windowViewportRect)
    : null;
  const windowTransitionClassName = transitionPhase
    ? transitionPhase === "minimizing"
      ? "macos-window-vacuum-minimize"
      : "macos-window-vacuum-close"
    : activeAnimationSource
      ? "macos-window-vacuum-open"
      : "macos-window-enter";

  const wobbleStyle: WindowWobbleStyle = {
    "--window-wobble-rotate": windowWobble.rotate,
    "--window-wobble-x": windowWobble.translateX,
    "--window-wobble-y": windowWobble.translateY,
    "--window-wobble-scale": windowWobble.scale,
    "--window-vacuum-x": vacuumGeometry?.translateX ?? "0px",
    "--window-vacuum-y": vacuumGeometry?.translateY ?? "0px",
    "--window-vacuum-scale-x": vacuumGeometry?.scaleX ?? "0.86",
    "--window-vacuum-scale-y": vacuumGeometry?.scaleY ?? "0.86",
  };

  if (windowState.minimized && !transitionPhase) {
    return null;
  }

  return (
    <Rnd
      bounds="parent"
      className="pointer-events-auto"
      dragHandleClassName={titlebarClassName}
      disableDragging={windowState.maximized || Boolean(transitionPhase)}
      enableResizing={!windowState.maximized && !transitionPhase}
      minHeight={280}
      minWidth={360}
      position={position}
      size={size}
      style={{ zIndex: windowState.zIndex }}
      onMouseDown={() => {
        if (!transitionPhase) {
          focusWindow(windowState.id);
        }
      }}
      onDragStart={() => {
        focusWindow(windowState.id);
        dragSampleTimeRef.current = performance.now();
        setDragging(true);
        setWindowWobble(restingWindowWobble);
      }}
      onDrag={(_, data) => {
        const now = performance.now();
        const elapsedMs = dragSampleTimeRef.current === null ? 16 : now - dragSampleTimeRef.current;
        dragSampleTimeRef.current = now;

        setWindowWobble(
          getWindowDragWobble({
            deltaX: data.deltaX,
            deltaY: data.deltaY,
            elapsedMs,
          }),
        );
      }}
      onDragStop={(_, data) => {
        dragSampleTimeRef.current = null;
        setDragging(false);
        setWindowWobble(restingWindowWobble);
        moveWindow(windowState.id, { x: data.x, y: data.y });
      }}
      onResizeStart={() => focusWindow(windowState.id)}
      onResizeStop={(_, __, ref, ___, nextPosition) => {
        resizeWindow(
          windowState.id,
          {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          },
          nextPosition,
        );
      }}
    >
      <div
        className={`macos-window-wobble-frame ${
          dragging ? "macos-window-dragging" : "macos-window-settling"
        } h-full`}
        style={wobbleStyle}
      >
        <section
          className={`macos-window macos-window-vacuum ${windowTransitionClassName} flex h-full flex-col overflow-hidden text-[var(--macos-text)]`}
          aria-label={windowState.title}
        >
          <div
            className={`macos-titlebar ${titlebarClassName} flex h-11 cursor-grab items-center justify-between px-3 active:cursor-grabbing`}
          >
            <div className="group flex items-center gap-2">
              <button
                type="button"
                className="macos-traffic-light red grid place-items-center text-[9px] font-semibold leading-none text-black/55"
                aria-label={`Close ${windowState.title}`}
                onClick={() => closeWindow(windowState.id)}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">x</span>
              </button>
              <button
                type="button"
                className="macos-traffic-light yellow grid place-items-center text-[10px] font-semibold leading-none text-black/55"
                aria-label={`Minimize ${windowState.title}`}
                onClick={() => minimizeWindow(windowState.id)}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">-</span>
              </button>
              <button
                type="button"
                className="macos-traffic-light green grid place-items-center text-[9px] font-semibold leading-none text-black/55"
                aria-label={`${windowState.maximized ? "Restore" : "Maximize"} ${windowState.title}`}
                onClick={() => maximizeWindow(windowState.id)}
              >
                <span className="opacity-0 transition-opacity group-hover:opacity-100">+</span>
              </button>
            </div>

            <h2 className="pointer-events-none truncate text-[13px] font-semibold text-[var(--macos-text-secondary)]">
              {windowState.title}
            </h2>
            <div className="w-[52px]" aria-hidden="true" />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
        </section>
      </div>
    </Rnd>
  );
}
