"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export interface GetMonthUsersResponse {
  amount: number
  diffFromLastMonth: number
}

export const getMonthUsersAmount = async (): Promise<GetMonthUsersResponse> => {
  noStore()
  const response = await fetch(`${env.API_URL}/metrics/month-users-amount`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  return data
}
