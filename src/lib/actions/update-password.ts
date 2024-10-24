"use server"
import { env } from "@/env"
import { revalidatePath } from "next/cache"
import { getToken } from "./get-token"

interface updatePasswordProps {
  newPassword: string
  userId: string
}

export const updatePassword = async ({
  newPassword,
  userId,
}: updatePasswordProps) => {
  return getToken().then(async (token) => {
    const url = new URL(`${env.API_URL}/users/${userId}`)

    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: newPassword,
        }),
      })

      if (!response.ok) {
        throw new Error("Ocorreu um erro")
      }
    } catch (error) {
      throw new Error("Ocorreu um erro")
    }
  })
}
