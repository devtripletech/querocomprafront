"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { Message, sendMessageSchema } from "@/lib/validations/negotiation"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"
import { getTokenAction } from "./user"

export const getNegotiationsAction = async () => {
  return getTokenAction().then(async (token) => {
    try {
      noStore()
      const res = await fetch(`${env.API_URL}/negociacao`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) throw new Error("Não autorizado")

      const items = await res.json()

      if (items?.error) throw new Error(items?.error)

      return items.resultado
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export const getNegotiationsPartAction = async () => {
  return getTokenAction().then(async (token) => {
    try {
      noStore()
      const res = await fetch(`${env.API_URL}/negociacaopart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401) throw new Error("Não autorizado")

      const items = await res.json()

      if (items?.error) throw new Error(items?.error)

      return items.resultado
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export const getMessagesNegotiationAction = async (
  negotiationId: string
): Promise<Message[]> => {
  return getTokenAction().then(async (token) => {
    try {
      noStore()
      const res = await fetch(`${env.API_URL}/negociacao/${negotiationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) throw new Error("Não autorizado")

      if (res.status === 204) throw new Error("Negociação não encontrada")
      const messages = await res.json()

      return messages
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

type CreateNegotiationResponse = {
  productId: string
}
export const createNegotiationAction = async ({
  productId,
}: CreateNegotiationResponse) => {
  return getTokenAction().then(async (token) => {
    try {
      noStore()
      const res = await fetch(`${env.API_URL}/negociacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_produto: productId,
        }),
      })
      const items = await res.json()

      if (items?.error) throw new Error(items?.error.message)
      revalidatePath("/dashboard/negotiation/my")
      revalidatePath("/dashboard/negotiation/")
      return items.resultado
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export const sendMessageNegotiationAction = async (
  input: z.infer<typeof sendMessageSchema>
) => {
  return getTokenAction().then(async (token) => {
    try {
      noStore()
      const res = await fetch(`${env.API_URL}/enviamsg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })
      if (res.status === 401) throw new Error("Não autorizado")

      const items = await res.json()

      if (items?.error) throw new Error(items?.error)

      revalidatePath("/dashboard/negotiation")

      return items
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}
