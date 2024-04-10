"use server"
import { env } from "@/env.mjs"

export type GetPopularCategoriesResponse = Array<{
  amount: number
  category: string
}>

export const getPopularCategories =
  async (): Promise<GetPopularCategoriesResponse> => {
    const response = await fetch(`${env.API_URL}/metrics/popular-categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return await response.json()
  }
