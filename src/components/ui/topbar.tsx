"use client"

import { useState, useEffect } from "react"
import { Wifi, Battery, Search, Settings, Moon, Cloud } from "lucide-react"

export function Topbar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-1 backdrop-blur-xl font-['Inter']">
      {/* Left side - Apple logo and menu items */}
      <div className="flex items-center space-x-4">
        {/* Apple logo */}
        <img 
          src="/apple-logo.png" 
          alt="Apple" 
          className="w-5 h-5 object-contain invert"
        />
        
        {/* Menu items */}
        <div className="flex items-center space-x-3 text-sm text-white/90 font-medium">
          <button className="hover:text-white transition-colors">Finder</button>
          <button className="hover:text-white transition-colors">File</button>
          <button className="hover:text-white transition-colors">Edit</button>
          <button className="hover:text-white transition-colors">View</button>
          <button className="hover:text-white transition-colors">Go</button>
          <button className="hover:text-white transition-colors">Window</button>
          <button className="hover:text-white transition-colors">Help</button>
        </div>
      </div>

      {/* Right side - System icons and time */}
      <div className="flex items-center space-x-3 text-sm text-white/90 font-medium">
        {/* System icons */}
        <Cloud className="w-4 h-4" />
        <Moon className="w-4 h-4" />
        
        {/* Temperature */}
        <span className="text-xs">10°C</span>
        
        {/* Battery */}
        <div className="flex items-center space-x-1">
          <Battery className="w-4 h-4" />
          <span className="text-xs">100%</span>
        </div>
        
        {/* Wi-Fi */}
        <Wifi className="w-4 h-4" />
        
        {/* Search */}
        <Search className="w-4 h-4" />
        
        {/* Control Center */}
        <Settings className="w-4 h-4" />
        
        {/* Date and Time */}
        <span className="text-xs font-medium">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  )
}
