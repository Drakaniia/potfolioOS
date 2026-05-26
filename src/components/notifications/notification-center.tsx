"use client";

import Image from "next/image";
import { Bell, X } from "lucide-react";
import { useNotificationStore } from "@/store/notification-store";
import { useUIStore } from "@/store/ui-store";

export function NotificationCenter() {
  const clearHistory = useNotificationStore((state) => state.clearHistory);
  const history = useNotificationStore((state) => state.history);
  const closeNotificationCenter = useUIStore((state) => state.closeNotificationCenter);
  const open = useUIStore((state) => state.notificationCenterOpen);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[810]" onClick={closeNotificationCenter}>
      <aside
        className="macos-menu-dropdown macos-window-enter fixed right-3 top-9 flex max-h-[calc(100dvh-124px)] w-[min(380px,calc(100vw-24px))] flex-col rounded-[var(--macos-radius-dialog)] p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-1 pb-3">
          <h2 className="text-[18px] font-semibold">Notifications</h2>
          <div className="flex items-center gap-1">
            <button type="button" className="macos-menu-item px-2 py-1 text-[12px]" onClick={clearHistory}>
              Clear
            </button>
            <button type="button" className="macos-icon-button p-1" aria-label="Close notifications" onClick={closeNotificationCenter}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          {history.length === 0 ? (
            <div className="grid min-h-48 place-items-center rounded-[12px] bg-white/45 p-6 text-center dark:bg-white/10">
              <div>
                <Bell className="mx-auto h-7 w-7 text-[var(--macos-text-secondary)]" />
                <p className="mt-3 text-[13px] text-[var(--macos-text-secondary)]">No notifications</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              {history.map((notification) => (
                <article key={notification.id} className="rounded-[12px] bg-white/55 p-3 dark:bg-white/10">
                  <div className="flex items-start gap-3">
                    <Image src={notification.icon} alt="" aria-hidden="true" width={30} height={30} className="h-7 w-7 object-contain" />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <p className="truncate text-[12px] font-semibold">{notification.app}</p>
                        <span className="text-[11px] text-[var(--macos-text-secondary)]">{notification.time}</span>
                      </div>
                      <h3 className="mt-0.5 text-[13px] font-semibold">{notification.title}</h3>
                      <p className="mt-0.5 text-[12px] leading-4 text-[var(--macos-text-secondary)]">{notification.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
