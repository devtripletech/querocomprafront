import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { currentUser, getUserAction } from "../_actions/user"

export default async function LobbyLayout({
  children,
}: React.PropsWithChildren) {
  let userData
  const user = await currentUser()

  if (user) {
    userData = await getUserAction(user.id_user)
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={userData?.resultado} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
