import * as React from "react"
import { unstable_cache as cache } from "next/cache"
import Link from "next/link"

import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Balancer } from "react-wrap-balancer"

import { productCategories } from "@/config/products"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CategoryCard } from "@/components/cards/category-card"
import { ProductCard } from "@/components/cards/product-card"
import { StoreCard } from "@/components/cards/store-card"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shells/shell"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
import { StoreCardSkeleton } from "@/components/skeletons/store-card-skeleton"
import { Image } from "@/types"
import { currentUser } from "../_actions/user"
import { UserPayload } from "@/lib/validations/auth"
import { redirect } from "next/navigation"
import { listProductsAction } from "../_actions/product"

const img = [
  { id: "1", name: "ar condicionado", url: "/images/ar-condicionado.webp" },
] as Image[]

const productList = [
  {
    id: 1,
    name: "Ar Condicionado Hi Wall LG Dual Inverter Voice 9.000 Btus Frio 220v R-32",
    description: "descrição",
    images: img,
    price: "12",
    inventory: 2,
    rating: 5,
    storeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["2", "3", "4"],
    category: null,
    subcategory: "",
  },
]

export default async function IndexPage() {
  // See the unstable_cache API docs: https://nextjs.org/docs/app/api-reference/functions/unstable_cache

  const user = (await currentUser()) as unknown as UserPayload

  if (!user) {
    redirect("/signin")
  }

  // if (user.uservalido === 0) {
  //   redirect("/dashboard/account/personal")
  // }

  const someProducts = await cache(
    async () => {
      return listProductsAction()
    },
    ["lobby-products"],
    {
      revalidate: 3600,
      tags: ["lobby-products"],
    }
  )()

  // const someStores = await cache(
  //   async () => {
  //     return productList
  //   },
  //   ["lobby-stores"],
  //   {
  //     revalidate: 3600,
  //     tags: ["lobby-stores"],
  //   }
  // )()

  const randomProductCategory =
    productCategories[Math.floor(Math.random() * productCategories.length)]

  return (
    <Shell className="max-w-6xl pt-0 md:pt-0">
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 pt-8 md:pt-10 lg:pt-12"
      >
        <div className="flex items-center gap-4">
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
          <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <React.Suspense
              fallback={Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            >
              {someProducts.map((product: any) => (
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

      <section
        id="random-subcategories"
        aria-labelledby="random-subcategories-heading"
        className="flex flex-wrap items-center justify-center gap-4 pb-6 pt-8 md:pt-10 lg:pt-12"
      >
        {/* {randomProductCategory?.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${randomProductCategory?.title}/${String(
              subcategory.slug
            )}`}
          >
            <Badge variant="secondary" className="rounded px-3 py-1">
              {subcategory.title}
            </Badge>
            <span className="sr-only">{subcategory.title}</span>
          </Link>
        ))} */}
      </section>
    </Shell>
  )
}
