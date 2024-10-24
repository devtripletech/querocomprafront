import type { Metadata } from "next"
import { env } from "@/env"

import { AccountPersonalCard } from "@/components/cards/account-personal-card"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { redirect } from "next/navigation"

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
