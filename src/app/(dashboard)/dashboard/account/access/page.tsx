import type { Metadata } from "next"
import { env } from "@/env"

import { AccountAccessCard } from "@/components/cards/account-access-card"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

export default async function AccountAccessPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  return <AccountAccessCard email={userData.resultado.email ?? ""} />
}
