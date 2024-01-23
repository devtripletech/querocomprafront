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
import { redirect } from "next/navigation"
import { currentUser, getUserAction } from "@/app/_actions/user"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Minha conta",
  description: "Gerencie as informações de conta e dados pessoais",
}

export default async function AccountPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const userData = await getUserAction(user?.id_user)

  // TODO
  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  return <AccountCard user={userData.resultado} />
}
