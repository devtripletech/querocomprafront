"use server"

import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { z } from "zod"

import { slugify } from "@/lib/utils"
import { getStoresSchema, storeSchema } from "@/lib/validations/store"
import { Store } from "@/types"

export async function getStoresAction(
  rawInput: z.infer<typeof getStoresSchema>
) {
  try {
    noStore()
    const input = getStoresSchema.parse(rawInput)

    const limit = input.limit ?? 10
    const offset = input.offset ?? 0
    const [column, order] =
      (input.sort?.split(".") as [
        keyof Store | undefined,
        "asc" | "desc" | undefined
      ]) ?? []
    const statuses = input.statuses?.split(".") ?? []

    const { items, count } = {} as any

    return {
      items,
      count,
    }
  } catch (err) {
    console.error(err)
    throw err instanceof Error
      ? err.message
      : err instanceof z.ZodError
      ? err.issues.map((issue) => issue.message).join("\n")
      : new Error("Unknown error.")
  }
}

const extendedStoreSchema = storeSchema.extend({
  userId: z.string(),
})

export async function addStoreAction(
  rawInput: z.infer<typeof extendedStoreSchema>
) {
  const input = extendedStoreSchema.parse(rawInput)

  const storeWithSameName = {} as any

  if (storeWithSameName) {
    throw new Error("Store name already taken.")
  }

  // await db.insert(stores).values({
  //   name: input.name,
  //   description: input.description,
  //   userId: input.userId,
  //   slug: slugify(input.name),
  // })

  revalidatePath("/dashboard/stores")
}
