"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getToken } from "./get-token"
import { UserDetailsResponse } from "../validations/user"

export interface UpdateUserDetailsRequest {
  input: UserDetailsResponse
  userId: string
}

export const updateUserDetails = async ({
  input,
  userId,
}: UpdateUserDetailsRequest) => {
  return getToken().then(async (token) => {
    noStore()
    const url = new URL(`${env.API_URL}/users/${userId}/details`)

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        throw new Error("Ocorreu um erro")
      }
    } catch (error) {
      throw new Error("Ocorreu um erro")
    }
  })
}
