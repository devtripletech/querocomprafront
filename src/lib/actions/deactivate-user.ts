"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getToken } from "./get-token"

interface deactivateUserProps {
  userId: string
}

export const deactivateUser = async ({ userId }: deactivateUserProps) => {
  return getToken().then(async (token) => {
    noStore()
    const url = new URL(`${env.API_URL}/users/${userId}/deactivate`)

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Ocorreu um erro")
      }
    } catch (error) {
      throw new Error("Ocorreu um erro")
    }
  })
}
