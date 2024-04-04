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
import { currentUser, getUserAction, getUsers } from "@/app/_actions/user"
import { listProductsByUserIdAction } from "@/app/_actions/product"
import { listCategoriesAction } from "@/app/_actions/categories"
import { UsersTableShell } from "./_components/users-table-shell"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Usuários",
  description: "Listar usuários",
}

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  noStore()
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const users = await getUsers()

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Usuários
          </PageHeaderHeading>
          <Link
            aria-label="Registrar usuário"
            href="/dashboard/products/new"
            className={cn(
              buttonVariants({
                size: "sm",
              })
            )}
          >
            Adicionar usuário
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Gerenciar usuários
        </PageHeaderDescription>
      </PageHeader>

      <section className="grid gap-4">
        <UsersTableShell users={users} />
      </section>
    </Shell>
  )
}
