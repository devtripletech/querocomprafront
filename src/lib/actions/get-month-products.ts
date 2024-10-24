"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env"
import { revalidatePath } from "next/cache"

export interface GetMonthProductsResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthProductsAmount =
  async (): Promise<GetMonthProductsResponse> => {
    const response = await fetch(
      `${env.API_URL}/metrics/month-products-amount`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    const data = await response.json()

    return data
  }
