"use server"
import { env } from "@/env"
import { revalidatePath } from "next/cache"
import { getToken } from "./get-token"

interface activateUserProps {
  userId: string
}

export const activateUser = async ({ userId }: activateUserProps) => {
  return getToken().then(async (token) => {
    const url = new URL(`${env.API_URL}/users/${userId}/activate`)

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
