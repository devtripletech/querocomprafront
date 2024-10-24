import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AddProductForm } from "@/components/forms/add-product-form"
import { currentUser, getUserAction } from "@/app/_actions/user"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { listCategoriesAction } from "@/app/_actions/categories"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Product",
  description: "Add a new product",
}

interface NewProductPageProps {
  params: {
    storeId: string
  }
}

export default async function NewProductPage({ params }: NewProductPageProps) {
  const storeId = Number(params.storeId)

  const user = await currentUser()

  if (!user) {
    redirect("/login")
  }
  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  const categories = await listCategoriesAction()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Adicionar produto</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Adicionar novo produto
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="overflow-hidden"
      >
        <div className="flex  gap-3">
          <Card className="w-full max-w-2xl">
            <CardHeader className="space-y-1"></CardHeader>
            <CardContent>
              <AddProductForm categories={categories} />
            </CardContent>
          </Card>
        </div>
      </section>
    </Shell>
  )
}
