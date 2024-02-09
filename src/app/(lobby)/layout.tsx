import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { currentUser, getUserAction } from "../_actions/user"
import { UserPayload } from "@/lib/validations/auth"

export default async function LobbyLayout({
  children,
}: React.PropsWithChildren) {
  let userData
  const user = (await currentUser()) as UserPayload

  if (user) {
    userData = await getUserAction(user.id_user)
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
