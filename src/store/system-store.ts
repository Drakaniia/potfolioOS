import { create } from "zustand";

export type FocusMode = "off" | "dnd" | "work" | "personal" | "sleep";
export type SystemTheme = "light" | "dark" | "auto";

type SystemStore = {
  volume: number;
  brightness: number;
  wifi: {
    enabled: boolean;
    networkName: string;
  };
  bluetooth: boolean;
  battery: {
    percent: number;
    charging: boolean;
  };
  focusMode: FocusMode;
  theme: SystemTheme;
  accentColor: string;
  setVolume: (volume: number) => void;
  setBrightness: (brightness: number) => void;
  setWifi: (enabled: boolean, networkName?: string) => void;
  setBluetooth: (enabled: boolean) => void;
  setBattery: (battery: Partial<SystemStore["battery"]>) => void;
  setFocusMode: (focusMode: FocusMode) => void;
  setTheme: (theme: SystemTheme) => void;
  setAccentColor: (accentColor: string) => void;
};

const clampPercent = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export const useSystemStore = create<SystemStore>((set, get) => ({
  volume: 58,
  brightness: 82,
  wifi: {
    enabled: true,
    networkName: "Portfolio Wi-Fi",
  },
  bluetooth: true,
  battery: {
    percent: 100,
    charging: true,
  },
  focusMode: "off",
  theme: "auto",
  accentColor: "#007aff",

  setVolume: (volume) => set({ volume: clampPercent(volume) }),
  setBrightness: (brightness) => set({ brightness: clampPercent(brightness) }),
  setWifi: (enabled, networkName) =>
    set({
      wifi: {
        enabled,
        networkName: networkName ?? get().wifi.networkName,
      },
    }),
  setBluetooth: (enabled) => set({ bluetooth: enabled }),
  setBattery: (battery) =>
    set({
      battery: {
        ...get().battery,
        ...battery,
        percent: battery.percent === undefined ? get().battery.percent : clampPercent(battery.percent),
      },
    }),
  setFocusMode: (focusMode) => set({ focusMode }),
  setTheme: (theme) => set({ theme }),
  setAccentColor: (accentColor) => set({ accentColor }),
}));
