"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Bluetooth, ChevronRight, Moon, SlidersHorizontal, Sun, Volume2, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSystemStore, type FocusMode } from "@/store/system-store";
import { useUIStore } from "@/store/ui-store";

function ControlTile({
  active,
  children,
  label,
  onClick,
  onExpand,
}: {
  active?: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
  onExpand?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[12px] bg-white/55 p-3 text-[13px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.06)] dark:bg-white/10",
        active && "bg-[color-mix(in_srgb,var(--macos-accent)_18%,white)] dark:bg-[color-mix(in_srgb,var(--macos-accent)_22%,black)]",
      )}
    >
      <button
        type="button"
        className={cn(
          "grid h-8 w-8 place-items-center rounded-full bg-black/8 text-[var(--macos-text)] dark:bg-white/12",
          active && "bg-[var(--macos-accent)] text-white",
        )}
        onClick={onClick}
        aria-label={label}
      >
        {children}
      </button>
      <button type="button" className="min-w-0 flex-1 text-left" onClick={onClick}>
        <span className="block font-semibold">{label}</span>
      </button>
      {onExpand ? (
        <button type="button" className="macos-icon-button p-1" aria-label={`Expand ${label}`} onClick={onExpand}>
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

export function ControlCenter() {
  const [expanded, setExpanded] = useState<"wifi" | "focus" | null>(null);
  const closeControlCenter = useUIStore((state) => state.closeControlCenter);
  const open = useUIStore((state) => state.controlCenterOpen);
  const {
    bluetooth,
    brightness,
    focusMode,
    setBluetooth,
    setBrightness,
    setFocusMode,
    setVolume,
    setWifi,
    volume,
    wifi,
  } = useSystemStore();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[820]" onClick={closeControlCenter}>
      <aside
        className="macos-menu-dropdown macos-window-enter fixed right-3 top-9 w-[min(360px,calc(100vw-24px))] rounded-[var(--macos-radius-dialog)] p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="grid gap-2">
          <ControlTile
            active={wifi.enabled}
            label={wifi.enabled ? wifi.networkName : "Wi-Fi Off"}
            onClick={() => setWifi(!wifi.enabled)}
            onExpand={() => setExpanded(expanded === "wifi" ? null : "wifi")}
          >
            {wifi.enabled ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          </ControlTile>

          {expanded === "wifi" ? (
            <div className="rounded-[10px] bg-white/45 p-2 text-[13px] dark:bg-white/10">
              {["Portfolio Wi-Fi", "Studio Network", "Guest"].map((network) => (
                <button
                  type="button"
                  key={network}
                  className="macos-menu-item flex w-full items-center justify-between px-3 py-2 text-left"
                  onClick={() => setWifi(true, network)}
                >
                  {network}
                  {wifi.networkName === network && wifi.enabled ? <span className="h-2 w-2 rounded-full bg-[var(--macos-accent)]" /> : null}
                </button>
              ))}
            </div>
          ) : null}

          <ControlTile active={bluetooth} label="Bluetooth" onClick={() => setBluetooth(!bluetooth)}>
            <Bluetooth className="h-4 w-4" />
          </ControlTile>

          <ControlTile
            active={focusMode !== "off"}
            label={focusMode === "off" ? "Focus" : `Focus: ${focusMode}`}
            onClick={() => setFocusMode(focusMode === "off" ? "dnd" : "off")}
            onExpand={() => setExpanded(expanded === "focus" ? null : "focus")}
          >
            <Moon className="h-4 w-4" />
          </ControlTile>

          {expanded === "focus" ? (
            <div className="grid grid-cols-2 gap-2 rounded-[10px] bg-white/45 p-2 dark:bg-white/10">
              {(["off", "dnd", "work", "personal", "sleep"] as FocusMode[]).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={cn(
                    "rounded-[6px] px-3 py-2 text-[12px] capitalize",
                    focusMode === mode ? "bg-[var(--macos-accent)] text-white" : "bg-black/5 dark:bg-white/10",
                  )}
                  onClick={() => setFocusMode(mode)}
                >
                  {mode === "dnd" ? "DND" : mode}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-3 grid gap-3 rounded-[12px] bg-white/55 p-3 dark:bg-white/10">
          <label className="grid gap-2 text-[13px]">
            <span className="flex items-center gap-2 font-semibold">
              <Sun className="h-4 w-4" />
              Display
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={brightness}
              onChange={(event) => setBrightness(Number(event.currentTarget.value))}
            />
          </label>
          <label className="grid gap-2 text-[13px]">
            <span className="flex items-center gap-2 font-semibold">
              <Volume2 className="h-4 w-4" />
              Sound
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(event) => setVolume(Number(event.currentTarget.value))}
            />
          </label>
        </div>

        <button type="button" className="macos-menu-item mt-3 flex w-full items-center gap-2 px-3 py-2 text-[13px]">
          <SlidersHorizontal className="h-4 w-4" />
          Control Center Settings
        </button>
      </aside>
    </div>
  );
}
