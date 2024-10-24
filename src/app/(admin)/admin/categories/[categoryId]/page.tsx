import { type Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { env } from "@/env"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
    redirect("/login")
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
        <div className="flex  gap-3">
          <Card className="w-full max-w-2xl">
            <CardHeader className="space-y-1"></CardHeader>
            <CardContent>
              {/* <UpdateCategorytForm product={product} categories={categories}  /> */}
            </CardContent>
          </Card>
        </div>
      </section>
    </Shell>
  )
}
