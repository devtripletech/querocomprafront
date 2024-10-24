import * as React from "react"
import { type Metadata } from "next"

import { redirect } from "next/navigation"
import { env } from "@/env"

import { Shell } from "@/components/shells/shell"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { getNegotiationsAction } from "@/app/_actions/negotiation"
import { NegotiationTable } from "@/components/tables/negotiation-table"

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

export default async function NegotiationsMyPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  let negotiations
  try {
    negotiations = await getNegotiationsAction()
  } catch (error) {
    redirect("/login")
  }

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
      <section className="grid gap-3">
        <NegotiationTable items={negotiations} />
      </section>
    </Shell>
  )
}
