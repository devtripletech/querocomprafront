"use server"
import { env } from "@/env"
import { UserDetailsResponse } from "../validations/user"
import { revalidatePath } from "next/cache"

export interface GetUserDetailsRequest {
  userId: string
}

export const getUserDetails = async ({
  userId,
}: GetUserDetailsRequest): Promise<UserDetailsResponse> => {
  const response = await fetch(`${env.API_URL}/users/${userId}/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = await response.json()

  return data
}
