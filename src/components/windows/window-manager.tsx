"use client";

import Image from "next/image";
import {
  Bell,
  Bluetooth,
  CheckCircle2,
  ChevronRight,
  Folder,
  Grid2X2,
  Monitor,
  Moon,
  Palette,
  Search,
  Share,
  Wifi,
} from "lucide-react";
import { MacOSWindow } from "@/components/windows/macos-window";
import { cn } from "@/lib/utils";
import { useNotificationStore } from "@/store/notification-store";
import { useSystemStore } from "@/store/system-store";
import { useWindowStore, type OpenWindow } from "@/store/window-store";

const projects = [
  {
    title: "Atlas Analytics",
    meta: "Product dashboard",
    body: "Operational analytics with fast filters, dense tables, and executive snapshots.",
  },
  {
    title: "Northstar CRM",
    meta: "SaaS workspace",
    body: "A quiet, repeatable workflow surface for accounts, deals, and follow-ups.",
  },
  {
    title: "Canvas Studio",
    meta: "Creative tooling",
    body: "A visual editor focused on quick composition, asset reuse, and polished export.",
  },
];

const notes = [
  {
    title: "Portfolio Positioning",
    date: "Today",
    body: "Builds complex product surfaces with careful interaction design and pragmatic engineering discipline.",
  },
  {
    title: "Recent Focus",
    date: "Yesterday",
    body: "Next.js, React systems, interactive desktop metaphors, and high-polish UI foundations.",
  },
  {
    title: "Contact",
    date: "May 25",
    body: "Available for product engineering, prototyping, and design systems work.",
  },
];

const settingsSections = [
  { label: "Wi-Fi", Icon: Wifi },
  { label: "Bluetooth", Icon: Bluetooth },
  { label: "Appearance", Icon: Palette },
  { label: "Focus", Icon: Moon },
  { label: "Notifications", Icon: Bell },
  { label: "Displays", Icon: Monitor },
];

