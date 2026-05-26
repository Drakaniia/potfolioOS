"use client"

import * as React from "react"
import { useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import type { WindowAnimationSource } from "@/lib/window-transition"

interface DockProps {
  className?: string
  children: React.ReactNode
  maxAdditionalSize?: number
  iconSize?: number
}

interface DockIconProps {
  className?: string
  appId?: string
  src?: string
  href?: string
  name: string
  active?: boolean
  launching?: boolean
  minimized?: boolean
  onOpen?: (source?: WindowAnimationSource) => void
  onContextMenu?: (event: React.MouseEvent<HTMLLIElement>) => void
  handleIconHover?: (e: React.MouseEvent<HTMLLIElement>) => void
  children?: React.ReactNode
  iconSize?: number
}

type ScaleValueParams = [number, number]

export const scaleValue = function (
  value: number,
  from: ScaleValueParams,
  to: ScaleValueParams
): number {
  const scale = (to[1] - to[0]) / (from[1] - from[0])
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0]
  return Math.floor(capped * scale + to[0])
}

export function DockIcon({
  className,
  appId,
  src,
  href,
  name,
  active,
  launching,
  minimized,
  onOpen,
  onContextMenu,
  handleIconHover,
  children,
  iconSize,
}: DockIconProps) {
  const ref = useRef<HTMLLIElement | null>(null)

  const getIconSource = (): WindowAnimationSource | undefined => {
    const rect = ref.current?.getBoundingClientRect()

    if (!rect) {
      return undefined
    }

    return {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    }
  }

  return (
    <>
      <style jsx>
        {`
          .icon:hover + .icon {
            width: calc(
              var(--icon-size) * 1.33 + var(--dock-offset-right, 0px)
            );
            height: calc(
              var(--icon-size) * 1.33 + var(--dock-offset-right, 0px)
            );
            margin-top: calc(
              var(--icon-size) * -0.33 + var(--dock-offset-right, 0) * -1
            );
          }

          .icon:hover + .icon + .icon {
            width: calc(
              var(--icon-size) * 1.17 + var(--dock-offset-right, 0px)
            );
            height: calc(
              var(--icon-size) * 1.17 + var(--dock-offset-right, 0px)
            );
            margin-top: calc(
              var(--icon-size) * -0.17 + var(--dock-offset-right, 0) * -1
            );
          }

          .icon:has(+ .icon:hover) {
            width: calc(var(--icon-size) * 1.33 + var(--dock-offset-left, 0px));
            height: calc(
              var(--icon-size) * 1.33 + var(--dock-offset-left, 0px)
            );
            margin-top: calc(
              var(--icon-size) * -0.33 + var(--dock-offset-left, 0) * -1
            );
          }

          .icon:has(+ .icon + .icon:hover) {
            width: calc(var(--icon-size) * 1.17 + var(--dock-offset-left, 0px));
            height: calc(
              var(--icon-size) * 1.17 + var(--dock-offset-left, 0px)
            );
            margin-top: calc(
              var(--icon-size) * -0.17 + var(--dock-offset-left, 0) * -1
            );
          }
        `}
      </style>
      <li
        ref={ref}
        style={
          {
            transition:
              "width, height, margin-top, cubic-bezier(0.25, 1, 0.5, 1) 150ms",
            "--icon-size": `${iconSize}px`,
          } as React.CSSProperties
        }
        onMouseMove={handleIconHover}
        onContextMenu={onContextMenu}
        className={cn(
          "icon group/li flex h-[var(--icon-size)] w-[var(--icon-size)] items-center justify-center px-[calc(var(--icon-size)*0.075)] hover:-mt-[calc(var(--icon-size)/2)] hover:h-[calc(var(--icon-size)*1.5)] hover:w-[calc(var(--icon-size)*1.5)] [&_img]:object-contain",
          className
        )}
      >
        <button
          type="button"
          className="group/a relative aspect-square w-full rounded-[22.37%] p-0.5 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-md after:shadow-zinc-800/10 focus:outline-none focus:ring-2 focus:ring-[var(--macos-accent)]"
          data-dock-app={appId}
          data-launching={launching}
          data-minimized={minimized}
          onClick={(event) => {
            if (onOpen) {
              event.preventDefault()
              onOpen(getIconSource())
            } else if (href) {
              window.location.hash = href.replace(/^#/, "")
            }
          }}
        >
          <span className="macos-menu-dropdown pointer-events-none absolute top-[-42px] left-1/2 -translate-x-1/2 px-2 py-1 text-[12px] whitespace-nowrap text-[var(--macos-text)] opacity-0 transition-opacity duration-200 group-hover/li:opacity-100">
            {name}
          </span>
          {src ? (
            <Image
              src={src}
              alt={name}
              width={iconSize ?? 55}
              height={iconSize ?? 55}
              className="h-full w-full rounded-[inherit] object-contain"
            />
          ) : (
            children
          )}
          {active ? (
            <span
              className={cn(
                "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--macos-text)]",
                minimized && "opacity-40"
              )}
              aria-hidden="true"
            />
          ) : null}
        </button>
      </li>
    </>
  )
}

export function Dock({
  className,
  children,
  maxAdditionalSize = 5,
  iconSize = 55,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement | null>(null)

  const handleIconHover = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return
    const mousePos = e.clientX
    const iconPosLeft = e.currentTarget.getBoundingClientRect().left
    const iconWidth = e.currentTarget.getBoundingClientRect().width

    const cursorDistance = (mousePos - iconPosLeft) / iconWidth
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    )

    dockRef.current.style.setProperty(
      "--dock-offset-left",
      `${offsetPixels * -1}px`
    )

    dockRef.current.style.setProperty(
      "--dock-offset-right",
      `${offsetPixels}px`
    )
  }

  return (
    <nav ref={dockRef} role="navigation" aria-label="Main Dock">
      <ul
        className={cn(
          "macos-dock flex items-center p-1",
          className
        )}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement<DockIconProps>(child)
            ? React.cloneElement(child as React.ReactElement<DockIconProps>, {
                handleIconHover,
                iconSize,
              })
            : child
        )}
      </ul>
    </nav>
  )
}
