import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"

import { Shell } from "@/components/shells/shell"
import { currentUser } from "@/app/_actions/user"
import { UserPayload } from "@/lib/validations/auth"
import { RegisterUserContainer } from "./_components/register-user-container"
import { SearchParams } from "@/types"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cadastro",
  description: "",
}

export default async function SignUpPage() {
  const user = (await currentUser()) as unknown as UserPayload

  if (user && user.uservalido === 0) {
    redirect("/dashboard/account/personal")
  }

  return (
    <Shell className="max-w-xl">
      <RegisterUserContainer />
    </Shell>
  )
}
