"use server"
import { env } from "@/env.mjs"
import { Category, createCategorySchema } from "@/lib/validations/category"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { getTokenAction } from "./user"
import { ErrorResponse } from "@/lib/validations/error"

export const listCategoriesAction = async (): Promise<Category[]> => {
  try {
    noStore()
    const res = await fetch(`${env.API_URL}/categoria`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const items = await res.json()
    if (items.error) throw new Error(items.error.message)

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
export async function addCategoryAction(
  input: z.infer<typeof createCategorySchema>
) {
  return getTokenAction().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/categoria`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ descricao: input.descricao }),
      })

      if (res.status === 401) throw new Error("Não autorizado")

      if (!res.ok) throw new Error("Ocorreu um error")

      revalidatePath(`/dashboard/categories/`)
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
