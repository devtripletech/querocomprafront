"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export type GetPopularCategoriesResponse = Array<{
  amount: number
  category: string
}>

export const getPopularCategories =
  async (): Promise<GetPopularCategoriesResponse> => {
    noStore()
    const response = await fetch(`${env.API_URL}/metrics/popular-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return await response.json()
  }
