import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import * as React from "react"
import { env } from "@/env.mjs"

import { cn, formatPrice, toTitleCase, truncate } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { ProductCard } from "@/components/cards/product-card"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { Image } from "@/types"
import {
  getProductByIdAction,
  listProductsWithParamsAction,
} from "@/app/_actions/product"
import { StoredFile } from "@/config/products"
import { listCategoriesAction } from "@/app/_actions/categories"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { UserPayload } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  createNegotiationAction,
  isNegotiatingAction,
} from "@/app/_actions/negotiation"
import { CreateNegotiationButton } from "@/components/buttons/create-negotiation-button"
import { ArrowRightIcon } from "lucide-react"
import { ProductCardSkeleton } from "@/components/skeletons/product-card-skeleton"
import { StartNegotiationDialog } from "./_components/start-negotiation-dialog"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.productId

  const user = (await currentUser()) as unknown as UserPayload

  const isAuthenticated = !!user

  const userData = await getUserAction(user?.id_user)

  if (user && !userData.uservalido) {
    redirect("/dashboard/account/personal")
  }

  const product = await getProductByIdAction(productId)

  const categories = await listCategoriesAction()

  function getCategoryName(categoryId: number) {
    return (
      (categories.find((c) => c.ID_Categoria === categoryId)
        ?.Descricao as string) ?? "sem categoria"
    )
  }
  if (!product) {
    notFound()
  }

  const images = [] as StoredFile[]

  if (product.img_01) {
    images.push({ id: "1", name: "", url: product.img_01 })
  }

  if (product.img_02) {
    images.push({ id: "2", name: "", url: product.img_02 })
  }

  if (product.img_03) {
    images.push({ id: "3", name: "", url: product.img_03 })
  }

  const limit = 5
  const offset = 0

  const allProducts = await listProductsWithParamsAction({ limit, offset })

  return (
    <Shell>
      <Breadcrumbs
        className="mt-8 mb-2"
        segments={[
          {
            title: "Produtos",
            href: "/products",
          },
          {
            title: toTitleCase(getCategoryName(Number(product.id_categoria))),
            href:
              product.id_categoria !== "0"
                ? `/products?categories=${product.id_categoria}`
                : "",
          },
          {
            title: truncate(product.nome, 80),
            href: `/product/${product.id_produto}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2 border rounded-lg"
          images={images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-3 md:w-1/2 md:mr-8 mt-12">
          <div className="space-y-6">
            <h2 className="line-clamp-1 text-4xl font-medium text-black-dark">
              {product.nome}
            </h2>
            <div>
              <h3 className="text-black-light text-base pb-2">Descrição</h3>
              <span className="font-light text-xl text-black-dark">
                {product.descricao && product.descricao.trim() !== ""
                  ? product.descricao
                  : "Nenhuma descrição está disponível para este produto."}
              </span>
            </div>
            <Separator className="mt-5" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-black-light text-base pb-1">
                  Preço sugerido
                </p>
                <p className="text-3xl text-black-dark  font-medium">
                  {formatPrice(product.valor)}
                </p>
                {/* <p className="pt-4 text-muted-foreground">
                  {`Em estoque: ${product.qtde}`}
                </p> */}

                <div className="mt-8">
                  {product.link_ref && (
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={product.link_ref}
                      className="underline text-blue-500"
                    >
                      Link de referência
                    </Link>
                  )}
                </div>
              </div>
              <StartNegotiationDialog />

              {/* <CreateNegotiationButton
                productId={productId}
                isAuthenticated={isAuthenticated}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8 mt-8">
        <div className="font-medium text-3xl text-black-dark mb-8">
          Outros produtos que podem te interessar
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
      </div>
    </Shell>
  )
}
