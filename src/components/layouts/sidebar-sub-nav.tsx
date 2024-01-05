"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItem } from "@/types"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { ChevronRightIcon } from "lucide-react"

export interface SidebarSubNavProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
}

export function SidebarSubNav({
  items,
  className,
  ...props
}: SidebarSubNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-md border py-4 w-[300px] h-min",
        className
      )}
      {...props}
    >
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon

        return item.href ? (
          <Link
            className="w-[300px]"
            aria-label={item.title}
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center px-4 py-2 hover:text-foreground",
                item.href === String(pathname)
                  ? "border-l-2 border-solid border-foreground bg-muted font-semibold text-foreground"
                  : "font-semibold text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="mr-2 h-5 w-5" />
              <span className="flex-1">{item.title}</span>
              <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}
