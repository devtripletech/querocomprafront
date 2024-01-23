import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddProductForm } from "@/components/forms/add-product-form"
import { currentUser } from "@/app/_actions/user"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { AddCategoryForm } from "@/components/forms/add-category-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Product",
  description: "Add a new product",
}

interface NewCategoryPageProps {
  params: {
    storeId: string
  }
}

export default async function NewCategoryPage({
  params,
}: NewCategoryPageProps) {
  const storeId = Number(params.storeId)

  const user = await currentUser()

  if (!user) {
    redirect("/sigin")
  }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Adicionar categoria</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Adicionar nova categoria
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="overflow-hidden"
      >
        <div className="flex  gap-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="space-y-1"></CardHeader>
            <CardContent>
              <AddCategoryForm userId={user.id_user} />
            </CardContent>
          </Card>
        </div>
      </section>
    </Shell>
  )
}
