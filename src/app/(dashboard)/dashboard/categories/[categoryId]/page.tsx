import { type Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env.mjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UpdateProductForm } from "@/components/forms/update-product-form"
import { ProductPager } from "@/components/pagers/product-pager"
import { getProductByIdAction } from "@/app/_actions/product"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { listCategoriesAction } from "@/app/_actions/categories"
import { currentUser, getUserAction } from "@/app/_actions/user"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Product",
  description: "Manage your product",
}

interface UpdateProductPageProps {
  params: {
    productId: string
  }
}

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  const productId = params.productId

  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  const userData = await getUserAction(user?.id_user)

  if (!userData.uservalido) {
    redirect("/dashboard/account/personal")
  }
  const product = await getProductByIdAction(productId)

  if (!product) {
    notFound()
  }

  const categories = await listCategoriesAction()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="account-header"
        aria-labelledby="account-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Atualizar produto</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Atualize as informações do seu produto ou exclua-as
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
              <UpdateProductForm product={product} categories={categories} />
            </CardContent>
          </Card>
        </div>
      </section>
    </Shell>
  )
}
