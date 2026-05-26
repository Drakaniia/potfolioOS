"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Battery, BatteryCharging, Cloud, Moon, Search, SlidersHorizontal, Wifi, WifiOff } from "lucide-react";
import { getMacOSApp } from "@/lib/macos-apps";
import { useNotificationStore } from "@/store/notification-store";
import { useSystemStore } from "@/store/system-store";
import { useUIStore } from "@/store/ui-store";
import { useWindowStore } from "@/store/window-store";

const staticMenuItems = ["File", "Edit", "View", "Go", "Window", "Help"];
const finderActions = ["About Portfolio OS", "Preferences", "Empty Trash"];

export function Topbar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const focusedWindowId = useWindowStore((state) => state.focusedWindowId);
  const openWindows = useWindowStore((state) => state.openWindows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const minimizeFocusedWindow = useWindowStore((state) => state.minimizeFocusedWindow);
  const closeFocusedWindow = useWindowStore((state) => state.closeFocusedWindow);
  const openSpotlight = useUIStore((state) => state.openSpotlight);
  const toggleControlCenter = useUIStore((state) => state.toggleControlCenter);
  const toggleNotificationCenter = useUIStore((state) => state.toggleNotificationCenter);
  const pushNotification = useNotificationStore((state) => state.pushNotification);
  const battery = useSystemStore((state) => state.battery);
  const setTheme = useSystemStore((state) => state.setTheme);
  const theme = useSystemStore((state) => state.theme);
  const wifi = useSystemStore((state) => state.wifi);

  const focusedWindow = openWindows.find((window) => window.id === focusedWindowId);
  const activeApp = focusedWindow ? getMacOSApp(focusedWindow.app) : getMacOSApp("finder");
  const menuItems = [activeApp?.name ?? "Finder", ...staticMenuItems];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleMenuAction = (action: string) => {
    setActiveMenu(null);

    if (action === "Preferences") {
      openWindow("settings");
      return;
    }

    if (action === "New Window") {
      openWindow(focusedWindow?.app ?? "finder", { reuse: false });
      return;
    }

    if (action === "Minimize") {
      minimizeFocusedWindow();
      return;
    }

    if (action === "Close") {
      closeFocusedWindow();
      return;
    }

    if (action === "About Portfolio OS") {
      openWindow("notes");
      return;
    }

    if (action === "Empty Trash") {
      pushNotification({
        app: "Finder",
        title: "Trash is empty",
        body: "There were no items to delete.",
        icon: "/finder.png",
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className="macos-menu-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-3 text-[13px] font-medium"
    >
      <div className="flex min-w-0 items-center gap-2">
        <Image
          src="/apple-logo.png"
          alt="Apple"
          width={16}
          height={16}
          className="h-4 w-4 shrink-0 object-contain dark:invert"
        />

        <div className="flex min-w-0 items-center gap-1 overflow-hidden">
          {menuItems.map((item) => (
            <div className="relative" key={item}>
              <button
                type="button"
                className="macos-menu-item px-2 py-0.5"
                data-active={activeMenu === item}
                onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                onMouseEnter={() => activeMenu && setActiveMenu(item)}
              >
                {item}
              </button>

              {activeMenu === item ? (
                <div className="macos-menu-dropdown absolute left-0 top-[26px] w-48 p-1 text-[13px]">
                  {(item === menuItems[0] ? finderActions : ["New Window", "Minimize", "Close"]).map((action) => (
                    <button
                      type="button"
                      className="macos-menu-item flex w-full items-center justify-between px-3 py-1.5 text-left"
                      key={action}
                      onClick={() => handleMenuAction(action)}
                    >
                      <span>{action}</span>
                      {action === "Preferences" ? (
                        <span className="font-mono text-[11px] opacity-60">⌘,</span>
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <button type="button" className="macos-icon-button p-1" aria-label="Weather">
          <Cloud className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="macos-icon-button p-1"
          aria-label="Toggle appearance"
          onClick={toggleTheme}
        >
          <Moon className="h-4 w-4" />
        </button>
        <span className="hidden text-[12px] text-[var(--macos-text-secondary)] sm:inline">10 C</span>
        <div className="hidden items-center gap-1 sm:flex">
          {battery.charging ? <BatteryCharging className="h-4 w-4" /> : <Battery className="h-4 w-4" />}
          <span className="text-[12px]">{battery.percent}%</span>
        </div>
        {wifi.enabled ? <Wifi className="hidden h-4 w-4 sm:block" /> : <WifiOff className="hidden h-4 w-4 sm:block" />}
        <button
          type="button"
          className="macos-icon-button p-1"
          aria-label="Open Spotlight"
          onClick={() => openSpotlight()}
        >
          <Search className="h-4 w-4" />
        </button>
        <button type="button" className="macos-icon-button p-1" aria-label="Control Center" onClick={toggleControlCenter}>
          <SlidersHorizontal className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="macos-menu-item whitespace-nowrap px-2 py-0.5 text-[12px]"
          onClick={toggleNotificationCenter}
        >
          {formatTime(currentTime)}
        </button>
      </div>
    </header>
  );
}
