"use server"
import { env } from "@/env"
import { Category } from "@/types"
import { revalidatePath } from "next/cache"

export type GetCategoriesResponse = {
  data: Category[]
  pageCount: number
}

export const getCategories = async (): Promise<GetCategoriesResponse> => {
  const url = new URL(`${env.API_URL}/categories`)

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  return data
}
