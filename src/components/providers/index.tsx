"use client"

import React from "react"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { QueryProvider } from "./query-provider"
import { SessionProvider } from "./session-provider"

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryProvider>
      <SessionProvider>
        {children}
        <TailwindIndicator />
      </SessionProvider>
    </QueryProvider>
  )
}
