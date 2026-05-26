"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useNotificationStore } from "@/store/notification-store";

function NotificationToast({ id }: { id: string }) {
  const dismissNotification = useNotificationStore((state) => state.dismissNotification);
  const notification = useNotificationStore((state) => state.queue.find((item) => item.id === id));

  useEffect(() => {
    const timer = window.setTimeout(() => dismissNotification(id), 3200);
    return () => window.clearTimeout(timer);
  }, [dismissNotification, id]);

  if (!notification) {
    return null;
  }

  return (
    <article className="macos-notification macos-menu-dropdown flex w-[min(360px,calc(100vw-24px))] items-start gap-3 rounded-[var(--macos-radius-dialog)] p-3">
      <Image
        src={notification.icon}
        alt=""
        aria-hidden="true"
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-[8px] object-contain"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[12px] font-semibold">{notification.app}</p>
          <span className="shrink-0 text-[11px] text-[var(--macos-text-secondary)]">{notification.time}</span>
        </div>
        <h3 className="mt-0.5 truncate text-[13px] font-semibold">{notification.title}</h3>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-4 text-[var(--macos-text-secondary)]">
          {notification.body}
        </p>
      </div>
      <button
        type="button"
        className="macos-icon-button -mr-1 -mt-1 p-1"
        aria-label="Dismiss notification"
        onClick={() => dismissNotification(id)}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </article>
  );
}

export function NotificationBanners() {
  const queue = useNotificationStore((state) => state.queue);

  return (
    <div className="pointer-events-none fixed right-3 top-10 z-[760] grid gap-2">
      {queue.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationToast id={notification.id} />
        </div>
      ))}
    </div>
  );
}
