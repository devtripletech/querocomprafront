"use client"

import { ErrorCard } from "@/components/cards/error-card"
import { Shell } from "@/components/shells/shell"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  console.error(error)
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title={error.message}
        description="Pedimos desculpas pela inconveniência e agradecemos pela compreensão enquanto nossa equipe resolve o problema"
        retryLink="/"
        retryLinkText="Voltar início"
      />
    </Shell>
  )
}