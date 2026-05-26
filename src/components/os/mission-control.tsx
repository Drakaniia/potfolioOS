"use client";

import Image from "next/image";
import { getMacOSApp } from "@/lib/macos-apps";
import { useUIStore } from "@/store/ui-store";
import { useWindowStore } from "@/store/window-store";

export function MissionControl() {
  const exposeApp = useUIStore((state) => state.exposeApp);
  const missionControlOpen = useUIStore((state) => state.missionControlOpen);
  const setExposeApp = useUIStore((state) => state.setExposeApp);
  const setMissionControlOpen = useUIStore((state) => state.setMissionControlOpen);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const openWindows = useWindowStore((state) => state.openWindows);

  const windows = openWindows.filter((window) => !window.minimized && (!exposeApp || window.app === exposeApp));

  if (!missionControlOpen && !exposeApp) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[870] bg-black/35 p-8 pt-16 backdrop-blur-md"
      onClick={() => {
        setMissionControlOpen(false);
        setExposeApp(null);
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
        {windows.map((windowState) => {
          const app = getMacOSApp(windowState.app);

          return (
            <button
              type="button"
              key={windowState.id}
              className="group rounded-[12px] text-left text-white"
              onClick={(event) => {
                event.stopPropagation();
                focusWindow(windowState.id);
                setMissionControlOpen(false);
                setExposeApp(null);
              }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[12px] border border-white/20 bg-[var(--macos-surface)] shadow-2xl transition-transform duration-200 group-hover:-translate-y-1">
                <div className="macos-titlebar flex h-8 items-center px-2">
                  <span className="macos-traffic-light red mr-1.5" />
                  <span className="macos-traffic-light yellow mr-1.5" />
                  <span className="macos-traffic-light green" />
                </div>
                <div className="grid h-[calc(100%-32px)] place-items-center">
                  <Image src={app?.icon ?? "/finder.png"} alt="" aria-hidden="true" width={58} height={58} className="h-14 w-14 object-contain" />
                </div>
              </div>
              <p className="mt-2 truncate text-center text-[13px] font-medium drop-shadow">{windowState.title}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
