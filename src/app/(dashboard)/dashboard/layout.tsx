import { redirect } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "@/components/layouts/sidebar-nav"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"
import { currentUser } from "@/app/_actions/user"
import { UserPayload } from "@/lib/validations/auth"
import { ReactQueryProvider } from "@/components/react-query-provider"

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const user = (await currentUser()) as UserPayload

  console.log(user)

  if (!user) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-2">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={dashboardConfig.sidebarNav} className="p-1" />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
