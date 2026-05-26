import type { WindowAppId } from "@/store/window-store";

export type MacOSAppDefinition = {
  id: WindowAppId;
  name: string;
  title: string;
  icon: string;
  category: "Application" | "Folder" | "Setting";
  keywords: string[];
};

export const macOSApps: MacOSAppDefinition[] = [
  {
    id: "finder",
    name: "Finder",
    title: "Finder",
    icon: "/finder.png",
    category: "Application",
    keywords: ["files", "desktop", "documents", "portfolio"],
  },
  {
    id: "projects",
    name: "Projects",
    title: "Projects",
    icon: "/finder.png",
    category: "Folder",
    keywords: ["work", "case studies", "portfolio", "apps"],
  },
  {
    id: "notes",
    name: "Notes",
    title: "Notes",
    icon: "/notes.png",
    category: "Application",
    keywords: ["writing", "ideas", "resume", "contact"],
  },
  {
    id: "photos",
    name: "Photos",
    title: "Photos",
    icon: "/photos.png",
    category: "Application",
    keywords: ["gallery", "screenshots", "visuals", "memories"],
  },
  {
    id: "settings",
    name: "Settings",
    title: "System Settings",
    icon: "/settings.png",
    category: "Setting",
    keywords: ["appearance", "wifi", "bluetooth", "control center", "focus"],
  },
  {
    id: "music",
    name: "Music",
    title: "Music",
    icon: "/about-you.png",
    category: "Application",
    keywords: ["now playing", "audio", "playlist"],
  },
  {
    id: "maps",
    name: "Maps",
    title: "Maps",
    icon: "/maps.png",
    category: "Application",
    keywords: ["location", "route", "places"],
  },
  {
    id: "slack",
    name: "Slack",
    title: "Slack",
    icon: "/slack.png",
    category: "Application",
    keywords: ["messages", "chat", "collaboration"],
  },
];

export const desktopApps = macOSApps.filter((app) =>
  ["projects", "notes", "photos", "maps"].includes(app.id),
);

export const dockApps = macOSApps.filter((app) =>
  ["finder", "projects", "notes", "photos", "music", "slack", "settings"].includes(app.id),
);

export const getMacOSApp = (id: WindowAppId) => macOSApps.find((app) => app.id === id);

export const spotlightItems = [
  ...macOSApps.map((app) => ({
    id: app.id,
    title: app.name,
    subtitle: app.category,
    icon: app.icon,
    app: app.id,
    keywords: app.keywords,
  })),
  {
    id: "setting-wifi",
    title: "Wi-Fi",
    subtitle: "System Settings",
    icon: "/settings.png",
    app: "settings" as WindowAppId,
    keywords: ["network", "internet", "wireless"],
  },
  {
    id: "setting-focus",
    title: "Focus",
    subtitle: "System Settings",
    icon: "/settings.png",
    app: "settings" as WindowAppId,
    keywords: ["do not disturb", "work", "sleep", "personal"],
  },
  {
    id: "file-resume",
    title: "Resume.pdf",
    subtitle: "Documents",
    icon: "/file.svg",
    app: "finder" as WindowAppId,
    keywords: ["cv", "career", "experience"],
  },
  {
    id: "file-case-study",
    title: "Selected Case Studies",
    subtitle: "Projects",
    icon: "/finder.png",
    app: "projects" as WindowAppId,
    keywords: ["portfolio", "work", "product"],
  },
];
