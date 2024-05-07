"use server"
import { env } from "@/env.mjs"
import { Category } from "@/types"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export type GetCategoriesResponse = {
  data: Category[]
  pageCount: number
}

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const url = new URL(`${env.API_URL}/categories`)
  noStore()
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  return data
}
