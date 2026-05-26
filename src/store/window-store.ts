import { create } from "zustand";

export type WindowAppId =
  | "finder"
  | "projects"
  | "notes"
  | "photos"
  | "settings"
  | "music"
  | "maps"
  | "slack";

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type OpenWindow = {
  id: string;
  app: WindowAppId;
  title: string;
  position: WindowPosition;
  size: WindowSize;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
};

type OpenWindowOptions = {
  id?: string;
  title?: string;
  position?: Partial<WindowPosition>;
  size?: Partial<WindowSize>;
  reuse?: boolean;
};

type WindowStore = {
  openWindows: OpenWindow[];
  focusedWindowId: string | null;
  nextZIndex: number;
  openWindow: (app: WindowAppId, options?: OpenWindowOptions) => string;
  closeWindow: (id: string) => void;
  closeFocusedWindow: () => void;
  closeApp: (app: WindowAppId) => void;
  focusWindow: (id: string) => void;
  focusNextWindow: () => void;
  minimizeWindow: (id: string) => void;
  minimizeFocusedWindow: () => void;
  hideApp: (app: WindowAppId) => void;
  maximizeWindow: (id: string) => void;
  moveWindow: (id: string, position: WindowPosition) => void;
  resizeWindow: (id: string, size: WindowSize, position?: WindowPosition) => void;
};

const defaultWindowConfig: Record<
  WindowAppId,
  { title: string; position: WindowPosition; size: WindowSize }
> = {
  finder: {
    title: "Finder",
    position: { x: 72, y: 72 },
    size: { width: 780, height: 500 },
  },
  projects: {
    title: "Projects",
    position: { x: 112, y: 92 },
    size: { width: 820, height: 540 },
  },
  notes: {
    title: "Notes",
    position: { x: 148, y: 118 },
    size: { width: 760, height: 500 },
  },
  photos: {
    title: "Photos",
    position: { x: 184, y: 84 },
    size: { width: 820, height: 560 },
  },
  settings: {
    title: "System Settings",
    position: { x: 220, y: 76 },
    size: { width: 840, height: 560 },
  },
  music: {
    title: "Music",
    position: { x: 96, y: 104 },
    size: { width: 700, height: 440 },
  },
  maps: {
    title: "Maps",
    position: { x: 132, y: 92 },
    size: { width: 780, height: 500 },
  },
  slack: {
    title: "Slack",
    position: { x: 172, y: 112 },
    size: { width: 760, height: 520 },
  },
};

const bringToFront = (window: OpenWindow, zIndex: number): OpenWindow => ({
  ...window,
  zIndex,
  minimized: false,
});

const getNextFocusedWindowId = (windows: OpenWindow[]) => {
  const visibleWindows = windows.filter((window) => !window.minimized);
  return visibleWindows.sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null;
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  openWindows: [],
  focusedWindowId: null,
  nextZIndex: 40,

  openWindow: (app, options) => {
    const { openWindows, nextZIndex } = get();
    const existingWindow = openWindows.find((window) => window.app === app);
    const shouldReuse = options?.reuse ?? true;

    if (existingWindow && shouldReuse) {
      const zIndex = nextZIndex + 1;
      set({
        openWindows: openWindows.map((window) =>
          window.id === existingWindow.id ? bringToFront(window, zIndex) : window,
        ),
        focusedWindowId: existingWindow.id,
        nextZIndex: zIndex,
      });
      return existingWindow.id;
    }

    const config = defaultWindowConfig[app];
    const offset = openWindows.filter((window) => window.app === app).length * 24;
    const id = options?.id ?? `${app}-${Date.now()}-${openWindows.length + 1}`;
    const zIndex = nextZIndex + 1;

    const nextWindow: OpenWindow = {
      id,
      app,
      title: options?.title ?? config.title,
      position: {
        x: options?.position?.x ?? config.position.x + offset,
        y: options?.position?.y ?? config.position.y + offset,
      },
      size: {
        width: options?.size?.width ?? config.size.width,
        height: options?.size?.height ?? config.size.height,
      },
      zIndex,
      minimized: false,
      maximized: false,
    };

    set({
      openWindows: [...openWindows, nextWindow],
      focusedWindowId: id,
      nextZIndex: zIndex,
    });

    return id;
  },

  closeWindow: (id) => {
    const remainingWindows = get().openWindows.filter((window) => window.id !== id);

    set({
      openWindows: remainingWindows,
      focusedWindowId: getNextFocusedWindowId(remainingWindows),
    });
  },

  closeFocusedWindow: () => {
    const focusedWindowId = get().focusedWindowId;
    if (focusedWindowId) {
      get().closeWindow(focusedWindowId);
    }
  },

  closeApp: (app) => {
    const remainingWindows = get().openWindows.filter((window) => window.app !== app);

    set({
      openWindows: remainingWindows,
      focusedWindowId: getNextFocusedWindowId(remainingWindows),
    });
  },

  focusWindow: (id) => {
    const { openWindows, nextZIndex } = get();
    const zIndex = nextZIndex + 1;

    set({
      openWindows: openWindows.map((window) =>
        window.id === id ? bringToFront(window, zIndex) : window,
      ),
      focusedWindowId: id,
      nextZIndex: zIndex,
    });
  },

  focusNextWindow: () => {
    const { focusedWindowId, openWindows } = get();
    const visibleWindows = openWindows
      .filter((window) => !window.minimized)
      .sort((a, b) => b.zIndex - a.zIndex);

    if (visibleWindows.length === 0) {
      return;
    }

    const currentIndex = visibleWindows.findIndex((window) => window.id === focusedWindowId);
    const nextWindow = visibleWindows[(currentIndex + 1) % visibleWindows.length] ?? visibleWindows[0];
    get().focusWindow(nextWindow.id);
  },

  minimizeWindow: (id) => {
    const minimizedWindows = get().openWindows.map((window) =>
      window.id === id ? { ...window, minimized: true } : window,
    );

    set({
      openWindows: minimizedWindows,
      focusedWindowId: getNextFocusedWindowId(minimizedWindows),
    });
  },

  minimizeFocusedWindow: () => {
    const focusedWindowId = get().focusedWindowId;
    if (focusedWindowId) {
      get().minimizeWindow(focusedWindowId);
    }
  },

  hideApp: (app) => {
    const hiddenWindows = get().openWindows.map((window) =>
      window.app === app ? { ...window, minimized: true } : window,
    );

    set({
      openWindows: hiddenWindows,
      focusedWindowId: getNextFocusedWindowId(hiddenWindows),
    });
  },

  maximizeWindow: (id) => {
    const { openWindows, nextZIndex } = get();
    const zIndex = nextZIndex + 1;

    set({
      openWindows: openWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              maximized: !window.maximized,
              minimized: false,
              zIndex,
            }
          : window,
      ),
      focusedWindowId: id,
      nextZIndex: zIndex,
    });
  },

  moveWindow: (id, position) => {
    set({
      openWindows: get().openWindows.map((window) =>
        window.id === id ? { ...window, position } : window,
      ),
    });
  },

  resizeWindow: (id, size, position) => {
    set({
      openWindows: get().openWindows.map((window) =>
        window.id === id
          ? {
              ...window,
              size,
              position: position ?? window.position,
            }
          : window,
      ),
    });
  },
}));
