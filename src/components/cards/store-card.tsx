import Link from "next/link"
import { type CuratedStore } from "@/types"

import { getRandomPatternStyle } from "@/lib/generate-pattern"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Product } from "@/lib/validations/product"

interface StoreCardProps {
  product: Product
  href: string
}

export function StoreCard({ product, href }: StoreCardProps) {
  return (
    <Link href={href}>
      <span className="sr-only">{product.nome}</span>
      <Card className="h-full overflow-hidden">
        <AspectRatio ratio={21 / 9}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-zinc-950/50" />
          {/* <Badge
            className={cn(
              "pointer-events-none absolute right-2 top-2 rounded-sm px-2 py-1 font-semibold",
              store.stripeAccountId
                ? "border-green-600/20 bg-green-50 text-green-700"
                : "border-red-600/10 bg-red-50 text-red-700"
            )}
          >
            {store.stripeAccountId ? "Active" : "Inactive"}
          </Badge> */}
          <div
            className="h-full rounded-t-md border-b"
            style={getRandomPatternStyle(String(product.id_produto))}
          />
        </AspectRatio>
        <CardHeader className="space-y-2">
          <CardTitle className="line-clamp-1">{product.nome}</CardTitle>
          <CardDescription className="line-clamp-1">
            {product.descricao?.length
              ? product.descricao
              : `Explore ${product.nome} products`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
