---
version: "alpha"
name: macOS Portfolio OS
description: A macOS-inspired design system for a portfolio operating system interface
colors:
  primary: "#007aff"
  secondary: "#5ac8fa"
  accent: "#ff3b30"
  background: "url('/wallpaper.jpg')"
  surface: "rgba(255,255,255,0.9)"
  border: "rgba(0,0,0,0.1)"
  text-primary: "#000000"
  text-secondary: "#666666"
  text-tertiary: "#999999"
  on-primary: "#ffffff"
  on-accent: "#ffffff"
  traffic-light-red: "#ff5f57"
  traffic-light-yellow: "#ffbd2e"
  traffic-light-green: "#28ca42"
typography:
  system-ui:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
  h1:
    fontFamily: "{typography.system-ui.fontFamily}"
    fontSize: 24px
    fontWeight: 600
  h2:
    fontFamily: "{typography.system-ui.fontFamily}"
    fontSize: 20px
    fontWeight: 600
  body:
    fontFamily: "{typography.system-ui.fontFamily}"
    fontSize: 14px
    fontWeight: 400
  caption:
    fontFamily: "{typography.system-ui.fontFamily}"
    fontSize: 12px
    fontWeight: 400
  menu-item:
    fontFamily: "{typography.system-ui.fontFamily}"
    fontSize: 14px
    fontWeight: 400
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  desktop:
    backgroundImage: "{colors.background}"
    backgroundSize: "cover"
    backgroundPosition: "center"
  window:
    backgroundColor: "{colors.surface}"
    borderColor: "rgba(0,0,0,0.1)"
    rounded: "{rounded.lg}"
    shadow: "0 8px 32px rgba(0,0,0,0.12)"
    backdropFilter: "blur(10px)"
  titlebar:
    backgroundColor: "rgba(255,255,255,0.8)"
    backdropFilter: "blur(20px)"
    height: 36px
    padding: "0 {spacing.md}"
  traffic-light:
    size: 12px
    spacing: "{spacing.sm}"
    rounded: "{rounded.full}"
    shadow: "0 1px 3px rgba(0,0,0,0.2)"
  menu-bar:
    backgroundColor: "rgba(255,255,255,0.72)"
    backdropFilter: "blur(20px) saturate(180%)"
    height: 24px
    borderBottom: "1px solid rgba(0,0,0,0.1)"
  menu-item:
    padding: "4px {spacing.md}"
    rounded: "{rounded.sm}"
    typography: "{typography.menu-item}"
  menu-item-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  menu-dropdown:
    backgroundColor: "rgba(255,255,255,0.95)"
    backdropFilter: "blur(20px)"
    shadow: "0 8px 24px rgba(0,0,0,0.15)"
    rounded: "{rounded.md}"
    padding: "{spacing.xs} 0"
  folder-icon:
    backgroundColor: "#0071e3"
    textColor: "{colors.on-primary}"
    size: 64px
    rounded: "{rounded.lg}"
    shadow: "0 2px 8px rgba(0,113,227,0.3)"
  search-bar:
    backgroundColor: "rgba(245,245,247,0.8)"
    borderColor: "rgba(0,0,0,0.1)"
    rounded: "{rounded.md}"
    padding: "6px {spacing.sm}"
    placeholderColor: "{colors.text-tertiary}"
  path-bar:
    backgroundColor: "rgba(245,245,247,0.6)"
    textColor: "{colors.text-secondary}"
    padding: "{spacing.xs} {spacing.md}"
    separatorColor: "{colors.text-tertiary}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "6px {spacing.md}"
    shadow: "0 2px 8px rgba(0,122,255,0.3)"
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    shadow: "0 4px 12px rgba(90,200,250,0.4)"
---

## Overview
A macOS-inspired design system for a portfolio operating system interface. This design captures the essence of Apple's human interface guidelines while being optimized for web implementation. The system emphasizes clarity, consistency, and subtle visual polish with a beautiful wallpaper background.

## Colors
The palette is rooted in macOS's signature blue accent with high-contrast neutrals for readability, designed to work beautifully with the wallpaper background.

- **Primary (#007aff):** System blue for primary actions, links, and selections
- **Secondary (#5ac8fa):** Lighter blue for secondary actions and hover states
- **Accent (#ff3b30):** System red for destructive actions and traffic light close button
- **Background:** Wallpaper image for desktop background
- **Surface (rgba 255,255,255,0.9):** Semi-transparent white for windows and overlays
- **Border (rgba 0,0,0,0.1):** Subtle transparent borders
- **Text Primary (#000000):** High contrast black for primary text
- **Text Secondary (#666666):** Medium gray for secondary text and metadata
- **Text Tertiary (#999999):** Light gray for disabled states and subtle hints

The traffic light colors match macOS window controls exactly for authentic appearance. The semi-transparent surfaces allow the wallpaper to show through while maintaining readability.

## Typography
Uses Apple's system font stack for authentic macOS appearance with clear hierarchy.

- **System UI:** Base font stack including SF Pro Display for authentic macOS typography
- **H1 (22px, 600):** Window titles and major headings
- **H2 (18px, 600):** Section headers and important labels
- **Body (13px, 400):** Default text for content and labels
- **Caption (11px, 400):** Small text for metadata and helper text

Font sizes and weights follow macOS conventions for optimal readability.

## Spacing
Consistent spacing scale based on 4px grid system for harmonious layouts.

- **XS (4px):** Tight spacing between related elements
- **SM (8px):** Default spacing for most UI elements
- **MD (16px):** Section spacing and padding
- **LG (24px):** Component separation and large padding
- **XL (32px):** Major section breaks

## Rounded Corners
Consistent border radius system following macOS design principles.

- **SM (4px):** Small UI elements like buttons and inputs
- **MD (6px):** Medium components like search bars
- **LG (8px):** Large components like windows and folders
- **XL (12px):** Extra large elements
- **Full (9999px):** Perfect circles for traffic lights

## Components

### Window
The main window container with macOS-style titlebar and content area. Features subtle shadow and rounded corners for depth.

### Titlebar
Fixed height titlebar with traffic light controls and window title. Semi-transparent background matching macOS Big Sur design.

### Traffic Lights
Authentic macOS window controls with exact colors and spacing. Red (close), yellow (minimize), green (maximize) in perfect circles.

### Menu Bar
Global menu bar with translucent background and backdrop blur effect. Fixed height matching macOS specifications.

### Menu Items
Dropdown menu items with hover states and consistent padding. Blue highlight on hover matching macOS behavior.

### Folder Icons
Blue folders with rounded corners and consistent sizing. Designed to be recognizable yet modern.

### Search Bar
Rounded search input with subtle border and padding. Matches macOS search field styling.

### Path Bar
Breadcrumb navigation with gray background and arrow separators. Provides clear location context.

### Buttons
Primary action buttons with blue background and white text. Hover states with lighter blue for visual feedback.

## Implementation Notes
This design system prioritizes web implementation while maintaining macOS authenticity. All colors, spacing, and typography are optimized for digital displays and follow Apple's human interface guidelines where applicable to web technologies.


