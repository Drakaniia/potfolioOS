"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMacOSApp } from "@/lib/macos-apps";
import { useNotificationStore } from "@/store/notification-store";
import { useUIStore } from "@/store/ui-store";
import { useWindowStore, type WindowAppId } from "@/store/window-store";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
};

export function KeyboardShortcuts() {
  const [switcherVisible, setSwitcherVisible] = useState(false);
  const focusedWindowId = useWindowStore((state) => state.focusedWindowId);
  const openWindows = useWindowStore((state) => state.openWindows);
  const visibleWindows = openWindows.filter((window) => !window.minimized);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const command = event.metaKey || event.ctrlKey;
      const store = useWindowStore.getState();
      const uiStore = useUIStore.getState();
      const notificationStore = useNotificationStore.getState();
      const focusedWindow = store.openWindows.find((window) => window.id === store.focusedWindowId);
      const targetIsEditable = isEditableTarget(event.target);

      if (event.key === "Escape") {
        uiStore.closeSpotlight();
        uiStore.closeControlCenter();
        uiStore.closeNotificationCenter();
        uiStore.setMissionControlOpen(false);
        uiStore.setExposeApp(null);
        return;
      }

      if (command && event.code === "Space") {
        event.preventDefault();
        uiStore.openSpotlight();
        return;
      }

      if (command && event.key === "Tab") {
        event.preventDefault();
        store.focusNextWindow();
        setSwitcherVisible(true);
        window.setTimeout(() => setSwitcherVisible(false), 900);
        return;
      }

      if (targetIsEditable && !command) {
        return;
      }

      if (command && event.key.toLowerCase() === "q" && focusedWindow) {
        event.preventDefault();
        store.closeApp(focusedWindow.app);
        notificationStore.pushNotification({
          app: focusedWindow.title,
          title: "Application quit",
          body: `${focusedWindow.title} was closed.`,
          icon: getMacOSApp(focusedWindow.app)?.icon ?? "/finder.png",
        });
        return;
      }

      if (command && event.key.toLowerCase() === "w") {
        event.preventDefault();
        store.closeFocusedWindow();
        return;
      }

      if (command && event.key.toLowerCase() === "m") {
        event.preventDefault();
        store.minimizeFocusedWindow();
        return;
      }

      if (command && event.key.toLowerCase() === "h" && focusedWindow) {
        event.preventDefault();
        store.hideApp(focusedWindow.app);
        return;
      }

      if (command && event.key.toLowerCase() === "f") {
        event.preventDefault();
        uiStore.openSpotlight(focusedWindow?.title ?? "");
        return;
      }

      if (command && event.key === ",") {
        event.preventDefault();
        store.openWindow("settings");
        return;
      }

      if (command && event.key.toLowerCase() === "n") {
        event.preventDefault();
        const app = focusedWindow?.app ?? "finder";
        store.openWindow(app, {
          reuse: false,
          position: {
            x: (focusedWindow?.position.x ?? 72) + 28,
            y: (focusedWindow?.position.y ?? 72) + 28,
          },
        });
        return;
      }

      if (event.key === "F11" || (event.ctrlKey && event.key === "ArrowUp")) {
        event.preventDefault();
        uiStore.setMissionControlOpen(true);
        return;
      }

      if (event.ctrlKey && event.key === "ArrowDown" && focusedWindow) {
        event.preventDefault();
        uiStore.setExposeApp(focusedWindow.app as WindowAppId);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!switcherVisible || visibleWindows.length === 0) {
    return null;
  }

  return (
    <div className="macos-menu-dropdown fixed left-1/2 top-1/2 z-[950] flex -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--macos-radius-dialog)] p-4">
      {visibleWindows.map((window) => {
        const app = getMacOSApp(window.app);

        return (
          <div
            key={window.id}
            className={`grid w-20 place-items-center gap-2 rounded-[10px] p-2 text-center ${
              focusedWindowId === window.id ? "bg-[var(--macos-accent)] text-white" : ""
            }`}
          >
            <Image
              src={app?.icon ?? "/finder.png"}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="w-full truncate text-[12px] font-medium">{app?.name ?? window.title}</span>
          </div>
        );
      })}
    </div>
  );
}
