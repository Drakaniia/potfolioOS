import { create } from "zustand";
import type { WindowAppId } from "./window-store";

type UIStore = {
  spotlightOpen: boolean;
  spotlightQuery: string;
  controlCenterOpen: boolean;
  notificationCenterOpen: boolean;
  missionControlOpen: boolean;
  exposeApp: WindowAppId | null;
  openSpotlight: (query?: string) => void;
  closeSpotlight: () => void;
  setSpotlightQuery: (query: string) => void;
  toggleControlCenter: () => void;
  closeControlCenter: () => void;
  toggleNotificationCenter: () => void;
  closeNotificationCenter: () => void;
  setMissionControlOpen: (open: boolean) => void;
  setExposeApp: (app: WindowAppId | null) => void;
};

export const useUIStore = create<UIStore>((set, get) => ({
  spotlightOpen: false,
  spotlightQuery: "",
  controlCenterOpen: false,
  notificationCenterOpen: false,
  missionControlOpen: false,
  exposeApp: null,

  openSpotlight: (query = "") =>
    set({
      spotlightOpen: true,
      spotlightQuery: query,
      controlCenterOpen: false,
    }),
  closeSpotlight: () => set({ spotlightOpen: false, spotlightQuery: "" }),
  setSpotlightQuery: (query) => set({ spotlightQuery: query }),
  toggleControlCenter: () =>
    set({
      controlCenterOpen: !get().controlCenterOpen,
      spotlightOpen: false,
      notificationCenterOpen: false,
    }),
  closeControlCenter: () => set({ controlCenterOpen: false }),
  toggleNotificationCenter: () =>
    set({
      notificationCenterOpen: !get().notificationCenterOpen,
      controlCenterOpen: false,
      spotlightOpen: false,
    }),
  closeNotificationCenter: () => set({ notificationCenterOpen: false }),
  setMissionControlOpen: (open) => set({ missionControlOpen: open }),
  setExposeApp: (app) => set({ exposeApp: app }),
}));
