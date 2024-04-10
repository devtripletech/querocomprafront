import * as React from "react"
import { type Metadata } from "next"
import { env } from "@/env.mjs"
import { Shell } from "@/components/shells/shell"
import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MessageTable } from "./_components/message-table"
import { DataTableSkeleton } from "@/components/table-skeleton"

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Negociações",
//   description: "Listar negociações de usuários",
// }

export default async function MessagesPage() {
  return (
    <Shell variant="sidebar">
      <PageHeader>
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm" className="flex-1">
            Negociações
          </PageHeaderHeading>
        </div>
        <PageHeaderDescription size="sm">
          Gerenciar negociações
        </PageHeaderDescription>
      </PageHeader>
      <section className="grid gap-4">
        <React.Suspense fallback={<DataTableSkeleton columnCount={4} />}>
          <MessageTable />
        </React.Suspense>
      </section>
    </Shell>
  )
}
