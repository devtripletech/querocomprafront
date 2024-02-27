import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { currentUser, getUserAction } from "../_actions/user"
import { UserPayload } from "@/lib/validations/auth"

export default async function LobbyLayout({
  children,
}: React.PropsWithChildren) {
  const user = (await currentUser()) as UserPayload

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