function FinderContent() {
  const openWindow = useWindowStore((state) => state.openWindow);
  const pushNotification = useNotificationStore((state) => state.pushNotification);

  return (
    <div className="grid h-full grid-cols-[210px_1fr] bg-[var(--macos-surface)]">
      <aside className="macos-sidebar min-h-0 overflow-auto border-r border-[var(--macos-border)] px-3 py-4">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--macos-text-secondary)]">
          Favorites
        </p>
        {["Desktop", "Documents", "Projects", "Downloads"].map((item) => (
          <button
            type="button"
            key={item}
            className="macos-menu-item mt-1 flex w-full items-center gap-2 px-2 py-1.5 text-left text-[13px]"
          >
            <Folder className="h-4 w-4 text-[var(--macos-accent)]" />
            {item}
          </button>
        ))}
      </aside>

      <div className="flex min-h-0 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--macos-border)] px-4 py-3">
          <div className="flex items-center gap-2 rounded-[var(--macos-radius-button)] bg-black/5 px-2 py-1.5 text-[13px] text-[var(--macos-text-secondary)] dark:bg-white/10">
            <Search className="h-4 w-4" />
            <span>Search portfolio files</span>
          </div>
          <button
            type="button"
            className="macos-button px-3 py-1.5 text-[13px]"
            onClick={() => {
              openWindow("projects");
              pushNotification({
                app: "Finder",
                title: "Projects opened",
                body: "Selected case studies are ready.",
                icon: "/finder.png",
              });
            }}
          >
            Open Projects
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
            {[
              { label: "Projects", icon: "/finder.png", app: "projects" as const },
              { label: "Notes", icon: "/notes.png", app: "notes" as const },
              { label: "Photos", icon: "/photos.png", app: "photos" as const },
              { label: "Resume.pdf", icon: "/file.svg", app: "finder" as const },
            ].map((item) => (
              <button
                type="button"
                key={item.label}
                className="rounded-[8px] p-3 text-center transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                onDoubleClick={() => openWindow(item.app)}
              >
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="mx-auto h-14 w-14 object-contain"
                />
                <span className="mt-2 block text-[13px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="h-full overflow-auto bg-[var(--macos-surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-semibold">Selected Projects</h3>
          <p className="text-[13px] text-[var(--macos-text-secondary)]">Case studies and shipped UI systems.</p>
        </div>
        <button type="button" className="macos-icon-button p-2" aria-label="Share projects">
          <Share className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-[8px] bg-white/55 p-4 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] dark:bg-white/10"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData("text/plain", project.title);
            }}
          >
            <div className="mb-4 flex h-28 items-end rounded-[6px] bg-[linear-gradient(135deg,#0a84ff,#64d2ff_45%,#34c759)] p-3 text-white">
              <Grid2X2 className="h-6 w-6" />
            </div>
            <h4 className="text-[15px] font-semibold">{project.title}</h4>
            <p className="mt-1 text-[12px] font-medium text-[var(--macos-text-secondary)]">{project.meta}</p>
            <p className="mt-3 text-[13px] leading-relaxed text-[var(--macos-text-secondary)]">{project.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function NotesContent() {
  return (
    <div className="grid h-full grid-cols-[230px_1fr] bg-[var(--macos-surface)]">
      <aside className="macos-sidebar min-h-0 overflow-auto border-r border-[var(--macos-border)] p-3">
        {notes.map((note, index) => (
          <button
            type="button"
            key={note.title}
            className="macos-menu-item w-full px-3 py-2 text-left"
            data-active={index === 0}
          >
            <span className="block truncate text-[13px] font-semibold">{note.title}</span>
            <span className="mt-0.5 block text-[11px] text-[var(--macos-text-secondary)]">{note.date}</span>
          </button>
        ))}
      </aside>

      <article className="min-h-0 overflow-auto p-6">
        <p className="text-[12px] text-[var(--macos-text-secondary)]">{notes[0].date}</p>
        <h3 className="mt-2 text-[22px] font-semibold">{notes[0].title}</h3>
        <p className="mt-5 max-w-[58ch] text-[15px] leading-7">{notes[0].body}</p>
        <div className="mt-6 rounded-[8px] bg-black/5 p-4 text-[13px] leading-6 text-[var(--macos-text-secondary)] dark:bg-white/10">
          Interaction-first portfolio surfaces should behave like real tools: openable, searchable, draggable, and
          fast enough that the operating-system metaphor feels intentional.
        </div>
      </article>
    </div>
  );
}

function PhotosContent() {
  const photos = ["/about-you.png", "/wallpaper.jpg", "/finder.png", "/maps.png"];

  return (
    <div className="h-full overflow-auto bg-[var(--macos-surface)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[18px] font-semibold">Portfolio Photos</h3>
        <span className="text-[12px] text-[var(--macos-text-secondary)]">{photos.length} items</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
        {photos.map((photo) => (
          <div key={photo} className="aspect-[4/3] overflow-hidden rounded-[8px] bg-black/10">
            <Image
              src={photo}
              alt=""
              aria-hidden="true"
              width={320}
              height={240}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsContent() {
  const {
    accentColor,
    bluetooth,
    brightness,
    focusMode,
    setAccentColor,
    setBluetooth,
    setBrightness,
    setFocusMode,
    setTheme,
    setVolume,
    setWifi,
    theme,
    volume,
    wifi,
  } = useSystemStore();

  return (
    <div className="grid h-full grid-cols-[230px_1fr] bg-[var(--macos-surface)]">
      <aside className="macos-sidebar min-h-0 overflow-auto border-r border-[var(--macos-border)] p-3">
        {settingsSections.map(({ label, Icon }) => (
          <button
            type="button"
            key={label}
            className="macos-menu-item flex w-full items-center gap-2 px-3 py-2 text-left text-[13px]"
            data-active={label === "Appearance"}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </aside>

      <div className="min-h-0 overflow-auto p-6">
        <h3 className="text-[22px] font-semibold">Appearance</h3>
        <div className="mt-5 grid gap-4">
          <section className="rounded-[8px] bg-white/55 p-4 dark:bg-white/10">
            <h4 className="text-[14px] font-semibold">Theme</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["light", "dark", "auto"] as const).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={cn(
                    "rounded-[6px] px-3 py-1.5 text-[13px] capitalize",
                    theme === mode ? "bg-[var(--macos-accent)] text-white" : "bg-black/5 dark:bg-white/10",
                  )}
                  onClick={() => setTheme(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[8px] bg-white/55 p-4 dark:bg-white/10">
            <h4 className="text-[14px] font-semibold">System</h4>
            <div className="mt-4 grid gap-4 text-[13px]">
              <label className="flex items-center justify-between gap-4">
                <span>Wi-Fi: {wifi.enabled ? wifi.networkName : "Off"}</span>
                <input
                  type="checkbox"
                  checked={wifi.enabled}
                  onChange={(event) => setWifi(event.currentTarget.checked)}
                />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Bluetooth</span>
                <input
                  type="checkbox"
                  checked={bluetooth}
                  onChange={(event) => setBluetooth(event.currentTarget.checked)}
                />
              </label>
              <label className="grid gap-2">
                <span>Brightness {brightness}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={brightness}
                  onChange={(event) => setBrightness(Number(event.currentTarget.value))}
                />
              </label>
              <label className="grid gap-2">
                <span>Volume {volume}%</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.currentTarget.value))}
                />
              </label>
            </div>
          </section>

          <section className="rounded-[8px] bg-white/55 p-4 dark:bg-white/10">
            <h4 className="text-[14px] font-semibold">Accent Color</h4>
            <div className="mt-3 flex gap-2">
              {["#007aff", "#34c759", "#ff9500", "#af52de", "#ff2d55"].map((color) => (
                <button
                  type="button"
                  key={color}
                  className="grid h-7 w-7 place-items-center rounded-full"
                  style={{ backgroundColor: color }}
                  aria-label={`Set accent color ${color}`}
                  onClick={() => setAccentColor(color)}
                >
                  {accentColor === color ? <CheckCircle2 className="h-4 w-4 text-white" /> : null}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[8px] bg-white/55 p-4 dark:bg-white/10">
            <h4 className="text-[14px] font-semibold">Focus</h4>
            <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-2">
              {(["off", "dnd", "work", "personal", "sleep"] as const).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={cn(
                    "rounded-[6px] px-3 py-2 text-[13px] capitalize",
                    focusMode === mode ? "bg-[var(--macos-accent)] text-white" : "bg-black/5 dark:bg-white/10",
                  )}
                  onClick={() => setFocusMode(mode)}
                >
                  {mode === "dnd" ? "Do Not Disturb" : mode}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MusicContent() {
  return (
    <div className="grid h-full grid-cols-[42%_58%] bg-[var(--macos-surface)]">
      <div className="relative min-h-0 overflow-hidden">
        <Image
          src="/about-you.png"
          alt="About You album artwork"
          width={420}
          height={420}
          className="h-full w-full object-cover"
          style={{
            maskImage: "linear-gradient(to right, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 100%)",
          }}
        />
      </div>
      <div className="flex min-h-0 flex-col justify-between overflow-auto p-6">
        <div>
          <p className="text-[12px] text-[var(--macos-text-secondary)]">Now Playing</p>
          <h3 className="mt-2 text-[22px] font-semibold">About You</h3>
          <p className="text-[13px] text-[var(--macos-text-secondary)]">The 1975</p>
        </div>
        <div>
          <div className="h-1 overflow-hidden rounded-full bg-black/15 dark:bg-white/15">
            <div className="h-full w-[38%] rounded-full bg-[var(--macos-accent)]" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[11px] text-[var(--macos-text-secondary)]">
            <span>1:10</span>
            <span>3:09</span>
          </div>
        </div>
        <button type="button" className="macos-button mx-auto px-5 py-2 text-[13px]">
          Play
        </button>
      </div>
    </div>
  );
}

function MapsContent() {
  return (
    <div className="grid h-full grid-cols-[230px_1fr] bg-[var(--macos-surface)]">
      <aside className="macos-sidebar border-r border-[var(--macos-border)] p-4">
        <div className="flex items-center gap-2 rounded-[6px] bg-black/5 px-3 py-2 text-[13px] text-[var(--macos-text-secondary)] dark:bg-white/10">
          <Search className="h-4 w-4" />
          Search Maps
        </div>
        {["Current Location", "Coffee nearby", "Client offices"].map((place) => (
          <button
            type="button"
            key={place}
            className="macos-menu-item mt-3 flex w-full items-center justify-between px-3 py-2 text-left text-[13px]"
          >
            {place}
            <ChevronRight className="h-4 w-4" />
          </button>
        ))}
      </aside>
      <div className="relative min-h-0 overflow-hidden bg-[#d7ead1]">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(30deg,transparent_48%,rgba(255,255,255,.75)_49%,rgba(255,255,255,.75)_51%,transparent_52%),linear-gradient(120deg,transparent_48%,rgba(255,255,255,.75)_49%,rgba(255,255,255,.75)_51%,transparent_52%)] [background-size:120px_120px]" />
        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--macos-accent)] text-white shadow-lg">
          <span className="h-3 w-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

function SlackContent() {
  return (
    <div className="grid h-full grid-cols-[190px_1fr] bg-[var(--macos-surface)]">
      <aside className="min-h-0 overflow-auto bg-[#4a154b]/90 p-3 text-white">
        <p className="px-2 text-[13px] font-semibold">Portfolio OS</p>
        {["general", "projects", "availability"].map((channel) => (
          <button
            type="button"
            key={channel}
            className="mt-1 flex w-full items-center rounded-[6px] px-2 py-1.5 text-left text-[13px] hover:bg-white/15"
          >
            # {channel}
          </button>
        ))}
      </aside>
      <div className="min-h-0 overflow-auto p-5">
        <h3 className="text-[18px] font-semibold"># general</h3>
        <div className="mt-5 space-y-4 text-[13px]">
          <p>
            <strong>Portfolio OS</strong> shipped a shared window manager, shortcuts, and native-feeling desktop
            interactions.
          </p>
          <p>
            <strong>System</strong> Control Center and Spotlight are now wired into the same state layer.
          </p>
        </div>
      </div>
    </div>
  );
}

function WindowContent({ windowState }: { windowState: OpenWindow }) {
  switch (windowState.app) {
    case "finder":
      return <FinderContent />;
    case "projects":
      return <ProjectsContent />;
    case "notes":
      return <NotesContent />;
    case "photos":
      return <PhotosContent />;
    case "settings":
      return <SettingsContent />;
    case "music":
      return <MusicContent />;
    case "maps":
      return <MapsContent />;
    case "slack":
      return <SlackContent />;
    default:
      return null;
  }
}

export function WindowManager() {
  const openWindows = useWindowStore((state) => state.openWindows);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 top-7 z-20" onContextMenu={(event) => event.stopPropagation()}>
      {openWindows.map((windowState) => (
        <MacOSWindow key={windowState.id} windowState={windowState}>
          <WindowContent windowState={windowState} />
        </MacOSWindow>
      ))}
    </div>
  );
}
