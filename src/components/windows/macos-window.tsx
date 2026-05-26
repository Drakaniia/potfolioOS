"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import type { OpenWindow } from "@/store/window-store";
import { useWindowStore } from "@/store/window-store";

type MacOSWindowProps = {
  windowState: OpenWindow;
  children: ReactNode;
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

  if (windowState.minimized) {
    return null;
  }

  return (
    <Rnd
      bounds="parent"
      className="pointer-events-auto"
      dragHandleClassName={titlebarClassName}
      disableDragging={windowState.maximized}
      enableResizing={!windowState.maximized}
      minHeight={280}
      minWidth={360}
      position={position}
      size={size}
      style={{ zIndex: windowState.zIndex }}
      onMouseDown={() => focusWindow(windowState.id)}
      onDragStart={() => focusWindow(windowState.id)}
      onDragStop={(_, data) => {
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
      <section
        className="macos-window macos-window-enter flex h-full flex-col overflow-hidden text-[var(--macos-text)]"
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
    </Rnd>
  );
}
