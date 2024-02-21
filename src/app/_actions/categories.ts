"use server"
import { env } from "@/env.mjs"
import { Category, createCategorySchema } from "@/lib/validations/category"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { getTokenAction } from "./user"

export const listCategoriesAction = async (): Promise<Category[]> => {
  return getTokenAction().then(async (token) => {
    try {
      noStore()
      const res = await fetch(`${env.API_URL}/categoria`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401) redirect("/signin")

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

      if (res.status === 401) redirect("/signin")

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
