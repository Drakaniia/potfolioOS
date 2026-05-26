"use client";

import { useCallback, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { desktopApps, dockApps, getMacOSApp } from "@/lib/macos-apps";
import { ControlCenter } from "@/components/control-center/control-center";
import { DesktopIcon } from "@/components/desktop/desktop-icon";
import { NotificationBanners } from "@/components/notifications/notification-banners";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { ContextMenu, type ContextMenuState } from "@/components/os/context-menu";
import { KeyboardShortcuts } from "@/components/os/keyboard-shortcuts";
import { MissionControl } from "@/components/os/mission-control";
import { SystemEffects } from "@/components/os/system-effects";
import { Spotlight } from "@/components/spotlight/spotlight";
import { BootOverlay } from "@/components/ui/boot-overlay";
import { Dock, DockIcon } from "@/components/ui/dock";
import { TimeWidget } from "@/components/ui/time-widget";
import { Topbar } from "@/components/ui/topbar";
import { WindowManager } from "@/components/windows/window-manager";
import { useNotificationStore } from "@/store/notification-store";
import { useWindowStore, type WindowAppId } from "@/store/window-store";

export function PortfolioDesktop() {
  const [selectedDesktopApp, setSelectedDesktopApp] = useState<WindowAppId | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(null);
  const [launchingApp, setLaunchingApp] = useState<WindowAppId | null>(null);
  const openWindow = useWindowStore((state) => state.openWindow);
  const openWindows = useWindowStore((state) => state.openWindows);
  const pushNotification = useNotificationStore((state) => state.pushNotification);

  const openApp = useCallback(
    (app: WindowAppId, source: "desktop" | "dock" | "menu" = "desktop") => {
      openWindow(app);
      setSelectedDesktopApp(app);

      if (source === "dock") {
        setLaunchingApp(app);
        window.setTimeout(() => setLaunchingApp(null), 720);
      }
    },
    [openWindow],
  );

  const openDesktopContextMenu = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        {
          label: "New Folder",
          shortcut: "⌘N",
          onSelect: () => {
            openWindow("finder", { reuse: false, title: "Untitled Folder" });
            pushNotification({
              app: "Finder",
              title: "New folder created",
              body: "Untitled Folder is ready on the desktop.",
              icon: "/finder.png",
            });
          },
        },
        {
          label: "Get Info",
          shortcut: "⌘I",
          onSelect: () => openWindow("finder"),
        },
        {
          label: "Change Wallpaper...",
          onSelect: () => openWindow("settings"),
        },
      ],
    });
  };

  const openDockContextMenu = (event: ReactMouseEvent<HTMLLIElement>, app: WindowAppId) => {
    event.preventDefault();
    event.stopPropagation();
    const definition = getMacOSApp(app);

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        {
          label: "Open",
          onSelect: () => openApp(app, "dock"),
        },
        {
          label: "Options",
          onSelect: () =>
            pushNotification({
              app: definition?.name ?? "Dock",
              title: "Dock options",
              body: "Options are available from the app context menu.",
              icon: definition?.icon ?? "/finder.png",
            }),
        },
        {
          label: "Show in Finder",
          onSelect: () => openWindow("finder"),
        },
      ],
    });
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden font-sans text-[var(--macos-text)]">
      <SystemEffects />
      <KeyboardShortcuts />
      <BootOverlay />
      <Topbar />

      <main className="relative flex flex-1 overflow-hidden pt-7 pb-28" onContextMenu={openDesktopContextMenu}>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(74px,74px))] content-start gap-5 p-6 pt-8">
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              app={app}
              selected={selectedDesktopApp === app.id}
              onSelect={() => setSelectedDesktopApp(app.id)}
              onOpen={() => openApp(app.id, "desktop")}
            />
          ))}
        </div>

        <TimeWidget />
        <WindowManager />
      </main>

      <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
        <Dock>
          {dockApps.map((app) => {
            const appWindows = openWindows.filter((window) => window.app === app.id);
            const active = appWindows.length > 0;
            const minimized = active && appWindows.every((window) => window.minimized);

            return (
              <DockIcon
                key={app.id}
                name={app.name}
                src={app.icon}
                active={active}
                minimized={minimized}
                launching={launchingApp === app.id}
                onOpen={() => openApp(app.id, "dock")}
                onContextMenu={(event) => openDockContextMenu(event, app.id)}
              />
            );
          })}
        </Dock>
      </div>

      <Spotlight />
      <ControlCenter />
      <NotificationBanners />
      <NotificationCenter />
      <MissionControl />
      <ContextMenu menu={contextMenu} onClose={() => setContextMenu(null)} />
    </div>
  );
}
