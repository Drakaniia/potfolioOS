Note, the app is preconfigured do only whats new or needed

You are building a pixel-perfect macOS Sequoia/Sonoma-style web operating system using Next.js 14 (App Router), TypeScript, and Tailwind CSS. This is a single-page interactive experience that replicates the full macOS desktop environment in the browser. No external UI libraries — build everything from scratch with custom CSS and Tailwind.

---

## 🎯 GOAL
Recreate the complete macOS desktop experience as a web app, including every visual system, every widget, and every functional UI layer that macOS ships with.

---

## 🗂️ PROJECT STRUCTURE

/app
  layout.tsx           ← Root layout, global fonts, metadata
  page.tsx             ← Boot screen → Desktop

/components
  /desktop
    Desktop.tsx        ← Main desktop canvas, wallpaper, icon grid
    DesktopIcon.tsx    ← App icons (double-click to open)
    Wallpaper.tsx      ← Dynamic wallpaper (time-of-day gradients or image)

  /menubar
    MenuBar.tsx        ← Top menu bar (Apple logo, app menus, system tray)
    AppleMenu.tsx      ← Apple () dropdown
    AppMenu.tsx        ← Dynamic app-specific menus (File, Edit, View…)
    SystemTray.tsx     ← Right side: WiFi, Battery, Clock, Control Center icon, Spotlight

  /dock
    Dock.tsx           ← Bottom dock with magnification
    DockItem.tsx       ← Individual dock icon with bounce animation, badge, dot indicator
    DockDivider.tsx    ← Separator line between apps and trash

  /windows
    WindowManager.tsx  ← Manages z-index stack, focus, minimize/maximize state
    Window.tsx         ← Draggable, resizable window with traffic lights
    WindowTitleBar.tsx ← Red/Yellow/Green buttons + title + toolbar
    WindowContent.tsx  ← Scrollable content area per app

  /apps
    Finder.tsx         ← Sidebar (Favorites, iCloud, Locations), file grid/list view
    Safari.tsx         ← Browser UI: tabs, address bar, back/forward, bookmark bar
    Terminal.tsx       ← Functional terminal with fake shell (ls, cd, echo, clear, neofetch)
    Settings.tsx       ← Full System Settings (see full list below)
    Notes.tsx          ← Sidebar note list + rich text editor
    Calculator.tsx     ← Standard + Scientific + Programmer modes
    Calendar.tsx       ← Month/Week/Day views, event creation
    Photos.tsx         ← Photo grid, album sidebar, lightbox viewer
    Maps.tsx           ← Simulated map UI with sidebar + search
    Messages.tsx       ← iMessage UI: conversation list + chat bubbles
    Mail.tsx           ← Three-pane mail client (mailboxes / list / reader)
    Music.tsx          ← iTunes/Music app: sidebar, now playing bar, library
    AppStore.tsx       ← Featured / Categories / Search app store UI
    TextEdit.tsx       ← Rich text editor with format toolbar
    Preview.tsx        ← PDF/image viewer with thumbnail sidebar
    FaceTime.tsx       ← Video call UI (simulated)
    Reminders.tsx      ← Sidebar lists + checklist items
    Contacts.tsx       ← Contact card grid + detail view
    Weather.tsx        ← Full weather app with hourly/weekly forecast
    Clock.tsx          ← World clock, alarm, stopwatch, timer

  /notifications
    NotificationCenter.tsx   ← Right slide-in panel: grouped notifications
    NotificationBanner.tsx   ← Top-right toast banners
    NotificationBadge.tsx    ← Red badge count on icons

  /spotlight
    Spotlight.tsx      ← Centered search modal, animated, categorized results

  /controlcenter
    ControlCenter.tsx  ← Slide-in panel from top-right
    CCTile.tsx         ← Individual tile (WiFi, Bluetooth, AirDrop, Focus, Display, Sound)
    WiFiPanel.tsx      ← Expanded WiFi network list
    BluetoothPanel.tsx ← Bluetooth device list
    SoundSlider.tsx    ← Volume + input/output selection
    DisplaySlider.tsx  ← Brightness slider
    FocusPanel.tsx     ← Do Not Disturb, Work, Personal, Sleep modes

  /widgets
    WidgetBoard.tsx    ← Notification Center widget panel
    ClockWidget.tsx    ← Analog + digital clock widget
    WeatherWidget.tsx  ← Temperature + condition widget (S/M/L sizes)
    CalendarWidget.tsx ← Current date + upcoming events
    BatteryWidget.tsx  ← Battery % with charging indicator
    NewsWidget.tsx     ← Scrollable headlines
    ReminderWidget.tsx ← Checklist widget
    PhotoWidget.tsx    ← Photo memories widget
    StocksWidget.tsx   ← Stock ticker list

  /launchpad
    Launchpad.tsx      ← Full-screen app grid with pinch/search, folder support

  /boot
    BootScreen.tsx     ← Apple logo + loading bar → fade into desktop
    LoginScreen.tsx    ← User avatar, password field, date/time

  /ui (primitives)
    ContextMenu.tsx    ← Right-click context menu (system + app-specific items)
    Tooltip.tsx        ← macOS-style tooltips
    ScrollBar.tsx      ← macOS-style overlay scrollbars
    Dialog.tsx         ← Modal dialogs (alerts, confirms, save sheets)
    Slider.tsx         ← macOS slider primitive
    Toggle.tsx         ← macOS toggle switch
    Dropdown.tsx       ← macOS-style select / dropdown

