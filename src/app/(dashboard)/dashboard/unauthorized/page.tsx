import * as React from "react"
import { type Metadata } from "next"
import { env } from "@/env.mjs"
import { ProductsTableShell } from "@/components/shells/products-table-shell"
import { Shell } from "@/components/shells/shell"
import Link from "next/link"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ErrorCard } from "@/components/cards/error-card"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Unauthorized",
  description: "Pagina não autorizada",
}

export default function UnauthorizedPage() {
  return (
    <Shell variant="sidebar">
      <section className="grid gap-4">
        <ErrorCard
          title="Não autorizado"
          description="Você não tem permissão para acessar esta página."
          retryLink={`/`}
          retryLinkText="Voltar para o início"
        />
      </section>
    </Shell>
  )
}