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
import { HomeBanner } from "@/components/banners/home-banner"

export default async function IndexPage() {
  const limit = 5
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
    <Shell className="container pt-0 md:pt-0">
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-3 pt-8 md:pt-10 lg:pt-12"
      >
        <div className="flex items-center">
          <div className="max-w-[58rem] flex-1">
            <h2 className="text-foreground text-xl font-medium leading-[1.1] md:text-lg">
              Em destaque
            </h2>
            <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7"></Balancer>
          </div>
        </div>
        <div className="space-y-8">
          <div className="grid gap-6 xs:grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
            <React.Suspense
              fallback={Array.from({ length: 5 }).map((_, i) => (
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
      <HomeBanner />

      <section
        id="categories-products"
        aria-labelledby="categories-products-heading"
        className="space-y-3"
      >
        <div className="flex items-center">
          <div className="max-w-[58rem] flex-1">
            <h2 className="text-foreground text-xl font-medium leading-[1.1] md:text-lg">
              Veja por categorias
            </h2>
            <h3 className="text-foreground text-xl font-medium leading-[1.1] md:text-lg pt-2">
              Automotivo
            </h3>
          </div>
        </div>
        <div className="space-y-8">
          <div className="grid gap-6 xs:grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
            <React.Suspense
              fallback={Array.from({ length: 5 }).map((_, i) => (
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
