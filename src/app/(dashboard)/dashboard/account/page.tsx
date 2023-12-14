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

export default function AccountPage() {
  return <AccountCard />
}
