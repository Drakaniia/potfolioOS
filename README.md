# Portfolio OS

A Mac-inspired portfolio operating system built with Next.js and modern web technologies.

## Overview

Portfolio OS reimagines the traditional portfolio website as an interactive desktop experience, drawing inspiration from macOS design principles. This project showcases creative development skills through an immersive, desktop-like interface.

## Features

- **Mac-inspired UI**: Authentic macOS design patterns and interactions
- **Desktop Environment**: Window management, dock, and system tray
- **Interactive Portfolio**: Projects and experience presented as desktop applications
- **Modern Stack**: Built with Next.js, TypeScript, and Tailwind CSS
- **Responsive Design**: Optimized for both desktop and mobile experiences

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Icons**: Lucide React
- **Fonts**: System fonts with macOS-inspired typography

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # Reusable UI components
├── desktop/            # Desktop environment components
├── lib/                # Utility functions and configurations
└── styles/             # Global styles and design tokens
```

## Design System

The project follows a comprehensive design system inspired by macOS:

- **Color Palette**: System colors matching macOS themes
- **Typography**: SF Pro-inspired font hierarchy
- **Spacing**: Consistent spacing using CSS variables
- **Components**: Reusable UI components with Mac-like interactions

## Development

This project uses [`bun`](https://bun.sh) as the package manager for faster development and optimized builds.

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build

# Start production server
bun start
```

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
