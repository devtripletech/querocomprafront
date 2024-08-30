import * as React from "react"
import { unstable_cache as cache } from "next/cache"
import Link from "next/link"

import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Balancer } from "react-wrap-balancer"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/cards/product-card"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
import { Image } from "@/types"
import { currentUser, getUserAction } from "../_actions/user"
import { UserPayload } from "@/lib/validations/auth"
import { redirect } from "next/navigation"
import {
  listProductsAction,
  listProductsWithParamsAction,
} from "../_actions/product"

export default async function IndexPage() {
  // See the unstable_cache API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_cache
  const user = (await currentUser()) as unknown as UserPayload

  const userData = await getUserAction(user?.id_user)

  // if (user && !userData.uservalido) {
  //   redirect("/dashboard/account/personal")
  // }

  const limit = 8
  const offset = 0

  const allProducts = await listProductsWithParamsAction({ limit, offset })

  // const someProducts = await cache(
  //   async () => {
  //     const allProducts = await listProductsWithParamsAction({ limit, offset })

  //     return allProducts.produtos
  //   },
  //   ["lobby-products"],
  //   {
  //     revalidate: 3600,
  //     tags: ["lobby-products"],
  //   }
  // )()

  return (
    <Shell className="max-w-6xl pt-0 md:pt-0">
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 pt-8 md:pt-10 lg:pt-12"
      >
        <div className="flex items-center gap-3">
          <div className="max-w-[58rem] flex-1 space-y-1">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] md:text-4xl">
              Serviços ou Produtos
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7"></Balancer>
          </div>
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "hidden sm:flex",
              })
            )}
          >
            Ver todos
            <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">ver todos</span>
          </Link>
        </div>
        <div className="space-y-8">
          <div className="grid gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <React.Suspense
              fallback={Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            >
              {allProducts.produtos.map((product: any) => (
                <ProductCard key={product.id_produto} product={product} />
              ))}
            </React.Suspense>
          </div>
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "mx-auto flex w-fit sm:hidden",
              })
            )}
          >
            Ver todos os produtos
            <ArrowRightIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Ver todos os produtos</span>
          </Link>
        </div>
      </section>
    </Shell>
  )
}
