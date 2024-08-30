"use client"
import React from "react"
import Link from "next/link"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <AspectRatio ratio={16 / 9} className="hidden lg:block">
        <Icons.bgLogin aria-hidden="true" className="w-full" />
      </AspectRatio>
      <main className="container absolute top-1/2 flex flex-col items-center justify-center col-span-1 -translate-y-1/3 lg:static lg:top-0 lg:flex lg:translate-y-0 lg:col-span-1">
        <Link
          href="/"
          className="flex items-center text-lg font-bold tracking-tight lg:hidden"
        >
          <Icons.logo className="h-20 text-black" aria-hidden="true" />
        </Link>
        {children}
      </main>
    </div>
  )
}
