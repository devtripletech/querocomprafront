import type { Metadata } from "next"
import { env } from "@/env.mjs"

import { UserProfile } from "@/components/auth/user-profile"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { SidebarSubNav } from "@/components/layouts/sidebar-sub-nav"
import { accountDashboardConfig } from "@/config/dashboard"
import { AccountCard } from "@/components/cards/account-card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Minha conta",
  description: "Gerencie as informações de conta e dados pessoais",
}

export default function DashboardAccountLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Minha conta</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Gerencie as informações de conta e dados pessoais
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="w-full overflow-hidden"
      >
        <div className="flex gap-4">
          <SidebarSubNav items={accountDashboardConfig.sidebarNav} />
          {children}
        </div>
      </section>
    </Shell>
  )
}
