"use server"
import { getTokenAction } from "@/app/_actions/user"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"

export interface GetMessagesQuery {
  pageIndex?: number | null
  role?: string | null
}

export type GetMessagesResponse = {
  negotiations: {
    id: string
    comprador: string
    vendedor: string
    produto: string
    quantidade: number
    valor: number
    inicio: string
    status: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const getMessages = async ({
  pageIndex,
  role,
}: GetMessagesQuery): Promise<GetMessagesResponse> => {
  noStore()
  const url = new URL(`${env.API_URL}/negotiations`)

  if (pageIndex || pageIndex === 0) {
    url.searchParams.set("pageIndex", pageIndex.toString())
  }
  if (role && role !== undefined) {
    url.searchParams.set("role", role.toString())
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  console.log(data)

  return data
}
