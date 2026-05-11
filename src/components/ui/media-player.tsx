"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import Image from "next/image"

export function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState({ x: 32, y: 80 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const deltaX = e.clientX - dragStartRef.current.x
      const deltaY = e.clientY - dragStartRef.current.y
      
      // Constrain within viewport
      const maxX = window.innerWidth - 400
      const maxY = window.innerHeight - 200
      
      setPosition({
        x: Math.max(0, Math.min(deltaX, maxX)),
        y: Math.max(0, Math.min(deltaY, maxY))
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    }
  }

  return (
    <div 
      ref={dragRef}
      className="liquid-glass-strong rounded-xl absolute select-none overflow-hidden"
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        width: '400px',
        height: '200px'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Content */}
      <div className="relative z-10 flex h-full">
        {/* Left side - Image with fade */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <Image
            src="/about-you.png"
            alt="Album Cover"
            width={200}
            height={200}
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)'
            }}
          />
        </div>
        
        {/* Right side - Song Info and Controls */}
        <div className="relative w-1/2 flex flex-col justify-between text-white p-6">
          
          {/* Song Info */}
          <div className="relative z-10">
            <h3 className="font-semibold text-sm" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>About You</h3>
            <p className="text-xs opacity-80" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>The 1975</p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2 relative z-10">
            <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden mb-2">
              <div className="w-0 h-full bg-white rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs opacity-80" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif' }}>
              <span>0:00</span>
              <span>3:09</span>
            </div>
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-3 mt-3 relative z-10">
            <button className="p-1 hover:bg-white/20 rounded transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>
            <button className="p-1 hover:bg-white/20 rounded transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
