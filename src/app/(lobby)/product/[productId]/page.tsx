import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { env } from "@/env.mjs"

import { formatPrice, toTitleCase } from "@/lib/utils"
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
import { getProductByIdAction } from "@/app/_actions/product"
import { StoredFile } from "@/config/products"
import { listCategoriesAction } from "@/app/_actions/categories"
import { currentUser, getUserAction } from "@/app/_actions/user"
import { UserPayload } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  createNegotiationAction,
  isNegotiatingAction,
} from "@/app/_actions/negotiation"
import { CreateNegotiationButton } from "@/components/buttons/create-negotiation-button"

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

  return (
    <Shell>
      <Breadcrumbs
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
            title: product.nome,
            href: `/product/${product.id_produto}`,
          },
        ]}
      />
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        <ProductImageCarousel
          className="w-full md:w-1/2"
          images={images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator className="mt-4 md:hidden" />
        <div className="flex w-full flex-col gap-4 md:w-3/4">
          <div className="space-y-6">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.nome}</h2>
            <div>
              <h3 className="font-semibold text-foreground pb-2">Descrição</h3>
              <span>
                {product.descricao ??
                  "Nenhuma descrição está disponível para este produto."}
              </span>
            </div>
            <Separator className="mt-5" />
            <div>
              <p className="text-muted-foreground text-xs pb-1">Preço</p>
              <p className="text-3xl text-foreground/90 font-semibold">
                {formatPrice(product.valor)}
              </p>
              <p className="pt-4 text-muted-foreground">
                {`Em estoque: ${product.qtde}`}
              </p>
            </div>

            <CreateNegotiationButton
              productId={productId}
              isAuthenticated={isAuthenticated}
            />
            <div>
              {product.link_ref && (
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={product.link_ref}
                >
                  Link de referência
                </Link>
              )}
            </div>
          </div>
          {/* <Separator className="my-1.5" /> */}
          {/* <AddToCartForm productId={productId} /> */}

          {/* <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Descrição</AccordionTrigger>
              <AccordionContent>
                {product.descricao ??
                  "Nenhuma descrição está disponível para este produto."}
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}
        </div>
      </div>
    </Shell>
  )
}
