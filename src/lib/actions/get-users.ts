"use server"
import { env } from "@/env"
import { revalidatePath } from "next/cache"
import { getToken } from "./get-token"

export interface GetUsersQuery {
  pageIndex?: number | null
  role?: string | null
  name?: string | null
  activated?: string | null
}

export type GetUsersResponse = {
  users: {
    id: string
    name: string
    email: string
    role: number
    activated: boolean
    create_at: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export const getUsers = async ({
  pageIndex = 0,
  role = undefined,
  name = "",
  activated = undefined,
}: GetUsersQuery): Promise<GetUsersResponse> => {
  return getToken().then(async (token) => {
    const url = new URL(`${env.API_URL}/users`)

    if (pageIndex || pageIndex === 0) {
      url.searchParams.set("pageIndex", pageIndex.toString())
    }
    if (activated && activated !== undefined && activated !== "all") {
      url.searchParams.set("activated", activated.toString())
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
