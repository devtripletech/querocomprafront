import { Shell } from "@/components/shells/shell"

import { listProductsWithParamsAction } from "../_actions/product"
import { HomeContainer } from "./_components/home-container"

export default async function IndexPage() {
  const limit = 5
  const offset = 0

  const allProducts = await listProductsWithParamsAction({ limit, offset })

  return (
    <Shell className="container pt-0 md:pt-0">
      <HomeContainer products={allProducts} />
    </Shell>
  )
}
