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
import { AccountAccessCard } from "@/components/cards/account-access-card"
import { AccountPersonalCard } from "@/components/cards/account-personal-card"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { redirect } from "next/navigation"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

export default async function AccountPersonalPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  const data = await getUserAction(user?.id_user)

  return (
    <AccountPersonalCard userValid={data.uservalido} user={data.resultado} />
  )
}
