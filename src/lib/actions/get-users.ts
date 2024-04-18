"use server"
import { env } from "@/env.mjs"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getToken } from "./get-token"

export interface GetUsersQuery {
  pageIndex?: number | null
  role?: string | null
  name?: string | null
}

export type GetUsersResponse = {
  users: {
    id: string
    name: string
    email: string
    role: number
    create_at: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const getUsers = async ({
  pageIndex,
  role,
  name,
}: GetUsersQuery): Promise<GetUsersResponse> => {
  return getToken().then(async (token) => {
    noStore()
    const url = new URL(`${env.API_URL}/users`)

    if (pageIndex || pageIndex === 0) {
      url.searchParams.set("pageIndex", pageIndex.toString())
    }
    if (role && role !== undefined) {
      url.searchParams.set("role", role.toString())
    }

    if (name && name.trim()) {
      url.searchParams.set("name", name.toString())
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return await response.json()
  })
}
