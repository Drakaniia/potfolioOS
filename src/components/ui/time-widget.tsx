"use client";

import { useState, useEffect, useRef } from "react";

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
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      
      // Constrain within viewport
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 140;
      
      setPosition({
        x: Math.max(0, Math.min(deltaX, maxX)),
        y: Math.max(0, Math.min(deltaY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  if (!mounted) {
    return null;
  }

  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div 
      ref={dragRef}
      className="liquid-glass-strong rounded-2xl absolute select-none overflow-hidden p-6"
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        width: '200px',
        height: '140px'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="text-center">
        <div className="text-white/70 text-sm font-medium mb-2 tracking-wide">
          {dayName}
        </div>
        <div className="text-white text-4xl font-bold tracking-tight leading-none">
          <span className="inline-block" style={{ textShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1)" }}>
            {hours}:{minutes}
          </span>
        </div>
      </div>
    </div>
  );
}
