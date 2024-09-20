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
import { isNegotiatingAction } from "@/app/_actions/negotiation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

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

  const isNegotiating = await isNegotiatingAction(productId)

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
      {isNegotiating && (
        <Alert variant="destructive" className="w-full max-w-2xl">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            O produto está em negociação e não pode ser atualizado no momento.
            Aguarde a conclusão da negociação.
          </AlertDescription>
        </Alert>
      )}

      <section
        id="user-account-info"
        aria-labelledby="user-account-info-heading"
        className="overflow-hidden"
      >
        <div className="flex  gap-3">
          <Card className="w-full max-w-2xl">
            <CardHeader className="space-y-1"></CardHeader>
            <CardContent>
              <UpdateProductForm
                isNegotiating={isNegotiating}
                product={product}
                categories={categories}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </Shell>
  )
}
