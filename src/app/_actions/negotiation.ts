"use server"
import { env } from "@/env.mjs"
import { redirect } from "next/navigation"
import { z } from "zod"

export const getNegotiationsAction = async (userId: number) => {
  try {
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

type CreateNegotiationResponse = {
  userId: string
  productId: string
}
export const createNegotiationAction = async ({
  userId,
  productId,
}: CreateNegotiationResponse) => {
  try {
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

export const sendMessageNegotiationAction = async () => {
  try {
    const res = await fetch(`${env.API_URL}/enviamsg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        body: JSON.stringify({
          id_user_geraNegocio: "",
          id_negociacao: "",
          mensagem: "",
        }),
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
