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

import { currentUser } from "@/app/_actions/user"

import { UserTable } from "./_components/user-table"
import { UserTableFilters } from "./_components/user-table-filters"

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
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Usuários
          </PageHeaderHeading>
          <Link
            aria-label="Registrar usuário"
            href="#"
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
      <section className="grid gap-3">
        <UserTableFilters />
        {/* <React.Suspense fallback={<DataTableSkeleton columnCount={4} />}> */}
        <UserTable />
        {/* </React.Suspense> */}
      </section>
    </Shell>
  )
}
