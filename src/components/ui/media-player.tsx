"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: 32, y: 76 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      const rect = dragRef.current?.getBoundingClientRect();
      const width = rect?.width ?? 420;
      const height = rect?.height ?? 234;
      const nextX = event.clientX - dragStartRef.current.x;
      const nextY = event.clientY - dragStartRef.current.y;
      const maxX = Math.max(0, window.innerWidth - width - 12);
      const maxY = Math.max(0, window.innerHeight - height - 86);

      setPosition({
        x: Math.max(12, Math.min(nextX, maxX)),
        y: Math.max(40, Math.min(nextY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  return (
    <div
      ref={dragRef}
      className="macos-window macos-window-enter absolute select-none overflow-hidden text-[var(--macos-text)]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 30,
        width: "min(420px, calc(100vw - 24px))",
      }}
    >
      <div
        className="macos-titlebar flex cursor-grab items-center justify-between px-3 active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="macos-traffic-light red" />
          <span className="macos-traffic-light yellow" />
          <span className="macos-traffic-light green" />
        </div>
        <span className="text-[12px] font-medium text-[var(--macos-text-secondary)]">Now Playing</span>
        <span className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="relative z-10 grid min-h-[190px] grid-cols-[46%_54%]">
        <div className="relative overflow-hidden">
          <Image
            src="/about-you.png"
            alt="About You album artwork"
            width={220}
            height={220}
            className="h-full w-full object-cover"
            style={{
              maskImage: "linear-gradient(to right, black 64%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 64%, transparent 100%)",
            }}
          />
        </div>

        <div className="flex flex-col justify-between p-5">
          <div>
            <h3 className="text-[15px] font-semibold leading-tight">About You</h3>
            <p className="mt-0.5 text-[12px] text-[var(--macos-text-secondary)]">The 1975</p>
          </div>

          <div className="space-y-2">
            <div className="h-1 overflow-hidden rounded-full bg-black/15 dark:bg-white/15">
              <div className="h-full w-[38%] rounded-full bg-[var(--macos-accent)]" />
            </div>
            <div className="flex justify-between font-mono text-[11px] text-[var(--macos-text-secondary)]">
              <span>1:10</span>
              <span>3:09</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button type="button" className="macos-icon-button p-1.5" aria-label="Previous track">
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="macos-button grid h-9 w-9 place-items-center rounded-[var(--macos-radius-button)]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
            <button type="button" className="macos-icon-button p-1.5" aria-label="Next track">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
