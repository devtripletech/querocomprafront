import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

interface ProductNotFoundProps {
  params: {
    storeId: string
  }
}

export default function ProductNotFound({ params }: ProductNotFoundProps) {
  const storeId = Number(params.storeId)

  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Produto não encontrado"
        description="O produto pode ter expirado ou você já pode ter atualizado seu produto"
        retryLink={`/dashboard/stores/${storeId}/products`}
        retryLinkText="Go to Products"
      />
    </Shell>
  )
}
