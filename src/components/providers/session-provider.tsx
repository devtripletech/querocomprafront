"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

export const SessionProvider = ({ children }: React.PropsWithChildren) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
