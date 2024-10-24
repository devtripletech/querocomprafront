"use client"

import Link from "next/link"

import { ArrowRightIcon } from "@radix-ui/react-icons"

import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { ProductCard } from "@/components/cards/product-card"

import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
import { HomeBanner } from "@/components/banners/home-banner"
import * as React from "react"
import type { ProductTransaction } from "@/lib/validations/product"

interface HomeContainerProps {
  products: ProductTransaction
}
export function HomeContainer({ products }: HomeContainerProps) {
  return (
    <>
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
              {products.produtos.map((product: any) => (
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
              {products.produtos.map((product: any) => (
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
    </>
  )
}
