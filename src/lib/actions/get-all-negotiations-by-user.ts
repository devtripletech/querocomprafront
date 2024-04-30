"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getToken } from "./get-token"

export type GetNegotiationResponse = {
  id: string
  comprador: string
  vendedor: string
  produto: string
  quantidade: number
  valor: number
  inicio: string
  status: number
  name: string
  img: string
}

export const getAllNegotiationsByUser = async (): Promise<
  GetNegotiationResponse[]
> => {
  return getToken().then(async (token) => {
    noStore()
    const url = new URL(`${env.API_URL}/negotiations/user`)

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    return data
  })
}
