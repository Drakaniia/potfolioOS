"use client";

import { useEffect } from "react";

export type ContextMenuItem = {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  onSelect: () => void;
};

export type ContextMenuState = {
  x: number;
  y: number;
  items: ContextMenuItem[];
} | null;

type ContextMenuProps = {
  menu: ContextMenuState;
  onClose: () => void;
};

export function ContextMenu({ menu, onClose }: ContextMenuProps) {
  useEffect(() => {
    if (!menu) {
      return;
    }

    const close = () => onClose();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("click", close);
    window.addEventListener("contextmenu", close);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("contextmenu", close);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menu, onClose]);

  if (!menu) {
    return null;
  }

  const viewportWidth = typeof window === "undefined" ? 1200 : window.innerWidth;
  const viewportHeight = typeof window === "undefined" ? 800 : window.innerHeight;

  return (
    <div
      className="macos-menu-dropdown fixed z-[1200] min-w-52 p-1 text-[13px]"
      style={{
        left: Math.min(menu.x, viewportWidth - 232),
        top: Math.min(menu.y, viewportHeight - menu.items.length * 34 - 12),
      }}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      {menu.items.map((item) => (
        <button
          type="button"
          key={item.label}
          disabled={item.disabled}
          className="macos-menu-item flex w-full items-center justify-between gap-8 px-3 py-1.5 text-left disabled:pointer-events-none disabled:opacity-45"
          onClick={() => {
            item.onSelect();
            onClose();
          }}
        >
          <span className={item.destructive ? "text-[var(--macos-red)]" : undefined}>{item.label}</span>
          {item.shortcut ? (
            <span className="font-mono text-[11px] text-[var(--macos-text-secondary)]">{item.shortcut}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
