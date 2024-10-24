import type { Metadata } from "next"
import { env } from "@/env"

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
    redirect("/login")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  return <AccountCard user={userData.resultado} />
}