/hooks
  useWindowManager.ts  ← Open, close, minimize, maximize, focus windows
  useDock.ts           ← Magnification physics, bounce animation
  useMenuBar.ts        ← Active app tracking, menu state
  useSpotlight.ts      ← Search index + keyboard shortcut (⌘Space)
  useNotifications.ts  ← Notification queue and grouping
  useTime.ts           ← Live clock, date, dynamic wallpaper time-of-day
  useKeyboard.ts       ← Global keyboard shortcuts
  useDrag.ts           ← Window drag logic
  useResize.ts         ← Window resize handles

/store
  windowStore.ts       ← Zustand: window state (open apps, z-index, positions)
  systemStore.ts       ← Zustand: volume, brightness, wifi, battery, focus mode
  notificationStore.ts ← Zustand: notification queue

/styles
  globals.css          ← SF Pro font setup, CSS variables, macOS blur utilities
  macos.css            ← Shared macOS system tokens (colors, radii, shadows, blur)

---

## 🖥️ SYSTEM SETTINGS APP — ALL PAGES

Build every page as a real navigable settings panel:

- Apple ID (avatar, name, iCloud storage bar, devices list)
- Wi-Fi (network list, toggle, details panel)
- Bluetooth (paired devices, available devices, connect/disconnect)
- Network (VPN, Ethernet, Firewall, DNS)
- Notifications (per-app toggles: banners, sounds, badges)
- Sound (output/input device selectors, volume slider, alert sound picker)
- Focus (modes: Do Not Disturb, Work, Personal, Sleep, custom)
- Screen Time (usage bar charts, app limits, downtime schedule)
- General (About, Software Update, AirDrop, Handoff, Login Items, Language)
- Appearance (Light/Dark/Auto, accent color picker, highlight color, sidebar icon size)
- Accessibility (VoiceOver, Zoom, Display, Motion, Captions, Keyboard, Pointer)
- Control Center (toggle which modules appear in menu bar and Control Center)
- Siri & Spotlight (language, voice, search categories)
- Privacy & Security (Location Services, Camera, Microphone, FileVault, Gatekeeper)
- Desktop & Dock (wallpaper picker, dock size/magnification/position, Mission Control)
- Displays (resolution, brightness, True Tone, Night Shift, arrangement)
- Battery (usage chart, Low Power Mode, battery health)
- Keyboard (key repeat, shortcuts editor, input sources, dictation)
- Trackpad (gestures diagram, sensitivity sliders, scroll direction)
- Mouse (tracking speed, scroll, secondary click)
- Printers & Scanners (printer list, add printer)
- Date & Time (24h toggle, timezone map, automatically set)
- Users & Groups (user list with avatars, login options, guest user)
- Passwords (searchable credential list with copy icons)
- Software Update (current version, update progress bar)

---

## 🎨 VISUAL DESIGN SYSTEM

Fonts:
- UI font: SF Pro Display / SF Pro Text (load from Apple CDN or fallback: -apple-system, BlinkMacSystemFont)
- Monospace: SF Mono for Terminal, code blocks

Colors (CSS variables in :root and [data-theme="dark"]):
--macos-bg: #ececec / #1e1e1e
--macos-sidebar: rgba(255,255,255,0.72) / rgba(40,40,40,0.72)
--macos-accent: #007AFF (system blue)
--macos-red: #FF3B30
--macos-yellow: #FFCC00
--macos-green: #28CD41
--macos-surface: rgba(255,255,255,0.6) / rgba(50,50,50,0.6)
--macos-border: rgba(0,0,0,0.08) / rgba(255,255,255,0.08)
--macos-text: #1d1d1f / #f5f5f7
--macos-text-secondary: #6e6e73 / #98989d

