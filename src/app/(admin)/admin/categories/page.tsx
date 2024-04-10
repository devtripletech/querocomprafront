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
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RocketIcon } from "lucide-react"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { listProductsByUserIdAction } from "@/app/_actions/product"
import { listCategoriesAction } from "@/app/_actions/categories"
import { CategoriesTableShell } from "@/components/shells/categories-table-shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Manage your products",
}

interface ProductsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  noStore()
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  const transaction = await listCategoriesAction()

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Categorias
          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            href="/admin/categories/new"
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Adicionar categoria
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Gerenciar suas categorias
        </PageHeaderDescription>
      </PageHeader>
      <section className="grid gap-4">
        <CategoriesTableShell transaction={transaction} />
      </section>
    </Shell>
  )
}
