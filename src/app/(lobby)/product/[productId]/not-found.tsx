import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

export default function ProductNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Produto não encontrado"
        description="O produto pode ter expirado"
        retryLink="/products"
        retryLinkText="Voltar para produtos"
      />
    </Shell>
  )
}
