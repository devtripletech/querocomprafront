import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"

interface ProductNotFoundProps {
  params: {
    productId: string
  }
}

export default function NegotiationNotFound() {
  return (
    <ErrorCard
      title="Negociação não encontrado"
      description="A negociação pode ter expirado ou já pode ter sido finalizada"
      retryLink={`/dashboard/negotiation`}
      retryLinkText="Voltar para negociações"
    />
  )
}
