"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export interface GetDailyNegotiationsInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyNegotiationsInPeriodResponse = Array<{
  date: string
  negotiation: number
}>

export async function getDailyNegotiationsInPeriod({
  from,
  to,
}: GetDailyNegotiationsInPeriodQuery): Promise<GetDailyNegotiationsInPeriodResponse> {
  noStore()
  const response = await fetch(
    `${env.API_URL}/metrics/daily-negotiations-in-period?from=${from}&to=${to}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return await response.json()
}
