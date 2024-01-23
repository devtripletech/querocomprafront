import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

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

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.productId

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

  console.log(product)
  const images = [
    { id: "1", name: "", url: product.img_01 },
    { id: "2", name: "", url: product.img_02 },
    { id: "3", name: "", url: product.img_03 },
  ] as StoredFile[]

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
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.nome}</h2>
            {product ? (
              <Link
                href={`/products?categories=${product.id_categoria}`}
                className="line-clamp-1 inline-block text-base text-muted-foreground hover:underline"
              >
                {product.id_categoria}
              </Link>
            ) : null}
          </div>
          <Separator className="my-1.5" />
          {/* <AddToCartForm productId={productId} /> */}
          <Separator className="mt-5" />
          <Accordion type="single" collapsible={false} className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger>Descrição</AccordionTrigger>
              <AccordionContent>
                {product.descricao ??
                  "Nenhuma descrição está disponível para este produto."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Shell>
  )
}
