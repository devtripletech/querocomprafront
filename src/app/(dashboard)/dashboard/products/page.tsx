import * as React from "react"
import { type Metadata } from "next"
import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import { env } from "@/env.mjs"
import { dashboardProductsSearchParamsSchema } from "@/lib/validations/params"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { SeedProducts } from "@/components/seed-products-button"
import { ProductsTableShell } from "@/components/shells/products-table-shell"
import { Product } from "@/lib/validations/product"
import { listProductsAction } from "@/app/_actions/product"
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
  const storeId = Number(params.storeId)

  // Parse search params using zod schema
  const { page, per_page, sort, name, category, from, to } =
    dashboardProductsSearchParamsSchema.parse(searchParams)

  const store = {} as any

  if (!store) {
    notFound()
  }

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page)
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber
  // Number of items per page
  const perPageAsNumber = Number(per_page)
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0
  // Column and order to sort by
  const [column, order] = (sort?.split(".") as [
    keyof Product | undefined,
    "asc" | "desc" | undefined
  ]) ?? ["createdAt", "desc"]

  // const categories = (category?.split(".") as Product["category"][]) ?? []

  const fromDay = from ? new Date(from) : undefined
  const toDay = to ? new Date(to) : undefined

  // Transaction is used to ensure both queries are executed in a single transaction
  noStore()

  const transaction = await listProductsAction()

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
      <Alert>
        <RocketIcon className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Você está atualmente no plano{" "}
          <span className="font-semibold">T1</span>. Você pode criar até{" "}
          <span className="font-semibold">100</span> produtos.
        </AlertDescription>
      </Alert>
      <section className="grid gap-4">
        <ProductsTableShell transaction={transaction} limit={limit} />
      </section>
    </Shell>
  )
}
