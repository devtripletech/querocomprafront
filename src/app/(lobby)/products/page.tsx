import { type Metadata } from "next"
import { env } from "@/env.mjs"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Products } from "@/components/products"
import { Shell } from "@/components/shells/shell"
import {
  listProductsAction,
  listProductsWithParamsAction,
} from "@/app/_actions/product"
import { productsSearchParamsSchema } from "@/lib/validations/params"
import { listCategoriesAction } from "@/app/_actions/categories"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { redirect } from "next/navigation"
import { UserPayload } from "@/lib/validations/auth"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Products",
  description: "Buy products from our stores",
}

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  let userData
  const user = (await currentUser()) as unknown as UserPayload

  if (user) {
    userData = await getUserAction(user.id_user)
  }

  if (user && !userData?.uservalido) {
    redirect("/dashboard/account/personal")
  }

  const { page, per_page, sort, categories } =
    productsSearchParamsSchema.parse(searchParams)

  // Products transaction
  const pageAsNumber = Number(page)

  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber

  const perPageAsNumber = Number(per_page)

  // Number of items per page
  const limit = isNaN(perPageAsNumber) ? 20 : perPageAsNumber

  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0

  const productsTransaction = await listProductsWithParamsAction({
    limit,
    offset,
    sort,
    categories,
  })

  const listCategories = await listCategoriesAction()

  const pageCount = Math.ceil(productsTransaction.count / limit)

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Produtos</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Negocie produtos em nossas lojas
        </PageHeaderDescription>
      </PageHeader>
      <Products
        products={productsTransaction.produtos}
        pageCount={pageCount}
        categories={listCategories}
      />
    </Shell>
  )
}
