"use client"
import { createNegotiationAction } from "@/app/_actions/negotiation"
import { Button } from "../ui/button"
import React from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateNegotiationButton({
  userId,
  productId,
}: {
  userId: string
  productId: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  async function handleNegotiation() {
    startTransition(async () => {
      try {
        await createNegotiationAction({ userId, productId })
        router.push("/dashboard/negotiation/my")
      } catch (e) {
        console.log(e)
        toast.error("Algo deu errado.")
      }
    })
  }
  return (
    <Button disabled={isPending} onClick={handleNegotiation} size={"lg"}>
      Iniciar Negociação
    </Button>
  )
}
