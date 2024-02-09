import * as React from "react"
import { type Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { SeedProducts } from "@/components/seed-products-button"
import { ProductsTableShell } from "@/components/shells/products-table-shell"
import { Product } from "@/lib/validations/product"

import { Shell } from "@/components/shells/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { formatDistanceToNow } from "date-fns"
import {
  getNegotiationsAction,
  getNegotiationsPartAction,
} from "@/app/_actions/negotiation"
import { NegotiationTable } from "@/components/tables/negotiation-table"
import { SidebarNegotiationNav } from "@/components/layouts/sidebar-negotiation-nav"
import { negotiationDashboardConfig } from "@/config/dashboard"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Manage your products",
}

type Status = "emNegociacao" | "negociacaoFinalizada"

const statusMap: Record<Status, string> = {
  emNegociacao: "Em negociação",
  negociacaoFinalizada: "Negociação finalizada",
}

interface NegotiationsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function NegotiationsPage() {
  noStore()
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }

  const negotiations = await getNegotiationsPartAction(user.id_user)

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Negociações
          </PageHeaderHeading>
        </div>
        <PageHeaderDescription size="sm">
          Gerenciar suas Negociações
        </PageHeaderDescription>
      </PageHeader>
      <section className="grid gap-4">
        <NegotiationTable items={negotiations} />
      </section>
    </Shell>
  )
}
