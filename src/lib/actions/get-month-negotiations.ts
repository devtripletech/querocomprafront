"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export interface GetMonthNegotiationsResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthNegotiationsAmount =
  async (): Promise<GetMonthNegotiationsResponse> => {
    noStore()
    const response = await fetch(
      `${env.API_URL}/metrics/month-negotiations-amount`,
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
