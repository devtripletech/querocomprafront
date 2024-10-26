"use server"

import { revalidatePath } from "next/cache"

import { z } from "zod"

import {
  Product,
  ProductTransaction,
  createProductSchema,
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"

import { env } from "@/env"
import { getTokenAction } from "./user"

export const listProductsAction = async (): Promise<Product[]> => {
  return getTokenAction().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/produto`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) throw new Error("Não autorizado")

      const items = await res.json()

      if (items?.error) throw new Error(items?.error)

      return items.resultado
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export const listProductsWithParamsAction = async (
  rawInput: z.infer<typeof getProductsSchema>
): Promise<ProductTransaction> => {
  return getTokenAction().then(async (token) => {
    const url = new URL(`${env.API_URL}/produto`)

    const input = getProductsSchema.parse(rawInput)

    if (input.limit !== undefined) {
      url.searchParams.set("limit", input.limit.toString())
    }

    if (input.offset !== undefined) {
      url.searchParams.set("offset", input.offset.toString())
    }

    if (input.sort && input.sort !== undefined) {
      url.searchParams.set("sort", input.sort.toString())
    }

    if (input.categories && input.categories !== undefined) {
      url.searchParams.set("categories", input.categories.toString())
    }

    try {
      const res = await fetch(`${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401) throw new Error("Não autorizado")

      const items = await res.json()

      if (items?.error) throw new Error(items?.error)

      return items
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export const listProductsByUserIdAction = async (
  userId: number
): Promise<Product[]> => {
  return getTokenAction().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/produtouser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) throw new Error("Não autorizado")

      const items = await res.json()

      if (items?.error) throw new Error(items?.error)

      return items.resultado
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export const getProductByIdAction = async (
  productId: string
): Promise<Product> => {
  return getTokenAction().then(async (token) => {
    try {
      const res = await fetch(`${env.API_URL}/produto/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status === 401) throw new Error("Não autorizado")

      const item = await res.json()

      if (item?.error) throw new Error(item?.error)

      return item.resultado
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

const extendedProductSchema = productSchema.extend({
  images: z
    .array(z.object({ id: z.string(), name: z.string(), url: z.string() }))
    .nullable(),
})

export async function addProductAction(input: z.infer<typeof productSchema>) {
  return getTokenAction().then(async (token) => {
    try {
      const response = await fetch(`${env.API_URL}/produto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_categoria: input.id_categoria,
          negociado: input.negociado,
          nome: input.nome,
          valor: input.valor,
          descricao: input.descricao,
          link_ref: input.link_ref,
          img_01: input.img_01,
          img_02: input.img_02,
          img_03: input.img_03,
          qtde: input.qtde,
        }),
      })

      if (response.status === 401) throw new Error("Não autorizado")

      const data = await response.json()

      revalidatePath("/dashboard/products")
      revalidatePath(`/`)

      return data
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

const extendedProductSchemaWithId = extendedProductSchema.extend({
  id_produto: z.number(),
})

export async function updateProductAction(
  input: z.infer<typeof productSchema>
) {
  return getTokenAction().then(async (token) => {
    try {
      const response = await fetch(`${env.API_URL}/produto`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_produto: input.id_produto,
          id_categoria: input.id_categoria,
          negociado: input.negociado,
          nome: input.nome,
          valor: input.valor,
          descricao: input.descricao,
          link_ref: input.link_ref,
          img_01: input.img_01,
          img_02: input.img_02,
          img_03: input.img_03,
          qtde: input.qtde,
        }),
      })

      if (response.status === 401) throw new Error("Não autorizado")

      const data = await response.json()

      revalidatePath("/dashboard/products")
      revalidatePath(`/`)

      return data
    } catch (err) {
      console.error(err)
      throw err instanceof Error
        ? err.message
        : err instanceof z.ZodError
        ? err.issues.map((issue) => issue.message).join("\n")
        : new Error("Unknown error.")
    }
  })
}

export async function deleteProductAction(
  rawInput: z.infer<typeof getProductSchema>
) {
  const input = getProductSchema.parse(rawInput)

  const product = {} as any

  if (!product) {
    throw new Error("Produto não encontrado.")
  }

  // await db.delete(products).where(eq(products.id, input.id))

  revalidatePath(`/dashboard/stores/${input.storeId}/products`)
}