Blur / Glass:
- backdrop-filter: blur(20px) saturate(180%) on all panels, sidebars, menu bar, dock
- Use bg-white/60 dark:bg-zinc-800/60 with backdrop-blur-xl pattern throughout

Shadows:
- Windows: box-shadow: 0 22px 70px rgba(0,0,0,0.35)
- Dock: 0 4px 30px rgba(0,0,0,0.25)
- Menu dropdowns: 0 8px 32px rgba(0,0,0,0.2)

Radii:
- Windows: 12px
- Dialogs: 14px
- Buttons: 6px
- Dock icons: 22.37% (Apple icon radius formula)
- Widgets: 16px

Animations:
- Window open: scale(0.85) opacity(0) → scale(1) opacity(1), 220ms cubic-bezier(0.34,1.3,0.64,1)
- Window minimize: scale(1) → scale(0.1) + translate toward dock icon, 300ms
- Dock magnification: CSS transform scale() with neighbor influence, spring physics
- Launchpad: blur + scale transition from desktop
- Notifications: slide in from right, 280ms spring
- Spotlight: fade + scale from center
- Boot: Apple logo fade in, progress bar fill, screen fade to desktop

---

## ⌨️ KEYBOARD SHORTCUTS

⌘ Space         → Spotlight
⌘ Tab           → App switcher (cycling overlay)
⌘ Q             → Quit focused app
⌘ W             → Close focused window
⌘ M             → Minimize window
⌘ H             → Hide app
⌘ F             → Find/search in app
⌘ ,             → Open app Preferences/Settings
⌘ N             → New window/document
F11 / ⌃ ↑       → Mission Control (show all windows)
⌃ ↓             → App Exposé

---

## 🖱️ INTERACTIONS

- Double-click desktop icons → open app window
- Right-click desktop → context menu (New Folder, Get Info, Change Wallpaper…)
- Right-click dock icons → context menu (Open, Options, Show in Finder…)
- Drag windows by title bar (constrained to viewport)
- Resize windows from all edges and corners
- Window traffic lights: red=close, yellow=minimize to dock, green=fullscreen
- Dock magnification on hover (CSS spring physics)
- Dock icon bounce on launch
- Scroll in all panels and window content areas
- Spotlight: live filtering of app list, settings, files
- Control Center tiles: click to toggle, long-press/click arrow to expand

---

## 🔧 STATE MANAGEMENT (Zustand)

windowStore:
  - openWindows: { id, app, title, position, size, zIndex, minimized, maximized }[]
  - focusedWindowId: string
  - actions: openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow, moveWindow, resizeWindow

systemStore:
  - volume: 0–100
  - brightness: 0–100
  - wifi: boolean + networkName
  - bluetooth: boolean
  - battery: { percent, charging }
  - focusMode: 'off' | 'dnd' | 'work' | 'personal' | 'sleep'
  - theme: 'light' | 'dark' | 'auto'
  - accentColor: string

notificationStore:
  - queue: { id, app, title, body, icon, time }[]
  - history: same[]

---

## 📦 DEPENDENCIES

{
  "next": "14",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3",
  "zustand": "^4",
  "framer-motion": "^11",
  "react-rnd": "^10",          ← draggable + resizable windows
  "date-fns": "^3",
  "lucide-react": "latest"     ← system icons (use SF Symbol equivalents)
}

---

## 🚀 BUILD ORDER

1. globals.css + CSS variable design tokens
2. Boot + Login screens
3. Desktop canvas + Wallpaper
4. MenuBar (skeleton → functional)
5. Dock with magnification
6. WindowManager + Window component (drag/resize/z-index)
7. ContextMenu system
8. Spotlight
9. Control Center
10. Notification system (banners + center)
11. Launchpad
12. Apps one by one (Finder first, then Settings, then rest)
13. Widgets board
14. Keyboard shortcut layer
15. Theme switching (Light/Dark)
16. Polish: animations, blur, micro-interactions

---

## ✅ QUALITY REQUIREMENTS

- Every panel uses frosted glass (backdrop-blur + semi-transparent bg)
- All animations use Framer Motion with spring physics
- Window manager correctly handles z-index stacking and focus
- Dock magnification is smooth (CSS scale + neighbor scaling)
- Menu bar clock updates live every second
- Right-click menus appear at cursor position, dismiss on outside click
- All Settings pages are actually navigable with real toggle/slider/picker UI
- System tray icons respond to state (wifi off = strikethrough icon, etc.)
- Responsive only down to 1024px wide (desktop OS, not mobile)
- No lorem ipsum — use realistic macOS-style placeholder content everywhere

Build the complete system. Do not skip any component. Every section listed above must be implemented.