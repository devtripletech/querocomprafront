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
