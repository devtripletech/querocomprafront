import * as React from "react"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

import { DataTableSkeleton } from "@/components/table-skeleton"
import { NegotiationTable } from "./_components/negotiation-table"
import { getMessagesNegotiationAction } from "@/app/_actions/negotiation"
import { NegotiationTableFilters } from "./_components/negotiation-table-filters"

// export const metadata: Metadata = {
//   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
//   title: "Negociações",
//   description: "Listar negociações de usuários",
// }

export default async function NegotiationsPage() {
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
      <section className="grid gap-3">
        <NegotiationTableFilters />
        <React.Suspense fallback={<DataTableSkeleton columnCount={4} />}>
          <NegotiationTable />
        </React.Suspense>
      </section>
    </Shell>
  )
}
