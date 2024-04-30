"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getToken } from "./get-token"

interface activateUserProps {
  productId: number
}

export const archivedProduct = async ({ productId }: activateUserProps) => {
  return getToken().then(async (token) => {
    noStore()
    const url = new URL(`${env.API_URL}/produto/${productId}/archived`)

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
      revalidatePath(`/dashboard/products`)
      revalidatePath(`/products`)
      revalidatePath(`/`)
    } catch (error) {
      throw new Error("Ocorreu um erro")
    }
  })
}
