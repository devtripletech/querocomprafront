"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { Message, sendMessageSchema } from "@/lib/validations/negotiation"
import { redirect } from "next/navigation"
import { z } from "zod"

export const getNegotiationsAction = async (userId: number) => {
  try {
    noStore()
    const res = await fetch(`${env.API_URL}/negociacao?id_user=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })

    if (res.status === 401 || res.status === 400) redirect("/signin")

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
}

export const getNegotiationsPartAction = async (userId: number) => {
  try {
    noStore()
    const res = await fetch(`${env.API_URL}/negociacaopart?id_user=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401 || res.status === 400) redirect("/signin")

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
}

export const getMessagesNegotiationAction = async (
  negotiationId: string
): Promise<Message[]> => {
  try {
    noStore()
    const res = await fetch(`${env.API_URL}/negociacao/${negotiationId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 401) redirect("/signin")

    return await res.json()
  } catch (err) {
    console.error(err)
    throw err instanceof Error
      ? err.message
      : err instanceof z.ZodError
      ? err.issues.map((issue) => issue.message).join("\n")
      : new Error("Unknown error.")
  }
}

type CreateNegotiationResponse = {
  userId: string
  productId: string
}
export const createNegotiationAction = async ({
  userId,
  productId,
}: CreateNegotiationResponse) => {
  try {
    noStore()
    const res = await fetch(`${env.API_URL}/negociacao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_user_geraNegocio: userId,
        id_produto: productId,
        mensagem: "",
      }),
    })

    if (res.status === 401 || res.status === 400) redirect("/signin")

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
}

export const sendMessageNegotiationAction = async (
  input: z.infer<typeof sendMessageSchema>
) => {
  try {
    noStore()
    const res = await fetch(`${env.API_URL}/enviamsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    })
    if (res.status === 401 || res.status === 400) redirect("/signin")

    const items = await res.json()
    console.log(items)

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
}
