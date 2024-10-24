import * as React from "react"
import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { Shell } from "@/components/shells/shell"
import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { getCategories } from "@/lib/actions/get-categories"
import { CategoriesTable } from "@/components/tables/categories-table"

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

  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  const productsPromise = getCategories()

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
      <section className="grid gap-3">
        <CategoriesTable promise={productsPromise} />
      </section>
    </Shell>
  )
}
