"use client"
import { createNegotiationAction } from "@/app/_actions/negotiation"
import { Button } from "../ui/button"
import React from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function CreateNegotiationButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  async function handleNegotiation() {
    startTransition(async () => {
      try {
        await createNegotiationAction({ productId })
        router.push("/dashboard/negotiation")
      } catch (e: any) {
        toast.error(e.message)
      }
    })
  }
  return (
    <Button disabled={isPending} onClick={handleNegotiation} size={"lg"}>
      Iniciar Negociação
    </Button>
  )
}
