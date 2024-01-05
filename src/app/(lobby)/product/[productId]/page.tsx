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
import { AddToCartForm } from "@/components/forms/add-to-cart-form"
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { Shell } from "@/components/shells/shell"
import { Image, Product, StoredFile, productsCategoryType } from "@/types"
import { getProductByIdAction } from "@/app/_actions/product"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const productId = params.productId

  const img = [
    { id: "1", name: "ar condicionado", url: "/images/ar-condicionado.webp" },
  ] as Image[]
  const product = {
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
    category: productsCategoryType.Service,
    subcategory: "",
  } as Product

  if (!product) {
    return {}
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
    title: toTitleCase(product.name),
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.productId
  const img = [
    { id: "1", name: "ar condicionado", url: "/images/ar-condicionado.webp" },
    { id: "2", name: "ar condicionado", url: "/images/ar-condicionado-2.webp" },
    { id: "3", name: "ar condicionado", url: "/images/ar-condicionado-3.webp" },
    { id: "4", name: "ar condicionado", url: "/images/ar-condicionado-4.webp" },
  ] as Image[]
  const product2 = {
    id: 1,
    name: "Ar Condicionado Hi Wall LG Dual Inverter Voice 9.000 Btus Frio 220v R-32",
    description:
      "Ar Condicionado Split Hw Dual Inverter Voice LG 9000 Btus Quente/Frio 220V S3NW09AA31C.EB2GAMZ A LG, uma das referências em ar condicionado no mercado global, investiu forte no lançamento de um produto moderno e alinhado às principais tendências do setor. Com isso, o modelo de ar condicionado Split Inverter com 9000 BTUs surge como alternativa para a climatização eficiente de ambientes — sejam eles residenciais ou corporativos. O ar condicionado Split com 9000 BTUs tem o grande diferencial de contar com a tecnologia Voice e também a versatilidade de recursos para o controle de temperatura, além das variações Quente e Frio!",
    images: img,
    price: "12",
    inventory: 2,
    rating: 5,
    storeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["2", "3", "4"],
    category: productsCategoryType.Service,
    subcategory: "",
  } as Product

  const product = await getProductByIdAction(productId)

  if (!product) {
    notFound()
  }

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
          // {
          //   title: toTitleCase(product?.category),
          //   href: `/products?category=${product.category}`,
          // },
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
          </div>
          <Separator className="my-1.5" />
          {/* <AddToCartForm productId={productId} /> */}
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full">
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
