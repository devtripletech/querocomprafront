"use client"

import React from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { toast } from "sonner"

let displayedNetworkFailureError = false

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry(failureCount) {
            if (failureCount >= 3) {
              if (displayedNetworkFailureError === false) {
                displayedNetworkFailureError = true

                toast.error(
                  "A aplicação está demorando mais que o esperado para carregar, tente novamente em alguns minutos.",
                  {
                    onDismiss: () => {
                      displayedNetworkFailureError = false
                    },
                  }
                )
              }

              return false
            }

            return true
          },
        },
        mutations: {
          onError(error) {
            toast.error("Erro ao processar operação!")
          },
        },
      },
    })
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
