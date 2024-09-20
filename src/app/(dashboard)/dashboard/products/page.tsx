import * as React from "react"
import { type Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { SeedProducts } from "@/components/seed-products-button"
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
import { ProductsTableShell } from "@/components/tables/products-table"

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
    redirect("/login")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }

  const transaction = await listProductsByUserIdAction(user?.id_user)

  const categories = await listCategoriesAction()

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Produtos
          </PageHeaderHeading>
          <Link
            aria-label="Create store"
            href="/dashboard/products/new"
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Adicionar produto
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Gerenciar seus produtos
        </PageHeaderDescription>
      </PageHeader>
      {/* <Alert>
        <RocketIcon className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Você está atualmente no plano{" "}
          <span className="font-semibold">T1</span>. Você pode criar até{" "}
          <span className="font-semibold">100</span> produtos.
        </AlertDescription>
      </Alert> */}
      <section className="grid gap-3">
        <ProductsTableShell transaction={transaction} categories={categories} />
      </section>
    </Shell>
  )
}
