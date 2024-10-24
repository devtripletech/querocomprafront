"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env"
import { revalidatePath } from "next/cache"

export interface GetNegotiationsQuery {
  pageIndex?: number | null
  role?: string | null
  name?: string | null
}
export type GetNegotiation = {
  id: string
  comprador: string
  vendedor: string
  produto: string
  quantidade: number
  valor: number
  inicio: string
  status: number
  messages: any
}
export type GetNegotiationsResponse = {
  negotiations: GetNegotiation[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const getNegotiations = async ({
  pageIndex,
  role,
  name,
}: GetNegotiationsQuery): Promise<GetNegotiationsResponse> => {
  const url = new URL(`${env.API_URL}/negotiations`)

  if (pageIndex || pageIndex === 0) {
    url.searchParams.set("pageIndex", pageIndex.toString())
  }
  if (role && role !== undefined) {
    url.searchParams.set("role", role.toString())
  }
  if (name && name !== undefined) {
    url.searchParams.set("name", name)
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()

  return data
}
