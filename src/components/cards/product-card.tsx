"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import { catchError, cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"

import { useRouter } from "next/navigation"
import { Product } from "@/lib/validations/product"

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition()
  const router = useRouter()

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link aria-label={product.nome} href={`/product/${product.id_produto}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product?.img_01?.length ? (
              <Image
                src={product.img_01 ?? "/images/product-placeholder.webp"}
                alt={product.nome}
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full w-full items-center justify-center bg-secondary"
              >
                <Icons.placeholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{product.nome}</span>
      </Link>
      <Link href={`/product/${product.id_produto}`} tabIndex={-1}>
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1 text-lg">{product.nome}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(product.valor)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === "default" ? (
          <Button
            aria-label="Negociar Agora"
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              router.push(`/product/${product.id_produto}`)
            }}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Negociar Agora
          </Button>
        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Negociar Agora"}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => {
              startTransition(async () => {
                await onSwitch?.()
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <CheckIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <PlusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
