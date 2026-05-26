"use client";

import { useEffect, useRef, useState } from "react";

export function TimeWidget() {
  const [time, setTime] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 500, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      const rect = dragRef.current?.getBoundingClientRect();
      const width = rect?.width ?? 210;
      const height = rect?.height ?? 150;
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

  if (!mounted) {
    return null;
  }

  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = time.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div
      ref={dragRef}
      className="macos-widget macos-window-enter absolute select-none overflow-hidden p-5 text-center text-[var(--macos-text)]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 25,
        width: "min(220px, calc(100vw - 24px))",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="text-[13px] font-medium text-[var(--macos-text-secondary)]">{dayName}</div>
      <div className="mt-1 text-[12px] text-[var(--macos-text-secondary)]">{monthDay}</div>
      <div className="mt-3 font-mono text-[42px] font-semibold leading-none tabular-nums">
        {hours}:{minutes}
      </div>
    </div>
  );
}
