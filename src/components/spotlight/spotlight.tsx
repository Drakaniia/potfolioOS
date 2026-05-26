"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { spotlightItems } from "@/lib/macos-apps";
import { useNotificationStore } from "@/store/notification-store";
import { useUIStore } from "@/store/ui-store";
import { useWindowStore } from "@/store/window-store";

export function Spotlight() {
  const closeSpotlight = useUIStore((state) => state.closeSpotlight);
  const open = useUIStore((state) => state.spotlightOpen);
  const query = useUIStore((state) => state.spotlightQuery);
  const setQuery = useUIStore((state) => state.setSpotlightQuery);
  const openWindow = useWindowStore((state) => state.openWindow);
  const pushNotification = useNotificationStore((state) => state.pushNotification);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return spotlightItems.slice(0, 7);
    }

    return spotlightItems
      .filter((item) => {
        const searchable = [item.title, item.subtitle, ...item.keywords].join(" ").toLowerCase();
        return searchable.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [query]);
  const boundedSelectedIndex = Math.min(selectedIndex, Math.max(0, results.length - 1));

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((index) => Math.min(index + 1, Math.max(0, results.length - 1)));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((index) => Math.max(0, index - 1));
      }

      if (event.key === "Enter" && results[boundedSelectedIndex]) {
        event.preventDefault();
        const selected = results[boundedSelectedIndex];
        openWindow(selected.app);
        pushNotification({
          app: "Spotlight",
          title: `${selected.title} opened`,
          body: "Launched from Spotlight.",
          icon: selected.icon,
        });
        closeSpotlight();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [boundedSelectedIndex, closeSpotlight, open, openWindow, pushNotification, results]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[900]" onClick={closeSpotlight}>
      <div
        className="macos-spotlight macos-menu-dropdown fixed left-1/2 top-[28%] w-[min(680px,calc(100vw-32px))] overflow-hidden rounded-[var(--macos-radius-dialog)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4">
          <Search className="h-5 w-5 text-[var(--macos-text-secondary)]" />
          <input
            autoFocus
            className="min-w-0 flex-1 bg-transparent text-[18px] font-medium text-[var(--macos-text)] outline-none placeholder:text-[var(--macos-text-secondary)]"
            placeholder="Spotlight Search"
            value={query}
            onChange={(event) => {
              setSelectedIndex(0);
              setQuery(event.currentTarget.value);
            }}
          />
        </div>

        <div className="max-h-[360px] overflow-auto border-t border-[var(--macos-border)] p-2">
          {results.length === 0 ? (
            <p className="px-3 py-5 text-center text-[13px] text-[var(--macos-text-secondary)]">No results</p>
          ) : (
            results.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className="macos-menu-item flex w-full items-center gap-3 px-3 py-2 text-left text-[13px]"
                data-active={index === boundedSelectedIndex}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  openWindow(item.app);
                  closeSpotlight();
                }}
              >
                <Image src={item.icon} alt="" aria-hidden="true" width={28} height={28} className="h-7 w-7 object-contain" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{item.title}</span>
                  <span className="block truncate text-[11px] text-[var(--macos-text-secondary)]">{item.subtitle}</span>
                </span>
                <span className="font-mono text-[11px] text-[var(--macos-text-secondary)]">return</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
