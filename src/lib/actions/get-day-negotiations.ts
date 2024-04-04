"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env.mjs"

export interface GetDayNegotiationsResponse {
  amount: number
  diffFromYesterday: number
}

export const getDayNegotiationsAmount =
  async (): Promise<GetDayNegotiationsResponse> => {
    const response = await fetch(
      `${env.API_URL}/v2/metrics/day-negotiations-amount`,
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
