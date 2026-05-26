import { create } from "zustand";

export type NotificationItem = {
  id: string;
  app: string;
  title: string;
  body: string;
  icon: string;
  time: string;
};

type NotificationInput = Omit<NotificationItem, "id" | "time"> & {
  id?: string;
  time?: string;
};

type NotificationStore = {
  queue: NotificationItem[];
  history: NotificationItem[];
  pushNotification: (notification: NotificationInput) => string;
  dismissNotification: (id: string) => void;
  clearQueue: () => void;
  clearHistory: () => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  queue: [],
  history: [],

  pushNotification: (notification) => {
    const id = notification.id ?? `notification-${Date.now()}-${get().history.length + 1}`;
    const nextNotification: NotificationItem = {
      ...notification,
      id,
      time: notification.time ?? new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };

    set({
      queue: [nextNotification, ...get().queue].slice(0, 3),
      history: [nextNotification, ...get().history],
    });

    return id;
  },

  dismissNotification: (id) => {
    set({
      queue: get().queue.filter((notification) => notification.id !== id),
    });
  },

  clearQueue: () => set({ queue: [] }),
  clearHistory: () => set({ history: [] }),
}));
