"use client";

import Image from "next/image";
import type { MacOSAppDefinition } from "@/lib/macos-apps";

type DesktopIconProps = {
  app: MacOSAppDefinition;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

export function DesktopIcon({ app, selected, onSelect, onOpen }: DesktopIconProps) {
  return (
    <button
      type="button"
      className="group flex h-24 w-[74px] flex-col items-center justify-start gap-1 rounded-[var(--macos-radius-button)] p-1 text-center text-[12px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-colors hover:bg-white/15 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[var(--macos-accent)]"
      data-selected={selected}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onOpen();
        }
      }}
    >
      <Image
        src={app.icon}
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
        className="h-14 w-14 object-contain transition-transform duration-200 group-hover:scale-105"
      />
      <span className="rounded px-1 leading-tight group-data-[selected=true]:bg-[var(--macos-accent)]">
        {app.name}
      </span>
    </button>
  );
}
